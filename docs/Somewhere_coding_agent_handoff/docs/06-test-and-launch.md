# 06 — Testing and launch requirements

## Automated tests

**Unit (Vitest):** currency price parser, location/type normalisation, import diff, status transitions, URL filters, AI schema validation, factual match reason generator, preference scoring.

**DB/integration:** unique source IDs, property/listing relationship, PostGIS distance/bbox, RLS isolation, CSV idempotency, duplicate detection, failed-run non-withdrawal, approval gates.

**E2E (Playwright):** search→filter→detail→agent CTA, smart search→edit chips→results, browse guide→property, save→auth→note→remove, mobile map toggle, unavailable property, empty results, unauthorised admin denial.

**AI evaluation set:** 30–50 representative user queries (prices, beds, rural lifestyle, contradictory filters, vague intent, school/commute phrases, prompt injection). Verify schema validity, correct hard filters and no invented local facts. Track regressions separately from UI snapshot tests.

## Manual acceptance matrix

- Visual against every 12 reference PNGs (not strict pixel equivalence).
- Mobile widths 320, 375, 390, 768; desktop 1024, 1280, 1440, ultra-wide.
- Keyboard only; VoiceOver/NVDA smoke test; reduced motion; zoom 200%.
- Missing photo, missing price, inactive listing, unavailable map, erroring AI, no POI/insights.
- Agent source link attribution and permission; display of date/source on intelligence.
- Browser back/forward retains search/filter state; save remains consistent.

## Performance targets (initial budget)

Meet or beat Core Web Vitals good thresholds on mobile: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at 75th percentile. Test on realistic network/device profiles; lazy-load map and gallery extras; avoid huge illustration assets.

## SEO and editorial

Unique page titles/descriptions, canonicals, index only meaningful public pages; no indexing fictional seed property pages outside staging; guide schema/FAQ only if valid; XML sitemap updated for guides/approved listings; correct `noindex` on admin/saved. Preserve historical permalink behaviour when listing expires but avoid misleading availability.

## Security and operational release gate

- RLS and admin authorization verified in tests; no service credentials in browser.
- Rate limits on AI calls, import endpoints, account writes and external API usage.
- Privacy policy, cookie consent if applicable, access/deletion flow, audit for content corrections.
- Error observability + alert on import failures, budget caps for LLM/maps.
- Agency permissions and photo/floorplan rights reviewed before any live catalogue launch.
- Backup/export and incident procedure documented.

## Beta definition

A small closed beta may run on explicitly fictional or permissioned sample data; labels must be clear. Public launch requires lawful usable inventory and evidence of at least one valuable local differentiator, e.g. five well-edited guides and route/amenity insights.
