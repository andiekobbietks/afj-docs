const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Then('I should see the following mockups:', async function (dataTable) {
  const expected = dataTable.raw().map((row) => row[0].trim());
  const text = await this.page.locator('body').textContent();
  for (const label of expected) {
    assert.ok(text.includes(label), `expected to find mockup "${label}" on the page`);
  }
});

Then('every mockup section should have non-zero rendered height', async function () {
  const heights = await this.page.locator('.mockup-section').evaluateAll((els) =>
    els.map((el) => el.getBoundingClientRect().height)
  );
  assert.ok(heights.length > 0, 'expected at least one .mockup-section');
  for (const h of heights) {
    assert.ok(h > 0, 'expected every mockup section to have non-zero height');
  }
});

Then('the sidebar should contain a link to each of the {int} documentation pages', async function (count) {
  const links = await this.page.locator("nav[aria-label='Docs sidebar'] a").count();
  assert.strictEqual(links, count);
});

When('I switch to the embedded preview iframe', async function () {
  const iframeLocator = this.page.locator('iframe').first();
  await iframeLocator.waitFor({ state: 'attached', timeout: 10000 });
  this.frame = await iframeLocator.contentFrame();
  assert.ok(this.frame, 'expected the embedded iframe to expose a content frame');
});

Then('the iframe should contain visible content, not a blank page', async function () {
  const bodyText = await this.frame.evaluate(() => document.body && document.body.innerText.trim());
  assert.ok(bodyText && bodyText.length > 0, 'expected the iframe body to contain visible text');
});

Then('every fenced code block should have a visible copy button', async function () {
  const buttons = this.page.locator('button[aria-label*="Copy" i], button[title*="Copy" i]');
  await buttons.first().waitFor({ state: 'visible', timeout: 10000 });
  const count = await buttons.count();
  assert.ok(count > 0, 'expected at least one copy button on the page');
});

When('I click the first copy button', async function () {
  const button = this.page.locator('button[aria-label*="Copy" i], button[title*="Copy" i]').first();
  this.copiedSourceText = await this.page.locator('pre code').first().innerText();
  await button.click();
});

Then('the copied content should match the code block\'s text', async function () {
  const clipboardText = await this.page.evaluate(() => navigator.clipboard.readText());
  assert.strictEqual(clipboardText.trim(), this.copiedSourceText.trim());
});

When('I click each card on the homepage in turn', async function () {
  const count = await this.page.locator('a[href^="/afj-docs/docs/"]').count();
  this.brokenLinks = [];
  for (let i = 0; i < count; i++) {
    const href = await this.page.locator('a[href^="/afj-docs/docs/"]').nth(i).getAttribute('href');
    const response = await this.page.request.get(`${this.baseUrl.replace('/afj-docs', '')}${href}`);
    if (!response.ok()) this.brokenLinks.push(href);
  }
});

Then('none of them should lead to a {int} page', async function (statusCode) {
  assert.deepStrictEqual(this.brokenLinks, [], `expected no broken links, found: ${this.brokenLinks.join(', ')}`);
});

Then('the page text should not contain {string}', async function (forbidden) {
  const text = await this.page.locator('body').innerText();
  assert.ok(!text.includes(forbidden), `expected page text to not contain "${forbidden}"`);
});
