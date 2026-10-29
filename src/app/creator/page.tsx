import type { Metadata } from "next";
import { LatestVideos } from "@/components/sections/latest-videos";

export const metadata: Metadata = {
  title: "Creator",
  description: "Finance education, learning resources and useful ideas from Aman Jain's YouTube and Instagram content.",
  alternates: { canonical: "/creator" },
};

const creatorPillars = [
  {
    number: "01",
    title: "Finance education",
    description: "Financial concepts, mutual funds, investment fundamentals, valuation frameworks and explainers that connect classroom ideas to real-world mechanics.",
    format: "Breakdowns and explainers",
  },
  {
    number: "02",
    title: "Learning and careers",
    description: "CFA preparation, undergraduate career resources, analytical certifications and study systems for students learning finance.",
    format: "Guides and study blueprints",
  },
  {
    number: "03",
    title: "Tools and experiments",
    description: "Software tools, AI workflows, dashboards and code experiments built to test ideas and document the learning process.",
    format: "Build notes and walkthroughs",
  },
];

export default function CreatorPage() {
  return (
    <main id="main" className="aj-inner-page aj-creator-page">
      <div className="aj-container">
        <header className="aj-inner-heading aj-creator-hero">
          <p className="aj-eyebrow aj-eyebrow-accent">CREATOR HUB</p>
          <h1>Finance, learning and useful ideas — shared in public.</h1>
          <p>I create educational content around finance, investing concepts, career resources and the tools I explore along the way. The aim is to make useful ideas easier to understand and apply.</p>
          <div className="aj-feature-actions aj-creator-actions">
            <a className="aj-button aj-button-primary" href="https://www.youtube.com/@AmanJain-4" target="_blank" rel="noopener noreferrer">Subscribe on YouTube <span aria-hidden="true">↗</span></a>
            <a className="aj-button aj-button-outline" href="https://www.instagram.com/aman.ja1n/" target="_blank" rel="noopener noreferrer">Follow on Instagram <span aria-hidden="true">↗</span></a>
          </div>
        </header>

        <LatestVideos />

        <section className="aj-case-section aj-creator-pillars" aria-labelledby="creator-pillars-heading">
          <div className="aj-case-section-heading">
            <p className="aj-eyebrow aj-eyebrow-accent">CONTENT PILLARS</p>
            <h2 id="creator-pillars-heading">What I like to share.</h2>
          </div>
          <div className="aj-creator-pillar-grid">
            {creatorPillars.map((pillar) => (
              <article className="aj-creator-pillar" key={pillar.number}>
                <span className="aj-creator-pillar-number">{pillar.number}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
                <span className="aj-creator-format">{pillar.format}</span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
