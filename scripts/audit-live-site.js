// Captures real screenshots of the LIVE deployed site across all four
// themes plus day/night mode, and runs a basic contrast check against
// every visible text node — run on GitHub's CI, not this sandbox,
// since headless Chromium can't be installed here.

const { chromium } = require('playwright');
const fs = require('fs');

const BASE = 'https://andiekobbietks.github.io/afj-docs';
const PAGES = ['/docs/live-site-status', '/docs/core-ui', '/docs/customer-journeys', '/docs/foundations'];
const THEMES = ['wine', 'scrolly', 'day', 'scrollyday'];

function relativeLuminance(r, g, b) {
  const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function parseRgb(str) {
  const m = str && str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}
function contrastRatio(fg, bg) {
  const L1 = relativeLuminance(...fg) + 0.05;
  const L2 = relativeLuminance(...bg) + 0.05;
  return Math.max(L1, L2) / Math.min(L1, L2);
}

(async () => {
  const browser = await chromium.launch();
  const results = { screenshots: [], contrastFailures: [] };
  fs.mkdirSync('static/audit', { recursive: true });

  for (const pagePath of PAGES) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(BASE + pagePath, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(500); // hydration

    for (const theme of THEMES) {
      // click the real navbar theme button by its visible label
      const labels = { wine: 'Wine / Gold', scrolly: 'Scrollytelling', day: 'Day mode', scrollyday: 'Scrolly Day' };
      await page.locator(`.navbar button:has-text("${labels[theme]}")`).click();
      await page.waitForTimeout(400);

      const shotName = `${pagePath.replace(/\//g, '_')}_${theme}.png`;
      await page.screenshot({ path: `static/audit/${shotName}` });
      results.screenshots.push(shotName);

      // Contrast-check every visible text element in the main content area
      const failures = await page.evaluate(() => {
        const bad = [];
        function relLum(r, g, b) {
          const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
          return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
        }
        function parseRgb(str) {
          const m = str && str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
        }
        const nodes = document.querySelectorAll('main p, main h1, main h2, main h3, main li, main a, .navbar a, .menu__link');
        nodes.forEach((el) => {
          const text = el.textContent.trim();
          if (!text) return;
          const style = getComputedStyle(el);
          const fg = parseRgb(style.color);
          if (!fg) return;
          let bgEl = el;
          let bg = getComputedStyle(bgEl).backgroundColor;
          while ((!bg || bg === 'rgba(0, 0, 0, 0)') && bgEl.parentElement) {
            bgEl = bgEl.parentElement;
            bg = getComputedStyle(bgEl).backgroundColor;
          }
          const bgRgb = parseRgb(bg) || [255, 255, 255];
          const L1 = relLum(...fg) + 0.05;
          const L2 = relLum(...bgRgb) + 0.05;
          const ratio = Math.max(L1, L2) / Math.min(L1, L2);
          if (ratio < 4.5) {
            bad.push({ tag: el.tagName, text: text.slice(0, 40), color: style.color, bg, ratio: ratio.toFixed(2) });
          }
        });
        return bad;
      });

      if (failures.length > 0) {
        results.contrastFailures.push({ page: pagePath, theme, failures });
      }
    }
    await page.close();
  }

  await browser.close();
  fs.writeFileSync('static/audit/results.json', JSON.stringify(results, null, 2));
  console.log(`Captured ${results.screenshots.length} screenshots, found ${results.contrastFailures.length} page/theme combos with contrast failures`);
  console.log(JSON.stringify(results.contrastFailures, null, 2));
})();
