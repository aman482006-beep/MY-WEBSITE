import Image from "next/image";
import Link from "next/link";
import { LatestVideos } from "@/components/sections/latest-videos";
import { CuriosityEngine } from "@/components/sections/curiosity-engine";
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
    description: "Markets, money psychology and business stories—without the lecture-hall energy.",
    href: "/projects",
    action: "Go down the rabbit hole",
  },
  {
    number: "02",
    title: "Build",
    icon: "build",
    tone: "blue",
    description: "AI experiments, useful tools and dashboards built one curious what-if at a time.",
    href: "/projects",
    action: "See the side quests",
  },
  {
    number: "03",
    title: "Create",
    icon: "create",
    tone: "green",
    description: "Nerdy topics turned into videos that feel like a conversation, not a 90-slide lecture.",
    href: "/creator",
    action: "Watch the chaos",
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
            <p className="aj-eyebrow"><span /> FINANCE RABBIT HOLES × AI SIDE QUESTS × A LITTLE TADKA</p>
            <h1>Curious about<br /><em>too many things.</em><br />Making them less boring.</h1>
            <p className="aj-lede">
              I&apos;m Aman Jain. I chase interesting questions across finance, AI and the internet, then turn the best bits into videos, experiments and useful things. No guru act. Just curiosity and a suspicious number of open tabs.
            </p>
            <div className="aj-hero-meta" aria-label="Things I get curious about">
              <span>Finance rabbit holes</span>
              <span>AI experiments</span>
              <span>Explanations with tadka</span>
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
              <Image src="https://avatars.githubusercontent.com/u/228033672?v=4" alt="Portrait of Aman Jain" fill preload sizes="(max-width: 900px) 78vw, 440px" className="aj-profile-image" />
            </div>
            <div className="aj-note aj-currently-note" aria-label="Currently: Following the curiosity. Building as I go. Tabs: too many."><strong>CURRENTLY</strong><span>Following the curiosity</span><span>Building as I go</span><span>Tabs: too many</span></div>
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

      <CuriosityEngine />

      <LatestVideos />

      <section className="aj-section aj-home-story aj-note-wall-section" id="what-you-get">
        <div className="aj-container">
          <div className="aj-home-story-heading">
            <p className="aj-eyebrow aj-eyebrow-accent">THE CONTENT VIBE</p>
            <h2>Big-brain topics.<br /><em>Small-talk energy.</em></h2>
            <p>Think finance and AI rabbit holes, explained like we&apos;re chatting—not sitting through a lecture with 47 slides.</p>
          </div>
          <div className="aj-sticky-note-wall" aria-label="What you can expect here">
            <article className="aj-sticky-note aj-sticky-note-peach">
              <span className="aj-sticky-note-label">01 / THE TADKA</span>
              <h3>Nerdy knowledge.<br />With tadka.</h3>
              <p>Finance, markets and business rabbit holes—without the textbook coma.</p>
              <span className="aj-sticky-note-scribble">spreadsheet, but spicy ↗</span>
            </article>
            <article className="aj-sticky-note aj-sticky-note-blue">
              <span className="aj-sticky-note-label">02 / THE SIDE QUEST</span>
              <h3>AI experiments.<br />Less hype, more “try it”.</h3>
              <p>Useful tools, honest tests and figuring out what the tech can actually do.</p>
              <span className="aj-sticky-note-scribble">open another tab, obviously ↗</span>
            </article>
            <article className="aj-sticky-note aj-sticky-note-green">
              <span className="aj-sticky-note-label">03 / THE TAKEAWAY</span>
              <h3>Learn it.<br />Build it. Share it.</h3>
              <p>Videos, little projects and resources born from whatever I was obsessing over this week.</p>
              <span className="aj-sticky-note-scribble">may contain side quests ↗</span>
            </article>
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
