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
    document.querySelectorAll('main section, .page-toc').forEach((section) => section.remove());
    const address = document.createElement('p');
    address.className = 'preview-address';
    address.textContent = new URL(document.querySelector('link[rel="canonical"]').href).hostname;
    document.querySelector('.home-intro').append(address);
    const style = document.createElement('style');
    style.textContent =
      '.wrap{width:100%;padding:100px 90px}.page-grid{display:block}.home-intro{max-width:940px}.home-intro h1{font-size:56px;margin-bottom:36px}.home-intro p{font-size:27px;line-height:1.6}.preview-address{color:var(--muted);margin-top:60px}';
    document.head.append(style);
  });
  await mkdir('public', { recursive: true });
  await page.screenshot({ path: 'public/social-card.png', type: 'png' });
  console.log('Created public/social-card.png (1200 × 630).');
} finally {
  await browser.close();
}
