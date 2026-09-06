# Design research and decisions

Updated September 6, 2026. The current design follows Forrest Sheldon’s personal research site. It replaces the earlier ivory-and-terracotta design, oversized serif introductions, decorative illustrations, and promotional copy.

## Reference

Inspected the [repository](https://github.com/forrestsheldon/forrestsheldon.github.io), its `index.qmd`, `about.qmd`, `posts.qmd`, `_quarto.yml`, and `styles.css`, and the live homepage and writing list in a desktop browser.

The reference uses Quarto’s Cosmo theme: Source Sans Pro at 17px, a white page, a pale gray navigation bar, ordinary blue links, modest headings with thin section rules, a reading column around 900px, and section navigation on the right. The implementation here uses those proportions and conventions within the existing Astro site. It does not reproduce Forrest Sheldon’s biography, research projects, or writing.

## Presentation

- Self-hosted Source Sans Pro for navigation, headings, and body text.
- White background, charcoal text, and blue links; darker blue than the reference for accessible contrast.
- 1134px page container: an 894px content column, a 26px gap, and 214px for section navigation.
- Homepage with the author’s name, an introduction grounded in the original site, recent published writing, personal interests, and contact links.
- Text-only article listings, restrained article metadata, and a small copyright/RSS footer.
- Visible mobile navigation, collapsible article contents on smaller screens, saved dark-mode preferences, keyboard focus, and print styles.
- Original profile artwork and favicon restored from the Chirpy assets. The social preview is generated from the new homepage typography and introduction.

## Content provenance

The original source is the adjacent `chirpy-archive-2026-09-05` checkout. Its `_tabs/about.md`, `index.md`, `_posts/2026-06-01-useful-llm-best-practices.md`, `_config.yml`, `_data/contact.yml`, and image assets were checked during reconstruction.

The existing `src/content/pages/about.md` already preserves the original About prose and the longer homepage reflections. It remains unchanged. The current article body also remains unchanged, retaining `/posts/useful-llm-best-practices/`. Employment and education details in the introduction come from the original timeline and author-written biography. The biography’s Class of ’26 date takes precedence over the old timeline’s conflicting education range.

Original profile artwork and emblems remain at their existing asset paths. The original small ICO and PNG favicon files replace the decorative star. Drafts remain in `drafts/legacy/`, outside the publishing collection.

## Architecture and publishing

Astro 7 and Node 24 remain the supported stack. The site has no theme dependency. Shared metadata, Markdown/MDX, bibliography processing, KaTeX, research schemas, citation exports, feeds, search, legacy redirects, and draft/future-date exclusion are preserved.

Scientific computation stays in separate repositories, with final figures imported here. Browser print/save-to-PDF and optional manuscript links remain available. The site does not execute research notebooks.

`public/sw.min.js` loads `public/sw.js` to retire old Chirpy installations. GitHub Actions validates the site before publishing on pushes to `main`.
