# Deployment

The site is a static export (`output: "export"` in `next.config.js`). `npm run build` writes plain HTML, CSS, JS and images to `out/`. The host only needs to serve those files: no Node.js runs on the server.

## Build

```bash
npm ci
npm run build
```

Check the result locally with `npm run preview`.

## Upload

Upload the **contents** of `out/` (not the folder itself) to the site's document root on the host, replacing what is there. With cPanel this can be done through File Manager (upload a zip of `out/` and extract it) or with an FTP client.

The document root must contain `index.html`, `404.html`, `rss.xml`, `sitemap.xml`, `robots.txt` and the `_next/`, `blog/`, `work/` and `images/` folders.

## Notes

- `trailingSlash: true` makes every page a folder with an `index.html` (`/blog/` → `blog/index.html`), so no rewrite rules are needed.
- Images are served unoptimized (`images.unoptimized`), as static hosting has no image optimizer.
- If the domain or site name changes, update `lib/site.ts`: it drives canonical URLs, the sitemap and the RSS feed.
