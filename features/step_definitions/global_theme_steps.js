const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

const GLOBAL_LABELS = { wine: 'Wine / Gold', scrolly: 'Scrollytelling', day: 'Day mode', scrollyday: 'Scrolly Day' };

Given('I wait for the global theme toggle to be ready', async function () {
  await this.page.locator('.navbar button[aria-label^="Switch to"]').waitFor({ state: 'visible', timeout: 10000 });
});

Then('the html element should have data-afj-theme {string}', async function (theme) {
  const actual = await this.page.getAttribute('html', 'data-afj-theme');
  assert.strictEqual(actual, theme);
});

Then('the html element should still have data-afj-theme {string}', async function (theme) {
  const actual = await this.page.getAttribute('html', 'data-afj-theme');
  assert.strictEqual(actual, theme);
});

When('I click the global {string} theme button', async function (theme) {
  const label = GLOBAL_LABELS[theme];
  const before = await this.page.evaluate(() => getComputedStyle(document.querySelector('.navbar')).backgroundColor);
  this.navbarBgBefore = before;
  await this.page.locator(`.navbar button:has-text("${label}")`).click();
  await this.page.waitForTimeout(300); // theme colors transition
});

Then('the navbar background color should change from the Wine\\/Gold default', async function () {
  const after = await this.page.evaluate(() => getComputedStyle(document.querySelector('.navbar')).backgroundColor);
  assert.notStrictEqual(after, this.navbarBgBefore, 'expected the navbar background color to actually change after switching theme');
});

Then('the html element should have data-afj-mode {string}', async function (mode) {
  const actual = await this.page.getAttribute('html', 'data-afj-mode');
  assert.strictEqual(actual, mode);
});

When('I click the global site day\\/night switch', async function () {
  await this.page.locator('.navbar button[aria-label^="Switch to"]').click();
});

Then('the global site day\\/night switch should have aria-label {string}', async function (label) {
  const actual = await this.page.getAttribute('.navbar button[aria-label^="Switch to"]', 'aria-label');
  assert.strictEqual(actual, label);
});

Then('exactly {int} global theme button should be marked aria-pressed true', async function (n) {
  const count = await this.page.locator('.navbar button[aria-pressed="true"]').count();
  assert.strictEqual(count, n);
});

Then('there should be no visible Docusaurus color-mode toggle button', async function () {
  const count = await this.page.locator('.navbar [class*="toggleButton"]').count();
  assert.strictEqual(count, 0, 'expected disableSwitch to have removed the built-in color-mode toggle entirely');
});
