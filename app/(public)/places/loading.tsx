import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlacesLoading() {
  return (
    <>
      <Section padding="lg">
        <Container>
          <Skeleton className="h-12 w-48" />
          <Skeleton className="mt-3 h-6 w-96" />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-card">
                <Skeleton className="aspect-[3/2] w-full" />
                <div className="p-4">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="mt-2 h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
