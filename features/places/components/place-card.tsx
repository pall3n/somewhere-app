import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";

interface PlaceCardProps {
  slug: string;
  name: string;
  imageUrl: string;
  summary: string;
  className?: string;
}

export function PlaceCard({
  slug,
  name,
  imageUrl,
  summary,
  className,
}: PlaceCardProps) {
  return (
    <article
      data-testid="place-card"
      className={cn(
        "group relative overflow-hidden rounded-card bg-card transition-transform duration-200 hover:scale-[1.035]",
        className
      )}
    >
      <Link href={`/places/${slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">Explore {name}</span>
      </Link>

      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <h3 className="font-serif text-lg text-ink">{name}</h3>
        <p className="mt-1 text-sm text-stone line-clamp-2">{summary}</p>
      </div>
    </article>
  );
}
