import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";
import { SaveButton } from "@/features/properties/components/save-button";

interface PropertyCardProps {
  slug: string;
  imageUrl: string;
  imageAlt: string;
  price: number;
  address: string;
  beds: number;
  baths: number;
  buildingType: string;
  insight?: string;
  className?: string;
}

export function PropertyCard({
  slug,
  imageUrl,
  imageAlt,
  price,
  address,
  beds,
  baths,
  buildingType,
  insight,
  className,
}: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <article
      data-testid="property-card"
      className={cn(
        "group relative overflow-hidden rounded-card bg-card transition-transform duration-200 hover:scale-[1.035]",
        className
      )}
    >
      <Link href={`/homes/${slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {address}</span>
      </Link>

      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <SaveButton address={address} />
      </div>

      <div className="p-4">
        <p className="font-serif text-xl text-ink">{formattedPrice}</p>
        <p className="mt-1 text-sm text-stone">{address}</p>
        <div className="mt-2 flex items-center gap-3 text-xs text-stone">
          <span>{beds} bed{beds !== 1 ? "s" : ""}</span>
          <span className="text-border">|</span>
          <span>{baths} bath{baths !== 1 ? "s" : ""}</span>
          <span className="text-border">|</span>
          <span className="capitalize">{buildingType}</span>
        </div>
        {insight && (
          <p className="mt-3 rounded-chip bg-buttercream px-3 py-1.5 text-xs text-ink">
            {insight}
          </p>
        )}
      </div>
    </article>
  );
}
