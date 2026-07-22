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
  await this.page.waitForTimeout(350); // site debounces filterNav by 120ms — widened margin for slower CI runners
});

When('I clear the search field', async function () {
  await this.page.fill('#siteSearch', '');
  await this.page.waitForTimeout(350);
});

Then('the {string} content section should be visible', async function (sectionId) {
  const hidden = await this.page.evaluate((id) => {
    const el = document.getElementById(id);
    return el ? el.classList.contains('content-hidden') : null;
  }, sectionId);
  assert.strictEqual(hidden, false, `expected #${sectionId} to not have content-hidden`);
});

Then('the {string} content section should not be visible', async function (sectionId) {
  const hidden = await this.page.evaluate((id) => {
    const el = document.getElementById(id);
    return el ? el.classList.contains('content-hidden') : null;
  }, sectionId);
  assert.strictEqual(hidden, true, `expected #${sectionId} to have content-hidden`);
});

Then('the search-empty pane should be visible', async function () {
  const active = await this.page.evaluate(() => {
    const el = document.getElementById('searchEmptyPane');
    return el ? el.classList.contains('active') : false;
  });
  assert.ok(active, 'expected #searchEmptyPane to have the active class');
});

Then('the search input should be focused', async function () {
  const focused = await this.page.evaluate(() => document.activeElement && document.activeElement.id);
  assert.strictEqual(focused, 'siteSearch');
});

Then('the {string} nav link should have the active class', async function (label) {
  const hasActive = await this.page.evaluate((l) => {
    const links = Array.from(document.querySelectorAll('.doc-nav-link'));
    const link = links.find((el) => el.textContent.trim() === l);
    return link ? link.classList.contains('active') : null;
  }, label);
  assert.strictEqual(hasActive, true, `expected the "${label}" nav link to have the active class`);
});

Then('the breadcrumb should show {string}', async function (text) {
  const crumb = await this.page.locator('.doc-crumb').textContent();
  assert.ok(crumb.includes(text), `expected the breadcrumb to include "${text}", got "${crumb}"`);
});

Then('the page scroll position should not have changed', async function () {
  const now = await this.page.evaluate(() => window.scrollY);
  assert.ok(
    Math.abs(now - this.scrollYAfterScroll) < 5,
    `expected scrollY to stay near ${this.scrollYAfterScroll}, got ${now}`
  );
});
