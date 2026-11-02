-- Geography indexes (GIST)
create index idx_properties_point on properties using gist (point);
create index idx_places_centroid on places using gist (centroid);
create index idx_places_boundary on places using gist (boundary_geom);
create index idx_poi_point on poi using gist (point);

-- B-tree indexes for common queries
create index idx_listings_price on listings (asking_price_gbp);
create index idx_listings_status on listings (status);
create index idx_listings_approval on listings (approval_status);
create index idx_properties_beds on properties (beds);
create index idx_properties_postcode on properties (postcode);

-- Trigram GIN index for fuzzy place name search
create index idx_places_name_trgm on places using gin (name extensions.gin_trgm_ops);

-- Foreign key indexes
create index idx_listings_property_id on listings (property_id);
create index idx_listings_source_id on listings (source_id);
create index idx_listing_images_listing_id on listing_images (listing_id);
create index idx_listing_events_listing_id on listing_events (listing_id);
create index idx_place_guides_place_id on place_guides (place_id);
create index idx_insights_target on insights (relationship_type, target_id);
create index idx_facts_property_id on facts (property_id);
create index idx_facts_place_id on facts (place_id);
create index idx_saved_properties_user on saved_properties (user_id);
create index idx_saved_searches_user on saved_searches (user_id);
create index idx_import_rows_run on import_rows (import_run_id);
