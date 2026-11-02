import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";

type Client = SupabaseClient<Database>;

export async function getSavedProperties(client: Client, userId: string) {
  const { data, error } = await client
    .from("saved_properties")
    .select("*, properties:property_id(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function saveProperty(
  client: Client,
  userId: string,
  propertyId: string,
  note?: string
) {
  const { error } = await client
    .from("saved_properties")
    .upsert({ user_id: userId, property_id: propertyId, note });

  if (error) throw error;
}

export async function removeSavedProperty(
  client: Client,
  userId: string,
  propertyId: string
) {
  const { error } = await client
    .from("saved_properties")
    .delete()
    .eq("user_id", userId)
    .eq("property_id", propertyId);

  if (error) throw error;
}
