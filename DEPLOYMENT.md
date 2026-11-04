# Deployment

The site is a static export (`output: "export"` in `next.config.js`). `npm run build` writes plain HTML, CSS, JS and images to `out/`. The host only needs to serve those files: no Node.js runs on the server.

## Automatic deploy (GitHub Actions)

`.github/workflows/deploy.yml` builds the site on every pull request and push. On a push to `main` (or a manual run from the Actions tab) it also uploads `out/` to the server over FTP. Only changed files are uploaded: the action keeps a small `.ftp-deploy-sync-state.json` file on the server to track what is already there.

Pull requests, including ones from forks, only build: they never see the secrets and never upload. The upload job runs in a GitHub environment called `production`.

Set up once:

1. **Settings → Environments → New environment**, name it `production`. Under *Deployment branches and tags* choose *Selected branches and tags* and add the branch `main`.
2. Add the values below to that environment (*Environment secrets* / *Environment variables*). Repository-level secrets also work, but environment secrets can only be read by a deploy from `main`.

If `FTP_SERVER` is not set the deploy job is skipped with a notice, so a fresh copy of this repo doesn't fail on its first push.

| Name | Type | Value |
|---|---|---|
| `FTP_SERVER` | Secret | FTP host, e.g. `ftp.example.com` |
| `FTP_USERNAME` | Secret | FTP account user name |
| `FTP_PASSWORD` | Secret | FTP account password |
| `FTP_SERVER_DIR` | Variable (optional) | Folder to upload into, ending with `/`. Defaults to the FTP account's home folder (`./`). |
| `FTP_PROTOCOL` | Variable (optional) | `ftps` (default) or `ftp` if the server doesn't support TLS. |

Use a separate FTP account whose home folder is the site's document root (in cPanel: *FTP Accounts*), not the main hosting account. Then `FTP_SERVER_DIR` can stay at its default and a leaked password can't touch anything else.

Not on cPanel? `out/` is plain static files, so any static host works (GitHub Pages, Netlify, Cloudflare Pages, Vercel). Point it at `npm run build` with `out` as the output folder.

## Manual build

```bash
npm ci
npm run build
```

Check the result locally with `npm run preview`.

## Manual upload

Upload the **contents** of `out/` (not the folder itself) to the site's document root on the host, replacing what is there. With cPanel this can be done through File Manager (upload a zip of `out/` and extract it) or with an FTP client.

The document root must contain `index.html`, `404.html`, `rss.xml`, `sitemap.xml`, `robots.txt`, `icon.png`, `apple-icon.png` and the `_next/`, `blog/`, `work/` and `images/` folders.

## Notes

- `trailingSlash: true` makes every page a folder with an `index.html` (`/blog/` → `blog/index.html`), so no rewrite rules are needed.
- Images are served unoptimized (`images.unoptimized`), as static hosting has no image optimizer.
- The domain, name and other site-wide values live in `site.config.ts`: they drive canonical URLs, the sitemap, the RSS feed and the favicon.
