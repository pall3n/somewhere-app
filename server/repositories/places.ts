import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";

type Client = SupabaseClient<Database>;

export async function getPlaceBySlug(client: Client, slug: string) {
  const { data, error } = await client
    .from("places")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) throw error;
  return data;
}

export async function getAllPublishedPlaces(client: Client) {
  const { data, error } = await client
    .from("places")
    .select("*")
    .eq("status", "published")
    .order("name");

  if (error) throw error;
  return data ?? [];
}

export async function getPlaceGuide(client: Client, placeId: string) {
  const { data, error } = await client
    .from("place_guides")
    .select("*")
    .eq("place_id", placeId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}
