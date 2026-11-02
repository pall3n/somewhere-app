import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyDetailLoading() {
  return (
    <>
      <Section padding="sm">
        <Container>
          <Skeleton className="aspect-[16/9] w-full rounded-card" />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] rounded-card" />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-8">
              <div>
                <Skeleton className="h-10 w-80" />
                <Skeleton className="mt-2 h-5 w-24" />
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="mt-1 h-5 w-20" />
                  </div>
                ))}
              </div>
            </div>
            <Skeleton className="h-40 rounded-card" />
          </div>
        </Container>
      </Section>
    </>
  );
}
