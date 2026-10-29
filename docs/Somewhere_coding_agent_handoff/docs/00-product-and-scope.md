# 00 — Product strategy and MVP boundaries

## Product statement

Somewhere is a local-first, buyer-oriented property discovery service starting in the Tunbridge Wells area. Its differentiator is the **context around a home**: walkable connections, useful nearby destinations, village character, independent amenities and verified property-level intelligence. The consumer experience is editorial but the underlying facts must be trustworthy.

### Audience / jobs to be done

1. **Known-home buyer:** "Find 3+ bedroom houses under £750k with a garden around Tunbridge Wells." Needs conventional filters, maps, property facts and agent links.
2. **Lifestyle explorer:** "Find villages with woodland walks, schools and an easy journey to London." Needs place discovery and explainable soft preferences.
3. **Relocator:** "Understand what Langton Green or Rusthall feels like." Needs beautifully authored place guides and linked homes.
4. **Shortlister:** "Remember and compare 3–5 options." Needs favourites, notes and reliable status changes.

## Core routes and navigation

- `/` — marketing/discovery homepage.
- `/homes` — results and list/map discovery; URL reflects filters.
- `/homes/[slug]` — listing + property detail; unavailable listings retain graceful archive state if authorised.
- `/search/smart` — text-to-structured-query experience (may be integrated into `/homes` later).
- `/places` — place browsing and card directory.
- `/places/[slug]` — neighbourhood editorial guide and linked listings.
- `/find-your-place` — lightweight lifestyle preferences + matching.
- `/saved` — user's shortlist, notes, comparisons; login gating only for persistence.
- `/admin` — restricted ingestion, data quality and editorial workflows.

## MVP includes

- Polished home, search list and map, property details, five curated place guides, lifestyle onboarding/recommendations, saved homes and notes.
- Conventional filters + semantic query **parsing**; editable hard/soft requirements and explicit reasons for matches.
- Nearby local insights associated with a point, route or area; editorial verification labels and dates.
- Admin to import CSV/approved feeds, review records and deactivate stale listings.
- Instrumented UX to assess traffic and engagement.

## MVP excludes

- Full national coverage; real-time market valuation; automated mortgage advice; price predictions; paid property intelligence reports; agent self-service CRM; algorithmic crime/school quality scores; photo decluttering; renovation renderings; a proprietary listings scraper fleet; automatic property matching based on sensitive user attributes.

## Priority metric

**Qualified visits to agent source/enquiry** per active listing, while tracking search-to-detail engagement and user-reported usefulness of local insights. Secondary: approved active listing count, guide engagement, saved-home activation, 0-result searches, ingestion freshness and factual correction rate.

## Supply gate (before public launch)

Aim for three opt-in agents and ~100 active permissioned listings as a working validation target, not a commitment. Software beta can proceed with fictional data; commercial public launch needs explicit listing/photo rights and link attribution.

## User experience principles

- Offer list/grid search for users who don't want AI.
- Ask for intent before extensive onboarding; anonymous browsing works.
- Differentiate fact vs interpretation vs community contribution.
- Visible update date and source wherever intelligence or a claim matters.
- Avoid suggesting "good schools", "safe areas" or similar subjective ranks as objective verified facts.

## Primary journeys

1. Homepage → structured or conversational query → editable filters → results/map → property detail → agent outbound link.
2. Homepage → place cards → place guide → linked listings → shortlist.
3. Find-your-place → town/village/country preferences → suggested areas with reasons/trade-offs → open guide → listings.
4. Save property → sign-in if needed → saved collection → note/comparison → return to detail.
