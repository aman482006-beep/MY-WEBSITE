import { chromium } from "playwright";

const base = "http://127.0.0.1:4173/MY-WEBSITE";
const failures = [];
const pageErrors = [];
let currentStage = "homepage initial load";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function runViewport(viewport) {
  currentStage = "homepage initial load";
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport,
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const storyAssetNetwork = [];
  page.on("pageerror", (error) => pageErrors.push(viewport.width + "px: " + error.message));
  page.on("requestfailed", (request) => {
    if (request.url().includes("aman-story-avatar.webp")) {
      storyAssetNetwork.push({ type: "requestfailed", url: request.url(), error: request.failure()?.errorText });
    }
  });
  page.on("response", (response) => {
    if (response.url().includes("aman-story-avatar.webp")) {
      storyAssetNetwork.push({ type: "response", url: response.url(), status: response.status() });
    }
  });

  try {
    await page.goto(base + "/", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => undefined);
    // Wait for a fully loaded document and give independent client components
    // a moment to hydrate; the global reveal class is not a page-readiness signal.
    await page.waitForFunction(() => document.readyState === "complete", null, { timeout: 10000 });
    await page.waitForTimeout(450);
    // The homepage portrait and the handwritten status note must both render.
    const portrait = page.locator(".aj-profile-image");
    const portraitSource = await portrait.getAttribute("src");
    assert(
      portraitSource?.includes("aman-profile-4k.avif") || portraitSource?.includes("%2Faman-profile-4k.avif"),
      "Homepage portrait is not using the new local profile image",
    );
    const portraitLoaded = await portrait.evaluate((image) => image.complete && image.naturalWidth > 0);
    assert(portraitLoaded, "Homepage portrait image failed to load");
    const currentlyNote = page.locator(".aj-currently-note");
    assert(await currentlyNote.isVisible(), "Homepage CURRENTLY sticky note is not visible");
    const currentlyCopy = (await currentlyNote.innerText()).replace(/\\s+/g, " ");
    for (const phrase of ["CURRENTLY", "Following the curiosity", "Building as I go", "Tabs: too many"]) {
      assert(currentlyCopy.includes(phrase), "Homepage status note is missing: " + phrase);
    }


    // The My Story preview uses a single, section-scoped window scene.
    const storyWindow = page.locator(".aj-story-preview-window");
    await storyWindow.scrollIntoViewIfNeeded();
    assert(await storyWindow.count() === 1, "Homepage My Story window is missing");
    assert(await storyWindow.locator(".aj-story-cloud").count() === 3, "Moving-sky clouds are missing");
    assert(await storyWindow.locator(".aj-story-window-shutter").count() === 2, "The opening window needs two shutters");
    currentStage = "load transparent portrait inside My Story window";
    const storyAvatarImage = page.locator(".aj-story-window-person img");
    await storyAvatarImage.waitFor({ state: "attached" });
    const storyAvatarSource = await storyAvatarImage.getAttribute("src");
    assert(
      storyAvatarSource?.includes("aman-story-photo.png"),
      "My Story window is not using the transparent photo cut-out: " + storyAvatarSource,
    );
    await storyAvatarImage.evaluate((image) => { image.loading = "eager"; });
    await page.waitForFunction(() => {
      const image = document.querySelector(".aj-story-window-person img");
      return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0;
    }, null, { timeout: 15000 }).catch(async () => {
      const imageDetails = await storyAvatarImage.evaluate((image) => ({
        src: image.getAttribute("src"),
        currentSrc: image.currentSrc,
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        loading: image.loading,
      }));
      throw new Error("Story portrait failed to load: " + JSON.stringify({ image: imageDetails, network: storyAssetNetwork }));
    });
    const wavingArm = storyWindow.locator(".aj-story-wave-arm");
    const firstWaveTransform = await wavingArm.evaluate((element) => getComputedStyle(element).transform);
    await page.waitForTimeout(420);
    const secondWaveTransform = await wavingArm.evaluate((element) => getComputedStyle(element).transform);
    assert(
      firstWaveTransform !== secondWaveTransform,
      "The photo-based character's arm is not continuously waving",
    );

    currentStage = "open the My Story window when it enters view";
    await page.waitForFunction(
      () => document.querySelector(".aj-story-window-scene")?.getAttribute("data-window-open") === "true",
      null,
      { timeout: 8000 },
    );
    const windowMotion = await storyWindow.locator(".aj-story-window-shutter-left").evaluate((element) => ({
      transitionDuration: getComputedStyle(element).transitionDuration,
      transform: getComputedStyle(element).transform,
    }));
    assert(
      windowMotion.transitionDuration.split(",").some((duration) => {
        const raw = duration.trim();
        const parsed = Number.parseFloat(raw);
        const seconds = raw.endsWith("ms") ? parsed / 1000 : parsed;
        return seconds >= 0.8 && seconds < 0.9;
      }),
      "The My Story window opening should be an 800–899ms transform transition: " + JSON.stringify(windowMotion),
    );
    await page.evaluate(() => window.scrollTo(0, 0));

    // Check the global external-link policy: external websites open separately,
    // while routes inside this portfolio stay in the current tab.
    await page.evaluate(() => {
      const external = document.createElement("a");
      external.id = "external-link-smoke-test";
      external.href = "https://example.com/";
      external.textContent = "External link test";
      external.style.cssText = "position:fixed;z-index:999999;top:8px;left:8px;padding:12px;background:#fff;color:#000";
      const internal = document.createElement("a");
      internal.id = "internal-link-smoke-test";
      internal.href = "/MY-WEBSITE/resources/";
      internal.textContent = "Internal link test";
      internal.style.cssText = "position:fixed;z-index:999999;top:60px;left:8px;padding:12px;background:#fff;color:#000";
      document.body.append(external, internal);
      window.__externalLinkOpenCalls = [];
      window.__originalWindowOpen = window.open;
      window.open = (url, target, features) => {
        window.__externalLinkOpenCalls.push({ url: String(url), target, features });
        return null;
      };
    });
    await page.waitForFunction(() =>
      document.querySelector("#external-link-smoke-test")?.getAttribute("target") === "_blank" &&
      document.querySelector("#internal-link-smoke-test")?.hasAttribute("target") === false
    );
    await page.locator("#external-link-smoke-test").tap();
    const externalLinkEvidence = await page.evaluate(() => ({
      calls: window.__externalLinkOpenCalls || [],
      currentPath: window.location.pathname,
      internalTarget: document.querySelector("#internal-link-smoke-test")?.getAttribute("target") ?? null,
    }));
    assert(externalLinkEvidence.calls.length === 1, "External link did not invoke the new-tab handler");
    assert(externalLinkEvidence.calls[0].url === "https://example.com/", "External link opened an unexpected URL");
    assert(externalLinkEvidence.calls[0].target === "_blank", "External link was not sent to a new tab");
    assert(externalLinkEvidence.currentPath === "/MY-WEBSITE/", "External link changed the current website tab");
    assert(externalLinkEvidence.internalTarget === null, "Internal link was incorrectly marked for a new tab");
    await page.evaluate(() => {
      window.open = window.__originalWindowOpen;
      document.querySelector("#external-link-smoke-test")?.remove();
      document.querySelector("#internal-link-smoke-test")?.remove();
    });

    // Exercise the five Curiosity Lab modes, not just their visible shell.
    const lab = page.locator("#curiosity-lab");
    await lab.scrollIntoViewIfNeeded();
    await page.locator("#ce-tab-map").waitFor({ state: "visible" });
    const financeNode = page.getByRole("button", { name: "Explore Finance: how money moves" });
    await financeNode.tap();
    assert((await page.locator(".ce-interest-detail h3").textContent())?.startsWith("Finance"),
      "Interest map did not update its detail card");
    await page.locator("#ce-tab-idea").tap();
    await page.getByLabel("First ingredient").selectOption("markets");
    await page.getByLabel("Second ingredient").selectOption("content");
    await page.waitForFunction(
      () => document.querySelector(".ce-idea-card h4")?.textContent?.includes("market postcard"),
      null,
      { timeout: 5000 },
    );
    await page.locator("#ce-tab-journey").tap();
    await page.locator(".ce-journey-stop").nth(1).tap();
    assert((await page.locator(".ce-journey-detail h4").textContent())?.startsWith("Go deeper"),
      "Journey map did not change its selected stop");
    await page.locator("#ce-tab-signal").tap();
    const signalOptions = page.locator(".ce-signal-option");
    await signalOptions.nth(1).tap();
    assert((await page.locator(".ce-signal-feedback > strong").textContent()) === "You found the signal.",
      "Signal Room did not explain the fintech unit-economics answer");
    await page.locator(".ce-signal-card-footer button").tap();
    await signalOptions.nth(0).tap();
    assert((await page.locator(".ce-signal-feedback > strong").textContent()) === "You found the signal.",
      "Signal Room did not explain the cash-flow answer");
    await page.locator(".ce-signal-card-footer button").tap();
    await signalOptions.nth(1).tap();
    assert((await page.locator(".ce-signal-feedback > strong").textContent()) === "You found the signal.",
      "Signal Room did not explain the creator-conversion answer");
    await page.locator(".ce-signal-card-footer button").tap();
    assert((await page.locator(".ce-signal-final-score > strong").textContent())?.includes("3"),
      "Signal Room did not show the completed scorecard");
    await page.locator(".ce-signal-finish button").tap();
    assert((await page.locator(".ce-signal-brief h4").textContent())?.includes("app is growing"),
      "Signal Room restart did not reset to the first case");
    await page.locator("#ce-tab-desk").tap();
    await page.getByRole("button", { name: "Shuffle the desk" }).tap();
    await page.getByRole("button", { name: "Open note details: Stay curious." }).tap();
    const noteWindow = page.getByRole("dialog", { name: "Stay curious." });
    await noteWindow.waitFor({ state: "visible" });
    await noteWindow.getByRole("button", { name: "Close note details" }).tap();
    await noteWindow.waitFor({ state: "hidden" });
    await page.getByRole("button", { name: "Find the secret" }).tap();
    const secretMessage = (await page.locator(".ce-secret-card p").textContent()) || "";
    assert(
      ["You found the extra tab.", "Tiny reminder:", "Plot twist:"].some((message) => secretMessage.startsWith(message)),
      "Easter egg did not reveal one of its three messages: " + secretMessage,
    );
    assert(await page.locator(".ce-desk-note").count() === 3, "Digital desk should show three notes");

    const homeOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    assert(!homeOverflow, "Homepage has horizontal overflow at " + viewport.width + "px");

    // The four inner-page introduction panels should be centred at every tested
    // viewport, not merely constrained to a width while remaining left-aligned.
    for (const route of ["/creator/", "/recruiters/", "/resources/", "/contact/"]) {
      await page.goto(base + route, { waitUntil: "domcontentloaded" });
      const intro = page.locator(".aj-inner-page > .aj-container > .aj-inner-heading");
      await intro.waitFor({ state: "visible" });
      const alignment = await intro.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          midpoint: rect.left + rect.width / 2,
          viewportMidpoint: window.innerWidth / 2,
          textAlign: style.textAlign,
          width: rect.width,
        };
      });
      assert(
        Math.abs(alignment.midpoint - alignment.viewportMidpoint) <= 2,
        route + " introduction panel is not horizontally centred: " + JSON.stringify(alignment),
      );
      assert(alignment.textAlign === "center", route + " introduction text is not centred");
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      assert(!overflow, route + " has horizontal overflow at " + viewport.width + "px");
    }
    await page.goto(base + "/", { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.readyState === "complete", null, { timeout: 10000 });
    await page.waitForTimeout(350);

    // Verify a primary homepage CTA with a real touch, independently of the menu.
    await page.getByRole("link", { name: /See what I’ve built/ }).tap();
    currentStage = "navigate to Projects from the home-page button";
    currentStage = "navigate to Projects from the mobile menu";
    await page.waitForURL(/\/MY-WEBSITE\/projects\/$/, { timeout: 15000 });
    await page.getByRole("heading", { name: "Things I've built." }).waitFor();
    await page.goto(base + "/", { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.readyState === "complete", null, { timeout: 10000 });
    await page.waitForTimeout(350);

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
    await page.getByRole("heading", { name: "Things I've built." }).waitFor();

    const projectOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    assert(!projectOverflow, "Projects page has horizontal overflow at " + viewport.width + "px");

    await page.getByRole("heading", { name: "Fokus" }).waitFor();
    assert(await page.getByRole("link", { name: /View on GitHub/i }).isVisible(), "Fokus GitHub link is missing");
    assert(await page.getByRole("link", { name: /Get Fokus/i }).isVisible(), "Fokus product link is missing");
    assert(await page.locator(".aj-project-card").count() === 4, "Projects section should show Fokus and the three active AI/finance builds");
    for (const projectTitle of ["AI Personal Finance Manager", "Automated Financial Modelling Agent", "AI-Powered Quantitative Trading System"]) {
      await page.getByRole("heading", { name: projectTitle, exact: true }).waitFor();
    }

    // Verify the nine-chapter story journey and its scroll-driven reveal states.
    await page.goto(base + "/story/", { waitUntil: "domcontentloaded" });
    await page.locator(".aj-story-journey-intro h1").waitFor({ state: "visible" });
    assert(await page.locator(".aj-story-scene").count() === 8, "Explore My Story should contain eight chapters");
    assert(await page.locator(".aj-story-progress").isVisible(), "Story progress indicator is missing");
    const chapterPortrait = page.locator(".aj-story-portrait-large img");
    await chapterPortrait.evaluate((image) => { image.loading = "eager"; });
    await page.waitForFunction(() => {
      const image = document.querySelector(".aj-story-portrait-large img");
      return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0;
    }, null, { timeout: 10000 });
    await page.locator(".aj-story-scene").nth(1).scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () => document.querySelectorAll('.aj-story-scene[data-revealed="true"]').length >= 2,
      null,
      { timeout: 8000 },
    );
    assert(
      (await page.locator(".aj-story-scene").nth(1).locator("h2").textContent())?.includes("sharing one result"),
      "The first-post chapter is missing its story copy",
    );
    const postButton = page.locator(".aj-story-post-button");
    await postButton.scrollIntoViewIfNeeded();
    await postButton.tap();
    assert((await postButton.textContent())?.includes("POSTED"), "The first-post interaction did not update its state");

    const buildFlipCard = page.locator(".aj-story-build-flip-card").first();
    await buildFlipCard.scrollIntoViewIfNeeded();
    await buildFlipCard.tap();
    assert(await buildFlipCard.getAttribute("aria-pressed") === "true", "The build card did not flip when tapped");
    await buildFlipCard.tap();
    assert(await buildFlipCard.getAttribute("aria-pressed") === "false", "The build card did not flip back when tapped");

    const finalChapter = page.locator(".aj-story-scene").nth(7);
    await finalChapter.scrollIntoViewIfNeeded();
    assert(
      (await finalChapter.locator(".aj-story-lesson p").textContent())?.includes("Being useful matters more than looking impressive."),
      "The eighth and final chapter is missing its takeaway",
    );
    assert(await page.locator(".aj-story-scene").count() === 8, "An extra story chapter is still rendered");
    const storyOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    assert(!storyOverflow, "Explore My Story has horizontal overflow at " + viewport.width + "px");

    await page.goto(base + "/projects/", { waitUntil: "domcontentloaded" });
    await page.getByRole("heading", { name: "Things I've built." }).waitFor();

    await page.locator(".aj-menu-toggle").tap();
    await page.waitForFunction(
      () => document.querySelector("#primary-navigation")?.classList.contains("is-open"),
      null,
      { timeout: 5000 },
    );
    currentStage = "navigate to Contact from the mobile menu";
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

async function runDesktopCenteringAudit() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  try {
    for (const route of ["/creator/", "/recruiters/", "/resources/", "/contact/"]) {
      await page.goto(base + route, { waitUntil: "domcontentloaded" });
      const intro = page.locator(".aj-inner-page > .aj-container > .aj-inner-heading");
      await intro.waitFor({ state: "visible" });
      const result = await intro.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return {
          midpoint: rect.left + rect.width / 2,
          viewportMidpoint: window.innerWidth / 2,
          textAlign: getComputedStyle(element).textAlign,
        };
      });
      assert(
        Math.abs(result.midpoint - result.viewportMidpoint) <= 2 && result.textAlign === "center",
        "Desktop centering failed on " + route + ": " + JSON.stringify(result),
      );
    }

    for (const route of ["/", "/projects/"]) {
      await page.goto(base + route, { waitUntil: "domcontentloaded" });
      const mainContainer = page.locator(".aj-home .aj-container, .aj-projects-page > .aj-container").first();
      await mainContainer.waitFor({ state: "visible" });
      const result = await mainContainer.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return { midpoint: rect.left + rect.width / 2, viewportMidpoint: window.innerWidth / 2 };
      });
      assert(
        Math.abs(result.midpoint - result.viewportMidpoint) <= 2,
        "Main page container is not centred on " + route + ": " + JSON.stringify(result),
      );
    }
    process.stdout.write("PASS desktop centering audit at 1440px\n");
  } finally {
    await browser.close();
  }
}

for (const viewport of [{ width: 390, height: 844 }, { width: 360, height: 800 }]) {
  try {
    await runViewport(viewport);
  } catch (error) {
    failures.push(viewport.width + "px [" + currentStage + "]: " + (error instanceof Error ? error.message : String(error)));
  }
}

if (pageErrors.length) failures.push("Browser JavaScript errors:\n" + pageErrors.join("\n"));
if (failures.length) {
  process.stderr.write("MOBILE SMOKE TEST FAILED:\n- " + failures.join("\n- ") + "\n");
  process.exitCode = 1;
} else {
  process.stdout.write("All mobile interaction checks passed.\n");
}

try { await runDesktopCenteringAudit(); } catch (error) { failures.push("desktop: " + (error instanceof Error ? error.message : String(error))); }
