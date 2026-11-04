import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "./blog/getPosts";

export default async function Home() {
  // Get posts directly at build time (no API needed)
  const allPosts = await getAllPosts();
  const latestPosts = allPosts.slice(0, 3);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white dark:bg-gray-900">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700">
            <Image 
              src="/images/yusufsinayildiz.jpg" 
              alt="Yusuf Sina" 
              width={128} 
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-gray-100">
          Yusuf Sina Yildiz
        </h1>

        {/* About Me Text */}
        <div className="space-y-4 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            I work at the intersection of engineering, finance, and product.
            My focus is on building scalable backend systems — especially in fintech and crypto — while keeping the product simple for users and operators.
          </p>
          <p>
            Engineer by craft, entrepreneur by intent.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-6 pt-4">
          <a
            href="https://x.com/0xyusufsina"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-accent transition-colors"
            aria-label="X (Twitter)"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/yusufsina"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://github.com/YusufSina"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="mailto:yusufsinayildiz@gmail.com?subject=Getting in touch via your website&body=Hi Yusuf, I'm interested in talking to you about..."
            className="text-gray-700 dark:text-gray-300 hover:text-accent transition-colors"
            aria-label="Email"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
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
