import { createClient } from "@supabase/supabase-js";
import type { Database } from "../lib/db/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "http://127.0.0.1:54321";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

async function upsertAgencies() {
  const agencies = [
    { name: "Hawkhurst & Co", website: "https://hawkhurstco.example.com", permission_status: "approved" as const, attribution_text: "Courtesy of Hawkhurst & Co" },
    { name: "Wells Property Group", website: "https://wellsproperty.example.com", permission_status: "approved" as const, attribution_text: "Courtesy of Wells Property Group" },
  ];

  const results: { id: string }[] = [];
  for (const agency of agencies) {
    const { data: existing } = await supabase.from("agencies").select("id").eq("name", agency.name).single();
    if (existing) {
      results.push(existing);
      continue;
    }
    const { data, error } = await supabase.from("agencies").insert(agency).select("id").single();
    if (error) throw error;
    results.push(data);
  }
  return results;
}

async function upsertDataSource(agencyId: string) {
  const name = "Demo Seed";
  const { data: existing } = await supabase.from("data_sources").select("id").eq("name", name).single();
  if (existing) return existing;

  const { data, error } = await supabase
    .from("data_sources")
    .insert({ agency_id: agencyId, kind: "demo" as const, name })
    .select("id")
    .single();
  if (error) throw error;
  return data;
}

async function upsertPlaces() {
  const places = [
    { slug: "tunbridge-wells", name: "Tunbridge Wells", type: "town" as const, status: "published" as const, lat: 51.1326, lng: 0.2631 },
    { slug: "langton-green", name: "Langton Green", type: "village" as const, status: "published" as const, lat: 51.1391, lng: 0.2267 },
    { slug: "rusthall", name: "Rusthall", type: "village" as const, status: "published" as const, lat: 51.1422, lng: 0.2378 },
    { slug: "southborough", name: "Southborough", type: "town" as const, status: "published" as const, lat: 51.1578, lng: 0.2619 },
    { slug: "pembury", name: "Pembury", type: "village" as const, status: "published" as const, lat: 51.1505, lng: 0.3224 },
  ];

  const results: { id: string; slug: string; name: string }[] = [];
  for (const place of places) {
    const { data: existing } = await supabase.from("places").select("id").eq("slug", place.slug).single();
    if (existing) {
      results.push({ id: existing.id, slug: place.slug, name: place.name });
      continue;
    }
    const { slug, name, type, status, lat, lng } = place;
    const { data, error } = await supabase
      .from("places")
      .insert({
        slug,
        name,
        type,
        status,
        centroid: `SRID=4326;POINT(${lng} ${lat})` as unknown,
      })
      .select("id")
      .single();
    if (error) throw error;
    results.push({ id: data.id, slug, name });
  }
  return results;
}

async function upsertPlaceGuides(placeIds: { id: string; name: string }[]) {
  for (const place of placeIds) {
    const { data: existing } = await supabase.from("place_guides").select("id").eq("place_id", place.id).single();
    if (existing) continue;

    const sections = [
      { title: `About ${place.name}`, body: `${place.name} is a charming area in the Royal Tunbridge Wells borough, known for its character and community spirit.` },
      { title: "Getting around", body: "Well connected by road and rail, with regular services to London and the coast." },
      { title: "Local life", body: "A mix of independent shops, cafes, and green spaces make this a desirable place to live." },
    ];

    const { error } = await supabase.from("place_guides").insert({
      place_id: place.id,
      sections_json: sections as Record<string, unknown>[],
      published_at: new Date().toISOString(),
    });
    if (error) throw error;
  }
}

const propertyData = [
  { slug: "12-the-pantiles", address: "12 The Pantiles, Tunbridge Wells", postcode: "TN2 5TN", lat: 51.1282, lng: 0.2641, building_type: "flat" as const, beds: 2, baths: 1, tenure: "leasehold" as const, price: 325000 },
  { slug: "8-langton-road", address: "8 Langton Road, Rusthall", postcode: "TN4 8RE", lat: 51.1415, lng: 0.2345, building_type: "detached" as const, beds: 4, baths: 2, tenure: "freehold" as const, price: 750000 },
  { slug: "23-mount-pleasant", address: "23 Mount Pleasant Road, Tunbridge Wells", postcode: "TN1 1QU", lat: 51.1350, lng: 0.2610, building_type: "terraced" as const, beds: 3, baths: 2, tenure: "freehold" as const, price: 525000 },
  { slug: "5-church-road-pembury", address: "5 Church Road, Pembury", postcode: "TN2 4AR", lat: 51.1510, lng: 0.3200, building_type: "semi_detached" as const, beds: 3, baths: 1, tenure: "freehold" as const, price: 425000 },
  { slug: "17-london-road-southborough", address: "17 London Road, Southborough", postcode: "TN4 0PB", lat: 51.1580, lng: 0.2630, building_type: "terraced" as const, beds: 2, baths: 1, tenure: "freehold" as const, price: 350000 },
  { slug: "4-langton-green-cottage", address: "4 The Green, Langton Green", postcode: "TN3 0JA", lat: 51.1390, lng: 0.2270, building_type: "cottage" as const, beds: 3, baths: 2, tenure: "freehold" as const, price: 680000 },
  { slug: "9-calverley-park", address: "9 Calverley Park, Tunbridge Wells", postcode: "TN1 2JY", lat: 51.1365, lng: 0.2580, building_type: "flat" as const, beds: 1, baths: 1, tenure: "leasehold" as const, price: 250000 },
  { slug: "31-grove-hill", address: "31 Grove Hill Road, Tunbridge Wells", postcode: "TN1 1SP", lat: 51.1340, lng: 0.2565, building_type: "semi_detached" as const, beds: 4, baths: 3, tenure: "freehold" as const, price: 895000 },
  { slug: "14-pembury-road", address: "14 Pembury Road, Tunbridge Wells", postcode: "TN2 3QP", lat: 51.1380, lng: 0.2750, building_type: "terraced" as const, beds: 2, baths: 1, tenure: "freehold" as const, price: 385000 },
  { slug: "6-st-johns-road", address: "6 St Johns Road, Tunbridge Wells", postcode: "TN4 9TP", lat: 51.1440, lng: 0.2510, building_type: "detached" as const, beds: 5, baths: 3, tenure: "freehold" as const, price: 1250000 },
  { slug: "22-high-street-southborough", address: "22 High Street, Southborough", postcode: "TN4 0PB", lat: 51.1575, lng: 0.2605, building_type: "flat" as const, beds: 2, baths: 1, tenure: "leasehold" as const, price: 275000 },
  { slug: "11-warwick-park", address: "11 Warwick Park, Tunbridge Wells", postcode: "TN2 5TA", lat: 51.1295, lng: 0.2620, building_type: "maisonette" as const, beds: 3, baths: 2, tenure: "share_of_freehold" as const, price: 475000 },
  { slug: "3-rusthall-common", address: "3 Rusthall Common, Rusthall", postcode: "TN4 8RD", lat: 51.1430, lng: 0.2360, building_type: "detached" as const, beds: 4, baths: 2, tenure: "freehold" as const, price: 825000 },
  { slug: "19-camden-road", address: "19 Camden Road, Tunbridge Wells", postcode: "TN1 2PT", lat: 51.1325, lng: 0.2555, building_type: "flat" as const, beds: 1, baths: 1, tenure: "leasehold" as const, price: 265000 },
  { slug: "7-henwood-green", address: "7 Henwood Green Road, Pembury", postcode: "TN2 4LH", lat: 51.1490, lng: 0.3180, building_type: "semi_detached" as const, beds: 3, baths: 2, tenure: "freehold" as const, price: 450000 },
  { slug: "28-frant-road", address: "28 Frant Road, Tunbridge Wells", postcode: "TN2 5LH", lat: 51.1260, lng: 0.2665, building_type: "detached" as const, beds: 5, baths: 4, tenure: "freehold" as const, price: 1450000 },
  { slug: "2-speldhurst-road", address: "2 Speldhurst Road, Langton Green", postcode: "TN3 0JH", lat: 51.1385, lng: 0.2250, building_type: "bungalow" as const, beds: 3, baths: 1, tenure: "freehold" as const, price: 550000 },
  { slug: "15-nevill-street", address: "15 Nevill Street, Tunbridge Wells", postcode: "TN2 5TT", lat: 51.1290, lng: 0.2650, building_type: "terraced" as const, beds: 2, baths: 1, tenure: "freehold" as const, price: 395000 },
  { slug: "10-southborough-common", address: "10 Southborough Common, Southborough", postcode: "TN4 0HF", lat: 51.1600, lng: 0.2640, building_type: "detached" as const, beds: 4, baths: 3, tenure: "freehold" as const, price: 975000 },
  { slug: "21-upper-grosvenor", address: "21 Upper Grosvenor Road, Tunbridge Wells", postcode: "TN1 2EP", lat: 51.1345, lng: 0.2530, building_type: "semi_detached" as const, beds: 3, baths: 2, tenure: "freehold" as const, price: 595000 },
];

async function upsertProperties(agencyIds: string[], sourceId: string) {
  for (let i = 0; i < propertyData.length; i++) {
    const p = propertyData[i];
    const { data: existing } = await supabase.from("properties").select("id").eq("slug", p.slug).single();
    if (existing) continue;

    const { data: property, error: propError } = await supabase
      .from("properties")
      .insert({
        slug: p.slug,
        address: p.address,
        postcode: p.postcode,
        point: `SRID=4326;POINT(${p.lng} ${p.lat})` as unknown,
        building_type: p.building_type,
        beds: p.beds,
        baths: p.baths,
        tenure: p.tenure,
      })
      .select("id")
      .single();
    if (propError) throw propError;

    const agencyId = agencyIds[i % agencyIds.length];
    const { data: listing, error: listError } = await supabase
      .from("listings")
      .insert({
        property_id: property.id,
        agency_id: agencyId,
        source_id: sourceId,
        external_id: `DEMO-${p.slug}`,
        asking_price_gbp: p.price,
        status: "live" as const,
        approval_status: "approved" as const,
        listed_at: new Date().toISOString(),
      })
      .select("id")
      .single();
    if (listError) throw listError;

    const imageCount = 2 + (i % 2);
    const images = Array.from({ length: imageCount }, (_, j) => ({
      listing_id: listing.id,
      source_url: `/placeholder.svg`,
      rights_scope: "demo",
      sort_order: j,
      alt: `${p.address} - image ${j + 1}`,
    }));

    const { error: imgError } = await supabase.from("listing_images").insert(images);
    if (imgError) throw imgError;
  }
}

async function seedInsightsAndFacts(propertyIds: string[], placeIds: string[]) {
  const insightBodies = [
    { body: "5-minute walk to the train station", category: "transport" as const, verification: "verified" as const },
    { body: "Outstanding-rated primary school within catchment", category: "schools" as const, verification: "verified" as const },
    { body: "Farmers market every Saturday on the Common", category: "lifestyle" as const, verification: "editor_reviewed" as const },
    { body: "Property prices up 3.2% year-on-year in this area", category: "market" as const, verification: "ai_generated" as const },
    { body: "Area of Outstanding Natural Beauty nearby", category: "environment" as const, verification: "verified" as const },
    { body: "Active neighbourhood watch scheme", category: "community" as const, verification: "unverified" as const },
  ];

  const { data: existingInsights } = await supabase.from("insights").select("id").limit(1);
  if (existingInsights && existingInsights.length > 0) return;

  const insights: Database["public"]["Tables"]["insights"]["Insert"][] = [];
  for (let i = 0; i < propertyIds.length && i < insightBodies.length; i++) {
    insights.push({
      ...insightBodies[i],
      relationship_type: "property" as const,
      target_id: propertyIds[i],
      visibility: "published" as const,
    });
  }
  for (const placeId of placeIds) {
    insights.push({
      body: "Great local community with regular events",
      category: "community" as const,
      relationship_type: "place" as const,
      target_id: placeId,
      verification: "editor_reviewed" as const,
      visibility: "published" as const,
    });
  }

  const { error: insightError } = await supabase.from("insights").insert(insights);
  if (insightError) throw insightError;

  const facts: Database["public"]["Tables"]["facts"]["Insert"][] = propertyIds.slice(0, 5).map((pid, i) => ({
    property_id: pid,
    field_key: "council_tax_band",
    value_json: { band: String.fromCharCode(65 + i) } as unknown,
    confidence_kind: "official" as const,
    provenance_url: "https://www.gov.uk/council-tax-bands",
  }));

  const { error: factsError } = await supabase.from("facts").insert(facts);
  if (factsError) throw factsError;
}

async function main() {
  console.log("Seeding demo data...");

  const agencies = await upsertAgencies();
  console.log(`  Agencies: ${agencies.length}`);

  const source = await upsertDataSource(agencies[0].id);
  console.log(`  Data source: ${source.id}`);

  const places = await upsertPlaces();
  console.log(`  Places: ${places.length}`);

  await upsertPlaceGuides(places);
  console.log("  Place guides created");

  await upsertProperties(
    agencies.map((a) => a.id),
    source.id
  );
  console.log(`  Properties: ${propertyData.length}`);

  const { data: allProperties } = await supabase.from("properties").select("id");
  const propertyIds = (allProperties ?? []).map((p) => p.id);

  await seedInsightsAndFacts(
    propertyIds,
    places.map((p) => p.id)
  );
  console.log("  Insights and facts created");

  console.log("Done!");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
