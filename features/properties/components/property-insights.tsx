import type { Database } from "@/lib/db/types";

type InsightCategory = Database["public"]["Enums"]["insight_category"];

interface Insight {
  id: string;
  body: string;
  category: InsightCategory;
}

const categoryColors: Record<InsightCategory, string> = {
  transport: "bg-buttercream",
  schools: "bg-pale-sky",
  lifestyle: "bg-sage",
  market: "bg-secondary",
  environment: "bg-sage",
  community: "bg-buttercream",
};

interface PropertyInsightsProps {
  insights: Insight[];
}

export function PropertyInsights({ insights }: PropertyInsightsProps) {
  if (insights.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {insights.map((insight) => (
        <span
          key={insight.id}
          className={`rounded-chip px-3 py-1.5 text-xs text-ink ${categoryColors[insight.category] ?? "bg-secondary"}`}
        >
          {insight.body}
        </span>
      ))}
    </div>
  );
}
