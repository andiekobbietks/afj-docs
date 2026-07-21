const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Then('the mobile menu toggle should be a {string} element', async function (tag) {
  const tagName = await this.page.evaluate(() => document.getElementById('menuToggle').tagName.toLowerCase());
  assert.strictEqual(tagName, tag);
});

Then('it should have a non-empty {string}', async function (attr) {
  const value = await this.page.getAttribute('#menuToggle', attr);
  assert.ok(value && value.trim().length > 0, `expected #menuToggle to have a non-empty ${attr}`);
});

When('I click the mobile menu toggle', async function () {
  await this.page.setViewportSize({ width: 480, height: 800 });
  await this.page.click('#menuToggle');
});

Then('the mobile menu toggle should have aria-expanded {string}', async function (value) {
  const actual = await this.page.getAttribute('#menuToggle', 'aria-expanded');
  assert.strictEqual(actual, value);
});

Then('the sidebar overlay should have {string} set to {string}', async function (attr, value) {
  const actual = await this.page.getAttribute('#sidebarOverlay', attr);
  assert.strictEqual(actual, value);
});

Then('the mobile nav drawer should be closed', async function () {
  const open = await this.page.evaluate(() => document.getElementById('docSidebar')?.classList.contains('mobile-open'));
  assert.ok(!open, 'expected the mobile nav drawer to not have the mobile-open class');
});

Then('the site mode switch should have aria-label {string}', async function (label) {
  const actual = await this.page.getAttribute('#siteModeSwitch', 'aria-label');
  assert.strictEqual(actual, label);
});

Then('the contrast ratio of muted text should be at least {float} to {int} in theme {string}', async function (ratio, denom, theme) {
  await this.page.click(`#btn-${theme}`);
  const actualRatio = await this.page.evaluate(() => {
    function luminance(r, g, b) {
      const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
      return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    }
    function parseRgb(str) {
      const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : [0, 0, 0];
    }
    const muted = document.querySelector('.doc-desc') || document.body;
    const style = getComputedStyle(muted);
    const fg = parseRgb(style.color);
    let bgEl = muted;
    let bg = getComputedStyle(bgEl).backgroundColor;
    while (bg === 'rgba(0, 0, 0, 0)' && bgEl.parentElement) {
      bgEl = bgEl.parentElement;
      bg = getComputedStyle(bgEl).backgroundColor;
    }
    const bgRgb = parseRgb(bg);
    const L1 = luminance(...fg) + 0.05;
    const L2 = luminance(...bgRgb) + 0.05;
    return Math.max(L1, L2) / Math.min(L1, L2);
  });
  assert.ok(actualRatio >= ratio, `expected contrast ratio >= ${ratio}:1 in theme "${theme}", got ${actualRatio.toFixed(2)}:1`);
});

When('I press {string} repeatedly until the search input is focused', async function (key) {
  for (let i = 0; i < 20; i++) {
    const focused = await this.page.evaluate(() => document.activeElement && document.activeElement.id);
    if (focused === 'siteSearch') return;
    await this.page.keyboard.press(key);
  }
  throw new Error('search input was never reached by repeated Tab presses within 20 attempts');
});

Then('continuing to press {string} should reach a sidebar nav link next', async function (key) {
  await this.page.keyboard.press(key);
  const focused = await this.page.evaluate(() => {
    const el = document.activeElement;
    return el ? { tag: el.tagName, className: el.className, href: el.getAttribute('href') } : null;
  });
  assert.ok(focused && focused.tag === 'A' && focused.className.includes('doc-nav-link'), `expected focus to land on a .doc-nav-link, got ${JSON.stringify(focused)}`);
});

Then('every {string} element on the page should have an accessible name', async function (tag) {
  const problems = await this.page.evaluate((t) => {
    const bad = [];
    document.querySelectorAll(t).forEach((el) => {
      const name = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.textContent.trim();
      if (!name) bad.push(el.outerHTML.slice(0, 80));
    });
    return bad;
  }, tag);
  assert.deepStrictEqual(problems, [], `found ${tag} elements with no accessible name: ${problems.join(' | ')}`);
});

When('I focus the first {string} element on the page', async function (tag) {
  await this.page.locator(tag).first().focus();
});

Then('it should have a visible focus outline', async function () {
  const hasOutline = await this.page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return false;
    const style = getComputedStyle(el);
    return (style.outlineStyle !== 'none' && style.outlineWidth !== '0px') || style.boxShadow !== 'none';
  });
  assert.ok(hasOutline, 'expected the focused element to have a visible outline or box-shadow');
});
