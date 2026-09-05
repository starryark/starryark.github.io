import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('research template renders MDX, math, figures, citations, and scholarly metadata', async ({
  page,
  request,
}) => {
  test.skip(!process.env.FIELDNOTES_RESEARCH_TEST, 'Run with npm run test:research');
  await page.goto('/posts/template-check/');
  await expect(page.locator('h1')).toHaveText('Research template verification');
  await expect(page.locator('.abstract')).toBeVisible();
  await expect(page.locator('.katex').first()).toBeVisible();
  await expect(page.locator('.katex-display')).toHaveCount(1);
  await expect(page.locator('#fig-check figcaption')).toContainText('Figure 1.');
  await expect(page.locator('.prose a[href="#fig-check"]')).toHaveText('Figure 1');
  await expect(page.locator('#refs')).toContainText('Lost in the Middle');
  await expect(page.locator('.prose a[href="#bib-liu2023lost"]')).toHaveCount(1);
  await expect(page.locator('table')).toContainText('Two');
  await expect(page.locator('[data-footnotes]')).toContainText('verification footnote');
  await expect(page.locator('meta[name=citation_author]')).toHaveCount(2);
  await expect(page.locator('meta[name=citation_doi]')).toHaveAttribute(
    'content',
    '10.0000/test-fixture',
  );
  await expect(page.locator('meta[name=citation_pdf_url]')).toHaveAttribute(
    'content',
    'https://example.org/paper.pdf',
  );
  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(schema['@type']).toBe('ScholarlyArticle');
  expect(schema.author[0].affiliation.name).toBe('Example Laboratory');
  await expect(page.locator('.artifact-links')).toContainText('PDF');
  await expect(page.locator('.artifact-links')).toContainText('Code');
  const math = await request.get('/math/katex.min.css');
  expect(math.ok()).toBe(true);
  const bib = await (await request.get('/citations/template-check.bib')).text();
  expect(bib).toContain('@article{template-check');
  expect(bib).toContain('Template Author and Second Author');
  for (const url of ['/search.json', '/feed.xml', '/sitemap-0.xml']) {
    const content = await (await request.get(url)).text();
    expect(content).not.toMatch(
      /DRAFT_SENTINEL|FUTURE_SENTINEL|template-draft-check|template-future-check/,
    );
  }
  expect((await request.get('/posts/template-draft-check/')).status()).toBe(404);
  expect((await request.get('/posts/template-future-check/')).status()).toBe(404);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
    true,
  );
  const audit = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(audit.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual(
    [],
  );
});
