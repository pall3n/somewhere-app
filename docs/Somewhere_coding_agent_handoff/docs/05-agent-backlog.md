# 05 — Implementation backlog for coding agents

## Workflow and coordination

One integration agent owns schema/API contracts and merges. Agents work on non-overlapping slices behind typed interfaces; each slice is a small PR. Before changes: read README, relevant PRD, inspect latest migrations and declare assumptions. After changes: run lint, typecheck, unit + applicable e2e tests, supply screenshots and note deviations.

| ID | Priority | Owner | Prerequisite | Deliverable / exit test |
|---|---|---|---|---|
| FND-01 | P0 | Foundation | none | Next.js TS scaffold, shadcn, ESLint, tests, env validation, CI passes |
| FND-02 | P0 | Design | FND-01 | Tokens, fonts, layout, nav, cards, states; screenshots compare to reference |
| DATA-01 | P0 | Backend | FND-01 | Supabase migrations, RLS, seed fixtures and repositories |
| DATA-02 | P0 | Backend | DATA-01 | Agency/source/licence model, CSV import parser, run logging, tests |
| HOME-01 | P0 | UI | FND-02 + DATA-01 | Homepage and editorial cards wired to fixture data |
| SRCH-01 | P0 | Search | DATA-01 + FND-02 | URL query model and deterministic filter/search; integration tests |
| SRCH-02 | P0 | Map UI | SRCH-01 | Desktop split view, phone list/map, list↔marker synchronisation |
| PROP-01 | P0 | UI | DATA-01 + FND-02 | Property detail/gallery/agent CTA, sourced/unknown states |
| PLACE-01 | P0 | Content UI | DATA-01 + FND-02 | Five guides + local insights and guide-linked listings |
| AI-01 | P0 | AI/backend | SRCH-01 | `/api/search/parse` typed schema, hard/soft separation, fallback, tests |
| AI-02 | P0 | Search UI | AI-01 | Editable chips and match explanation components |
| LIFE-01 | P0 | UX | PLACE-01 | Lightweight preference journey + transparent place matches |
| AUTH-01 | P0 | Auth | DATA-01 | Supabase Auth, saved homes + private notes + RLS tests |
| ADMIN-01 | P0 | Admin | DATA-02 | Admin import review, approvals, source/freshness screens |
| OPS-01 | P0 | Quality | all | Analytics, SEO, accessibility, performance, release validation |
| ROUTE-01 | P1 | Geo | PLACE-01 | Measured anchor journeys with provider/mode/time metadata |
| VEC-01 | P1 | Search | AI-01 | Embeddings on approved descriptions and editorial insights; eval set |
| COMP-01 | P1 | Saved | AUTH-01 | Shortlist comparison feature |

## Suggested milestones

**Milestone A — 1 week:** foundation, theme, seed DB, site shell. **B — 1–2 weeks:** results/map, property page, guides. **C — 1 week:** AI interpretation and lifestyle journey. **D — 1 week:** saved items, admin ingestion. **E — 1 week:** QA, content and opt-in data integration. Timings are only indicative and depend heavily on agent quality and availability.

## Definition of Done, every PR

- Feature maps to acceptance criterion in `03-prds.md` and has an automated test for core logic.
- Screens match the spirit and hierarchy of attached visuals but use reusable components.
- Validated data contract, no `any`, no secrets in client, no hallucinated content.
- Responsive at 375/768/1280/1440px, keyboard accessible, loading/error/empty states.
- Source/licence metadata carried when displaying third-party or editorial data.
- No broken links/CTA, broken build, regressions or silent console errors.
- README/ADR updated when adding provider, env variable, migration or architectural decision.

## Parallelisation

Safe parallel lanes after DATA-01/FND-02: homepage/guide UI, property detail UI, search UI, auth UI. Serial dependency: search schema before NLP parser, provenance before ingest, URL search before map synchronisation, auth/RLS before saved notes. Avoid concurrent modification of migrations, design tokens, root layout or shared route contracts.
