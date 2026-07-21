const { When, Then, Given } = require('@cucumber/cucumber');
const assert = require('assert');

Given('I open the accessibility menu', async function () {
  await this.page.click('#a11yTrigger');
});

When('I click the accessibility menu trigger', async function () {
  await this.page.click('#a11yTrigger');
});

Then('the accessibility panel should not be open', async function () {
  const hasOpenClass = await this.page.evaluate(() => {
    const panel = document.getElementById('a11yPanel');
    return panel && panel.classList.contains('open');
  });
  assert.ok(!hasOpenClass);
});

Then('the accessibility panel should be open', async function () {
  const hasOpenClass = await this.page.evaluate(() => {
    const panel = document.getElementById('a11yPanel');
    return panel && panel.classList.contains('open');
  });
  assert.ok(hasOpenClass);
});

Then('the accessibility trigger should have aria-expanded {string}', async function (value) {
  const actual = await this.page.getAttribute('#a11yTrigger', 'aria-expanded');
  assert.strictEqual(actual, value);
});

Then('the text size should read {string}', async function (value) {
  const actual = await this.page.textContent('#a11yTextSizeVal');
  assert.strictEqual(actual.trim(), value);
});

When('I set text size to {string}', async function (value) {
  await this.page.fill('#a11yTextSize', value);
  await this.page.dispatchEvent('#a11yTextSize', 'input');
});

Then('the root font size should be {string}', async function (expected) {
  const actual = await this.page.evaluate(() => document.documentElement.style.fontSize);
  assert.strictEqual(actual, expected);
});

When('I enable high contrast', async function () {
  await this.page.check('#a11yContrast');
});

Then('high contrast should be enabled', async function () {
  const attr = await this.page.getAttribute('html', 'data-a11y-contrast');
  assert.strictEqual(attr, 'high');
});

Then('high contrast should be disabled', async function () {
  const attr = await this.page.getAttribute('html', 'data-a11y-contrast');
  assert.strictEqual(attr, 'normal');
});

When('I enable the hyperlegible font', async function () {
  await this.page.check('#a11yFont');
});

Then('the body font family should include {string}', async function (fontName) {
  const family = await this.page.evaluate(() => getComputedStyle(document.body).fontFamily);
  assert.ok(family.includes(fontName), `expected body font-family to include "${fontName}", got "${family}"`);
});

Then('the hyperlegible font should be disabled', async function () {
  const attr = await this.page.getAttribute('html', 'data-a11y-font');
  assert.strictEqual(attr, 'default');
});

When('I enable reduce motion', async function () {
  await this.page.check('#a11yMotion');
});

Then('the html element should have data-a11y-motion {string}', async function (value) {
  const actual = await this.page.getAttribute('html', 'data-a11y-motion');
  assert.strictEqual(actual, value);
});

When('I enable underline links', async function () {
  await this.page.check('#a11yUnderline');
});

Then('site links should be underlined', async function () {
  const decoration = await this.page.evaluate(() => {
    const a = document.querySelector('a');
    return a ? getComputedStyle(a).textDecorationLine : null;
  });
  assert.ok(decoration && decoration.includes('underline'));
});

Then('site links should not be underlined', async function () {
  const attr = await this.page.getAttribute('html', 'data-a11y-underline');
  assert.strictEqual(attr, 'false');
});

When('I enable large cursor', async function () {
  await this.page.check('#a11yCursor');
});

Then('the html element should have data-a11y-cursor {string}', async function (value) {
  const actual = await this.page.getAttribute('html', 'data-a11y-cursor');
  assert.strictEqual(actual, value);
});

When('I click reset accessibility settings', async function () {
  await this.page.click('.a11y-reset');
});

Then('localStorage key {string} should contain {string}', async function (key, fragment) {
  const value = await this.page.evaluate((k) => localStorage.getItem(k), key);
  assert.ok(value && value.includes(fragment), `expected localStorage["${key}"] to include "${fragment}", got: ${value}`);
});
