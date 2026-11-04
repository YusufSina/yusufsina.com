import { ImageResponse } from "next/og";
import { iconText, siteConfig } from "@/lib/site";

/** Square icon with the site owner's initials, rendered once at build time. */
export function initialsIcon(size: number, rounded: boolean) {
  const text = iconText();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: siteConfig.icon.background,
          color: siteConfig.icon.color,
          borderRadius: rounded ? size * 0.22 : 0,
          fontSize: size * (text.length > 2 ? 0.38 : 0.5),
          fontWeight: 700,
          letterSpacing: -size * 0.02,
        }}
      >
        {text}
      </div>
    ),
    { width: size, height: size },
  );
}
