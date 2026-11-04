# Static Site Deployment Guide

Your portfolio is configured as a **static site**! Build locally and upload to cPanel's `public_html`.

## ✅ Benefits

- **No Node.js server needed** on production
- **Simple deployment** - just upload HTML files
- **Faster loading** - all pages pre-rendered
- **Lower cost** - no server resources needed
- **Works on any hosting** - just needs to serve static files

## 📦 Building the Static Site (Local - Windows)

### Step 1: Build Locally

On your Windows machine:

```bash
npm run build:static
```

This will:
- Process all markdown files
- Generate static HTML for all pages
- Create an `/out` folder with all static files

**Expected time:** 2-5 minutes (depending on number of posts/projects)

### Step 2: Verify Build Output

After build completes, check that `/out` folder contains:
- `index.html` (homepage)
- `blog/` folder with all blog posts
- `work/` folder with all projects
- `_next/` folder with CSS and JavaScript
- All images from `public/` folder

## 🚀 Deploying to cPanel public_html

### Step 1: Access cPanel File Manager

1. Log in to cPanel
2. Open **File Manager**
3. Navigate to `public_html` (or your domain's root directory)

### Step 2: Upload Static Files

**Option A: Upload via File Manager**
1. Select all files in the `/out` folder on your local machine
2. Upload them to `public_html` in cPanel
3. **Important:** Upload the **contents** of `/out`, not the `/out` folder itself

**Option B: Upload via FTP/SFTP**
1. Connect to your server via FTP client (FileZilla, WinSCP, etc.)
2. Navigate to `public_html` on server
3. Upload all files from local `/out` folder

### Step 3: Verify Deployment

1. Visit your domain (e.g., `yusufsina.com`)
2. Check that:
   - ✅ Homepage loads
   - ✅ Blog section works (`/blog`)
   - ✅ Work section works (`/work`)
   - ✅ Individual blog posts load
   - ✅ Individual project pages load
   - ✅ Images display correctly
   - ✅ Dark mode toggle works

## 📝 Workflow for Updates

When you want to add new content:

1. **Add markdown files:**
   - Blog posts: `app/blog/posts/your-post.md`
   - Projects: `app/work/projects/your-project.md`

2. **Rebuild locally:**
   ```bash
   npm run build:static
   ```

3. **Upload new files:**
   - Upload only changed files, or
   - Upload entire `/out` folder contents (overwrite existing)

4. **Done!** Your site is updated.

## 🗂️ File Structure After Upload

Your `public_html` should look like:
```
public_html/
├── index.html
├── blog/
│   ├── index.html
│   ├── post-1/
│   │   └── index.html
│   └── post-2/
│       └── index.html
├── work/
│   ├── index.html
│   └── project-1/
│       └── index.html
├── _next/
│   ├── static/
│   └── ...
├── images/
│   ├── icon.png
│   └── yusufsinayildiz.jpg
└── ...
```

## ⚠️ Important Notes

- **No Node.js app needed** - You don't need to create a Node.js app in cPanel
- **No server.js needed** - Static files don't require a server
- **No API routes** - They won't work with static export (but not needed)
- **Build locally** - Always build on your local machine, then upload
- **Upload contents** - Upload files from `/out`, not the `/out` folder itself

## 🔧 Troubleshooting

### Files not loading
- ✅ Check file permissions (should be 644 for files, 755 for directories)
- ✅ Verify all files uploaded correctly
- ✅ Check that you uploaded contents of `/out`, not the folder itself

### 404 errors
- ✅ Ensure `index.html` files are in correct locations
- ✅ Check that blog/work folders have `index.html` files
- ✅ Verify file paths match the structure

### Images not showing
- ✅ Check that `images/` folder was uploaded
- ✅ Verify image paths in HTML (should be `/images/...`)
- ✅ Check file permissions on images

### Styling not working
- ✅ Ensure `_next/` folder was uploaded
- ✅ Check browser console for 404 errors on CSS/JS files
- ✅ Verify file permissions

## 🎯 Quick Reference

```bash
# Build static site
npm run build:static

# Test locally (optional)
npm start

# Then upload /out folder contents to public_html
```

## 📦 What Gets Built

The build process:
1. Reads all markdown files from `app/blog/posts/` and `app/work/projects/`
2. Converts markdown to HTML
3. Generates static HTML pages for:
   - Homepage (`/`)
   - Blog listing (`/blog`)
   - All blog posts (`/blog/[slug]`)
   - Work listing (`/work`)
   - All project pages (`/work/[slug]`)
4. Copies all files from `public/` folder
5. Bundles CSS and JavaScript

All of this happens at build time - no server processing needed!
