"use client";

import Image from "next/image";
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
  return (
    <div className="aj-project-art aj-fokus-gallery" aria-label="Fokus app screenshots">
      {fokusScreenshots.map((screen) => (
        <a
          className="aj-fokus-shot"
          href={screen.src}
          key={screen.label}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the Fokus ${screen.label} screenshot in a new tab`}
        >
          <div className="aj-fokus-shot-image">
            <Image
              src={screen.src}
              alt={screen.alt}
              fill
              sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 42vw"
              unoptimized
            />
          </div>
          <span>{screen.label}</span>
        </a>
      ))}
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
