"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FOKUS } from "@/data/fokus";

const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

const fokusScreenshots = [
  {
    src: assetPrefix + "/fokus/fokus-focus.svg",
    label: "Focus timer",
    alt: "Fokus focus timer screen showing a 25-minute session, task picker and ambient sound controls",
  },
  {
    src: assetPrefix + "/fokus/fokus-tools.svg",
    label: "Tools library",
    alt: "Fokus tools page showing productivity, capture and personal finance tools",
  },
  {
    src: assetPrefix + "/fokus/fokus-reality.svg",
    label: "Your Reality",
    alt: "Fokus Your Reality dashboard showing screen time, application usage and category breakdown",
  },
  {
    src: assetPrefix + "/fokus/fokus-analytics.svg",
    label: "Analytics",
    alt: "Fokus Analytics dashboard showing focus hours, streak, weekly distribution and consistency grid",
  },
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
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % fokusScreenshots.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + fokusScreenshots.length) % fokusScreenshots.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isViewerOpen]);

  const openScreenshot = (index: number) => {
    setActiveIndex(index);
    setIsViewerOpen(true);
  };

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + fokusScreenshots.length) % fokusScreenshots.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % fokusScreenshots.length);
  };

  return (
    <div className="aj-project-art aj-fokus-gallery" aria-label="Fokus app screenshots">
      <button
        className="aj-fokus-featured-shot"
        type="button"
        onClick={() => setIsViewerOpen(true)}
        aria-label={`Enlarge the Fokus ${activeScreen.label} screenshot`}
      >
        <span className="aj-fokus-shot-image">
          <Image
            src={activeScreen.src}
            alt={activeScreen.alt}
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
            unoptimized
            priority
          />
        </span>
        <span className="aj-fokus-shot-label">{activeScreen.label}</span>
        <span className="aj-fokus-zoom-hint" aria-hidden="true">Click to enlarge ↗</span>
      </button>

      <div className="aj-fokus-thumbnails" role="group" aria-label="More Fokus screenshots">
        {fokusScreenshots.map((screen, index) => (
          <button
            className="aj-fokus-thumbnail"
            type="button"
            key={screen.label}
            onClick={() => openScreenshot(index)}
            aria-label={`View ${screen.label} screenshot larger`}
            aria-pressed={activeIndex === index}
          >
            <span className="aj-fokus-thumbnail-image">
              <Image
                src={screen.src}
                alt=""
                fill
                sizes="160px"
                unoptimized
              />
            </span>
            <span className="aj-fokus-thumbnail-label">{screen.label}</span>
          </button>
        ))}
      </div>

      {isViewerOpen && (
        <div
          className="aj-fokus-lightbox"
          role="presentation"
          onClick={() => setIsViewerOpen(false)}
        >
          <div
            className="aj-fokus-lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`Fokus screenshot: ${activeScreen.label}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="aj-fokus-lightbox-close"
              type="button"
              onClick={() => setIsViewerOpen(false)}
              aria-label="Close enlarged screenshot"
            >
              ×
            </button>
            <button
              className="aj-fokus-lightbox-nav aj-fokus-lightbox-prev"
              type="button"
              onClick={showPrevious}
              aria-label="Previous screenshot"
            >
              ‹
            </button>
            <div className="aj-fokus-lightbox-image">
              <Image
                src={activeScreen.src}
                alt={activeScreen.alt}
                fill
                sizes="(max-width: 900px) 96vw, 88vw"
                unoptimized
              />
            </div>
            <button
              className="aj-fokus-lightbox-nav aj-fokus-lightbox-next"
              type="button"
              onClick={showNext}
              aria-label="Next screenshot"
            >
              ›
            </button>
            <div className="aj-fokus-lightbox-caption">
              <span>{activeScreen.label}</span>
              <span>{activeIndex + 1} / {fokusScreenshots.length}</span>
            </div>
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
          <a className="aj-text-link" href="https://github.com/aman482006-beep" target="_blank" rel="noopener noreferrer">
            Browse GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="aj-project-grid">
          <article className="aj-project-card aj-project-card-fokus">
            <FokusGallery />

            <div className="aj-project-card-content">
              <div className="aj-project-card-meta">
                <span>Cross-platform app · Flutter</span>
                <span>01</span>
              </div>

              <p className="aj-fokus-kicker">A PRODUCTIVITY SPACE</p>
              <h3>{FOKUS.name}</h3>
              <p className="aj-project-subtitle">{FOKUS.tagline}</p>
              <p className="aj-project-description">
                A productivity app designed to help you focus, organize your day and understand where your time goes.
                Fokus brings focus sessions, tasks, reminders, ambient audio, screen-time tracking, analytics and
                practical offline tools into one workspace.
              </p>

              <div className="aj-fokus-capabilities" aria-label="Fokus app capabilities">
                <div>
                  <strong>Focus</strong>
                  <span>Pomodoro timer, tasks, reminders and ambient sound</span>
                </div>
                <div>
                  <strong>Understand</strong>
                  <span>Screen-time insights, app usage and productivity breakdowns</span>
                </div>
                <div>
                  <strong>Get things done</strong>
                  <span>Quick Capture, Brain Dump, Whiteboard, OCR and daily journal</span>
                </div>
                <div>
                  <strong>Personal finance</strong>
                  <span>Portfolio, subscriptions and net-worth tracking tools</span>
                </div>
              </div>

              <div className="aj-project-tags">
                <span>Flutter</span>
                <span>Dart</span>
                <span>Productivity</span>
                <span>Digital wellbeing</span>
                <span>Offline tools</span>
              </div>

              <p className="aj-project-note">{FOKUS.windowsAvailability}</p>

              <div className="aj-project-actions">
                <a href={FOKUS.sourceUrl} target="_blank" rel="noopener noreferrer">
                  View on GitHub <span aria-hidden="true">↗</span>
                </a>
                <a className="aj-project-demo" href={FOKUS.storeUrl} target="_blank" rel="noopener noreferrer">
                  Get Fokus <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
