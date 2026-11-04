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
