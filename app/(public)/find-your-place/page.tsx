import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { QuizWrapper } from "@/features/lifestyle/components/quiz-wrapper";

export const metadata: Metadata = {
  title: "Find your kind of place | Somewhere",
};

export default function FindYourPlacePage() {
  return (
    <>
      <Section padding="lg">
        <Container>
          <h1 className="font-serif text-4xl text-ink md:text-5xl">
            Find your kind of place
          </h1>
          <p className="mt-3 max-w-lg text-lg text-stone">
            Answer a few quick questions and we&apos;ll show you which areas suit you best.
          </p>
        </Container>
      </Section>

      <Section padding="md">
        <Container>
          <QuizWrapper />
        </Container>
      </Section>
    </>
  );
}
