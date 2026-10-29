"use client";

import { FOKUS } from "@/data/fokus";

type Category = "Finance & data" | "AI & systems" | "Product & web" | "Education";
type Filter = "All work" | Category;
type Project = {
  id: string; title: string; subtitle: string; description: string; category: Category;
  kind: string; repo: string; demo?: string; tags: string[]; visual: "fokus";
  note: string;
};

const projects: Project[] = [
  {
    id: "fokus",
    title: FOKUS.name,
    subtitle: FOKUS.tagline,
    description: "A cross-platform productivity app for focused work, ambient environments, reminders and lightweight progress tracking.",
    category: "Product & web",
    kind: "Cross-platform app · Flutter",
    repo: FOKUS.sourceUrl,
    demo: FOKUS.storeUrl,
    tags: ["Flutter", "Dart", "Focus sessions", "Productivity"],
    visual: "fokus",
    note: "Windows version available on the Microsoft Store",
  },
];

function ProjectArtwork() {
  return (
    <div className="aj-project-art aj-art-fokus" aria-hidden="true">
      <div className="aj-fokus-window">
        <div className="aj-fokus-window-top"><span>FOKUS</span><span>FOCUS SPACE</span></div>
        <div className="aj-fokus-orbit"><span>25:00</span><small>READY WHEN YOU ARE</small></div>
        <div className="aj-fokus-scene"><i /><i /><i /><i /><i /></div>
        <div className="aj-fokus-window-bottom"><span>Focus session</span><span>Ambient space · Progress</span></div>
      </div>
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
            <p className="aj-heading-subtitle">A project portfolio with source code and a product link.</p>
          </div>
          <a className="aj-text-link" href="https://github.com/aman482006-beep" target="_blank" rel="noopener noreferrer">Browse GitHub <span aria-hidden="true">↗</span></a>
        </div>
        <div className="aj-project-grid">
          {projects.map((project) => (
            <article className="aj-project-card aj-project-card-fokus" key={project.id}>
              <ProjectArtwork />
              <div className="aj-project-card-content">
                <div className="aj-project-card-meta"><span>{project.kind}</span><span>01</span></div>
                <h3>{project.title}</h3>
                <p className="aj-project-subtitle">{project.subtitle}</p>
                <p className="aj-project-description">{project.description}</p>
                <div className="aj-project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <p className="aj-project-note">{project.note}</p>
                <div className="aj-project-actions">
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">View on GitHub <span aria-hidden="true">↗</span></a>
                  {project.demo && <a className="aj-project-demo" href={project.demo} target="_blank" rel="noopener noreferrer">Get Fokus <span aria-hidden="true">↗</span></a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
