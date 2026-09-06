import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const article = '/posts/useful-llm-best-practices/';

test('main pages load, fit the viewport, and pass accessibility checks', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const path of ['/', '/writing/', '/about/', '/search/', article, '/404.html']) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      `Overflow at ${path}`,
    ).toBe(true);
    const audit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      audit.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
      path,
    ).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test('navigation, writing search, filters, and empty state work', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Writing', exact: true }).click();
  await expect(page).toHaveURL(/\/writing\//);
  await page.getByRole('searchbox', { name: 'Search writing' }).fill('context');
  await expect(page.locator('.writing-row:visible')).toHaveCount(1);
  await page.getByRole('searchbox', { name: 'Search writing' }).fill('no-such-article-xyz');
  await expect(page.locator('#writing-empty')).toBeVisible();
  await page.getByRole('searchbox', { name: 'Search writing' }).fill('');
  await page.getByRole('button', { name: 'How-to', exact: true }).click();
  await expect(page.getByRole('button', { name: 'How-to', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByRole('link', { name: 'LLM best practices' }).click();
  await expect(page).toHaveURL(new RegExp(article));
  await expect(page.locator('.prose')).toContainText('Don’t reinvent the wheel');
});

test('full-text search supports body matches, query URLs, and empty results', async ({ page }) => {
  await page.goto('/search/?q=memorization');
  await expect(page.locator('.search-result')).toHaveCount(1);
  await expect(page.locator('.search-result')).toContainText('About Yangyi Liu');
  await page.getByRole('searchbox', { name: 'Search the site' }).fill('quote-grounding');
  await expect(page.locator('.search-result')).toHaveCount(1);
  await expect(page.locator('.search-result')).toContainText('LLM best practices');
  await page
    .getByRole('searchbox', { name: 'Search the site' })
    .fill('<img src=x onerror=alert(1)>');
  await expect(page.locator('#search-status')).toContainText('No results');
  await expect(page.locator('#search-results img')).toHaveCount(0);
});

test('dark theme persists and remains accessible', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  for (const path of ['/', article]) {
    await page.goto(path);
    const audit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      audit.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
    ).toEqual([]);
  }
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('article navigation, copy controls, citation download, and print layout work', async ({
  page,
  context,
}, testInfo) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto(article);
  if (testInfo.project.name === 'mobile') await page.locator('.mobile-toc summary').click();
  const nav =
    testInfo.project.name === 'mobile' ? page.locator('.mobile-toc') : page.locator('.article-toc');
  await nav.getByRole('link', { name: '2. Model Context', exact: true }).click();
  await expect(page).toHaveURL(/#2-model-context/);
  await page.getByRole('button', { name: 'Copy code', exact: true }).first().click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('Search in depth');
  await page.locator('.citation-box summary').click();
  await page.getByRole('button', { name: 'Copy BibTeX' }).click();
  await expect(page.locator('#citation-status')).toHaveText('BibTeX copied.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    '@misc{useful-llm-best-practices',
  );
  const response = await page.request.get('/citations/useful-llm-best-practices.bib');
  expect(await response.text()).toContain('author = {Yangyi Liu}');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.site-header')).toBeHidden();
  await expect(page.locator('.site-footer')).toBeHidden();
  await expect(page.locator('h1')).toBeVisible();
});

test('legacy addresses, metadata, feed, and draft exclusion are preserved', async ({
  page,
  request,
}) => {
  await page.goto('/posts/');
  await expect(page).toHaveURL(/\/writing\//);
  await page.goto('/tags/llm/');
  await expect(page).toHaveURL(/\/writing\/\?q=LLM/);
  await page.goto(article);
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
    'href',
    'https://starryark.github.io' + article,
  );
  const data = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(data['@type']).toBe('BlogPosting');
  await expect(page.locator('meta[name=citation_title]')).toHaveCount(0);
  const feed = await (await request.get('/feed.xml')).text();
  expect(feed).toContain('useful-llm-best-practices');
  const search = await (await request.get('/search.json')).text();
  const sitemap = await (await request.get('/sitemap-0.xml')).text();
  for (const hiddenTitle of [
    'practical-paradigm',
    'ascii-art-crt-demo',
    '2026-05-22-check',
    'your-research-title',
  ]) {
    expect(feed + search + sitemap).not.toContain(hiddenTitle);
  }
  expect((await request.get('/social-card.png')).status()).toBe(200);
});

test('all generated local links, images, scripts, styles, and anchors resolve', async ({
  page,
  request,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop');
  const files: string[] = [];
  async function walk(dir: string) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) await walk(path);
      else if (entry.name.endsWith('.html')) files.push(path);
    }
  }
  await walk('dist');
  const checked = new Set<string>();
  const failures: string[] = [];
  for (const file of files) {
    const html = await readFile(file, 'utf8');
    if (html.includes('http-equiv="refresh"')) continue;
    const path =
      '/' +
      file
        .replace(/^dist[\\/]/, '')
        .replaceAll('\\', '/')
        .replace(/index\.html$/, '');
    await page.goto(path);
    const targets = await page
      .locator('[href], [src]')
      .evaluateAll((elements) =>
        elements
          .map((element) => element.getAttribute('href') || element.getAttribute('src') || '')
          .filter(Boolean),
      );
    for (const target of targets) {
      const url = new URL(target, 'http://127.0.0.1:4322' + path);
      if (url.origin !== 'http://127.0.0.1:4322' || checked.has(url.href)) continue;
      checked.add(url.href);
      const response = await request.get(url.href);
      if (!response.ok()) failures.push(`${path} → ${target} (${response.status()})`);
      if (url.hash && url.pathname === path) {
        if (
          !(await page.evaluate(
            (id) => !!document.getElementById(id),
            decodeURIComponent(url.hash.slice(1)),
          ))
        )
          failures.push(`${path} missing ${url.hash}`);
      }
    }
  }
  expect(failures).toEqual([]);
});

test('essential content and navigation remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/');
  await page.getByRole('link', { name: 'Writing', exact: true }).click();
  await expect(page.locator('.writing-row')).toBeVisible();
  await page.getByRole('link', { name: 'LLM best practices' }).click();
  await expect(page.locator('.prose')).toContainText('Model Context');
  await context.close();
});

test('legacy PWA retirement clears Chirpy caches and leaves other caches alone', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(async () => {
    await caches.open('chirpy-migration-test');
    await caches.open('other-project-test');
  });
  await page.reload();
  await expect.poll(() => page.evaluate(() => caches.keys())).toEqual(['other-project-test']);
  await page.evaluate(async () => {
    await navigator.serviceWorker.register('/sw.min.js');
  });
  await expect
    .poll(() =>
      page.evaluate(async () => (await navigator.serviceWorker.getRegistrations()).length),
    )
    .toBe(0);
  await expect(page.locator('h1')).toHaveText('Yangyi Liu');
  expect(await page.evaluate(() => caches.keys())).toEqual(['other-project-test']);
});
