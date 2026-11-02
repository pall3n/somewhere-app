import type { PlaceProfile } from "./place-profiles";

export type QuizAnswers = {
  settlementType: "town" | "village_hamlet" | "either";
  budget: "under_300k" | "300_500k" | "500_750k" | "over_750k" | "flexible";
  priorities: Array<"nature" | "cafes" | "schools" | "commute" | "quiet">;
  commute: "not_important" | "occasional" | "daily";
};

export interface MatchReason {
  label: string;
}

export interface PlaceMatch {
  slug: string;
  score: number;
  reasons: MatchReason[];
  tradeoffs: string[];
}

const BUDGET_TO_PRICE_RANGE: Record<
  QuizAnswers["budget"],
  Array<PlaceProfile["priceRange"]>
> = {
  under_300k: ["affordable"],
  "300_500k": ["affordable", "mixed"],
  "500_750k": ["mixed", "high"],
  over_750k: ["high"],
  flexible: ["affordable", "mixed", "high"],
};

const PRIORITY_TAG_MAP: Record<QuizAnswers["priorities"][number], string> = {
  nature: "nature",
  cafes: "cafes",
  schools: "schools",
  commute: "commute",
  quiet: "quiet",
};

const PRIORITY_LABELS: Record<QuizAnswers["priorities"][number], string> = {
  nature: "Nature & countryside nearby",
  cafes: "Cafes & restaurants close by",
  schools: "Good schools in the area",
  commute: "Easy commute links",
  quiet: "Peaceful, quiet setting",
};

function settlementMatches(
  quizChoice: QuizAnswers["settlementType"],
  profile: PlaceProfile
): { matches: boolean; exact: boolean } {
  if (quizChoice === "either") return { matches: true, exact: false };
  if (quizChoice === "town")
    return {
      matches: profile.settlementType === "town" || profile.settlementType === "suburb",
      exact: profile.settlementType === "town",
    };
  // village_hamlet
  return {
    matches: profile.settlementType === "village",
    exact: profile.settlementType === "village",
  };
}

export function scorePlaces(
  answers: QuizAnswers,
  profiles: Record<string, PlaceProfile>
): PlaceMatch[] {
  const matches: PlaceMatch[] = Object.entries(profiles).map(
    ([slug, profile]) => {
      let score = 0;
      const reasons: MatchReason[] = [];

      // Settlement type: +30 exact, +15 partial
      const settlement = settlementMatches(answers.settlementType, profile);
      if (settlement.exact) {
        score += 30;
        const label =
          profile.settlementType === "town"
            ? "Town setting, matching your preference"
            : "Village setting, matching your preference";
        reasons.push({ label });
      } else if (settlement.matches) {
        score += 15;
        reasons.push({ label: "Settlement type is a reasonable fit" });
      }

      // Budget: +20 if price range overlaps
      const compatibleRanges = BUDGET_TO_PRICE_RANGE[answers.budget];
      if (compatibleRanges.includes(profile.priceRange)) {
        score += 20;
        const rangeLabel =
          profile.priceRange === "affordable"
            ? "More affordable prices"
            : profile.priceRange === "mixed"
            ? "Mixed price range"
            : "Premium pricing";
        reasons.push({ label: `${rangeLabel} aligns with your budget` });
      }

      // Commute: if daily, commute tag is a bonus +10 (handled via priorities)
      // Already covered by priority scoring below

      // Priority tags: +10 each
      for (const priority of answers.priorities) {
        const tag = PRIORITY_TAG_MAP[priority];
        if (profile.tags.includes(tag)) {
          score += 10;
          reasons.push({ label: PRIORITY_LABELS[priority] });
        }
      }

      // Commute alignment: if daily commuter and commute tag present, extra +10
      if (answers.commute === "daily" && profile.tags.includes("commute")) {
        score += 10;
        reasons.push({ label: "Good commute links for daily travel" });
      }

      return { slug, score, reasons, tradeoffs: profile.tradeoffs };
    }
  );

  return matches.sort((a, b) => b.score - a.score);
}
