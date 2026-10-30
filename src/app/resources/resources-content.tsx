"use client";

import { useState, type FormEvent } from "react";
import { dailyNewspaperAutomationPrompt } from "./daily-newspaper-prompt";
import "./newspaper-resource.css";

const resourceAreas = [
  {
    title: "Finance toolkits",
    description: "Practical workbooks for financial statements, valuation assumptions and portfolio risk.",
    link: { label: "Suggest a topic", href: "#resource-request" },
  },
  {
    title: "CFA study systems",
    description: "Revision trackers, formula references and a more organised study plan.",
    link: {
      label: "Open CFA resources",
      href: "https://drive.google.com/drive/mobile/folders/1BWsJY1_X_vU9EwE9qf1B7m5UIudjbCRC?usp=sharing",
    },
  },
  {
    title: "Creator workflows",
    description: "Simple frameworks for turning a finance topic into a useful video or visual.",
    link: { label: "Suggest a workflow", href: "#resource-request" },
  },
];

export function ResourcesContent() {
  const [requestText, setRequestText] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");

  function openNewspaperPreview() {
    const basePath = window.location.pathname.startsWith("/MY-WEBSITE") ? "/MY-WEBSITE" : "";
    const previewPath = `${basePath}/resources/daily-newspaper-preview-2026-10-30.html`;
    window.open(previewPath, "_blank", "noopener,noreferrer");
  }

  async function copyNewspaperPrompt() {
    setCopyStatus("idle");
    let copied = false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(dailyNewspaperAutomationPrompt);
        copied = true;
      }
    } catch {
      // Fall through to the selection-based clipboard fallback below.
    }

    if (!copied) {
      const textarea = document.createElement("textarea");
      textarea.value = dailyNewspaperAutomationPrompt;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.style.pointerEvents = "none";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        copied = document.execCommand("copy");
      } finally {
        textarea.remove();
      }
    }

    setCopyStatus(copied ? "success" : "error");
  }

  function handleRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const request = requestText.trim();
    if (!request) return;
    const subject = encodeURIComponent("Resource request - Aman Jain portfolio");
    const body = encodeURIComponent(`Hi Aman,\n\nI'd like to request a resource about:\n${request}\n\nThanks.`);
    window.location.href = `mailto:jain.aman3789@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <main id="main" className="aj-inner-page aj-resources-page">
      <div className="aj-container">
        <header className="aj-inner-heading">
          <p className="aj-eyebrow aj-eyebrow-accent">RESOURCE LIBRARY</p>
          <h1>Useful tools for learning finance.</h1>
          <p>A small library of practical resources for learning, building and creating. I’ll add each one when it’s ready to use.</p>
        </header>

        <section className="aj-daily-newspaper" aria-labelledby="daily-newspaper-heading">
          <div className="aj-daily-newspaper-copy">
            <p className="aj-daily-newspaper-kicker">A reusable ChatGPT workflow · Sample edition included</p>
            <h2 id="daily-newspaper-heading">Your daily newspaper.</h2>
            <p>Build a personalised newspaper that researches the topics you care about, explains what matters, and arrives on a schedule you choose. Preview today’s sample edition, then copy the setup prompt to create your own.</p>
          </div>
          <div className="aj-daily-newspaper-actions" aria-label="Daily newspaper actions">
            <button type="button" className="aj-button aj-button-primary" onClick={openNewspaperPreview}>
              Preview <span aria-hidden="true">↗</span>
            </button>
            <button type="button" className="aj-button aj-button-outline" onClick={copyNewspaperPrompt}>
              {copyStatus === "success" ? "Copied!" : copyStatus === "error" ? "Try copy again" : "Copy prompt"}
              <span aria-hidden="true">{copyStatus === "success" ? "✓" : "↗"}</span>
            </button>
          </div>
          <p className="aj-daily-newspaper-status" data-state={copyStatus} aria-live="polite">
            {copyStatus === "success"
              ? "Full setup prompt copied. Paste it into ChatGPT to personalise and schedule your newspaper."
              : copyStatus === "error"
                ? "Clipboard access was blocked by this browser. Please allow clipboard access and try again."
                : "Preview opens the 30 October 2026 sample only. Copy prompt gives you the complete reusable setup instructions."}
          </p>
        </section>

        <section className="aj-resource-grid" aria-label="Resource areas">
          {resourceAreas.map((area) => (
            <article className="aj-resource-card" key={area.title}>
              <h2>{area.title}</h2>
              <p>{area.description}</p>
              <a className="aj-resource-link" href={area.link.href}>
                {area.link.label} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </section>

        <section id="resource-request" className="aj-resource-request" aria-labelledby="resource-request-heading">
          <div className="aj-resource-request-copy">
            <h2 id="resource-request-heading">What should I build next?</h2>
            <p>Have a useful resource in mind? Send me a quick suggestion.</p>
          </div>
          <form onSubmit={handleRequest}>
            <label className="sr-only" htmlFor="resource-request-topic">Resource topic</label>
            <input
              id="resource-request-topic"
              type="text"
              value={requestText}
              onChange={(event) => setRequestText(event.target.value)}
              placeholder="e.g. a portfolio analysis workbook"
              required
            />
            <button type="submit" className="aj-button aj-button-primary">Draft email <span aria-hidden="true">↗</span></button>
            <small>Opens a draft in your email app. Nothing is submitted on the website.</small>
          </form>
        </section>
      </div>
    </main>
  );
}
