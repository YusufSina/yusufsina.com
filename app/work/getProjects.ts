import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';

export interface Project {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  content?: string;
  contentHtml?: string;
  link?: string;
}

interface MatterData {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  slug?: string;
  link?: string;
  [key: string]: unknown;
}

// Get projects directory - works in both dev and production
const projectsDirectory = join(process.cwd(), 'app', 'work', 'projects');

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
            link: data.link,
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
    console.error('Error reading projects:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
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
      link: data.link,
      content: content.trim(),
      contentHtml: contentHtml,
    } as Project;
  } catch (error) {
    console.error('Error finding project:', error);
    return null;
  }
}

