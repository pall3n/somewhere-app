# 04 — Technical architecture and contracts

## Stack

Next.js App Router + TypeScript, Tailwind, shadcn/ui and Lucide; Supabase Postgres with PostGIS and pgvector; Supabase Auth + RLS; server-side Vercel AI SDK for query interpretation; MapLibre/Mapbox depending licence and cost; Trigger.dev or Inngest for scheduled imports; storage for rights-cleared assets; Resend for transactional notifications if required; PostHog for consent-aware analytics; Vitest + Testing Library + Playwright.

Do not add Elasticsearch, Pinecone, orchestration frameworks or microservices initially. Refine tool/library versions at scaffold time using current docs and pin them.

## Reference repo layout

```text
src/
  app/(public)/page.tsx
  app/(public)/homes/page.tsx
  app/(public)/homes/[slug]/page.tsx
  app/(public)/places/[slug]/page.tsx
  app/(public)/find-your-place/page.tsx
  app/(account)/saved/page.tsx
  app/(admin)/admin/... 
  app/api/search/parse/route.ts
  app/api/admin/imports/route.ts
  components/ui/               # shadcn primitives
  components/layout/
  features/search/
  features/properties/
  features/places/
  features/insights/
  features/saved/
  lib/db/ lib/ai/ lib/maps/ lib/auth/ lib/validation/
  server/repositories/ server/services/
supabase/migrations/
scripts/seed-demo.ts
tests/ e2e/
```

## Read/write boundaries

- Public pages use server components, cache/revalidation strategies appropriate for listings and guides.
- User writes via authenticated server actions or validated API handlers; RLS still enforced.
- All third-party import secrets, service keys and LLM calls remain on the server.
- No browser access to admin service role. Separate public and admin data access.
- Use feature-owned repository/service layers for queries; route components never embed arbitrary SQL.

## URL query contract (example)

`GET /homes?place=tunbridge-wells&maxPrice=750000&minBeds=3&type=detached&sort=newest&view=map`

Zod-parse query params; canonicalise URL; ignore/reject malformed fields safely; share schema between URL parser, form and API.

## Search API contracts

```ts
type PropertyFilters = {
  placeSlug?: string; bbox?: [number, number, number, number];
  minPrice?: number; maxPrice?: number; minBeds?: number;
  propertyTypes?: Array<'detached'|'semi'|'terraced'|'flat'|'bungalow'|'other'>;
  statuses?: Array<'live'|'under_offer'>;
  sort?: 'newest'|'price_asc'|'price_desc'; cursor?: string;
};
type ParsedIntent = {
  hardFilters: PropertyFilters;
  softPreferences: Array<{key: string; value: string; importance: 'prefer'|'important'}>;
  unknownTerms: string[];
  interpretation: string;
};
type Evidence = {
  sourceId: string; label: string; observedAt?: string;
  verification: 'official_source'|'editorial_reviewed'|'unverified';
  method?: 'straight_line'|'route_walk'|'route_drive'|'transit'|'editorial';
};
type MatchReason = { text: string; kind: 'match'|'tradeoff'|'unknown'; evidence?: Evidence };
```

`POST /api/search/parse`: `{query: string, existingFilters?: PropertyFilters}` → `ParsedIntent` plus validation messages. Rate-limit and log metrics without storing sensitive raw text unnecessarily.

## Search strategy

**Step 1:** Postgres structured constraints and area/geospatial filters. **Step 2:** optional full text. **Step 3:** optional semantic retrieval on licensed descriptions and approved insights. **Step 4:** ranking using explainable factors (exact filters first, then quality/recency and supported soft-preference signals). Unverified local insights should not boost rankings as facts.

No independent vector DB at MVP. If pgvector is enabled, use embedding model/version metadata and re-embed only changed content; measure search relevance before adding vector ANN indexing.

## Geographic queries

Store points in EPSG:4326 geography; validate coordinates. Use PostGIS distance for proximity with explicit straight-line label. Route and transit times require a routing provider and time/mode metadata; defer to phase 2. Avoid revealing precise addresses where listing consent is partial.

## Frontend state

- URL is source of truth for search inputs.
- Server fetch for listing/results and guides.
- Client-only state for selected map marker, open dialogs and draft NLP filter chips.
- Supabase is source of truth for saved properties; optimistic UI can reconcile.
- Introduce Zustand only if cross-component state complexity justifies it; avoid duplicated URL/server/client search state.

## Accessibility, performance, security

WCAG 2.2 AA target; keyboard focus on gallery, filters, map alternative list, visible labels; `prefers-reduced-motion`. Use image optimisation, explicit dimensions, metadata/canonical/OG tags and structured data only when appropriate and accurate. CSP and sanitisation for editorial content; avoid raw unsanitised HTML. RLS for user content; admin roles via server verification; CSRF/origin controls for writes, rate limits for AI and imports; GDPR retention/deletion and cookie/analytics consent review.

## Operational expectations

Typed migrations with rollback strategy; staging and production environments; fixture seeding; feature flags for AI/map/ingestion; import failure alerts; error tracking; audit log; backup/restore drills; per-provider spending caps and quotas.
