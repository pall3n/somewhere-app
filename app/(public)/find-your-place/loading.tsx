import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function FindYourPlaceLoading() {
  return (
    <>
      <Section padding="lg">
        <Container>
          <Skeleton className="h-12 w-64" />
          <Skeleton className="mt-3 h-6 w-96" />
        </Container>
      </Section>

      <Section padding="md">
        <Container>
          <div className="mx-auto max-w-xl space-y-4">
            <Skeleton className="h-1.5 w-full" />
            <Skeleton className="h-8 w-72" />
            <Skeleton className="h-16 w-full rounded-panel" />
            <Skeleton className="h-16 w-full rounded-panel" />
            <Skeleton className="h-16 w-full rounded-panel" />
          </div>
        </Container>
      </Section>
    </>
  );
}
