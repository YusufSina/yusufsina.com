import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';
import { EMPTY_SLUG, firstImage, isMissing } from '@/lib/site';

export interface Project {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  content?: string;
  contentHtml?: string;
  link?: string;
  year?: string;
  role?: string;
  status?: string;
  stack?: string[];
  cover?: string;
}

interface MatterData {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  slug?: string;
  link?: string;
  year?: string | number;
  role?: string;
  status?: string;
  stack?: string[];
  cover?: string;
  [key: string]: unknown;
}

// Get projects directory - works in both dev and production
const projectsDirectory = join(process.cwd(), 'app', 'work', 'projects');

function projectFields(data: MatterData, content: string) {
  return {
    link: data.link || undefined,
    year: data.year !== undefined ? String(data.year) : undefined,
    role: data.role,
    status: data.status,
    stack: Array.isArray(data.stack) ? data.stack : [],
    cover: data.cover || firstImage(content),
  };
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const files = await readdir(projectsDirectory);
    const markdownFiles = files.filter((file: string) => file.endsWith('.md'));
    
    if (markdownFiles.length === 0) {
      return [];
    }
    
    const projects = await Promise.all(
      markdownFiles.map(async (file: string) => {
        try {
          const filePath = join(projectsDirectory, file);
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
            ...projectFields(data, content),
            content: content.trim(),
          } as Project;
        } catch (error) {
          console.error(`Error reading project file ${file}:`, error);
          return null;
        }
      })
    );

    // Filter out null values and sort by date, newest first
    const validProjects = projects.filter((project): project is Project => project !== null);
    return validProjects.sort((a: Project, b: Project) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    // No projects folder yet (git doesn't keep empty folders): nothing to list.
    if (!isMissing(error)) console.error('Error reading projects:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (slug === EMPTY_SLUG) return null;
  try {
    const filePath = join(projectsDirectory, `${slug}.md`);
    const fileContents = await readFile(filePath, 'utf8');
    const matterResult = matter(fileContents);
    const data = matterResult.data as MatterData;
    const content = matterResult.content;
    
    // Convert markdown to HTML
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
      ...projectFields(data, content),
      content: content.trim(),
      contentHtml: contentHtml,
    } as Project;
  } catch (error) {
    if (!isMissing(error)) console.error('Error finding project:', error);
    return null;
  }
}

