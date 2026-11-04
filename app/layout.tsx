import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  TWITTER_HANDLE,
  DEFAULT_OG_IMAGE,
  siteConfig,
} from "@/lib/site";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/rss.xml", title: `${SITE_NAME} - Blog` }] },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: siteConfig.locale,
    images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary",
    creator: TWITTER_HANDLE,
    site: TWITTER_HANDLE,
  },
  // Generated from the initials in site.config.ts (see app/icon.png/route.tsx).
  icons: {
    icon: { url: "/icon.png", type: "image/png", sizes: "64x64" },
    apple: { url: "/apple-icon.png", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.lang} className={poppins.variable}>
      <body className={poppins.className}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}

