const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('I switch to the shop demo iframe', async function () {
  this.frame = await this.findFrameByTitle('AFJ Cardiff | Shop Mockup');
  assert.ok(this.frame, 'could not find the shop demo iframe by title');
});

Then('the product grid should be visible', async function () {
  const active = await this.frame.evaluate(() => {
    const el = document.getElementById('view-grid');
    return el && el.classList.contains('active');
  });
  assert.ok(active, 'expected #view-grid to be the active view');
});

Then('at least one product card should be visible', async function () {
  const count = await this.frame.locator('.product-card').count();
  assert.ok(count > 0, 'expected at least one .product-card');
});

When('I click the first product card', async function () {
  await this.frame.locator('.product-card').first().click();
});

Then('the product detail view should be visible', async function () {
  const active = await this.frame.evaluate(() => {
    const el = document.getElementById('view-detail');
    return el && el.classList.contains('active');
  });
  assert.ok(active, 'expected #view-detail to be the active view');
});

Then('a {string} control should be visible', async function (label) {
  await this.frame.locator(`.view.active .back-btn:has-text("${label}")`).first().waitFor({ state: 'visible', timeout: 3000 });
});

When('I click {string}', async function (label) {
  await this.frame.locator(`.view.active :text-is("${label}"), .view.active .back-btn:has-text("${label}")`).first().click();
});

When('I select size {string}', async function (size) {
  await this.frame.locator(`.size-opt[data-size="${size}"]`).click();
});

Then('size {string} should be marked selected', async function (size) {
  const pressed = await this.frame.getAttribute(`.size-opt[data-size="${size}"]`, 'aria-pressed');
  assert.strictEqual(pressed, 'true');
});

Then('size {string} should not be marked selected', async function (size) {
  const pressed = await this.frame.getAttribute(`.size-opt[data-size="${size}"]`, 'aria-pressed');
  assert.strictEqual(pressed, 'false');
});

When('I decrease quantity {int} times', async function (times) {
  const btn = this.frame.locator('.qty-btn').first();
  for (let i = 0; i < times; i++) await btn.click();
});

When('I increase quantity {int} times', async function (times) {
  const btn = this.frame.locator('.qty-btn').nth(1);
  for (let i = 0; i < times; i++) await btn.click();
});

Then('the quantity should read {string}', async function (expected) {
  const text = await this.frame.locator('#qtyVal').textContent();
  assert.strictEqual((text || '').trim(), expected);
});

Then('the quantity display should not overflow its container', async function () {
  const overflowing = await this.frame.evaluate(() => {
    const el = document.getElementById('qtyVal');
    if (!el) return false;
    return el.scrollWidth > el.clientWidth + 2;
  });
  assert.ok(!overflowing, 'expected the quantity display to not overflow visually');
});

When('I add the item to the cart', async function () {
  await this.frame.locator('button:has-text("Add to basket")').first().click();
});

Then('the cart drawer should be open', async function () {
  const active = await this.frame.evaluate(() => {
    const el = document.getElementById('cartDrawer');
    return el && el.classList.contains('active');
  });
  assert.ok(active, 'expected #cartDrawer to have the active class');
});

Then('the cart should contain {int} line item', async function (n) {
  const count = await this.frame.locator('.cart-line').count();
  assert.strictEqual(count, n);
});

Then('the cart should contain {int} line items', async function (n) {
  const count = await this.frame.locator('.cart-line').count();
  assert.strictEqual(count, n);
});

Given('the cart is empty', async function () {
  await this.frame.evaluate(() => {
    if (typeof cart !== 'undefined') cart.length = 0;
    if (typeof updateCartUI === 'function') updateCartUI();
  });
});

When('I add {int} different items to the cart', async function (n) {
  const cards = this.frame.locator('.product-card');
  const total = await cards.count();
  for (let i = 0; i < Math.min(n, total); i++) {
    await cards.nth(i).click();
    await this.frame.locator('button:has-text("Add to basket")').first().click();
    await this.frame.locator('.view.active .back-btn').first().click();
  }
});

Then('the cart count badge should read {string}', async function (expected) {
  const text = await this.frame.locator('#cartCount').textContent();
  assert.strictEqual((text || '').trim(), expected);
});

Given('I add {int} item to the cart', async function (n) {
  const cards = this.frame.locator('.product-card');
  for (let i = 0; i < n; i++) {
    await cards.first().click();
    await this.frame.locator('button:has-text("Add to basket")').first().click();
    await this.frame.locator('.view.active .back-btn').first().click();
  }
});

Given('I open the cart', async function () {
  await this.frame.click('.icon-btn');
});

When('I remove that item', async function () {
  await this.frame.locator('.cart-remove').first().click();
});

When('I click the drawer scrim', async function () {
  await this.frame.click('#scrim');
});

Then('the cart drawer should be closed', async function () {
  const active = await this.frame.evaluate(() => {
    const el = document.getElementById('cartDrawer');
    return el && el.classList.contains('active');
  });
  assert.ok(!active, 'expected #cartDrawer to not have the active class');
});

When('I click the product gallery to zoom', async function () {
  await this.frame.click('#pdGallery');
});

Then('the zoom overlay should be visible', async function () {
  const active = await this.frame.evaluate(() => {
    const el = document.getElementById('zoomOverlay');
    return el && el.classList.contains('active');
  });
  assert.ok(active, 'expected #zoomOverlay to have the active class');
});

When('I click the zoom overlay', async function () {
  await this.frame.click('#zoomOverlay');
});

Then('the zoom overlay should be closed', async function () {
  const active = await this.frame.evaluate(() => {
    const el = document.getElementById('zoomOverlay');
    return el && el.classList.contains('active');
  });
  assert.ok(!active, 'expected #zoomOverlay to not have the active class');
});

Then('every clickable control in the shop demo should be keyboard-operable', async function () {
  const problems = await this.frame.evaluate(() => {
    const bad = [];
    document.querySelectorAll('[onclick]').forEach((el) => {
      const isRealControl = el.tagName === 'BUTTON' || (el.tagName === 'A' && el.hasAttribute('href'));
      const isFakeButton = el.getAttribute('role') === 'button' && el.hasAttribute('tabindex');
      const isDecorative = el.getAttribute('aria-hidden') === 'true';
      if (!isRealControl && !isFakeButton && !isDecorative) {
        bad.push(el.className || el.tagName);
      }
    });
    return bad;
  });
  assert.deepStrictEqual(problems, [], `found non-keyboard-operable clickable elements: ${problems.join(', ')}`);
});
