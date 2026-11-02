-- Enum types
create type permission_status as enum ('pending', 'approved', 'denied');
create type data_source_kind as enum ('demo', 'csv', 'approved_feed', 'manual', 'official', 'editorial');
create type building_type as enum ('detached', 'semi_detached', 'terraced', 'flat', 'bungalow', 'cottage', 'maisonette', 'other');
create type tenure_type as enum ('freehold', 'leasehold', 'share_of_freehold', 'commonhold');
create type listing_status as enum ('live', 'under_offer', 'sold_stc', 'sold', 'withdrawn', 'expired');
create type approval_status as enum ('pending', 'approved', 'rejected');
create type listing_event_kind as enum ('created', 'price_changed', 'status_changed', 'updated', 'withdrawn');
create type place_type as enum ('town', 'village', 'neighbourhood', 'hamlet');
create type place_status as enum ('draft', 'published', 'archived');
create type insight_category as enum ('transport', 'schools', 'lifestyle', 'market', 'environment', 'community');
create type insight_relationship as enum ('property', 'place', 'listing');
create type verification_status as enum ('unverified', 'ai_generated', 'editor_reviewed', 'verified');
create type visibility_status as enum ('draft', 'published', 'archived');
create type confidence_kind as enum ('official', 'estimated', 'ai_inferred', 'user_reported');
create type import_outcome as enum ('pending', 'completed', 'failed', 'partial');
create type import_row_action as enum ('inserted', 'updated', 'skipped', 'rejected');

-- 1. agencies
create table agencies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text,
  permission_status permission_status not null default 'pending',
  attribution_text text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. data_sources
create table data_sources (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references agencies(id) on delete set null,
  kind data_source_kind not null,
  name text not null,
  created_at timestamptz not null default now()
);

-- 3. properties
create table properties (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  address text not null,
  postcode text not null,
  point geography(Point, 4326),
  building_type building_type,
  beds smallint,
  baths smallint,
  tenure tenure_type,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. listings
create table listings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  agency_id uuid references agencies(id) on delete set null,
  source_id uuid references data_sources(id) on delete set null,
  external_id text,
  asking_price_gbp integer,
  status listing_status not null default 'live',
  approval_status approval_status not null default 'pending',
  listed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source_id, external_id)
);

-- 5. listing_images
create table listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id) on delete cascade,
  source_url text not null,
  rights_scope text,
  sort_order smallint not null default 0,
  alt text,
  created_at timestamptz not null default now()
);

-- 6. listing_events
create table listing_events (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id) on delete cascade,
  kind listing_event_kind not null,
  before_json jsonb,
  after_json jsonb,
  created_at timestamptz not null default now()
);

-- 7. places
create table places (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  type place_type not null,
  boundary_geom geography(Polygon, 4326),
  centroid geography(Point, 4326),
  status place_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 8. place_guides
create table place_guides (
  id uuid primary key default gen_random_uuid(),
  place_id uuid unique not null references places(id) on delete cascade,
  sections_json jsonb not null default '[]'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 9. poi (points of interest)
create table poi (
  id uuid primary key default gen_random_uuid(),
  point geography(Point, 4326) not null,
  name text not null,
  kind text not null,
  source_id uuid references data_sources(id) on delete set null,
  created_at timestamptz not null default now()
);

-- 10. insights
create table insights (
  id uuid primary key default gen_random_uuid(),
  body text not null,
  category insight_category not null,
  relationship_type insight_relationship not null,
  target_id uuid not null,
  verification verification_status not null default 'unverified',
  visibility visibility_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 11. facts
create table facts (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete cascade,
  place_id uuid references places(id) on delete cascade,
  field_key text not null,
  value_json jsonb not null,
  confidence_kind confidence_kind not null default 'estimated',
  provenance_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 12. saved_properties
create table saved_properties (
  user_id uuid not null,
  property_id uuid not null references properties(id) on delete cascade,
  note text,
  created_at timestamptz not null default now(),
  primary key (user_id, property_id)
);

-- 13. saved_searches
create table saved_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  filter_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- 14. user_preferences
create table user_preferences (
  user_id uuid primary key,
  preferences_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 15. import_runs
create table import_runs (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references data_sources(id) on delete set null,
  outcome import_outcome not null default 'pending',
  rows_total integer not null default 0,
  rows_inserted integer not null default 0,
  rows_updated integer not null default 0,
  rows_skipped integer not null default 0,
  rows_rejected integer not null default 0,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

-- 16. import_rows
create table import_rows (
  id uuid primary key default gen_random_uuid(),
  import_run_id uuid not null references import_runs(id) on delete cascade,
  external_id text,
  raw_json jsonb,
  validation_errors jsonb,
  action import_row_action,
  created_at timestamptz not null default now()
);

-- 17. audit_log
create table audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid,
  action text not null,
  entity text not null,
  entity_id uuid,
  before_json jsonb,
  after_json jsonb,
  created_at timestamptz not null default now()
);
