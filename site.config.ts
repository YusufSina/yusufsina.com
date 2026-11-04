/**
 * Everything personal about the site lives in this file.
 *
 * Using this repo as a template? Change the values below, replace the
 * Markdown files in app/blog/posts/ and app/work/projects/, and put your own
 * photo in public/images/. Nothing else needs editing.
 */

export type SocialPlatform = "x" | "linkedin" | "github" | "website";

export type SiteConfig = {
  /** Full URL the site is served from, without a trailing slash. */
  url: string;
  /** Your name. Used as the page heading, the site title and for the favicon initials. */
  name: string;
  /** One or two sentences about you. Used in search results, link previews and RSS. */
  description: string;
  /** Paragraphs shown under your name on the home page. */
  bio: string[];
  /** Profile photo, relative to public/. Also the default link preview image. */
  avatar: string;
  /** Language of the site, as an HTML lang code. */
  lang: string;
  /** Open Graph locale, e.g. "en_US" or "tr_TR". */
  locale: string;
  /** X (Twitter) handle with the @, used for link preview cards. Leave empty if you have none. */
  twitterHandle: string;
  /** Links shown as icons on the home page, in this order. */
  socials: { platform: SocialPlatform; url: string }[];
  /** The envelope icon on the home page. Leave address empty to hide it. */
  email: { address: string; subject?: string; body?: string };
  /** Favicon: letters and colours. Letters default to the initials of `name`. */
  icon: { text?: string; background: string; color: string };
  /**
   * GitHub repository linked from the small "Source" button in the bottom-right corner of the home page.
   * Leave empty to hide the button.
   */
  sourceUrl: string;
  /** Intro text for the list pages. */
  blog: { description: string };
  work: { description: string };
};

const siteConfig: SiteConfig = {
  url: "https://yusufsina.com",
  name: "Yusuf Sina Yildiz",
  description:
    "Engineer working at the intersection of engineering, finance, and product. Writing about backend systems, fintech, crypto, and building products.",
  bio: [
    "I work at the intersection of engineering, finance, and product. My focus is on building scalable backend systems — especially in fintech and crypto — while keeping the product simple for users and operators.",
    "Engineer by craft, entrepreneur by intent.",
  ],
  avatar: "/images/yusufsinayildiz.jpg",
  lang: "en",
  locale: "en_US",
  twitterHandle: "@0xyusufsina",
  socials: [
    { platform: "x", url: "https://x.com/0xyusufsina" },
    { platform: "linkedin", url: "https://linkedin.com/in/yusufsina" },
    { platform: "github", url: "https://github.com/YusufSina" },
  ],
  email: {
    address: "yusufsinayildiz@gmail.com",
    subject: "Getting in touch via your website",
    body: "Hi Yusuf, I'm interested in talking to you about...",
  },
  icon: { background: "#111827", color: "#ffffff" },
  sourceUrl: "https://github.com/YusufSina/yusufsina.com",
  blog: { description: "Articles and thoughts on engineering, finance, and product." },
  work: { description: "Projects I've built and worked on." },
};

export default siteConfig;
