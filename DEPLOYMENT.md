# Deployment Guide

This guide covers deployment options for your Next.js portfolio.

## 🎯 Deployment Options

You have **two deployment options**:

### Option 1: Static Site (Recommended - Simplest)

**Build locally, upload static files to `public_html`**

- ✅ No Node.js server needed
- ✅ Simple - just upload HTML files
- ✅ Works on any hosting
- ✅ Faster and cheaper

**See [STATIC_DEPLOYMENT.md](./STATIC_DEPLOYMENT.md) for detailed instructions.**

### Option 2: Node.js App (For SSR)

**Deploy with Node.js server on cPanel**

- Requires Node.js app setup
- More complex configuration
- Server resources needed

**See sections below for Node.js deployment.**

---

## 📦 Option 1: Static Site Deployment (Recommended)

### Quick Start

1. **Build locally:**
   ```bash
   npm run build:static
   ```

2. **Upload to cPanel:**
   - Open cPanel File Manager
   - Navigate to `public_html`
   - Upload all contents from `/out` folder

3. **Done!** Your site is live.

**For detailed instructions, see [STATIC_DEPLOYMENT.md](./STATIC_DEPLOYMENT.md)**

---

## 🖥️ Option 2: Node.js App Deployment (SSR)

If you need server-side rendering or want to use the Node.js app approach:

### Prerequisites

1. cPanel access with Node.js App support enabled
2. Node.js version 16.14.0 or higher (your server has 16.15.0)
3. Your domain/subdomain configured
4. SSH access (recommended, but not always required)

### Step 1: Build Your Application

**Build on your local machine:**

```bash
npm install
npm run build
```

This creates an optimized production build in the `.next` folder.

### Step 2: Prepare Files for Upload

Files to upload:
- ✅ All source files (`app/`, `public/`, `package.json`, `tsconfig.json`, etc.)
- ✅ Configuration files (`next.config.js`, `tailwind.config.ts`, `postcss.config.js`)
- ✅ `server.js` (custom server file)

Files to **EXCLUDE**:
- ❌ `node_modules/` (will be installed on server)
- ❌ `.next/` (will be built on server)
- ❌ `.git/` (optional, but not needed for production)
- ❌ `package-lock.json` (optional, can regenerate on server)

### Step 3: Upload Files to cPanel

1. **Access cPanel File Manager** or use FTP/SFTP
2. Navigate to your chosen directory:
   - **Option A**: Create subdirectory `public_html/portfolio` (app accessible at `yourdomain.com/portfolio`)
   - **Option B**: Create separate directory like `nodejs` or `app` (requires subdomain setup)
3. Upload all project files (excluding the files listed above)

**Important:** Make sure to upload:
- `app/blog/posts/*.md` (your blog markdown files)
- `app/work/projects/*.md` (your project markdown files)
- `public/images/*` (your images including icon.png and profile photo)

### Step 4: Create Node.js App in cPanel

1. In cPanel, find **"Node.js App"** or **"Node.js Selector"**
2. Click **"Create Application"**
3. Configure the application:
   - **Node.js version**: Select **16.15.0** (or the highest available version)
   - **Application mode**: Production
   - **Application root**: 
     - ❌ **DO NOT use**: `/home/username/public_html` (not allowed by cPanel)
     - ✅ **Use instead**: `/home/username/public_html/portfolio` or `/home/username/nodejs`
   - **Application URL**: Your domain or subdomain
   - **Application startup file**: `server.js`
   - **Application port**: Leave default (usually auto-assigned by cPanel)

### Step 5: Install Dependencies on Server

**Using SSH (Recommended):**
```bash
cd /home/username/public_html/portfolio
# OR
cd /home/username/nodejs

npm install
```

**Or using cPanel Node.js Interface:**
1. In cPanel Node.js App interface
2. Go to your application settings
3. Click **"Run NPM Install"**

### Step 6: Build on Server

**Important:** You must build on the server for the app to work correctly.

```bash
cd /home/username/public_html/portfolio
npm run build
```

### Step 7: Start/Restart Application

1. In cPanel Node.js App interface
2. Click **"Restart App"** or **"Start App"**
3. Wait for the app to start (check status indicator)

**✅ Recommended:** Always use cPanel UI to start/restart - don't run `node server.js` directly from terminal.

### Step 8: Verify Deployment

1. Visit your domain/subdomain
2. Check that the site loads correctly
3. Test all features

## 📋 Comparison: Static vs Node.js

| Feature | Static Site | Node.js App |
|---------|------------|-------------|
| **Setup Complexity** | ⭐ Simple | ⭐⭐⭐ Complex |
| **Server Requirements** | None | Node.js 16+ |
| **Build Location** | Local | Server |
| **Deployment** | Upload files | Configure app |
| **Performance** | ⭐⭐⭐ Fast | ⭐⭐ Good |
| **Cost** | ⭐⭐⭐ Low | ⭐⭐ Medium |
| **Updates** | Rebuild & upload | Rebuild on server |

## 🎯 Recommendation

**Use Static Site deployment** - it's simpler, faster, and works perfectly for a portfolio site.

## 📚 Additional Resources

- **Static Deployment**: See [STATIC_DEPLOYMENT.md](./STATIC_DEPLOYMENT.md)
- **Node.js Compatibility**: See [NODE_VERSION_COMPATIBILITY.md](./NODE_VERSION_COMPATIBILITY.md)
- **Build Troubleshooting**: See [BUILD_TROUBLESHOOTING.md](./BUILD_TROUBLESHOOTING.md)
