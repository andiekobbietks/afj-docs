const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('I open the component library page', async function () {
  this.jsErrorSeen = false;
  this.page.on('pageerror', () => { this.jsErrorSeen = true; });
  await this.page.goto(`${this.baseUrl}/component-library.html`, { waitUntil: 'load' });
});

Given('I open the icon library page', async function () {
  await this.page.goto(`${this.baseUrl}/icon-library.html`, { waitUntil: 'load' });
});

Given('I open the UI mockups page', async function () {
  await this.page.goto(`${this.baseUrl}/ui-mockups.html`, { waitUntil: 'load' });
});

Given('I open the homepage', async function () {
  await this.page.goto(`${this.baseUrl}/`, { waitUntil: 'load' });
});

When('I open the docs page {string}', async function (slug) {
  this.lastResponse = await this.page.goto(`${this.baseUrl}/docs/${slug}`, { waitUntil: 'load' });
});

Then('the page should return a successful status', function () {
  assert.ok(this.lastResponse && this.lastResponse.ok(), 'expected a 2xx response');
});

Then('the page should contain a visible {string} heading', async function (tag) {
  const el = this.page.locator(tag).first();
  await assert.doesNotReject(el.waitFor({ state: 'visible', timeout: 5000 }));
});

// --- Theme switching (shared across many features) ---

When('I click the {string} theme button', async function (theme) {
  const byId = this.page.locator(`#btn-${theme}`);
  if (await byId.count() > 0) {
    await byId.click();
  } else {
    await this.page.locator(`button[data-theme="${theme}"]`).click();
  }
  await this.page.waitForTimeout(300); // theme colors transition over 250ms
});

Then('the active theme should be {string}', async function (theme) {
  const actual = await this.page.getAttribute('#appRoot', 'data-theme');
  assert.strictEqual(actual, theme);
});

Then('the active theme should still be {string}', async function (theme) {
  const actual = await this.page.getAttribute('#appRoot', 'data-theme');
  assert.strictEqual(actual, theme);
});

Then('only one theme button should be marked active', async function () {
  const activeCount = await this.page.locator('.theme-toggle button[class*="active-"]').count();
  assert.strictEqual(activeCount, 1);
});

Given('the active theme is {string}', async function (theme) {
  await this.page.click(`#btn-${theme}`);
});

// --- Site day/night switch ---

Given('the site chrome is in {string} mode', async function (mode) {
  const current = await this.page.getAttribute('html', 'data-site-mode');
  const normalized = current === 'day' ? 'day' : 'dark';
  if (normalized !== mode) {
    await this.page.click('#siteModeSwitch');
  }
});

When('I click the site day\\/night switch', async function () {
  await this.page.click('#siteModeSwitch');
});

Then('the site chrome should be in {string} mode', async function (mode) {
  const current = await this.page.getAttribute('html', 'data-site-mode');
  const normalized = current === 'day' ? 'day' : 'dark';
  assert.strictEqual(normalized, mode);
});

// --- Scroll / section helpers ---

When('I scroll to the {string} section', async function (sectionId) {
  this.lastScrolledSectionId = sectionId;
  await this.page.locator(`#${sectionId}`).scrollIntoViewIfNeeded();
  this.scrollYAfterScroll = await this.page.evaluate(() => window.scrollY);
});

Then('the {string} section should be in view', async function (sectionId) {
  const inView = await this.page.evaluate((id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }, sectionId);
  assert.ok(inView, `expected #${sectionId} to be in the viewport`);
});

Then('the {string} section should still be in view', async function (sectionId) {
  const inView = await this.page.evaluate((id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }, sectionId);
  assert.ok(inView, `expected #${sectionId} to still be in the viewport`);
});

When('I press {string}', async function (key) {
  await this.page.keyboard.press(key);
});

When('I reload the page', async function () {
  await this.page.reload({ waitUntil: 'load' });
});

Then('the page should not show a JavaScript error', async function () {
  assert.ok(!this.jsErrorSeen, 'expected no uncaught JavaScript error on the page');
});

Then('no JavaScript error should have occurred', async function () {
  assert.ok(!this.jsErrorSeen, 'expected no uncaught JavaScript error on the page');
});
