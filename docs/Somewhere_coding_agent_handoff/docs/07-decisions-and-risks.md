# 07 — Decisions, assumptions and risks

## Locked-in proposed defaults (unless owner changes)

- Name `Somewhere` is a working identity only; verify trademark/domain later.
- Start with Tunbridge Wells and surrounding villages; UK GBP sales listings first, no rentals.
- Next.js/TypeScript/Tailwind/shadcn/Supabase; PostgreSQL/PostGIS first; pgvector only when needed.
- Search URL canonical, AI parser constrained; editable interpretation.
- Fictitious/demo data until approvals obtained. No unauthorised scraping.
- Editorial local insight quality takes priority over quantity of generated content.

## Owner decisions needed before production integrations

1. Which estate agents agree to a live feed, and exactly what media/description rights are granted?
2. Listing data provider/CRM (Street/Reapit/CSV/direct authorised feed) and API costs/terms.
3. Mapping provider, permissible tile use, geocoding and location-search provider.
4. Source for EPC, flood, planning and transaction history; coverage and redistribution rights.
5. Whether users can submit local tips at launch (recommend **no**, admin-only initially).
6. Whether signed-in saves are P0 vs after first design beta (recommend P0 for retention).
7. Whether travel-time anchors ship in P1 (recommend P1 until routing costs and quality validated).
8. Confirm visual assets and fonts licences; confirm final illustration production pipeline.

## Risk register

| Risk | Severity | Mitigation |
|---|---|---|
| Sparse or unlicensed listing supply | Critical | Demo beta; opt-in agent feed; clear go/no-go gate |
| Wrong property facts or AI-generated claims | High | Provenance model; explicit unknown; editorial verification |
| Search ranking appears arbitrary | High | Rule-based first; visible reasons; query evaluations |
| Personal location/profile privacy | High | Explicit opt-in, minimal storage, no sensitive profiling |
| Map/LLM costs rise | Medium | Cache, quotas, feature flags, staged rollout |
| Data staleness/duplicate listings | High | Import events, review queue, freshness timestamps, cautious withdrawal |
| Design visually attractive but not usable | Medium | Task-focused tests, keyboard/mobile and real edge cases |
| Slow guide editorial production | Medium | Start five researched guides, CMS templates, local contributors later |

## Future ideas deliberately parked

Full AI concierge; weighted neighbourhood scores; advanced travel-time multi-anchors; paid buyer reports; planning intelligence integrations; virtual renovation rendering; agent dashboard, lead analytics, user-submitted tips, rental market expansion, nationwide coverage.
