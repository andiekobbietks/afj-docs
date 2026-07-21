const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('I switch to the class booking demo iframe', async function () {
  this.frame = await this.findFrameByTitle('AFJ Cardiff | Class Booking Journey');
  assert.ok(this.frame, 'could not find the class booking demo iframe by title');
});

Then('no class detail panel should be open', async function () {
  const openCount = await this.frame.locator('.open').count();
  assert.strictEqual(openCount, 0);
});

When('I click the first class row', async function () {
  await this.frame.locator('.class-row').first().click();
});

Then('its detail panel should be open', async function () {
  const isOpen = await this.frame.evaluate(() => {
    const row = document.querySelector('.class-row');
    const id = row.id.replace('row-', '');
    const card = document.getElementById('card-' + id);
    return card && card.classList.contains('open');
  });
  assert.ok(isOpen, 'expected the first class card to have the open class');
});

Then('aria-expanded on that row should be {string}', async function (value) {
  const actual = await this.frame.getAttribute('.class-row', 'aria-expanded');
  assert.strictEqual(actual, value);
});

When('I click the first class row again', async function () {
  await this.frame.locator('.class-row').first().click();
});

Then('its detail panel should be closed', async function () {
  const isOpen = await this.frame.evaluate(() => {
    const row = document.querySelector('.class-row');
    const id = row.id.replace('row-', '');
    const card = document.getElementById('card-' + id);
    return card && card.classList.contains('open');
  });
  assert.ok(!isOpen, 'expected the first class card to not have the open class');
});

When('I click the second class row', async function () {
  await this.frame.locator('.class-row').nth(1).click();
});

Then('both detail panels should be open', async function () {
  const openCount = await this.frame.locator('.open').count();
  assert.ok(openCount >= 2, `expected at least 2 open panels, found ${openCount}`);
});

When('I focus the first class row', async function () {
  await this.frame.locator('.class-row').first().focus();
});

When('I click {string} on that class', async function (label) {
  await this.frame.locator(`.class-card.open button:has-text("${label}")`).first().click();
});

Then('that class should be marked as booked', async function () {
  const bookedText = await this.frame.locator('.btn-book').first().textContent();
  assert.strictEqual((bookedText || '').trim(), 'Booked ✓');
  const hasBookedClass = await this.frame.locator('.btn-book.booked').count();
  assert.ok(hasBookedClass > 0, 'expected the booked button to carry the .booked class');
});

Then('the page URL should not have changed', async function () {
  const url = this.frame.url();
  assert.ok(url === 'about:srcdoc' || url.startsWith('about:'), `expected an unchanged srcdoc frame URL, got ${url}`);
});
