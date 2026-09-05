# Design research and decisions

Research and implementation: September 5, 2026. The supplied `deep-research-report.md` established the migration inventory and scholarly publishing requirements. The user's direction to create a new template supersedes the report's recommendation to extend Chirpy.

## References inspected

| Primary reference                                                                                                                             | Observation                                                                                         | Application here                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [Anthropic research](https://www.anthropic.com/research)                                                                                      | Editorial hierarchy, structured publication listings, restrained navigation                         | Large serif introductions, thin rules, metadata columns, compact header, searchable archive                                        |
| [Alignment Science Blog](https://alignment.anthropic.com/)                                                                                    | The article leads and global navigation recedes                                                     | Author/date metadata, a narrow reading column, and section navigation                                                              |
| [An Alignment Science research article](https://alignment.anthropic.com/2026/automated-alignment-researchers/)                                | Title, authors, TL;DR, figures, numbered sections, references                                       | Research front matter, abstract, artifact links, captioned figures, math, linked citations, bibliography                           |
| [Forrest Sheldon's repository](https://github.com/forrestsheldon/forrestsheldon.github.io) — `index.qmd`, `_quarto.yml`, `styles.css`, README | Personal research notebook, 900px maximum column, communication separate from analysis environments | Personal homepage, writing and about; readable articles; exported scientific figures; unpublished drafts                           |
| [Astro content collections](https://docs.astro.build/en/guides/content-collections/)                                                          | Build-time content with validated metadata and static routes                                        | Typed content and one published-content query shared by routes, search, and feeds                                                  |
| [Astro Pages deployment](https://docs.astro.build/en/guides/deploy/github/)                                                                   | Static output deployable through Actions                                                            | Build and browser checks precede deployment                                                                                        |
| [rehype-citation](https://github.com/timlrx/rehype-citation)                                                                                  | Pandoc-style citations and BibTeX bibliographies                                                    | Build-time rendering without a browser citation runtime                                                                            |
| [Google Scholar guidelines](https://scholar.google.com/intl/en/scholar/inclusion.html)                                                        | Bibliographic fields distinguish research papers                                                    | Citation title, individual authors, date, optional DOI/PDF/venue. Essays use BlogPosting metadata. Tags do not guarantee indexing. |

## Architecture

This original Astro implementation was initialized in an independent Git repository before development. It uses no Chirpy, Bootstrap, academic theme, or downloaded site template. Astro fits the custom presentation while keeping hosting static and writing in Markdown/MDX. Content and navigation are HTML; small scripts add search, filtering, theme preference, and copy controls.

Quarto is stronger for executing notebooks and producing LaTeX PDFs. This template supports browser print/save-to-PDF and optional links to independently produced PDFs. Figure numbering is explicit, with stable IDs and Markdown cross-reference links. It does not claim Quarto's automatic numbering or notebook execution.

## Visual system

- Warm ivory `#f5f3eb`, charcoal `#292923`, terracotta `#a64f36`, pale peach `#e9c9b6`.
- Self-hosted Newsreader for headings and prose; DM Sans for labels and metadata.
- 1280px outer container including gutters; 740px article body beside a small TOC.
- Custom SVG crow and fine orbital lines connect interests in living systems and crows. The article thumbnail is a decorative context-position sketch, not measured data.
- Thin dividers, typography, and whitespace supply structure.
- Dark palette, keyboard focus, reduced-motion support, persistent mobile navigation, and print styles.

References informed hierarchy and reading priorities. Their logos, proprietary fonts, code, and illustrations were not copied.

## Content migration

The June 1 article retains `/posts/useful-llm-best-practices/`. Its title is displayed as “LLM best practices”; body, date, description, and tags are preserved. Complete About prose and the previous homepage's longer reflections are on About. Contact wording now refers to the new links. The old homepage's conflicting 2023–2025 education range was not repeated; the author-written Class of '26 statement is used.

Four original drafts are retained verbatim in `drafts/legacy/`, outside the publishing collection. Profile artwork and emblems remain at their existing asset paths. Archives, categories, and tags redirect to Writing. `/feed.xml` and `/llms.txt` are generated from current published content.

`public/sw.min.js` preserves the exact legacy worker URL and loads `public/sw.js` to retire the old Chirpy PWA. Deployment preserves Git history under `chirpy-archive-2026-09-05` without a force push. After successful deployment, the previous local checkout was archived as `chirpy-archive-2026-09-05/`, and the replacement was moved into the active `starryark.github.io/` directory. A verified `chirpy-backup-2026-09-05.bundle` also preserves the original Git history.
