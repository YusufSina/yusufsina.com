---
name: new-post
description: Add a new blog post to this site. Use when the user wants to write, draft, add or publish a blog post or article.
---

# Add a blog post

Posts are Markdown files in `app/blog/posts/`. Each file becomes a page at `/blog/<slug>/`, and appears on the home page (latest three), the Blog page, the sitemap and the RSS feed. Nothing else needs to be registered.

## 1. Gather the post

Ask for what is missing:

- **Title**
- **The content:** the finished text, notes to turn into a post, or a topic to draft from. When you draft, write in the user's voice (read one or two existing posts first if there are any), and never invent facts, numbers or experiences: ask, or leave a clearly marked `TODO`.
- **Date:** default to today.
- **Images** (optional): file paths, plus a short description of each for its alt text.

## 2. Write the file

- **Slug:** lower-case kebab-case of the title, ASCII only (e.g. "Books of 2025" → `books-of-2025`; turn Turkish letters into ASCII: ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u). It must not clash with an existing file.
- **File:** `app/blog/posts/<slug>.md`.
- **id:** one more than the highest `id` in `app/blog/posts/`, or `1` if there are none.

Front matter, then the body:

```markdown
---
id: 3
title: "Post title"
date: "January 2, 2026"
excerpt: "One or two sentences. Shown on list pages, in search results, link previews and RSS."
slug: "post-title"
---

First paragraph...
```

- Quote string values with double quotes; escape any double quote inside them.
- `date` can be any format JavaScript's `Date` parses; match the format of the existing posts. Posts are sorted by date, newest first.
- `excerpt`: write it from the post, under about 160 characters.
- In the body, start sections at `##` (the page title is already the `#` heading).

## 3. Images

- Copy them to `public/images/blog/<slug>/` and reference them as `![Alt text](/images/blog/<slug>/<file>)`.
- The first image in the post is used as its link preview image; without one, the site's profile photo is used.
- Keep files reasonably small (under ~500 KB; SVG for diagrams).

## 4. Check

Run `npm run build` and make sure it passes and lists `/blog/<slug>`. Offer `npm run dev` to preview at `http://localhost:3000/blog/<slug>/`. Then show the user the file path and the excerpt, and ask whether to change anything before they commit.
