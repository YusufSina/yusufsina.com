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

### With Claude Code

The repo ships with [Claude Code](https://claude.com/claude-code) skills in `.claude/skills/`. Clone your copy, open Claude Code in it and ask:

- **"Set up this site for me"** (`setup-site`): asks for your name, bio, photo, links, domain and hosting, fills in `site.config.ts`, removes the original content, and checks the build.
- **"Write a new blog post about …"** (`new-post`): creates the Markdown file with the right front matter and images.
- **"Add my project … to the Work page"** (`new-project`): writes a project case study with its tags and cover image.

### By hand

1. Click **Use this template** on GitHub (or fork / clone the repo).
2. Edit [`site.config.ts`](site.config.ts): name, bio, domain, social links, email and favicon colours. Every page reads from this file.
3. Put your photo in `public/images/` and point `avatar` in the config at it.
4. Delete the posts in `app/blog/posts/` and the projects in `app/work/projects/`, then add your own (format below). Remove the images under `public/images/` that belonged to them.
5. Set up deployment: see [DEPLOYMENT.md](DEPLOYMENT.md). Until the FTP secrets are set, the workflow only builds and skips the upload.

The favicon is generated at build time from the initials of `name` (`Ada Lovelace` → `AL`). Set `icon.text` in the config to use other letters. The "Source" button in the bottom-right corner of the home page links to `sourceUrl`; point it at your repo or set it to `""` to hide it.

## Content

- **Blog posts:** add a Markdown file to `app/blog/posts/`.
- **Projects:** add a Markdown file to `app/work/projects/`.
- **Images:** put them in `public/images/` and reference them as `/images/...`.
- **YouTube videos:** put the video link (`https://youtu.be/...` or `https://www.youtube.com/watch?v=...`) on a line of its own. It is shown as an embedded player.

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

## Analytics

Visitor statistics are off unless you set `analytics` in `site.config.ts`. Supported providers:

| Provider | Config | Cost / cookies |
|---|---|---|
| [GoatCounter](https://www.goatcounter.com) | `{ provider: "goatcounter", code: "ada" }` for `ada.goatcounter.com` | Free for personal sites, no cookies |
| [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) | `{ provider: "cloudflare", token: "…" }` | Free, no cookies |
| [Umami](https://umami.is) | `{ provider: "umami", websiteId: "…" }` (add `src` if self-hosted) | Free tier, no cookies |
| [Plausible](https://plausible.io) | `{ provider: "plausible", src: "https://plausible.io/js/pa-….js" }` | Paid, no cookies |
| [Google Analytics](https://analytics.google.com) | `{ provider: "google", measurementId: "G-…" }` | Free, sets cookies (you may need a consent banner) |

The numbers are in the provider's own dashboard. Page views from client-side navigation (clicking between pages) are counted too.

Using this repo as a template? Change `analytics` to your own ID or to `{ provider: "none" }`, or your visits will be counted on the original owner's dashboard.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md).

## License

The code is [MIT licensed](LICENSE). The content (blog posts, project write-ups, photos and other images) is not: it belongs to Yusuf Sina Yildiz and may not be reused. Replace it with your own if you build on this repo.
