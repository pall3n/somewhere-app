import Image from "next/image";

interface GalleryImage {
  source_url: string;
  alt: string | null;
  sort_order: number;
}

interface PropertyImageGalleryProps {
  images: GalleryImage[];
  address: string;
}

export function PropertyImageGallery({
  images,
  address,
}: PropertyImageGalleryProps) {
  const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);
  const hero = sorted[0];
  const thumbnails = sorted.slice(1);

  if (!hero) {
    return (
      <div className="aspect-[16/9] w-full rounded-card bg-muted" />
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/9] overflow-hidden rounded-card">
        <Image
          src={hero.source_url}
          alt={hero.alt ?? address}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 66vw"
          priority
        />
      </div>
      {thumbnails.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {thumbnails.slice(0, 4).map((img) => (
            <div
              key={img.source_url}
              className="relative aspect-[4/3] overflow-hidden rounded-card"
            >
              <Image
                src={img.source_url}
                alt={img.alt ?? address}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 16vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
