import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { EmptyState } from "@/components/ui/empty-state";
import { Home } from "lucide-react";

export default function PropertyNotFound() {
  return (
    <Section padding="lg">
      <Container>
        <EmptyState
          icon={<Home className="size-8" />}
          title="Property not found"
          description="The property you're looking for doesn't exist or has been removed."
          action={
            <Link
              href="/homes"
              className="inline-flex h-8 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/80"
            >
              Browse all homes
            </Link>
          }
        />
      </Container>
    </Section>
  );
}
