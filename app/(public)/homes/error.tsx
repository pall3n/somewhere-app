"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ErrorState } from "@/components/ui/error-state";

export default function HomesError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section padding="lg">
      <Container>
        <ErrorState
          title="Unable to load homes"
          description="We couldn't fetch the property listings. Please try again."
          onRetry={reset}
        />
      </Container>
    </Section>
  );
}
