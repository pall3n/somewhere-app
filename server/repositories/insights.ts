import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";

type Client = SupabaseClient<Database>;

export async function getInsightsForTarget(
  client: Client,
  type: Database["public"]["Enums"]["insight_relationship"],
  targetId: string
) {
  const { data, error } = await client
    .from("insights")
    .select("*")
    .eq("relationship_type", type)
    .eq("target_id", targetId)
    .eq("visibility", "published")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
