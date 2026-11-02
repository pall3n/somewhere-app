"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ErrorState } from "@/components/ui/error-state";

export default function PropertyDetailError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section padding="lg">
      <Container>
        <ErrorState
          title="Unable to load property"
          description="We couldn't fetch the property details. Please try again."
          onRetry={reset}
        />
      </Container>
    </Section>
  );
}
