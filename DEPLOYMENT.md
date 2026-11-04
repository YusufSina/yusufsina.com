# Deployment

The site is a static export (`output: "export"` in `next.config.js`). `npm run build` writes plain HTML, CSS, JS and images to `out/`. The host only needs to serve those files: no Node.js runs on the server.

## Automatic deploy (GitHub Actions)

`.github/workflows/deploy.yml` builds the site on every pull request and push. On a push to `main` (or a manual run from the Actions tab) it also uploads `out/` to the server over FTP. Only changed files are uploaded: the action keeps a small `.ftp-deploy-sync-state.json` file on the server to track what is already there.

Set these once under **Settings → Secrets and variables → Actions**:

| Name | Type | Value |
|---|---|---|
| `FTP_SERVER` | Secret | FTP host, e.g. `ftp.yusufsina.com` |
| `FTP_USERNAME` | Secret | FTP account user name |
| `FTP_PASSWORD` | Secret | FTP account password |
| `FTP_SERVER_DIR` | Variable (optional) | Folder to upload into, ending with `/`. Defaults to the FTP account's home folder (`./`). |
| `FTP_PROTOCOL` | Variable (optional) | `ftps` (default) or `ftp` if the server doesn't support TLS. |

Tip: create a separate FTP account in cPanel whose home folder is the site's document root, so `FTP_SERVER_DIR` can stay at its default and the account can't touch anything else.

## Manual build

```bash
npm ci
npm run build
```

Check the result locally with `npm run preview`.

## Manual upload

Upload the **contents** of `out/` (not the folder itself) to the site's document root on the host, replacing what is there. With cPanel this can be done through File Manager (upload a zip of `out/` and extract it) or with an FTP client.

The document root must contain `index.html`, `404.html`, `rss.xml`, `sitemap.xml`, `robots.txt` and the `_next/`, `blog/`, `work/` and `images/` folders.

## Notes

- `trailingSlash: true` makes every page a folder with an `index.html` (`/blog/` → `blog/index.html`), so no rewrite rules are needed.
- Images are served unoptimized (`images.unoptimized`), as static hosting has no image optimizer.
- If the domain or site name changes, update `lib/site.ts`: it drives canonical URLs, the sitemap and the RSS feed.
