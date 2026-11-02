import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PlaceCard } from "@/features/places/components/place-card";
import { EmptyState } from "@/components/ui/empty-state";
import { MapPin } from "lucide-react";
import { createClient } from "@/lib/db/client";
import {
  getAllPublishedPlaces,
  getPlaceGuide,
} from "@/server/repositories/places";
import { toPlaceCard } from "@/lib/mappers";

export const metadata: Metadata = {
  title: "Places | Somewhere",
};

export default async function PlacesPage() {
  const client = await createClient();
  const places = await getAllPublishedPlaces(client);

  const cards = await Promise.all(
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
          <h1 className="font-serif text-4xl text-ink md:text-5xl">Places</h1>
          <p className="mt-3 max-w-lg text-lg text-stone">
            Explore towns and villages in the Royal Tunbridge Wells area.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          {cards.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((place) => (
                <PlaceCard key={place.slug} {...place} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<MapPin className="size-8" />}
              title="No places yet"
              description="Places will appear here once published."
            />
          )}
        </Container>
      </Section>
    </>
  );
}
