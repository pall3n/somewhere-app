import { Badge } from "@/components/ui/badge";

interface PropertyListingCardProps {
  price: number | null;
  status: string;
  listedAt: string | null;
}

export function PropertyListingCard({
  price,
  status,
  listedAt,
}: PropertyListingCardProps) {
  const formattedPrice = price
    ? new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0,
      }).format(price)
    : "Price on application";

  const formattedDate = listedAt
    ? new Date(listedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="sticky top-24 rounded-card border border-border bg-card p-6">
      <p className="font-serif text-2xl text-ink">{formattedPrice}</p>
      <div className="mt-3 flex items-center gap-2">
        <Badge variant={status === "live" ? "default" : "secondary"}>
          {status.replace(/_/g, " ")}
        </Badge>
      </div>
      {formattedDate && (
        <p className="mt-3 text-sm text-stone">Listed {formattedDate}</p>
      )}
    </div>
  );
}
