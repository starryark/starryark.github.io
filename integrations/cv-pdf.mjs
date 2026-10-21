// Renders /cv/ with its print stylesheet to cv.pdf, so the download is the same one-page
// résumé in every browser, without browser headers or footers. The build writes
// dist/cv.pdf from the built pages; the dev server renders /cv.pdf on request.
import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const types = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

async function render(url, setup) {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await setup?.(page);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });
    await page.evaluate(() => document.fonts.ready);
    return await page.pdf({ preferCSSPageSize: true, tagged: true });
  } finally {
    await browser.close();
  }
}

// Serves the built site from `root` to the browser, with no network access.
function serveFrom(root, origin) {
  return (page) =>
    page.route('**/*', async (route) => {
      const url = new URL(route.request().url());
      if (url.origin !== origin) return route.abort();
      const path = url.pathname.endsWith('/') ? `${url.pathname}index.html` : url.pathname;
      try {
        const body = await readFile(join(root, decodeURIComponent(path)));
        await route.fulfill({
          body,
          contentType: types[extname(path)] ?? 'application/octet-stream',
        });
      } catch {
        await route.fulfill({ status: 404 });
      }
    });
}

export default function cvPdf() {
  return {
    name: 'cv-pdf',
    hooks: {
      'astro:server:setup': ({ server, logger }) => {
        server.middlewares.use(async (req, res, next) => {
          if (req.url?.split('?')[0] !== '/cv.pdf') return next();
          try {
            const pdf = await render(`http://${req.headers.host}/cv/`);
            res.setHeader('Content-Type', 'application/pdf');
            res.end(pdf);
          } catch (error) {
            logger.error(`Could not render cv.pdf: ${error.message}`);
            next(error);
          }
        });
      },
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const origin = 'http://cv.local';
        await writeFile(
          join(root, 'cv.pdf'),
          await render(`${origin}/cv/`, serveFrom(root, origin)),
        );
        logger.info('Created cv.pdf');
      },
    },
  };
}
