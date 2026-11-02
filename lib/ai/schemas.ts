import { z } from "zod";

export const hardFiltersSchema = z.object({
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minBeds: z.number().int().min(1).max(10).optional(),
  buildingType: z
    .enum([
      "detached",
      "semi_detached",
      "terraced",
      "flat",
      "bungalow",
      "cottage",
      "maisonette",
      "other",
    ])
    .optional(),
});

export const parsedIntentSchema = z.object({
  hardFilters: hardFiltersSchema,
  softPreferences: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
      importance: z.enum(["prefer", "important"]),
    })
  ),
  unknownTerms: z.array(z.string()),
  interpretation: z.string().max(200),
});

export type ParsedIntent = z.infer<typeof parsedIntentSchema>;
export type HardFilters = z.infer<typeof hardFiltersSchema>;
