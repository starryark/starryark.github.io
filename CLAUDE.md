# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal blog (`starryark.github.io`) built with Jekyll and the **Chirpy** theme, generated from the `chirpy-starter` template. The theme is consumed as the RubyGem `jekyll-theme-chirpy` (`~> 7.5`) — its `_layouts`, `_includes`, and `_sass` do **not** live in this repo. To inspect or understand theme internals, read the gem source at `/usr/local/rvm/gems/default/gems/jekyll-theme-chirpy-7.5.0`. This repo only contains the files the gem cannot supply: `_config.yml`, `_plugins/`, `_tabs/`, `_data/`, `index.html`, posts, and assets.

## Commands

- `bash tools/run.sh` — local dev server with livereload (binds `127.0.0.1`; auto-adds `--force_polling` inside Docker). `-p` for production mode, `-H <host>` to change bind host.
- `bash tools/test.sh` — clean, production build into `_site/`, then run `htmlproofer` (broken-link check, external URLs disabled). Run this before pushing.
- `bundle exec jekyll b` / `bundle exec jekyll s` — raw build / serve.
- `bundle install` — install dependencies after editing the `Gemfile`.

There is no single-test runner; `htmlproofer` in `tools/test.sh` validates the whole built site at once.

## Architecture notes

- **`_plugins/posts-lastmod-hook.rb`** shells out to `git log` / `git rev-list` to set each post's `last_modified_at`. It only works with full git history — CI checks out with `fetch-depth: 0` for this reason. Shallow clones will silently skip last-modified dates.
- **Deployment** is fully automated via `.github/workflows/pages-deploy.yml`: every push to `main`/`master` builds and deploys to GitHub Pages. There is no manual deploy step. The workflow ignores changes to `.gitignore`, `README.md`, and `LICENSE` for triggering.
- **`assets/lib`** is a git submodule ([chirpy-static-assets](https://github.com/cotes2020/chirpy-static-assets)) for optionally self-hosting third-party assets. The CI workflow does **not** fetch submodules by default (the `submodules: true` line is commented out); enabling self-hosted assets requires uncommenting it.
- **`_site/`** is generated build output and is gitignored — never edit it directly.

## Conventions

- **New posts:** add to `_posts/` as `YYYY-MM-DD-title.md`. Front matter needs at least `title`, `date`, `categories`, `tags`; `layout: post` and `comments`/`toc` are applied automatically via `defaults` in `_config.yml`. Post permalinks are fixed at `/posts/:title/` — do not change this without updating every internal link.
- **`_drafts/`** posts have comments disabled by default.
- **Navigation tabs** live in `_tabs/` as a Jekyll collection (`layout: page`, sorted by an `order` front-matter field).
- **Site-wide settings** go in `_config.yml`; social/contact data in `_data/contact.yml` and `_data/share.yml`.

Note: `_config.yml` still holds chirpy-starter placeholder values (`title: Chirpy`, `github_username`, `your_full_name`, etc.). These should be customized for the real site.

## Other AI guidance

`GEMINI.md` (gitignored) covers the same project context for Gemini. If you make structural or workflow changes here, keep `GEMINI.md` consistent.
