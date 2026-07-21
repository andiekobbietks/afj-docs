# Changelog

This mirrors the Changelog section inside `static/component-library.html` (the canonical source doc), reformatted for git. No dates on the pre-v1.0 entries — they predate the library existing as one file, reconstructed from the real build history rather than memory.

**On keeping this in sync:** true two-way automatic sync between this file and the HTML section would mean parsing and rewriting arbitrary HTML from Markdown on every change — fragile, and more complexity than the problem needs. The practical version: this file is where new entries get written going forward (git-diffable, shows in PR reviews, is what GitHub itself surfaces), and the corresponding section in `static/component-library.html` gets updated by hand when a change is significant enough to belong in the canonical doc too. Both stay readable and accurate; neither silently drifts out of date because updates aren't automated blindly.

## [Unreleased]

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
- **v0.2** — Brand audit & vector rebuild spec widgets
- **v0.1** — The pixel-sampling discovery — compared a guessed CodeRabbit orange against the real wine/gold gradient sampled from the master logo file. This set the standard the rest of the project followed: sample the real asset, never estimate by eye.
