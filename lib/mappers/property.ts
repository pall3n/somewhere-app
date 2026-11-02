import type { PropertyWithListings } from "@/server/repositories/properties";

export function toPropertyCard(
  property: PropertyWithListings,
  insight?: string
) {
  const listing = property.listings[0];
  const image = listing?.listing_images?.sort(
    (a, b) => a.sort_order - b.sort_order
  )[0];

  return {
    slug: property.slug,
    imageUrl: image?.source_url ?? "/placeholder.svg",
    imageAlt: image?.alt ?? property.address,
    price: listing?.asking_price_gbp ?? 0,
    address: property.address,
    beds: property.beds ?? 0,
    baths: property.baths ?? 0,
    buildingType: (property.building_type ?? "other").replace(/_/g, "-"),
    ...(insight ? { insight } : {}),
  };
}

export function toPropertyCardList(
  properties: PropertyWithListings[],
  insightsMap?: Map<string, string>
) {
  return properties.map((p) => toPropertyCard(p, insightsMap?.get(p.id)));
}
