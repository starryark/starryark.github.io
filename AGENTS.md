# Fieldnotes

This is a custom Astro 7 static site, with no theme dependency. Node 24 is the supported runtime.

- Site identity and social links: `src/site.ts`.
- Design tokens and layouts: `src/styles/global.css`, `src/layouts/Base.astro`.
- Published content: `src/content/writing/*.{md,mdx}`. Preserve `/posts/<filename>/` URLs.
- Research metadata is validated in `src/content.config.ts`. Only Research articles emit scholarly metadata.
- Drafts and future-dated writing never enter generated routes, feeds, search, or listings. `drafts/legacy/` is source-only storage.
- Bibliography: `src/content/references.bib`. Use `[@key]` citations in Markdown/MDX.
- The about page preserves the author's own prose. Do not replace it with invented biography, projects, or research results.
- Keep scientific computation and large datasets in separate repositories; import final figures here.
- Run `npm run verify` for site changes. Run `npm run test:research` when changing research templates, Markdown processing, content schemas, or article rendering.
- `npm run build` creates math assets from the locked KaTeX dependency. Never edit generated `dist/`, `.astro/`, or `public/math/`.
- GitHub Actions tests the build before deployment. A push to `main` publishes the site.
- Keep the Chirpy retirement worker at `public/sw.js` until old installations have had time to update.
