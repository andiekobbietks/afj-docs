const { When, Then, Given } = require('@cucumber/cucumber');
const assert = require('assert');

When('I click the {string} nav link', async function (label) {
  await this.page.click(`.doc-nav-link:text-is("${label}")`);
  // The site scrolls via scrollIntoView({behavior:'smooth'}) — give the
  // animation time to actually finish before anything checks position.
  await this.page.waitForTimeout(700);
});

Then('every sidebar nav link should have a real {string} attribute', async function (attr) {
  const count = await this.page.locator('.doc-nav-link').count();
  assert.ok(count > 0, 'expected at least one nav link');
  const missing = await this.page.locator(`.doc-nav-link:not([${attr}])`).count();
  assert.strictEqual(missing, 0, `expected every .doc-nav-link to have [${attr}]`);
});

When('I click the {string} category chip', async function (label) {
  await this.page.click(`.cat-chip:text-is("${label}")`);
});

Then('the {string} category chip should be marked pressed', async function (label) {
  const pressed = await this.page.getAttribute(`.cat-chip:text-is("${label}")`, 'aria-pressed');
  assert.strictEqual(pressed, 'true');
});

Then('the {string} category chip should not be marked pressed', async function (label) {
  const pressed = await this.page.getAttribute(`.cat-chip:text-is("${label}")`, 'aria-pressed');
  assert.strictEqual(pressed, 'false');
});

Then('every nav group should be visible', async function () {
  const hiddenCount = await this.page.locator('.doc-nav-group.search-hidden').count();
  assert.strictEqual(hiddenCount, 0);
});

When('I search for {string}', async function (term) {
  await this.page.fill('#siteSearch', term);
  await this.page.waitForTimeout(200); // site debounces filterNav by 120ms
});

When('I clear the search field', async function () {
  await this.page.fill('#siteSearch', '');
  await this.page.waitForTimeout(200);
});

Then('the {string} nav link should be visible', async function (label) {
  await this.page.locator(`.doc-nav-link:text-is("${label}")`).first().waitFor({ state: 'visible', timeout: 3000 });
});

Then('the {string} nav link should not be visible', async function (label) {
  const link = this.page.locator(`.doc-nav-link:text-is("${label}")`).first();
  const visible = await link.isVisible().catch(() => false);
  assert.ok(!visible, `expected "${label}" nav link to not be visible`);
});

Then('no nav links should be visible', async function () {
  const visibleCount = await this.page.locator('.doc-nav-link:visible').count();
  assert.strictEqual(visibleCount, 0);
});

Then('the search input should be focused', async function () {
  const focused = await this.page.evaluate(() => document.activeElement && document.activeElement.id);
  assert.strictEqual(focused, 'siteSearch');
});
