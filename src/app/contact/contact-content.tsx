"use client";

import { useState } from "react";

type InquiryCategory =
  | "Professional Opportunities"
  | "Project Collaborations"
  | "Creator & Brand Partnerships"
  | "General";

const categories: { label: InquiryCategory; subject: string; bodyTemplate: string; description: string }[] = [
  {
    label: "Professional Opportunities",
    subject: "Professional Opportunity Inquiry - Aman Jain",
    bodyTemplate: "Hi Aman,\n\nI came across your portfolio and would like to discuss an opportunity regarding...",
    description: "Internships, roles and professional introductions.",
  },
  {
    label: "Project Collaborations",
    subject: "Project Collaboration - Aman Jain",
    bodyTemplate: "Hi Aman,\n\nI saw your finance and technology work and wanted to explore collaborating on...",
    description: "Software, analytics and finance projects.",
  },
  {
    label: "Creator & Brand Partnerships",
    subject: "Creator Collaboration - Aman Jain",
    bodyTemplate: "Hi Aman,\n\nI follow your educational content on finance/tech and would love to propose a collaboration around...",
    description: "Educational content and brand partnerships.",
  },
  {
    label: "General",
    subject: "Connecting with Aman Jain",
    bodyTemplate: "Hi Aman,\n\nWanted to reach out after exploring your website...",
    description: "Questions, feedback or a simple hello.",
  },
];

const socials = [
  { label: "LinkedIn", handle: "in/amanmalu", href: "https://www.linkedin.com/in/amanmalu/", description: "Professional updates and networking." },
  { label: "GitHub", handle: "aman482006-beep", href: "https://github.com/aman482006-beep", description: "Repositories and software experiments." },
  { label: "YouTube", handle: "@AmanJain-4", href: "https://www.youtube.com/@AmanJain-4", description: "Finance education and learning notes." },
  { label: "Instagram", handle: "@aman.ja1n", href: "https://www.instagram.com/aman.ja1n/", description: "Short-form content and student life." },
];

export function ContactContent() {
  const [selectedCategory, setSelectedCategory] = useState<InquiryCategory>("Professional Opportunities");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const currentCategory = categories.find((category) => category.label === selectedCategory) ?? categories[0];
  const mailtoHref = `mailto:jain.aman3789@gmail.com?subject=${encodeURIComponent(currentCategory.subject)}&body=${encodeURIComponent(currentCategory.bodyTemplate)}`;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("jain.aman3789@gmail.com");
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  return (
    <main id="main" className="aj-inner-page aj-contact-page">
      <div className="aj-container">
        <header className="aj-inner-heading aj-contact-hero">
          <p className="aj-eyebrow aj-eyebrow-accent">CONTACT</p>
          <h1>Have something interesting in mind?</h1>
          <p>Whether it&apos;s a professional opportunity, a project collaboration, or a creator partnership, I&apos;m open to a thoughtful conversation.</p>
        </header>

        <div className="aj-contact-page-grid">
          <section className="aj-contact-compose" aria-labelledby="contact-compose-heading">
            <p className="aj-eyebrow aj-eyebrow-accent">START A CONVERSATION</p>
            <h2 id="contact-compose-heading">What would you like to discuss?</h2>
            <div className="aj-contact-category-grid" role="group" aria-label="Choose the purpose of your message">
              {categories.map((category) => (
                <button
                  key={category.label}
                  type="button"
                  className={"aj-contact-category" + (selectedCategory === category.label ? " is-selected" : "")}
                  aria-pressed={selectedCategory === category.label}
                  onClick={() => setSelectedCategory(category.label)}
                >
                  <span>{category.label}</span>
                  <small>{category.description}</small>
                </button>
              ))}
            </div>
            <div className="aj-contact-compose-preview">
              <span className="aj-contact-preview-label">EMAIL SUBJECT</span>
              <p>{currentCategory.subject}</p>
              <span className="aj-contact-preview-label">MESSAGE STARTER</span>
              <p className="aj-contact-template">{currentCategory.bodyTemplate}</p>
            </div>
            <a className="aj-button aj-button-primary" href={mailtoHref}>Open email draft <span aria-hidden="true">↗</span></a>
          </section>

          <aside className="aj-contact-direct">
            <p className="aj-eyebrow aj-eyebrow-accent">DIRECT DETAILS</p>
            <h2>Reach me directly.</h2>
            <a className="aj-contact-email" href="mailto:jain.aman3789@gmail.com">jain.aman3789@gmail.com</a>
            <button className="aj-button aj-button-outline" type="button" onClick={copyEmail}>
              {copyStatus === "copied" ? "Email copied" : copyStatus === "failed" ? "Copy failed — select email above" : "Copy email address"}
            </button>
            <p className="aj-contact-location">Bengaluru, India</p>
            <div className="aj-contact-direct-note">Open to opportunities, projects and collaborations.</div>
          </aside>
        </div>

        <section className="aj-case-section aj-contact-social-section" aria-labelledby="contact-social-heading">
          <div className="aj-case-section-heading">
            <p className="aj-eyebrow aj-eyebrow-accent">ELSEWHERE ONLINE</p>
            <h2 id="contact-social-heading">Find me on.</h2>
          </div>
          <div className="aj-contact-social-grid">
            {socials.map((social) => (
              <a className="aj-contact-social-card" key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                <span className="aj-contact-social-label">{social.label}</span>
                <strong>{social.handle}</strong>
                <span>{social.description}</span>
                <span className="aj-contact-social-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
