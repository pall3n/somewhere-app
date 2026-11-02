import { describe, it, expect } from "vitest";
import { scorePlaces, type QuizAnswers } from "@/lib/lifestyle/scoring";
import { PLACE_PROFILES } from "@/lib/lifestyle/place-profiles";

describe("scorePlaces", () => {
  it("returns a result for every profile", () => {
    const answers: QuizAnswers = {
      settlementType: "either",
      budget: "flexible",
      priorities: [],
      commute: "not_important",
    };
    const results = scorePlaces(answers, PLACE_PROFILES);
    expect(results).toHaveLength(Object.keys(PLACE_PROFILES).length);
  });

  it("ranks town-seeker higher for tunbridge-wells than langton-green", () => {
    const answers: QuizAnswers = {
      settlementType: "town",
      budget: "flexible",
      priorities: [],
      commute: "not_important",
    };
    const results = scorePlaces(answers, PLACE_PROFILES);
    const tw = results.find((r) => r.slug === "tunbridge-wells")!;
    const lg = results.find((r) => r.slug === "langton-green")!;
    expect(tw.score).toBeGreaterThan(lg.score);
  });

  it("ranks village-seeker higher for langton-green than tunbridge-wells", () => {
    const answers: QuizAnswers = {
      settlementType: "village_hamlet",
      budget: "flexible",
      priorities: [],
      commute: "not_important",
    };
    const results = scorePlaces(answers, PLACE_PROFILES);
    const tw = results.find((r) => r.slug === "tunbridge-wells")!;
    const lg = results.find((r) => r.slug === "langton-green")!;
    expect(lg.score).toBeGreaterThan(tw.score);
  });

  it("awards priority tag bonuses", () => {
    const baseAnswers: QuizAnswers = {
      settlementType: "either",
      budget: "flexible",
      priorities: [],
      commute: "not_important",
    };
    const withCafes: QuizAnswers = {
      ...baseAnswers,
      priorities: ["cafes"],
    };
    const baseResults = scorePlaces(baseAnswers, PLACE_PROFILES);
    const cafesResults = scorePlaces(withCafes, PLACE_PROFILES);

    const twBase = baseResults.find((r) => r.slug === "tunbridge-wells")!;
    const twCafes = cafesResults.find((r) => r.slug === "tunbridge-wells")!;
    // tunbridge-wells has "cafes" tag, so score should be higher
    expect(twCafes.score).toBeGreaterThan(twBase.score);
  });

  it("sorts results descending by score", () => {
    const answers: QuizAnswers = {
      settlementType: "village_hamlet",
      budget: "300_500k",
      priorities: ["quiet", "nature"],
      commute: "not_important",
    };
    const results = scorePlaces(answers, PLACE_PROFILES);
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
    }
  });

  it("includes reasons for matching factors", () => {
    const answers: QuizAnswers = {
      settlementType: "village_hamlet",
      budget: "flexible",
      priorities: ["quiet"],
      commute: "not_important",
    };
    const results = scorePlaces(answers, PLACE_PROFILES);
    const langton = results.find((r) => r.slug === "langton-green")!;
    expect(langton.reasons.length).toBeGreaterThan(0);
  });

  it("includes tradeoffs from the profile", () => {
    const answers: QuizAnswers = {
      settlementType: "either",
      budget: "flexible",
      priorities: [],
      commute: "not_important",
    };
    const results = scorePlaces(answers, PLACE_PROFILES);
    const langton = results.find((r) => r.slug === "langton-green")!;
    expect(langton.tradeoffs).toEqual(PLACE_PROFILES["langton-green"].tradeoffs);
  });

  it("daily commuter bonus applied when commute tag present", () => {
    const withCommute: QuizAnswers = {
      settlementType: "either",
      budget: "flexible",
      priorities: [],
      commute: "daily",
    };
    const withoutCommute: QuizAnswers = {
      ...withCommute,
      commute: "not_important",
    };
    const withResults = scorePlaces(withCommute, PLACE_PROFILES);
    const withoutResults = scorePlaces(withoutCommute, PLACE_PROFILES);

    // tunbridge-wells has "commute" tag
    const twWith = withResults.find((r) => r.slug === "tunbridge-wells")!;
    const twWithout = withoutResults.find((r) => r.slug === "tunbridge-wells")!;
    expect(twWith.score).toBeGreaterThan(twWithout.score);
  });
});
