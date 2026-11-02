import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";

type Client = SupabaseClient<Database>;

type PropertyRow = Database["public"]["Tables"]["properties"]["Row"];
type ListingImageRow = Database["public"]["Tables"]["listing_images"]["Row"];

export type PropertyWithListings = PropertyRow & {
  listings: Array<{
    id: string;
    asking_price_gbp: number | null;
    status: string;
    approval_status: string;
    listing_images: Array<
      Pick<ListingImageRow, "source_url" | "alt" | "sort_order">
    >;
  }>;
};

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  maxBeds?: number;
  buildingType?: Database["public"]["Enums"]["building_type"];
  limit?: number;
  offset?: number;
}

export async function getPropertyBySlug(client: Client, slug: string): Promise<PropertyWithListings> {
  const { data, error } = await client
    .from("properties")
    .select("*, listings(*), listings(listing_images(*))")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data as unknown as PropertyWithListings;
}

export async function searchProperties(
  client: Client,
  filters: PropertyFilters = {}
) {
  let query = client
    .from("properties")
    .select(
      "*, listings!inner(id, asking_price_gbp, status, approval_status, listing_images(source_url, alt, sort_order))",
      { count: "exact" }
    )
    .eq("listings.status", "live")
    .eq("listings.approval_status", "approved")
    .order("created_at", { ascending: false });

  if (filters.minPrice !== undefined) {
    query = query.gte("listings.asking_price_gbp", filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    query = query.lte("listings.asking_price_gbp", filters.maxPrice);
  }
  if (filters.minBeds !== undefined) {
    query = query.gte("beds", filters.minBeds);
  }
  if (filters.maxBeds !== undefined) {
    query = query.lte("beds", filters.maxBeds);
  }
  if (filters.buildingType) {
    query = query.eq("building_type", filters.buildingType);
  }

  const limit = filters.limit ?? 20;
  const offset = filters.offset ?? 0;
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;
  if (error) throw error;
  return { data: (data ?? []) as unknown as PropertyWithListings[], count: count ?? 0 };
}
