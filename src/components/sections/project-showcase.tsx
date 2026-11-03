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

export function ProjectShowcase() {
  return (
    <section className="aj-section aj-projects-section" id="projects" aria-labelledby="projects-heading">
      <div className="aj-container">
        <div className="aj-section-heading aj-projects-heading">
          <div>
            <p className="aj-eyebrow aj-eyebrow-accent">PROJECTS</p>
            <h2 id="projects-heading">Selected builds, experiments and tools.</h2>
            <p className="aj-heading-subtitle">Products I build, problems I explore, and the work behind them.</p>
          </div>
          <a className="aj-text-link" href="https://github.com/aman482006-beep" target="_blank" rel="noopener noreferrer">Browse GitHub <span aria-hidden="true">↗</span></a>
        </div>

        <div className="aj-project-grid">
          <article className="aj-project-card aj-project-card-fokus">
            <FokusGallery />
            <div className="aj-project-card-content">
              <div className="aj-project-card-meta"><span>Desktop productivity app · Flutter</span><span>01</span></div>
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
        </div>
      </div>
    </section>
  );
}
