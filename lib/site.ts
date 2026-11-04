import siteConfig from "@/site.config";

export { siteConfig };

export const SITE_URL = siteConfig.url.replace(/\/+$/, "");
export const SITE_NAME = siteConfig.name;
export const SITE_DESCRIPTION = siteConfig.description;
export const TWITTER_HANDLE = siteConfig.twitterHandle || undefined;
export const DEFAULT_OG_IMAGE = siteConfig.avatar;

/** Letters shown in the favicon: `icon.text`, or the first letters of the first and last word of the name. */
export function iconText(): string {
  if (siteConfig.icon.text) return siteConfig.icon.text;
  const words = siteConfig.name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toLocaleUpperCase(siteConfig.lang);
}

/** mailto: link for the email icon, or undefined when no address is set. */
export function mailtoHref(): string | undefined {
  const { address, subject, body } = siteConfig.email;
  if (!address) return undefined;
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${address}${query ? `?${query}` : ""}`;
}

/**
 * Slug of the placeholder page rendered when a section has no Markdown files yet.
 * A static export needs at least one page per dynamic route; the placeholder is
 * removed from out/ after the build (see "postbuild" in package.json).
 */
export const EMPTY_SLUG = "_empty";

/** True for "file or folder doesn't exist", which just means there is no content yet. */
export function isMissing(error: unknown): boolean {
  return (error as NodeJS.ErrnoException)?.code === "ENOENT";
}

/** Parse post/project dates ("January 2, 2026" or "2026-01-01") safely. */
export function toDate(value: string): Date | undefined {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

/** First markdown image in a document, used as a social preview image. */
export function firstImage(markdown?: string): string | undefined {
  const match = markdown?.match(/!\[[^\]]*\]\(([^)\s]+)/);
  return match?.[1];
}

/**
 * Turn a YouTube link that stands alone on its own line in Markdown into an
 * embedded player (youtube-nocookie.com, so no tracking cookies until play).
 * Works on the HTML from remark-html, where such a line becomes
 * `<p>https://youtu.be/ID</p>` or `<p><a href="…">…</a></p>`.
 */
export function embedYouTube(html: string): string {
  const url =
    String.raw`https?://(?:www\.|m\.)?(?:youtu\.be/|youtube\.com/(?:watch\?v=|shorts/|embed/))([\w-]{11})[^\s<"]*`;
  const pattern = new RegExp(
    String.raw`<p>(?:<a href="${url}">[^<]*</a>|${url})</p>`,
    "g"
  );
  return html.replace(pattern, (_match, linkId?: string, bareId?: string) => {
    const id = linkId ?? bareId;
    return (
      `<div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/${id}" ` +
      `title="YouTube video" loading="lazy" ` +
      `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ` +
      `referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`
    );
  });
}
