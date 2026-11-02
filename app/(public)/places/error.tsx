"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ErrorState } from "@/components/ui/error-state";

export default function PlacesError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section padding="lg">
      <Container>
        <ErrorState
          title="Unable to load places"
          description="We couldn't fetch the places. Please try again."
          onRetry={reset}
        />
      </Container>
    </Section>
  );
}
