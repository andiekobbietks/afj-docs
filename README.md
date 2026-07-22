# AFJ Cardiff — Design System & Component Library

Docusaurus site documenting AFJ Cardiff's canonical design system, component library, and icon library — for developer, designer, and videographer handoff.

**Live:** https://andiekobbietks.github.io/afj-docs/
**Production (planned):** `doc.afjcardiff.com`, once the custom domain is wired up.
**Releases:** [25 releases](https://github.com/andiekobbietks/afj-docs/releases), `v1.0` through `v2.0.0` — the earlier ones are backfilled from the standalone HTML doc's own pre-repo changelog history.

## Preview

Screenshots are generated automatically by `.github/workflows/screenshots.yml` (Playwright, run on GitHub's own CI) via `scripts/screenshot.js`. The Component Library reference is long (43 sections), so it's sliced into 30 numbered parts rather than one massive image — collapsed by default, so it costs nothing to scroll past. Icon Library and UI Mockups are short enough to stay as one shot each.

<details>
<summary><strong>Component Library</strong> (click to expand — 30 parts)</summary>

![Component Library, part 1](static/screenshots/component-library-1.png)
![Component Library, part 2](static/screenshots/component-library-2.png)
![Component Library, part 3](static/screenshots/component-library-3.png)
![Component Library, part 4](static/screenshots/component-library-4.png)
![Component Library, part 5](static/screenshots/component-library-5.png)
![Component Library, part 6](static/screenshots/component-library-6.png)
![Component Library, part 7](static/screenshots/component-library-7.png)
![Component Library, part 8](static/screenshots/component-library-8.png)
![Component Library, part 9](static/screenshots/component-library-9.png)
![Component Library, part 10](static/screenshots/component-library-10.png)
![Component Library, part 11](static/screenshots/component-library-11.png)
![Component Library, part 12](static/screenshots/component-library-12.png)
![Component Library, part 13](static/screenshots/component-library-13.png)
![Component Library, part 14](static/screenshots/component-library-14.png)
![Component Library, part 15](static/screenshots/component-library-15.png)
![Component Library, part 16](static/screenshots/component-library-16.png)
![Component Library, part 17](static/screenshots/component-library-17.png)
![Component Library, part 18](static/screenshots/component-library-18.png)
![Component Library, part 19](static/screenshots/component-library-19.png)
![Component Library, part 20](static/screenshots/component-library-20.png)
![Component Library, part 21](static/screenshots/component-library-21.png)
![Component Library, part 22](static/screenshots/component-library-22.png)
![Component Library, part 23](static/screenshots/component-library-23.png)
![Component Library, part 24](static/screenshots/component-library-24.png)
![Component Library, part 25](static/screenshots/component-library-25.png)
![Component Library, part 26](static/screenshots/component-library-26.png)
![Component Library, part 27](static/screenshots/component-library-27.png)
![Component Library, part 28](static/screenshots/component-library-28.png)
![Component Library, part 29](static/screenshots/component-library-29.png)
![Component Library, part 30](static/screenshots/component-library-30.png)

</details>

<details>
<summary><strong>Icon Library</strong> (click to expand)</summary>

![Icon Library](static/screenshots/icon-library.png)

</details>

<details>
<summary><strong>UI Mockups</strong> (click to expand)</summary>

![UI Mockups](static/screenshots/ui-mockups-1.png)

</details>

## Migration status, at a glance

Every page started as an `<iframe>` embedding the massive `static/component-library.html`. The migration replaces that, page by page, with real Docusaurus/React components using the same tokens. Core UI is the only page where the iframe is actually gone. Foundations and Process & ADRs have real components added but still render the old iframe alongside them too — that's next to fix, not a second finished page. Everything else, including all 11 of the originally chat-built UI mockups (still living in `static/ui-mockups.html`), hasn't started.

```mermaid
flowchart LR
    subgraph done["✅ Real components, iframe removed"]
        CoreUI["Core UI<br/>DemoButtons, DemoProductCard"]
    end

    subgraph half["🟡 Components added, old iframe NOT removed yet"]
        Foundations["Foundations<br/>TokenSwatch, GradientHeading + iframe still there"]
        ADRs["Process & ADRs<br/>AdrCard × 9 + iframe still there"]
    end

    subgraph pending["⏳ Iframe only, zero real components"]
        Commerce["Commerce"]
        Journeys["Customer Journeys"]
        Scrolly["Scrollytelling"]
        MoreUI["More UI Kit"]
        Assembly["Assembly & Compare"]
        History["History"]
        Brand["Brand Source"]
        Icons2["Icon Library"]
        Orient2["Orientation"]
        MotionPage["Motion"]
        Mockups["UI Mockups<br/>all 11 chat-originated widgets live here"]
    end

    subgraph reference["📄 Never needs conversion"]
        Designers["For Graphic Designers,<br/>For Videographers, Live Site Status<br/>— prose only, no iframe"]
    end

    Source["static/component-library.html<br/>the original 43-section doc"] -.->|being decomposed from| pending
    Source -.->|partially extracted into| half
    Source -->|fully extracted into| done

    style done fill:#1E1B22,stroke:#C99552,color:#fff
    style half fill:#1E1B22,stroke:#f39c12,color:#fff
    style pending fill:#1E1B22,stroke:#3A3441,color:#8a8990
    style reference fill:#1E1B22,stroke:#3A3441,color:#8a8990
```

## What's in here

**Docs pages** (`docs/*.mdx`, 17 total): Orientation, Foundations, Icon Library, Brand Source, For Graphic Designers, For Videographers, Core UI, Commerce, Customer Journeys, UI Mockups, Scrollytelling Experience, More UI Kit, Assembly & Compare, Motion, Process & ADRs, History, How This Fits the Live Site.

**Real components** (`src/components/`) — the migration's actual output so far:
| Path | What it is |
| --- | --- |
| `DemoButtons`, `DemoProductCard` | Core UI's real replacements for the iframe — exact same CSS values as the source, themed via CSS variables, no wiring needed beyond that |
| `AdrCard` | All 9 ADRs on Process & ADRs, extracted from the source HTML and rendered as real cards, not flattened markdown |
| `TokenSwatch`, `GradientHeading` | Foundations' live token grid and gradient-heading demo |
| `ChangelogEntry` | Styled changelog entries (built, not yet wired into History — that page still uses the iframe) |
| `AccessibilityMenu` | Text size, high contrast, hyperlegible font, reduce motion, underline links, large cursor — same `localStorage` key as the standalone HTML's own menu |
| `SiteThemeToggle` + `SiteThemeContext` | The **global** theme system — four component themes plus the independent day/night site-chrome switch, applied via `data-afj-theme`/`data-afj-mode` (not Docusaurus's own `data-theme`, which Infima already owns) and mapped onto real Infima variables so the actual navbar/sidebar/page background respond, not just embedded content |

**Static reference files** (`static/`): `component-library.html` (the original 43-section doc, still the source for pages not yet migrated), `icon-library.html`, `ui-mockups.html`, the real favicon set, and `gherkin-report.html` (regenerated every CI run).

**Test suite** (`features/`): 152 Gherkin scenarios across 15 feature files — full breakdown below.

**CI/CD** (`.github/workflows/`): `deploy.yml` (build + publish to Pages), `gherkin-tests.yml` (run the suite, regenerate the report), `screenshots.yml` (slice the long reference docs into numbered README images).

**Other**: `NOTICE.md` (third-party attribution — Lucide, Google Fonts, Docusaurus, Bootstrap, none of it AFJ Cardiff's own IP), `CHANGELOG.md` (the full pre-repo history, now also on GitHub as real releases).

## Source version

`static/component-library.html` is built from the canonical file (the fifth upload in the `afj-component-library-doc` series was the first complete one; sixth through ninth added Downloads, four new ADRs, the two audience pages, and the live-site status page — ninth is what's in this repo). A same-named `.json` upload turned out to be a raw chat-transcript export rather than the design doc, and wasn't used.

## Accessibility fixes applied to the canonical file

Every keyboard-accessibility failure found in the source doc is now fixed in `static/component-library.html`:

- 43 sidebar nav links were `<a>` with no `href` — now real `href="#sec-..."` anchors, keyboard-operable, original smooth-scroll preserved via `event.preventDefault()`
- 14 category filter chips were `<span onclick>` — now real `<button>` elements with `aria-pressed` kept in sync
- The day/night switch and the mobile menu toggle were `<div onclick>` with no accessible name — now real `<button>` elements with `aria-label`/`aria-expanded` kept in sync, and Escape now closes the mobile nav drawer
- Inside the embedded shop and class-booking demos (iframe `srcdoc`): the logo, cart icon, three back-button variants, size selectors, quantity steppers, and the remove-item control are now real `<button>` elements with accessible names; product cards, the pricing-plan cards, and the expandable class rows use the `role="button"` + `tabindex="0"` + keydown pattern (kept as `<div>` rather than `<button>` since they wrap block-level nested content); the cart/zoom backdrop scrims are `aria-hidden="true"` with Escape-key dismissal wired into each demo's own script, since a backdrop is a dismissal surface, not a discrete control that should sit in the tab order

**One thing flagged, not fixed here:** the Downloads section's prose claims self-hosted webfonts and individual icon SVGs alongside the favicon set — only the four favicon files were actually embedded in the source; fonts still load live from Google Fonts. Worth knowing before that section goes live making a claim the file doesn't back up yet.

## A note on what these pages don't cover yet

This repo has the full design system, component/icon reference, all 11 high-fidelity page mockups, and the two audience pages. What it doesn't have yet: most pages still render their content via the iframe rather than real components — see the migration status diagram above for exactly which ones.

## Local development

```bash
npm install
npm start
```

Runs at `http://localhost:3000`.

```bash
npm run build
```

Builds the static site to `build/`.

## Sidebar structure

`sidebars.js` lists all 17 pages, in the order they appear in the migration status diagram above — see the actual file in this repo rather than a hand-maintained copy here, since keeping two copies in sync has already gone stale once.

## Deploying to GitHub Pages

This repo is already live at the URL above — what follows is how it got there, kept for reference (e.g. if this pattern gets reused for another repo) rather than as setup instructions to run again.

```bash
gh auth login
gh repo create afj-docs --source=. --remote=origin --push
```

`docusaurus.config.js` is already set to:

```js
url: 'https://andiekobbietks.github.io',
baseUrl: '/afj-docs/',
organizationName: 'andiekobbietks',
projectName: 'afj-docs',
```

### Enable Pages

In the repo's **Settings → Pages**, set **Source** to **GitHub Actions** — the included `.github/workflows/deploy.yml` handles the rest on every push to `main`.

### Moving to `doc.afjcardiff.com` later

1. Create a `static/CNAME` file containing exactly: `doc.afjcardiff.com`
2. Add a CNAME DNS record for `doc.afjcardiff.com` pointing at `andiekobbietks.github.io`, wherever `afjcardiff.com`'s DNS is managed
3. Update `url` in `docusaurus.config.js` to `https://doc.afjcardiff.com` and `baseUrl` to `/`
4. Push — GitHub auto-provisions the TLS certificate via Let's Encrypt once DNS resolves

### On repo visibility

GitHub Pages on Free/Pro personal accounts publishes the **built site publicly** regardless of whether the source repo is private — private repo hides the code, not the deployed page. Worth deciding deliberately when this repo goes public, not by default.

## How the three workflows fit together

The non-obvious part: `gherkin-tests.yml` commits its own results back to the repo, which would normally re-trigger itself forever. It's stopped with `paths-ignore` on its own output files — but that same push still needs to reach `deploy.yml` so the fresh report actually goes live, which is why that one has no such filter.

```mermaid
flowchart TD
    push["git push to main"]
    push --> deploy["deploy.yml<br/>build + publish to Pages"]
    push -->|unless only .test-run-output/**<br/>or gherkin-report.html changed| gherkin["gherkin-tests.yml<br/>run 152 scenarios"]

    gherkin --> results["Commit results:<br/>.test-run-output/latest.txt<br/>static/gherkin-report.html"]
    results -->|pushes to main again| push2["git push to main"]
    push2 --> deploy2["deploy.yml runs again<br/>publishes the fresh report"]
    push2 -.->|blocked by paths-ignore,<br/>no infinite loop| gherkin

    screenshot["screenshots.yml<br/>on push to static/*.html"]
    push -.->|if a static HTML file changed| screenshot
    screenshot --> commit2["Commit sliced PNGs<br/>to static/screenshots/"]
    commit2 --> push3["git push to main"]
    push3 --> deploy3["deploy.yml runs again"]

    style push fill:#1E1B22,stroke:#C99552,color:#fff
    style push2 fill:#1E1B22,stroke:#C99552,color:#fff
    style push3 fill:#1E1B22,stroke:#C99552,color:#fff
    style deploy fill:#1E1B22,stroke:#A43E53,color:#fff
    style deploy2 fill:#1E1B22,stroke:#A43E53,color:#fff
    style deploy3 fill:#1E1B22,stroke:#A43E53,color:#fff
```

## Test suite

A real Gherkin/Cucumber/Playwright suite — 152 scenarios across 15 feature files, run against a real build served the way GitHub Pages actually serves it (see `.github/workflows/gherkin-tests.yml`). This is the acceptance test for the ongoing atomic-design migration: if every scenario still passes after a component gets decomposed into real React, the feature survived the migration.

**Live, interactive report:** [`/afj-docs/gherkin-report.html`](https://andiekobbietks.github.io/afj-docs/gherkin-report.html) — colored pass/fail per scenario, searchable, regenerated automatically on every push. Raw run output (for debugging a CI failure without needing Actions log access) lives in `.test-run-output/latest.txt`.

<details>
<summary><strong>Global theme toggle</strong> (10 scenarios) — the site-wide navbar toggle</summary>

```gherkin
Feature: Global site-wide theme toggle
  The theme system applied at the Docusaurus root — four component themes
  plus the independent day/night site-chrome switch, both driving real
  Infima/Docusaurus chrome (navbar, sidebar, page background), not just
  content inside an embedded iframe.

  Scenario: The site day/night switch is independent of the four themes
    Given the html element should have data-afj-theme "wine"
    When I click the global site day/night switch
    Then the html element should have data-afj-mode "day"
    And the html element should still have data-afj-theme "wine"

  Scenario: The global theme choice persists across navigation to a different page
    When I click the global "day" theme button
    And I open the docs page "core-ui"
    And I wait for the global theme toggle to be ready
    Then the html element should have data-afj-theme "day"
```

</details>

<details>
<summary><strong>Interactive shop demo</strong> (14 scenarios) — real edge cases, not just the happy path</summary>

```gherkin
Feature: Interactive shop demo
  The embedded commerce mockup (product grid -> detail -> cart -> checkout ->
  confirmation) inside an iframe within component-library.html must actually
  function, including its edge cases, not just look right statically.

  Scenario: Quantity cannot go below 1
    Given I click the first product card
    When I decrease quantity 5 times
    Then the quantity should read "1"

  Scenario: Removing the only item in the cart empties it, not errors
    Given I add 1 item to the cart
    And I open the cart
    When I remove that item
    Then the cart should contain 0 line items
    And no JavaScript error should have occurred
```

</details>

<details>
<summary><strong>Course subscription journey</strong> (8 scenarios) — real email-regex validation edge cases</summary>

```gherkin
Feature: Interactive course subscription journey
  Real email regex validation gates progress, which is exactly the kind
  of edge case worth testing directly rather than assuming a gate "just
  works".

  Scenario: An email with no domain does not pass the gate
    When I go to the email gate
    And I submit the email "someone@"
    Then a toast should be shown

  Scenario: An email with no @ does not pass the gate
    When I go to the email gate
    And I submit the email "someone.example.com"
    Then a toast should be shown
```

</details>

<details>
<summary><strong>Accessibility menu</strong> (13 scenarios) — boundary values, not just on/off</summary>

```gherkin
Feature: Accessibility menu
  Six controls, persisted to localStorage under the same key used by
  the Docusaurus shell's AccessibilityMenu component.

  Scenario: Text size cannot go below the minimum
    When I open the accessibility menu
    And I set text size to "50"
    Then the text size should read "75"

  Scenario: Reset restores every control to its default in one action
    Given I open the accessibility menu
    And I set text size to "150"
    And I enable high contrast
    When I click reset accessibility settings
    Then the text size should read "100"
    And high contrast should be disabled
```

</details>

<details>
<summary><strong>Every feature file, by scenario count</strong></summary>

| Feature file | Scenarios | Covers |
| --- | --- | --- |
| `interactive_shop_demo.feature` | 14 | Product grid, detail, cart, checkout, quantity/empty-cart edge cases |
| `accessibility_menu.feature` | 13 | Text size, contrast, hyperlegible font, motion, underline, cursor, reset |
| `interactive_course_subscription_demo.feature` | 8 | Teaser, email gate (with real validation edge cases), plans, library |
| `ui_mockups_and_docs_site.feature` | 8 | All 17 docs pages, sidebar completeness, iframes, copy buttons |
| `keyboard_accessibility.feature` | 9 | Regression coverage for the original WCAG audit's exact findings |
| `global_theme_toggle.feature` | 10 | Site-wide navbar toggle, persistence, Infima chrome integration |
| `navigation_and_search.feature` | 10 | Sidebar nav, category chips, search (content-section filtering) |
| `interactive_class_booking_demo.feature` | 6 | Expand/collapse rows, keyboard operability, booking state |
| `theme_system.feature` | 6 | The in-iframe four-theme toggle inside component-library.html |
| `component_widgets_render.feature` | 6 | Every core component actually renders visible content, all themes |
| `foundations_and_adrs.feature` | 5 | Design tokens, typography, structural consistency across all 9 ADRs |
| `icon_library.feature` | 5 | All 9 icon categories, theme-following color, no broken SVGs |
| `brand_source_and_assembly.feature` | 4 | Imagery alt-text quality, Assembly chips, Compare & Contrast Gherkin |
| `history_content.feature` | 4 | Changelog volume, roadmap content, Downloads section's overstated claims |
| `orientation_content.feature` | 4 | Start Here's table of contents, About's content, Glossary consistency |

</details>

## ADR: No external cross-references, squashed history

**Context.** An earlier version of this repo referenced a separate site by name and URL in several places (a README description, live `<img>` sources pulling assets from its domain, and direct hyperlinks in two doc pages). That site is not something this repo should ever point at, name, or link to, in any file, in any commit. The repo was also briefly public before this was caught.

**Options considered.**
1. Patch the current files only, leave history as-is. Cheapest, but every reference stays fully readable in `git log -p` on the old commits, indefinitely.
2. Patch current files, squash history into a single commit. Removes the reference from every commit that's part of `main`'s history.
3. Option 2, plus audit and close out any other branch or PR that forked from the old history before squashing (a bot-opened image-optimization PR had done exactly this).

**Decision.** Option 3. Every file was scrubbed of the reference; live cross-domain image sources were pointed at a local placeholder pending real self-hosted copies; the bot PR and its branch were closed and deleted; the repo was made private during the fix; and the entire history was squashed to one orphan commit before making it public again.

**Reasoning.** A squash-only fix is incomplete if any other branch or PR still holds the old commits — GitHub keeps those reachable independently of what `main` points at. Closing every other ref first, then squashing, then force-pushing, is the only sequence that actually removes it everywhere this repo controls. What happened during the window it was already public is outside this repo's control to undo; the fix is closing the window as fast as possible and making sure it can't reopen through old history or stray branches.

## Licensing

Icons are [Lucide](https://lucide.dev), ISC licensed — free for commercial use, no attribution required. The working icon-set decision (Lucide over mixing icon sets ad hoc) was made directly in the canonical component library doc, not invented here. Full third-party breakdown in `NOTICE.md`.

---

Copyright © 2026 AFJ Cardiff.
