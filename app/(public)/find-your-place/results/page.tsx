import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { EmptyState } from "@/components/ui/empty-state";
import { MapPin } from "lucide-react";
import { createClient } from "@/lib/db/client";
import { getAllPublishedPlaces, getPlaceGuide } from "@/server/repositories/places";
import { scorePlaces, type QuizAnswers } from "@/lib/lifestyle/scoring";
import { PLACE_PROFILES } from "@/lib/lifestyle/place-profiles";
import { PlaceMatchCard } from "@/features/lifestyle/components/place-match-card";

export const metadata: Metadata = {
  title: "Your place matches | Somewhere",
};

function parseAnswers(
  params: Record<string, string | string[] | undefined>
): QuizAnswers {
  const settlementType = (params.settlementType as QuizAnswers["settlementType"]) ?? "either";
  const budget = (params.budget as QuizAnswers["budget"]) ?? "flexible";
  const commute = (params.commute as QuizAnswers["commute"]) ?? "not_important";

  const rawPriorities = params.priorities;
  const priorities: QuizAnswers["priorities"] = [];
  const validPriorities = ["nature", "cafes", "schools", "commute", "quiet"] as const;

  const rawList = Array.isArray(rawPriorities)
    ? rawPriorities
    : rawPriorities
    ? [rawPriorities]
    : [];

  for (const p of rawList) {
    if (validPriorities.includes(p as (typeof validPriorities)[number])) {
      priorities.push(p as QuizAnswers["priorities"][number]);
    }
  }

  return { settlementType, budget, priorities, commute };
}

function extractSummary(guide: { sections_json: Record<string, unknown>[] } | null): string | undefined {
  if (!guide?.sections_json?.[0]) return undefined;
  const firstSection = guide.sections_json[0];
  if (typeof firstSection.content === "string") return firstSection.content;
  if (typeof firstSection.body === "string") return firstSection.body;
  if (typeof firstSection.text === "string") return firstSection.text;
  return undefined;
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const answers = parseAnswers(params);

  const client = await createClient();
  const places = await getAllPublishedPlaces(client);

  const matches = scorePlaces(answers, PLACE_PROFILES);

  // Fetch guide summaries for each place
  const guideSummaries = new Map<string, string | undefined>();
  await Promise.all(
    places.map(async (place) => {
      const guide = await getPlaceGuide(client, place.id);
      guideSummaries.set(place.slug, extractSummary(guide));
    })
  );

  const placesBySlug = new Map(places.map((p) => [p.slug, p]));

  const rankedMatches = matches
    .map((match) => ({ match, place: placesBySlug.get(match.slug) }))
    .filter((m): m is { match: (typeof matches)[number]; place: NonNullable<ReturnType<typeof placesBySlug.get>> } =>
      m.place !== undefined
    );

  const hasResults = rankedMatches.some((m) => m.match.score > 0);

  return (
    <>
      <Section padding="lg">
        <Container>
          <h1 className="font-serif text-4xl text-ink md:text-5xl">
            Your place matches
          </h1>
          <p className="mt-3 max-w-lg text-lg text-stone">
            Based on your answers, here are the areas that suit you best.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          {hasResults ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rankedMatches.map(({ match, place }) => (
                <PlaceMatchCard
                  key={place.slug}
                  match={match}
                  place={place}
                  summary={guideSummaries.get(place.slug)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<MapPin className="size-8" />}
              title="No matches found"
              description="Try retaking the quiz with different preferences to see recommendations."
            />
          )}
        </Container>
      </Section>
    </>
  );
}
