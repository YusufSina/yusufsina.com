import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  content?: string;
  contentHtml?: string;
}

interface MatterData {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  slug?: string;
  [key: string]: unknown;
}

// Get posts directory - works in both dev and production
const postsDirectory = join(process.cwd(), 'app', 'blog', 'posts');

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const files = await readdir(postsDirectory);
    const markdownFiles = files.filter((file: string) => file.endsWith('.md'));
    
    if (markdownFiles.length === 0) {
      return [];
    }
    
    const posts = await Promise.all(
      markdownFiles.map(async (file: string) => {
        try {
          const filePath = join(postsDirectory, file);
          const fileContents = await readFile(filePath, 'utf8');
          const matterResult = matter(fileContents);
          const data = matterResult.data as MatterData;
          const content = matterResult.content;
          
          return {
            id: data.id,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            slug: data.slug || file.replace('.md', ''),
            content: content.trim(),
          } as BlogPost;
        } catch (error) {
          console.error(`Error reading post file ${file}:`, error);
          return null;
        }
      })
    );

    // Filter out null values and sort by date, newest first
    const validPosts = posts.filter((post): post is BlogPost => post !== null);
    return validPosts.sort((a: BlogPost, b: BlogPost) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = join(postsDirectory, `${slug}.md`);
    const fileContents = await readFile(filePath, 'utf8');
    const matterResult = matter(fileContents);
    const data = matterResult.data as MatterData;
    const content = matterResult.content;
    
    // Convert markdown to HTML
    // Use dynamic import to avoid blocking
    const { remark } = await import('remark');
    const { default: remarkHtml } = await import('remark-html');
    
    const processedContent = await remark()
      .use(remarkHtml)
      .process(content);
    
    const contentHtml = processedContent.toString();

    return {
      id: data.id,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      slug: data.slug || slug,
      content: content.trim(),
      contentHtml: contentHtml,
    } as BlogPost;
  } catch (error) {
    console.error('Error finding post:', error);
    return null;
  }
}
