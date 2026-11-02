"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

type SoftPreference = {
  key: string;
  value: string;
  importance: "prefer" | "important";
};

function parseSoftPreferences(raw: string | null): SoftPreference[] {
  if (!raw) return [];
  try {
    return JSON.parse(atob(raw)) as SoftPreference[];
  } catch {
    return [];
  }
}

function formatFilterLabel(key: string, value: string): string {
  const map: Record<string, (v: string) => string> = {
    minPrice: (v) => `Min £${Number(v).toLocaleString("en-GB")}`,
    maxPrice: (v) => `Max £${Number(v).toLocaleString("en-GB")}`,
    minBeds: (v) => `Min ${v} bed${Number(v) === 1 ? "" : "s"}`,
    buildingType: (v) =>
      v
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join("-"),
  };
  return map[key]?.(value) ?? value;
}

const FILTER_KEYS = ["minPrice", "maxPrice", "minBeds", "buildingType"] as const;

export function FilterChips() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeFilters = FILTER_KEYS.filter((k) => searchParams.has(k)).map(
    (k) => ({ key: k, value: searchParams.get(k)! })
  );

  const softPreferences = parseSoftPreferences(searchParams.get("soft"));
  const hasAny = activeFilters.length > 0 || softPreferences.length > 0;

  if (!hasAny) return null;

  function removeFilter(key: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    params.delete("page");
    router.push(`/homes?${params.toString()}`);
  }

  function clearSoft() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("soft");
    router.push(`/homes?${params.toString()}`);
  }

  function clearAll() {
    router.push("/homes");
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {activeFilters.map(({ key, value }) => (
        <span
          key={key}
          className="flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-sm text-ink"
        >
          {formatFilterLabel(key, value)}
          <button
            onClick={() => removeFilter(key)}
            className="ml-1 rounded-full p-0.5 hover:bg-muted"
            aria-label={`Remove ${formatFilterLabel(key, value)} filter`}
          >
            <X className="size-3" />
          </button>
        </span>
      ))}

      {softPreferences.length > 0 && (
        <>
          {softPreferences.map((pref) => (
            <span
              key={pref.key}
              className="flex items-center gap-1 rounded-full border border-border/50 bg-muted px-3 py-1 text-sm text-stone"
              title={pref.importance === "important" ? "Important to you" : "Preferred"}
            >
              {pref.value}
            </span>
          ))}
          <button
            onClick={clearSoft}
            className="text-sm text-stone underline-offset-2 hover:underline"
          >
            Clear preferences
          </button>
        </>
      )}

      {hasAny && (
        <button
          onClick={clearAll}
          className="text-sm text-stone underline-offset-2 hover:underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
