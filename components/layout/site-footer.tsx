import { Container } from "@/components/layout/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-serif text-lg text-ink">
          somewhere<span className="text-dusty-rose">.</span>
        </p>
        <p className="text-sm text-stone">
          Helping you find somewhere lovely in Royal Tunbridge Wells.
        </p>
      </Container>
    </footer>
  );
}
