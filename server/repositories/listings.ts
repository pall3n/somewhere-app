import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/db/types";

type Client = SupabaseClient<Database>;

type ListingRow = Database["public"]["Tables"]["listings"]["Row"];
type ListingImageRow = Database["public"]["Tables"]["listing_images"]["Row"];

export type ListingWithImages = ListingRow & {
  listing_images: ListingImageRow[];
};

export async function getListingsByPropertyId(
  client: Client,
  propertyId: string
): Promise<ListingWithImages[]> {
  const { data, error } = await client
    .from("listings")
    .select("*, listing_images(*)")
    .eq("property_id", propertyId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as ListingWithImages[];
}

export async function getActiveListing(client: Client, propertyId: string): Promise<ListingWithImages | null> {
  const { data, error } = await client
    .from("listings")
    .select("*, listing_images(*)")
    .eq("property_id", propertyId)
    .eq("status", "live")
    .eq("approval_status", "approved")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data as unknown as ListingWithImages | null;
}
