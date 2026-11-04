import { siteConfig } from "@/lib/site";
import SocialIcon from "./SocialIcon";

/** Small fixed button linking to the site's source code (`sourceUrl` in site.config.ts). */
export default function SourceLink() {
  if (!siteConfig.sourceUrl) return null;
  return (
    <a
      href={siteConfig.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-10 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200/90 dark:bg-gray-800/90 backdrop-blur text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      aria-label="View the source code of this site on GitHub"
      title="View the source code on GitHub"
    >
      <SocialIcon platform="github" className="w-4 h-4" />
      <span>Source</span>
    </a>
  );
}
