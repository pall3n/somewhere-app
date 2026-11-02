import type { Database } from "@/lib/db/types";

type PlaceRow = Database["public"]["Tables"]["places"]["Row"];

export function toPlaceCard(place: PlaceRow, summary?: string) {
  return {
    slug: place.slug,
    name: place.name,
    imageUrl: "/placeholder.svg",
    summary: summary ?? `Discover ${place.name}, a lovely ${place.type} to explore.`,
  };
}
