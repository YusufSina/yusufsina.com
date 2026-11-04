/**
 * Everything personal about the site lives in this file.
 *
 * Using this repo as a template? Change the values below, replace the
 * Markdown files in app/blog/posts/ and app/work/projects/, and put your own
 * photo in public/images/. Nothing else needs editing.
 */

export type SocialPlatform = "x" | "linkedin" | "github" | "website";

/**
 * Visitor statistics. Pick one provider, or "none" to send nothing.
 * Each provider shows its numbers in its own dashboard; see "Analytics" in readme.md.
 */
export type AnalyticsConfig =
  | { provider: "none" }
  /** GoatCounter: `code` is the part before .goatcounter.com, e.g. "ada" for ada.goatcounter.com. */
  | { provider: "goatcounter"; code: string }
  /** Cloudflare Web Analytics: the token from the JS snippet Cloudflare gives you. */
  | { provider: "cloudflare"; token: string }
  /** Umami: the website ID. Set `src` only if you host Umami yourself. */
  | { provider: "umami"; websiteId: string; src?: string }
  /**
   * Plausible: `src` is the script URL from your Plausible site settings
   * (e.g. "https://plausible.io/js/pa-XXXX.js"). Older setups that use
   * "https://plausible.io/js/script.js" also need `domain`, e.g. "ada.dev".
   */
  | { provider: "plausible"; src: string; domain?: string }
  /** Google Analytics 4: the measurement ID, e.g. "G-XXXXXXXXXX". It sets cookies, so you may need a consent banner. */
  | { provider: "google"; measurementId: string };

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
  /** Shown under the heading of the Blog and Work pages, and used as their meta description. */
  blog: { description: string };
  work: { description: string };
  /** Visitor statistics. Set `{ provider: "none" }` to turn them off. */
  analytics: AnalyticsConfig;
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
  analytics: { provider: "goatcounter", code: "yusufsina" },
};

export default siteConfig;
