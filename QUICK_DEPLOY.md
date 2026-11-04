# Quick Deployment Guide - cPanel

## 🚀 Deploy Your Static Site to cPanel

### Method 1: Using cPanel File Manager (Easiest)

1. **Log in to cPanel**
   - Access your cPanel dashboard

2. **Open File Manager**
   - Find and click "File Manager" in cPanel
   - Navigate to `public_html` folder

3. **Clear existing files (if any)**
   - Select all files in `public_html`
   - Delete them (or backup first if needed)

4. **Upload files**
   - Click "Upload" button in File Manager
   - Select **ALL files and folders** from your local `out/` folder:
     - `index.html`
     - `404.html`
     - `blog/` folder (with all contents)
     - `work/` folder (with all contents)
     - `images/` folder (with all contents)
     - `_next/` folder (with all contents)
   - Wait for upload to complete

5. **Set permissions** (if needed)
   - Files: `644`
   - Folders: `755`

6. **Done!** Visit your domain to see your site.

---

### Method 2: Using FTP/SFTP (Faster for large files)

1. **Get FTP credentials from cPanel**
   - Go to "FTP Accounts" in cPanel
   - Note your FTP host, username, and password

2. **Connect with FTP client**
   - Use FileZilla, WinSCP, or any FTP client
   - Connect to your server

3. **Navigate to public_html**
   - Go to `/public_html` or `/home/username/public_html`

4. **Upload all contents**
   - Upload everything from your local `out/` folder
   - Make sure to upload the **contents** of `out/`, not the `out` folder itself

5. **Verify structure**
   Your `public_html` should have:
   ```
   public_html/
   ├── index.html
   ├── 404.html
   ├── blog/
   │   ├── books-of-2025.html
   │   └── new-website-new-year-new-direction.html
   ├── work/
   │   └── placeholder.html
   ├── images/
   │   ├── icon.png
   │   └── yusufsinayildiz.jpg
   └── _next/
       └── static/
           ├── css/
           ├── chunks/
           └── media/
   ```

---

### Method 3: Using cPanel Terminal/SSH (Advanced)

If you have SSH access:

```bash
# 1. Compress the out folder locally
# On Windows, create a zip file of the out folder

# 2. Upload zip file to public_html via File Manager

# 3. SSH into your server
ssh username@yourdomain.com

# 4. Navigate to public_html
cd ~/public_html

# 5. Extract the zip file
unzip out.zip

# 6. Move all files from out/ to current directory
mv out/* .
mv out/.* . 2>/dev/null || true

# 7. Remove the empty out folder
rmdir out

# 8. Set correct permissions
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
```

---

## ⚠️ Important Notes

### ✅ DO:
- Upload **contents** of `out/` folder, not the `out` folder itself
- Upload all folders: `_next/`, `images/`, `blog/`, `work/`
- Keep the folder structure intact
- Upload all files including `.html`, `.js`, `.css`, `.woff2`, `.png`, `.jpg`
- **Important:** The build generates folders with `index.html` files (e.g., `blog/index.html`, `blog/books-of-2025/index.html`)

### ❌ DON'T:
- Don't upload the `out` folder itself (upload its contents)
- Don't skip the `_next/` folder (contains CSS and JavaScript)
- Don't modify file paths after upload
- Don't delete files that seem unnecessary (they're all needed)
- Don't rename or move `index.html` files - they must stay in their folders

---

## ✅ Verification Checklist

After uploading, verify:

1. **Homepage loads**: Visit `https://yourdomain.com`
2. **Blog works**: Visit `https://yourdomain.com/blog`
3. **Work section works**: Visit `https://yourdomain.com/work`
4. **Blog posts load**: Click on any blog post
5. **Images display**: Check profile picture and favicon
6. **Styles work**: Check that colors and fonts are correct
7. **Dark mode works**: Click the theme toggle button
8. **No 404 errors**: Check browser console for missing files

---

## 🔄 Updating Your Site

When you make changes:

1. **Rebuild locally:**
   ```bash
   npm run build:static
   ```

2. **Upload new/changed files:**
   - Upload only changed files, OR
   - Upload entire `out/` folder contents (overwrite existing)

3. **Clear browser cache** if changes don't appear

---

## 🐛 Troubleshooting

### Styles not loading
- ✅ Check that `_next/static/css/` folder was uploaded
- ✅ Verify file permissions (644 for files)
- ✅ Check browser console for 404 errors

### Images not showing
- ✅ Verify `images/` folder was uploaded
- ✅ Check image file permissions
- ✅ Verify image paths in HTML

### 404 errors on pages
- ✅ Ensure all `index.html` files are in correct folder locations
- ✅ Check that folder structure matches the build output:
  - `blog/index.html` (not `blog.html`)
  - `blog/books-of-2025/index.html` (not `blog/books-of-2025.html`)
- ✅ Verify `index.html` is in `public_html` root
- ✅ Make sure URLs have trailing slashes: `/blog/` not `/blog`

### Site shows "Index of" page
- ✅ Make sure `index.html` is in `public_html` root
- ✅ Check file permissions on `index.html`

---

## 📞 Need Help?

If something doesn't work:
1. Check browser console (F12) for errors
2. Verify all files uploaded correctly
3. Check file permissions
4. Ensure folder structure matches exactly

