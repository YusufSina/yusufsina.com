import { initialsIcon } from "@/lib/initialsIcon";

// Browser tab icon (/icon.png): the initials from site.config.ts, drawn at build time.
export const dynamic = "force-static";

export function GET() {
  return initialsIcon(64, true);
}
