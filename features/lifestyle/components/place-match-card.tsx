import Link from "next/link";
import type { PlaceMatch } from "@/lib/lifestyle/scoring";
import type { Database } from "@/lib/db/types";

type PlaceRow = Database["public"]["Tables"]["places"]["Row"];

interface PlaceMatchCardProps {
  match: PlaceMatch;
  place: PlaceRow;
  summary?: string;
}

const MAX_SCORE = 90; // approximate ceiling for a perfect match

export function PlaceMatchCard({ match, place, summary }: PlaceMatchCardProps) {
  const scorePercent = Math.min(100, Math.round((match.score / MAX_SCORE) * 100));

  const typeLabel =
    place.type.charAt(0).toUpperCase() + place.type.slice(1);

  return (
    <div className="rounded-panel border border-border bg-surface p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-ink">{place.name}</h2>
          <p className="mt-0.5 text-sm text-stone">{typeLabel}</p>
        </div>
        <div className="shrink-0 text-right">
          <span className="text-2xl font-semibold tabular-nums text-ink">
            {scorePercent}%
          </span>
          <p className="text-xs text-stone">match</p>
        </div>
      </div>

      {/* Score bar */}
      <div className="mt-4 h-1.5 rounded-full bg-muted">
        <div
          className="h-1.5 rounded-full bg-ink transition-all"
          style={{ width: `${scorePercent}%` }}
        />
      </div>

      {summary && (
        <p className="mt-4 text-sm leading-relaxed text-stone">{summary}</p>
      )}

      {match.reasons.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {match.reasons.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink">
              <span className="mt-0.5 shrink-0 text-xs">✓</span>
              {r.label}
            </li>
          ))}
        </ul>
      )}

      {match.tradeoffs.length > 0 && (
        <ul className="mt-3 space-y-1">
          {match.tradeoffs.map((t, i) => (
            <li key={i} className="text-sm text-stone">
              {t}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5">
        <Link
          href={`/places/${place.slug}`}
          className="text-sm font-medium text-ink underline-offset-2 hover:underline"
        >
          Explore {place.name} &rarr;
        </Link>
      </div>
    </div>
  );
}
