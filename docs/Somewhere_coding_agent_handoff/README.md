# Somewhere — Coding-agent handoff

**Status:** implementation-ready planning baseline, v0.1 • 29 October 2026

**Working brand:** Somewhere. **Market:** Royal Tunbridge Wells and surrounding towns/villages. **Primary proposition:** Find somewhere lovely — discover homes and places through lifestyle, local knowledge and useful facts.

## Start here

1. Read `docs/00-product-and-scope.md` and `docs/01-design-system.md`.
2. Read `docs/02-data-and-ingestion.md` before designing schema or importing listings.
3. Implement according to `docs/03-prds.md`, `docs/04-technical-architecture.md`, and `docs/05-agent-backlog.md`.
4. Use the PNGs in `reference/` as **visual references**, not specifications for real data or production logic. The HTML export is an interactive visual prototype, **not a source-code base**.
5. Treat sample prices, properties, travel times, area ratings and intelligence shown in mockups as placeholders unless explicitly verified and authorised.

## Contents

- `docs/00-product-and-scope.md`: positioning, personas, scope, KPIs, user flows.
- `docs/01-design-system.md`: extracted visual direction, responsive guidance, shadcn implementation.
- `docs/02-data-and-ingestion.md`: domain entities, provenance, licensing, ingestion lifecycle, schema guidance.
- `docs/03-prds.md`: seven product PRDs with requirements and testable acceptance criteria.
- `docs/04-technical-architecture.md`: stack, route map, API contracts, search, AI, security and operations.
- `docs/05-agent-backlog.md`: implementation slices, dependencies, agent ownership, Definition of Done.
- `docs/06-test-and-launch.md`: fixtures, QA, security, performance, accessibility, launch gates.
- `docs/07-decisions-and-risks.md`: unresolved choices, risks and explicit MVP assumptions.
- `docs/08-agent-prompts.md`: ready-to-paste prompts for autonomous coding agents.
- `reference/`: supplied design screenshots.

## Rules for agents

- Build a **real application**, not a clone of the prototype's hardcoded state or markup.
- No scraping, copying agent photography/floorplans, or publication of third-party listings without permission/licensing review. Begin with fictional fixtures and opt-in feeds.
- All distances and times must be based on declared measurement method and source; do not invent them.
- Explain AI interpretations; keep hard filters deterministic. Do not generate facts to fill data gaps.
- All new UI must be keyboard accessible, mobile responsive and respect reduced-motion.
- Implement as small reviewable changes with tests and documented decisions; no silent scope expansion.

## Suggested first execution sequence

**PR A:** scaffold, tokens, site shell and fixture loader → **PR B:** schema, migrations and repositories → **PR C:** search and property pages → **PR D:** neighbourhood guides and local insights → **PR E:** structured AI parsing, favourites → **PR F:** import admin, instrumentation and hardening. Do not build live agent integrations before permission is established.
