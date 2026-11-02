import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomesLoading() {
  return (
    <>
      <Section padding="lg">
        <Container>
          <Skeleton className="h-12 w-48" />
          <Skeleton className="mt-3 h-6 w-96" />
        </Container>
      </Section>

      <Section padding="sm">
        <Container>
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-28" />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-card">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="mt-2 h-4 w-48" />
                  <Skeleton className="mt-2 h-4 w-32" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
