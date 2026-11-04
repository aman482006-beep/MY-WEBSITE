"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";

type SpokenKind = "keep" | "filler" | "false-start";
type SpokenPart = { text: string; kind: SpokenKind };

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

const cleanHeadlines = {
  1: "I can value a company. A microphone can still make me nervous.",
  2: "I started by sharing one result.",
};

const experimentNotes = [
  {
    label: "Finance news",
    note: "I tried explaining what was happening in markets and the wider finance world.",
  },
  {
    label: "Running",
    note: "I experimented with running content, too. Not every interest needed to become my lane.",
  },
  {
    label: "Motivation",
    note: "Motivation was another format I tested before I understood what I wanted to keep making.",
  },
  {
    label: "Daily life",
    note: "I tried everyday-life videos. The experiments helped me see what felt natural to create.",
  },
];

const cfaVideoIds: { title: string; id: string }[] = [];

function SpokenCleanup({ chapter }: { chapter: 1 | 2 }) {
  const parts = spokenDrafts[chapter];
  const transcript = parts.map((part) => part.text).join(" ");

  return (
    <div className="aj-spoken-rewrite wispr-spoken-cleanup" aria-label="Spoken words being cleaned into a headline">
      <div className="aj-spoken-rewrite-meta">
        <span className="aj-spoken-live"><i aria-hidden="true" /> RAW TAKE</span>
        <span className="aj-spoken-scroll-note">Scroll to clean it up</span>
      </div>
      <p className="aj-spoken-transcript" aria-label={transcript}>
        {parts.map((part, index) => (
          <span
            className={
              "aj-spoken-fragment" +
              (part.kind === "keep" ? "" : part.kind === "filler" ? " is-filler" : " is-false-start")
            }
            key={chapter + "-" + index}
          >
            {part.text}{index < parts.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
          </div>
  );
}

function WordHeadline({ chapter }: { chapter: 1 | 2 }) {
  const words = cleanHeadlines[chapter].split(" ");
  return (
    <h1 id="wispr-heading-1" className="wispr-headline aj-story-clean-headline">
      {words.map((word, index) => (
        <span className="aj-story-clean-word" key={index}>
          {word}{index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}

function VoiceBars({ count = 25 }: { count?: number }) {
  const heights = [9, 16, 26, 38, 53, 31, 21, 44, 60, 34, 19, 47, 63, 40, 25, 54, 35, 18, 43, 57, 31, 20, 39, 25, 12];
  return (
    <div className="wispr-wave-bars" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <i
          key={index}
          style={{ "--bar-height": (heights[index % heights.length] * 1.1) + "px" } as CSSProperties}
        />
      ))}
    </div>
  );
}

function VoiceStatus({ voiceRef }: { voiceRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={voiceRef}
      className="aj-story-mic"
      data-chapter="1"
      role="img"
      aria-label="Scroll-responsive voice waveform. No microphone input is used."
    >
      <span className="aj-story-mic-dot" />
      <span className="aj-story-mic-label">MIC</span>
      <span className="aj-story-mic-wave" aria-hidden="true">
        <i /><i /><i /><i /><i /><i /><i /><i /><i />
      </span>
      <span className="aj-story-mic-status">VOICE</span>
    </div>
  );
}

function FirstPostVisual() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="wispr-visual-card">
      <div className="wispr-visual-label">
        <strong>THE FIRST POST</strong>
        <span>STYLISED RECONSTRUCTION</span>
      </div>
      <div className="wispr-post-card">
        <div className="wispr-post-author">
          <span className="wispr-post-avatar">AJ</span>
          <span>Aman<small>One milestone, shared</small></span>
        </div>
        <div className="wispr-post-main">
          <span>{revealed ? "PUBLISHED" : "CFA LEVEL I"}</span>
          <h3>{revealed ? "It's out." : "Cleared."}</h3>
          <p>{revealed ? "The first post was no longer just a draft." : "Something I was proud to share."}</p>
        </div>
        <div className="wispr-post-controls">
          <small>Not a screenshot of the original post</small>
          <button className="wispr-action" type="button" onClick={() => setRevealed((value) => !value)}>
            {revealed ? "RESET" : "REVEAL"} <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ExperimentVisual() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="wispr-visual-card wispr-experiment-card">
      <div>
        <div className="wispr-visual-label">
          <strong>THE EXPERIMENT LOG</strong>
          <span>WHAT'S TRUE SO FAR</span>
        </div>
        <div className="wispr-metrics">
          <div className="wispr-metric"><b>5</b><span>Months posting</span></div>
          <div className="wispr-metric"><b>640</b><span>Instagram followers</span></div>
          <div className="wispr-metric"><b>150</b><span>YouTube subscribers</span></div>
        </div>
        <div className="wispr-results-note">No big results yet. Still going.</div>
        <div className="wispr-log-heading">
          <span>THINGS I TRIED</span>
          <span>01—04</span>
        </div>
        <div className="wispr-experiment-tags" aria-label="Content experiments">
          {experimentNotes.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="wispr-experiment-result" aria-live="polite">{experimentNotes[selected].note}</p>
      </div>
      <div className="wispr-visual-label">
        <strong>KEPT: FINANCE FOR STUDENTS</strong>
        <span>NOT A GROWTH CHART</span>
      </div>
    </div>
  );
}

function StageVisual() {
  return (
    <div className="wispr-visual-card wispr-stage-card">
      <svg className="wispr-stage-svg" viewBox="0 0 380 300" role="img" aria-label="A microphone standing alone in a stage spotlight, with a visibly unsettled voice line">
        <defs>
          <linearGradient id="wispr-stage-glow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#F7DFAF" stopOpacity=".92" />
            <stop offset="1" stopColor="#F7DFAF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wispr-mic-metal" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#65756D" />
            <stop offset="1" stopColor="#394940" />
          </linearGradient>
        </defs>
        <path className="wispr-stage-beam" d="M190 18 L58 263 L322 263 Z" fill="url(#wispr-stage-glow)" />
        <path d="M45 263 Q190 247 335 263" fill="none" stroke="#D8CBB8" strokeWidth="2" />
        <path d="M190 79 C177 79 168 89 168 102 V137 C168 150 177 160 190 160 C203 160 212 150 212 137 V102 C212 89 203 79 190 79Z" fill="url(#wispr-mic-metal)" />
        <path d="M177 100 H203 M177 112 H203 M177 124 H203 M177 136 H203" stroke="#DCE1D9" strokeWidth="2" strokeLinecap="round" opacity=".72" />
        <path d="M151 130 C151 183 229 183 229 130" fill="none" stroke="#53675A" strokeWidth="5" strokeLinecap="round" />
        <path d="M190 169 V216 M163 218 H217" fill="none" stroke="#53675A" strokeWidth="5" strokeLinecap="round" />
        <path d="M131 234 L155 234 L166 218 L177 249 L188 228 L200 238 L213 220 L226 234 L249 234" className="wispr-stage-line" />
      </svg>
      <p className="wispr-stage-caption">THE NERVES ARE STILL THERE. SO AM I.</p>
    </div>
  );
}

function CfaVideoShelf() {
  return (
    <div className="wispr-video-shelf">
      {cfaVideoIds.length > 0 ? (
        <div className="wispr-video-embeds">
          {cfaVideoIds.map((video) => (
            <iframe
              key={video.id}
              src={"https://www.youtube-nocookie.com/embed/" + video.id}
              title={video.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ))}
        </div>
      ) : (
        <a
          className="wispr-action wispr-action-secondary"
          href="https://www.youtube.com/@AmanJain-4/videos"
          target="_blank"
          rel="noopener noreferrer"
        >
          CFA Level I videos <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}

export function WisprFlowChallenge() {
  const rootRef = useRef<HTMLElement | null>(null);
  const voiceRef = useRef<HTMLDivElement | null>(null);
  const [activeScreen, setActiveScreen] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const voice = voiceRef.current;
    if (!root || !voice) return;

    const screens = Array.from(root.querySelectorAll<HTMLElement>("[data-wispr-screen]"));
    if (!screens.length) return;

    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || 1;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - viewportHeight);
      const overall = clamp(window.scrollY / maxScroll);
      root.style.setProperty("--wispr-progress", overall.toFixed(4));

      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      screens.forEach((screen, index) => {
        const rect = screen.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height * 0.38 - viewportHeight * 0.5);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }

        const cleanupProgress = clamp((-rect.top) / Math.max(1, rect.height * 0.54));
        screen.style.setProperty("--speech-progress", cleanupProgress.toFixed(4));
      });

      const activeRect = screens[nearestIndex].getBoundingClientRect();
      const activeProgress = clamp((-activeRect.top) / Math.max(1, activeRect.height * 0.54));

      setActiveScreen((current) => current === nearestIndex ? current : nearestIndex);

      const tension = nearestIndex === 0
        ? 0.95 - activeProgress * 0.5
        : nearestIndex === 1
          ? 0.72 - activeProgress * 0.25
          : nearestIndex === 3
            ? 0.88 - activeProgress * 0.3
            : 0.34;
      voice.style.setProperty("--mic-tension", clamp(tension).toFixed(3));
      voice.dataset.chapter = String(nearestIndex + 1);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const labels = ["Contradiction", "First post", "Experiment log", "Stage fear", "What's next"];

  return (
    <main className="wispr-challenge" ref={rootRef} id="main">
      <div className="wispr-progress" role="progressbar" aria-label="Challenge story progress" aria-valuemin={1} aria-valuemax={5} aria-valuenow={activeScreen + 1} aria-valuetext={labels[activeScreen]} />
      <div className="wispr-topline">WISPR FLOW · GROWTH CHALLENGE</div>
      <VoiceStatus voiceRef={voiceRef} />
      <div className="wispr-screen-count" aria-live="polite">
        <b>{String(activeScreen + 1).padStart(2, "0")}</b>
        <span>/</span>
        <span>05 · {labels[activeScreen].toUpperCase()}</span>
      </div>

      <section className="wispr-screen" data-wispr-screen="1" data-screen-index="0" aria-labelledby="wispr-heading-1">
        <div className="wispr-copy">
          <p className="wispr-kicker"><span>01</span> The contradiction</p>
          <SpokenCleanup chapter={1} />
          <WordHeadline chapter={1} />
          <p className="wispr-one-line">Both can be true.</p>
          </div>
        <div className="wispr-visual">
          <div className="wispr-visual-card">
            <div className="wispr-visual-label">
              <strong>WHAT'S IN MY HEAD</strong>
              <span>THE VOICE NOTE</span>
            </div>
            <div className="wispr-voice-art">
              <div className="wispr-voice-symbol" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="9" y="3" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v4m-3 0h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </div>
              <VoiceBars />
              <div className="wispr-wave-caption"><span>THOUGHTS: CLEAR</span><b>DELIVERY: WORK IN PROGRESS</b></div>
            </div>
          </div>
        </div>
      
        <details className="wispr-read-more">
            <summary>Read more</summary>
            <p>I can spend hours understanding a company, but speaking in front of people can still make my hands shake. Both things are true.</p>
            <p>I am not going to pretend the fear disappeared. I am learning not to let it make every decision for me.</p>
          </details>
</section>

      <section className="wispr-screen" data-wispr-screen="2" data-screen-index="1" aria-labelledby="wispr-heading-2">
        <div className="wispr-copy">
          <p className="wispr-kicker"><span>02</span> The first post</p>
          <SpokenCleanup chapter={2} />
          <h2 id="wispr-heading-2" className="wispr-headline aj-story-clean-headline">
            {cleanHeadlines[2].split(" ").map((word, index, words) => (
              <span className="aj-story-clean-word" key={index}>{word}{index < words.length - 1 ? " " : ""}</span>
            ))}
          </h2>
          <p className="wispr-one-line">No content strategy. Just a first post.</p>
          </div>
        <div className="wispr-visual">
          <FirstPostVisual />
        </div>
      
        <details className="wispr-read-more">
            <summary>Read more</summary>
            <p>There was no carefully planned niche or content calendar behind that first post. I had something I was proud of: clearing CFA Level I, and I decided to put it out there.</p>
            <p>I did not need a perfect creator identity before I could begin. I needed to publish, learn and try again.</p>
          </details>
</section>

      <section className="wispr-screen" data-wispr-screen="3" data-screen-index="2" aria-labelledby="wispr-heading-3">
        <div className="wispr-copy">
          <p className="wispr-kicker"><span>03</span> The experiment log</p>
          <h2 id="wispr-heading-3" className="wispr-headline">Five months in. Still finding what sticks.</h2>
          <p className="wispr-one-line">No big results yet. Still going.</p>
          </div>
        <div className="wispr-visual">
          <ExperimentVisual />
        </div>
      
        <details className="wispr-read-more">
            <summary>Read more</summary>
            <p>I have been posting for five months. The account is at 640 Instagram followers and 150 YouTube subscribers. Those are the numbers today; they are not a breakout result.</p>
            <p>I tried finance news, running, motivation and daily-life videos. I kept coming back to explaining finance for students. The experiments were how I found the direction, not a neat strategy I had from day one.</p>
          </details>
</section>

      <section className="wispr-screen" data-wispr-screen="4" data-screen-index="3" aria-labelledby="wispr-heading-4">
        <div className="wispr-copy">
          <p className="wispr-kicker"><span>04</span> Stage fear</p>
          <h2 id="wispr-heading-4" className="wispr-headline">Still nervous. Still showing up.</h2>
          <p className="wispr-one-line">The nerves haven't disappeared. I'm still working on it.</p>
          </div>
        <div className="wispr-visual">
          <StageVisual />
        </div>
      
        <details className="wispr-read-more">
            <summary>Read more</summary>
            <p>Recording a video gives me another take. A stage does not. I can know what I am talking about and still get nervous when all eyes are on me.</p>
            <p>I am not going to invent a moment where one event cured it. I am still working on it, and nervousness is not an automatic reason to say no.</p>
          </details>
</section>

      <section className="wispr-screen" data-wispr-screen="5" data-screen-index="4" aria-labelledby="wispr-heading-5">
        <div className="wispr-copy">
          <p className="wispr-kicker"><span>05</span> What's next</p>
          <h2 id="wispr-heading-5" className="wispr-headline">Still learning. Still building. Still going.</h2>
          <p className="wispr-one-line">I want the next thing to be useful.</p>
          </div>
        <div className="wispr-visual">
          <div className="wispr-visual-card wispr-next-card">
            <div>
              <div className="wispr-visual-label">
                <strong>THE NEXT ITERATION</strong>
                <span>IN PROGRESS</span>
              </div>
              <div className="wispr-next-visual">
                <div className="wispr-next-line"><span>↗</span> Keep testing what connects.</div>
                <div className="wispr-next-line"><span>↗</span> Keep making the words clearer.</div>
                <div className="wispr-next-line"><span>↗</span> Keep showing up.</div>
              </div>
              <div className="wispr-cta-links">
                <Link className="wispr-action wispr-action-primary" href="/projects">Projects <span aria-hidden="true">↗</span></Link>
                <Link className="wispr-action wispr-action-secondary" href="/contact">Contact <span aria-hidden="true">↗</span></Link>
                <CfaVideoShelf />
              </div>
            </div>
          </div>
        </div>
      
        <details className="wispr-read-more">
            <summary>Read more</summary>
            <p>I have more to learn about making content people actually want to spend time with. Five months in, I do not have a big-result story to tell yet.</p>
            <p>What I do have is a willingness to keep testing, pay attention to what works, and make the next version better.</p>
          </details>
</section>
    </main>
  );
}
