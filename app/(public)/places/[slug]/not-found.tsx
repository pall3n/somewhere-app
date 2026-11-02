import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { EmptyState } from "@/components/ui/empty-state";
import { MapPin } from "lucide-react";

export default function PlaceNotFound() {
  return (
    <Section padding="lg">
      <Container>
        <EmptyState
          icon={<MapPin className="size-8" />}
          title="Place not found"
          description="The place you're looking for doesn't exist or has been removed."
          action={
            <Link
              href="/places"
              className="inline-flex h-8 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/80"
            >
              Browse all places
            </Link>
          }
        />
      </Container>
    </Section>
  );
}
