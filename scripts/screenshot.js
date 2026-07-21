// Captures reference screenshots of the static HTML docs for the README.
// Long, scrollable pages get sliced into numbered parts (each collapsible
// on its own in the README) instead of one enormous full-page image.
// Short pages stay as a single shot.
//
// Run from the repo root: node scripts/screenshot.js

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const targets = [
  { file: 'component-library.html', slug: 'component-library', width: 1280, sliceHeight: 1400 },
  { file: 'ui-mockups.html', slug: 'ui-mockups', width: 1280, sliceHeight: 1400 },
  { file: 'icon-library.html', slug: 'icon-library', width: 1280, sliceHeight: 0 }, // 0 = single full-page shot
];

async function main() {
  const browser = await chromium.launch();
  const manifest = {};

  for (const t of targets) {
    console.log(`Capturing ${t.file}...`);
    const page = await browser.newPage({ viewport: { width: t.width, height: 900 } });
    const filePath = 'file://' + path.resolve('static', t.file);

    // 'load' rather than 'networkidle' — a page with any repeating timer
    // or polling fetch can keep 'networkidle' from ever resolving and
    // time out the whole job.
    await page.goto(filePath, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(800); // let webfonts finish swapping in

    if (t.sliceHeight === 0) {
      await page.screenshot({ path: `static/screenshots/${t.slug}.png`, fullPage: true });
      manifest[t.slug] = 1;
      console.log(`  -> ${t.slug}.png (single shot)`);
    } else {
      const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      if (!fullHeight || Number.isNaN(fullHeight)) {
        throw new Error(`Could not read a valid scrollHeight for ${t.file} (got ${fullHeight})`);
      }
      const parts = Math.max(1, Math.ceil(fullHeight / t.sliceHeight));
      for (let i = 0; i < parts; i++) {
        const clipHeight = Math.min(t.sliceHeight, fullHeight - i * t.sliceHeight);
        await page.screenshot({
          path: `static/screenshots/${t.slug}-${i + 1}.png`,
          fullPage: true,
          clip: { x: 0, y: i * t.sliceHeight, width: t.width, height: clipHeight },
        });
      }
      manifest[t.slug] = parts;
      console.log(`  -> ${t.slug}-1.png .. ${t.slug}-${parts}.png (height ${fullHeight}px)`);
    }
    await page.close();
  }

  await browser.close();
  fs.writeFileSync('static/screenshots/manifest.json', JSON.stringify(manifest, null, 2));
  console.log('Done. Manifest:', manifest);
}

main().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
