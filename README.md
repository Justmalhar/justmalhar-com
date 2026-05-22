# justmalhar.com

Personal site and MDX blog for **Malhar Ujawane**. Minimal black-and-white design with light/dark mode, GitHub Flavored Markdown, and Mermaid diagrams.

Built with [Astro](https://astro.build).

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Portrait (home page)

Add a black-and-white photo at `public/images/portrait.jpg`. The site picks it up automatically; until then, a placeholder is shown.

## Publish a post

Add a file under `src/content/blog/`:

```mdx
---
title: Post title
description: Short summary for listings and SEO.
pubDate: 2026-05-23
section: essay
draft: false
tags:
  - tag
---

Your content here.
```

- `section`: `essay`, `note`, or `guide` (appears in nav section pages).
- Set `draft: true` to exclude from the site.
- Use `.md` or `.mdx`.
- Mermaid: fenced code block with language `mermaid`.
- GFM (tables, task lists, strikethrough, footnotes) is enabled via `remark-gfm`.

## Build

```bash
npm run build
npm run preview
```

## Deploy

Static output in `dist/`. Deploy to Vercel, Netlify, Cloudflare Pages, or any static host.

Set `site` in `astro.config.mjs` to your production URL for correct canonical URLs and RSS links.
