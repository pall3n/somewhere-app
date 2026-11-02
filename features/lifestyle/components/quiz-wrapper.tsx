"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { QuizAnswers } from "@/lib/lifestyle/scoring";

type Step = 0 | 1 | 2 | 3;

const TOTAL_STEPS = 4;

const SETTLEMENT_OPTIONS: Array<{
  value: QuizAnswers["settlementType"];
  label: string;
  description: string;
}> = [
  {
    value: "town",
    label: "A town",
    description: "More amenities, bustle, and variety on your doorstep",
  },
  {
    value: "village_hamlet",
    label: "A village or hamlet",
    description: "Quieter, more community feel, surrounded by countryside",
  },
  {
    value: "either",
    label: "Either",
    description: "Open to both — show me everything",
  },
];

const BUDGET_OPTIONS: Array<{
  value: QuizAnswers["budget"];
  label: string;
}> = [
  { value: "under_300k", label: "Under £300k" },
  { value: "300_500k", label: "£300–500k" },
  { value: "500_750k", label: "£500–750k" },
  { value: "over_750k", label: "Over £750k" },
  { value: "flexible", label: "Flexible" },
];

const PRIORITY_OPTIONS: Array<{
  value: QuizAnswers["priorities"][number];
  label: string;
}> = [
  { value: "nature", label: "Nature & countryside" },
  { value: "cafes", label: "Cafes & restaurants" },
  { value: "schools", label: "Good schools" },
  { value: "commute", label: "Commute links" },
  { value: "quiet", label: "Peace & quiet" },
];

const COMMUTE_OPTIONS: Array<{
  value: QuizAnswers["commute"];
  label: string;
}> = [
  { value: "not_important", label: "Not important" },
  { value: "occasional", label: "Occasionally" },
  { value: "daily", label: "Daily commuter" },
];

export function QuizWrapper() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({
    priorities: [],
  });

  function goNext() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1) as Step);
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0) as Step);
  }

  function skip() {
    if (step < TOTAL_STEPS - 1) {
      goNext();
    } else {
      finish();
    }
  }

  function finish() {
    const params = new URLSearchParams();
    if (answers.settlementType) params.set("settlementType", answers.settlementType);
    if (answers.budget) params.set("budget", answers.budget);
    if (answers.commute) params.set("commute", answers.commute);
    for (const p of answers.priorities ?? []) {
      params.append("priorities", p);
    }
    router.push(`/find-your-place/results?${params.toString()}`);
  }

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="mx-auto max-w-xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="h-1 rounded-full bg-muted">
          <div
            className="h-1 rounded-full bg-ink transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-stone">
          Step {step + 1} of {TOTAL_STEPS}
        </p>
      </div>

      {/* Step 0: Settlement */}
      {step === 0 && (
        <div>
          <h2 className="font-serif text-2xl text-ink">
            What kind of place are you drawn to?
          </h2>
          <div className="mt-6 space-y-3">
            {SETTLEMENT_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-start gap-3 rounded-panel border p-4 transition-colors ${
                  answers.settlementType === opt.value
                    ? "border-ink bg-surface"
                    : "border-border hover:border-ink/40"
                }`}
              >
                <input
                  type="radio"
                  name="settlementType"
                  value={opt.value}
                  checked={answers.settlementType === opt.value}
                  onChange={() =>
                    setAnswers((a) => ({ ...a, settlementType: opt.value }))
                  }
                  className="mt-0.5 shrink-0"
                />
                <span className="block font-medium text-ink">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Budget */}
      {step === 1 && (
        <div>
          <h2 className="font-serif text-2xl text-ink">What&apos;s your budget?</h2>
          <div className="mt-6 space-y-3">
            {BUDGET_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-center gap-3 rounded-panel border p-4 transition-colors ${
                  answers.budget === opt.value
                    ? "border-ink bg-surface"
                    : "border-border hover:border-ink/40"
                }`}
              >
                <input
                  type="radio"
                  name="budget"
                  value={opt.value}
                  checked={answers.budget === opt.value}
                  onChange={() =>
                    setAnswers((a) => ({ ...a, budget: opt.value }))
                  }
                  className="shrink-0"
                />
                <p className="font-medium text-ink">{opt.label}</p>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Priorities */}
      {step === 2 && (
        <div>
          <h2 className="font-serif text-2xl text-ink">
            What matters most to you?
          </h2>
          <p className="mt-2 text-sm text-stone">Select all that apply.</p>
          <div className="mt-6 space-y-3">
            {PRIORITY_OPTIONS.map((opt) => {
              const checked = (answers.priorities ?? []).includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-panel border p-4 transition-colors ${
                    checked
                      ? "border-ink bg-surface"
                      : "border-border hover:border-ink/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      setAnswers((a) => {
                        const current = a.priorities ?? [];
                        return {
                          ...a,
                          priorities: checked
                            ? current.filter((p) => p !== opt.value)
                            : [...current, opt.value],
                        };
                      });
                    }}
                    className="shrink-0"
                  />
                  <p className="font-medium text-ink">{opt.label}</p>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Commute */}
      {step === 3 && (
        <div>
          <h2 className="font-serif text-2xl text-ink">
            How often will you commute?
          </h2>
          <div className="mt-6 space-y-3">
            {COMMUTE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-center gap-3 rounded-panel border p-4 transition-colors ${
                  answers.commute === opt.value
                    ? "border-ink bg-surface"
                    : "border-border hover:border-ink/40"
                }`}
              >
                <input
                  type="radio"
                  name="commute"
                  value={opt.value}
                  checked={answers.commute === opt.value}
                  onChange={() =>
                    setAnswers((a) => ({ ...a, commute: opt.value }))
                  }
                  className="shrink-0"
                />
                <p className="font-medium text-ink">{opt.label}</p>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-2">
          {step > 0 && (
            <Button variant="ghost" onClick={goBack}>
              Back
            </Button>
          )}
          <Button variant="ghost" onClick={skip}>
            Skip
          </Button>
        </div>

        {step < TOTAL_STEPS - 1 ? (
          <Button onClick={goNext}>Next</Button>
        ) : (
          <Button onClick={finish}>See my matches</Button>
        )}
      </div>
    </div>
  );
}
