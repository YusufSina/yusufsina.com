import type { MetadataRoute } from "next";
import { getAllPosts } from "./blog/getPosts";
import { getAllProjects } from "./work/getProjects";
import { SITE_URL, toDate } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getAllPosts(), getAllProjects()]);
  const latestPost = posts[0] ? toDate(posts[0].date) : undefined;

  return [
    { url: `${SITE_URL}/`, lastModified: latestPost, priority: 1 },
    { url: `${SITE_URL}/blog/`, lastModified: latestPost, priority: 0.8 },
    { url: `${SITE_URL}/work/`, priority: 0.8 },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}/`,
      lastModified: toDate(post.date),
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}/`,
      lastModified: toDate(project.date),
      priority: 0.6,
    })),
  ];
}
