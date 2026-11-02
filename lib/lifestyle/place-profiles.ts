export type SettlementType = "town" | "village" | "suburb";
export type PriceRange = "affordable" | "mixed" | "high";

export interface PlaceProfile {
  settlementType: SettlementType;
  priceRange: PriceRange;
  tags: string[];
  tradeoffs: string[];
}

export const PLACE_PROFILES: Record<string, PlaceProfile> = {
  "tunbridge-wells": {
    settlementType: "town",
    priceRange: "mixed",
    tags: ["cafes", "schools", "commute", "culture"],
    tradeoffs: ["Busier than surrounding villages", "Higher prices"],
  },
  "langton-green": {
    settlementType: "village",
    priceRange: "high",
    tags: ["quiet", "nature", "community"],
    tradeoffs: ["Limited amenities", "Car needed for most errands"],
  },
  "rusthall": {
    settlementType: "village",
    priceRange: "mixed",
    tags: ["quiet", "community", "nature", "schools"],
    tradeoffs: ["Short drive to town centre", "Fewer cafes and shops"],
  },
  "southborough": {
    settlementType: "suburb",
    priceRange: "affordable",
    tags: ["commute", "schools", "cafes", "community"],
    tradeoffs: ["More suburban feel", "Less countryside access"],
  },
  "pembury": {
    settlementType: "village",
    priceRange: "mixed",
    tags: ["quiet", "schools", "nature", "community"],
    tradeoffs: ["Requires a car for most errands", "Limited dining options"],
  },
};
