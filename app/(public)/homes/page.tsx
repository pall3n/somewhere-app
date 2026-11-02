import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PropertyCard } from "@/features/properties/components/property-card";
import { PropertyFiltersBar } from "@/features/properties/components/property-filters-bar";
import { SearchBar } from "@/features/search/components/search-bar";
import { FilterChips } from "@/features/search/components/filter-chips";
import { Pagination } from "@/features/properties/components/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { Home } from "lucide-react";
import { createClient } from "@/lib/db/client";
import { searchProperties } from "@/server/repositories/properties";
import { getInsightsForTarget } from "@/server/repositories/insights";
import { toPropertyCardList } from "@/lib/mappers";
import type { Database } from "@/lib/db/types";

export const metadata: Metadata = {
  title: "Homes | Somewhere",
};

const PAGE_SIZE = 12;

export default async function HomesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const minBeds = params.minBeds ? Number(params.minBeds) : undefined;
  const buildingType = params.buildingType as
    | Database["public"]["Enums"]["building_type"]
    | undefined;

  const client = await createClient();
  const { data: properties, count } = await searchProperties(client, {
    minPrice,
    maxPrice,
    minBeds,
    buildingType,
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  });

  const insightsMap = new Map<string, string>();
  await Promise.all(
    properties.map(async (p) => {
      const insights = await getInsightsForTarget(client, "property", p.id);
      if (insights[0]) {
        insightsMap.set(p.id, insights[0].body);
      }
    })
  );

  const cards = toPropertyCardList(properties, insightsMap);
  const totalPages = Math.ceil(count / PAGE_SIZE);

  const filterParams: Record<string, string> = {};
  if (params.minPrice) filterParams.minPrice = String(params.minPrice);
  if (params.maxPrice) filterParams.maxPrice = String(params.maxPrice);
  if (params.minBeds) filterParams.minBeds = String(params.minBeds);
  if (params.buildingType)
    filterParams.buildingType = String(params.buildingType);

  return (
    <>
      <Section padding="lg">
        <Container>
          <h1 className="font-serif text-4xl text-ink md:text-5xl">Homes</h1>
          <p className="mt-3 max-w-lg text-lg text-stone">
            Browse properties in Royal Tunbridge Wells and surrounding areas.
          </p>
        </Container>
      </Section>

      <Section padding="sm">
        <Container className="space-y-3">
          <SearchBar />
          <PropertyFiltersBar />
          <FilterChips />
        </Container>
      </Section>

      <Section>
        <Container>
          {cards.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((property) => (
                  <PropertyCard key={property.slug} {...property} />
                ))}
              </div>
              <div className="mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  basePath="/homes"
                  searchParams={filterParams}
                />
              </div>
            </>
          ) : (
            <EmptyState
              icon={<Home className="size-8" />}
              title="No homes found"
              description="Try adjusting your filters to see more results."
            />
          )}
        </Container>
      </Section>
    </>
  );
}
