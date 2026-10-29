import "server-only";

import { existsSync } from "node:fs";
import { join } from "node:path";

export const currentlyOpenTo =
  "Currently exploring internships in finance, fintech and business or financial analysis.";

export const resumePdfPath = "/Aman-Jain-Resume.pdf";

export function hasResumePdf(): boolean {
  return existsSync(join(process.cwd(), "public", "Aman-Jain-Resume.pdf"));
}
