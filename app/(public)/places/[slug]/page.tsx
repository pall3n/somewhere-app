import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PropertyCard } from "@/features/properties/components/property-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Home } from "lucide-react";
import { createClient } from "@/lib/db/client";
import { getPlaceBySlug, getPlaceGuide } from "@/server/repositories/places";
import { searchProperties } from "@/server/repositories/properties";
import { getInsightsForTarget } from "@/server/repositories/insights";
import { toPropertyCardList } from "@/lib/mappers";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const client = await createClient();
    const place = await getPlaceBySlug(client, slug);
    return {
      title: `${place.name} | Somewhere`,
      description: `Discover ${place.name}, a ${place.type} in the Royal Tunbridge Wells area.`,
    };
  } catch {
    return { title: "Place not found | Somewhere" };
  }
}

export default async function PlaceDetailPage({ params }: Props) {
  const { slug } = await params;
  const client = await createClient();

  const place = await getPlaceBySlug(client, slug).catch(() => notFound());

  const [guide, insights, { data: nearbyProperties }] = await Promise.all([
    getPlaceGuide(client, place.id),
    getInsightsForTarget(client, "place", place.id),
    searchProperties(client, { limit: 6 }),
  ]);

  const insightsMap = new Map<string, string>();
  await Promise.all(
    nearbyProperties.map(async (p) => {
      const propertyInsights = await getInsightsForTarget(
        client,
        "property",
        p.id
      );
      if (propertyInsights[0]) {
        insightsMap.set(p.id, propertyInsights[0].body);
      }
    })
  );

  const nearbyCards = toPropertyCardList(nearbyProperties, insightsMap);

  const sections =
    (guide?.sections_json as Array<{ title?: string; body?: string }>) ?? [];

  return (
    <>
      <Section padding="lg">
        <Container>
          <p className="text-sm font-medium uppercase tracking-wide text-stone">
            {place.type}
          </p>
          <h1 className="mt-1 font-serif text-4xl text-ink md:text-5xl">
            {place.name}
          </h1>
        </Container>
      </Section>

      {sections.length > 0 && (
        <Section>
          <Container>
            <div className="max-w-2xl space-y-8">
              {sections.map((section, i) => (
                <div key={i}>
                  {section.title && (
                    <h2 className="font-serif text-xl text-ink">
                      {section.title}
                    </h2>
                  )}
                  {section.body && (
                    <p className="mt-2 leading-relaxed text-stone">
                      {section.body}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {insights.length > 0 && (
        <Section>
          <Container>
            <h2 className="mb-3 font-serif text-xl text-ink">Local insights</h2>
            <div className="flex flex-wrap gap-2">
              {insights.map((insight) => (
                <span
                  key={insight.id}
                  className="rounded-chip bg-buttercream px-3 py-1.5 text-xs text-ink"
                >
                  {insight.body}
                </span>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <h2 className="font-serif text-2xl text-ink">Nearby homes</h2>
          {nearbyCards.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {nearbyCards.map((property) => (
                <PropertyCard key={property.slug} {...property} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Home className="size-8" />}
              title="No nearby homes yet"
              description="Properties will appear here once data is imported."
              className="mt-6"
            />
          )}
        </Container>
      </Section>
    </>
  );
}
