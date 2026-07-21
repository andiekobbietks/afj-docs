const { When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Then('the {string} element within that section should be visible', async function (selector) {
  const el = this.page.locator(selector).first();
  await el.waitFor({ state: 'visible', timeout: 5000 });
});

Then('the {string} element should have non-zero size', async function (selector) {
  const box = await this.page.locator(selector).first().boundingBox();
  assert.ok(box && box.width > 0 && box.height > 0, `expected ${selector} to have non-zero size`);
});

When('I read the background color of the first {string} element', async function (selector) {
  this.lastColor = await this.page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? getComputedStyle(el).backgroundColor : null;
  }, selector);
});

Then('the background color of the first {string} element should differ from before', async function (selector) {
  const now = await this.page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? getComputedStyle(el).backgroundColor : null;
  }, selector);
  assert.notStrictEqual(now, this.lastColor);
});

When('I read the border-radius of {string}', async function (selector) {
  this.lastRadius = await this.page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? parseFloat(getComputedStyle(el).borderRadius) : null;
  }, selector);
});

Then('the border-radius of {string} should be at least {string}', async function (selector, minPx) {
  const now = await this.page.evaluate((sel) => {
    const el = document.querySelector(sel);
    return el ? parseFloat(getComputedStyle(el).borderRadius) : null;
  }, selector);
  const min = parseFloat(minPx);
  assert.ok(now >= min, `expected border-radius of ${selector} to be at least ${min}px, got ${now}px`);
});

Then('every {string} element should contain a {string}', async function (parentSelector, childSelector) {
  const total = await this.page.locator(parentSelector).count();
  assert.ok(total > 0, `expected at least one ${parentSelector}`);
  const withChild = await this.page.locator(`${parentSelector}:has(${childSelector})`).count();
  assert.strictEqual(withChild, total, `expected every ${parentSelector} to contain ${childSelector}`);
});

Then('the code pane text in that section should not be empty', async function () {
  assert.ok(this.lastScrolledSectionId, 'no section has been scrolled to yet in this scenario');
  const text = await this.page.evaluate((id) => {
    const section = document.getElementById(id);
    const pane = section && section.querySelector('.code-pane');
    return pane ? pane.textContent.trim() : '';
  }, this.lastScrolledSectionId);
  assert.ok(text.length > 0, 'expected non-empty code pane text');
});
