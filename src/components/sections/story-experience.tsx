"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

// next.config.ts injects NEXT_PUBLIC_BASE_PATH for GitHub Pages builds.
// Unlike GITHUB_ACTIONS, this value is intentionally exposed to client components.
const publicAsset = (path: string) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return basePath + "/" + path.replace(/^\/+/, "");
};
const profileImageSrc = publicAsset("aman-story-photo.png");
const storyAvatarSrc = profileImageSrc;
const candidStoryImageSrc = publicAsset("aman-story-candid.webp");

const chapters = [
  {
    number: "01",
    label: "The first post",
    period: "A first attempt",
    title: "I started by sharing one result.",
    intro: "“My first instinct was to talk about the CFA Level I result.” It was the first milestone I was proud enough to put out there.",
    paragraphs: [
      "There wasn't a carefully planned niche or a content calendar behind that first post. I had something I was proud of, and I decided to put it out there.",
      "That first step mattered because it made the next one easier to imagine. I didn't need a perfect creator identity before I could begin; I needed to publish, learn and try again."
    ],
    proof: ["A real milestone", "One first post", "No perfect playbook"],
    takeaway: "Starting before you feel ready gives you something real to improve.",
    visual: "post"
  },
  {
    number: "02",
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
    number: "03",
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
    number: "04",
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
    number: "05",
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
    number: "06",
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
    number: "07",
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
type SpokenPartKind = "keep" | "filler" | "false-start";
type SpokenPart = { text: string; kind: SpokenPartKind };

const spokenDrafts: Record<1 | 2, SpokenPart[]> = {
  1: [
    { text: "Okay,", kind: "filler" },
    { text: "so", kind: "filler" },
    { text: "I can value a company,", kind: "keep" },
    { text: "right?", kind: "filler" },
    { text: "No,", kind: "false-start" },
    { text: "wait—I mean,", kind: "false-start" },
    { text: "I can spend hours understanding one.", kind: "keep" },
    { text: "But", kind: "false-start" },
    { text: "a microphone?", kind: "keep" },
    { text: "Yaar,", kind: "keep" },
    { text: "mic ke saamne", kind: "keep" },
    { text: "I still get nervous...", kind: "keep" },
    { text: "my hands can shake.", kind: "keep" },
  ],
  2: [
    { text: "So,", kind: "filler" },
    { text: "um,", kind: "filler" },
    { text: "my first post was about my CFA Level I result.", kind: "keep" },
    { text: "Like,", kind: "filler" },
    { text: "I just—", kind: "false-start" },
    { text: "no, wait,", kind: "false-start" },
    { text: "I shared it because I was proud.", kind: "keep" },
    { text: "Koi big content plan nahi tha;", kind: "keep" },
    { text: "I just put it out there.", kind: "keep" },
  ],
};

function SpokenTranscript({ chapter }: { chapter: 1 | 2 }) {
  const parts = spokenDrafts[chapter];
  const transcript = parts.map((part) => part.text).join(" ");

  return (
    <div className="aj-spoken-rewrite" aria-label="Raw spoken transcript">
      <div className="aj-spoken-rewrite-meta">
        <span className="aj-spoken-live"><i aria-hidden="true" /> RAW TAKE</span>
        <span className="aj-spoken-scroll-note">Scroll to clean it up</span>
      </div>
      <p className="aj-spoken-transcript" aria-label={transcript}>
        {parts.map((part, index) => (
          <span
            className={"aj-spoken-fragment" + (part.kind === "keep" ? "" : part.kind === "filler" ? " is-filler" : " is-false-start")}
            key={chapter + "-" + index}
          >
            {part.text}{index < parts.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}


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

function StoryShortEmbed({ video }: { video: (typeof storyShorts)[number] }) {
  return (
    <article className="aj-story-video-feature">
      <div className="aj-story-video-frame">
        <iframe
          src={"https://www.youtube-nocookie.com/embed/" + video.id + "?rel=0"}
          title={video.title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="aj-story-video-copy">
        <small>{video.tag}</small>
        <b>{video.title}</b>
        <p>{video.note}</p>
        <a href={"https://youtube.com/shorts/" + video.id + "?feature=share"} target="_blank" rel="noopener noreferrer">
          Watch on YouTube <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

function StoryCreatorMetrics() {
  const metricRef = useRef<HTMLDivElement | null>(null);
  const [posts, setPosts] = useState(0);
  const [followers, setFollowers] = useState(100);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    const node = metricRef.current;
    if (!node) return;

    let frame = 0;
    let observer: IntersectionObserver | null = null;
    let started = false;
    const easeOut = (value: number) => 1 - Math.pow(1 - value, 3);
    const finish = () => {
      setPosts(100);
      setFollowers(645);
    };
    const animate = () => {
      if (started) return;
      started = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finish();
        return;
      }

      setPosts(0);
      setFollowers(100);
      const start = performance.now();
      const duration = 2400;
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const postValue = Math.round(100 * easeOut(progress));
        const followerValue = progress < 0.5
          ? Math.round(100 + 300 * easeOut(progress * 2))
          : Math.round(400 + 245 * easeOut((progress - 0.5) * 2));
        setPosts(postValue);
        setFollowers(followerValue);
        if (progress < 1) frame = window.requestAnimationFrame(tick);
        else finish();
      };
      frame = window.requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          animate();
          observer?.disconnect();
        }
      }, { threshold: 0.28 });
      observer.observe(node);
    } else {
      animate();
    }

    return () => {
      observer?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [replay]);

  return (
    <div className="aj-story-creator-metrics" ref={metricRef} aria-label="Posting and Instagram follower milestones">
      <div className="aj-story-creator-metric">
        <strong>{posts >= 100 ? "100+" : posts}</strong>
        <span>posts shared</span>
      </div>
      <div className="aj-story-creator-metric">
        <strong>{followers.toLocaleString("en-IN")}</strong>
        <span>Instagram followers</span>
      </div>
      <div className="aj-story-creator-milestones">
        <span>100</span><i /><span>400</span><i /><b>645 · NOW</b>
      </div>
      <button type="button" onClick={() => setReplay((value) => value + 1)}>
        Replay the climb <span aria-hidden="true">↻</span>
      </button>
    </div>
  );
}

function StoryVisual({ visual }: { visual: (typeof chapters)[number]["visual"] }) {
  const [flippedBuildCards, setFlippedBuildCards] = useState<string[]>([]);
  const [consistencyStep, setConsistencyStep] = useState(0);
  const [archiveSelected, setArchiveSelected] = useState(4);
  const [stageStep, setStageStep] = useState(0);
  const [peopleFocus, setPeopleFocus] = useState(0);
  const [workSelected, setWorkSelected] = useState(0);
  const [deepStep, setDeepStep] = useState(0);
  if (visual === "portrait") {
    return (
      <div className="aj-story-visual-card aj-story-visual-portrait aj-story-candid-card aj-story-portrait-large">
        <Image
          src={candidStoryImageSrc}
          alt="Aman relaxing with a playful smile against a warm sunset sky"
          width={512}
          height={512}
          sizes="(max-width: 850px) 88vw, 520px"
          style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
          priority
        />
      </div>
    );
  }

  if (visual === "post") {
    return (
      <div className="aj-story-visual-card aj-story-post-visual aj-story-video-visual">
        <div className="aj-story-first-video-context">
          <Image
            src={candidStoryImageSrc}
            alt="Aman smiling in a casual outdoor portrait"
            width={120}
            height={120}
            sizes="88px"
          />
          <div>
            <small>BEFORE THE FIRST UPLOAD</small>
            <b>One CFA result. One camera. No playbook.</b>
          </div>
        </div>
        <StoryShortEmbed video={storyShorts[0]} />
      </div>
    );
  }

  if (visual === "archive") {
    const archiveItems = [
      { title: <>Finance<br />news</>, name: "Finance news", detail: "I tried breaking down what was happening in markets and the wider finance world." },
      { title: "Running", name: "Running", detail: "I tested a completely different interest instead of forcing one niche from day one." },
      { title: "Motivation", name: "Motivation", detail: "I experimented with motivational videos and different storytelling styles." },
      { title: <>Daily<br />life</>, name: "Daily life", detail: "I shared everyday moments while figuring out what felt natural to create." },
      { title: <>Finance for<br />students</>, name: "Finance for students", detail: "This was the direction I kept returning to: useful finance explained for students." }
    ] as const;
    return (
      <div className="aj-story-visual-card aj-story-archive-visual">
        <StoryCreatorMetrics />
        <span className="aj-story-archive-label">THE CONTENT EXPERIMENTS · PICK A CHAPTER</span>
        <div className="aj-story-topic-track">
          {archiveItems.map((item, index) => (
            <button
              type="button"
              key={item.name}
              className={"aj-story-topic-card topic-" + ["one", "two", "three", "four", "final"][index] + (archiveSelected === index ? " is-selected" : "")}
              aria-pressed={archiveSelected === index}
              onClick={() => setArchiveSelected(index)}
            >
              <small>0{index + 1}</small><b>{item.title}</b><i />
              {index === 4 && <span>FOUND MY WAY</span>}
            </button>
          ))}
        </div>
        <div className="aj-story-archive-detail" aria-live="polite">
          <b>{archiveItems[archiveSelected].name}</b>
          <p>{archiveItems[archiveSelected].detail}</p>
        </div>
        <div className="aj-story-archive-video-grid">
          <StoryShortEmbed video={storyShorts[1]} />
          <StoryShortEmbed video={storyShorts[2]} />
        </div>
        <StoryCreatorMetrics />
      </div>
    );
  }

  if (visual === "consistency") {
    const consistencyStages = [
      {
        label: "01 · THE FAST ROUTE",
        title: "I wanted results. Fast.",
        copy: "I went all in, chasing the quick spike and expecting progress to happen fast."
      },
      {
        label: "02 · THE REALITY CHECK",
        title: "The initial rush faded.",
        copy: "That pace was difficult to sustain. The early jump was real, but it wasn't a process I could keep repeating."
      },
      {
        label: "03 · THE SWITCH",
        title: "I chose consistency.",
        copy: "I stopped chasing another extreme burst. I kept going, just with a pace I could actually maintain."
      }
    ] as const;
    const activeStage = consistencyStages[consistencyStep];

    return (
      <div className="aj-story-visual-card aj-story-chart-visual">
        <div className="aj-story-visual-kicker">THE GYM LESSON · MY CHANGE OF APPROACH</div>
        <div key={consistencyStep} className={"aj-story-journey-chart stage-" + consistencyStep} data-stage={consistencyStep}>
          <svg className="aj-story-consistency-chart" viewBox="0 0 440 218" role="img" aria-label="My progress: an early fast rise, a slowdown, then a switch to steady upward progress">
            <path d="M28 20 V180 H420" fill="none" stroke="#DAD1C6" strokeWidth="1.5" />
            <path d="M28 140 H420 M28 90 H420 M28 45 H420" stroke="#EDE6DE" strokeDasharray="4 7" />
            <path pathLength={1} className="aj-story-chart-extreme-rise" d="M30 164 C66 93 91 35 125 49 C143 56 153 79 165 99" fill="none" stroke="#D36C57" strokeWidth="4" strokeLinecap="round" />
            <path pathLength={1} className="aj-story-chart-extreme-tail" d="M165 99 C190 137 207 160 244 164 C294 171 350 171 410 171" fill="none" stroke="#D36C57" strokeWidth="4" strokeLinecap="round" />
            <path pathLength={1} className="aj-story-chart-steady" d="M244 164 C293 148 326 120 355 93 S396 51 410 27" fill="none" stroke="#718B67" strokeWidth="4" strokeLinecap="round" />
            <line className="aj-story-chart-switch-guide" x1="244" y1="164" x2="244" y2="181" stroke="#718B67" strokeDasharray="3 4" />
            <circle className="aj-story-chart-switch-dot" cx="244" cy="164" r="5" fill="#718B67" />
            <circle className="aj-story-chart-marker" cx={consistencyStep === 0 ? 165 : consistencyStep === 1 ? 244 : 410} cy={consistencyStep === 0 ? 99 : consistencyStep === 1 ? 164 : 27} r="6" fill={consistencyStep === 2 ? "#718B67" : "#D36C57"} stroke="#FAF8F1" strokeWidth="2" />
            <text x="30" y="202" fill="#91877B" fontSize="9">START</text>
            <text x="410" y="202" textAnchor="end" fill="#91877B" fontSize="9">TIME →</text>
            <text className="aj-story-chart-switch-label" x="244" y="194" textAnchor="middle" fill="#718B67" fontSize="9" fontWeight="700">THE SWITCH</text>
          </svg>
        </div>
        <div className="aj-story-chart-legend">
          <span><i className="is-extreme" />Fast start</span>
          <span><i className="is-steady" />Consistent</span>
        </div>
        <div className="aj-story-chart-story" aria-live="polite">
          <span>{activeStage.label}</span>
          <b>{activeStage.title}</b>
          <p>{activeStage.copy}</p>
        </div>
        <div className="aj-story-chart-controls">
          <div className="aj-story-chart-pips" aria-label="Choose a story stage">
            {consistencyStages.map((stage, index) => (
              <button
                key={stage.label}
                type="button"
                className={index === consistencyStep ? "is-active" : ""}
                aria-label={"Show stage " + (index + 1) + ": " + stage.title}
                aria-pressed={index === consistencyStep}
                onClick={() => setConsistencyStep(index)}
              />
            ))}
          </div>
          <div className="aj-story-chart-buttons">
            <button type="button" onClick={() => setConsistencyStep((current) => Math.max(0, current - 1))} disabled={consistencyStep === 0}>←</button>
            <button type="button" className="is-next" onClick={() => setConsistencyStep((current) => current === 2 ? 0 : current + 1)}>
              {consistencyStep === 2 ? "Replay ↻" : "Next →"}
            </button>
          </div>
        </div>
        <p className="aj-story-chart-note">A personal lesson, not measured fitness data.</p>
      </div>
    );
  }

  if (visual === "stage") {
    const stageMoments = [
      { tab: "BEFORE", title: "The nerves arrive early.", detail: "I can know my material and still feel anxious before speaking. Preparation helps, but it doesn't magically switch the nerves off.", angle: -28, center: "Before" },
      { tab: "IN THE MOMENT", title: "I show up anyway.", detail: "My voice can change or my mind can go blank for a second. The goal is to stay with the moment instead of letting nerves make the decision.", angle: 2, center: "Present" },
      { tab: "AFTER", title: "Reflect. Adjust. Repeat.", detail: "One event doesn't cure stage fear. I take what I learned and give myself another chance to get better.", angle: 27, center: "Again" }
    ] as const;
    const moment = stageMoments[stageStep];
    return (
      <div className="aj-story-visual-card aj-story-stage-visual">
        <span className="aj-story-visual-kicker">THE NERVES DON&apos;T GO TO ZERO · TAP A MOMENT</span>
        <svg viewBox="0 0 360 185" className="aj-story-stage-gauge" role="img" aria-label={"Stage fear journey: " + moment.tab.toLowerCase()}>
          <path d="M48 151 A132 132 0 0 1 312 151" fill="none" stroke="#EFE5D9" strokeWidth="17" strokeLinecap="round" />
          <path d="M48 151 A132 132 0 0 1 276 57" fill="none" stroke="#E2A47B" strokeWidth="17" strokeLinecap="round" />
          <path d="M48 151 A132 132 0 0 1 112 44" fill="none" stroke="#D36C57" strokeWidth="17" strokeLinecap="round" opacity=".7" />
          <g className="aj-story-stage-needle" style={{ transform: "rotate(" + moment.angle + "deg)" }}>
            <path d="M180 151 L95 90" stroke="#34343A" strokeWidth="4" strokeLinecap="round" /><circle cx="180" cy="151" r="9" fill="#34343A" />
          </g>
          <text x="48" y="179" fill="#8B6C5A" fontSize="10">NERVOUS</text><text x="312" y="179" fill="#718B67" fontSize="10" textAnchor="end">SHOWING UP</text>
          <text x="180" y="116" fill="#34343A" fontFamily="Georgia,serif" fontSize="22" textAnchor="middle">{moment.center}</text>
        </svg>
        <div className="aj-story-stage-tabs" role="group" aria-label="Explore the stage fear journey">
          {stageMoments.map((item, index) => (
            <button type="button" key={item.tab} className={stageStep === index ? "is-active" : ""} aria-pressed={stageStep === index} onClick={() => setStageStep(index)}>{item.tab}</button>
          ))}
        </div>
        <div className="aj-story-stage-insight" aria-live="polite"><b>{moment.title}</b><p>{moment.detail}</p></div>
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
    const audienceNeeds = [
      { tab: "NEW TO FINANCE", label: "START WITH THE BASICS", title: "Make the first step less intimidating.", copy: "Explain the core idea without assuming someone already knows the vocabulary." },
      { tab: "LOST IN JARGON", label: "MAKE IT CLICK", title: "Translate complexity into clarity.", copy: "Use examples and plain language without pretending the subject has no nuance." },
      { tab: "READY TO GO DEEPER", label: "GIVE THE NEXT STEP", title: "Help curiosity turn into action.", copy: "Point people towards a useful next concept, resource or practical exercise." }
    ] as const;
    const audience = audienceNeeds[peopleFocus];
    return (
      <div className="aj-story-visual-card aj-story-people-visual">
        <span className="aj-story-visual-kicker">WHO I WANT TO MAKE FINANCE EASIER FOR</span>
        <div className="aj-story-people-grid" aria-hidden="true">{Array.from({ length: 32 }, (_, index) => <i key={index} style={{ "--dot-index": index } as CSSProperties} />)}</div>
        <div className="aj-story-people-tabs" role="group" aria-label="Choose a learner">
          {audienceNeeds.map((item, index) => <button type="button" key={item.tab} className={peopleFocus === index ? "is-active" : ""} aria-pressed={peopleFocus === index} onClick={() => setPeopleFocus(index)}>{item.tab}</button>)}
        </div>
        <div className="aj-story-people-message" aria-live="polite"><span>{audience.label}</span><b>{audience.title}</b><p>{audience.copy}</p></div>
      </div>
    );
  }

  if (visual === "work") {
    const experiences = [
      { name: "DAGAS", role: "Finance Intern · Apr–Jul 2026", detail: "An operating-business finance internship that gave me exposure to work beyond classroom examples." },
      { name: "Nuvama Wealth", role: "Finance Intern · Jul–Aug 2026", detail: "A closer look at wealth management and the financial-services environment." },
      { name: "D. E. Shaw FinRes", role: "Finance research internship", detail: "Earlier exposure to financial research and structured analytical work." },
      { name: "Unified Mentor", role: "Data Analyst Intern", detail: "Remote data-analysis experience that strengthened my comfort with working through datasets." }
    ] as const;
    const experience = experiences[workSelected];
    return (
      <div className="aj-story-visual-card aj-story-work-visual">
        <span className="aj-story-visual-kicker">LEARNING IN REAL TEAMS · SELECT AN EXPERIENCE</span>
        <div className="aj-story-work-list">
          {experiences.map((item, index) => (
            <button type="button" key={item.name} className={workSelected === index ? "is-selected" : ""} aria-pressed={workSelected === index} onClick={() => setWorkSelected(index)}>
              <span>0{index + 1}</span><b>{item.name}</b><small>{item.role}</small><i aria-hidden="true">↗</i>
            </button>
          ))}
        </div>
        <div className="aj-story-work-detail" aria-live="polite"><b>{experience.name}</b><p>{experience.detail}</p></div>
      </div>
    );
  }

  const deepStages = [
    { label: "01 · CAPTURE", title: "Start with the rough idea.", detail: "Get the thought out of your head before worrying about making it perfect." },
    { label: "02 · SHAPE", title: "Turn the idea into something workable.", detail: "Use tools to organise the thinking and turn a rough direction into a plan." },
    { label: "03 · BUILD", title: "Make a first version.", detail: "Build something real enough to test instead of endlessly polishing the idea." },
    { label: "04 · REFINE", title: "Test, learn and improve.", detail: "The tools speed up parts of the process. I still own the decisions and the result." }
  ] as const;
  const activeDeepStage = deepStages[deepStep];
  return (
    <div className="aj-story-visual-card aj-story-deep-visual">
      <span className="aj-story-visual-kicker">FROM THOUGHT TO SOMETHING REAL · FOLLOW THE FLOW</span>
      <div className="aj-story-flow">
        {deepStages.map((item, index) => (
          <button type="button" key={item.label} className={"flow-step flow-step-" + index + (deepStep === index ? " is-active" : "")} aria-pressed={deepStep === index} onClick={() => setDeepStep(index)}>
            <span>0{index + 1}</span><b>{["Speak", "Shape", "Build", "Refine"][index]}</b><small>{["The rough idea", "Organise it", "Make a version", "Test and improve"][index]}</small>
          </button>
        ))}
      </div>
      <div className="aj-story-deep-note" aria-live="polite"><span>{activeDeepStage.label}</span><b>{activeDeepStage.title}</b><p>{activeDeepStage.detail}</p></div>
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
          <p>I can spend hours understanding a company. A microphone can still make me nervous. This is the story of what I tried, what I learned and why I kept going.</p>
          <Link href="/story" className="aj-button aj-button-primary">Open the window <span aria-hidden="true">→</span></Link>
        </div>
        <StoryWindow />
      </div>
    </section>
  );
}



const storyAsset = (filename: string) => publicAsset("story-gallery/" + filename);

const storyMemories = [
  {
    title: "The moustache era",
    note: "A 2016 trip to Bengaluru. The commitment to the bit was already there.",
    src: storyAsset("story-childhood.webp"),
    year: "2016",
  },
  {
    title: "Built-in teammate",
    note: "Me and my brother, school-uniform era.",
    src: storyAsset("story-brother.webp"),
    year: "THEN",
  },
  {
    title: "The family frame",
    note: "A family photo from the camera roll.",
    src: storyAsset("story-family.webp"),
    year: "FAMILY",
  },
  {
    title: "A moment with Nithin Kamath",
    note: "One conversation worth keeping.",
    src: storyAsset("story-nithin-kamath.webp"),
    year: "A GOOD ONE",
  },
  {
    title: "The friends chapter",
    note: "Good people. Better memories.",
    src: storyAsset("story-friends.webp"),
    year: "THE CREW",
  },
] as const;

const storyShorts = [
  {
    id: "cZmWuFLi7XI",
    title: "My first video",
    note: "CFA prep, before I had a content playbook.",
    tag: "FIRST UPLOAD",
  },
  {
    id: "SG_CkTR15IQ",
    title: "The finance-news experiment",
    note: "Trying to make finance news a format.",
    tag: "A FORMAT I TRIED",
  },
  {
    id: "Syf-ChVSyu4",
    title: "A day in my life",
    note: "A little more of the day-to-day.",
    tag: "DAY IN THE LIFE",
  },
] as const;

function StoryMemoryGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  useEffect(() => {
    if (activePhoto === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePhoto(null);
      if (event.key === "ArrowLeft") {
        setActivePhoto((current) => current === null
          ? null
          : (current + storyMemories.length - 1) % storyMemories.length);
      }
      if (event.key === "ArrowRight") {
        setActivePhoto((current) => current === null
          ? null
          : (current + 1) % storyMemories.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activePhoto]);

  const selectedMemory = activePhoto === null ? null : storyMemories[activePhoto];

  return (
    <section className="aj-story-memory-section" aria-labelledby="aj-story-memory-heading">
      <div className="aj-container aj-story-memory-inner">
        <div className="aj-story-memory-heading">
          <div>
            <p className="aj-eyebrow aj-eyebrow-accent">OFF THE RECORD</p>
            <h2 id="aj-story-memory-heading">Before all the tabs, there was this camera roll<span>.</span></h2>
            <p>A few throwbacks, my favourite people, and the first videos I ever put out.</p>
          </div>
          <button
            type="button"
            className="aj-story-memory-toggle"
            aria-expanded={isOpen}
            aria-controls="aj-story-memory-content"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "Close the camera roll" : "Explore my gallery"}
            <span aria-hidden="true">{isOpen ? "−" : "↗"}</span>
          </button>
        </div>

        {isOpen && (
          <div className="aj-story-memory-content" id="aj-story-memory-content">
            <div className="aj-story-memory-grid" aria-label="Photo memories">
              {storyMemories.map((photo, index) => (
                <button
                  type="button"
                  key={photo.title}
                  className={"aj-story-memory-card" + (index === 0 ? " is-featured" : "")}
                  onClick={() => setActivePhoto(index)}
                  aria-label={"Open photo: " + photo.title}
                >
                  <span className="aj-story-memory-photo">
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 700px) 44vw, (max-width: 980px) 30vw, 18vw"
                      loading="lazy"
                    />
                  </span>
                  <span className="aj-story-memory-card-meta">
                    <span>{photo.year}</span>
                    <b>{photo.title}</b>
                    <i aria-hidden="true">↗</i>
                  </span>
                </button>
              ))}
            </div>

          </div>
        )}
      </div>

      {selectedMemory && activePhoto !== null && (
        <div
          className="aj-story-memory-lightbox"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActivePhoto(null);
          }}
        >
          <div
            className="aj-story-memory-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="aj-story-memory-dialog-title"
          >
            <button
              type="button"
              className="aj-story-memory-close"
              onClick={() => setActivePhoto(null)}
              aria-label="Close photo"
            >
              ×
            </button>
            <div className="aj-story-memory-large">
              <Image
                src={selectedMemory.src}
                alt={selectedMemory.title}
                fill
                sizes="(max-width: 700px) 88vw, 420px"
                priority
              />
            </div>
            <div className="aj-story-memory-dialog-footer">
              <div>
                <small>{selectedMemory.year} · {String(activePhoto + 1).padStart(2, "0")} / 05</small>
                <h3 id="aj-story-memory-dialog-title">{selectedMemory.title}</h3>
                <p>{selectedMemory.note}</p>
              </div>
              <div className="aj-story-memory-nav">
                <button
                  type="button"
                  onClick={() => setActivePhoto((activePhoto + storyMemories.length - 1) % storyMemories.length)}
                  aria-label="Previous photo"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhoto((activePhoto + 1) % storyMemories.length)}
                  aria-label="Next photo"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function StoryExperience() {
  const [activeChapter, setActiveChapter] = useState(0);
  const progressTrackRef = useRef<HTMLElement | null>(null);
  const micRef = useRef<HTMLDivElement | null>(null);
  const activeChapterRef = useRef(0);

  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll<HTMLElement>(".aj-story-scene"));
    if (scenes.length === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("aj-story-motion-ready");
    scenes.forEach((scene, index) => {
      scene.dataset.revealed = reducedMotion || index === 0 ? "true" : "false";
    });

    let frame = 0;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const getProgress = (scene: HTMLElement, viewportHeight: number) => {
      const rect = scene.getBoundingClientRect();
      return reducedMotion
        ? 1
        : clamp((viewportHeight * 0.84 - rect.top) / (rect.height + viewportHeight * 0.84));
    };

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      let current = 0;

      scenes.forEach((scene, index) => {
        const rect = scene.getBoundingClientRect();
        if (rect.top <= viewportHeight * 0.42) current = index;
        if (reducedMotion || rect.top < viewportHeight * 0.86) scene.dataset.revealed = "true";
        if (index < 2) {
          scene.style.setProperty("--speech-progress", getProgress(scene, viewportHeight).toFixed(3));
        }
      });

      const currentProgress = getProgress(scenes[current], viewportHeight);
      const overallProgress = clamp((current + currentProgress) / scenes.length);
      progressTrackRef.current?.style.setProperty("--story-progress", overallProgress.toFixed(4));

      const micTension = current === 0
        ? 0.2 + (1 - currentProgress) * 0.8
        : current === 1
          ? 0.16 + (1 - currentProgress) * 0.42
          : 0.14;
      micRef.current?.style.setProperty("--mic-tension", micTension.toFixed(3));
      if (micRef.current) micRef.current.dataset.chapter = String(current + 1);

      if (current !== activeChapterRef.current) {
        activeChapterRef.current = current;
        setActiveChapter(current);
      }
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      document.documentElement.classList.remove("aj-story-motion-ready");
      scenes.forEach((scene) => {
        delete scene.dataset.revealed;
        scene.style.removeProperty("--speech-progress");
      });
    };
  }, []);

  return (
    <main id="main" className="aj-story-page aj-story-journey">
      <header className="aj-story-journey-intro">
        <div className="aj-container aj-story-journey-intro-inner">
          <p className="aj-eyebrow aj-eyebrow-accent">A WINDOW INTO HOW I THINK</p>
          <h1>Not a straight line.<br /><em>A trail of experiments.</em></h1>
          <p>This is the story behind the work: the things I tried, the things I got wrong, what I learned, and what I&apos;m building towards. Scroll through it like a journey, not a résumé.</p>
          <div className="aj-story-intro-actions">
            <a className="aj-story-scroll-cue" href="#story-journey">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
            <a className="aj-story-skip-option" href="#story-heading-03">SKIP TO THE REST ↗</a>
          </div>
        </div>
      </header>

      <div className="aj-story-progress" aria-label="Story progress">
        <span>THE JOURNEY</span>
        <div className="aj-story-progress-track"><i ref={progressTrackRef} /></div>
        <b aria-live="polite">{String(activeChapter + 1).padStart(2, "0")} <small>/ {String(chapters.length).padStart(2, "0")}</small></b>
      </div>

      <div ref={micRef} className="aj-story-mic" data-chapter="1" role="img" aria-label="A live waveform that steadies as the story is cleaned up">
        <span className="aj-story-mic-dot" />
        <span className="aj-story-mic-label">MIC</span>
        <span className="aj-story-mic-wave" aria-hidden="true">
          <i /><i /><i /><i /><i /><i /><i /><i /><i />
        </span>
        <span className="aj-story-mic-status">VOICE</span>
      </div>

      <section className="aj-story-journey-scenes" id="story-journey" aria-label="Aman's story, chapter by chapter">
        <div className="aj-container aj-story-journey-container">
          {chapters.map((chapter, index) => (
            <section
              className="aj-story-scene"
              id={"story-chapter-" + chapter.number}
              key={chapter.number}
              data-chapter-index={index}
              data-revealed={index === 0 ? "true" : "false"}
              aria-labelledby={"story-heading-" + chapter.number}
            >
              <div className="aj-story-scene-inner">
                <div className="aj-story-scene-copy">
                  <div className="aj-story-scene-meta"><span>{chapter.number} / {String(chapters.length).padStart(2, "0")}</span><i /> <span>{chapter.period}</span></div>
                  <p className="aj-story-scene-label">{chapter.label}</p>
                  {index === 0 && <SpokenTranscript chapter={2} />}
                  <h2
                    id={"story-heading-" + chapter.number}
                    className={index === 0 ? "aj-story-clean-headline" : undefined}
                  >
                    {index === 0
                      ? chapter.title.split(" ").map((word, wordIndex) => (
                          <span className="aj-story-clean-word" key={wordIndex}>{word}</span>
                        ))
                      : chapter.title}
                  </h2>
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

      <StoryMemoryGallery />

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
