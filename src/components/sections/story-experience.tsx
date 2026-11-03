"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const profileImageSrc = process.env.GITHUB_ACTIONS === "true"
  ? "/MY-WEBSITE/aman-profile-4k.avif"
  : "/aman-profile.webp";

const chapters = [
  {
    number: "01",
    period: "2024 — 2027",
    label: "The starting point",
    title: "Curiosity found a direction.",
    intro: "I chose to study business, finance and marketing because I wanted to understand two things: how decisions move money, and how ideas move people.",
    paragraphs: [
      "I'm pursuing a BBA in Finance & Marketing Analytics at CHRIST (Deemed to be University), Bengaluru. The mix matters to me: numbers explain what is happening, while marketing helps explain why people care.",
      "Alongside college, I kept going deeper into finance through the CFA programme. I have cleared Level I and am currently a Level II candidate."
    ],
    proof: ["BBA · Finance & Marketing Analytics", "CHRIST University, Bengaluru", "CFA Level II candidate"],
    takeaway: "I enjoy the point where analytical thinking meets human behaviour."
  },
  {
    number: "02",
    period: "Learning by doing",
    label: "Outside the classroom",
    title: "I wanted to see how the work actually happens.",
    intro: "Internships gave me different views of finance and analysis: the detail inside a spreadsheet, the discipline behind a process, and the decisions that turn information into action.",
    paragraphs: [
      "My experience includes finance work at DAGAS and Nuvama Wealth, along with earlier exposure to financial research and data analysis through D. E. Shaw FinRes and Unified Mentor.",
      "At DAGAS, I worked as a Finance Intern from April to July 2026. I then joined Nuvama Wealth in Bengaluru as a Finance Intern from July to August 2026."
    ],
    proof: ["DAGAS · Finance Intern · Apr–Jul 2026", "Nuvama Wealth · Finance Intern · Jul–Aug 2026", "D. E. Shaw FinRes · Internship", "Unified Mentor · Data Analyst Internship"],
    takeaway: "The useful question is not only what a number says, but what decision it should inform."
  },
  {
    number: "03",
    period: "Along the way",
    label: "Making ideas understandable",
    title: "I started explaining what I was learning.",
    intro: "Content creation became a practical way to turn complicated subjects into something another person could understand and use.",
    paragraphs: [
      "I've created more than 100 videos across finance, learning and related topics. The work has involved researching an idea, finding the simplest explanation, writing a hook, recording, editing and learning what makes someone stay.",
      "That process taught me that knowing something and communicating it clearly are two different skills. The second takes deliberate work."
    ],
    proof: ["100+ videos created", "YouTube · Instagram", "Research · Scripting · Editing"],
    takeaway: "A good explanation respects the audience's time. A good story gives them a reason to care."
  },
  {
    number: "04",
    period: "Building now",
    label: "From ideas to things people can use",
    title: "I got tired of leaving ideas in tabs and notes.",
    intro: "I began building small products and experiments so I could learn by making something real—not just by reading about how it should work.",
    paragraphs: [
      "Fokus is my productivity app, available for Windows through the Microsoft Store. It brings focus sessions, tasks, screen-time insights and practical tools into one workspace.",
      "I'm also working on AI and finance projects: a personal finance manager, an automated financial-modelling agent, and a quantitative trading and backtesting system. These are active builds and experiments, not finished products being presented as something they are not."
    ],
    proof: ["Fokus · Available on Microsoft Store", "AI Personal Finance Manager · In progress", "Financial Modelling Agent · In progress", "Quantitative Trading System · Prototype"],
    takeaway: "Building makes gaps visible. It forces an idea to meet real constraints."
  },
  {
    number: "05",
    period: "The next chapter",
    label: "What I'm moving towards",
    title: "More experiments. More real-world feedback.",
    intro: "The thread connecting my interests is simple: understand a problem, make an idea tangible, explain it clearly, and find out whether it is useful to someone.",
    paragraphs: [
      "I'm interested in work where analytical thinking and creative execution meet—growth, fintech, product experiments, content and the systems that help good ideas reach people.",
      "My next step is to get closer to users, test ideas in the real world, measure what works and get better at the parts that don't. I don't want a polished story that pretends every step was planned. I want a body of work that shows what I tried and what I learned."
    ],
    proof: ["Understand the audience", "Make and test the idea", "Measure what changed", "Share what I learned"],
    takeaway: "Curiosity starts the work. Execution and feedback make it worth something."
  }
] as const;

export function StoryPreview() {
  return (
    <section className="aj-section aj-story-preview" id="my-story">
      <div className="aj-container aj-story-preview-grid">
        <div className="aj-story-preview-copy">
          <p className="aj-eyebrow aj-eyebrow-accent">BEHIND THE PROJECTS</p>
          <h2>Explore my story<span>.</span></h2>
          <p>Not a résumé in paragraph form. The route behind the work: what I studied, where I learned, what I made, and what I'm figuring out next.</p>
          <Link href="/story" className="aj-button aj-button-primary">Explore my story <span aria-hidden="true">→</span></Link>
        </div>
        <div className="aj-story-preview-map" aria-label="A quick map of the story">
          <div className="aj-story-preview-line" aria-hidden="true" />
          <div className="aj-story-preview-node"><span>01</span><div><strong>Learn</strong><small>Finance · analytics</small></div></div>
          <div className="aj-story-preview-node"><span>02</span><div><strong>Explore</strong><small>Internships · experience</small></div></div>
          <div className="aj-story-preview-node"><span>03</span><div><strong>Create</strong><small>100+ videos</small></div></div>
          <div className="aj-story-preview-node"><span>04</span><div><strong>Build</strong><small>Products · experiments</small></div></div>
          <div className="aj-story-preview-node"><span>05</span><div><strong>What's next</strong><small>Test · learn · repeat</small></div></div>
        </div>
      </div>
    </section>
  );
}

export function StoryExperience() {
  const [activeChapter, setActiveChapter] = useState(0);
  const chapter = chapters[activeChapter];

  return (
    <main id="main" className="aj-story-page">
      <section className="aj-story-hero">
        <div className="aj-container aj-story-hero-grid">
          <div className="aj-story-hero-copy">
            <p className="aj-eyebrow aj-eyebrow-accent">A WORK IN PROGRESS · IN THE BEST WAY</p>
            <h1>Explore my <em>story.</em></h1>
            <p className="aj-story-hero-lede">A little finance, a little making, a lot of curiosity. Here's how the pieces connect—and what I'm trying to figure out next.</p>
            <div className="aj-story-hero-actions">
              <a className="aj-button aj-button-primary" href="#story-chapters">Start exploring <span aria-hidden="true">↓</span></a>
              <Link className="aj-button aj-button-outline" href="/projects">See what I do</Link>
            </div>
            <div className="aj-story-hero-facts">
              <span>CHRIST · BBA 2024–27</span>
              <span>100+ videos</span>
              <span>Building in public</span>
            </div>
          </div>
          <div className="aj-story-hero-portrait">
            <div className="aj-story-portrait-note">Still curious.<br />Still figuring it out. ↗</div>
            <div className="aj-story-portrait-frame">
              <Image src={profileImageSrc} alt="Portrait of Aman Jain" fill priority sizes="(max-width: 800px) 78vw, 420px" />
            </div>
            <span className="aj-story-portrait-caption">THE PERSON BEHIND THE SIDE QUESTS</span>
          </div>
        </div>
      </section>

      <section className="aj-story-chapters aj-section" id="story-chapters">
        <div className="aj-container">
          <div className="aj-story-heading">
            <div>
              <p className="aj-eyebrow aj-eyebrow-accent">THE STORY SO FAR</p>
              <h2>Not a straight line.<br /><em>A trail of experiments.</em></h2>
            </div>
            <p>Choose a chapter. The story is organised around the things that changed how I think—not just a list of dates and job titles.</p>
          </div>

          <div className="aj-story-explorer">
            <div className="aj-story-chapter-list" role="tablist" aria-label="Story chapters">
              {chapters.map((item, index) => (
                <button
                  className={"aj-story-chapter-tab" + (activeChapter === index ? " is-active" : "")}
                  key={item.number}
                  type="button"
                  role="tab"
                  id={"story-tab-" + item.number}
                  aria-selected={activeChapter === index}
                  aria-controls="story-chapter-panel"
                  onClick={() => setActiveChapter(index)}
                >
                  <span>{item.number}</span>
                  <span className="aj-story-tab-copy"><strong>{item.label}</strong><small>{item.period}</small></span>
                  <span className="aj-story-tab-arrow" aria-hidden="true">↗</span>
                </button>
              ))}
            </div>

            <article className="aj-story-chapter-panel" id="story-chapter-panel" role="tabpanel" aria-labelledby={"story-tab-" + chapter.number} key={chapter.number}>
              <div className="aj-story-chapter-topline"><span>CHAPTER {chapter.number}</span><span>{chapter.period}</span></div>
              <p className="aj-story-chapter-label">{chapter.label}</p>
              <h3>{chapter.title}</h3>
              <p className="aj-story-chapter-intro">{chapter.intro}</p>
              <div className="aj-story-chapter-body">
                {chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="aj-story-proof">
                <span className="aj-story-proof-label">THE RECEIPTS</span>
                <div>{chapter.proof.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
              <div className="aj-story-takeaway"><span>WHAT STUCK WITH ME</span><p>{chapter.takeaway}</p></div>
              <div className="aj-story-panel-nav">
                <span>{activeChapter + 1} / {chapters.length}</span>
                <div>
                  <button type="button" onClick={() => setActiveChapter((current) => Math.max(0, current - 1))} disabled={activeChapter === 0}>← Previous</button>
                  <button type="button" onClick={() => setActiveChapter((current) => Math.min(chapters.length - 1, current + 1))} disabled={activeChapter === chapters.length - 1}>Next chapter →</button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="aj-story-next-section">
        <div className="aj-container aj-story-next-grid">
          <div>
            <p className="aj-eyebrow aj-eyebrow-accent">THE NEXT EXPERIMENT</p>
            <h2>Make the idea.<br /><em>Meet the real world.</em></h2>
            <p>My current direction is to connect finance, technology and communication through work that people can actually use. That means getting closer to users, testing the message, learning from the numbers and improving the product or campaign.</p>
          </div>
          <div className="aj-story-experiment-steps">
            <div><span>01</span><strong>Find the friction</strong><p>What is confusing, slow or needlessly difficult for someone?</p></div>
            <div><span>02</span><strong>Make a first version</strong><p>Build the smallest useful idea instead of waiting for a perfect plan.</p></div>
            <div><span>03</span><strong>Put it in front of people</strong><p>Listen to what they do—not only what they say.</p></div>
            <div><span>04</span><strong>Measure and adapt</strong><p>Keep what works, be honest about what doesn't, and try again.</p></div>
          </div>
        </div>
      </section>

      <section className="aj-story-outro aj-section">
        <div className="aj-container aj-story-outro-inner">
          <p className="aj-eyebrow aj-eyebrow-accent">STILL ADDING CHAPTERS</p>
          <h2>The best part of the story<br /><em>is what I do next.</em></h2>
          <p>This page should keep getting more specific as I document the real decisions, unexpected turns and lessons behind the work. The point isn't to make the journey look perfect. It's to make the learning visible.</p>
          <div className="aj-story-outro-actions">
            <Link href="/projects" className="aj-button aj-button-primary">See what I do <span aria-hidden="true">→</span></Link>
            <Link href="/contact" className="aj-button aj-button-outline">Start a conversation</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
