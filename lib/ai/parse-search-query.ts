import { generateObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { parsedIntentSchema, type ParsedIntent } from "./schemas";

const SYSTEM_PROMPT = `You are a UK property search assistant. Parse a user's natural language search query into structured filters.

Rules:
- Hard filters: only concrete, numeric or enumerable facts
  - minPrice / maxPrice: numeric prices in GBP (e.g. "under 600k" → maxPrice: 600000)
  - minBeds: minimum bedrooms as integer (e.g. "3 bed" → minBeds: 3)
  - buildingType: only if explicitly stated — one of: detached, semi_detached, terraced, flat, bungalow, cottage, maisonette, other
- Soft preferences: lifestyle or qualitative desires (garden, quiet, countryside, good schools, near station)
  - key: short identifier (e.g. "garden", "quiet_location", "countryside")
  - value: human-readable phrase (e.g. "Has a garden", "Quiet area", "Rural / countryside setting")
  - importance: "important" if strongly stated, "prefer" otherwise
- unknownTerms: vague adjectives or terms that cannot be mapped (e.g. "lovely", "nice", "spacious") — do not invent meanings
- interpretation: one short sentence summarising what you understood (max 200 chars)
- Never invent facts. If something is unclear, put it in unknownTerms.`;

const FALLBACK: ParsedIntent = {
  hardFilters: {},
  softPreferences: [],
  unknownTerms: [],
  interpretation: "",
};

export async function parseSearchQuery(query: string): Promise<ParsedIntent> {
  try {
    const { object } = await generateObject({
      model: anthropic("claude-haiku-4-5"),
      schema: parsedIntentSchema,
      system: SYSTEM_PROMPT,
      prompt: query,
    });
    return object;
  } catch {
    return { ...FALLBACK, unknownTerms: [query] };
  }
}
