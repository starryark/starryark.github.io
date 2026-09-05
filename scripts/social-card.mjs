// Render the site's own typography and SVG as a share image, with local fonts.
// Run after npm run build while npm run preview is available on port 4321.
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
  });
  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    document.querySelector('.site-header')?.remove();
    document.querySelector('.site-footer')?.remove();
    document
      .querySelectorAll('main section:not(.home-hero)')
      .forEach((section) => section.remove());
    document.querySelector('.hero-copy .text-link')?.remove();
    const style = document.createElement('style');
    style.textContent =
      '.wrap{padding-inline:65px}.home-hero{padding-block:60px;min-height:630px;grid-template-columns:1.3fr 1fr}.home-hero h1{font-size:76px}.hero-description{font-size:19px;max-width:430px}.eyebrow{font-size:12px}.hero-illustration{width:420px}.specimen-label{font-size:12px}.hero-copy .eyebrow{margin-bottom:28px}';
    document.head.append(style);
  });
  await mkdir('public', { recursive: true });
  await page.screenshot({ path: 'public/social-card.png', type: 'png' });
  console.log('Created public/social-card.png (1200 × 630).');
} finally {
  await browser.close();
}
