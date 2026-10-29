# 02 — Data model, ingestion, licensing and provenance

## Domain boundary

A **Property** is a physical building/parcel, while a **Listing** is an agent's marketing record for a particular sale. Don't conflate them: a property can be relisted and have multiple agents, photos or asking prices over time. A **Place** is a neighbourhood/village/area with editorial content; an **Insight** is a sourceable statement attached to a property, map point, route or place.

## Tables (proposed)

- `agencies`: id, name, website, contact, permission_status, terms_reference, attribution_text.
- `data_sources`: id, agency_id?, kind (`demo|csv|approved_feed|manual|official|editorial`), source_url?, license_notes, last_checked_at, enabled.
- `properties`: id, slug, address_display, address_private?, postcode?, point (PostGIS geography), building_type?, beds?, baths?, tenure?, created_at.
- `listings`: id, property_id, agency_id, source_id, external_id, asking_price_gbp, currency, status (`draft|live|under_offer|sold_stc|withdrawn|expired`), headline, description, listed_at, last_seen_at, published_at, source_url, approval_status, updated_at; unique `(source_id,external_id)`.
- `listing_images`: id, listing_id, source_url, stored_path?, rights_scope, sort_order, alt, license_expiry_at?.
- `listing_events`: id, listing_id, kind (`created|price_changed|status_changed|updated|missing_from_feed`), before_json, after_json, occurred_at, source_id.
- `places`: id, slug, name, type, boundary_geom?, centroid, intro, status.
- `place_guides`: id, place_id, sections_json, hero_asset_id?, reviewer_id, published_at, updated_at.
- `poi`: id, point, name, kind, source_id, source_updated_at, provider_external_id?.
- `insights`: id, body, category, relationship_type (`property|place|poi|route`), target_id, location_geom?, author_type, source_id, verification (`unverified|editorial_reviewed|official_source`), reviewed_at, expires_at?, visibility.
- `facts`: id, property_id?, place_id?, field_key, value_json, unit?, source_id, observed_at, valid_to?, confidence_kind (`measured|reported|estimated`), provenance_url.
- `saved_properties`: user_id, property_id, note, saved_at; unique `(user_id,property_id)`.
- `saved_searches`: user_id, name, filter_json, created_at.
- `user_preferences`: user_id, preferences_json, updated_at.
- `import_runs`: id, source_id, started_at, completed_at, outcome, row_count, inserted, changed, rejected, error_summary.
- `import_rows`: id, import_run_id, external_id, raw_json, validation_errors, action.
- `audit_log`: actor_id?, action, entity, entity_id, time, before_json?, after_json?.

## Critical indexes

- GIST on property `point`, place boundaries and insight geometries; B-tree on live listing price, status, bedroom count, updated_at; unique external IDs; trigram/full-text on editorial and listing text if permitted; pgvector index only when actual semantic retrieval is proven necessary.
- Use PostGIS to filter geometrically; do not equate straight-line proximity with walk time.

## Permissions and copyright (production blocker)

- Publicly visible listings are not automatically licensed for copying. Obtain explicit agency authority for descriptions, photos, floorplans, publication, caching and refresh cadence.
- Do **not** scrape Rightmove/Zoopla or agent sites without permission. Robots/terms review alone is not sufficient legal permission.
- Persist attribution, original listing URL and licence state. Only publish approved live records.
- Process deletion/correction requests; remove expired or revoked photos promptly.
- This is product guidance, not legal advice. Confirm UK intellectual property, database rights, GDPR and platform terms with counsel before public launch.

## Import flow

1. `fetch` approved source or receive CSV (manual/demo initial).
2. Store run metadata; validate schema (`zod`); reject unsupported URLs/media.
3. Normalise property type, address display, prices, statuses, descriptions and photo ordering.
4. Match existing listing by `(source_id,external_id)`. Use cautious manual dedupe for same physical property; never auto-merge on postcode alone.
5. Diff canonical fields; add listing events; update `last_seen_at`.
6. Asset handling uses rights flags; do not mirror if rights don't permit it.
7. Publish only approved rows; quarantine ambiguous data and show admin review queue.
8. On failed/partial import, **do not** mark all missing listings withdrawn. Two+ successful complete snapshots or explicit status update required; set as suspicious first.
9. Revalidate sync freshness; surface aged listings as potentially stale; retain admin audit.

## Data confidence examples

- "Woodland within 300m" means straight-line mapped boundary proximity (method labelled), **not** a known public walk.
- "A cut-through reaches the Common" requires verified route geometry, public accessibility and editorial attribution.
- "15 minutes to station" needs a specific travel mode and routing service result; may vary by time.
- EPC, flood risk, conservation, planning history and sale history require officially licensed/authorised providers, timestamps and appropriate warnings.

## Seeds

Create 20–30 **fictional** sample properties and 5 place guides (Tunbridge Wells, Langton Green, Rusthall, Southborough, Pembury). Use clearly labelled illustrative prices and invented listing descriptions; don't copy actual active addresses or agent photos. Add sample sourced/unverified insight states to exercise UI.
