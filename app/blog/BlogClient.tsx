"use client";

import Link from "next/link";
import { useState } from "react";

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

interface BlogClientProps {
  initialPosts: BlogPost[];
  postsPerPage: number;
}

export default function BlogClient({ initialPosts, postsPerPage }: BlogClientProps) {
  const [displayedPosts, setDisplayedPosts] = useState(postsPerPage);
  const visiblePosts = initialPosts.slice(0, displayedPosts);
  const hasMore = displayedPosts < initialPosts.length;

  const loadMore = () => {
    setDisplayedPosts((prev) => Math.min(prev + postsPerPage, initialPosts.length));
  };

  return (
    <>
      {/* Blog Posts */}
      <div className="space-y-8 mb-12">
        {visiblePosts.map((post) => (
          <article
            key={post.id}
            className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-accent transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{post.date}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-accent hover:underline inline-flex items-center gap-2"
            >
              Read more
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-accent rounded-lg text-gray-700 dark:text-gray-300 hover:bg-accent hover:text-white transition-colors"
          >
            Load more
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Show message when all posts are loaded */}
      {!hasMore && initialPosts.length > 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          All posts loaded
        </div>
      )}
    </>
  );
}

