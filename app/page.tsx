import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "./blog/getPosts";
import SocialIcon, { SOCIAL_LABELS } from "./components/SocialIcon";
import { siteConfig, mailtoHref } from "@/lib/site";

export default async function Home() {
  // Get posts directly at build time (no API needed)
  const allPosts = await getAllPosts();
  const latestPosts = allPosts.slice(0, 3);
  const mailto = mailtoHref();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white dark:bg-gray-900">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700">
            <Image
              src={siteConfig.avatar}
              alt={siteConfig.name}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-gray-100">
          {siteConfig.name}
        </h1>

        {/* About Me Text */}
        <div className="space-y-4 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {siteConfig.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-6 pt-4">
          {siteConfig.socials.map((social) => (
            <a
              key={social.url}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-accent transition-colors"
              aria-label={SOCIAL_LABELS[social.platform]}
            >
              <SocialIcon platform={social.platform} />
            </a>
          ))}
          {mailto && (
            <a
              href={mailto}
              className="text-gray-700 dark:text-gray-300 hover:text-accent transition-colors"
              aria-label={SOCIAL_LABELS.email}
            >
              <SocialIcon platform="email" />
            </a>
          )}
        </div>

        {/* See My Work Button */}
        <div className="pt-8">
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 px-6 py-3 border-2 border-accent rounded-lg text-gray-700 dark:text-gray-300 hover:bg-accent hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5 text-accent group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            See my work
          </Link>
        </div>

        {/* Blog Section */}
        {latestPosts.length > 0 && (
          <div className="pt-16 mt-16 border-t border-gray-200 dark:border-gray-700">
            <div className="text-left space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100">
                  Latest Articles
                </h2>
                <Link
                  href="/blog"
                  className="text-accent hover:underline text-sm font-medium"
                >
                  View all →
                </Link>
              </div>
              
              <div className="space-y-6">
                {latestPosts.map((post) => (
                  <article
                    key={post.id}
                    className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.date}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-accent hover:underline inline-flex items-center gap-2 text-sm"
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
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
