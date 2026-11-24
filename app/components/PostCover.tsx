import Link from "next/link";

/** Emoji at the start of a title ("📚 Books of 2025" → "📚"), if there is one. */
function leadingEmoji(title: string): string | undefined {
  return title.match(/^\p{Extended_Pictographic}(?:️|‍\p{Extended_Pictographic})*/u)?.[0];
}

interface PostCoverProps {
  href: string;
  title: string;
  cover?: string;
  className?: string;
}

/**
 * Thumbnail for a post in a list, styled like the project covers on the Work page.
 * Uses the post's cover image; without one, shows the emoji from the start of the
 * title (or the title's first letter) on a plain tile, so every row lines up.
 */
export default function PostCover({ href, title, cover, className = "" }: PostCoverProps) {
  const fallback = leadingEmoji(title) ?? title.trim().charAt(0).toLocaleUpperCase();

  return (
    <Link
      href={href}
      className={`block shrink-0 aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 ${className}`}
      tabIndex={-1}
      aria-hidden="true"
    >
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-5xl font-serif font-bold text-gray-400 dark:text-gray-500 transition-transform duration-300 hover:scale-105 select-none">
          {fallback}
        </span>
      )}
    </Link>
  );
}
