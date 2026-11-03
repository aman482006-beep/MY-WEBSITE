import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const projects = [
  {
    slug: "ai-personal-finance-manager",
    url: "https://aman482006-beep.github.io/AI-Personal-Finance-Manager/",
    expectedTitle: "Moneta",
    minTextLength: 180,
  },
  {
    slug: "automated-financial-modelling-agent",
    url: "https://aman482006-beep.github.io/Automated-Financial-Modelling-Agent/",
    expectedTitle: "ModelForge",
    minTextLength: 180,
  },
  {
    slug: "ai-powered-quantitative-trading-system",
    url: "https://aman482006-beep.github.io/AI-Powered-Quantitative-Trading-System/",
    expectedTitle: "QuantLab",
    minTextLength: 180,
  },
];

const outputDir = resolve("out/project-previews");
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 2,
  colorScheme: "light",
});
page.setDefaultNavigationTimeout(45000);
page.setDefaultTimeout(15000);

let captured = 0;
try {
  for (const project of projects) {
    try {
      const response = await page.goto(project.url, { waitUntil: "domcontentloaded" });
      if (!response || !response.ok()) {
        console.warn(`SKIPPED ${project.slug}: preview returned HTTP ${response?.status() ?? "no response"}`);
        continue;
      }

      await page.waitForLoadState("load", { timeout: 20000 }).catch(() => {});
      await page.evaluate(async () => { await document.fonts.ready; return true; });
      await page.waitForTimeout(1800);

      const details = await page.evaluate(() => ({
        title: document.title,
        textLength: document.body?.innerText?.trim().length ?? 0,
        width: document.documentElement.scrollWidth,
      }));

      if (!details.title.toLowerCase().includes(project.expectedTitle.toLowerCase()) ||
          details.textLength < project.minTextLength) {
        console.warn(`SKIPPED ${project.slug}: page did not render as expected (${JSON.stringify(details)})`);
        continue;
      }

      const destination = resolve(outputDir, `${project.slug}.jpg`);
      await page.screenshot({
        path: destination,
        type: "jpeg",
        quality: 92,
        animations: "disabled",
        caret: "hide",
        fullPage: false,
      });

      const dimensions = await page.evaluate(() => ({
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
      }));

      if (dimensions.viewportWidth * dimensions.devicePixelRatio !== 3840 ||
          dimensions.viewportHeight * dimensions.devicePixelRatio !== 2160) {
        throw new Error(`Unexpected screenshot dimensions: ${JSON.stringify(dimensions)}`);
      }

      captured += 1;
      console.log(`CAPTURED ${project.slug} — 3840 × 2160 (4K), HTTP ${response.status()}`);
    } catch (error) {
      console.warn(`SKIPPED ${project.slug}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
} finally {
  await browser.close();
}

console.log(`PROJECT_PREVIEW_CAPTURE_RESULT: ${captured}/${projects.length} captured at 4K.`);
