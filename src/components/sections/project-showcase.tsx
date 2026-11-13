"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FOKUS } from "@/data/fokus";

const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

const fokusScreenshots = [
  { src: assetPrefix + "/fokus/fokus-focus.svg", label: "Focus timer", alt: "Fokus focus timer with a 25-minute session, presets and ambient sound controls" },
  { src: assetPrefix + "/fokus/fokus-tools.svg", label: "Tools library", alt: "Fokus tools library with productivity, finance, calculator and mindfulness tools" },
  { src: assetPrefix + "/fokus/fokus-reality.svg", label: "Your Reality", alt: "Fokus Your Reality screen-time insights, app usage and category breakdown" },
  { src: assetPrefix + "/fokus/fokus-analytics.svg", label: "Analytics", alt: "Fokus Statistics with focus time, streaks, weekly trends and consistency grid" },
] as const;

type ProjectArtworkKind = "finance" | "model" | "quant";

function FokusGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const activeScreen = fokusScreenshots[activeIndex];

  useEffect(() => {
    if (!isViewerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsViewerOpen(false);
      if (event.key === "ArrowRight") setActiveIndex((current) => (current + 1) % fokusScreenshots.length);
      if (event.key === "ArrowLeft") setActiveIndex((current) => (current - 1 + fokusScreenshots.length) % fokusScreenshots.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isViewerOpen]);

  const showPrevious = () => setActiveIndex((current) => (current - 1 + fokusScreenshots.length) % fokusScreenshots.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % fokusScreenshots.length);

  return (
    <div className="aj-project-art aj-fokus-gallery" aria-label="Fokus app screen previews">
      <button className="aj-fokus-featured-shot" type="button" onClick={() => setIsViewerOpen(true)} aria-label={`Open enlarged preview: ${activeScreen.label}`}>
        <Image src={activeScreen.src} alt={activeScreen.alt} fill sizes="(max-width: 700px) 100vw, 340px" unoptimized loading="lazy" />
      </button>
      <button className="aj-fokus-inline-nav aj-fokus-inline-prev" type="button" onClick={showPrevious} aria-label="Previous Fokus image"><span aria-hidden="true">‹</span></button>
      <button className="aj-fokus-inline-nav aj-fokus-inline-next" type="button" onClick={showNext} aria-label="Next Fokus image"><span aria-hidden="true">›</span></button>

      {isViewerOpen && (
        <div className="aj-fokus-lightbox" role="presentation" onClick={() => setIsViewerOpen(false)}>
          <div className="aj-fokus-lightbox-dialog" role="dialog" aria-modal="true" aria-label={`Fokus screenshot: ${activeScreen.label}`} onClick={(event) => event.stopPropagation()}>
            <button className="aj-fokus-lightbox-close" type="button" onClick={() => setIsViewerOpen(false)} aria-label="Close enlarged screenshot">×</button>
            <button className="aj-fokus-lightbox-nav aj-fokus-lightbox-prev" type="button" onClick={showPrevious} aria-label="Previous screenshot">‹</button>
            <div className="aj-fokus-lightbox-image">
              <Image src={activeScreen.src} alt={activeScreen.alt} fill sizes="(max-width: 900px) 94vw, 1120px" unoptimized />
            </div>
            <button className="aj-fokus-lightbox-nav aj-fokus-lightbox-next" type="button" onClick={showNext} aria-label="Next screenshot">›</button>
            <div className="aj-fokus-lightbox-caption"><span>{activeScreen.label}</span><span>{activeIndex + 1} / {fokusScreenshots.length}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectArtwork({ kind }: { kind: ProjectArtworkKind }) {
  const title = kind === "finance" ? "MONEY OVERVIEW" : kind === "model" ? "MODEL WORKSPACE" : "STRATEGY LAB";
  const description = kind === "finance"
    ? "Illustrative personal finance dashboard preview."
    : kind === "model"
      ? "Illustrative financial modelling workspace preview."
      : "Illustrative quantitative research workspace preview.";

  return (
    <div
      className={`aj-project-art aj-project-lab-art aj-project-lab-${kind}`}
      role="img"
      aria-label={description}
    >
      <div className="aj-project-lab-window" aria-hidden="true">
        <div className="aj-project-lab-windowbar"><i /><i /><i /><strong>{title}</strong><small>ILLUSTRATIVE PREVIEW</small></div>
        <div className="aj-project-lab-body">
          {kind === "finance" && (
            <>
              <div className="aj-project-lab-stats"><div><small>Income</small><b>₹—</b></div><div><small>Spent</small><b>₹—</b></div><div><small>Saved</small><b>—%</b></div></div>
              <div className="aj-project-lab-chart">{Array.from({ length: 7 }, (_, index) => <i key={index} />)}</div>
            </>
          )}
          {kind === "model" && (
            <div className="aj-project-lab-model-rows">
              <span>Revenue assumptions <b>INPUT</b></span><span>Historical financials <b>DATA</b></span><span>Forecast schedule <b>MODEL</b></span><span>Valuation outputs <b>OUTPUT</b></span>
            </div>
          )}
          {kind === "quant" && (
            <>
              <div className="aj-project-lab-stats"><div><small>Signals</small><b>TEST</b></div><div><small>Backtest</small><b>RUN</b></div><div><small>Risk</small><b>CHECK</b></div></div>
              <div className="aj-project-lab-quant-line">
                <svg viewBox="0 0 400 70" preserveAspectRatio="none"><path d="M0 55 L35 48 L70 52 L108 30 L144 39 L182 19 L218 29 L250 14 L285 25 L320 10 L350 18 L400 5" fill="none" stroke="#79977C" strokeWidth="2.5" vectorEffect="non-scaling-stroke" /></svg>
              </div>
            </>
          )}
        </div>
      </div>
      <span className="aj-project-screenshot-label">ILLUSTRATIVE WORKSPACE · NOT A LIVE CAPTURE</span>
    </div>
  );
}

function FinanceRoastRoomArtwork() {
  return (
    <div
      className="aj-project-art aj-finance-roast-room-art"
      role="img"
      aria-label="4K AI-generated concept artwork of a 20-advisor finance debate room"
    >
      <Image
        src={assetPrefix + "/finance-roast-room-4k.avif"}
        alt="A 20-advisor finance council debating around a central data table"
        fill
        sizes="(max-width: 700px) 100vw, 500px"
        unoptimized
        loading="lazy"
      />
    </div>
  );
}

export function ProjectShowcase() {
  return (
    <section className="aj-section aj-projects-section" id="projects" aria-labelledby="projects-heading">
      <div className="aj-container">
        <div className="aj-section-heading aj-projects-heading">
          <div>
            <p className="aj-eyebrow aj-eyebrow-accent">THE BUILD LOG</p>
            <h2 id="projects-heading">Things I&apos;ve built.</h2>
            <p className="aj-heading-subtitle">Products, experiments and useful tools I&apos;ve built or am actively developing. Each status is labelled clearly, so you can tell what is ready and what is still evolving.</p>
          </div>
          <a className="aj-text-link" href="https://github.com/aman482006-beep" target="_blank" rel="noopener noreferrer">Browse GitHub <span aria-hidden="true">↗</span></a>
        </div>

        <div className="aj-project-grid">
          <article className="aj-project-card aj-project-card-fokus">
            <FokusGallery />
            <div className="aj-project-card-content">
              <div className="aj-project-card-meta"><span>Product · Windows app · Available</span><span>01</span></div>
              <h3>{FOKUS.name}</h3>
              <p className="aj-project-subtitle">{FOKUS.tagline}</p>
              <p className="aj-project-description">Focus sessions, tasks, screen-time insights and practical offline tools — all in one workspace.</p>
              <div className="aj-project-tags"><span>Flutter</span><span>Dart</span><span>Productivity</span><span>Digital wellbeing</span></div>
              <p className="aj-project-note">{FOKUS.windowsAvailability}</p>
              <div className="aj-project-actions">
                <a href={FOKUS.sourceUrl} target="_blank" rel="noopener noreferrer">View on GitHub <span aria-hidden="true">↗</span></a>
                <a className="aj-project-demo" href={FOKUS.storeUrl} target="_blank" rel="noopener noreferrer">Get Fokus <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </article>

          <article className="aj-project-card">
            <FinanceRoastRoomArtwork />
            <div className="aj-project-card-content">
              <div className="aj-project-card-meta"><span>Finance × AI · Open-source tool</span><span>02</span></div>
              <h3>Finance Roast Room</h3>
              <p className="aj-project-subtitle">A debate room for consequential money decisions.</p>
              <p className="aj-project-description">An AI-powered council of 20 simulated finance thinkers that stress-tests investing, trading, valuation and capital-allocation decisions. Advisors challenge one another across structured rounds before the Chair delivers weighted scores, a final verdict and a downloadable PDF report.</p>
              <div className="aj-project-tags"><span>Node.js</span><span>Anthropic API</span><span>AI agents</span><span>Investment analysis</span></div>
              <p className="aj-project-note">Run locally with Claude Code or Google Antigravity. An optional Anthropic API runner is available. Advisor personas are simulations, not the actual people or financial advice.</p>
              <div className="aj-project-actions">
                <a href="https://github.com/aman482006-beep/Finance-Roast-Room" target="_blank" rel="noopener noreferrer">View on GitHub <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </article>

          <article className="aj-project-card">
            <ProjectArtwork kind="finance" />
            <div className="aj-project-card-content">
              <div className="aj-project-card-meta"><span>Fintech · In development</span><span>03</span></div>
              <h3>AI Personal Finance Manager</h3>
              <p className="aj-project-description">An experiment in making personal finances easier to understand, with spending views, budgeting workflows and AI-assisted insights in one place.</p>
              <div className="aj-project-tags"><span>Personal finance</span><span>AI</span><span>Fintech</span><span>Product thinking</span></div>
              <p className="aj-project-note">Currently being developed. The interface and workflows are still evolving.</p>
              <div className="aj-project-actions"><a href="https://github.com/aman482006-beep/AI-Personal-Finance-Manager" target="_blank" rel="noopener noreferrer">Explore repository <span aria-hidden="true">↗</span></a><a className="aj-project-demo" href="https://aman482006-beep.github.io/AI-Personal-Finance-Manager/" target="_blank" rel="noopener noreferrer">Open live preview <span aria-hidden="true">↗</span></a></div>
            </div>
          </article>

          <article className="aj-project-card">
            <ProjectArtwork kind="model" />
            <div className="aj-project-card-content">
              <div className="aj-project-card-meta"><span>Finance × AI · In development</span><span>04</span></div>
              <h3>Automated Financial Modelling Agent</h3>
              <p className="aj-project-description">Exploring how an AI-assisted workflow can organise assumptions, historical financials, forecast schedules and valuation outputs.</p>
              <div className="aj-project-tags"><span>Financial modelling</span><span>Automation</span><span>AI agents</span></div>
              <p className="aj-project-note">An active build—not presented as a finished modelling system.</p>
              <div className="aj-project-actions"><a href="https://github.com/aman482006-beep/Automated-Financial-Modelling-Agent" target="_blank" rel="noopener noreferrer">Explore repository <span aria-hidden="true">↗</span></a><a className="aj-project-demo" href="https://aman482006-beep.github.io/Automated-Financial-Modelling-Agent/" target="_blank" rel="noopener noreferrer">Open live preview <span aria-hidden="true">↗</span></a></div>
            </div>
          </article>

          <article className="aj-project-card">
            <ProjectArtwork kind="quant" />
            <div className="aj-project-card-content">
              <div className="aj-project-card-meta"><span>Quant · Research prototype</span><span>05</span></div>
              <h3>AI-Powered Quantitative Trading System</h3>
              <p className="aj-project-description">A research project exploring strategy signals, historical backtesting and risk-aware evaluation before any live-trading claims.</p>
              <div className="aj-project-tags"><span>Python</span><span>Quantitative research</span><span>Backtesting</span><span>Risk</span></div>
              <p className="aj-project-note">Prototype status. Historical tests do not guarantee future performance.</p>
              <div className="aj-project-actions"><a href="https://github.com/aman482006-beep/AI-Powered-Quantitative-Trading-System" target="_blank" rel="noopener noreferrer">Explore repository <span aria-hidden="true">↗</span></a><a className="aj-project-demo" href="https://aman482006-beep.github.io/AI-Powered-Quantitative-Trading-System/" target="_blank" rel="noopener noreferrer">Open live preview <span aria-hidden="true">↗</span></a></div>
            </div>
          </article>
        </div>
        <p className="aj-project-disclaimer">A work-in-progress label is intentional: a public repository is not the same as a finished, tested product.</p>
      </div>
    </section>
  );
}
