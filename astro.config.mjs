import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeCitation from 'rehype-citation';
import { unified } from '@astrojs/markdown-remark';

export default defineConfig({
  site: 'https://starryark.github.io',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/search/') })],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeKatex,
        [
          rehypeCitation,
          {
            bibliography: 'src/content/references.bib',
            linkCitations: true,
            showTooltips: true,
          },
        ],
      ],
    }),
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
  redirects: {
    '/posts': '/writing/',
    '/archives': '/writing/',
    '/categories': '/writing/',
    '/categories/how-to': '/writing/?topic=How-to',
    '/tags': '/writing/',
    '/tags/llm': '/writing/?q=LLM',
    '/tags/best-practices': '/writing/?q=Best-Practices',
    '/tags/tips': '/writing/?q=Tips',
  },
});
