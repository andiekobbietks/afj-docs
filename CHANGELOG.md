# Changelog

This mirrors the Changelog section inside `static/component-library.html` (the canonical source doc), reformatted for git. No dates on the pre-v1.0 entries — they predate the library existing as one file, reconstructed from the real build history rather than memory.

**On keeping this in sync:** true two-way automatic sync between this file and the HTML section would mean parsing and rewriting arbitrary HTML from Markdown on every change — fragile, and more complexity than the problem needs. The practical version: this file is where new entries get written going forward (git-diffable, shows in PR reviews, is what GitHub itself surfaces), and the corresponding section in `static/component-library.html` gets updated by hand when a change is significant enough to belong in the canonical doc too. Both stay readable and accurate; neither silently drifts out of date because updates aren't automated blindly.

## [Unreleased]

Planned: full atomic-design decomposition of `static/component-library.html` into real Docusaurus/React components (atoms → molecules → organisms → templates), replacing the current iframe-embedded static file entirely, while retaining every one of the ~141 documented features. Scoped as its own migration, not a drop-in change — tracked separately from the entries below.

## v2.1.0 — Site-wide accessibility fix, found via real headless testing

A screenshot of the deployed site showed body text as nearly invisible. Rather than guess at CSS causes, built `scripts/audit-live-site.js` — screenshots the actual live `andiekobbietks.github.io` deployment across all four themes and measures real WCAG contrast ratios for every visible text node, run on GitHub's own CI.

Found and fixed two real bugs, both re-verified against the redeployed site with the same audit, not assumed fixed:
- Bootstrap 5's `body { color: var(--bs-body-color) }` was never themed globally, only inside `.form-control` — Bootstrap's hardcoded `#212529` default silently won everywhere else. Measured 1.26:1 against the dark page background, affecting every heading and paragraph.
- Day/Scrolly Day themes correctly lightened page content but left the sidebar/navbar chrome dark, since chrome is governed by an independent `data-afj-mode` attribute the four-theme buttons never touched. Measured 1.07:1 on real sidebar links. Fixed by defaulting the chrome mode to match the selected theme, while the independent day/night toggle can still override it afterward.

A third issue (Infima's `.navbar--dark` locally redefining `--ifm-menu-color`) fixed by targeting the actual link elements directly. Full writeup as a real ADR on Process & ADRs. Remaining smaller gaps (active breadcrumb pill contrast, one navbar background, a stray default-blue link) tracked as open, not silently left.

**Second round, from user screenshots:** the same root-cause pattern kept surfacing in elements not yet reached — homepage text (`--ifm-color-emphasis-700`, tied to Docusaurus's permanently-dark color mode), the sidebar and navbar backgrounds (no explicit rule in Infima's own CSS, yet staying dark regardless — forced directly), the navbar brand text (exposed only once the navbar background was fixed), table-of-contents links, pagination links, and breadcrumb links. Also fixed a real bug in the audit script itself — a background-consistency check that ignored the alpha channel and misread a transparent `<main>` as opaque black. Measured contrast failures dropped from 86+ instances to a smaller, now-isolated remainder; homepage failures dropped to zero; background mismatches confirmed at zero across two independent audit runs.

**Third round:** a screenshot of Icon Library exposed the real gap — the audit only ever checked 5 of 17 pages. Extended to 13, surfacing 694 individual failures including 95 on Icon Library alone in Wine/Gold. Traced to a genuine specificity bug: the foundational mapping used bare `html {}`, which Docusaurus's own more-specific `html[data-theme=dark]` was silently winning against for anything inherited from `--ifm-background-surface-color`. Fixed by matching that specificity. Also fixed a second bug in the audit script's own background-detection logic (exact-string transparency check missing genuine low-opacity design overlays). Re-audit: 278 failures, a 60% reduction; Wine and Scrollytelling now clean on nearly every page. Day/Scrolly Day and Process & ADRs remain open, concentrated, specific — not vague.

## v2.0.0 — Migrated to a real Docusaurus deployment

The single canonical HTML file is now a full, deployed, multi-page site rather than something read in isolation. Everything below happened in service of getting `static/component-library.html` onto GitHub Pages as a real, working, tested site — not just a bigger version of the same document.

**Site structure**
- Scaffolded an actual buildable Docusaurus project (`package.json`, `docusaurus.config.js`, `sidebars.js`) — previously just the reference HTML with no build pipeline
- 12 new docs pages (Orientation, Foundations, Brand Source, Core UI, Commerce, Customer Journeys, Scrollytelling, More UI Kit, Assembly & Compare, Motion, Process & ADRs, History) populated from the real HTML content, not summaries
- Local search (`@easyops-cn/docusaurus-search-local`) wired into the site
- The accessibility menu (text size, high contrast, hyperlegible font, reduce motion, underline links, large cursor) ported into the Docusaurus shell as a real React component, sharing the same `localStorage` key as the standalone HTML so a setting changed on either surface applies to both

**Deployment pipeline**
- GitHub Actions build + deploy workflow onto GitHub Pages
- An auto-screenshot workflow (Playwright, run on GitHub's own CI) that slices the long reference pages into numbered parts for collapsible README sections, rather than one unreadable full-page image

**A real test suite, and three real bugs it found**
- 114-scenario Gherkin/Cucumber/Playwright suite covering theme switching, navigation/search, the accessibility menu, every core component, the icon library, the interactive shop and class-booking demos, and the full doc site
- Caught and fixed three genuine site bugs in the process, not just test bugs: `selectSize()` in the shop demo updated a CSS class but never `aria-pressed`, so a screen reader reported the wrong selected size after a click; a missing space in `.class-card.open.class-detail` (a compound selector, not a descendant one) meant the class-detail expand animation's CSS rule never matched anything and the accordion was permanently broken; and every embedded preview iframe used a hardcoded absolute path instead of a baseUrl-aware one, so all 14 of them 404'd once actually deployed under `/afj-docs/` — caught by a user screenshot before the test suite itself got to that scenario

**Housekeeping**
- An earlier commit briefly referenced a separate, unrelated site by name and URL before being caught; scrubbed from every tracked file, and the entire git history was squashed to a single clean commit to remove it from old commits too — including closing an automated PR/branch that had forked from the old history independently

## v1.25 — Connected to the real production build's status
Surfaced the actual governance decision on the live AFJ Cardiff site's sequencing (continue the proper build, bridge with an interim Linktree/Canva presence rather than a rushed placeholder), added as "How this fits the live site" and ADR-010, scoped to the sequencing decision itself rather than the underlying legal contract mechanics, which stay in AFJ Cardiff's governance documentation.

## v1.24 — Favicon embedded as data URI; WebP/WebM documented and generated
The four favicon `<link>` tags converted to base64 data URIs. Real WebP versions of the logo assets generated and measured (76–86% smaller than the PNGs), documented alongside the existing WebM video pattern and a new ADR-009 on format strategy.

## v1.23 — Mobile overlap audit; a real transition bug traced and fixed
Fixed the fixed hamburger button colliding with the sidebar's logo mark, three content blocks silently skipping mobile rules, and a genuine regression where a blanket punctuation fix had fused `background .25s` into `background.25s` in 30 places. All 30 restored.

## v1.22 — Search actually tested, real bugs found and fixed
Traced Gherkin edge cases for search/filtering: search and category filter were silently overriding each other, the "no matches" message was invisible, and there was no in-content highlighting. Fixed all three with real `TreeWalker`-based highlighting.

## v1.21 — Mobile responsive pass, Docusaurus-pattern
Collapsible hamburger drawer below 900px with overlay and auto-close, plus a full downloadable asset package (real favicon set, self-hosted webfonts, icon SVGs) placed under `/static` to match Docusaurus's own convention.

## v1.20 — AI-writing audit against the Wikipedia standard
Checked against "Signs of AI writing" criteria. No vocabulary or parallelism hits; 135 em dashes reduced to zero in authored prose, CSS comments and embedded mockup copy left untouched.

## v1.19 — Search and sidebar filtering separated on request
Corrected so search only filters the reading pane; category chips remain the only thing filtering the sidebar, after the two were found doing overlapping jobs.

## v1.18 — Ctrl+F redirected, content search, category chips
Search rebuilt to scan real section content rather than nav labels; 13 category filter chips added by parsing the sidebar's own group structure.

## v1.17 — Mockups made genuinely self-contained
The six customer journey iframes switched from linked `src` files to fully inline `srcdoc` embeds — no sibling-file dependency.

## v1.16 — This changelog
The build history itself, documented, reconstructed from the real conversation record.

## v1.15 — Journeys embedded live; Why Bootstrap / Future Tailwind
Six customer journey mockups embedded as real interactive iframes with genuine extracted code snippets, plus explainers on the Bootstrap choice and a future Tailwind migration path.

## v1.14 — Orientation layer: Start Here, About, Glossary
Added Start Here TOC, About This Site, an 11-term Glossary, two more ADRs, and a Customer Journeys index.

## v1.13 — Verified findings folded in; Lottie motion mapped
Computed font-match and pixel-sample results added to Typeface Families; "Where Lottie fits" mapping real LottieFiles categories to specific UI moments.

## v1.12 — Real master file, computed font-matching
The actual 974×992 master logo cropped via pixel-density profiling; font matches verified by computed Intersection-over-Union shape overlap against real font files.

## v1.11 — Real brand imagery + typeface families
Live logo imagery and the full font-matching writeup pulled in from the brand audit page.

## v1.9–1.10 — Scrolly Day added; Day mode palette verified
A fourth theme added to prove the accent gradient carries the identity, not the dark backdrop. Day mode's palette pixel-sampled and cross-checked against the real brief tokens.

## v1.8 — Compare & contrast page
Wine/Gold vs Scrollytelling written up side by side with a Gherkin feature block per theme.

## v1.6–1.7 — Scrollytelling site pixel-sampled
Colours, typography, and surface effects read directly from the scrollytelling site's source CSS.

## v1.5 — Site-wide day/night chrome toggle
A second, independent toggle for site chrome, deliberately kept separate from the four-theme component toggle.

## v1.4 — Scrollytelling UI kit + full tonal scale table
Button/card/gallery/carousel/input kit recoloured for Scrollytelling; wine tonal scale expanded into a full annotated usage table.

## v1.3 — Assembly section, ADR framework introduced
Parts→commerce assembly diagram and the first formal ADR (ADR-002), following the UK GDS ADR structure.

## v1.2 — Scrollytelling + Day mode added as real themes
Folded into the library as selectable themes, not separate pages.

## v1.1 — Scrollytelling experience widgets + Gherkin scenarios
Hero, scroll-scrubbed story card, manifesto quote, launch signup.

## v1.0 — The library is born
Recognised the pattern already forming as a "design system documentation" and built the first working prototype: one canonical HTML file, both themes toggleable side by side.

---

## Pre-library (individual widgets and mockups)

- **v0.10** — User journeys mapped from the Fathom transcript (five journeys, mockups per theme)
- **v0.9** — Self-contained CodePen-style commerce mockups (Wine/Gold + Scrollytelling)
- **v0.8** — Scrollytelling design system introduced (near-black canvas, orange-to-red gradient)
- **v0.7** — Commerce UI kit on the Bootstrap theme (product grid, detail, cart drawer, checkout)
- **v0.6** — Bootstrap theme, AFJ colours applied
- **v0.5** — Scoped: AFJ-exclusive, Bootstrap now, Tailwind-portable later
- **v0.4** — CSS-Tricks style write-up (tested whether components held together as a system)
- **v0.3** — Full design system widgets, wine tonal scale explainer
- **v0.2** — Brand audit widgets
- **v0.1** — The pixel-sampling discovery — compared a guessed CodeRabbit orange against the real wine/gold gradient sampled from the master logo file. This set the standard the rest of the project followed: sample the real asset, never estimate by eye.
