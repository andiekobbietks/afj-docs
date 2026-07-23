const { When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

function contrastFormula() {
  return `
    function relLum(r, g, b) {
      const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
      return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    }
    function parseRgb(str) {
      const m = str && str.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/);
      return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
    }
    function ratio(fg, bg) {
      const L1 = relLum(...fg) + 0.05;
      const L2 = relLum(...bg) + 0.05;
      return Math.max(L1, L2) / Math.min(L1, L2);
    }
  `;
}

Then('the computed body text contrast ratio should be at least {float} to {int}', async function (minRatio, denom) {
  await this.page.waitForTimeout(400); // theme transition
  const actual = await this.page.evaluate(`(() => {
    ${contrastFormula()}
    const p = document.querySelector('main p') || document.body;
    const fg = parseRgb(getComputedStyle(p).color);
    let bgEl = p, bg = getComputedStyle(bgEl).backgroundColor;
    while ((!bg || bg === 'rgba(0, 0, 0, 0)') && bgEl.parentElement) {
      bgEl = bgEl.parentElement;
      bg = getComputedStyle(bgEl).backgroundColor;
    }
    return ratio(fg, parseRgb(bg) || [255,255,255]);
  })()`);
  assert.ok(actual >= minRatio, `expected body text contrast >= ${minRatio}:1, got ${actual.toFixed(2)}:1`);
});

Then('the computed sidebar link contrast ratio should be at least {float} to {int}', async function (minRatio, denom) {
  await this.page.waitForTimeout(400);
  const actual = await this.page.evaluate(`(() => {
    ${contrastFormula()}
    const link = document.querySelector('.menu__link');
    const fg = parseRgb(getComputedStyle(link).color);
    let bgEl = link, bg = getComputedStyle(bgEl).backgroundColor;
    while ((!bg || bg === 'rgba(0, 0, 0, 0)') && bgEl.parentElement) {
      bgEl = bgEl.parentElement;
      bg = getComputedStyle(bgEl).backgroundColor;
    }
    return ratio(fg, parseRgb(bg) || [255,255,255]);
  })()`);
  assert.ok(actual >= minRatio, `expected sidebar link contrast >= ${minRatio}:1, got ${actual.toFixed(2)}:1`);
});
