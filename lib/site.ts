export const SITE_URL = "https://yusufsina.com";
export const SITE_NAME = "Yusuf Sina Yildiz";
export const SITE_DESCRIPTION =
  "Engineer working at the intersection of engineering, finance, and product. Writing about backend systems, fintech, crypto, and building products.";
export const TWITTER_HANDLE = "@0xyusufsina";
export const DEFAULT_OG_IMAGE = "/images/yusufsinayildiz.jpg";

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
