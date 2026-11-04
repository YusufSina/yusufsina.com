# Portfolio Website

A minimal Next.js portfolio website with a clean, minimalist design.

## Features

- **Home Page**: Profile section with social links (X, LinkedIn, GitHub)
- **Work Section**: Showcase your projects
- **Blog Section**: Write and share articles

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Update your social media links in `app/page.tsx`:
   - Replace `https://twitter.com/yourusername` with your X/Twitter profile
   - Replace `https://linkedin.com/in/yourusername` with your LinkedIn profile
   - Replace `https://github.com/yourusername` with your GitHub profile

3. Add your profile picture:
   - Replace the placeholder in `app/page.tsx` with your actual profile image
   - You can use Next.js Image component or add your image to the `public` folder

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

- **Projects**: Edit the `projects` array in `app/work/page.tsx` to add your projects
- **Blog Posts**: Edit the `posts` array in `app/blog/page.tsx` to add your blog posts
- **Styling**: Modify `tailwind.config.ts` to adjust colors and theme
- **Content**: Update the text content in `app/page.tsx` to match your personal information

## Build for Production

```bash
npm run build
npm start
```
