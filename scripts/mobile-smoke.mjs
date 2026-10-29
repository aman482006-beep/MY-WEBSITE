import { chromium } from "playwright";

const base = "http://127.0.0.1:4173/MY-WEBSITE";
const failures = [];
const pageErrors = [];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function runViewport(viewport) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport,
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => pageErrors.push(viewport.width + "px: " + error.message));

  try {
    await page.goto(base + "/", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => undefined);
    await page.waitForFunction(
      () => document.documentElement.classList.contains("aj-motion-enabled"),
      null,
      { timeout: 15000 },
    );
    // Allow independent client components to finish hydration before simulating a real tap.
    await page.waitForTimeout(400);

    const homeOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    assert(!homeOverflow, "Homepage has horizontal overflow at " + viewport.width + "px");

    // Verify a primary homepage CTA with a real touch, independently of the menu.
    await page.getByRole("link", { name: "Explore projects", exact: true }).tap();
    await page.waitForURL(/\/MY-WEBSITE\/projects\/$/, { timeout: 15000 });
    await page.getByRole("heading", { name: "Selected builds, experiments and tools." }).waitFor();
    await page.goto(base + "/", { waitUntil: "domcontentloaded" });
    await page.waitForFunction(
      () => document.documentElement.classList.contains("aj-motion-enabled"),
      null,
      { timeout: 15000 },
    );
    await page.waitForTimeout(250);

    const menuButton = page.locator(".aj-menu-toggle");
    assert(await menuButton.isVisible(), "Mobile menu button is not visible");
    await menuButton.evaluate((element) => {
      const button = element;
      for (const eventName of ["pointerdown", "touchend", "click"]) {
        button.addEventListener(eventName, () => {
          const key = "test" + eventName;
          button.dataset[key] = String(Number(button.dataset[key] || "0") + 1);
        }, true);
      }
    });
    await menuButton.tap();
    await page.waitForTimeout(250);
    const menuEvidence = await page.evaluate(() => {
      const button = document.querySelector(".aj-menu-toggle");
      const navigation = document.querySelector("#primary-navigation");
      const rect = button?.getBoundingClientRect();
      const hitTarget = rect ? document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2) : null;
      return {
        expanded: button?.getAttribute("aria-expanded"),
        navClass: navigation?.className,
        navVisibility: navigation ? getComputedStyle(navigation).visibility : null,
        pointerdown: button?.dataset.testpointerdown || "0",
        touchend: button?.dataset.testtouchend || "0",
        click: button?.dataset.testclick || "0",
        hitTarget: hitTarget instanceof HTMLElement ? hitTarget.outerHTML.slice(0, 180) : String(hitTarget),
      };
    });
    process.stdout.write("MENU DIAGNOSTIC " + viewport.width + "px " + JSON.stringify(menuEvidence) + "\\n");
    assert(menuEvidence.expanded === "true" && menuEvidence.navClass?.includes("is-open"),
      "Mobile navigation did not open: " + JSON.stringify(menuEvidence));

    await page.locator('#primary-navigation a[data-nav-href="/projects"]').tap();
    await page.waitForURL(/\/MY-WEBSITE\/projects\/$/, { timeout: 15000 });
    await page.getByRole("heading", { name: "Selected builds, experiments and tools." }).waitFor();

    const projectOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    assert(!projectOverflow, "Projects page has horizontal overflow at " + viewport.width + "px");

    const financeFilter = page.getByRole("button", { name: "Finance & data" });
    await financeFilter.tap();
    await page.getByRole("status").filter({ hasText: "1 project shown" }).waitFor();
    assert(await financeFilter.getAttribute("aria-pressed") === "true", "Project filter tap did not update its active state");

    await page.locator(".aj-menu-toggle").tap();
    await page.waitForFunction(
      () => document.querySelector("#primary-navigation")?.classList.contains("is-open"),
      null,
      { timeout: 5000 },
    );
    await page.locator('#primary-navigation a[data-nav-href="/contact"]').tap();
    await page.waitForURL(/\/MY-WEBSITE\/contact\/$/, { timeout: 15000 });
    await page.getByRole("heading", { name: "What would you like to discuss?" }).waitFor();

    const collaborations = page.locator(".aj-contact-category").filter({ hasText: "Project Collaborations" });
    await collaborations.tap();
    assert(await collaborations.getAttribute("aria-pressed") === "true", "Contact category did not respond to a touch tap");
    await page.getByText("Project Collaboration - Aman Jain", { exact: true }).waitFor();

    const draftLink = page.getByRole("link", { name: /Open email draft/i });
    assert((await draftLink.getAttribute("href") || "").startsWith("mailto:"), "Email draft button does not have a mailto destination");

    const copyEmailButton = page.getByRole("button", { name: /Copy email address/i });
    await copyEmailButton.tap();
    await page.getByRole("button", { name: /Email copied|Copy failed/i }).waitFor();

    const contactOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    assert(!contactOverflow, "Contact page has horizontal overflow at " + viewport.width + "px");

    process.stdout.write("PASS mobile touch smoke test at " + viewport.width + "×" + viewport.height + "\n");
  } finally {
    await context.close();
    await browser.close();
  }
}

for (const viewport of [{ width: 390, height: 844 }, { width: 360, height: 800 }]) {
  try {
    await runViewport(viewport);
  } catch (error) {
    failures.push(viewport.width + "px: " + (error instanceof Error ? error.message : String(error)));
  }
}

if (pageErrors.length) failures.push("Browser JavaScript errors:\n" + pageErrors.join("\n"));
if (failures.length) {
  process.stderr.write("MOBILE SMOKE TEST FAILED:\n- " + failures.join("\n- ") + "\n");
  process.exitCode = 1;
} else {
  process.stdout.write("All mobile interaction checks passed.\n");
}
