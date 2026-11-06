import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdir, writeFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { performance } from "node:perf_hooks";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const XLSX = require("xlsx-js-style");
const ROOT = resolve("project-qa-artifacts");
const URLS = {
  portfolio: "https://aman482006-beep.github.io/MY-WEBSITE/",
  quant: "https://aman482006-beep.github.io/AI-Powered-Quantitative-Trading-System/",
  moneta: "https://aman482006-beep.github.io/AI-Personal-Finance-Manager/",
  modelforge: "https://aman482006-beep.github.io/Automated-Financial-Modelling-Agent/",
};
const expectedSheets = [
  "Cover", "Inputs", "Historical IS", "Historical BS", "Historical CF",
  "Forecast IS", "Forecast BS", "Forecast CF", "FCF", "Ratios", "DCF",
  "Comparables", "Sensitivity", "Scenario Calc", "Checks",
];
const report = {
  startedAt: new Date().toISOString(),
  browser: "Chromium",
  viewports: { desktop: { width: 1440, height: 1000 }, mobile: { width: 390, height: 844 } },
  projects: {},
  workbook: {},
  warnings: [],
};
await mkdir(ROOT, { recursive: true });

function recordConsole(page, entry) {
  page.on("pageerror", (error) => entry.pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") entry.consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    const url = request.url();
    entry.failedRequests.push({
      url,
      error: request.failure()?.errorText || "unknown",
    });
  });
}
async function loadPage(page, url, selector, label) {
  const start = performance.now();
  const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  assert(response && response.status() === 200, label + " returned HTTP " + (response?.status() ?? "no response"));
  await page.locator(selector).first().waitFor({ state: "visible", timeout: 45000 });
  await page.waitForLoadState("load", { timeout: 25000 }).catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  const elapsed = performance.now() - start;
  const timings = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const paints = Object.fromEntries(performance.getEntriesByType("paint").map((x) => [x.name, Math.round(x.startTime)]));
    return {
      domContentLoadedMs: Math.round(nav?.domContentLoadedEventEnd || 0),
      loadEventMs: Math.round(nav?.loadEventEnd || 0),
      firstContentfulPaintMs: paints["first-contentful-paint"] ?? null,
      documentBytes: nav?.transferSize ?? null,
    };
  });
  return { httpStatus: response.status(), gotoAndReadyMs: Math.round(elapsed), ...timings };
}
async function assertNoHorizontalOverflow(page, label) {
  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  assert(dimensions.document <= dimensions.viewport + 2, label + " horizontal overflow: " + JSON.stringify(dimensions));
  return dimensions;
}
async function saveScreenshot(page, filename, fullPage = true) {
  await page.screenshot({
    path: resolve(ROOT, filename),
    fullPage,
    animations: "disabled",
    caret: "hide",
    type: "png",
  });
}

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
try {
  // ModelForge: full navigation, rendered charts, export and downloaded XLSX structure.
  {
    const entry = { pageErrors: [], consoleErrors: [], failedRequests: [], interactions: {} };
    report.projects.modelforge = entry;
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      deviceScaleFactor: 1,
      acceptDownloads: true,
    });
    const page = await context.newPage();
    recordConsole(page, entry);
    entry.load = await loadPage(page, URLS.modelforge, "#overviewMetrics .metric-card", "ModelForge");
    await page.waitForFunction(() => !!window.ModelEngine && !!window.ModelWorkbook, null, { timeout: 30000 });
    await page.waitForTimeout(700);
    await saveScreenshot(page, "modelforge-desktop.png", true);

    entry.canvas = await page.evaluate(() => {
      const ids = ["revenueChart", "marginChart", "cashChart", "dcfChart"];
      return Object.fromEntries(ids.map((id) => {
        const canvas = document.getElementById(id);
        if (!canvas) return [id, { exists: false }];
        const context = canvas.getContext("2d");
        const pixels = context && canvas.width && canvas.height
          ? context.getImageData(0, 0, canvas.width, canvas.height).data
          : [];
        let painted = 0;
        for (let i = 3; i < pixels.length; i += 4) if (pixels[i] > 0) painted++;
        const rect = canvas.getBoundingClientRect();
        return [id, {
          exists: true,
          width: canvas.width,
          height: canvas.height,
          cssWidth: Math.round(rect.width),
          cssHeight: Math.round(rect.height),
          paintedPixels: painted,
          hasContext: !!context,
        }];
      }));
    });
    for (const [id, metrics] of Object.entries(entry.canvas)) {
      assert(metrics.exists && metrics.hasContext, "ModelForge missing canvas/context: " + id);
      assert(metrics.paintedPixels > 150, "ModelForge chart is blank: " + id + " " + JSON.stringify(metrics));
    }

    const pages = ["data", "history", "model", "dcf", "comps", "sensitivity", "assistant", "overview"];
    for (const target of pages) {
      const start = performance.now();
      await page.locator('button.nav-btn[data-page="' + target + '"]').click();
      await page.locator("#page-" + target + ".active").waitFor({ state: "visible" });
      entry.interactions["navigate_" + target + "_ms"] = Math.round(performance.now() - start);
    }
    await assertNoHorizontalOverflow(page, "ModelForge desktop");

    // Export every module: this must be one .xlsx with separate tabs.
    await page.locator("#excelExport").click();
    await page.locator("#exportDialog[open]").waitFor({ state: "visible" });
    const exportControls = await page.locator(".export-module").evaluateAll((boxes) => boxes.map((box) => ({
      checked: box.checked,
      sheets: String(box.dataset.sheets || "").split("|").filter(Boolean),
    })));
    assert(exportControls.length >= 8, "ModelForge export dialog is missing module options");
    assert(exportControls.every((x) => x.checked), "All export modules should start selected");
    const coveredSheets = [...new Set(exportControls.flatMap((x) => x.sheets))];
    assert.deepEqual(coveredSheets.sort(), [...expectedSheets].sort(), "Export options do not cover all expected worksheet tabs");
    assert.equal((await page.locator("#exportSelectAll").innerText()).trim(), "Deselect all");
    const fullDownloadPromise = page.waitForEvent("download", { timeout: 30000 });
    await page.locator("#exportGenerate").click();
    const fullDownload = await fullDownloadPromise;
    const fullPath = resolve(ROOT, "ModelForge-All-Modules.xlsx");
    await fullDownload.saveAs(fullPath);
    const fullStat = await stat(fullPath);
    assert(fullStat.size > 12000, "ModelForge all-modules Excel export is unexpectedly small");

    const fullBook = XLSX.readFile(fullPath, { cellFormula: true, cellStyles: true });
    assert.deepEqual([...fullBook.SheetNames].sort(), [...expectedSheets].sort(), "Downloaded workbook has the wrong tabs");
    assert(fullBook.Sheets["Forecast IS"].B5?.f?.includes("Historical IS"), "Forecast IS is not linked to historical data");
    assert(fullBook.Sheets.FCF.G9?.f?.includes("Forecast IS"), "FCF NOPAT bridge is not linked to forecast EBIT");
    assert(fullBook.Sheets.FCF.G13?.f, "UFCF formula is missing from the FCF worksheet");
    assert(fullBook.Sheets.Checks.D4?.v === "PASS" || fullBook.Sheets.Checks.D4?.v === "REVIEW",
      "Model checks should export readable PASS / REVIEW values");
    entry.workbookFileBytes = fullStat.size;
    entry.workbookSheets = fullBook.SheetNames;
    entry.workbookFormulaSamples = {
      forecastIS: fullBook.Sheets["Forecast IS"].B5.f,
      fcfNopat: fullBook.Sheets.FCF.G9.f,
      fcfUfcf: fullBook.Sheets.FCF.G13.f,
    };

    // A single selected module should remain one sheet and be self-contained.
    await page.locator("#excelExport").click();
    await page.locator("#exportDialog[open]").waitFor({ state: "visible" });
    await page.locator("#exportSelectAll").click();
    assert.equal((await page.locator("#exportSelectAll").innerText()).trim(), "Select all");
    const dcfOption = page.locator('.export-module[data-sheets="DCF"]');
    await dcfOption.check();
    assert.equal((await page.locator("#exportSelectAll").innerText()).trim(), "Select all");
    const partialDownloadPromise = page.waitForEvent("download", { timeout: 30000 });
    await page.locator("#exportGenerate").click();
    const partialDownload = await partialDownloadPromise;
    const partialPath = resolve(ROOT, "ModelForge-DCF-Only.xlsx");
    await partialDownload.saveAs(partialPath);
    const partialBook = XLSX.readFile(partialPath, { cellFormula: true });
    assert.deepEqual(partialBook.SheetNames, ["DCF"], "A DCF-only export should contain only one tab");
    assert(partialBook.Sheets.DCF.B3 && partialBook.Sheets.DCF.B3.f === undefined,
      "A standalone DCF export should not contain broken external-sheet formulas");
    entry.partialExportBytes = (await stat(partialPath)).size;

    // Verify tab navigation and mobile layout in a fresh, narrow viewport.
    const mobile = await context.newPage();
    await mobile.setViewportSize({ width: 390, height: 844 });
    const mobileEntry = { pageErrors: [], consoleErrors: [], failedRequests: [] };
    recordConsole(mobile, mobileEntry);
    await loadPage(mobile, URLS.modelforge, "#overviewMetrics .metric-card", "ModelForge mobile");
    await assertNoHorizontalOverflow(mobile, "ModelForge mobile");
    await saveScreenshot(mobile, "modelforge-mobile.png", true);
    entry.mobile = mobileEntry;
    entry.pageErrors.push(...mobileEntry.pageErrors);
    await context.close();
  }

  // QuantLab: run a real synthetic backtest and open the advanced controls.
  {
    const entry = { pageErrors: [], consoleErrors: [], failedRequests: [], interactions: {} };
    report.projects.quant = entry;
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
    const page = await context.newPage();
    recordConsole(page, entry);
    entry.load = await loadPage(page, URLS.quant, "#runBacktest", "QuantLab");
    await page.waitForFunction(
      () => /synthetic demo loaded/i.test(document.querySelector("#dataStatus")?.textContent || ""),
      null,
      { timeout: 20000 },
    );
    await saveScreenshot(page, "quantlab-desktop-before-run.png", true);
    const advanced = page.locator("details.advanced-config");
    await advanced.locator("summary").click();
    assert(await advanced.evaluate((element) => element.open), "QuantLab advanced settings did not expand");
    for (const id of ["sizingMethod", "fixedAllocation", "riskPerTrade", "trailingStop", "maxHoldingBars", "maxPyramidEntries", "riskFreeRate", "borrowRate", "barsPerYear"]) {
      assert(await page.locator("#" + id).count() === 1, "QuantLab is missing advanced setting " + id);
    }
    const start = performance.now();
    await page.locator("#runBacktest").click();
    await page.waitForFunction(() => {
      const values = [...document.querySelectorAll("#metrics .metric strong")].map((element) => (element.textContent || "").trim());
      return values.some((value) => value && value !== "—");
    }, null, { timeout: 45000 });
    entry.interactions.syntheticBacktestMs = Math.round(performance.now() - start);
    entry.metrics = await page.locator("#metrics .metric").evaluateAll((items) => items.map((item) => ({
      label: item.querySelector("span")?.textContent?.trim(),
      value: item.querySelector("strong")?.textContent?.trim(),
    })));
    assert(entry.metrics.length >= 6, "QuantLab did not render the complete metrics panel");
    await saveScreenshot(page, "quantlab-desktop-after-run.png", true);
    await assertNoHorizontalOverflow(page, "QuantLab desktop");

    const mobile = await context.newPage();
    await mobile.setViewportSize({ width: 390, height: 844 });
    const mobileEntry = { pageErrors: [], consoleErrors: [], failedRequests: [] };
    recordConsole(mobile, mobileEntry);
    await loadPage(mobile, URLS.quant, "#runBacktest", "QuantLab mobile");
    await assertNoHorizontalOverflow(mobile, "QuantLab mobile");
    await saveScreenshot(mobile, "quantlab-mobile.png", true);
    entry.mobile = mobileEntry;
    entry.pageErrors.push(...mobileEntry.pageErrors);
    await context.close();
  }

  // Moneta: first-visit choice, add a transaction, and export it to CSV.
  {
    const entry = { pageErrors: [], consoleErrors: [], failedRequests: [], interactions: {} };
    report.projects.moneta = entry;
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      acceptDownloads: true,
    });
    const page = await context.newPage();
    await page.addInitScript(() => localStorage.clear());
    recordConsole(page, entry);
    entry.load = await loadPage(page, URLS.moneta, "#welcomeModal.open", "Moneta");
    await page.locator("#welcomeDemo").click();
    await page.locator("#welcomeModal.open").waitFor({ state: "hidden" });
    await page.locator("#net").waitFor({ state: "visible" });
    entry.demoNetCashFlow = (await page.locator("#net").innerText()).trim();
    await saveScreenshot(page, "moneta-desktop-demo.png", true);

    await page.locator('button.nav[data-page="transactions"]').click();
    await page.locator("#page-transactions.active").waitFor({ state: "visible" });
    await page.locator("#addTx").click();
    await page.locator("#txModal.open").waitFor({ state: "visible" });
    await page.locator("#txDesc").fill("QA browser transaction");
    await page.locator("#txAmount").fill("1234");
    await page.locator("#txType").selectOption("expense");
    await page.locator("#txForm button.primary").click();
    await page.getByText("QA browser transaction", { exact: false }).waitFor({ state: "visible" });
    entry.interactions.addTransactionSucceeded = true;
    const csvDownloadPromise = page.waitForEvent("download", { timeout: 20000 });
    await page.locator("#exportCsv").click();
    const csvDownload = await csvDownloadPromise;
    const csvPath = resolve(ROOT, "Moneta-QA-Transactions.csv");
    await csvDownload.saveAs(csvPath);
    assert((await stat(csvPath)).size > 50, "Moneta CSV export is unexpectedly small");
    entry.csvExportBytes = (await stat(csvPath)).size;

    await page.locator('button.nav[data-page="insights"]').click();
    await page.locator("#page-insights.active").waitFor({ state: "visible" });
    await saveScreenshot(page, "moneta-desktop-insights.png", true);
    await assertNoHorizontalOverflow(page, "Moneta desktop");

    const mobile = await context.newPage();
    await mobile.setViewportSize({ width: 390, height: 844 });
    await mobile.addInitScript(() => localStorage.clear());
    const mobileEntry = { pageErrors: [], consoleErrors: [], failedRequests: [] };
    recordConsole(mobile, mobileEntry);
    await loadPage(mobile, URLS.moneta, "#welcomeModal.open", "Moneta mobile");
    await mobile.locator("#welcomeDemo").click();
    await assertNoHorizontalOverflow(mobile, "Moneta mobile");
    await saveScreenshot(mobile, "moneta-mobile.png", true);
    entry.mobile = mobileEntry;
    entry.pageErrors.push(...mobileEntry.pageErrors);
    await context.close();
  }

  // Main portfolio: inspect the deployed home and the four project cards at both sizes.
  {
    const entry = { pageErrors: [], consoleErrors: [], failedRequests: [], interactions: {} };
    report.projects.portfolio = entry;
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    recordConsole(page, entry);
    entry.load = await loadPage(page, URLS.portfolio, "main.aj-home", "Main portfolio");
    await saveScreenshot(page, "portfolio-home-desktop.png", true);
    await page.goto(URLS.portfolio + "projects/", { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.locator("main.aj-projects-page").waitFor({ state: "visible" });
    const artworkCount = await page.locator(".aj-project-lab-art").count();
    assert.equal(artworkCount, 3, "Portfolio should render all three project preview artworks");
    for (const repoName of ["AI-Personal-Finance-Manager", "Automated-Financial-Modelling-Agent", "AI-Powered-Quantitative-Trading-System"]) {
      assert(await page.locator('a[href*="' + repoName + '"]').count() >= 1,
        "Portfolio is missing a live/repository link for " + repoName);
    }
    await saveScreenshot(page, "portfolio-projects-desktop.png", true);
    await assertNoHorizontalOverflow(page, "Portfolio desktop");

    const mobile = await context.newPage();
    await mobile.setViewportSize({ width: 390, height: 844 });
    const mobileEntry = { pageErrors: [], consoleErrors: [], failedRequests: [] };
    recordConsole(mobile, mobileEntry);
    await loadPage(mobile, URLS.portfolio + "projects/", "main.aj-projects-page", "Portfolio mobile projects");
    await assertNoHorizontalOverflow(mobile, "Portfolio mobile");
    await saveScreenshot(mobile, "portfolio-projects-mobile.png", true);
    entry.projectArtworkCount = artworkCount;
    entry.mobile = mobileEntry;
    entry.pageErrors.push(...mobileEntry.pageErrors);
    await context.close();
  }

  // Fail on uncaught application exceptions. Keep raw failed third-party requests
  // in the report because font/video providers can be blocked independently.
  for (const [name, entry] of Object.entries(report.projects)) {
    assert(entry.pageErrors.length === 0, name + " uncaught browser exceptions: " + JSON.stringify(entry.pageErrors));
    const mainErrors = entry.consoleErrors.filter((message) => !/favicon|third-party cookie|deprecated/i.test(message));
    entry.applicationConsoleErrors = mainErrors;
    assert(mainErrors.length === 0, name + " browser console errors: " + JSON.stringify(mainErrors));
  }
} finally {
  await browser.close();
}
report.completedAt = new Date().toISOString();
await writeFile(resolve(ROOT, "browser-qa-results.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
console.log("DEEP_PROJECT_QA_RESULT: PASS");
