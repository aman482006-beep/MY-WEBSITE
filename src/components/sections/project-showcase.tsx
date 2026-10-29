"use client";

import { useMemo, useState } from "react";

type Category = "Finance & data" | "AI & systems" | "Product & web" | "Education";
type Filter = "All work" | Category;
type Project = {
  id: string; title: string; subtitle: string; description: string; category: Category;
  kind: string; repo: string; demo?: string; tags: string[]; visual: "market" | "agents" | "venture" | "math";
  note: string;
};

const projects: Project[] = [
  {
    id: "market-monitor", title: "Market Monitor", subtitle: "Indian equity-market intelligence",
    description: "A market-intelligence terminal connecting data ingestion, PostgreSQL, analytics and a Next.js dashboard — with source timestamps and no seeded fake prices.",
    category: "Finance & data", kind: "Market data · Dashboard",
    repo: "https://github.com/aman482006-beep/market-monitor",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Market data"], visual: "market",
    note: "Illustrative interface artwork — not live market data",
  },
  {
    id: "agentic-finance-lab", title: "Agentic Finance Research Lab", subtitle: "Research workflows with explicit risk gates",
    description: "An original research layer exploring multi-agent financial analysis, evidence tracking and deterministic portfolio-risk workflows. Upstream research code is attributed in the repository.",
    category: "AI & systems", kind: "Finance × AI · Research",
    repo: "https://github.com/aman482006-beep/Aman-trading-agent",
    tags: ["Agent systems", "Evidence ledger", "Risk controls"], visual: "agents",
    note: "Workflow illustration — not an investment recommendation",
  },
  {
    id: "ideas-to-execution", title: "Ideas to Execution", subtitle: "A venture-capital storytelling experiment",
    description: "An independent interactive web recreation exploring how an investment thesis, portfolio and founder journey can be communicated through structured content and motion.",
    category: "Product & web", kind: "Interactive website · Independent recreation",
    repo: "https://github.com/aman482006-beep/ideas-to-execution",
    demo: "https://aman482006-beep.github.io/ideas-to-execution/",
    tags: ["Next.js", "Interaction", "Storytelling"], visual: "venture",
    note: "Independent project; not affiliated with 8i Ventures",
  },
  {
    id: "airmath-ai", title: "AirMath AI", subtitle: "A webcam-driven mathematics workspace",
    description: "An educational engineering project connecting hand gestures, canvas drawing, browser OCR, symbolic mathematics and a real-time tutoring workflow.",
    category: "Education", kind: "Computer vision · Education",
    repo: "https://github.com/aman482006-beep/Airmath-AI",
    tags: ["React", "MediaPipe", "Tesseract.js", "SymPy"], visual: "math",
    note: "Conceptual preview — open the repository for implementation details",
  },
];

const filters: Filter[] = ["All work", "Finance & data", "AI & systems", "Product & web", "Education"];

function ProjectArtwork({ visual }: { visual: Project["visual"] }) {
  if (visual === "market") return (
    <div className="aj-project-art aj-art-market" aria-hidden="true">
      <div className="aj-art-windowbar"><span /><span /><span /><b>MARKET MONITOR</b><i>UI CONCEPT</i></div>
      <div className="aj-market-layout">
        <div className="aj-market-sidebar">
          <span className="aj-art-overline">MARKET BREADTH</span>
          {["Advancers", "Decliners", "New highs", "New lows"].map((label) => <div className="aj-market-line" key={label}><i />{label}<b /></div>)}
        </div>
        <div className="aj-market-chart">
          <div className="aj-chart-label"><span>INDEX MOVEMENT</span><span>SCHEMATIC</span></div>
          <svg viewBox="0 0 420 160" preserveAspectRatio="none">
            <path className="aj-chart-gridline" d="M0 30H420 M0 70H420 M0 110H420 M70 0V160 M140 0V160 M210 0V160 M280 0V160 M350 0V160" />
            <path className="aj-chart-area" d="M0 125 L28 110 L55 118 L82 78 L110 88 L137 65 L165 80 L193 48 L220 63 L247 37 L275 58 L302 28 L330 40 L358 17 L385 35 L420 14 L420 160 L0 160 Z" />
            <path className="aj-chart-stroke" d="M0 125 L28 110 L55 118 L82 78 L110 88 L137 65 L165 80 L193 48 L220 63 L247 37 L275 58 L302 28 L330 40 L358 17 L385 35 L420 14" />
          </svg>
          <div className="aj-chart-footer"><span>Data pipeline</span><span>Source → analytics</span></div>
        </div>
      </div>
    </div>
  );
  if (visual === "agents") return (
    <div className="aj-project-art aj-art-agents" aria-hidden="true">
      <div className="aj-agent-top"><span>RESEARCH COPILOT</span><span>WORKFLOW / 01</span></div>
      <div className="aj-agent-flow">
        <div className="aj-agent-node aj-node-planner"><small>01</small><b>Planner</b><span>Frame the question</span></div>
        <div className="aj-agent-branch">
          <div className="aj-agent-node"><small>02A</small><b>Fundamentals</b><span>Evidence</span></div>
          <div className="aj-agent-node"><small>02B</small><b>Market context</b><span>Sources</span></div>
        </div>
        <div className="aj-agent-node aj-node-skeptic"><small>03</small><b>Skeptic + risk gate</b><span>Challenge · validate · veto</span></div>
        <div className="aj-agent-node aj-node-synthesis"><small>04</small><b>Synthesis</b><span>Auditable output</span></div>
      </div>
    </div>
  );
  if (visual === "venture") return (
    <div className="aj-project-art aj-art-venture" aria-hidden="true">
      <div className="aj-venture-nav"><b>IDEAS → EXECUTION</b><span>THESIS</span><span>PORTFOLIO</span><span>ORIGAMI</span></div>
      <div className="aj-venture-hero">
        <span className="aj-venture-kicker">FROM FIRST QUESTION TO SCALE</span>
        <strong>Build with<br /><em>conviction.</em></strong>
        <div className="aj-paper-fold"><i /><i /><i /><i /></div>
      </div>
      <div className="aj-venture-timeline"><span>01 · DISCOVER</span><i /><span>02 · VALIDATE</span><i /><span>03 · EXECUTE</span></div>
    </div>
  );
  return (
    <div className="aj-project-art aj-art-math" aria-hidden="true">
      <div className="aj-math-toolbar"><span>✳ AIR MATH</span><span>GESTURE WORKSPACE</span><span>○ ○ ○</span></div>
      <div className="aj-math-board">
        <div className="aj-math-scribble">x² + 4x + 4 = 0</div>
        <div className="aj-math-underlines"><i /><i /></div>
        <div className="aj-math-result"><span>SYMBOLIC SOLVING</span><b>(x + 2)² = 0</b><small>Illustrative equation</small></div>
        <div className="aj-math-cursor"><span>✦</span></div>
      </div>
    </div>
  );
}

export function ProjectShowcase() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All work");
  const visible = useMemo(
    () => activeFilter === "All work" ? projects : projects.filter((p) => p.category === activeFilter),
    [activeFilter],
  );

  return (
    <section className="aj-section aj-projects-section" id="selected-projects" aria-labelledby="selected-projects-heading">
      <div className="aj-container">
        <div className="aj-section-heading aj-projects-heading">
          <div>
            <p className="aj-eyebrow aj-eyebrow-accent">SELECTED PROJECTS</p>
            <h2 id="selected-projects-heading">Projects at the intersection<br className="aj-desktop-break" /> of finance and technology.</h2>
            <p className="aj-heading-subtitle">A few things I’ve explored, built and learned from — with source code and live demos where available.</p>
          </div>
          <a className="aj-text-link" href="https://github.com/aman482006-beep" target="_blank" rel="noopener noreferrer">Browse all repositories <span aria-hidden="true">↗</span></a>
        </div>
        <div className="aj-project-filters" role="group" aria-label="Filter projects by discipline">
          {filters.map((filter) => (
            <button className={"aj-project-filter" + (activeFilter === filter ? " is-active" : "")}
              type="button" key={filter} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
              {filter}
            </button>
          ))}
        </div>
        <p className="aj-project-filter-summary" role="status">{visible.length} {visible.length === 1 ? "project" : "projects"} shown · {activeFilter}</p>
        <div className="aj-project-grid">
          {visible.map((project, index) => (
            <article className={"aj-project-card aj-project-card-" + project.visual} key={project.id}>
              <ProjectArtwork visual={project.visual} />
              <div className="aj-project-card-content">
                <div className="aj-project-card-meta"><span>{project.kind}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
                <h3>{project.title}</h3>
                <p className="aj-project-subtitle">{project.subtitle}</p>
                <p className="aj-project-description">{project.description}</p>
                <div className="aj-project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <p className="aj-project-note">{project.note}</p>
                <div className="aj-project-actions">
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">View source <span aria-hidden="true">↗</span></a>
                  {project.demo && <a className="aj-project-demo" href={project.demo} target="_blank" rel="noopener noreferrer">Live demo <span aria-hidden="true">↗</span></a>}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="aj-project-disclaimer">Only Ideas to Execution is linked as a public demo in this section. The other projects are not presented as deployed live products.</p>
      </div>
    </section>
  );
}
