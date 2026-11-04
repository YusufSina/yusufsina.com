---
name: setup-site
description: Turn this repository into the user's own personal site. Use when someone has cloned or forked the template and asks to set it up, make it theirs, personalise it, or replace the original owner's details and content.
---

# Set up the site for a new owner

This repo is someone's personal site, published as a template. Your job is to replace the current owner's details and content with the user's, leave the code alone, and finish with a site that builds.

Before changing anything, note the current owner's `name`, `url`, `twitterHandle`, email address and social URLs from `site.config.ts`. You need them for the leftover check in step 7.

Work through the steps in order. Ask the questions in step 1 in a single message, not one at a time, and say which ones are optional. Never invent facts about the user (job, projects, bio): if something is missing, ask or leave it out.

## 1. Collect the user's details

Ask for:

- **Full name.** The favicon shows its initials (first and last word) unless they pick other letters.
- **Domain** the site will live on, e.g. `https://ada.dev`. If they don't know yet, use `https://example.com` and remind them at the end.
- **One-sentence description** for search results and link previews.
- **Bio:** one to three short paragraphs for the home page. Offer to draft them from what they tell you, then show the draft before writing it.
- **Photo:** a path to an image file. Optional; without one, keep the layout and tell them the avatar is missing.
- **Social links** (optional): X, LinkedIn, GitHub, personal website. Only these four have icons (`SocialPlatform` in `site.config.ts`).
- **Email** for the contact icon (optional), and the subject/body to prefill.
- **Language:** the HTML `lang` (e.g. `en`, `tr`) and Open Graph locale (e.g. `en_US`, `tr_TR`). The fixed UI text is English; if they pick another language, offer to translate it. It lives in:
  - `app/page.tsx`: "See my work", "Latest Articles", "View all →", "Read more"
  - `app/blog/page.tsx` and `app/work/page.tsx`: the "Blog" and "My Work" headings, "← Back to home", page titles in `metadata`
  - `app/blog/[slug]/page.tsx` and `app/work/[slug]/page.tsx`: "← Back to blog", "← Back to work"
  - `app/blog/BlogClient.tsx`, `app/work/WorkClient.tsx`, `app/work/ProjectMeta.tsx`: list and pagination labels
  - `app/components/SourceLink.tsx` ("Source"), `app/components/ThemeToggle.tsx` and `app/components/SocialIcon.tsx` (accessibility labels)
- **Favicon** (optional): different letters, background and text colours.
- **Source button:** the small "Source" button in the bottom-right corner of the home page. Options: point it at their own repo, keep it pointing at the original template (`https://github.com/YusufSina/yusufsina.com`) as a credit, or hide it (empty string).
- **Starting content:** do they want to write a first post and add their first project now, or start with one placeholder of each?
- **Analytics** (optional): visitor statistics with GoatCounter, Cloudflare Web Analytics, Umami, Plausible or Google Analytics (see "Analytics" in `readme.md`), or none. If they want one, ask for the ID from their account.
- **Hosting:** cPanel/FTP (what the repo deploys to now), or another static host (Netlify, Cloudflare Pages, Vercel, GitHub Pages).

## 2. Fill in `site.config.ts`

`site.config.ts` holds every personal value; all pages, metadata, the sitemap, RSS and the favicon read from it. Edit only the values in the `siteConfig` object, keep the types and comments. Set:

- `url` (no trailing slash), `name`, `description`, `bio`, `lang`, `locale`
- `twitterHandle` (with `@`, or `""`), `socials`, `email`
- `icon` (`text` only if they chose other letters), `sourceUrl`
- `analytics`: their provider and ID, or `{ provider: "none" }`. Never keep the original owner's value, or the user's visitors are counted on someone else's dashboard.
- `blog.description` and `work.description`: one line each in the user's voice. They show under the Blog and Work headings and are those pages' meta descriptions.

## 3. Replace the photo

- Copy their photo to `public/images/` with a descriptive file name, and set `avatar` to `/images/<file>`. It is also the default link preview image, so use JPG or PNG.
- Delete the previous owner's photo (the old `avatar` path).

## 4. Remove the original content

Everything below belongs to the original owner and is not covered by the MIT license, so it must go:

- the images the posts and projects use. List them first, while the Markdown files still exist: `grep -rho "/images/[^/)]*" app/blog/posts app/work/projects | sort -u`. Delete those folders under `public/images/`, keeping the new avatar.
- then all files in `app/blog/posts/` and `app/work/projects/`

Check with `git status` that nothing else was deleted. Then add the starting content from step 1 using the `new-post` and `new-project` skills. The build works with empty folders too (a placeholder 404 page is generated), but the Blog and Work pages will look empty.

## 5. Update the repo's own files

- `LICENSE`: change the copyright line to the user's name and the current year, and rewrite the "Content is not covered" section for their own content (or remove it if they want their content MIT too; ask).
- `readme.md`: rewrite the title and first paragraph for their site. Keep the Development, Content and Deployment sections. Keep or drop the "Make it yours" section depending on whether they want their copy to be a template too.
- `package.json`: set `name` to a slug of their domain (e.g. `ada-dev`), then run `npm install` so `package-lock.json` picks up the new name.
- **This skill:** ask whether their copy should stay a template for others. If not, delete `.claude/skills/setup-site/` (the `new-post` and `new-project` skills stay). If yes, keep it: it refers to "the current owner" and reads everything from `site.config.ts`, so it works for the next person too.

## 6. Hosting

**cPanel / FTP** (works as is): walk them through DEPLOYMENT.md:

1. In cPanel, create an FTP account whose home folder is the site's document root (often `public_html`). Don't use the main hosting account.
2. In GitHub: Settings → Environments → New environment `production`; under *Deployment branches and tags*, allow only `main`.
3. Add the environment secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`. `FTP_SERVER` is the host name only, no `ftp://`. Use the host the hosting provider's TLS certificate is issued for (cPanel shows it under *FTP Accounts → Configure FTP Client*); `ftp.<domain>` often fails FTPS.
4. Optional variables: `FTP_SERVER_DIR` (ends with `/`) and `FTP_PROTOCOL` (`ftps` by default).

Until `FTP_SERVER` is set, the deploy job is skipped with a notice, so pushes don't fail.

**Netlify, Cloudflare Pages, Vercel:** connect the repo in their dashboard with build command `npm run build` and output folder `out`. Offer to delete the `deploy` job from `.github/workflows/deploy.yml`, keeping the `build` job as a check on pull requests.

**GitHub Pages:** works without changes only when the site is served from the root of a domain (a custom domain, or a `<user>.github.io` repository). Under `<user>.github.io/<repo>/` every link and image would need a `basePath`; recommend a custom domain instead. Deploy `out/` with the official `actions/upload-pages-artifact` and `actions/deploy-pages` actions, pinned to commit SHAs like the existing ones.

## 7. Check the result

1. `npm install` if `node_modules` is missing, then `npm run build`. It must pass.
2. Look for leftovers of the original owner:
   ```bash
   grep -rniIF -e "<old name>" -e "<old domain>" -e "<old handle>" -e "<old email>" --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out --exclude-dir=.git .
   ```
   using the values you noted at the start (for a multi-word name, also try the first and last name on their own). The only hits left should be the ones the user chose to keep (the template credit in `sourceUrl`, and a credit line in the README if they want one) and the files in `.claude/skills/`. Fix anything else.
3. Offer `npm run dev` so they can look at http://localhost:3000.

## 8. Wrap up

Give a short summary: what was filled in, what was removed, what is still missing (photo, domain, posts), and the hosting steps left for them. Suggest committing with a message like "Make the site my own".
