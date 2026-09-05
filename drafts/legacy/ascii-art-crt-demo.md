---
title: ASCII Art with CRT Aesthetics
date: 2026-05-22 12:00:00 -0700
categories: [Demos, Styling]
tags: [ascii, css, chirpy]
---

The block below uses a plain Markdown fenced code block. The
`{: .ascii-art-crt }` line directly underneath is Kramdown's
*block-attribute* syntax — it attaches the CSS class to the rendered
code wrapper without any inline HTML.

```
   ▄▄▄·  ▐ ▄ .▄▄ ·    ▪  ▄▄▄▄·  ▄▄▌  ▄▄▄ .
  ▐█ ▀█ •█▌▐█▐█ ▀.    ██ ▐█ ▀█▪ ██•  ▀▄.▀·
  ▄█▀▀█ ▐█▐▐▌▄▀▀▀█▄   ▐█·▐█▀▀█▄ ██▪  ▐▀▀▪▄
  ▐█ ▪▐▌██▐█▌▐█▄▪▐█   ▐█▌██▄▪▐█ ▐█▌▐▌▐█▄▄▌
   ▀  ▀ ▀▀ █▪ ▀▀▀▀    ▀▀▀·▀▀▀▀  .▀▀▀  ▀▀▀

  ╔══════════════════════════════════════╗
  ║  CRT MODE :: PHOSPHOR ONLINE         ║
  ║  signal ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░  92%     ║
  ╚══════════════════════════════════════╝
```
{: .ascii-art-crt .nolineno }

## How it works

The wrapper that Rouge generates around the fence (a `figure.highlight`
or `div.highlighter-rouge`, depending on your Chirpy/Rouge version)
receives the `ascii-art-crt` class. The SCSS rules in
`assets/css/jekyll-theme-chirpy.scss` reach inward to `pre` and `code`,
override Chirpy's `line-height` with `!important` (the one declaration
that needs it), and hard-pin the green-on-black palette so the block
looks identical in Light and Dark modes.

## A wider example (horizontal scroll)

```
████████████████████  LONG LINES SCROLL HORIZONTALLY ██████████████████████████████████████████████
░░░░░░░░░░░░░░░░░░░░  WITHOUT WRAPPING SO ASCII ART  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  KEEPS ITS INTENDED GEOMETRY    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
```
{: .ascii-art-crt .nolineno }
