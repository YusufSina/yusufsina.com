# yusufsina.com

Personal website, portfolio and blog of Yusuf Sina Yildiz, built with Next.js (App Router) and Tailwind CSS and published as a fully static site.

## Development

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static export to ./out
npm run preview   # serve ./out locally
```

## Content

- **Blog posts:** add a Markdown file to `app/blog/posts/`.
- **Projects:** add a Markdown file to `app/work/projects/`.
- **Images:** put them in `public/images/` and reference them as `/images/...`.

Each file starts with front matter:

```yaml
---
id: 3
title: "Post title"
date: "January 2, 2026"   # any format JavaScript's Date can parse
excerpt: "One or two sentences. Used on list pages, in search results, link previews and RSS."
slug: "post-title"         # optional, defaults to the file name
link: "example.com"        # projects only, optional
---
```

The first image in a project or post is used as its social preview image.

## SEO and feeds

Generated at build time:

- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter card tags
- `/sitemap.xml`, `/robots.txt`
- `/rss.xml` blog feed

Site-wide values (URL, name, description, X handle) live in `lib/site.ts`.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md).
