import Papa from "papaparse";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";
import {
  importRowSchema,
  type ValidatedRow,
  type RejectedRow,
} from "@/lib/validation/import-schemas";

type Client = SupabaseClient<Database>;

export interface ParsedImport {
  valid: ValidatedRow[];
  rejected: RejectedRow[];
  totalRows: number;
}

export interface ImportRunSummary {
  runId: string;
  outcome: string;
  rowsTotal: number;
  rowsInserted: number;
  rowsUpdated: number;
  rowsSkipped: number;
  rowsRejected: number;
}

function slugify(address: string): string {
  return address
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseCsvFile(
  buffer: string,
  _sourceId?: string
): ParsedImport {
  const parsed = Papa.parse<Record<string, string>>(buffer, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h: string) => h.trim().toLowerCase(),
  });

  const valid: ValidatedRow[] = [];
  const rejected: RejectedRow[] = [];

  for (const row of parsed.data) {
    const result = importRowSchema.safeParse(row);
    if (result.success) {
      valid.push({ raw: row, parsed: result.data });
    } else {
      rejected.push({ raw: row, errors: result.error });
    }
  }

  return {
    valid,
    rejected,
    totalRows: parsed.data.length,
  };
}

export async function executeImportRun(
  client: Client,
  parsed: ParsedImport,
  sourceId: string,
  options: { dryRun?: boolean } = {}
): Promise<ImportRunSummary> {
  // Create import run record
  const { data: run, error: runError } = await client
    .from("import_runs")
    .insert({
      source_id: sourceId,
      outcome: "pending" as const,
      rows_total: parsed.totalRows,
    })
    .select("id")
    .single();
  if (runError) throw runError;

  let inserted = 0;
  let updated = 0;
  let skipped = 0;
  const rejected = parsed.rejected.length;

  // Record rejected rows
  if (parsed.rejected.length > 0) {
    const rejectedRows = parsed.rejected.map((r) => ({
      import_run_id: run.id,
      external_id: r.raw.external_id ?? null,
      raw_json: r.raw as unknown as Record<string, unknown>,
      validation_errors: r.errors.format() as unknown as Record<string, unknown>,
      action: "rejected" as const,
    }));
    await client.from("import_rows").insert(rejectedRows);
  }

  for (const row of parsed.valid) {
    const data = row.parsed;

    // Check if listing exists by (source_id, external_id)
    const { data: existingListing } = await client
      .from("listings")
      .select("id, asking_price_gbp, status, property_id")
      .eq("source_id", sourceId)
      .eq("external_id", data.external_id)
      .single();

    if (options.dryRun) {
      const action = existingListing ? "updated" : "inserted";
      await client.from("import_rows").insert({
        import_run_id: run.id,
        external_id: data.external_id,
        raw_json: row.raw as unknown as Record<string, unknown>,
        action: action === "updated" ? ("skipped" as const) : ("skipped" as const),
      });
      if (existingListing) {
        skipped++;
      } else {
        skipped++;
      }
      continue;
    }

    if (existingListing) {
      // Update existing
      const changes: Record<string, unknown> = {};
      if (existingListing.asking_price_gbp !== data.price) {
        changes.asking_price_gbp = data.price;
      }
      if (existingListing.status !== data.status) {
        changes.status = data.status;
      }

      if (Object.keys(changes).length === 0) {
        await client.from("import_rows").insert({
          import_run_id: run.id,
          external_id: data.external_id,
          raw_json: row.raw as unknown as Record<string, unknown>,
          action: "skipped" as const,
        });
        skipped++;
        continue;
      }

      // Create listing event for price change
      if (changes.asking_price_gbp !== undefined) {
        await client.from("listing_events").insert({
          listing_id: existingListing.id,
          kind: "price_changed" as const,
          before_json: { asking_price_gbp: existingListing.asking_price_gbp },
          after_json: { asking_price_gbp: changes.asking_price_gbp },
        });
      }

      // Update the listing
      await client
        .from("listings")
        .update(changes as Database["public"]["Tables"]["listings"]["Update"])
        .eq("id", existingListing.id);

      // Update property details
      await client
        .from("properties")
        .update({
          beds: data.beds,
          baths: data.baths,
          building_type: data.building_type,
          tenure: data.tenure,
        })
        .eq("id", existingListing.property_id);

      await client.from("import_rows").insert({
        import_run_id: run.id,
        external_id: data.external_id,
        raw_json: row.raw as unknown as Record<string, unknown>,
        action: "updated" as const,
      });
      updated++;
    } else {
      // Insert new property + listing
      const { data: property, error: propError } = await client
        .from("properties")
        .insert({
          slug: slugify(data.address),
          address: data.address,
          postcode: data.postcode,
          point: `SRID=4326;POINT(${data.lng} ${data.lat})` as unknown,
          building_type: data.building_type,
          beds: data.beds,
          baths: data.baths,
          tenure: data.tenure,
        })
        .select("id")
        .single();
      if (propError) throw propError;

      const { data: listing, error: listError } = await client
        .from("listings")
        .insert({
          property_id: property.id,
          source_id: sourceId,
          external_id: data.external_id,
          asking_price_gbp: data.price,
          status: data.status,
          approval_status: "pending" as const,
          listed_at: data.listed_date ?? new Date().toISOString(),
        })
        .select("id")
        .single();
      if (listError) throw listError;

      // Create listing event
      await client.from("listing_events").insert({
        listing_id: listing.id,
        kind: "created" as const,
        after_json: { asking_price_gbp: data.price, status: data.status },
      });

      // Insert images
      if (data.image_urls && data.image_urls.length > 0) {
        const images = data.image_urls.map((url, i) => ({
          listing_id: listing.id,
          source_url: url,
          sort_order: i,
        }));
        await client.from("listing_images").insert(images);
      }

      await client.from("import_rows").insert({
        import_run_id: run.id,
        external_id: data.external_id,
        raw_json: row.raw as unknown as Record<string, unknown>,
        action: "inserted" as const,
      });
      inserted++;
    }
  }

  // Update the run with final counts
  const outcome =
    rejected > 0 && inserted + updated === 0
      ? "failed"
      : rejected > 0
        ? "partial"
        : "completed";

  await client
    .from("import_runs")
    .update({
      outcome: outcome as Database["public"]["Enums"]["import_outcome"],
      rows_inserted: inserted,
      rows_updated: updated,
      rows_skipped: skipped,
      rows_rejected: rejected,
      completed_at: new Date().toISOString(),
    })
    .eq("id", run.id);

  return {
    runId: run.id,
    outcome,
    rowsTotal: parsed.totalRows,
    rowsInserted: inserted,
    rowsUpdated: updated,
    rowsSkipped: skipped,
    rowsRejected: rejected,
  };
}

export async function getImportRunSummary(
  client: Client,
  runId: string
): Promise<ImportRunSummary | null> {
  const { data, error } = await client
    .from("import_runs")
    .select("*")
    .eq("id", runId)
    .single();

  if (error) return null;

  return {
    runId: data.id,
    outcome: data.outcome,
    rowsTotal: data.rows_total,
    rowsInserted: data.rows_inserted,
    rowsUpdated: data.rows_updated,
    rowsSkipped: data.rows_skipped,
    rowsRejected: data.rows_rejected,
  };
}
