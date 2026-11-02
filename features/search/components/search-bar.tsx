"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ParsedIntent } from "@/lib/ai/schemas";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    try {
      const res = await fetch("/api/search/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });

      const intent: ParsedIntent = await res.json();
      const params = new URLSearchParams(searchParams.toString());

      // Merge hard filters — don't override manually-set params
      const { hardFilters, softPreferences } = intent;

      if (hardFilters.minPrice !== undefined)
        params.set("minPrice", String(hardFilters.minPrice));
      if (hardFilters.maxPrice !== undefined)
        params.set("maxPrice", String(hardFilters.maxPrice));
      if (hardFilters.minBeds !== undefined)
        params.set("minBeds", String(hardFilters.minBeds));
      if (hardFilters.buildingType)
        params.set("buildingType", hardFilters.buildingType);

      // Store soft preferences as base64 in URL
      if (softPreferences.length > 0) {
        const encoded = btoa(JSON.stringify(softPreferences));
        params.set("soft", encoded);
      }

      // Reset page on new search
      params.delete("page");

      router.push(`/homes?${params.toString()}`);
    } catch {
      // On error, fall through — search still navigates with existing params
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      router.push(`/homes?${params.toString()}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. 3 bed terraced under £600k with a garden"
          className="pl-9"
          disabled={loading}
        />
      </div>
      <Button type="submit" disabled={loading || !query.trim()}>
        {loading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Searching…
          </>
        ) : (
          "Search"
        )}
      </Button>
    </form>
  );
}
