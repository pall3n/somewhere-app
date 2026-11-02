"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const pricePresets = [
  { value: "100000", label: "£100k" },
  { value: "200000", label: "£200k" },
  { value: "300000", label: "£300k" },
  { value: "500000", label: "£500k" },
  { value: "750000", label: "£750k" },
  { value: "1000000", label: "£1M" },
  { value: "1500000", label: "£1.5M" },
];

const bedroomPresets = [
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

const buildingTypes = [
  { value: "detached", label: "Detached" },
  { value: "semi_detached", label: "Semi-detached" },
  { value: "terraced", label: "Terraced" },
  { value: "flat", label: "Flat" },
  { value: "bungalow", label: "Bungalow" },
  { value: "cottage", label: "Cottage" },
  { value: "maisonette", label: "Maisonette" },
];

export function PropertyFiltersBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`/homes?${params.toString()}`);
  }

  const hasFilters =
    searchParams.has("minPrice") ||
    searchParams.has("maxPrice") ||
    searchParams.has("minBeds") ||
    searchParams.has("buildingType");

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={searchParams.get("minPrice") ?? ""}
        onValueChange={(v) => updateParam("minPrice", v || null)}
      >
        <SelectTrigger size="sm">
          <SelectValue placeholder="Min price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Any</SelectItem>
          {pricePresets.map((p) => (
            <SelectItem key={p.value} value={p.value}>
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get("maxPrice") ?? ""}
        onValueChange={(v) => updateParam("maxPrice", v || null)}
      >
        <SelectTrigger size="sm">
          <SelectValue placeholder="Max price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Any</SelectItem>
          {pricePresets.map((p) => (
            <SelectItem key={p.value} value={p.value}>
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get("minBeds") ?? ""}
        onValueChange={(v) => updateParam("minBeds", v || null)}
      >
        <SelectTrigger size="sm">
          <SelectValue placeholder="Bedrooms" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Any</SelectItem>
          {bedroomPresets.map((p) => (
            <SelectItem key={p.value} value={p.value}>
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get("buildingType") ?? ""}
        onValueChange={(v) => updateParam("buildingType", v || null)}
      >
        <SelectTrigger size="sm">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Any</SelectItem>
          {buildingTypes.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/homes")}
        >
          Clear all
        </Button>
      )}
    </div>
  );
}
