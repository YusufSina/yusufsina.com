import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DEFAULT_OG_IMAGE, EMPTY_SLUG, firstImage, toDate } from "@/lib/site";
import { getAllPosts, getPostBySlug } from "../getPosts";

// Generate static params for all blog posts
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getAllPosts();
  // A static export needs at least one page per dynamic route. With no posts yet,
  // render a single placeholder instead of failing the build. It is deleted from out/
  // after the build ("postbuild" in package.json).
  if (posts.length === 0) return [{ slug: EMPTY_SLUG }];
  return posts.map((post) => ({
    slug: post.slug,
  }));
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}/`;
  const image = firstImage(post.content) ?? DEFAULT_OG_IMAGE;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: toDate(post.date)?.toISOString(),
      images: [{ url: image, alt: post.title }],
    },
    twitter: {
      card: image === DEFAULT_OG_IMAGE ? "summary" : "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default async function BlogPost({ params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white dark:bg-gray-900">
      <div className="max-w-3xl w-full">
        <Link
          href="/blog"
          className="text-gray-700 dark:text-gray-300 hover:text-accent transition-colors inline-block mb-8"
        >
          ← Back to blog
        </Link>

        <article>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">
            {post.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">{post.date}</p>
          <div 
            className="markdown-content text-gray-700 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || post.excerpt }}
          />
        </article>
      </div>
    </main>
  );
}
