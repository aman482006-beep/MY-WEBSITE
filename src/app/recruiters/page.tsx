import type { Metadata } from "next";
import Link from "next/link";
import { currentlyOpenTo } from "@/data/profile";
import { ResumeDownload } from "@/components/sections/resume-download";

export const metadata: Metadata = {
  title: "Recruiters",
  description: "Education, internships, CFA candidate status, skills and selected qualifications for recruiters and collaborators.",
  alternates: { canonical: "/recruiters" },
};

const overview = [
  { title: "Education", body: "BBA — Finance & Marketing Analytics", note: "CHRIST University · 2024–2027" },
  { title: "Internships", body: "Finance internship experience", note: "Nuvama Wealth · DAGAS" },
  { title: "CFA Program", body: "Level II candidate", note: "CFA Program" },
  { title: "Focus", body: "Finance, analytics and technology", note: "Content and communication" },
];

const skillsCategories = [
  {
    category: "Finance & analytics",
    skills: ["Financial analysis", "Financial modelling fundamentals", "Valuation fundamentals", "Portfolio risk and return", "Market research", "Financial data analysis"],
  },
  {
    category: "Business & commercial",
    skills: ["Commercial analysis", "Finance-related business problems", "Sales and marketing analytics", "Competitive market research"],
  },
  {
    category: "Technology & software",
    skills: ["Microsoft Excel", "Python · Pandas · NumPy · FastAPI", "GitHub and version control", "Financial data workflows and APIs", "AI-assisted development", "Next.js · PostgreSQL"],
  },
  {
    category: "Content & communication",
    skills: ["Finance content creation", "Explaining technical and financial concepts", "DaVinci Resolve", "Canva and visual presentation"],
  },
];

const credentials = [
  {
    title: "Learn to Analyse Stocks",
    issuer: "SOIC · School of Intrinsic Compounding",
    focus: "Fundamental stock analysis, business moat evaluation and reading Indian annual reports.",
  },
  {
    title: "Investment Banking Simulator",
    issuer: "Financial valuation simulation",
    focus: "Core transaction mechanics, DCF projections and comparable company analysis.",
  },
  {
    title: "Financial Modeling & Excel Analysis",
    issuer: "Professional coursework",
    focus: "Three-statement modelling, sensitivity tables and scenario forecasting.",
  },
  {
    title: "Private Equity & Venture Capital Course",
    issuer: "Academic & Professional Seminar",
    focus: "Term sheets, capitalization tables, deal sourcing and investment committee evaluation.",
  },
  {
    title: "Investor Awareness & Market Regulations",
    issuer: "SEBI / NISM programs",
    focus: "Investor protection, market regulation and financial-market fundamentals.",
  },
];

export default function RecruitersPage() {
  return (
    <main id="main" className="aj-inner-page aj-recruiters-page">
      <div className="aj-container">
        <header className="aj-inner-heading aj-recruiters-hero">
          <p className="aj-eyebrow aj-eyebrow-accent">FOR RECRUITERS & COLLABORATORS</p>
          <h1>A clear picture of my background.</h1>
          <p>I&apos;m Aman Jain, a BBA student at CHRIST (Deemed to be University), Bengaluru, specialising in Finance & Marketing Analytics. I explore finance, analytical tools, fintech, technology and educational content.</p>
          <p className="aj-currently-line"><strong>Currently:</strong> {currentlyOpenTo}</p>
          <div className="aj-feature-actions aj-recruiter-page-actions">
            <ResumeDownload />
            <a className="aj-button aj-button-outline" href="https://www.linkedin.com/in/amanmalu/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a className="aj-button aj-button-outline" href="mailto:jain.aman3789@gmail.com">Email <span aria-hidden="true">↗</span></a>
          </div>
        </header>

        <section className="aj-case-section" aria-labelledby="recruiter-overview-heading">
          <div className="aj-case-section-heading">
            <p className="aj-eyebrow aj-eyebrow-accent">AT A GLANCE</p>
            <h2 id="recruiter-overview-heading">A quick overview.</h2>
          </div>
          <div className="aj-recruiter-overview-grid">
            {overview.map((item) => (
              <article className="aj-recruiter-overview-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span>{item.note}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="aj-case-section" aria-labelledby="recruiter-skills-heading">
          <div className="aj-case-section-heading">
            <p className="aj-eyebrow aj-eyebrow-accent">SKILLS</p>
            <h2 id="recruiter-skills-heading">Areas I work across.</h2>
          </div>
          <div className="aj-recruiter-skills-grid">
            {skillsCategories.map((group) => (
              <article className="aj-recruiter-skill-card" key={group.category}>
                <h3>{group.category}</h3>
                <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="aj-case-section" aria-labelledby="recruiter-credentials-heading">
          <div className="aj-case-section-heading">
            <p className="aj-eyebrow aj-eyebrow-accent">COURSEWORK & PROGRAMMES</p>
            <h2 id="recruiter-credentials-heading">Selected qualifications.</h2>
          </div>
          <div className="aj-credentials-list">
            {credentials.map((credential) => (
              <article className="aj-credential-item" key={credential.title}>
                <div><h3>{credential.title}</h3><span>{credential.issuer}</span></div>
                <p>{credential.focus}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="aj-case-next">
          <div>
            <p className="aj-eyebrow aj-eyebrow-accent">GET IN TOUCH</p>
            <h2>Interested in working together?</h2>
            <p>For internships, projects or professional conversations, email is the simplest way to reach me.</p>
          </div>
          <div className="aj-feature-actions">
            <a className="aj-button aj-button-primary" href="mailto:jain.aman3789@gmail.com?subject=Opportunity%20Inquiry%20-%20Aman%20Jain">Email Aman <span aria-hidden="true">↗</span></a>
            <Link className="aj-button aj-button-outline" href="/contact">Contact page <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
