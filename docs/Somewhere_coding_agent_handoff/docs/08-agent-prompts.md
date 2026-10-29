# 08 — Ready-to-paste coding-agent instructions

## Master prompt

You are implementing Somewhere, a local-first UK property discovery application. Read `README.md`, all PRDs relevant to your assigned task, and `docs/01-design-system.md`. Use the attached PNG screenshots as design references and the HTML export only for user-flow understanding. Rebuild with Next.js App Router, TypeScript, Tailwind, shadcn, Supabase and typed services. Do not reuse prototype HTML as application source. Start with fictional seed data and verified provenance; never scrape or publish third-party listings or assets without approved permission. Implement a small tested vertical slice. Preserve search URL state, accessible controls, responsive layout, and unknown/source statuses for property facts. Before coding, state files affected, migration/API changes and acceptance tests. After coding, report commands run, screenshots, completed criteria and open risks.

## Foundation agent

Implement FND-01 and FND-02 from the backlog. Reference the design-system screenshot for colours, type, spacing and rounded corners. Create shadcn tokens, site header, buttons/cards, responsive layouts and screenshot preview routes with fictional data. Do not implement business logic yet. Add stories/examples for primary visual states and interaction tests.

## Data agent

Implement DATA-01 and DATA-02. Create migrations for separate Property, Listing, Agency, Source, Place, Insight, listing events and user saved data. Enable RLS and PostGIS. Seed fixtures. Provide idempotent CSV importer with dry-run, validation, approval and licence gate. Failed imports must not mass-withdraw listings. Add integration tests.

## Discovery agent

Implement SRCH-01 and SRCH-02. URL filters are canonical, all filter values validated. Build split list/map, mobile list/map toggle, interactive card-marker selection and empty states. Use real repository queries and sourceable insight snippets. Do not show unsupported travel-time claims or semantic match percentages.

## Property/places agent

Implement PROP-01 and PLACE-01. Match editorial layout from PNGs while ensuring all sections are data-backed. Display provenance for local insights; don't invent EPC/flood/planning facts. Include photo rights, agent attribution and clear external CTA. Provide five editorial guide fixtures and test unpublished content visibility.

## AI agent

Implement AI-01/AI-02. Translate queries into validated hard filters and soft preferences using constrained structured output, with fallback if AI unavailable. Build editable chips and evidence-based match reasons. Add query evaluation fixtures that include vagueness and prompt injection. Do not use LLMs to invent property attributes, safety/school scores or route times.

## Quality agent

Run all checks in `docs/06-test-and-launch.md`; report accessibility/performance regressions and broken flows. Audit source labels, placeholder status, authorisation and display of stale listings. Produce release checklist with hard blockers separated from polish.
