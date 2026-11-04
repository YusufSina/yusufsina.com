import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Yusuf Sina - Portfolio",
  description: "Personal portfolio website",
  icons: {
    icon: "/images/icon.png",
    apple: "/images/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={poppins.className}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}

