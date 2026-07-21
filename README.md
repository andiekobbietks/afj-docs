# AFJ Cardiff — Design System & Component Library

Docusaurus site documenting AFJ Cardiff's canonical design system, component library, and icon library — for developer, designer, and videographer handoff. This is **eng/product/marketing-facing**, not the IP audit — that's a separate site (`afj-cardiff-brief.netlify.app`), stays separate, and nothing from it lives here.

**Staging:** `https://<your-username>.github.io/afj-docs/` (GitHub Pages, set up below)
**Production (planned):** `doc.afjcardiff.com`, once the custom domain is wired up.

## What's in here

| Path | What it is |
| --- | --- |
| `docs/component-library.mdx` | Buttons, cards, cart drawer, class booking card, gallery, carousel, tonal scale |
| `docs/icon-library.mdx` | Full Lucide icon set by site section (core UI, commerce, classes, checkout, account, scrollytelling, internal ops) |
| `docs/ui-mockups.mdx` | 11 high-fidelity page mockups — homepage, class listing/detail/booking, shop+cart, checkout, member dashboard, internal ops, Scrollytelling commerce, Scrolly Day hero, and the noir/near-black contrast reference |
| `docs/for-graphic-designers.mdx` | Print/CMYK constraints, minimum size, clear space, redraw source material |
| `docs/for-videographers.mdx` | Existing logo assembly video, motion/looping rules, framing per theme |
| `docs/live-site-status.mdx` | Honest status of the real production build vs. this reference library, plus the launch checklist (cookie notice, privacy notice, Equality Act 2010) this library doesn't cover |
| `static/component-library.html` | Standalone live preview, themeable across Wine/Gold, Scrollytelling, Day, Scrolly Day — canonical source, keyboard-accessibility fixes applied (see below) |
| `static/icon-library.html` | Standalone live preview of every icon, generated from the real `lucide-static` npm package, same theme toggle |
| `static/ui-mockups.html` | All 11 page mockups in one scrollable reference, each in its designed theme |
| `static/img/favicon*.png`, `static/img/favicon.ico`, `static/img/apple-touch-icon.png` | Real favicon set, extracted from the canonical doc's embedded assets — not placeholders |
| `src/components/AccessibilityMenu/` | Text size, high contrast, hyperlegible font (Atkinson Hyperlegible Next), reduce motion, underline links, large cursor — mirrors the sister site's documented settings, same `localStorage` key |
| `src/theme/Root.js` | Mounts the accessibility menu site-wide |
| `src/css/custom.css` | Wires the accessibility menu's toggles to real style changes; also fixes the `text-faint` contrast failures found in the source doc (3.1:1 / 2.41:1 / 3.2:1 across three themes) as the **default**, not gated behind a toggle |
| `NOTICE.md` | Third-party attribution — Lucide, Google Fonts, Docusaurus, Bootstrap — none of it is AFJ Cardiff's own IP |
| `.github/workflows/deploy.yml` | Builds and deploys to GitHub Pages on every push to `main` |

Files in `static/` are served as-is by Docusaurus and are also embedded live via `<iframe>` inside the Component Library and Icon Library MDX pages, so the reference tables and the working preview sit on the same page.

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

This repo has the design system, component/icon reference, and the two audience pages. It does **not** yet include the high-fidelity page mockups (homepage, class listing, class detail + booking, shop + cart, checkout, member dashboard, internal ops board) that were prototyped separately — those only exist as live inline previews in chat right now, not as exportable files.

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

## Wiring the new pages into the sidebar

This repo's `sidebars.js` (create it if it doesn't exist yet) should list its own docs — not the Netlify brief site's IP-strategy pages, which live in a different repo entirely:

```js
module.exports = {
  docsSidebar: [
    { type: 'doc', id: 'component-library', label: 'Component Library' },
    { type: 'doc', id: 'icon-library', label: 'Icon Library' },
    { type: 'doc', id: 'ui-mockups', label: 'UI Mockups' },
    { type: 'doc', id: 'for-graphic-designers', label: 'For Graphic Designers' },
    { type: 'doc', id: 'for-videographers', label: 'For Videographers' },
    { type: 'doc', id: 'live-site-status', label: 'How This Fits the Live Site' },
  ],
};
```

## Deploying to GitHub Pages

### One-time repo setup (you run this, not me)

```bash
gh auth login
gh repo create afj-docs --source=. --remote=origin --push
```

Then in `docusaurus.config.js`, set:

```js
url: 'https://<your-username>.github.io',
baseUrl: '/afj-docs/',
organizationName: '<your-username>',
projectName: 'afj-docs',
```

### Enable Pages

In the repo's **Settings → Pages**, set **Source** to **GitHub Actions** — the included `.github/workflows/deploy.yml` handles the rest on every push to `main`.

### Moving to `doc.afjcardiff.com` later

1. Create a `static/CNAME` file containing exactly: `doc.afjcardiff.com`
2. Add a CNAME DNS record for `doc.afjcardiff.com` pointing at `<your-username>.github.io`, wherever `afjcardiff.com`'s DNS is managed
3. Update `url` in `docusaurus.config.js` to `https://doc.afjcardiff.com` and `baseUrl` to `/`
4. Push — GitHub auto-provisions the TLS certificate via Let's Encrypt once DNS resolves

### On repo visibility

GitHub Pages on Free/Pro personal accounts publishes the **built site publicly** regardless of whether the source repo is private — private repo hides the code, not the deployed page. That's a non-issue for what's actually in *this* repo, content-wise (scanned, nothing sensitive here) — it only matters for the separate Netlify IP-brief site, which this repo doesn't touch.

## Licensing

Icons are [Lucide](https://lucide.dev), ISC licensed — free for commercial use, no attribution required. The working icon-set decision (Lucide over mixing icon sets ad hoc) was made directly in the canonical component library doc, not invented here. Full third-party breakdown in `NOTICE.md`.

---

Copyright © 2026 AFJ Cardiff.
