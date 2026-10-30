"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

type InterestId = "curiosity" | "finance" | "markets" | "ai" | "build" | "create" | "design";
type MixId = "finance" | "markets" | "ai" | "build" | "content" | "design";
type TabId = "map" | "idea" | "journey" | "growth" | "desk";
type Point = { x: number; y: number };
type NoteId = "question" | "experiment" | "share";

const INTERESTS: {
  id: InterestId;
  label: string;
  short: string;
  tone: string;
  detail: string;
  tags: string[];
}[] = [
  {
    id: "curiosity",
    label: "Curiosity",
    short: "the starting point",
    tone: "ink",
    detail: "A question is usually where everything starts. I follow the interesting thread, even when it takes an unexpected turn.",
    tags: ["Questions", "Rabbit holes", "Learning"],
  },
  {
    id: "finance",
    label: "Finance",
    short: "how money moves",
    tone: "yellow",
    detail: "Markets, business models, valuation and the human decisions behind the numbers. I like understanding the mechanics, not memorising the jargon.",
    tags: ["Business", "Valuation", "Money"],
  },
  {
    id: "markets",
    label: "Markets",
    short: "patterns & behaviour",
    tone: "pink",
    detail: "The stories behind price moves, investor behaviour and the signals that deserve a closer look.",
    tags: ["Markets", "Research", "Behaviour"],
  },
  {
    id: "ai",
    label: "AI",
    short: "useful, not just hype",
    tone: "blue",
    detail: "Testing what AI can actually do, where it breaks, and how it can make complicated work easier.",
    tags: ["Models", "Automation", "Experiments"],
  },
  {
    id: "build",
    label: "Build",
    short: "turning ideas tangible",
    tone: "white",
    detail: "Small tools, dashboards and prototypes. I learn a lot faster when I can turn an idea into something I can click.",
    tags: ["Tools", "Prototypes", "Code"],
  },
  {
    id: "create",
    label: "Create",
    short: "making ideas useful",
    tone: "yellow",
    detail: "Turning a dense topic into a clear explanation, a useful resource or a video someone would actually finish.",
    tags: ["Videos", "Storytelling", "Teaching"],
  },
  {
    id: "design",
    label: "Design",
    short: "how it feels to use",
    tone: "pink",
    detail: "The small decisions that make an interface feel clear, thoughtful and enjoyable instead of merely functional.",
    tags: ["Interfaces", "Visuals", "Experience"],
  },
];

const CONNECTIONS: Array<[InterestId, InterestId]> = [
  ["curiosity", "finance"],
  ["curiosity", "markets"],
  ["curiosity", "ai"],
  ["curiosity", "build"],
  ["curiosity", "create"],
  ["curiosity", "design"],
  ["finance", "markets"],
  ["finance", "ai"],
  ["ai", "build"],
  ["build", "design"],
  ["design", "create"],
  ["create", "finance"],
];

const MIX_OPTIONS: { value: MixId; label: string }[] = [
  { value: "finance", label: "Finance" },
  { value: "markets", label: "Markets" },
  { value: "ai", label: "AI" },
  { value: "build", label: "Building" },
  { value: "content", label: "Content" },
  { value: "design", label: "Design" },
];

const IDEA_BANK: Record<string, { title: string; prompt: string; firstStep: string; secondStep: string }> = {
  "ai|finance": {
    title: "The five-minute earnings translator",
    prompt: "Take one earnings announcement and build a tiny workflow that turns it into five plain-English signals. Keep the original source beside every claim.",
    firstStep: "Choose one company and one reported quarter.",
    secondStep: "Compare the summary against the original filing before sharing it.",
  },
  "ai|build": {
    title: "A useful little AI assistant",
    prompt: "Make a one-screen assistant for a repetitive task you already do. Give it a narrow job, clear inputs and a visible way to check its output.",
    firstStep: "Write down the task and what a good result looks like.",
    secondStep: "Build the smallest working version before adding features.",
  },
  "ai|content": {
    title: "From research tab to reel",
    prompt: "Turn one complicated topic into a short explainer with a source trail. The challenge is to make it simpler without making it less accurate.",
    firstStep: "Write the one-sentence takeaway and collect primary sources.",
    secondStep: "Cut every sentence that does not help explain that takeaway.",
  },
  "ai|design": {
    title: "An interface that explains itself",
    prompt: "Design a small interface that makes one AI concept understandable through interaction instead of a wall of text.",
    firstStep: "Pick one confusing concept and identify the key misconception.",
    secondStep: "Use one control and one visual to make the idea click.",
  },
  "ai|markets": {
    title: "The signal-versus-noise board",
    prompt: "Create a research board that separates a market headline into facts, estimates, opinions and unanswered questions.",
    firstStep: "Pick one market story and save the original links.",
    secondStep: "Label every statement by evidence type before drawing a conclusion.",
  },
  "build|content": {
    title: "One idea, three formats",
    prompt: "Build a tiny workflow that transforms one researched idea into a short script, a carousel outline and a reading list—without inventing facts.",
    firstStep: "Start with one topic and a source document.",
    secondStep: "Keep the source links attached to every output.",
  },
  "build|design": {
    title: "A tiny tool with a lovely feel",
    prompt: "Find one annoying everyday task and build a one-screen tool that makes it easier. Give the interaction the same care as the visual design.",
    firstStep: "Describe the task in one sentence.",
    secondStep: "Prototype the main interaction before polishing the visuals.",
  },
  "build|finance": {
    title: "A financial concept you can play with",
    prompt: "Turn one finance concept into an interactive explainer with adjustable assumptions and a chart that updates immediately.",
    firstStep: "Choose a concept with a clear mathematical relationship.",
    secondStep: "Show the assumptions beside the output, not hidden in the code.",
  },
  "build|markets": {
    title: "A market story, not another dashboard",
    prompt: "Build a focused view that helps someone understand one market question instead of displaying every metric at once.",
    firstStep: "Write the question the screen should answer.",
    secondStep: "Keep only the data that changes the answer.",
  },
  "content|design": {
    title: "A visual explainer people remember",
    prompt: "Take a dense idea and explain it with one strong visual metaphor, a clear sequence and enough source detail to verify it.",
    firstStep: "Pick the one thing a viewer should remember.",
    secondStep: "Sketch the visual before writing the full script.",
  },
  "content|finance": {
    title: "A finance story without the lecture",
    prompt: "Explain one business or market event as a short story: what happened, why it matters, what is still uncertain and what to watch next.",
    firstStep: "Find the original announcement or filing.",
    secondStep: "Separate confirmed facts from your interpretation.",
  },
  "content|markets": {
    title: "The weekly market postcard",
    prompt: "Make a compact visual recap of one market theme, showing the move, the drivers and the questions that remain open.",
    firstStep: "Choose one theme rather than trying to cover the whole market.",
    secondStep: "Use dated sources and avoid implying causation without evidence.",
  },
  "design|finance": {
    title: "Make compounding feel obvious",
    prompt: "Design a visual explainer where someone can change the amount, return assumption and time horizon to see how compounding behaves.",
    firstStep: "Keep the inputs simple and label them clearly.",
    secondStep: "Show the difference between principal and growth.",
  },
  "design|markets": {
    title: "A chart that tells the truth",
    prompt: "Redesign a cluttered market chart so the important movement is clear and the scale, timeframe and source are impossible to miss.",
    firstStep: "Choose a chart with too many competing visual elements.",
    secondStep: "Remove decoration before adding another indicator.",
  },
  "finance|markets": {
    title: "A thesis in one page",
    prompt: "Build a one-page view of a market idea: the business, the numbers that matter, the counterargument and what would change your mind.",
    firstStep: "State the thesis and its strongest opposing argument.",
    secondStep: "Write down the evidence that could prove you wrong.",
  },
};

const JOURNEY_STAGES = [
  {
    title: "Notice",
    eyebrow: "01 / THE SPARK",
    body: "A question, chart, product or headline catches my attention. Usually the first thought is: wait, how does that actually work?",
    x: 11,
    y: 59,
  },
  {
    title: "Go deeper",
    eyebrow: "02 / THE RABBIT HOLE",
    body: "I follow the sources, pull apart assumptions, compare explanations and try to understand what is fact, what is opinion and what is still unknown.",
    x: 30,
    y: 27,
  },
  {
    title: "Make a thing",
    eyebrow: "03 / THE PROTOTYPE",
    body: "A model, a workflow, a dashboard or a rough sketch makes the idea tangible. It does not need to be perfect to teach me something.",
    x: 50,
    y: 65,
  },
  {
    title: "Share the useful bit",
    eyebrow: "04 / THE EXPLAINER",
    body: "I turn the clearest part into a video, project or resource so someone else can use the idea without repeating every detour.",
    x: 70,
    y: 27,
  },
  {
    title: "Find the next one",
    eyebrow: "05 / REPEAT",
    body: "Keep what worked, be honest about what did not, and follow the next question. The route is allowed to change.",
    x: 89,
    y: 59,
  },
];

const NOTE_LAYOUTS: Record<NoteId, Point>[] = [
  {
    question: { x: 17, y: 48 },
    experiment: { x: 50, y: 58 },
    share: { x: 83, y: 45 },
  },
  {
    question: { x: 22, y: 36 },
    experiment: { x: 52, y: 60 },
    share: { x: 78, y: 34 },
  },
  {
    question: { x: 17, y: 59 },
    experiment: { x: 49, y: 38 },
    share: { x: 82, y: 58 },
  },
];

const MONEY = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function money(value: number): string {
  return MONEY.format(Math.round(value));
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function polylinePoints(values: number[], maxValue: number): string {
  const left = 28;
  const right = 612;
  const top = 22;
  const bottom = 202;
  const denominator = Math.max(1, values.length - 1);

  return values
    .map((value, index) => {
      const x = left + (index / denominator) * (right - left);
      const y = bottom - (value / maxValue) * (bottom - top);
      return x.toFixed(1) + "," + y.toFixed(1);
    })
    .join(" ");
}

export function CuriosityEngine() {
  const [activeTab, setActiveTab] = useState<TabId>("map");
  const [activeInterestId, setActiveInterestId] = useState<InterestId>("curiosity");
  const [nodePositions, setNodePositions] = useState<Record<InterestId, Point>>({
    curiosity: { x: 50, y: 50 },
    finance: { x: 26, y: 22 },
    markets: { x: 12, y: 53 },
    ai: { x: 76, y: 22 },
    build: { x: 88, y: 53 },
    create: { x: 66, y: 84 },
    design: { x: 30, y: 84 },
  });

  const graphRef = useRef<HTMLDivElement>(null);
  const nodeDrag = useRef<{
    id: InterestId;
    pointerId: number;
    startX: number;
    startY: number;
    origin: Point;
  } | null>(null);

  const [mixA, setMixA] = useState<MixId>("finance");
  const [mixB, setMixB] = useState<MixId>("ai");
  const [copyMessage, setCopyMessage] = useState("");

  const [selectedStage, setSelectedStage] = useState(0);
  const [principal, setPrincipal] = useState(25000);
  const [annualRate, setAnnualRate] = useState(8);
  const [years, setYears] = useState(10);

  const deskRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const noteDrag = useRef<{
    id: NoteId;
    pointerId: number;
    startX: number;
    startY: number;
    origin: Point;
  } | null>(null);
  const [notePositions, setNotePositions] = useState<Record<NoteId, Point>>(NOTE_LAYOUTS[0]);
  const [deskArrangement, setDeskArrangement] = useState(0);
  const [eggOpen, setEggOpen] = useState(false);
  const [timeText, setTimeText] = useState("--:--");
  const [dateText, setDateText] = useState("Your device's local time");
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hour = now.getHours();
      setTimeText(now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }));
      setDateText(now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" }));
      setGreeting(hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening");
    };

    updateClock();
    const intervalId = window.setInterval(updateClock, 15000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (activeTab !== "desk") return;

    const board = deskRef.current;
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!board || !cursor || !finePointer || reducedMotion) return;

    board.dataset.cursorReady = "true";

    const onMove = (event: PointerEvent) => {
      cursor.style.transform =
        "translate3d(" + event.clientX + "px, " + event.clientY + "px, 0) translate(-50%, -50%)";
      const target = event.target;
      const labelled = target instanceof Element
        ? target.closest<HTMLElement>("[data-cursor-label]")
        : null;
      cursor.dataset.label = labelled?.dataset.cursorLabel ?? "EXPLORE";
      cursor.dataset.visible = "true";
    };

    const onLeave = () => {
      delete cursor.dataset.visible;
    };

    board.addEventListener("pointermove", onMove, { passive: true });
    board.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      board.removeEventListener("pointermove", onMove);
      board.removeEventListener("pointerleave", onLeave);
      delete board.dataset.cursorReady;
    };
  }, [activeTab]);

  const activeInterest = INTERESTS.find((item) => item.id === activeInterestId) ?? INTERESTS[0];
  const pairKey = [mixA, mixB].sort().join("|");
  const currentIdea = useMemo(() => {
    return IDEA_BANK[pairKey] ?? {
      title: "A small experiment at the intersection",
      prompt: "Use " + mixA + " to make " + mixB + " easier to explore, explain or test. Start with one focused question and build the smallest useful version.",
      firstStep: "Write down the question this experiment should answer.",
      secondStep: "Make one small prototype and ask someone to try it.",
    };
  }, [pairKey, mixA, mixB]);

  const compoundValues = useMemo(
    () => Array.from({ length: years + 1 }, (_, year) => principal * Math.pow(1 + annualRate / 100, year)),
    [annualRate, principal, years],
  );
  const simpleValues = useMemo(
    () => Array.from({ length: years + 1 }, (_, year) => principal * (1 + (annualRate / 100) * year)),
    [annualRate, principal, years],
  );
  const chartMax = Math.max(1, compoundValues[compoundValues.length - 1] * 1.08);
  const compoundTotal = compoundValues[compoundValues.length - 1];
  const simpleTotal = simpleValues[simpleValues.length - 1];

  function startNodeDrag(id: InterestId, event: ReactPointerEvent<HTMLButtonElement>) {
    if (!event.isPrimary) return;
    event.preventDefault();
    setActiveInterestId(id);
    nodeDrag.current = {
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: nodePositions[id],
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveNode(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = nodeDrag.current;
    const rect = graphRef.current?.getBoundingClientRect();
    if (!drag || drag.pointerId !== event.pointerId || !rect || !rect.width || !rect.height) return;

    const x = drag.origin.x + ((event.clientX - drag.startX) / rect.width) * 100;
    const y = drag.origin.y + ((event.clientY - drag.startY) / rect.height) * 100;
    setNodePositions((current) => ({
      ...current,
      [drag.id]: { x: clamp(x, 9, 91), y: clamp(y, 13, 87) },
    }));
  }

  function endNodeDrag() {
    nodeDrag.current = null;
  }

  function changeMixA(value: MixId) {
    setMixA(value);
    if (value === mixB) setMixB(mixA);
    setCopyMessage("");
  }

  function changeMixB(value: MixId) {
    setMixB(value);
    if (value === mixA) setMixA(mixB);
    setCopyMessage("");
  }

  function surpriseMe() {
    const first = Math.floor(Math.random() * MIX_OPTIONS.length);
    let second = Math.floor(Math.random() * MIX_OPTIONS.length);
    while (second === first) second = Math.floor(Math.random() * MIX_OPTIONS.length);
    setMixA(MIX_OPTIONS[first].value);
    setMixB(MIX_OPTIONS[second].value);
    setCopyMessage("");
  }

  async function copyIdea() {
    const content =
      currentIdea.title + "\n\n" + currentIdea.prompt + "\n\nFirst step: " +
      currentIdea.firstStep + "\nSecond step: " + currentIdea.secondStep;
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(content);
      setCopyMessage("Copied. Now make the tiny thing.");
    } catch {
      setCopyMessage("Clipboard is unavailable here. The idea is ready to select and copy.");
    }
  }

  function startNoteDrag(id: NoteId, event: ReactPointerEvent<HTMLButtonElement>) {
    if (!event.isPrimary) return;
    event.preventDefault();
    noteDrag.current = {
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: notePositions[id],
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveNote(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = noteDrag.current;
    const rect = deskRef.current?.getBoundingClientRect();
    if (!drag || drag.pointerId !== event.pointerId || !rect || !rect.width || !rect.height) return;

    const x = drag.origin.x + ((event.clientX - drag.startX) / rect.width) * 100;
    const y = drag.origin.y + ((event.clientY - drag.startY) / rect.height) * 100;
    setNotePositions((current) => ({
      ...current,
      [drag.id]: { x: clamp(x, 12, 88), y: clamp(y, 24, 76) },
    }));
  }

  function endNoteDrag() {
    noteDrag.current = null;
  }

  function shuffleDesk() {
    const next = (deskArrangement + 1) % NOTE_LAYOUTS.length;
    setDeskArrangement(next);
    setNotePositions(NOTE_LAYOUTS[next]);
  }

  const notes: {
    id: NoteId;
    label: string;
    title: string;
    body: string;
    tone: string;
    tilt: string;
  }[] = [
    {
      id: "question",
      label: "A NOTE TO SELF",
      title: "Stay curious.",
      body: "The best rabbit holes usually start with a better question.",
      tone: "yellow",
      tilt: "-3deg",
    },
    {
      id: "experiment",
      label: "CURRENT SIDE QUEST",
      title: "Make it tangible.",
      body: "A small working prototype beats a folder full of perfect plans.",
      tone: "blue",
      tilt: "2deg",
    },
    {
      id: "share",
      label: "DON'T FORGET",
      title: "Share the useful bit.",
      body: "Keep the explanation clear. Keep the sources close.",
      tone: "pink",
      tilt: "-1.5deg",
    },
  ];

  const eggMessages = [
    "You found the extra tab. Somewhere, a browser window just opened itself.",
    "Tiny reminder: unfinished experiments still count as experiments.",
    "Plot twist: the sticky notes are the project manager.",
  ];

  return (
    <section className="ce-engine" id="curiosity-lab" aria-labelledby="ce-heading">
      <div className="aj-container">
        <div className="ce-heading" data-reveal>
          <div className="ce-heading-copy">
            <p className="aj-eyebrow aj-eyebrow-accent">A SMALL CORNER OF THE INTERNET</p>
            <h2 id="ce-heading">Welcome to the <em>curiosity lab.</em></h2>
            <p>Explore the things I keep connecting, making, testing and occasionally overthinking.</p>
          </div>
          <div className="ce-live-clock" aria-label={greeting + ", " + timeText + ", " + dateText}>
            <span className="ce-live-dot" />
            <span className="ce-clock-copy"><strong>{greeting}</strong><time>{timeText}</time><small>{dateText}</small></span>
          </div>
        </div>

        <div className="ce-workspace">
          <div className="ce-tabbar" role="tablist" aria-label="Explore the curiosity lab">
            {([
              ["map", "Interest map", "01"],
              ["idea", "Idea snack", "02"],
              ["journey", "The journey", "03"],
              ["growth", "Playground", "04"],
              ["desk", "The desk", "05"],
            ] as [TabId, string, string][]).map(([id, label, number]) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={"ce-tab-" + id}
                aria-selected={activeTab === id}
                aria-controls="ce-tab-panel"
                tabIndex={activeTab === id ? 0 : -1}
                className={"ce-tab" + (activeTab === id ? " is-active" : "")}
                onClick={() => setActiveTab(id)}
              >
                <span>{number}</span>{label}
              </button>
            ))}
          </div>

          <div
            className="ce-panel"
            id="ce-tab-panel"
            role="tabpanel"
            aria-labelledby={"ce-tab-" + activeTab}
            key={activeTab}
          >
            {activeTab === "map" && (
              <div className="ce-map-layout">
                <div className="ce-card ce-map-card" data-reveal>
                  <div className="ce-card-heading">
                    <div><span className="ce-card-index">01 / HOW MY BRAIN CONNECTS THINGS</span><h3>The interest map</h3></div>
                    <span className="ce-mini-tag">MOVE THE NODES</span>
                  </div>
                  <div className="ce-network" ref={graphRef} aria-label="Moveable map of interests">
                    <svg className="ce-network-lines" viewBox="0 0 600 380" preserveAspectRatio="none" aria-hidden="true">
                      {CONNECTIONS.map(([from, to], index) => {
                        const a = nodePositions[from];
                        const b = nodePositions[to];
                        const related = activeInterestId === from || activeInterestId === to;
                        return (
                          <line
                            key={from + "-" + to + "-" + index}
                            x1={a.x * 6}
                            y1={a.y * 3.8}
                            x2={b.x * 6}
                            y2={b.y * 3.8}
                            className={related ? "ce-network-line is-related" : "ce-network-line"}
                          />
                        );
                      })}
                    </svg>
                    {INTERESTS.map((interest) => {
                      const position = nodePositions[interest.id];
                      const connected = CONNECTIONS.some(([from, to]) =>
                        (from === activeInterestId && to === interest.id) ||
                        (to === activeInterestId && from === interest.id),
                      );
                      return (
                        <button
                          key={interest.id}
                          type="button"
                          className={"ce-node ce-node-" + interest.tone}
                          style={{ left: position.x + "%", top: position.y + "%" }}
                          aria-pressed={activeInterestId === interest.id}
                          aria-label={"Explore " + interest.label + ": " + interest.short}
                          data-cursor-label="SELECT"
                          onPointerDown={(event) => startNodeDrag(interest.id, event)}
                          onPointerMove={moveNode}
                          onPointerUp={endNodeDrag}
                          onPointerCancel={endNodeDrag}
                          onClick={() => setActiveInterestId(interest.id)}
                          data-connected={connected || activeInterestId === interest.id}
                        >
                          <span className="ce-node-dot" />
                          <strong>{interest.label}</strong>
                          <small>{interest.short}</small>
                        </button>
                      );
                    })}
                  </div>
                  <p className="ce-map-hint"><span aria-hidden="true">↗</span> Drag a node to rearrange the map. Select one to explore that rabbit hole.</p>
                </div>

                <aside className={"ce-card ce-interest-detail ce-detail-" + activeInterest.tone} data-reveal aria-live="polite">
                  <span className="ce-card-index">CURRENT RABBIT HOLE</span>
                  <span className="ce-detail-spark" aria-hidden="true">✳</span>
                  <h3>{activeInterest.label}<span>.</span></h3>
                  <p>{activeInterest.detail}</p>
                  <div className="ce-detail-tags">
                    {activeInterest.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <button
                    type="button"
                    className="ce-arrow-button"
                    onClick={() => {
                      setMixA(activeInterest.id === "create" ? "content" : activeInterest.id === "curiosity" ? "design" : activeInterest.id);
                      setMixB(activeInterest.id === "ai" ? "build" : "ai");
                      setActiveTab("idea");
                    }}
                  >
                    Mix this interest into an idea <span aria-hidden="true">↗</span>
                  </button>
                  <p className="ce-detail-footnote">Different interests. More connections than expected.</p>
                </aside>
              </div>
            )}

            {activeTab === "idea" && (
              <div className="ce-idea-layout">
                <div className="ce-idea-intro">
                  <span className="ce-card-index">02 / THE IDEA SNACK MACHINE</span>
                  <h3>Two interests.<br /><em>One unexpected idea.</em></h3>
                  <p>Pick two ingredients. I&apos;ll give you a small experiment to try—not a 47-step startup plan.</p>
                  <div className="ce-idea-selects">
                    <label>First ingredient
                      <select value={mixA} onChange={(event) => changeMixA(event.target.value as MixId)}>
                        {MIX_OPTIONS.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
                      </select>
                    </label>
                    <span className="ce-plus" aria-hidden="true">+</span>
                    <label>Second ingredient
                      <select value={mixB} onChange={(event) => changeMixB(event.target.value as MixId)}>
                        {MIX_OPTIONS.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
                      </select>
                    </label>
                  </div>
                  <button type="button" className="ce-primary-button" onClick={surpriseMe}><span aria-hidden="true">↻</span> Surprise me</button>
                </div>

                <article className="ce-idea-card" data-reveal aria-live="polite">
                  <div className="ce-idea-card-top">
                    <span>YOUR IDEA, FRESHLY MIXED</span>
                    <span className="ce-idea-stamp">IDEA<br />SNACK</span>
                  </div>
                  <div className="ce-idea-colour-strip"><i /><i /><i /></div>
                  <h4>{currentIdea.title}</h4>
                  <p>{currentIdea.prompt}</p>
                  <div className="ce-idea-steps">
                    <div><b>START HERE</b><span>{currentIdea.firstStep}</span></div>
                    <div><b>THEN TRY</b><span>{currentIdea.secondStep}</span></div>
                  </div>
                  <div className="ce-idea-card-bottom">
                    <span>{MIX_OPTIONS.find((item) => item.value === mixA)?.label} × {MIX_OPTIONS.find((item) => item.value === mixB)?.label}</span>
                    <button type="button" onClick={() => void copyIdea()} aria-label="Copy this idea">Copy idea <span aria-hidden="true">↗</span></button>
                  </div>
                  <p className="ce-copy-message" aria-live="polite">{copyMessage}</p>
                </article>
              </div>
            )}

            {activeTab === "journey" && (
              <div className="ce-journey-layout">
                <div className="ce-journey-heading">
                  <div><span className="ce-card-index">03 / NOT A STRAIGHT LINE</span><h3>A journey made of <em>side quests.</em></h3></div>
                  <p>No fixed route. Just a repeatable way of turning curiosity into something useful.</p>
                </div>
                <div className="ce-journey-scroll">
                  <div className="ce-journey-canvas">
                    <svg viewBox="0 0 1000 220" preserveAspectRatio="none" aria-hidden="true">
                      <path className="ce-journey-track" d="M110 130 C160 130 175 48 300 58 S420 176 500 140 S635 48 700 58 S840 150 890 130" />
                      <path className="ce-journey-track ce-journey-track-back" d="M110 130 C160 130 175 48 300 58 S420 176 500 140 S635 48 700 58 S840 150 890 130" />
                    </svg>
                    {JOURNEY_STAGES.map((stage, index) => (
                      <button
                        type="button"
                        className={"ce-journey-stop" + (selectedStage === index ? " is-active" : "")}
                        style={{ left: stage.x + "%", top: stage.y + "%" }}
                        key={stage.title}
                        aria-pressed={selectedStage === index}
                        onClick={() => setSelectedStage(index)}
                      >
                        <span className="ce-journey-stop-dot">{String(index + 1).padStart(2, "0")}</span>
                        <strong>{stage.title}</strong>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="ce-journey-detail" aria-live="polite">
                  <span className="ce-card-index">{JOURNEY_STAGES[selectedStage].eyebrow}</span>
                  <h4>{JOURNEY_STAGES[selectedStage].title}<span>.</span></h4>
                  <p>{JOURNEY_STAGES[selectedStage].body}</p>
                  <span className="ce-journey-detour">DETours are part of the route <i aria-hidden="true">↗</i></span>
                </div>
                <p className="ce-journey-mobile-hint">Swipe the path on a small screen, then tap a stop.</p>
              </div>
            )}

            {activeTab === "growth" && (
              <div className="ce-growth-layout">
                <div className="ce-growth-intro">
                  <span className="ce-card-index">04 / A LIVE LITTLE EXPERIMENT</span>
                  <h3>The compounding <em>machine.</em></h3>
                  <p>Change the assumptions. Watch the curve redraw. This is a maths demo, not a market forecast.</p>
                  <div className="ce-growth-controls">
                    <label>
                      <span>Starting amount <strong>{money(principal)}</strong></span>
                      <input type="range" min="5000" max="500000" step="5000" value={principal} onChange={(event) => setPrincipal(Number(event.target.value))} />
                      <small>₹5,000 <span>₹5,00,000</span></small>
                    </label>
                    <label>
                      <span>Annual return <strong>{annualRate.toFixed(1)}%</strong></span>
                      <input type="range" min="0" max="20" step="0.5" value={annualRate} onChange={(event) => setAnnualRate(Number(event.target.value))} />
                      <small>0% <span>20%</span></small>
                    </label>
                    <label>
                      <span>Time horizon <strong>{years} years</strong></span>
                      <input type="range" min="1" max="30" step="1" value={years} onChange={(event) => setYears(Number(event.target.value))} />
                      <small>1 year <span>30 years</span></small>
                    </label>
                  </div>
                </div>

                <div className="ce-growth-chart-card" data-reveal>
                  <div className="ce-growth-summary">
                    <span>ESTIMATED VALUE AT YEAR {years}</span>
                    <strong>{money(compoundTotal)}</strong>
                    <small>Illustrative compound growth</small>
                  </div>
                  <svg className="ce-growth-chart" viewBox="0 0 640 238" role="img" aria-label={"Illustrative investment growth from " + money(principal) + " to " + money(compoundTotal) + " over " + years + " years at " + annualRate.toFixed(1) + " percent annual return."}>
                    {[42, 82, 122, 162, 202].map((y) => <line key={y} x1="28" x2="612" y1={y} y2={y} className="ce-chart-gridline" />)}
                    <polyline points={polylinePoints(simpleValues, chartMax)} className="ce-chart-simple" fill="none" />
                    <polyline points={polylinePoints(compoundValues, chartMax)} className="ce-chart-compound" fill="none" />
                    <text x="28" y="226" className="ce-chart-axis">YEAR 0</text>
                    <text x="612" y="226" textAnchor="end" className="ce-chart-axis">YEAR {years}</text>
                  </svg>
                  <div className="ce-chart-legend">
                    <span><i className="ce-legend-compound" /> Compound</span>
                    <span><i className="ce-legend-simple" /> Simple</span>
                  </div>
                  <div className="ce-growth-results">
                    <div><small>Amount invested</small><strong>{money(principal)}</strong></div>
                    <div><small>Compound growth</small><strong>{money(compoundTotal - principal)}</strong></div>
                    <div><small>Simple interest value</small><strong>{money(simpleTotal)}</strong></div>
                  </div>
                  <p className="ce-disclaimer">Assumes one initial investment, a constant annual rate and annual compounding. Excludes taxes, fees, inflation and volatility. Actual returns are not constant or guaranteed.</p>
                </div>
              </div>
            )}

            {activeTab === "desk" && (
              <div className="ce-desk-layout">
                <div className="ce-desk-heading">
                  <div><span className="ce-card-index">05 / THE DIGITAL DESK</span><h3>Move a few <em>thoughts around.</em></h3></div>
                  <div className="ce-desk-actions">
                    <span>Grab the little handle to move a note.</span>
                    <button type="button" className="ce-secondary-button" onClick={shuffleDesk}>Shuffle the desk <span aria-hidden="true">↻</span></button>
                  </div>
                </div>
                <div className="ce-desk-board" ref={deskRef}>
                  {notes.map((note) => (
                    <article
                      key={note.id}
                      className={"ce-desk-note ce-desk-note-" + note.tone}
                      style={{
                        left: notePositions[note.id].x + "%",
                        top: notePositions[note.id].y + "%",
                        ["--ce-note-tilt" as string]: note.tilt,
                      }}
                    >
                      <div className="ce-desk-note-top">
                        <span>{note.label}</span>
                        <button
                          type="button"
                          className="ce-note-grip"
                          aria-label={"Drag the note: " + note.title}
                          data-cursor-label="MOVE"
                          onPointerDown={(event) => startNoteDrag(note.id, event)}
                          onPointerMove={moveNote}
                          onPointerUp={endNoteDrag}
                          onPointerCancel={endNoteDrag}
                        >⠿</button>
                      </div>
                      <h4>{note.title}</h4>
                      <p>{note.body}</p>
                      <span className="ce-desk-note-scribble" aria-hidden="true">↗</span>
                    </article>
                  ))}
                  <div className="ce-custom-cursor" ref={cursorRef} aria-hidden="true" />
                </div>
                <div className="ce-desk-footer">
                  <div className="ce-secret-card">
                    <span className="ce-card-index">A VERY SMALL EASTER EGG</span>
                    <p>{eggOpen ? eggMessages[deskArrangement] : "There is one tiny secret hiding in this desk."}</p>
                    <button type="button" onClick={() => setEggOpen((open) => !open)} aria-expanded={eggOpen}>
                      {eggOpen ? "Hide the secret" : "Find the secret"} <span aria-hidden="true">✳</span>
                    </button>
                  </div>
                  <div className="ce-desk-time">
                    <span className="ce-card-index">YOUR LOCAL TIME</span>
                    <strong>{timeText}</strong>
                    <span>{dateText}</span>
                    <small>Updates from your device. No location tracking.</small>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
