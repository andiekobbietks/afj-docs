const { Then } = require('@cucumber/cucumber');
const assert = require('assert');

Then('that section should contain at least {int} token swatches', async function (min) {
  const id = this.lastScrolledSectionId;
  const count = await this.page.evaluate((sid) => {
    const section = document.getElementById(sid);
    return section ? section.querySelectorAll('.tok-swatch').length : 0;
  }, id);
  assert.ok(count >= min, `expected at least ${min} .tok-swatch elements in #${id}, got ${count}`);
});

Then('that section should contain an element with the gradient heading class', async function () {
  const id = this.lastScrolledSectionId;
  const count = await this.page.evaluate((sid) => {
    const section = document.getElementById(sid);
    return section ? section.querySelectorAll('.demo-heading.gradient').length : 0;
  }, id);
  assert.ok(count > 0, `expected #${id} to contain a .demo-heading.gradient element`);
});

Then('there should be at least {int} ADR cards on the page', async function (min) {
  const count = await this.page.locator('.adr-card').count();
  assert.ok(count >= min, `expected at least ${min} .adr-card elements, got ${count}`);
});

Then('every ADR card should have a non-empty title', async function () {
  const titles = await this.page.locator('.adr-card h4').allTextContents();
  assert.ok(titles.length > 0, 'expected at least one ADR title');
  for (const t of titles) {
    assert.ok(t.trim().length > 0, 'expected every ADR card to have a non-empty h4 title');
  }
});

Then('every ADR card should have a status badge', async function () {
  const total = await this.page.locator('.adr-card').count();
  const withStatus = await this.page.locator('.adr-card:has(.adr-status)').count();
  assert.strictEqual(withStatus, total, 'expected every .adr-card to contain a .adr-status badge');
});

Then('every ADR card should have exactly {int} fields', async function (n) {
  const counts = await this.page.locator('.adr-card').evaluateAll((cards, expected) =>
    cards.map((c) => c.querySelectorAll('.adr-field').length).filter((c) => c !== expected),
    n
  );
  assert.deepStrictEqual(counts, [], `found ADR cards without exactly ${n} fields: ${JSON.stringify(counts)}`);
});

Then('every ADR field on the page should have both a label and non-empty text', async function () {
  const problems = await this.page.evaluate(() => {
    const bad = [];
    document.querySelectorAll('.adr-field').forEach((field) => {
      const label = field.querySelector('.adr-field-label');
      const body = field.querySelector('p');
      if (!label || !label.textContent.trim() || !body || !body.textContent.trim()) {
        bad.push(field.textContent.slice(0, 40));
      }
    });
    return bad;
  });
  assert.deepStrictEqual(problems, [], `found ADR fields missing a label or body: ${problems.join(' | ')}`);
});

Then('no ADR card should have an empty or placeholder status', async function () {
  const statuses = await this.page.locator('.adr-status').allTextContents();
  const placeholders = ['', 'tbd', 'todo', 'placeholder', 'pending'];
  for (const s of statuses) {
    assert.ok(!placeholders.includes(s.trim().toLowerCase()), `found a placeholder-looking ADR status: "${s}"`);
  }
});
