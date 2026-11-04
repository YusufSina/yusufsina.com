---
name: new-project
description: Add a new project or case study to the Work section of this site. Use when the user wants to add, showcase or write up a project, product or piece of work.
---

# Add a project

Projects are Markdown files in `app/work/projects/`. Each one appears as a card on the Work page and gets its own page at `/work/<slug>/`, and is added to the sitemap. Nothing else needs to be registered.

## 1. Gather the project

Ask for what is missing. Only `title`, `excerpt` and some content are required; leave out any field the user doesn't give.

- **Title** and a **one- or two-sentence summary**
- **Year**, the user's **role** (e.g. "Founder & developer"), **status** (e.g. "Live", "Archived", "Pilot")
- **Stack:** the main technologies
- **Link** to the live project (optional)
- **The story:** what it is, the problem, what they built, what they learned. Turn notes into a short case study in the user's voice. Read one or two existing projects first to match their tone and section structure; if there are none yet, take the tone from `bio` and `description` in `site.config.ts`. Never invent features, numbers or results: ask, or leave a clearly marked `TODO`.
- **Images:** screenshots or a header image, with a short description of each.

## 2. Write the file

- **Slug:** lower-case kebab-case of the title, ASCII only (turn Turkish letters into ASCII: ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u). It must not clash with an existing file.
- **File:** `app/work/projects/<slug>.md`.
- **id:** one more than the highest `id` in `app/work/projects/`, or `1` if there are none.

```markdown
---
id: 6
title: "Project name"
date: "2026-10-01"
year: 2026
role: "Founder & developer"
status: "Live"
stack: ["Next.js", "PostgreSQL"]
excerpt: "One or two sentences. Shown on the Work page, in search results and link previews."
slug: "project-name"
link: "https://example.com"
---

![Short description of the header image](/images/project-name/header.jpg)

## The idea

...
```

- `date` decides the order on the Work page (newest first). Use the start or launch date; if the user only knows the year, use `"<year>-06-01"`.
- `year`, `role`, `status` and `stack` show as tags on the card and page.
- Quote string values with double quotes; escape any double quote inside them.
- Start sections at `##`. A structure that works well: "The idea", "What I built", "How it works" or "Tech", "Outcome" or "What I learned".

## 3. Images

- Copy them to `public/images/<slug>/` and reference them as `![Alt text](/images/<slug>/<file>)`.
- The first image becomes the project's card cover and link preview image, so put the best one first. Use JPG or PNG for it: X, LinkedIn and others don't show SVG previews.
- To use a cover that doesn't appear in the text, set `cover: "/images/<slug>/cover.jpg"` in the front matter instead; it takes priority over the first image for both the card and the link preview.
- Keep files reasonably small (under ~500 KB each).

## 4. Check

Run `npm run build` and make sure it passes and lists `/work/<slug>`. Offer `npm run dev` to preview `http://localhost:3000/work/` and `http://localhost:3000/work/<slug>/`. Show the user the file path and the card summary, and ask whether to change anything before they commit.
