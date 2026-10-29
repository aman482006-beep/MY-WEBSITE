import Image from "next/image";
import Link from "next/link";
import { LatestVideos } from "@/components/sections/latest-videos";
import { FOKUS } from "@/data/fokus";
import { SocialIcon, type SocialIconName } from "@/components/layout/social-icon";

const socials: { label: string; href: string; icon: SocialIconName }[] = [
  { label: "GitHub", href: "https://github.com/aman482006-beep", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/amanmalu/", icon: "linkedin" },
  { label: "YouTube", href: "https://www.youtube.com/@AmanJain-4", icon: "youtube" },
  { label: "Instagram", href: "https://www.instagram.com/aman.ja1n/", icon: "instagram" },
];

const pillars = [
  {
    number: "01",
    title: "Finance",
    icon: "finance",
    tone: "peach",
    description: "Markets, valuation, financial analysis and the business stories behind the numbers.",
    href: "/projects",
    action: "Explore finance work",
  },
  {
    number: "02",
    title: "Build",
    icon: "build",
    tone: "blue",
    description: "AI experiments, financial-data tools, dashboards and useful software.",
    href: "/projects",
    action: "Explore projects",
  },
  {
    number: "03",
    title: "Create",
    icon: "create",
    tone: "green",
    description: "Finance explainers, educational videos and resources shared as I learn.",
    href: "/creator",
    action: "Watch my content",
  },
] as const;

function PillarIcon({ name }: { name: "finance" | "build" | "create" }) {
  const common = {
    className: "aj-pillar-svg",
    width: 30,
    height: 30,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    focusable: false as const,
  };

  if (name === "finance") {
    return <svg {...common}><path pathLength={100} d="M4 7v18h24M7 20l6-7 5 3 8-10M20 6h6v6" /></svg>;
  }
  if (name === "build") {
    return <svg {...common}><path pathLength={100} d="M11 7 4 16l7 9M21 7l7 9-7 9M18 4l-4 24" /></svg>;
  }
  return <svg {...common}><path pathLength={100} d="M8 5 27 16 8 27Z" /></svg>;
}

export default function Home() {
  return (
    <main id="main" className="aj-home">
      <section className="aj-hero">
        <div className="aj-container aj-hero-grid">
          <div className="aj-hero-copy">
            <p className="aj-eyebrow"><span /> FINANCE × TECHNOLOGY × COMMUNICATION</p>
            <h1>I study finance.<br /><em>I build</em> with technology.<br />I create to make ideas useful.</h1>
            <p className="aj-lede">
              I&apos;m Aman Jain, a BBA student exploring finance, useful technology and educational content. I turn what I learn into projects I can test, improve and share.
            </p>
            <div className="aj-hero-meta" aria-label="A few quick facts">
              <span>BBA · CHRIST University</span>
              <span>CFA Level II candidate</span>
              <span>Bengaluru, India</span>
            </div>
            <div className="aj-hero-actions">
              <Link href="/projects" className="aj-button aj-button-primary">Explore projects <span aria-hidden="true">→</span></Link>
              <Link href="/creator" className="aj-button aj-button-outline">Explore my content</Link>
            </div>
            <div className="aj-socials" aria-label="Social links">
              {socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                  <span className="aj-social-mark"><SocialIcon name={social.icon} /></span>
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="aj-hero-visual" aria-label="A portrait of Aman Jain">
            <div className="aj-orbit aj-orbit-one" />
            <div className="aj-orbit aj-orbit-two" />
            <div className="aj-note aj-note-left">Ideas<br />Markets<br />Tech<br />Progress…<span aria-hidden="true">↘</span></div>
            <div className="aj-note aj-note-right">Same curiosity.<br />Different ways. ☺</div>
            <div className="aj-photo-backdrop" />
            <div className="aj-photo-frame">
              <Image src="https://amanmalu.me/_next/image?url=%2Fprofile-2.png&w=828&q=75" alt="Portrait of Aman Jain" fill preload sizes="(max-width: 900px) 78vw, 440px" className="aj-profile-image" />
            </div>
            <div className="aj-photo-caption"><strong>BBA</strong><span>Finance &amp; Marketing Analytics</span><span>CHRIST University</span><span>Bengaluru, India</span></div>
            <span className="aj-spark aj-spark-one" aria-hidden="true">〰</span>
            <span className="aj-spark aj-spark-two" aria-hidden="true">✳</span>
          </div>
        </div>
      </section>

      <div className="aj-marquee" aria-hidden="true">
        <div className="aj-marquee-track">
          {["FINANCE", "BUILD", "CREATE", "FINANCE", "BUILD", "CREATE"].map((word, index) => (
            <span className="aj-marquee-item" key={word + index}>{word}<i>✳</i></span>
          ))}
        </div>
      </div>

      <section className="aj-section aj-pillars-section" id="explore">
        <div className="aj-container">
          <div className="aj-section-topline">
            <p className="aj-eyebrow">THREE AREAS I EXPLORE</p>
            <p className="aj-topline-aside">Different interests. A common mindset. <span>← →</span></p>
          </div>
          <div className="aj-pillar-grid">
            {pillars.map((pillar) => (
              <Link className={"aj-pillar aj-pillar-" + pillar.tone} href={pillar.href} key={pillar.title}>
                <div className="aj-pillar-icon" aria-hidden="true"><PillarIcon name={pillar.icon} /></div>
                <div className="aj-pillar-copy">
                  <div className="aj-pillar-head"><h2>{pillar.title}</h2><span>{pillar.number}</span></div>
                  <p>{pillar.description}</p>
                </div>
                <span className="aj-pillar-action">{pillar.action}<span aria-hidden="true">↗</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LatestVideos />

      <section className="aj-section aj-featured-section" id="featured">
        <div className="aj-container">
          <div className="aj-section-heading aj-section-heading-inline">
            <div><p className="aj-eyebrow aj-eyebrow-accent">FEATURED PROJECT</p><h2>Fokus <span>— Stay on Track, Together.</span></h2></div>
            <Link className="aj-text-link" href="/work">View case study <span aria-hidden="true">→</span></Link>
          </div>
          <article className="aj-feature-card">
            <div className="aj-focus-art" aria-label="Fokus app interface concept">
              <div className="aj-focus-glow" />
              <div className="aj-phone aj-phone-back">
                <div className="aj-phone-notch" />
                <span className="aj-phone-small">OVERVIEW</span><strong>Analytics</strong>
                <div className="aj-chart-bars"><i /><i /><i /><i /><i /><i /><i /></div>
                <span className="aj-mini-line" /><span className="aj-mini-line short" />
              </div>
              <div className="aj-phone aj-phone-front">
                <div className="aj-phone-notch" />
                <div className="aj-fokus-mark">◉</div>
                <strong>Fokus</strong><span className="aj-phone-muted">Focus Together</span>
                <div className="aj-phone-task"><i /> Deep Work <b>45m</b></div>
                <div className="aj-phone-task"><i /> CFA Study <b>30m</b></div>
                <div className="aj-phone-task"><i /> Reading <b>20m</b></div>
                <div className="aj-phone-cta">Get started →</div>
              </div>
              <div className="aj-focus-note">Less noise.<br />More focus.</div>
            </div>
            <div className="aj-feature-content">
              <div className="aj-app-kicker">PRODUCTIVITY <span>•</span> FLUTTER <span>•</span> WINDOWS STORE</div>
              <h3>{FOKUS.name}</h3>
              <p>A Flutter productivity app bringing focus sessions, ambient environments, reminders and progress tracking into one workspace.</p>
              <div className="aj-feature-actions">
                <a href={FOKUS.storeUrl} target="_blank" rel="noopener noreferrer" className="aj-button aj-button-primary">Get Fokus <span aria-hidden="true">↗</span></a>
                <a href={FOKUS.sourceUrl} target="_blank" rel="noopener noreferrer" className="aj-button aj-button-outline"><span aria-hidden="true">⌘</span> View on GitHub</a>
              </div>
            </div>
          </article>
        </div>
      </section>


      <section className="aj-section aj-recruiters-section aj-home-background-section" id="background">
        <div className="aj-container">
          <div className="aj-home-background-heading">
            <div><p className="aj-eyebrow aj-eyebrow-accent">A LITTLE CONTEXT</p><h2>Background, at a glance.</h2></div>
            <Link href="/recruiters" className="aj-text-link">Explore full background <span aria-hidden="true">→</span></Link>
          </div>
          <div className="aj-recruiter-facts">
            <article><span className="aj-fact-icon" aria-hidden="true">⌂</span><h3>Education</h3><p>BBA — Finance &amp; Marketing Analytics</p><small>CHRIST University · 2024–2027</small></article>
            <article><span className="aj-fact-icon" aria-hidden="true">▣</span><h3>Experience</h3><p>Finance internships</p><small>Nuvama Wealth · DAGAS</small></article>
            <article><span className="aj-fact-icon" aria-hidden="true">▤</span><h3>CFA Program</h3><p>Level II candidate</p><small>Professional development</small></article>
            <article><span className="aj-fact-icon" aria-hidden="true">✳</span><h3>What I explore</h3><p>Finance, technology &amp; content</p><small>Analysis · Building · Explaining</small></article>
          </div>
        </div>
      </section>

      <section className="aj-section aj-contact-section" id="contact">
        <div className="aj-container aj-contact-grid">
          <div className="aj-contact-intro">
            <p className="aj-eyebrow aj-eyebrow-accent">CONTACT</p>
            <h2>Have something interesting in mind?</h2>
            <p>Whether it&apos;s a professional opportunity, a project collaboration, or just a conversation, I&apos;m always open to connect.</p>
          </div>
          <div className="aj-contact-action aj-contact-action-home">
            <span className="aj-paper-plane" aria-hidden="true">↗</span>
            <a href="mailto:jain.aman3789@gmail.com?subject=Hello%20Aman%20%E2%80%94%20from%20your%20website" className="aj-button aj-button-primary">Let&apos;s talk <span aria-hidden="true">→</span></a>
          </div>
          <div className="aj-contact-details">
            <a href="mailto:jain.aman3789@gmail.com" className="aj-contact-detail"><span aria-hidden="true">✉</span> jain.aman3789@gmail.com</a>
            <p className="aj-contact-detail"><span aria-hidden="true">⌖</span> Bengaluru, India</p>
            <p className="aj-contact-note">Open to opportunities, projects and collaborations.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
