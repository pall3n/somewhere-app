import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PropertyCard } from "@/features/properties/components/property-card";
import { PlaceCard } from "@/features/places/components/place-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Home, MapPin } from "lucide-react";
import { createClient } from "@/lib/db/client";
import { searchProperties } from "@/server/repositories/properties";
import {
  getAllPublishedPlaces,
  getPlaceGuide,
} from "@/server/repositories/places";
import { getInsightsForTarget } from "@/server/repositories/insights";
import { toPropertyCardList, toPlaceCard } from "@/lib/mappers";

export default async function HomePage() {
  const client = await createClient();

  const { data: properties } = await searchProperties(client, { limit: 6 });

  const insightsMap = new Map<string, string>();
  await Promise.all(
    properties.map(async (p) => {
      const insights = await getInsightsForTarget(client, "property", p.id);
      if (insights[0]) {
        insightsMap.set(p.id, insights[0].body);
      }
    })
  );

  const featuredProperties = toPropertyCardList(properties, insightsMap);

  const places = await getAllPublishedPlaces(client);
  const featuredPlaces = await Promise.all(
    places.map(async (place) => {
      const guide = await getPlaceGuide(client, place.id);
      const summary = (guide?.sections_json?.[0] as { body?: string })?.body;
      return toPlaceCard(place, summary);
    })
  );

  return (
    <>
      <Section padding="lg">
        <Container>
          <h1 className="font-serif text-4xl text-ink md:text-5xl">
            Find somewhere lovely
          </h1>
          <p className="mt-3 max-w-lg text-lg text-stone">
            Discover homes and places in Royal Tunbridge Wells and the
            surrounding villages.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="font-serif text-2xl text-ink">Featured homes</h2>
          {featuredProperties.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.slug} {...property} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Home className="size-8" />}
              title="No homes yet"
              description="Properties will appear here once data is imported."
              className="mt-6"
            />
          )}
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="font-serif text-2xl text-ink">Explore places</h2>
          {featuredPlaces.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPlaces.map((place) => (
                <PlaceCard key={place.slug} {...place} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<MapPin className="size-8" />}
              title="No places yet"
              description="Places will appear here once published."
              className="mt-6"
            />
          )}
        </Container>
      </Section>
    </>
  );
}
