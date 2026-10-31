"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  isInboxConfigured,
  submitContactMessage,
  type InquiryCategory,
} from "@/lib/contact-inbox";

const categories: {
  label: InquiryCategory;
  subject: string;
  bodyTemplate: string;
  description: string;
}[] = [
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

type SendStatus = "idle" | "sending" | "success" | "error";

export function ContactContent() {
  const [selectedCategory, setSelectedCategory] = useState<InquiryCategory>("Professional Opportunities");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");
  const [sendError, setSendError] = useState("");
  const currentCategory = categories.find((category) => category.label === selectedCategory) ?? categories[0];
  const configured = isInboxConfigured();
  const mailtoHref = `mailto:jain.aman3789@gmail.com?subject=${encodeURIComponent(currentCategory.subject)}&body=${encodeURIComponent(currentCategory.bodyTemplate)}`;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("jain.aman3789@gmail.com");
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSendError("");
    setSendStatus("sending");

    // Quietly discard bot submissions caught by the off-screen honeypot.
    if (website.trim()) {
      setSendStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setWebsite("");
      return;
    }

    try {
      await submitContactMessage({ name, email, phone, category: selectedCategory, message });
      setSendStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      setSendStatus("error");
      setSendError(error instanceof Error ? error.message : "Your message could not be sent. Please try the email draft instead.");
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

            <div className="aj-contact-form-panel">
              <div className="aj-contact-form-heading">
                <div>
                  <span className="aj-contact-preview-label">YOUR MESSAGE</span>
                  <h3>Send it straight to my inbox.</h3>
                </div>
                <span className="aj-contact-form-mark" aria-hidden="true">↗</span>
              </div>
              <p className="aj-contact-selected-category">Selected category <strong>{selectedCategory}</strong></p>

              <form className="aj-contact-form" onSubmit={sendMessage}>
                <div className="aj-contact-form-grid">
                  <label className="aj-contact-field">
                    <span>Name <b aria-hidden="true">*</b></span>
                    <input autoComplete="name" name="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" maxLength={100} required />
                  </label>
                  <label className="aj-contact-field">
                    <span>Email <b aria-hidden="true">*</b></span>
                    <input autoComplete="email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" maxLength={254} required />
                  </label>
                  <label className="aj-contact-field aj-contact-field-full">
                    <span>Phone number <small>Optional</small></span>
                    <input autoComplete="tel" name="phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+91 98765 43210" maxLength={40} />
                  </label>
                  <label className="aj-contact-field aj-contact-field-full">
                    <span>Message <b aria-hidden="true">*</b></span>
                    <textarea name="message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell me a little about what you have in mind..." rows={5} maxLength={4000} required />
                    <small className="aj-contact-character-count">{message.length}/4,000</small>
                  </label>
                </div>

                <label className="aj-contact-honeypot" aria-hidden="true">
                  Leave this field empty
                  <input tabIndex={-1} autoComplete="off" name="website" value={website} onChange={(event) => setWebsite(event.target.value)} />
                </label>

                <div className="aj-contact-form-footer">
                  <p>Only used to respond to your message. No mailing list.</p>
                  <button className="aj-button aj-button-primary" type="submit" disabled={!configured || sendStatus === "sending"}>
                    {sendStatus === "sending" ? "Sending..." : "Send message"}
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>

                {!configured && (
                  <p className="aj-contact-form-status is-error" role="status">
                    The inbox is not connected yet. You can still use the email draft below.
                  </p>
                )}
                {sendStatus === "success" && (
                  <p className="aj-contact-form-status is-success" role="status">
                    Message sent. Thanks for reaching out — I&apos;ll get back to you.
                  </p>
                )}
                {sendStatus === "error" && (
                  <p className="aj-contact-form-status is-error" role="alert">{sendError}</p>
                )}
              </form>
            </div>

            <div className="aj-contact-compose-preview">
              <span className="aj-contact-preview-label">PREFER EMAIL?</span>
              <p>{currentCategory.subject}</p>
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
            <Link className="aj-contact-inbox-link" href="/inbox/">Private inbox <span aria-hidden="true">↗</span></Link>
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
