const { When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Then('I should see the following icon categories:', async function (dataTable) {
  const expected = dataTable.raw().map((row) => row[0].trim());
  const actual = await this.page.locator('.cat-title').allTextContents();
  for (const cat of expected) {
    assert.ok(actual.includes(cat), `expected category "${cat}" to be present, got: ${actual.join(', ')}`);
  }
});

Then('every icon card should contain a visible {string} element', async function (tag) {
  const total = await this.page.locator('.icon-card').count();
  assert.ok(total > 0, 'expected at least one .icon-card');
  const withTag = await this.page.locator(`.icon-card:has(${tag})`).count();
  assert.strictEqual(withTag, total, `expected every .icon-card to contain a visible ${tag}`);
});

Then('every icon card should contain a non-empty icon name', async function () {
  const names = await this.page.locator('.icon-card .icon-name').allTextContents();
  assert.ok(names.length > 0, 'expected at least one .icon-name');
  for (const n of names) {
    assert.ok(n.trim().length > 0, 'expected every .icon-name to be non-empty');
  }
});

Then('every icon card should contain a non-empty code snippet', async function () {
  const snippets = await this.page.locator('.icon-card .icon-snippet').allTextContents();
  assert.ok(snippets.length > 0, 'expected at least one .icon-snippet');
  for (const s of snippets) {
    assert.ok(s.trim().length > 0, 'expected every .icon-snippet to be non-empty');
  }
});

Then('icon color should match the {string} theme\'s text color', async function (theme) {
  const [iconColor, textColor] = await this.page.evaluate(() => {
    const icon = document.querySelector('.icon-card svg');
    const iconColor = icon ? getComputedStyle(icon).color : null;
    const bodyColor = getComputedStyle(document.body).color;
    return [iconColor, bodyColor];
  });
  assert.strictEqual(iconColor, textColor, `expected icon color (${iconColor}) to match theme text color (${textColor}) via currentColor`);
});

When('I read the color of an icon marked as an accent variant', async function () {
  this.accentIconColor = await this.page.evaluate(() => {
    const icon = document.querySelector('.icon-circle.accent svg, .icon-circle.accent');
    return icon ? getComputedStyle(icon).color : null;
  });
});

When('I read the color of an icon marked as default', async function () {
  this.defaultIconColor = await this.page.evaluate(() => {
    const icon = document.querySelector('.icon-circle:not(.accent):not(.filled) svg, .icon-circle:not(.accent):not(.filled)');
    return icon ? getComputedStyle(icon).color : null;
  });
});

Then('the two colors should differ', function () {
  assert.notStrictEqual(this.accentIconColor, this.defaultIconColor);
});

Then('every icon card\'s SVG should contain at least one visible path or line element', async function () {
  const total = await this.page.locator('.icon-card svg').count();
  assert.ok(total > 0, 'expected at least one icon svg');
  const withShape = await this.page.locator('.icon-card svg:has(path), .icon-card svg:has(line)').count();
  assert.strictEqual(withShape, total, 'expected every icon svg to contain a path or line element');
});
