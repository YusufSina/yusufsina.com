import { getAllPosts } from "../blog/getPosts";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, siteConfig, toDate } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getAllPosts();
  const lastBuild = posts[0] ? toDate(posts[0].date) : undefined;

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}/`;
      const pubDate = toDate(post.date);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt ?? "")}</description>${
        pubDate ? `\n      <pubDate>${pubDate.toUTCString()}</pubDate>` : ""
      }
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}/blog/</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>${siteConfig.lang}</language>${
      lastBuild ? `\n    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>` : ""
    }
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
