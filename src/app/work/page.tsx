import type { Metadata } from "next";
import { FOKUS } from "@/data/fokus";
import { FinanceWorkSection } from "@/components/sections/finance-work";

export const metadata: Metadata = {
  title: "Fokus Case Study",
  description: "Aman Jain's case study for Fokus, a cross-platform Flutter productivity app built around focused work, ambient environments and lightweight personal systems.",
  alternates: { canonical: "/work" },
};

const features = [
  "Focus sessions",
  "Ambient audio and visual scenes",
  "Reminders and notifications",
  "Productivity analytics",
  "Local persistence",
  "File and PDF workflows",
  "Desktop window controls",
  "Deep links",
];

const stack = [
  "Flutter / Dart",
  "Riverpod",
  "GetIt",
  "SharedPreferences",
  "just_audio",
  "flutter_local_notifications",
  "fl_chart",
  "file_picker",
  "Syncfusion PDF",
  "Google ML Kit",
  "window_manager",
  "Win32 / FFI",
  "app_links",
];

export default function WorkPage() {
  return (
    <main id="main" className="aj-inner-page aj-work-page">
      <div className="aj-container">
        <header className="aj-inner-heading aj-work-hero">
          <p className="aj-eyebrow aj-eyebrow-accent">SELECTED WORK · CASE STUDY</p>
          <h1>{FOKUS.name} — {FOKUS.tagline}</h1>
          <p>{FOKUS.name} is a cross-platform Flutter productivity app designed to make deep work easier to start and easier to sustain. It brings focus sessions, ambient environments, reminders, analytics and local persistence into one application.</p>
          <div className="aj-work-hero-meta">
            <span>Cross-platform Flutter app</span>
            <span>Windows version on Microsoft Store</span>
            <span>Personal project · Active development</span>
          </div>
          <div className="aj-feature-actions aj-work-hero-actions">
            <a className="aj-button aj-button-primary" href={FOKUS.storeUrl} target="_blank" rel="noopener noreferrer">Get Fokus <span aria-hidden="true">↗</span></a>
            <a className="aj-button aj-button-outline" href={FOKUS.sourceUrl} target="_blank" rel="noopener noreferrer">View on GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </header>

        <section className="aj-case-section" aria-labelledby="problem-heading">
          <div className="aj-case-section-heading">
            <p className="aj-eyebrow aj-eyebrow-accent">01 · THE PROBLEM</p>
            <h2 id="problem-heading">Make focused work easier to begin and sustain.</h2>
          </div>
          <div className="aj-case-copy">
            <p>The project is built around a straightforward idea: a timer by itself is not a complete productivity system. Fokus combines focus sessions with ambient environments, reminders and lightweight personal systems so the work session sits inside a broader routine.</p>
            <p><strong>Who it is for:</strong> people who want a focused workspace with fewer separate tools for sessions, sound, reminders and progress.</p>
            <p className="aj-case-source-note">Project scope and feature descriptions are taken from the Fokus repository README.</p>
          </div>
        </section>

        <section className="aj-case-section aj-case-built" aria-labelledby="built-heading">
          <div className="aj-case-section-heading">
            <p className="aj-eyebrow aj-eyebrow-accent">02 · WHAT I BUILT</p>
            <h2 id="built-heading">A small productivity workspace, not just a timer.</h2>
          </div>
          <div className="aj-case-feature-grid">
            {features.map((feature, index) => (
              <article className="aj-case-feature" key={feature}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{feature}</h3>
              </article>
            ))}
          </div>
        </section>


        <section className="aj-case-section" aria-labelledby="screenshots-heading">
          <div className="aj-case-section-heading">
            <p className="aj-eyebrow aj-eyebrow-accent">03 · PRODUCT SURFACES</p>
            <h2 id="screenshots-heading">Screenshots from the running app.</h2>
            <p>TODO(Aman): Add genuine captures from the current Fokus build. These clearly marked placeholders are not presented as real screenshots.</p>
          </div>
          <div className="aj-case-screenshots">
            {[
              { number: "01", title: "Focus session", caption: "TODO(Aman): Add a current focus-session screenshot." },
              { number: "02", title: "Study room", caption: "TODO(Aman): Add a current room / task-list screenshot." },
              { number: "03", title: "Analytics", caption: "TODO(Aman): Add a current analytics screenshot." },
              { number: "04", title: "Environment", caption: "TODO(Aman): Add an ambient environment screenshot." },
            ].map((shot) => (
              <figure className="aj-case-screenshot-placeholder" key={shot.number}>
                <div className="aj-case-placeholder-visual">
                  <span className="aj-case-placeholder-index">{shot.number}</span>
                  <span className="aj-case-placeholder-symbol" aria-hidden="true">＋</span>
                  <strong className="aj-case-placeholder-title">{shot.title}</strong>
                  <span className="aj-case-placeholder-label">Screenshot pending</span>
                </div>
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
          <p className="aj-case-placeholder-copy">No verified app screenshot files were available in this repository at the time this page was rebuilt.</p>
        </section>

        <section className="aj-case-section" aria-labelledby="stack-heading">
          <div className="aj-case-section-heading">
            <p className="aj-eyebrow aj-eyebrow-accent">04 · STACK</p>
            <h2 id="stack-heading">Tools and integrations.</h2>
          </div>
          <div className="aj-work-tags aj-case-stack">
            {stack.map((item) => <span key={item}>{item}</span>)}
          </div>
          <p className="aj-case-source-note">The stack above is listed in the Fokus repository README; it is not a claim that each package is used by every platform build.</p>
        </section>

        <FinanceWorkSection insideContainer />

        <section className="aj-case-next">
          <div>
            <p className="aj-eyebrow aj-eyebrow-accent">NEXT</p>
            <h2>Fokus is still under active development.</h2>
            <p>This page currently covers the product scope and technology stack. As the case study develops, I’ll add genuine app screenshots and specific engineering decisions.</p>
          </div>
          <div className="aj-feature-actions">
            <a className="aj-button aj-button-primary" href={FOKUS.storeUrl} target="_blank" rel="noopener noreferrer">Get Fokus <span aria-hidden="true">↗</span></a>
            <a className="aj-button aj-button-outline" href={FOKUS.sourceUrl} target="_blank" rel="noopener noreferrer">View source <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </div>
    </main>
  );
}
