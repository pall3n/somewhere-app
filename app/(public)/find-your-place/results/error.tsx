"use client";

import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export default function ResultsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <Section padding="lg">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-serif text-2xl text-ink">Something went wrong</h2>
          <p className="mt-3 text-stone">
            We couldn&apos;t load your place matches. Please try again.
          </p>
          {error.digest && (
            <p className="mt-2 font-mono text-xs text-stone/60">{error.digest}</p>
          )}
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="ghost" onClick={() => router.push("/find-your-place")}>
              Retake quiz
            </Button>
            <Button onClick={reset}>Try again</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
