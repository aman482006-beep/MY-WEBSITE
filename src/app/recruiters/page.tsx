import type { Metadata } from "next";
import { currentlyOpenTo } from "@/data/profile";
import { ResumeDownload } from "@/components/sections/resume-download";

export const metadata: Metadata = {
  title: "Recruiters & Collaborators",
  description: "A concise introduction to Aman Jain, with a resume and direct links for professional conversations and collaborations.",
  alternates: { canonical: "/recruiters" },
};

export default function RecruitersPage() {
  return (
    <main id="main" className="aj-inner-page aj-recruiters-page">
      <div className="aj-container">
        <header className="aj-inner-heading aj-recruiters-hero">
          <p className="aj-eyebrow aj-eyebrow-accent">FOR RECRUITERS & COLLABORATORS</p>
          <h1>A little about me. The rest is in the work.</h1>
          <p>I&apos;m Aman Jain. I&apos;m curious about the overlap between finance, analytics, technology and communication—especially how to understand a problem, build something useful and explain it clearly.</p>
          <p className="aj-currently-line"><strong>Currently:</strong> {currentlyOpenTo}</p>
          <div className="aj-feature-actions aj-recruiter-page-actions">
            <ResumeDownload />
            <a className="aj-button aj-button-outline" href="https://www.linkedin.com/in/amanmalu/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a className="aj-button aj-button-outline" href="https://github.com/aman482006-beep" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a className="aj-button aj-button-outline" href="mailto:jain.aman3789@gmail.com">Email <span aria-hidden="true">↗</span></a>
          </div>
        </header>
      </div>
    </main>
  );
}
