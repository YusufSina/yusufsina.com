import { initialsIcon } from "@/lib/initialsIcon";

// iOS home screen icon (/apple-icon.png). iOS rounds the corners itself, so the square is left full.
export const dynamic = "force-static";

export function GET() {
  return initialsIcon(180, false);
}
