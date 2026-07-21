const { setWorldConstructor, Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

// The static HTML files (component-library.html, icon-library.html,
// ui-mockups.html) are self-contained and tested directly against the
// built /build output served locally — this is exactly what GitHub
// Pages serves, so a pass here is a real pass, not a proxy for one.
const BASE_URL = process.env.AFJ_TEST_BASE_URL || 'http://127.0.0.1:4173/afj-docs';

let browser;

BeforeAll(async function () {
  browser = await chromium.launch();
});

AfterAll(async function () {
  await browser.close();
});

class AfjWorld {
  constructor() {
    this.baseUrl = BASE_URL;
  }

  async openPage() {
    this.context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      permissions: ['clipboard-read', 'clipboard-write'],
    });
    this.page = await this.context.newPage();
    return this.page;
  }

  async closePage() {
    if (this.context) await this.context.close();
  }

  // The interactive commerce/class-booking demos live in <iframe srcdoc>
  // with no id or class on the iframe element itself — the only reliable
  // way to find the right one is by its own document <title>.
  async findFrameByTitle(exactTitle) {
    for (const frame of this.page.frames()) {
      if (frame === this.page.mainFrame()) continue;
      let t;
      try {
        t = await frame.title();
      } catch {
        continue;
      }
      if (t === exactTitle) return frame;
    }
    return null;
  }
}

setWorldConstructor(AfjWorld);

Before(async function () {
  await this.openPage();
});

After(async function () {
  await this.closePage();
});
