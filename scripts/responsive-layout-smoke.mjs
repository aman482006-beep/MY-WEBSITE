import { chromium } from "playwright";

const base = "http://127.0.0.1:4173/MY-WEBSITE";
const routes = [
  { path: "/", selector: "main.aj-home" },
  { path: "/projects/", selector: "main.aj-projects-page" },
  { path: "/story/", selector: "main.aj-story-page" },
  { path: "/creator/", selector: "main.aj-creator-page" },
  { path: "/recruiters/", selector: "main.aj-recruiters-page" },
  { path: "/resources/", selector: "main.aj-resources-page" },
  { path: "/contact/", selector: "main.aj-contact-page" },
];
const viewports = [
  { name: "compact phone", width: 320, height: 740 },
  { name: "small phone", width: 360, height: 800 },
  { name: "standard phone", width: 390, height: 844 },
  { name: "large phone", width: 430, height: 932 },
  { name: "phone landscape", width: 844, height: 390 },
  { name: "small tablet", width: 700, height: 1024 },
  { name: "tablet breakpoint", width: 701, height: 1024 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "large tablet", width: 820, height: 1180 },
  { name: "tablet wide", width: 980, height: 900 },
  { name: "small laptop", width: 981, height: 768 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "HD laptop", width: 1280, height: 800 },
  { name: "standard laptop", width: 1366, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "wide desktop", width: 1920, height: 1080 },
];

const failures = [];
const pageErrors = [];
function assert(condition, message) {
  if (!condition) throw new Error(message);
}
function overlaps(a, b) {
  return a && b && a.width > 0 && b.width > 0 &&
    Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1;
}

const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.width <= 430,
      hasTouch: viewport.width <= 980,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => pageErrors.push(
      viewport.width + "px: " + error.message
    ));

    try {
      for (const route of routes) {
        await page.goto(base + route.path, { waitUntil: "domcontentloaded" });
        await page.locator(route.selector).waitFor({ state: "visible", timeout: 15000 });
        await page.evaluate(() => document.fonts.ready);

        const metrics = await page.evaluate(() => {
          const width = window.innerWidth;
          const doc = document.documentElement;
          const main = document.querySelector("main");
          const rect = (selector) => {
            const element = document.querySelector(selector);
            if (!element) return null;
            const box = element.getBoundingClientRect();
            return { left: box.left, right: box.right, width: box.width, height: box.height };
          };
          const selectors = [
            ".aj-project-card", ".aj-story-chapter-panel", ".aj-contact-compose",
            ".aj-contact-direct", ".aj-contact-social-card", ".aj-daily-newspaper",
            ".aj-resource-card", ".aj-resource-request", ".aj-creator-pillar",
            ".aj-video-card", ".aj-pillar", ".aj-sticky-note",
          ];
          const overflowing = [];
          for (const selector of selectors) {
            for (const element of document.querySelectorAll(selector)) {
              const box = element.getBoundingClientRect();
              if (box.width > 0 && box.height > 0 &&
                  element.scrollWidth > element.clientWidth + 3) {
                overflowing.push({
                  selector,
                  text: (element.innerText || "").trim().slice(0, 55),
                  clientWidth: element.clientWidth,
                  scrollWidth: element.scrollWidth,
                });
              }
            }
          }
          const containers = [...document.querySelectorAll("main .aj-container")].map((el) => {
            const box = el.getBoundingClientRect();
            return { left: box.left, right: box.right, width: box.width };
          });
          const nav = {
            brand: rect(".aj-brand"),
            links: rect(".aj-nav-links"),
            cta: rect(".aj-nav-cta"),
            toggle: rect(".aj-menu-toggle"),
          };
          const projectGrid = rect(".aj-projects-page .aj-project-grid");
          const projectGridColumns = projectGrid
            ? getComputedStyle(document.querySelector(".aj-projects-page .aj-project-grid")).gridTemplateColumns.split(" ").length
            : null;
          const fokus = rect(".aj-projects-page .aj-fokus-gallery");
          return {
            viewportWidth: width,
            docWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            main: main ? (() => {
              const box = main.getBoundingClientRect();
              return { left: box.left, right: box.right, width: box.width };
            })() : null,
            containers,
            overflowing,
            nav,
            projectGridColumns,
            fokusRatio: fokus && fokus.height > 0 ? fokus.width / fokus.height : null,
          };
        });

        assert(
          metrics.docWidth <= metrics.clientWidth + 1,
          route.path + " has page-level horizontal overflow at " + viewport.width +
            "px (" + metrics.docWidth + " > " + metrics.clientWidth + ")"
        );
        assert(
          !metrics.main || (metrics.main.left >= -1 && metrics.main.right <= viewport.width + 1),
          route.path + " main content extends beyond the viewport at " + viewport.width + "px: " +
            JSON.stringify(metrics.main)
        );
        const badContainer = metrics.containers.find(
          (container) => container.left < -1 || container.right > viewport.width + 1
        );
        assert(
          !badContainer,
          route.path + " page container is outside the viewport at " + viewport.width + "px: " +
            JSON.stringify(badContainer)
        );
        assert(
          metrics.overflowing.length === 0,
          route.path + " has clipped card content at " + viewport.width + "px: " +
            JSON.stringify(metrics.overflowing.slice(0, 3))
        );

        if (viewport.width <= 700) {
          assert(metrics.nav.toggle?.width > 0, "Mobile menu toggle is missing at " + viewport.width + "px");
          assert(!overlaps(metrics.nav.brand, metrics.nav.toggle),
            "Mobile logo and menu button overlap at " + viewport.width + "px");
        } else {
          assert(metrics.nav.links?.width > 0 && metrics.nav.cta?.width > 0,
            "Desktop navigation is not visible at " + viewport.width + "px");
          assert(!overlaps(metrics.nav.brand, metrics.nav.links),
            "Desktop logo overlaps navigation links at " + viewport.width + "px");
          assert(!overlaps(metrics.nav.links, metrics.nav.cta),
            "Desktop navigation links overlap the CTA at " + viewport.width + "px");
          assert(metrics.nav.links.left >= -1 && metrics.nav.cta.right <= viewport.width + 1,
            "Desktop navigation extends beyond the viewport at " + viewport.width + "px");
        }

        if (route.path === "/projects/") {
          assert(metrics.projectGridColumns === (viewport.width <= 700 ? 1 : 2),
            "Unexpected project grid columns at " + viewport.width + "px: " + metrics.projectGridColumns);
          if (viewport.width <= 700) {
            assert(metrics.fokusRatio && Math.abs(metrics.fokusRatio - 16 / 9) < 0.08,
              "Fokus preview is not using its expected mobile aspect ratio at " +
              viewport.width + "px: " + metrics.fokusRatio);
          }
        }
      }
      process.stdout.write(
        "PASS responsive layout: " + viewport.name + " (" +
        viewport.width + "×" + viewport.height + ") across " +
        routes.length + " routes\n"
      );
    } catch (error) {
      failures.push(
        viewport.width + "×" + viewport.height + ": " +
        (error instanceof Error ? error.message : String(error))
      );
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}

if (pageErrors.length) failures.push("Browser JavaScript errors:\n" + pageErrors.join("\n"));
if (failures.length) {
  process.stderr.write("RESPONSIVE LAYOUT AUDIT FAILED:\n- " + failures.join("\n- ") + "\n");
  process.exitCode = 1;
} else {
  process.stdout.write("All responsive viewport and route checks passed.\n");
}
