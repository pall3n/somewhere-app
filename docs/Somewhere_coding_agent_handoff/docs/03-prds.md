# 03 — Feature PRDs and acceptance criteria

All PRDs depend on the approved data model and provenance rules. **P0** = required for beta; **P1** = valuable after beta; **P2** = deferred. UI inspiration comes from supplied screenshots; functional requirements below are proposed implementation decisions, not claims about prototype functionality.

## PRD-01 Homepage and place discovery (P0)

**Goal:** Communicate Somewhere's proposition and route visitors to listings or local guides.

**Stories:** As a buyer I can search by location or lifestyle phrase; as an explorer I can browse places and curated collections.

**Functional:** editorial hero and watercolour illustration; search entry; place tile collection; featured properties from approved live data; curated filters; content management controls for headings/images; meaningful empty state when live data unavailable.

**Acceptance:** (1) Search submits navigable URL with query; (2) tile navigates to the correct guide/filter; (3) only permitted listings show publicly; (4) layout usable at 375/768/1280/1440 widths; (5) all visuals have rights and accessible alternative text.

**Not now:** public recommendations algorithm, autoplay visual effects.

## PRD-02 Property search + map (P0)

**Goal:** Reliable browsing with familiar filters, map and a useful reason-to-click insight.

**Stories:** I can constrain budget/bedrooms/type/location, sort, switch between list and map and return without losing context.

**Functional:** URL-driven query; filters (min/max GBP, min bedrooms, type, place); sorting latest/price ascending/descending; cards with price/facts, agent and optional sourced insight; paginated or cursor-based results; list/map toggle; mobile floating map toggle; selected marker highlights card; data freshness label; loading/error/no-results.

**Acceptance:** (1) Same query URL yields same ordered results; (2) hidden/unapproved/sold listings excluded unless specifically toggled; (3) map bounds update result subset only when requested (avoid endless requery); (4) filters combinable; (5) keyboard accessible and responsive; (6) cards don't claim facts absent from data; (7) 0 results suggest removing filters.

**Not now:** exact commute isochrones, proprietary map routing.

## PRD-03 Intelligent search (P0 minimum, P1 ranking)

**Goal:** Translate lifestyle requests into inspectable, editable filters without pretending to know unverifiable facts.

**Input:** free text, location, existing filters. **Output:** validated typed structure: `hard_filters`, `soft_preferences`, `unknown_terms`, `explanation`.

**Functional:** server call to constrained LLM schema; predictable hard filters for price, beds and type; soft preferences for garden, village, walking/countryside access; chips allow removal or editing; show ambiguous terms; fall back to ordinary text search if model unavailable; ranking based first on deterministic criteria and second on available evidence. Do not hallucinate match %.

**Acceptance:** (1) Price "under £750k" becomes max_price=750000; (2) adjectives such as "lovely" never become a hard boolean; (3) user can edit/filter before search; (4) AI suggestions never override manually set hard filters silently; (5) explain every displayed match reason using evidence; (6) no personal profile sent without consent and minimisation; (7) model errors don't block conventional search.

**Not now:** autonomous chat agent, preference-learning recommender, vector DB as primary query engine.

## PRD-04 Property details (P0)

**Goal:** Combine normal property facts with genuinely useful neighbourhood context.

**Functional:** image gallery with keyboard control; headline, facts, price, agent attribution and outbound link; floorplan if licensed; plain-language description; local highlights with map and evidence; contextual links to place guide; intelligence section with explicit available/unknown/source/date states; Save; external enquiry/viewing action; unavailable listing treatment.

**Acceptance:** (1) outbound action opens correct approved agent URL; (2) all facts trace to a source; (3) missing EPC/flood/sale data displays "Not available" not guess; (4) local routes distinguish public access from proximity; (5) no cloned unlicensed images; (6) mobile sticky CTA never covers content; (7) expired listing cannot mislead as active.

**Not now:** automated valuation, renovation image generation, user reviews of houses.

## PRD-05 Neighbourhood guides + local insights (P0)

**Goal:** Create durable local editorial value independent of current property inventory.

**Functional:** Langton Green-like guide template with illustrated hero, summary, lived-experience sections, POIs and walks, practical information, available listings; source notes and editorial update date; internal links; insight moderation workflow.

**Acceptance:** (1) five authored guides load from data/CMS; (2) insight cards display type and attribution when required; (3) unpublished/draft insights invisible publicly; (4) empty area listings don't hide the guide; (5) map locations use real coordinates; (6) edits recorded in audit log.

**Not now:** open public submissions, generated neighbourhood rankings, subjective safety score.

## PRD-06 Find your kind of place (P0 light)

**Goal:** Help uncertain buyers discover towns/villages by lifestyle fit.

**Functional:** short multi-step interaction (town/village/countryside, budget, preferred amenities, nature, commute sensitivity); back/skip/edit; calculate simple explainable fit from curated area tags and sourceable facts; show recommendations with trade-offs and guides.

**Acceptance:** (1) no account required; (2) quiz can be completed or skipped in <3 minutes; (3) recommendations state their basis; (4) users may revise preferences; (5) recommendations work with fixture data even if no listings.

**Later P1:** geographic anchors (home/work/school) and travel-time APIs with mode, time of day and cost controls; if unavailable, never imply measured time.

## PRD-07 Saved homes + notes (P0)

**Goal:** A useful personal shortlist with persistent notes.

**Functional:** favourite action on cards/details; auth prompt or anonymous session stash that merges after sign-in; `/saved` collection; private notes; links to listing detail; status warning; remove/undo; optional compare view (P1).

**Acceptance:** (1) save state consistent across cards/details; (2) authenticated persistence across devices; (3) RLS prevents other users reading notes; (4) removed homes disappear after confirmation; (5) unavailable listings remain in shortlist with status explanation; (6) notes autosave with error feedback.

## PRD-08 Admin, ingestion and content governance (P0 operational)

**Goal:** Make a curated catalogue viable without data integrity surprises.

**Functional:** admin-only source registry, CSV upload, import run review, row validation, approval/rejection, listing status editor, guide/insight editorial approvals and correction logs.

**Acceptance:** (1) unauthorised user receives 403; (2) import idempotent; (3) failed run never mass-withdraws; (4) each published listing has permission and source metadata; (5) admin can deactivate problematic content and trace changes; (6) automatic import runs yield actionable error reports.

## Common edge cases

Duplicate listings by different agents; source removed then restored; sold status changing while user is on page; unknown price vs POA; inaccurate geocode; overlapping village boundaries; no photos; no garden data; user denies geolocation; expired source permission; AI response malformed; no places match lifestyle criteria; mobile network disruptions; private street/address visibility; deletion of account or contributions.
