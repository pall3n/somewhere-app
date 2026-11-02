import { z } from "zod/v4";

const ukPostcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

export const importRowSchema = z.object({
  external_id: z.string().min(1, "external_id is required"),
  address: z.string().min(1, "address is required"),
  postcode: z.string().regex(ukPostcodeRegex, "Invalid UK postcode"),
  lat: z.coerce.number().min(49.0, "Latitude out of UK bounds").max(61.0, "Latitude out of UK bounds"),
  lng: z.coerce.number().min(-8.0, "Longitude out of UK bounds").max(2.0, "Longitude out of UK bounds"),
  price: z.coerce.number().positive("Price must be positive").int("Price must be whole number"),
  beds: z.coerce.number().int().min(0).max(20),
  baths: z.coerce.number().int().min(0).max(20),
  building_type: z.enum([
    "detached",
    "semi_detached",
    "terraced",
    "flat",
    "bungalow",
    "cottage",
    "maisonette",
    "other",
  ]),
  tenure: z.enum(["freehold", "leasehold", "share_of_freehold", "commonhold"]).optional(),
  status: z.enum(["live", "under_offer", "sold_stc", "sold", "withdrawn", "expired"]).default("live"),
  listed_date: z.string().optional(),
  image_urls: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((u) => u.trim())
            .filter(Boolean)
        : []
    ),
});

export type ImportRow = z.infer<typeof importRowSchema>;

export interface ValidatedRow {
  raw: Record<string, string>;
  parsed: ImportRow;
}

export interface RejectedRow {
  raw: Record<string, string>;
  errors: z.ZodError;
}

export function validateImportRow(
  raw: Record<string, string>
): { success: true; data: ImportRow } | { success: false; error: z.ZodError } {
  const result = importRowSchema.safeParse(raw);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
