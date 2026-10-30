"use client";

import { useState, type FormEvent } from "react";

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
