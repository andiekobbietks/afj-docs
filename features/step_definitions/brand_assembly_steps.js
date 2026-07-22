const { Then } = require('@cucumber/cucumber');
const assert = require('assert');

Then('every image in that section should have alt text longer than {int} characters', async function (min) {
  const id = this.lastScrolledSectionId;
  const problems = await this.page.evaluate(([sid, m]) => {
    const section = document.getElementById(sid);
    const bad = [];
    section.querySelectorAll('img').forEach((img) => {
      const alt = img.getAttribute('alt') || '';
      if (alt.length <= m) bad.push(img.getAttribute('src'));
    });
    return bad;
  }, [id, min]);
  assert.deepStrictEqual(problems, [], `found images with alt text <= ${min} chars: ${problems.join(', ')}`);
});

Then('that section should contain at least {int} assembly chips', async function (min) {
  const id = this.lastScrolledSectionId;
  const count = await this.page.evaluate((sid) => {
    const section = document.getElementById(sid);
    return section ? section.querySelectorAll('.demo-assembly-chip').length : 0;
  }, id);
  assert.ok(count >= min, `expected at least ${min} .demo-assembly-chip elements, got ${count}`);
});

Then('that section should contain at least {int} Gherkin feature blocks', async function (min) {
  const id = this.lastScrolledSectionId;
  const count = await this.page.evaluate((sid) => {
    const section = document.getElementById(sid);
    if (!section) return 0;
    return Array.from(section.querySelectorAll('.code-pane')).filter((p) => p.textContent.includes('Feature:')).length;
  }, id);
  assert.ok(count >= min, `expected at least ${min} Gherkin "Feature:" blocks, got ${count}`);
});

Then('the Gherkin blocks should mention {string}', async function (text) {
  const id = this.lastScrolledSectionId;
  const found = await this.page.evaluate(([sid, t]) => {
    const section = document.getElementById(sid);
    if (!section) return false;
    return Array.from(section.querySelectorAll('.code-pane')).some((p) => p.textContent.includes(t));
  }, [id, text]);
  assert.ok(found, `expected a Gherkin block in #${id} to mention "${text}"`);
});
