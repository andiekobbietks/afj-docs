const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('I switch to the course subscription demo iframe', async function () {
  this.frame = await this.findFrameByTitle('AFJ Cardiff | Course Subscription Journey');
  assert.ok(this.frame, 'could not find the course subscription demo iframe by title');
});

Then('the teaser view should be active', async function () {
  const active = await this.frame.evaluate(() => {
    const el = document.getElementById('view-teaser');
    return el && el.classList.contains('active');
  });
  assert.ok(active, 'expected #view-teaser to be active');
});

Then('the teaser view should still be active', async function () {
  const active = await this.frame.evaluate(() => {
    const el = document.getElementById('view-teaser');
    return el && el.classList.contains('active');
  });
  assert.ok(active, 'expected #view-teaser to still be active — the invalid email should not have advanced the flow');
});

When('I go to the email gate', async function () {
  await this.frame.locator('button:has-text("Get early access")').click();
});

When('I submit the email {string}', async function (email) {
  await this.frame.fill('#emailInput', email);
  await this.frame.locator('button:has-text("Subscribe & continue")').click();
});

Then('an error toast should be shown', async function () {
  const active = await this.frame.evaluate(() => {
    const el = document.getElementById('toast');
    return el && el.classList.contains('active');
  });
  assert.ok(active, 'expected #toast to have the active class');
});

Then('a toast should be shown', async function () {
  const active = await this.frame.evaluate(() => {
    const el = document.getElementById('toast');
    return el && el.classList.contains('active');
  });
  assert.ok(active, 'expected #toast to have the active class');
});

Then('the plans view should be active', async function () {
  const active = await this.frame.evaluate(() => {
    const el = document.getElementById('view-plans');
    return el && el.classList.contains('active');
  });
  assert.ok(active, 'expected #view-plans to be active');
});

When('I select the {string} plan', async function (plan) {
  await this.frame.locator(`[onclick="selectPlan('${plan}')"]`).click();
});

Then('the {string} plan should be marked selected', async function (plan) {
  const pressed = await this.frame.getAttribute(`[onclick="selectPlan('${plan}')"]`, 'aria-pressed');
  assert.strictEqual(pressed, 'true');
});

Then('the {string} plan should not be marked selected', async function (plan) {
  const pressed = await this.frame.getAttribute(`[onclick="selectPlan('${plan}')"]`, 'aria-pressed');
  assert.strictEqual(pressed, 'false');
});

When('I confirm the subscription', async function () {
  await this.frame.locator('button:has-text("Start subscription")').click();
});

Then('the library view should be active', async function () {
  const active = await this.frame.evaluate(() => {
    const el = document.getElementById('view-library');
    return el && el.classList.contains('active');
  });
  assert.ok(active, 'expected #view-library to be active');
});

Then('at least one course card should be visible', async function () {
  const count = await this.frame.locator('.course-card').count();
  assert.ok(count > 0, 'expected at least one .course-card after confirming subscription');
});
