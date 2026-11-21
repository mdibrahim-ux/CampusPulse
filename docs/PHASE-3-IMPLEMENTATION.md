# Phase 3 — Scholarship discovery and scheme detail

## Scope

Phase 3 redesigns the scholarship experience on top of the Phase 1 public foundation and Phase 2 workspace shell.

### Directory
- Rebuilt the scholarship introduction and discovery hierarchy.
- Added keyword search across scheme name, short name, provider, category, summary, rule source and indicative support text.
- Added category chips for merit-based, welfare-based, merit-cum-means, technical education and disability references.
- Added issuing-authority and timeline filters, plus earliest-listed-date and A–Z sorting.
- Added accessible result counts, reset controls and a clear no-results state.
- Added responsive scheme cards with issuer artwork, category labels, indicative support, listed student dates and document counts.

### Scheme detail
- Rebuilt the detail hero, authority identity, support panel and scheme metadata.
- Kept the published criteria, required-document labels and descriptions, caveats, source labels, source-check dates, timeline notes and official URLs sourced from the existing scholarship records.
- Added a source panel, eligibility-checker links, related-reference navigation and the existing Scholarship Office Finder.
- Added responsive document and criteria layouts for desktop, split-screen, tablet and narrow mobile screens.

### Tracker integration
- Added a reusable “Save to tracker” action on directory cards and scheme detail pages.
- Saving uses the existing tracker helpers and the matching scheme IDs already used by the central opportunity data.
- A saved scheme is created with the existing Interested status and an editable next action; no second bookmark store was introduced.
- Existing tracker records are not overwritten or removed by the new control.

## Data integrity and guardrails

- No scholarship records, eligibility criteria, assessment logic, source URLs, deadlines, amounts, document requirements or caveats were changed.
- Search, filters and sorting operate on the existing curated scheme array.
- A blank student deadline remains “Check official portal” / “Not listed in this reference”; it is not inferred.
- Displayed support is explicitly labelled indicative. The page continues to identify CampusPulse as an independent reference catalogue and directs users to the official authority.
- The Phase 3 UI does not claim live portal availability or determine final eligibility.

## Validation

- The GitHub Actions build is the required CI gate for this change.
- Browser-based visual QA across desktop, split-screen, tablet, mobile and narrow landscape remains a separate check; passing the build does not establish pixel-level visual verification.
