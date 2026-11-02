import { describe, it, expect, vi, beforeEach } from "vitest";
import { parsedIntentSchema } from "@/lib/ai/schemas";

// We test the fallback by mocking the ai module to throw an error
vi.mock("ai", () => ({
  generateObject: vi.fn(),
}));

vi.mock("@ai-sdk/anthropic", () => ({
  anthropic: vi.fn(() => ({ modelId: "claude-haiku-4-5" })),
}));

describe("parseSearchQuery", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("returns fallback on network error", async () => {
    const { generateObject } = await import("ai");
    vi.mocked(generateObject).mockRejectedValueOnce(new Error("Network error"));

    const { parseSearchQuery } = await import("@/lib/ai/parse-search-query");
    const result = await parseSearchQuery("3 bed cottage garden");

    expect(result.hardFilters).toEqual({});
    expect(result.softPreferences).toEqual([]);
    expect(result.unknownTerms).toEqual(["3 bed cottage garden"]);
  });

  it("returns parsed result on success", async () => {
    const { generateObject } = await import("ai");
    const mockResult = {
      hardFilters: { minBeds: 3, buildingType: "cottage" as const },
      softPreferences: [
        { key: "garden", value: "Has a garden", importance: "important" as const },
      ],
      unknownTerms: [],
      interpretation: "3-bed cottage with a garden",
    };
    vi.mocked(generateObject).mockResolvedValueOnce({ object: mockResult } as never);

    const { parseSearchQuery } = await import("@/lib/ai/parse-search-query");
    const result = await parseSearchQuery("3 bed cottage with garden");

    expect(result.hardFilters.minBeds).toBe(3);
    expect(result.hardFilters.buildingType).toBe("cottage");
    expect(result.softPreferences).toHaveLength(1);
    expect(result.softPreferences[0].key).toBe("garden");
  });
});

describe("parsedIntentSchema", () => {
  it("validates a complete intent object", () => {
    const result = parsedIntentSchema.safeParse({
      hardFilters: { minBeds: 2, maxPrice: 600000 },
      softPreferences: [
        { key: "quiet", value: "Quiet area", importance: "prefer" },
      ],
      unknownTerms: ["lovely"],
      interpretation: "2-bed under £600k in a quiet area",
    });
    expect(result.success).toBe(true);
  });

  it("validates empty filters", () => {
    const result = parsedIntentSchema.safeParse({
      hardFilters: {},
      softPreferences: [],
      unknownTerms: [],
      interpretation: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid building type", () => {
    const result = parsedIntentSchema.safeParse({
      hardFilters: { buildingType: "mansion" },
      softPreferences: [],
      unknownTerms: [],
      interpretation: "",
    });
    expect(result.success).toBe(false);
  });
});
