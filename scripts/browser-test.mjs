import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function run() {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage();

  page.on('pageerror', (err) => console.error('Page error:', err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.error('Console error:', msg.text());
  });

  const fileUrl = `file:///${path.join(root, 'public', 'test.html').replace(/\\/g, '/')}`;
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  await page.waitForSelector('#test-summary', { timeout: 5000 }).catch(async () => {
    const body = await page.content();
    console.error('Page HTML:', body.slice(0, 2000));
    throw new Error('test-summary not found — check script loading');
  });

  const summary = await page.locator('#test-summary').textContent();
  const failed = await page.locator('li.fail').count();
  const failures = failed > 0 ? await page.locator('li.fail').allTextContents() : [];

  await browser.close();

  if (failed > 0 || !summary.startsWith('5/5')) {
    console.error('Browser test failed:', summary);
    failures.forEach((f) => console.error(' ', f));
    process.exit(1);
  }

  console.log('Browser test passed:', summary);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
