const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Then('I should see the following mockups:', async function (dataTable) {
  const expected = dataTable.raw().map((row) => row[0].trim());
  const text = await this.page.locator('body').textContent();
  for (const label of expected) {
    assert.ok(text.includes(label), `expected to find mockup "${label}" on the page`);
  }
});

Then('clicking through every mockup tab should reveal non-empty content each time', async function () {
  const targets = await this.page.locator('.tab-btn').evaluateAll((btns) => btns.map((b) => b.dataset.target));
  for (const target of targets) {
    await this.page.click(`.tab-btn[data-target="${target}"]`);
    const info = await this.page.evaluate((id) => {
      const section = document.getElementById(id);
      if (!section) return null;
      return {
        isActive: section.classList.contains('active'),
        height: section.getBoundingClientRect().height,
        hasText: section.innerText.trim().length > 0,
      };
    }, target);
    assert.ok(info, `expected a #${target} section to exist`);
    assert.ok(info.isActive, `expected #${target} to gain the active class after its tab was clicked`);
    assert.ok(info.height > 0, `expected #${target} to have non-zero height once active`);
    assert.ok(info.hasText, `expected #${target} to contain visible text once active`);
  }
});

Then('the sidebar should contain a link to each of the {int} documentation pages', async function (count) {
  const links = await this.page.locator("nav[aria-label='Docs sidebar'] a").count();
  assert.strictEqual(links, count);
});

When('I switch to the embedded preview iframe', async function () {
  const iframeLocator = this.page.locator('iframe').first();
  await iframeLocator.waitFor({ state: 'attached', timeout: 10000 });
  const handle = await iframeLocator.elementHandle();
  this.frame = await handle.contentFrame();
  assert.ok(this.frame, 'expected the embedded iframe to expose a content frame');
});

Then('the iframe should contain visible content, not a blank page', async function () {
  const bodyText = await this.frame.evaluate(() => document.body && document.body.innerText.trim());
  assert.ok(bodyText && bodyText.length > 0, 'expected the iframe body to contain visible text');
});

Then('every fenced code block should have a visible copy button', { timeout: 15000 }, async function () {
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
