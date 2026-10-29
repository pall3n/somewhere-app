# 01 — Design system and prototype audit

## What is supplied

Twelve PNG screenshots: design system, seven main desktop experiences, mobile results, mobile property detail, navigation, property card. Also a bundled interactive HTML prototype (`Somewhere visual directions.html`, kept outside the package to avoid duplicating >5 MB, attach alongside). References are concept designs; imagery includes placeholders. Preserve intended hierarchy while refining accessibility and real responsive behaviour.

## Observed design system (from the provided PNG)

- Working wordmark **somewhere.** with a muted rosy dot; serif-led editorial voice.
- **Instrument Serif** for headlines, places and prices; **DM Sans** for interface/body. The HTML export includes font licensing text; use separately installed, legitimately sourced font packages, not copied bundled binaries.
- Paper `#FAF8F4`; white `#FFFFFF`; olive `#35473D`; ink `#282B28`; stone `#6B6E67`; sage `#DDE7DC`; dusty rose `#EEDBD6`; pale sky `#E1EBF1`; buttercream `#F4E9CF`; border `#E7E5DE`.
- 4px spacing scale. Reference section spacing ~72–96px; maximum content ~1280px; desktop horizontal gutter ~48px and phone ~16px.
- Reference radii: chips 8px, notes 10px, cards 12px, panels 14px, illustration art ~20px. Use semantic CSS variables and consistent sizes rather than literal values scattered across components.
- Flat surfaces with tiny shadows only on interaction. Reference motion: ~200ms cards, ~300ms panels, hover imagery scale ~1.035–1.05. Respect reduced motion.

## Screens and recognisable composition

| Reference | Key elements to preserve | Build interpretation |
|---|---|---|
| `1 - Homepage.png` | Serif "Find somewhere lovely", illustrated hero, area/discovery tiles, featured homes and editorial blocks | Content-driven homepage assembled from reusable sections; links lead to real searches/guides |
| `2 - Search results.png` | Filter/search header, results cards, split map pane and soft insight highlights | Map synchronised to visible results; valid empty/loading states; server-driven filters |
| `2 - Search results, mobile.png` | Single column property card stack; compact query/filters; floating map control | Sticky compact mobile search and accessible map sheet/fullscreen view |
| `3 - Intelligent search.png` | Question headline, interpreted requirements, property matching explanations | Text query → validated editable chips → actual search criteria; no fake confidence |
| `4 - Property details.png` | Editorial property overview, photo/gallery, local insights, intelligence, agent CTA | Strong evidence/citation/unknown states for all data claims |
| `4 - Property details, mobile.png` | Full-width image, facts stack, persistent enquiry action | Respect safe areas, no content obscured by sticky CTA |
| `5 - Neighbourhood guide.png` | Langton Green editorial hero and pastel watercolour, longer-form guide, local highlights and homes | CMS-driven guide sections with sources and area-scoped properties |
| `6 - Find your kind of place.png` | Town/village/countryside selector, preference journey, place recommendations | Typed preferences with skip/back/edit; computed recommendations |
| `7 - Saved homes.png` | Shortlist with notes, comparison and item summaries | Auth-gated persistence, explicit removing, lost-listing handling |
| `Component - Navigation.png` | Restrained wordmark, links, saved and sign in | Semantic header, keyboard nav, mobile menu |
| `Component - Property card.png` | Large image, serif price, compact facts and highlighted local tip | Accessible action separation: card link vs save button; conditionally show sourced tip |

## Component inventory

`SiteHeader`, `MobileNav`, `SearchBox`, `NLSearchBox`, `SearchFilterBar`, `FilterDrawer`, `FilterChip`, `PropertyCard`, `PropertyGallery`, `PropertyFacts`, `PropertyInsightCard`, `SourceStamp`, `MapPanel`, `MapMarker`, `PlaceCard`, `PlaceHero`, `GuideSection`, `SavedPropertyRow`, `MatchReason`, `AgentCTA`, `EmptyState`, `ErrorState`, `Skeleton`, `AuthDialog`.

Build shadcn primitives for Button, Input, Popover, Dialog, Drawer/Sheet, Tabs, Badge, Select, Checkbox, Accordion, Tooltip, Form. Keep business components in `features/` and theme tokens in `app/globals.css`.

## Design requirements

- Semantic typography sizes responsive via `clamp`; serif only for display storytelling, not dense data labels.
- WCAG AA contrast for essential text/controls; pastel surfaces are decorative, never the sole status indicator.
- Explicit image aspect ratios and loading placeholders; use `next/image` with provider/host allowlist.
- Touch target at least 44px for key interactive controls; complete hover/focus/disabled states.
- Desktop map/list layout and phone list/map toggle; preserve search position on navigation back.
- Do not copy prototype HTML, bundled assets or dummy listing claims into business logic.

## Reference art requirements

Watercolour illustrations must be licensed/commissioned/generated with appropriate rights and placed in a controlled asset library. Do not stylise real property images. Use real photos only with approved rights; use descriptive placeholders during development.
