# yusufsina.com

Personal website, portfolio and blog of Yusuf Sina Yildiz, built with Next.js (App Router) and Tailwind CSS and published as a fully static site.

You're welcome to use it as a starting point for your own site. See [Make it yours](#make-it-yours).

## Development

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static export to ./out
npm run preview   # serve ./out locally
```

## Make it yours

1. Click **Use this template** on GitHub (or fork / clone the repo).
2. Edit [`site.config.ts`](site.config.ts): name, bio, domain, social links, email and favicon colours. Every page reads from this file.
3. Put your photo in `public/images/` and point `avatar` in the config at it.
4. Delete the posts in `app/blog/posts/` and the projects in `app/work/projects/`, then add your own (format below). Remove the images under `public/images/` that belonged to them.
5. Set up deployment: see [DEPLOYMENT.md](DEPLOYMENT.md). Until the FTP secrets are set, the workflow only builds and skips the upload.

The favicon is generated at build time from the initials of `name` (`Ada Lovelace` → `AL`). Set `icon.text` in the config to use other letters.

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

Generated at build time from `site.config.ts`:

- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter card tags
- `/sitemap.xml`, `/robots.txt`
- `/rss.xml` blog feed
- `/icon.png` and `/apple-icon.png`

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md).

## License

The code is [MIT licensed](LICENSE). The content (blog posts, project write-ups, photos and other images) is not: it belongs to Yusuf Sina Yildiz and may not be reused. Replace it with your own if you build on this repo.
