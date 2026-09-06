# Fieldnotes

Yangyi Liu's personal website, built with Astro. A text-first layout based on [Forrest Sheldon's site](https://forrestsheldon.github.io/), with Source Sans Pro, a white background, simple navigation, and a research-ready writing layout.

**Live:** https://starryark.github.io

## Run locally

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4321. `npm run build` generates `dist/`; `npm run preview` serves that production build. In agent environments Astro may run the server in the background; `npx astro dev stop` and `npx astro preview stop` stop those servers.

## Write

```sh
npm run new:post -- "An idea worth exploring"
npm run new:post -- "A research question" --research
```

Posts live in `src/content/writing/`. New posts start with `draft: true` and are omitted from all published routes, feeds, indexes, and search. Change to `draft: false` when ready. Future-dated posts stay excluded until a build on or after their date; there is no automatic scheduled build. Drafts are source files, not private storage: files committed to this public repository are readable on GitHub.

Use `npm run dev` to preview published content. To inspect a draft's full rendered layout locally, temporarily change `draft: false` and use today's date, then restore it before committing. Original drafts are preserved separately in `drafts/legacy/` and never built.

The filename becomes the permanent `/posts/<filename>/` URL. A post needs a title, description, and date. The kind can be `Essay`, `How-to`, `Research`, or `Note`.

### Research articles

Start with `templates/research.mdx`. Supported front matter includes multiple authors, affiliations, ORCID URLs, abstract, status, venue, DOI, arXiv ID, PDF URL, artifact links, license, and version. Scholarly metadata is emitted only for `kind: Research`.

- **Citations:** add BibTeX entries to `src/content/references.bib`, then write `[@liu2023lost]` or another real citation key. Add a `## References` heading at the end; a linked bibliography is generated below it. The included example reference is verified against [arXiv](https://arxiv.org/abs/2307.03172).
- **Math:** use `$inline$` or `$$display$$` expressions and set `math: true` to load the local KaTeX stylesheet. Math renders at build time.
- **Figures:** import `Figure.astro` as demonstrated in the template. Provide alt text, caption, number, dimensions, and a stable ID. Link to figures with `[Figure 1](#fig-overview)`. Numbering is explicit.
- **Tables / footnotes / code:** standard Markdown, with syntax highlighting and code-copy controls. HTML tables can add captions and scoped headers for complex comparisons.
- **Citation export:** every article offers copy/download BibTeX.
- **PDF:** “Print / Save PDF” uses the browser's print dialog and dedicated print styles. Link a formal manuscript using `pdf:` when available.

Keep analysis environments, model weights, and large datasets in their own repositories. Put finished figures under `public/figures/`.

## Customize the template

| Change                                                   | File                         |
| -------------------------------------------------------- | ---------------------------- |
| Name, description, email, social links                   | `src/site.ts`                |
| Domain and legacy redirects                              | `astro.config.mjs`           |
| Robots sitemap URL                                       | `public/robots.txt`          |
| Colors, typography, spacing, responsive and print styles | `src/styles/global.css`      |
| Header, footer, shared metadata                          | `src/layouts/Base.astro`     |
| Homepage                                                 | `src/pages/index.astro`      |
| Biography                                                | `src/content/pages/about.md` |
| About layout and section navigation                      | `src/pages/about.astro`      |
| Content metadata schema                                  | `src/content.config.ts`      |

When reusing the code, replace the personal writing, profile artwork, author defaults, and homepage biography as well as site settings. The MIT license covers code, not personal content or third-party marks.

The 1200×630 social preview is generated from the actual homepage. After visual changes, run `npm run build`, `npm run preview`, then `npm run social-card`; commit `public/social-card.png` and rebuild.

## Verify and deploy

```sh
npx playwright install chromium
npm run verify
npm run test:research
```

Browser tests cover desktop/mobile layouts, WCAG A/AA axe checks, navigation, full-text search, dark mode, article tools, print styles, legacy redirects, local links, metadata, and draft exclusion. The research check builds a temporary article to exercise math, MDX figures, citations, author metadata, and draft filtering, then removes it and rebuilds production. No sample research is published as the author's work.

GitHub Pages uses **GitHub Actions** as its publishing source. The workflow checks types, research rendering, and browser behavior before uploading and deploying `dist/` on pushes to `main`. Pull requests run checks without deploying.

The original Chirpy history is preserved, with the old site marked by an archive tag. `public/sw.js` is a retirement worker for old cached installations, not a new offline app.

See [design research and migration decisions](docs/design-research.md) for the reference site, framework choice, and content provenance.
