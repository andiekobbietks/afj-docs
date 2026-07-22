const { Then } = require('@cucumber/cucumber');
const assert = require('assert');

Then('that section should contain at least {int} changelog entries', async function (min) {
  const id = this.lastScrolledSectionId;
  const count = await this.page.evaluate((sid) => {
    const section = document.getElementById(sid);
    return section ? section.querySelectorAll('.clog-body').length : 0;
  }, id);
  assert.ok(count >= min, `expected at least ${min} .clog-body entries, got ${count}`);
});

Then('there should be no actual font files served from this site\'s own static path', async function () {
  const hasLocalFontFace = await this.page.evaluate(() => {
    for (const sheet of document.styleSheets) {
      let rules;
      try { rules = sheet.cssRules; } catch { continue; }
      for (const rule of rules || []) {
        if (rule.type === CSSRule.FONT_FACE_RULE && /url\(['"]?\/(?!\/)/.test(rule.style.getPropertyValue('src') || '')) {
          return true;
        }
      }
    }
    return false;
  });
  assert.ok(!hasLocalFontFace, 'expected no local @font-face src — fonts still load from Google Fonts, not self-hosted, despite the Downloads section claim');
});

Then('the icon library actually renders icons as inline SVG, not as downloadable icon files', async function () {
  await this.page.goto(`${this.baseUrl}/icon-library.html`, { waitUntil: 'load' });
  const inlineSvgCount = await this.page.locator('.icon-card svg').count();
  const imgTagCount = await this.page.locator('.icon-card img[src$=".svg"]').count();
  assert.ok(inlineSvgCount > 0, 'expected inline <svg> icons');
  assert.strictEqual(imgTagCount, 0, 'expected zero <img src=".svg"> — icons are inline SVG, not linked downloadable files');
});
