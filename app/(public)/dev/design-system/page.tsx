import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PropertyCard } from "@/features/properties/components/property-card";
import { PlaceCard } from "@/features/places/components/place-card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Home, MapPin } from "lucide-react";

const colors = [
  { name: "Paper", var: "bg-paper", hex: "#FAF8F4" },
  { name: "Olive", var: "bg-olive", hex: "#35473D" },
  { name: "Ink", var: "bg-ink", hex: "#282B28" },
  { name: "Stone", var: "bg-stone", hex: "#6B6E67" },
  { name: "Sage", var: "bg-sage", hex: "#DDE7DC" },
  { name: "Dusty Rose", var: "bg-dusty-rose", hex: "#EEDBD6" },
  { name: "Pale Sky", var: "bg-pale-sky", hex: "#E1EBF1" },
  { name: "Buttercream", var: "bg-buttercream", hex: "#F4E9CF" },
] as const;

export default function DesignSystemPage() {
  return (
    <Container>
      <Section>
        <h1 className="font-serif text-4xl text-ink">Design System</h1>
        <p className="mt-2 text-stone">
          Token reference, type samples, and component previews.
        </p>
      </Section>

      {/* Color Tokens */}
      <Section>
        <h2 className="font-serif text-2xl text-ink">Color Tokens</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {colors.map((color) => (
            <div key={color.name} className="flex flex-col gap-2">
              <div
                className={`h-20 rounded-card border border-border ${color.var}`}
              />
              <p className="text-sm font-medium text-ink">{color.name}</p>
              <p className="text-xs text-stone">{color.hex}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section>
        <h2 className="font-serif text-2xl text-ink">Typography</h2>
        <div className="mt-6 space-y-4">
          <p className="font-serif text-4xl text-ink">
            Instrument Serif — Headlines & Prices
          </p>
          <p className="font-serif text-2xl text-ink">
            £425,000 — Serif for prices
          </p>
          <p className="text-base text-ink">
            DM Sans — Body text at 16px regular weight
          </p>
          <p className="text-sm text-stone">
            DM Sans — Secondary text at 14px in stone
          </p>
          <p className="text-sm font-medium text-ink">
            DM Sans Medium — Interface labels
          </p>
          <p className="text-sm font-semibold text-ink">
            DM Sans Semibold — Emphasis
          </p>
        </div>
      </Section>

      {/* Buttons */}
      <Section>
        <h2 className="font-serif text-2xl text-ink">Buttons</h2>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button>Default (Olive)</Button>
          <Button variant="secondary">Secondary (Sage)</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      {/* Cards */}
      <Section>
        <h2 className="font-serif text-2xl text-ink">Property Card</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PropertyCard
            slug="the-pantiles-flat"
            imageUrl="/placeholder.svg"
            imageAlt="A charming flat near The Pantiles"
            price={325000}
            address="12 The Pantiles, Tunbridge Wells"
            beds={2}
            baths={1}
            buildingType="flat"
            insight="Walking distance to the station"
          />
          <PropertyCard
            slug="rusthall-cottage"
            imageUrl="/placeholder.svg"
            imageAlt="A detached cottage in Rusthall"
            price={750000}
            address="8 Langton Road, Rusthall"
            beds={4}
            baths={2}
            buildingType="detached"
          />
        </div>
      </Section>

      <Section>
        <h2 className="font-serif text-2xl text-ink">Place Card</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PlaceCard
            slug="tunbridge-wells"
            name="Tunbridge Wells"
            imageUrl="/placeholder.svg"
            summary="A historic spa town with independent shops, cafes, and beautiful common land."
          />
          <PlaceCard
            slug="rusthall"
            name="Rusthall"
            imageUrl="/placeholder.svg"
            summary="A quiet village on the edge of the common, known for the Toad Rock."
          />
        </div>
      </Section>

      {/* States */}
      <Section>
        <h2 className="font-serif text-2xl text-ink">Empty & Error States</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <EmptyState
            icon={<Home className="size-8" />}
            title="No saved homes"
            description="Properties you save will appear here."
            action={<Button>Browse homes</Button>}
          />
          <EmptyState
            icon={<MapPin className="size-8" />}
            title="No places found"
            description="Try adjusting your search."
          />
        </div>
        <div className="mt-6">
          <ErrorState
            title="Failed to load properties"
            description="We couldn't load properties right now."
          />
        </div>
      </Section>

      {/* Radii */}
      <Section>
        <h2 className="font-serif text-2xl text-ink">Border Radii</h2>
        <div className="mt-6 flex flex-wrap items-end gap-6">
          {[
            { name: "Chip (8px)", className: "rounded-chip" },
            { name: "Note (10px)", className: "rounded-note" },
            { name: "Card (12px)", className: "rounded-card" },
            { name: "Panel (14px)", className: "rounded-panel" },
          ].map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div
                className={`h-20 w-20 border border-border bg-sage ${r.className}`}
              />
              <p className="text-xs text-stone">{r.name}</p>
            </div>
          ))}
        </div>
      </Section>
    </Container>
  );
}
