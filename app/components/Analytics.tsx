"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { AnalyticsConfig } from "@/site.config";
import { isSiteHost } from "@/lib/site";

declare global {
  interface Window {
    goatcounter?: { count?: (vars?: { path?: string }) => void };
    dataLayer?: unknown[];
  }
}

/**
 * Loads the analytics script chosen in site.config.ts. Nothing is loaded for
 * `provider: "none"`, when the ID is left empty, or when the page is not
 * served from the domain in `url` (local development, or a copy of this repo
 * published elsewhere without changing the config).
 */
export default function Analytics({ config }: { config: AnalyticsConfig }) {
  // Checked after mount: the HTML is built ahead of time, so the hostname is
  // only known in the browser.
  const [onSiteHost, setOnSiteHost] = useState(false);
  useEffect(() => setOnSiteHost(isSiteHost(window.location.hostname)), []);
  if (!onSiteHost) return null;

  switch (config.provider) {
    case "goatcounter":
      return config.code ? <GoatCounter code={config.code} /> : null;

    case "cloudflare":
      return config.token ? (
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: config.token, spa: true })}
          strategy="afterInteractive"
        />
      ) : null;

    case "umami":
      return config.websiteId ? (
        <Script
          src={config.src || "https://cloud.umami.is/script.js"}
          data-website-id={config.websiteId}
          strategy="afterInteractive"
        />
      ) : null;

    case "plausible":
      return config.src ? (
        <Script
          src={config.src}
          data-domain={config.domain || undefined}
          strategy="afterInteractive"
        />
      ) : null;

    case "google":
      return config.measurementId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.measurementId)}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(config.measurementId)});`}
          </Script>
        </>
      ) : null;

    default:
      return null;
  }
}

/**
 * GoatCounter counts the page it loads on, but not the pages reached through
 * client-side navigation (Next.js <Link>), so count those on route change.
 */
function GoatCounter({ code }: { code: string }) {
  const pathname = usePathname();
  const firstPath = useRef(pathname);

  useEffect(() => {
    if (pathname === firstPath.current) return;
    firstPath.current = "";
    // location.pathname (not `pathname`) so the path matches GoatCounter's own
    // first count, including the trailing slash from next.config.js.
    window.goatcounter?.count?.({ path: window.location.pathname });
  }, [pathname]);

  return (
    <Script
      src="https://gc.zgo.at/count.js"
      data-goatcounter={`https://${code}.goatcounter.com/count`}
      strategy="afterInteractive"
    />
  );
}
