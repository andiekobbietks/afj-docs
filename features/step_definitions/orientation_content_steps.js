const { When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Then('that section should contain zero actual table elements', async function () {
  const id = this.lastScrolledSectionId;
  const count = await this.page.evaluate((sid) => {
    const section = document.getElementById(sid);
    return section ? section.querySelectorAll('table').length : 0;
  }, id);
  assert.strictEqual(count, 0, `expected #${id} to have zero <table> elements, matching the current known gap between the prose claim and the actual markup`);
});

Then('the text in that section should mention {string}', async function (text) {
  const id = this.lastScrolledSectionId;
  const found = await this.page.evaluate(([sid, t]) => {
    const section = document.getElementById(sid);
    return section ? section.textContent.includes(t) : false;
  }, [id, text]);
  assert.ok(found, `expected #${id} to mention "${text}"`);
});

Then('that section should contain at least {int} glossary entries', async function (min) {
  const id = this.lastScrolledSectionId;
  const count = await this.page.evaluate((sid) => {
    const section = document.getElementById(sid);
    return section ? section.querySelectorAll('.gloss-entry').length : 0;
  }, id);
  assert.ok(count >= min, `expected at least ${min} .gloss-entry elements, got ${count}`);
});

Then('every glossary entry should have both a term and a definition', async function () {
  const problems = await this.page.evaluate(() => {
    const bad = [];
    document.querySelectorAll('.gloss-entry').forEach((entry) => {
      const dt = entry.querySelector('dt');
      const dd = entry.querySelector('dd');
      if (!dt || !dt.textContent.trim() || !dd || !dd.textContent.trim()) {
        bad.push(entry.textContent.slice(0, 40));
      }
    });
    return bad;
  });
  assert.deepStrictEqual(problems, [], `found glossary entries missing a term or definition: ${problems.join(' | ')}`);
});

Then('the glossary should define the term {string}', async function (term) {
  const found = await this.page.evaluate((t) => {
    return Array.from(document.querySelectorAll('.gloss-entry dt')).some((dt) => dt.textContent.includes(t));
  }, term);
  assert.ok(found, `expected the glossary to define a term containing "${term}"`);
});
