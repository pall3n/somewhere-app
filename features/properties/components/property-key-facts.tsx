import { Badge } from "@/components/ui/badge";

interface PropertyKeyFactsProps {
  beds: number | null;
  baths: number | null;
  buildingType: string | null;
  tenure: string | null;
  postcode: string;
}

export function PropertyKeyFacts({
  beds,
  baths,
  buildingType,
  tenure,
  postcode,
}: PropertyKeyFactsProps) {
  const facts = [
    { label: "Bedrooms", value: beds ?? 0 },
    { label: "Bathrooms", value: baths ?? 0 },
    {
      label: "Type",
      value: buildingType ? (
        <Badge variant="secondary">{buildingType.replace(/_/g, " ")}</Badge>
      ) : (
        "—"
      ),
    },
    {
      label: "Tenure",
      value: tenure ? (
        <Badge variant="secondary">{tenure.replace(/_/g, " ")}</Badge>
      ) : (
        "—"
      ),
    },
    { label: "Postcode", value: postcode },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {facts.map((fact) => (
        <div key={fact.label}>
          <p className="text-xs text-stone">{fact.label}</p>
          <p className="mt-0.5 text-sm font-medium text-ink">{fact.value}</p>
        </div>
      ))}
    </div>
  );
}
