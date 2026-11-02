import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { createClient } from "@/lib/db/client";
import { getPropertyBySlug } from "@/server/repositories/properties";
import { getActiveListing } from "@/server/repositories/listings";
import { getInsightsForTarget } from "@/server/repositories/insights";
import { PropertyImageGallery } from "@/features/properties/components/property-image-gallery";
import { PropertyKeyFacts } from "@/features/properties/components/property-key-facts";
import { PropertyInsights } from "@/features/properties/components/property-insights";
import { PropertyListingCard } from "@/features/properties/components/property-listing-card";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const client = await createClient();
    const property = await getPropertyBySlug(client, slug);
    return {
      title: `${property.address} | Somewhere`,
      description: `View details for ${property.address} — ${property.beds ?? 0} bed ${(property.building_type ?? "property").replace(/_/g, " ")} in ${property.postcode}.`,
    };
  } catch {
    return { title: "Property not found | Somewhere" };
  }
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const client = await createClient();

  const property = await getPropertyBySlug(client, slug).catch(() => notFound());

  const [listing, insights] = await Promise.all([
    getActiveListing(client, property.id),
    getInsightsForTarget(client, "property", property.id),
  ]);

  const images = listing?.listing_images?.sort(
    (a, b) => a.sort_order - b.sort_order
  ) ?? [];

  return (
    <>
      <Section padding="sm">
        <Container>
          <PropertyImageGallery images={images} address={property.address} />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-8">
              <div>
                <h1 className="font-serif text-3xl text-ink md:text-4xl">
                  {property.address}
                </h1>
                <p className="mt-1 text-stone">{property.postcode}</p>
              </div>

              <PropertyKeyFacts
                beds={property.beds}
                baths={property.baths}
                buildingType={property.building_type}
                tenure={property.tenure}
                postcode={property.postcode}
              />

              {insights.length > 0 && (
                <div>
                  <h2 className="mb-3 font-serif text-xl text-ink">
                    Local insights
                  </h2>
                  <PropertyInsights insights={insights} />
                </div>
              )}
            </div>

            {listing && (
              <aside>
                <PropertyListingCard
                  price={listing.asking_price_gbp}
                  status={listing.status}
                  listedAt={listing.listed_at}
                />
              </aside>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
