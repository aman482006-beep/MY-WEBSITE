"use client";

import { useState, type FormEvent } from "react";

const resourceAreas = [
  {
    number: "01",
    title: "Finance toolkits",
    description: "Clear, practical ways to explore financial statements, valuation assumptions and portfolio risk.",
    tags: ["Excel", "Analysis", "Valuation"],
  },
  {
    number: "02",
    title: "CFA study systems",
    description: "Revision trackers, formula references and ways to organise a demanding study plan.",
    tags: ["Revision", "Fixed income", "FSA"],
    link: {
      label: "CFA Level 1 resources",
      href: "https://drive.google.com/drive/mobile/folders/1BWsJY1_X_vU9EwE9qf1B7m5UIudjbCRC?usp=sharing&fbclid=PAT01DUAVQU9dleHRuA2FlbQIxMABwZG9mAnNydGMGYXBwX2lkDzU2NzA2NzM0MzM1MjQyNwABp2JIt92T1C2-fXnLY4pJGotKTQHAqmH3NCvv33vTYyMiMUVn5R7TDYE_OKEn_aem_EYcuqGs8_SWhNv-vwqKxQQ",
    },
  },
  {
    number: "03",
    title: "Creator workflows",
    description: "Frameworks for turning a finance topic into a concise, useful video or visual explanation.",
    tags: ["Scripting", "Storytelling", "Video"],
  },
];

export function ResourcesContent() {
  const [requestText, setRequestText] = useState("");

  function handleRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const request = requestText.trim();
    if (!request) return;
    const subject = encodeURIComponent("Resource request - Aman Jain portfolio");
    const body = encodeURIComponent(`Hi Aman,\\n\\nI'd like to request a resource about:\\n${request}\\n\\nThanks.`);
    window.location.href = `mailto:jain.aman3789@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <main id="main" className="aj-inner-page aj-resources-page">
      <div className="aj-container">
        <header className="aj-inner-heading">
          <p className="aj-eyebrow aj-eyebrow-accent">RESOURCE LIBRARY</p>
          <h1>Useful tools for learning finance.</h1>
          <p>I’m shaping this library around practical tools, not downloads for the sake of having downloads. These are the areas I plan to build and share as each resource is tested and ready.</p>
        </header>

        <section className="aj-resource-grid" aria-label="Planned resource areas">
          {resourceAreas.map((area) => (
            <article className="aj-resource-card" key={area.number}>
              <div className="aj-resource-card-top">
                <span className="aj-resource-format">PLANNED FOCUS</span>
                <span className="aj-creator-pillar-number">{area.number}</span>
              </div>
              <h2>{area.title}</h2>
              <p>{area.description}</p>
              <div className="aj-resource-tags">
                {area.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              {"link" in area && area.link ? (
                <a
                  className="aj-button aj-button-primary"
                  href={area.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {area.link.label} <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </article>
          ))}
        </section>

        <section className="aj-resource-request" aria-labelledby="resource-request-heading">
          <div>
            <p className="aj-eyebrow aj-eyebrow-accent">SHAPE THE LIBRARY</p>
            <h2 id="resource-request-heading">What would actually help you?</h2>
            <p>Suggest a topic and I’ll use it to prioritise future resources. This opens a draft in your email app; it does not submit data to the website.</p>
          </div>
          <form onSubmit={handleRequest}>
            <label htmlFor="resource-request">Resource topic</label>
            <textarea
              id="resource-request"
              value={requestText}
              onChange={(event) => setRequestText(event.target.value)}
              rows={3}
              placeholder="e.g. a portfolio analysis workbook"
              required
            />
            <button type="submit" className="aj-button aj-button-primary">Draft email request <span aria-hidden="true">↗</span></button>
          </form>
        </section>
      </div>
    </main>
  );
}
