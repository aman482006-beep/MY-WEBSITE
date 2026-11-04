"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

// The same clean transparent portrait is used for the My Story window
// and the chapter-one portrait card. GitHub Pages needs the repository base path.
const profileImageSrc = process.env.GITHUB_ACTIONS === "true"
  ? "/MY-WEBSITE/aman-story-photo.png"
  : "/aman-story-photo.png";
const storyAvatarSrc = profileImageSrc;

const chapters = [
  {
    number: "01",
    label: "The contradiction",
    period: "Where it starts",
    title: "I can value a company. A microphone can still make me nervous.",
    intro: "I'm Aman — a finance student, creator and builder who is learning that confidence doesn't arrive all at once.",
    paragraphs: [
      "I'm pursuing a BBA in Finance & Marketing Analytics at CHRIST University, Bengaluru. I cleared CFA Level I through self-study and I'm now a Level II candidate.",
      "I can spend hours understanding a company, but speaking in front of people can still make my hands shake. Both things are true. This isn't a story about pretending the fear disappeared; it's about not letting it make every decision."
    ],
    proof: ["CHRIST · BBA Finance & Marketing Analytics", "CFA Level I cleared", "CFA Level II candidate"],
    takeaway: "Being capable at one thing doesn't mean feeling fearless at everything.",
    visual: "portrait"
  },
  {
    number: "02",
    label: "The first post",
    period: "A first attempt",
    title: "I started by sharing one result.",
    intro: "My first instinct was to talk about the CFA Level I result because it felt like the biggest milestone I'd reached.",
    paragraphs: [
      "There wasn't a carefully planned niche or a content calendar behind that first post. I had something I was proud of, and I decided to put it out there.",
      "That first step mattered because it made the next one easier to imagine. I didn't need a perfect creator identity before I could begin; I needed to publish, learn and try again."
    ],
    proof: ["A real milestone", "One first post", "No perfect playbook"],
    takeaway: "Starting before you feel ready gives you something real to improve.",
    visual: "post"
  },
  {
    number: "03",
    label: "The cringe archive",
    period: "Trying things out",
    title: "Finance news. Running. Motivation. Daily life. Back to finance.",
    intro: "My content direction changed a lot before it started making sense.",
    paragraphs: [
      "I tried finance news, running, motivation and daily-life videos. Some ideas were a better fit than others. Looking back, the switches weren't wasted time; they were how I learned what I enjoyed making and what I could keep doing.",
      "I kept coming back to explaining finance in a way students could actually use. The niche wasn't discovered in a brainstorming session. I posted my way towards it."
    ],
    proof: ["Finance news", "Running", "Motivation", "Daily life", "Finance for students"],
    takeaway: "You don't always think your way into a direction. Sometimes you make your way there.",
    caption: "Sab try kiya. Jo tikka, wahi rakha.",
    visual: "archive"
  },
  {
    number: "04",
    label: "The gym lesson",
    period: "A useful reset",
    title: "I thought extreme was the shortcut. Consistency was the answer.",
    intro: "The gym taught me a lesson that turned out to apply to much more than fitness.",
    paragraphs: [
      "Going extreme can feel like progress because it is intense and easy to notice. But the thing that actually compounds is showing up, following a process and repeating the basics.",
      "I started seeing the same pattern in studying, making videos and building products. A dramatic burst can start something; consistency is what gives it a chance to become good."
    ],
    proof: ["Intensity is visible", "Consistency compounds", "The process wins"],
    takeaway: "Extreme gets you a story. Consistent gets you a result.",
    visual: "consistency"
  },
  {
    number: "05",
    label: "Stage fear",
    period: "Still showing up",
    title: "Still shaky. Still showing up.",
    intro: "Recording a video gives me another take. A stage doesn't.",
    paragraphs: [
      "I can know what I'm talking about and still get nervous when all eyes are on me. My voice can change; my mind can go blank for a moment. Knowing the material doesn't automatically switch those feelings off.",
      "I'm not going to invent a story where one event cured it. I'm still working on it. The progress is that nervousness is no longer a reason to automatically say no."
    ],
    proof: ["Notice the nerves", "Show up anyway", "Learn from the moment", "Try again"],
    takeaway: "Courage isn't the absence of nerves. It's refusing to let them make every choice.",
    visual: "stage"
  },
  {
    number: "06",
    label: "Hands dirty",
    period: "Learning by building",
    title: "I stopped leaving every idea in a tab.",
    intro: "The fastest way I've found to expose a gap in my understanding is to try to build something.",
    paragraphs: [
      "Fokus — my productivity app — is one example. I've also been experimenting with finance tools, personal websites and AI-assisted workflows. The first version is rarely the final version; bugs and awkward decisions are part of the learning.",
      "Reading gives me concepts. Building makes me work through constraints, trade-offs and the details that a neat explanation can leave out."
    ],
    proof: ["Fokus · Productivity app", "Finance tools · Experiments", "Web projects · Built and iterated"],
    takeaway: "You understand an idea differently once you've had to make it work.",
    visual: "build"
  },
  {
    number: "07",
    label: "The people part",
    period: "Why I explain",
    title: "I remember what it felt like not to know where to start.",
    intro: "The point of making finance content gradually became bigger than posting another video.",
    paragraphs: [
      "When someone asks a question or tells me that an idea finally makes sense, it reminds me why clear explanations matter. Finance can feel unnecessarily intimidating when every answer assumes you already know the vocabulary.",
      "I want to make the first few steps easier for students who are curious but don't know where to begin. Not by pretending everything is simple, but by explaining one useful thing at a time."
    ],
    proof: ["Student-first explanations", "Finance without unnecessary jargon", "Useful over impressive"],
    takeaway: "The best reason to teach is remembering what it felt like to be a beginner.",
    visual: "people"
  },
  {
    number: "08",
    label: "Internships",
    period: "Real work, real deadlines",
    title: "The spreadsheet eventually leaves the classroom.",
    intro: "Internships gave me a closer look at how finance and analysis work inside real teams.",
    paragraphs: [
      "I've worked as a Finance Intern at DAGAS and Nuvama Wealth in Bengaluru, with earlier exposure to financial research and data analysis through D. E. Shaw FinRes and Unified Mentor.",
      "Each experience gave me a different view of the work. The common lesson was simple: being useful means being careful, communicating clearly and following through on the task in front of you."
    ],
    proof: ["DAGAS · Finance Intern", "Nuvama Wealth · Finance Intern", "D. E. Shaw FinRes · Internship", "Unified Mentor · Data Analyst Intern"],
    takeaway: "Being useful matters more than looking impressive.",
    visual: "work"
  }
] as const;

function StoryWindow() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      scene.dataset.windowOpen = "true";
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        scene.dataset.windowOpen = "true";
        observer.disconnect();
      }
    }, { threshold: 0.35, rootMargin: "0px 0px -8% 0px" });

    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="aj-story-preview-window" role="img" aria-label="An animated wooden window opens onto a moving sky while Aman waves">
      <div className="aj-story-window-scene" ref={sceneRef} data-window-open="false">
        <div className="aj-story-window-sky">
          <span className="aj-story-cloud aj-story-cloud-one" />
          <span className="aj-story-cloud aj-story-cloud-two" />
          <span className="aj-story-cloud aj-story-cloud-three" />
          <span className="aj-story-window-sun" />
          <span className="aj-story-window-horizon" />
          <span className="aj-story-window-hill aj-story-window-hill-back" />
          <span className="aj-story-window-hill aj-story-window-hill-front" />
        </div>
        <div className="aj-story-window-person">
          <Image src={storyAvatarSrc} alt="Aman in a photo-based portrait" fill loading="eager" sizes="(max-width: 620px) 64vw, 280px" />
        </div>
        <svg className="aj-story-window-wave" viewBox="0 0 170 250" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="aj-story-arm-skin" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#D8A18A" />
              <stop offset=".58" stopColor="#C58B73" />
              <stop offset="1" stopColor="#A96F5B" />
            </linearGradient>
            <pattern id="aj-story-arm-plaid" width="22" height="22" patternUnits="userSpaceOnUse">
              <rect width="22" height="22" fill="#252A35" />
              <path d="M0 6H22 M0 16H22" stroke="#B9AFC0" strokeWidth="2.4" opacity=".9" />
              <path d="M7 0V22 M17 0V22" stroke="#8A7B92" strokeWidth="1.6" opacity=".8" />
            </pattern>
          </defs>
          <g className="aj-story-wave-arm">
            <path d="M24 250 C23 229 24 208 30 190 C46 178 65 176 85 183 C98 203 104 226 112 250 Z" fill="url(#aj-story-arm-plaid)" stroke="#252A35" strokeWidth="2" />
            <path d="M38 190 C30 172 33 153 43 133 C53 112 67 94 76 77 C80 67 76 59 68 50 L56 34 C51 27 55 20 62 21 C68 22 75 34 82 43 L78 19 C77 9 85 4 91 10 C96 16 96 30 99 45 L103 10 C104 0 114 0 119 7 C123 14 118 31 116 47 L126 24 C131 15 140 20 137 29 L126 62 C122 76 115 90 107 106 C98 124 93 140 93 156 C93 170 97 181 104 191 Z" fill="url(#aj-story-arm-skin)" stroke="#925C49" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M35 207 C49 194 68 190 93 201 M30 222 C52 210 73 207 99 216" fill="none" stroke="#D4C7D3" strokeWidth="2" opacity=".75" />
            <path d="M77 91 C89 98 101 100 114 95 M87 109 C98 114 109 115 121 109" fill="none" stroke="#955F4D" strokeWidth="1.6" opacity=".55" />
            <path d="M91 77 C89 67 89 57 89 47 M105 77 C108 66 111 57 114 49 M119 80 C124 72 130 66 135 62" fill="none" stroke="#E6B5A0" strokeWidth="2" strokeLinecap="round" opacity=".75" />
          </g>
        </svg>
        <div className="aj-story-window-sill" />
        <div className="aj-story-window-frame aj-story-window-frame-top" />
        <div className="aj-story-window-frame aj-story-window-frame-left" />
        <div className="aj-story-window-frame aj-story-window-frame-right" />
        <div className="aj-story-window-frame aj-story-window-frame-bottom" />
        <div className="aj-story-window-mullion aj-story-window-mullion-vertical" />
        <div className="aj-story-window-mullion aj-story-window-mullion-horizontal" />
        <div className="aj-story-window-shutters" aria-hidden="true">
          <div className="aj-story-window-shutter aj-story-window-shutter-left"><span /><span /><span /></div>
          <div className="aj-story-window-shutter aj-story-window-shutter-right"><span /><span /><span /></div>
        </div>
      </div>
      <div className="aj-story-window-caption"><span>MY STORY</span><b>Open a little window.</b><i>↗</i></div>
    </div>
  );
}

function StoryVisual({ visual }: { visual: (typeof chapters)[number]["visual"] }) {
  const [postTapped, setPostTapped] = useState(false);
  const [flippedBuildCards, setFlippedBuildCards] = useState<string[]>([]);
  if (visual === "portrait") {
    return (
      <div className="aj-story-visual-card aj-story-visual-portrait">
        <div className="aj-story-visual-kicker">A PERSON, NOT A PERFECT PLAN</div>
        <div className="aj-story-portrait-large">
          <Image src={profileImageSrc} alt="Aman's portrait" fill sizes="(max-width: 850px) 80vw, 440px" />
        </div>
        <div className="aj-story-portrait-stamp">STILL<br />LEARNING</div>
        <p>Finance brain. Creator curiosity. A work in progress.</p>
      </div>
    );
  }

  if (visual === "post") {
    return (
      <div className="aj-story-visual-card aj-story-post-visual">
        <div className="aj-story-phone">
          <div className="aj-story-phone-speaker" />
          <div className="aj-story-phone-screen">
            <div className="aj-story-post-top"><span className="aj-story-post-avatar">AJ</span><span><b>Aman</b><small>One of my first posts</small></span><i>•••</i></div>
            <div className={"aj-story-post-art" + (postTapped ? " is-posted" : "")}><span>{postTapped ? "PUBLISHED" : "LEVEL I"}</span><strong>{postTapped ? "It's out." : "Cleared."}</strong><small>{postTapped ? "The next step is learning from it." : "A milestone worth sharing."}</small></div>
            <div className="aj-story-post-actions"><span>♡ Like</span><span>↗ Share</span></div>
            <div className="aj-story-post-line" /><div className="aj-story-post-line short" />
          </div>
        </div>
        <div className="aj-story-post-interaction">
          <button type="button" className="aj-story-post-button" onClick={() => setPostTapped(true)} disabled={postTapped}>
            {postTapped ? "POSTED ✓" : "POST"}
          </button>
          <p>{postTapped ? "A small first step. No numbers invented." : "Tap to replay the first-post moment."}</p>
        </div>
      </div>
    );
  }

  if (visual === "archive") {
    return (
      <div className="aj-story-visual-card aj-story-archive-visual">
        <span className="aj-story-archive-label">THE CONTENT EXPERIMENTS</span>
        <div className="aj-story-topic-track">
          <div className="aj-story-topic-card topic-one"><small>01</small><b>Finance<br />news</b><i /></div>
          <div className="aj-story-topic-card topic-two"><small>02</small><b>Running</b><i /></div>
          <div className="aj-story-topic-card topic-three"><small>03</small><b>Motivation</b><i /></div>
          <div className="aj-story-topic-card topic-four"><small>04</small><b>Daily<br />life</b><i /></div>
          <div className="aj-story-topic-card topic-final"><small>05</small><b>Finance for<br />students</b><span>FOUND MY WAY</span></div>
        </div>
        <p className="aj-story-archive-foot">Not every experiment needs to become your identity.</p>
      </div>
    );
  }

  if (visual === "consistency") {
    return (
      <div className="aj-story-visual-card aj-story-chart-visual">
        <div className="aj-story-visual-kicker">TWO WAYS TO APPROACH A GOAL</div>
        <svg className="aj-story-consistency-chart" viewBox="0 0 440 270" role="img" aria-label="A conceptual chart comparing a quick extreme burst that falls away with a steady upward path">
          <path d="M28 25 V230 H420" fill="none" stroke="#DAD1C6" strokeWidth="1.5" />
          <path d="M28 180 H420 M28 125 H420 M28 70 H420" stroke="#EDE6DE" strokeDasharray="4 7" />
          <path className="aj-story-chart-extreme" d="M30 212 C74 70 93 42 130 93 C160 132 180 203 240 208 C290 216 350 218 410 218" fill="none" stroke="#D36C57" strokeWidth="4" strokeLinecap="round" />
          <path className="aj-story-chart-steady" d="M30 212 C80 198 106 183 150 167 S223 136 260 116 S337 77 410 38" fill="none" stroke="#718B67" strokeWidth="4" strokeLinecap="round" />
          <circle cx="410" cy="38" r="6" fill="#718B67" />
        </svg>
        <div className="aj-story-chart-legend"><span><i className="is-extreme" />Extreme</span><span><i className="is-steady" />Consistent</span></div>
        <p className="aj-story-chart-note">A conceptual lesson, not measured fitness data.</p>
      </div>
    );
  }

  if (visual === "stage") {
    return (
      <div className="aj-story-visual-card aj-story-stage-visual">
        <span className="aj-story-visual-kicker">THE NERVES DON&apos;T GO TO ZERO</span>
        <svg viewBox="0 0 360 205" className="aj-story-stage-gauge" role="img" aria-label="A gauge showing that nervousness can remain while you continue to show up">
          <path d="M48 166 A132 132 0 0 1 312 166" fill="none" stroke="#EFE5D9" strokeWidth="17" strokeLinecap="round" />
          <path d="M48 166 A132 132 0 0 1 276 72" fill="none" stroke="#E2A47B" strokeWidth="17" strokeLinecap="round" />
          <path d="M48 166 A132 132 0 0 1 112 59" fill="none" stroke="#D36C57" strokeWidth="17" strokeLinecap="round" opacity=".7" />
          <g className="aj-story-stage-needle"><path d="M180 166 L95 105" stroke="#34343A" strokeWidth="4" strokeLinecap="round" /><circle cx="180" cy="166" r="9" fill="#34343A" /></g>
          <text x="48" y="194" fill="#8B6C5A" fontSize="10">NERVOUS</text><text x="312" y="194" fill="#718B67" fontSize="10" textAnchor="end">SHOWING UP</text>
          <text x="180" y="130" fill="#34343A" fontFamily="Georgia,serif" fontSize="26" textAnchor="middle">Still here.</text>
        </svg>
        <div className="aj-story-stage-steps"><span>Feel it</span><b>→</b><span>Go anyway</span><b>→</b><span>Repeat</span></div>
      </div>
    );
  }

  if (visual === "build") {
    const cards = [
      { id: "fokus", tag: "01 · PRODUCTIVITY", title: "Fokus", front: "An idea for making focused work easier.", back: "A productivity app with focus sessions, tasks and screen-time insights." },
      { id: "finance", tag: "02 · FINANCE", title: "Finance tools", front: "A question about making numbers useful.", back: "Experiments in financial modelling, personal finance and quantitative workflows." },
      { id: "web", tag: "03 · WEB", title: "Web projects", front: "A blank page and a rough plan.", back: "Build, test, fix the awkward bits, then improve the next version." }
    ];
    return (
      <div className="aj-story-visual-card aj-story-build-visual">
        <div className="aj-story-visual-kicker">IDEAS THAT LEFT THE NOTES APP · TAP TO FLIP</div>
        <div className="aj-story-build-stack">
          {cards.map((card, index) => {
            const flipped = flippedBuildCards.includes(card.id);
            return (
              <button
                className={"aj-story-build-flip-card build-" + card.id + (flipped ? " is-flipped" : "")}
                key={card.id}
                type="button"
                aria-pressed={flipped}
                onClick={() => setFlippedBuildCards((current) => flipped ? current.filter((id) => id !== card.id) : [...current, card.id])}
                style={{ "--story-card-index": index } as CSSProperties}
              >
                <span className="aj-story-build-flip-inner">
                  <span className="aj-story-build-flip-face is-front"><small>{card.tag}</small><b>{card.title}</b><span>{card.front}</span><i>Tap to turn ↗</i></span>
                  <span className="aj-story-build-flip-face is-back"><small>WHAT I LEARNED BY BUILDING</small><b>{card.title}</b><span>{card.back}</span><i>Tap to flip back ↺</i></span>
                </span>
              </button>
            );
          })}
        </div>
        <p>First versions are allowed to be imperfect.</p>
      </div>
    );
  }

  if (visual === "people") {
    return (
      <div className="aj-story-visual-card aj-story-people-visual">
        <span className="aj-story-visual-kicker">ONE IDEA AT A TIME</span>
        <div className="aj-story-people-grid" aria-hidden="true">{Array.from({ length: 48 }, (_, index) => <i key={index} style={{ "--dot-index": index } as CSSProperties} />)}</div>
        <div className="aj-story-people-message"><span>THE GOAL</span><b>Make the unfamiliar feel approachable.</b></div>
        <p>Less about the number under a post. More about what someone understands after it.</p>
      </div>
    );
  }

  if (visual === "work") {
    return (
      <div className="aj-story-visual-card aj-story-work-visual">
        <span className="aj-story-visual-kicker">LEARNING IN REAL TEAMS</span>
        <div className="aj-story-work-list">
          <div><span>01</span><b>DAGAS</b><small>Finance Intern · Apr–Jul 2026</small></div>
          <div><span>02</span><b>Nuvama Wealth</b><small>Finance Intern · Jul–Aug 2026</small></div>
          <div><span>03</span><b>D. E. Shaw FinRes</b><small>Internship</small></div>
          <div><span>04</span><b>Unified Mentor</b><small>Data Analyst Intern</small></div>
        </div>
        <p>Different environments. One standard: follow through.</p>
      </div>
    );
  }

  return (
    <div className="aj-story-visual-card aj-story-deep-visual">
      <span className="aj-story-visual-kicker">FROM THOUGHT TO SOMETHING REAL</span>
      <div className="aj-story-flow">
        <div className="flow-step flow-speak"><span>01</span><b>Speak</b><small>The rough idea</small></div>
        <i>→</i>
        <div className="flow-step flow-wispr"><span>02</span><b>Wispr Flow</b><small>Voice to text</small></div>
        <i>→</i>
        <div className="flow-step flow-emergent"><span>03</span><b>Emergent Labs</b><small>Shape the build</small></div>
        <i>→</i>
        <div className="flow-step flow-product"><span>04</span><b>Product</b><small>Test and refine</small></div>
      </div>
      <div className="aj-story-deep-note"><span>THE IMPORTANT PART</span><b>The tools help me move faster. I still own the decisions and the result.</b></div>
    </div>
  );
}

export function StoryPreview() {
  return (
    <section className="aj-section aj-story-preview" id="my-story">
      <div className="aj-container aj-story-preview-grid">
        <div className="aj-story-preview-copy">
          <p className="aj-eyebrow aj-eyebrow-accent">BEHIND THE PROJECTS</p>
          <h2>Explore my story<span>.</span></h2>
          <p>Not a résumé in paragraph form. Open a window into the experiments, wrong turns, nerves and small wins that shaped how I learn and build.</p>
          <Link href="/story" className="aj-button aj-button-primary">Open the window <span aria-hidden="true">→</span></Link>
        </div>
        <StoryWindow />
      </div>
    </section>
  );
}


export function StoryExperience() {
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll<HTMLElement>(".aj-story-scene"));
    if (scenes.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      scenes.forEach((scene) => { scene.dataset.revealed = "true"; });
      const updateActiveChapter = () => {
        const activationLine = window.innerHeight * 0.42;
        let current = 0;
        scenes.forEach((scene, index) => {
          if (scene.getBoundingClientRect().top <= activationLine) current = index;
        });
        setActiveChapter(current);
      };
      window.addEventListener("scroll", updateActiveChapter, { passive: true });
      window.addEventListener("resize", updateActiveChapter);
      return () => {
        window.removeEventListener("scroll", updateActiveChapter);
        window.removeEventListener("resize", updateActiveChapter);
      };
    }

    document.documentElement.classList.add("aj-story-motion-ready");
    scenes.forEach((scene) => { scene.dataset.revealed = "false"; });

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const scene = entry.target as HTMLElement;
        scene.dataset.revealed = "true";
        const nextChapter = Number(scene.dataset.chapterIndex ?? 0);
        setActiveChapter(nextChapter);
      }
    }, { threshold: 0.25, rootMargin: "-12% 0px -28% 0px" });

    scenes.forEach((scene) => observer.observe(scene));
    if (scenes[0]) scenes[0].dataset.revealed = "true";

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("aj-story-motion-ready");
      scenes.forEach((scene) => { delete scene.dataset.revealed; });
    };
  }, []);

  return (
    <main id="main" className="aj-story-page aj-story-journey">
      <header className="aj-story-journey-intro">
        <div className="aj-container aj-story-journey-intro-inner">
          <p className="aj-eyebrow aj-eyebrow-accent">A WINDOW INTO HOW I THINK</p>
          <h1>Not a straight line.<br /><em>A trail of experiments.</em></h1>
          <p>This is the story behind the work: the things I tried, the things I got wrong, what I learned, and what I&apos;m building towards. Scroll through it like a journey, not a résumé.</p>
          <a className="aj-story-scroll-cue" href="#story-journey">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
        </div>
      </header>

      <div className="aj-story-progress" aria-label="Story progress">
        <span>THE JOURNEY</span>
        <div className="aj-story-progress-track"><i style={{ transform: "scaleY(" + ((activeChapter + 1) / chapters.length) + ")" }} /></div>
        <b aria-live="polite">{String(activeChapter + 1).padStart(2, "0")} <small>/ {String(chapters.length).padStart(2, "0")}</small></b>
      </div>

      <section className="aj-story-journey-scenes" id="story-journey" aria-label="Aman's story, chapter by chapter">
        <div className="aj-container aj-story-journey-container">
          {chapters.map((chapter, index) => (
            <section
              className="aj-story-scene"
              key={chapter.number}
              data-chapter-index={index}
              data-revealed={index === 0 ? "true" : "false"}
              aria-labelledby={"story-heading-" + chapter.number}
            >
              <div className="aj-story-scene-inner">
                <div className="aj-story-scene-copy">
                  <div className="aj-story-scene-meta"><span>{chapter.number} / {String(chapters.length).padStart(2, "0")}</span><i /> <span>{chapter.period}</span></div>
                  <p className="aj-story-scene-label">{chapter.label}</p>
                  <h2 id={"story-heading-" + chapter.number}>{chapter.title}</h2>
                  <p className="aj-story-scene-intro">{chapter.intro}</p>
                  <div className="aj-story-scene-paragraphs">
                    {chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {"caption" in chapter && chapter.caption && <p className="aj-story-scene-caption">{chapter.caption}</p>}
                  <div className="aj-story-scene-proof">
                    {chapter.proof.map((item) => <span key={item}>{item}</span>)}
                  </div>
                  <div className="aj-story-lesson">
                    <span>WHAT STUCK WITH ME</span>
                    <p>{chapter.takeaway}</p>
                    <i />
                  </div>
                </div>
                <div className="aj-story-scene-art">
                  <StoryVisual visual={chapter.visual} />
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="aj-story-outro aj-section">
        <div className="aj-container aj-story-outro-inner">
          <p className="aj-eyebrow aj-eyebrow-accent">STILL ADDING CHAPTERS</p>
          <h2>The best part of the story<br /><em>is what I do next.</em></h2>
          <p>I don&apos;t want a polished story that pretends every step was planned. I want a body of work that shows what I tried, what changed, and what I learned along the way.</p>
          <div className="aj-story-outro-actions">
            <Link href="/projects" className="aj-button aj-button-primary">See what I&apos;m building <span aria-hidden="true">→</span></Link>
            <Link href="/contact" className="aj-button aj-button-outline">Start a conversation</Link>
          </div>
          <p className="aj-story-outro-signoff">Tarika-varika sab seekh lenge. Bas rukna nahi hai.</p>
        </div>
      </section>
    </main>
  );
}
