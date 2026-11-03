"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { usePathname } from "next/navigation";

type Pose =
  | "peek" | "idle" | "walk" | "run" | "jump" | "inspect"
  | "work" | "read" | "think" | "click" | "wave" | "celebrate";

type Waypoint = {
  selector: string;
  side: "left" | "right";
  top: string;
  pose: Pose;
  message: string;
};

const WAYPOINTS: Waypoint[] = [
  { selector: ".aj-hero", side: "right", top: "66vh", pose: "idle", message: "Hey, welcome in!" },
  { selector: ".aj-pillars-section", side: "left", top: "64vh", pose: "inspect", message: "Which rabbit hole first?" },
  { selector: "#curiosity-lab", side: "left", top: "66vh", pose: "think", message: "Interesting connection..." },
  { selector: "#latest-videos", side: "right", top: "67vh", pose: "click", message: "Pick a video!" },
  { selector: ".aj-note-wall-section", side: "left", top: "66vh", pose: "read", message: "One more thing to learn." },
  { selector: ".aj-contact-section", side: "right", top: "65vh", pose: "wave", message: "Come say hello." },
  { selector: ".aj-footer", side: "left", top: "66vh", pose: "celebrate", message: "You made it. Nice." },
];

const subscribeToMount = (_onStoreChange: () => void) => () => {};
const getClientMountSnapshot = () => true;
const getServerMountSnapshot = () => false;

function MiniAmanArt({ pose }: { pose: Pose }) {
  const sitting = pose === "work" || pose === "read";
  const tucked = pose === "jump";
  const celebrating = pose === "celebrate";
  const waving = pose === "wave";
  const clicking = pose === "click";
  const thinking = pose === "think";
  const inspecting = pose === "inspect";

  return (
    <svg className="mini-aman-art" viewBox="0 0 112 144" role="presentation" aria-hidden="true">
      <defs>
        <pattern id="mini-aman-plaid" width="34" height="34" patternUnits="userSpaceOnUse">
          <rect width="34" height="34" fill="#29262E" />
          <path d="M0 8H34 M0 26H34 M9 0V34 M27 0V34" stroke="#99859C" strokeWidth="3.2" opacity=".9" />
          <path d="M0 17H34 M18 0V34" stroke="#F0E9E6" strokeWidth="1.4" opacity=".85" />
          <path d="M4 0V34 M0 4H34" stroke="#6E6574" strokeWidth="1" opacity=".8" />
        </pattern>
      </defs>

      {/* Legs and shoes: the same proportions are retained across every action pose. */}
      {sitting ? (
        <g className="mini-aman-legs mini-aman-legs-sitting">
          <path d="M39 91 Q33 104 27 111 Q22 118 35 120 L59 116 Q63 112 56 106 L54 91Z" fill="#242329" stroke="#19181D" strokeWidth="2.5" />
          <path d="M57 94 Q65 104 76 108 Q84 112 81 119 L57 121 Q48 119 48 113 L45 95Z" fill="#242329" stroke="#19181D" strokeWidth="2.5" />
          <path d="M22 116 Q30 112 40 116 L44 123 Q44 128 35 128 L19 126 Q14 123 22 116Z" fill="#F5F0E9" stroke="#28262D" strokeWidth="2" />
          <path d="M58 116 Q69 112 81 116 L87 124 Q86 128 76 128 L58 126 Q52 123 58 116Z" fill="#F5F0E9" stroke="#28262D" strokeWidth="2" />
          <path d="M22 122H40 M61 122H83" stroke="#E46D32" strokeWidth="1.7" />
        </g>
      ) : tucked ? (
        <g className="mini-aman-legs mini-aman-legs-jump">
          <path d="M40 91 Q30 98 26 105 Q23 112 34 114 L53 107 Q57 101 51 94Z" fill="#242329" stroke="#19181D" strokeWidth="2.5" />
          <path d="M60 91 Q73 91 79 98 Q87 104 80 110 L60 108 Q51 104 52 97Z" fill="#242329" stroke="#19181D" strokeWidth="2.5" />
          <path d="M23 108 Q31 104 39 108 L44 115 Q42 120 34 119 L21 116Z" fill="#F5F0E9" stroke="#28262D" strokeWidth="2" />
          <path d="M72 103 Q82 98 90 102 L96 109 Q94 114 85 113 L72 111Z" fill="#F5F0E9" stroke="#28262D" strokeWidth="2" />
          <path d="M25 114L41 114 M77 108L92 108" stroke="#E46D32" strokeWidth="1.7" />
        </g>
      ) : (
        <g className="mini-aman-legs">
          <path className="mini-aman-leg mini-aman-leg-left" d="M40 91 L39 113 Q37 122 34 125 L47 128 Q54 125 51 117 L55 94Z" fill="#242329" stroke="#19181D" strokeWidth="2.5" />
          <path className="mini-aman-leg mini-aman-leg-right" d="M58 92 L62 113 Q65 120 71 124 L83 120 Q83 115 75 110 L73 91Z" fill="#242329" stroke="#19181D" strokeWidth="2.5" />
          <path d="M31 121 Q40 118 49 122 L53 129 Q51 133 42 132 L29 129 Q26 126 31 121Z" fill="#F5F0E9" stroke="#28262D" strokeWidth="2" />
          <path d="M68 119 Q78 116 86 119 L92 126 Q91 131 82 130 L68 128 Q64 125 68 119Z" fill="#F5F0E9" stroke="#28262D" strokeWidth="2" />
          <path d="M32 127H49 M70 125H88" stroke="#E46D32" strokeWidth="1.7" />
        </g>
      )}

      {/* Shirt, collar, and clipped microphone. */}
      <g className="mini-aman-torso">
        <path d="M40 57 Q55 51 71 58 Q81 64 80 91 L75 103 Q55 110 34 101 L31 78 Q31 65 40 57Z" fill="url(#mini-aman-plaid)" stroke="#201E24" strokeWidth="2.7" />
        <path d="M48 56 L55 66 L62 56" fill="#E8E0E0" stroke="#29262E" strokeWidth="2" />
        <path d="M54 67L55 99" stroke="#F0E9E6" strokeWidth="1.3" opacity=".7" />
        <path d="M65 74L74 72L74 84L65 86Z" fill="none" stroke="#D7CDD7" strokeWidth="1.2" />
        <circle cx="70" cy="90" r="3.2" fill="#18171B" stroke="#D9D2D5" strokeWidth="1" />
        <circle cx="70" cy="87.8" r="2.2" fill="#B8B2B8" />
      </g>

      {/* Arms change with the activity rather than moving the whole character like a sticker. */}
      {celebrating ? (
        <g className="mini-aman-arms">
          <path d="M39 65 Q27 59 25 48 L19 36" fill="none" stroke="#29262E" strokeWidth="10" strokeLinecap="round" />
          <path d="M19 36 Q12 30 16 25 Q20 22 24 29 L28 35" fill="#C88770" stroke="#29262E" strokeWidth="2" />
          <path d="M73 65 Q87 59 89 47 L94 34" fill="none" stroke="#29262E" strokeWidth="10" strokeLinecap="round" />
          <path d="M94 34 Q99 27 103 31 Q106 35 100 41 L96 43" fill="#C88770" stroke="#29262E" strokeWidth="2" />
        </g>
      ) : waving ? (
        <g className="mini-aman-arms">
          <path d="M72 66 Q83 63 87 51 L91 36" fill="none" stroke="url(#mini-aman-plaid)" strokeWidth="10" strokeLinecap="round" />
          <path d="M91 36 Q86 30 91 25 Q95 22 98 28 L100 36 Q96 42 91 36Z" fill="#C88770" stroke="#29262E" strokeWidth="2" />
          <path d="M39 66 Q30 75 34 89 L40 94" fill="none" stroke="url(#mini-aman-plaid)" strokeWidth="10" strokeLinecap="round" />
          <path d="M40 94Q46 96 47 91" fill="none" stroke="#C88770" strokeWidth="5" strokeLinecap="round" />
        </g>
      ) : clicking ? (
        <g className="mini-aman-arms">
          <path d="M72 66 Q82 68 88 75 L100 76" fill="none" stroke="url(#mini-aman-plaid)" strokeWidth="10" strokeLinecap="round" />
          <path d="M100 76 L106 72 M100 76 L107 79" stroke="#C88770" strokeWidth="4" strokeLinecap="round" />
          <path d="M39 67 Q30 75 34 88 L41 93" fill="none" stroke="url(#mini-aman-plaid)" strokeWidth="10" strokeLinecap="round" />
          <path d="M41 93Q47 95 48 90" fill="none" stroke="#C88770" strokeWidth="5" strokeLinecap="round" />
        </g>
      ) : thinking ? (
        <g className="mini-aman-arms">
          <path d="M72 66 Q84 68 79 77 L67 83" fill="none" stroke="url(#mini-aman-plaid)" strokeWidth="10" strokeLinecap="round" />
          <path d="M67 83 Q64 80 68 76 Q73 73 76 79" fill="#C88770" stroke="#29262E" strokeWidth="2" />
          <path d="M40 66 Q30 73 34 87 L43 91" fill="none" stroke="url(#mini-aman-plaid)" strokeWidth="10" strokeLinecap="round" />
        </g>
      ) : sitting ? (
        <g className="mini-aman-arms">
          <path d="M39 66 Q29 73 36 83 L48 91" fill="none" stroke="url(#mini-aman-plaid)" strokeWidth="10" strokeLinecap="round" />
          <path d="M48 91L55 91" stroke="#C88770" strokeWidth="5" strokeLinecap="round" />
          <path d="M72 66 Q83 71 78 83 L67 91" fill="none" stroke="url(#mini-aman-plaid)" strokeWidth="10" strokeLinecap="round" />
          <path d="M67 91L60 92" stroke="#C88770" strokeWidth="5" strokeLinecap="round" />
        </g>
      ) : (
        <g className="mini-aman-arms">
          <path className="mini-aman-arm mini-aman-arm-left" d="M39 66 Q27 73 31 85 L34 93" fill="none" stroke="url(#mini-aman-plaid)" strokeWidth="10" strokeLinecap="round" />
          <path d="M34 93Q38 98 43 94" fill="none" stroke="#C88770" strokeWidth="5" strokeLinecap="round" />
          <path className="mini-aman-arm mini-aman-arm-right" d="M72 66 Q84 72 80 85 L77 93" fill="none" stroke="url(#mini-aman-plaid)" strokeWidth="10" strokeLinecap="round" />
          <path d="M77 93Q72 98 68 94" fill="none" stroke="#C88770" strokeWidth="5" strokeLinecap="round" />
        </g>
      )}

      {/* Face: oval proportions, soft jaw, thick brows, deep-set brown eyes and the forward-swept fringe. */}
      <g className="mini-aman-head">
        <path d="M35 29 Q35 13 54 12 Q73 12 78 29 L76 47 Q74 63 57 66 Q40 63 36 48Z" fill="#C88770" stroke="#29232A" strokeWidth="2.3" />
        <path d="M35 37Q29 34 31 42Q32 48 38 48 M76 39Q83 35 82 43Q81 49 76 50" fill="#C88770" stroke="#29232A" strokeWidth="2" />
        <path d="M34 34 Q27 25 32 17 Q34 10 45 10 Q49 2 61 7 Q72 4 79 16 Q86 23 78 37 Q76 27 70 25 Q62 30 53 25 Q46 34 35 38Z" fill="#1F1D22" stroke="#17161A" strokeWidth="2" />
        <path d="M34 25 Q30 17 39 13 Q40 7 49 10 Q52 4 60 9 Q68 5 74 13 Q81 14 79 23 Q71 18 67 18 Q58 22 50 18 Q42 25 34 25Z" fill="#262329" />
        <path d="M36 34Q42 25 49 26 Q56 30 62 25 Q69 24 77 33" fill="none" stroke="#17161A" strokeWidth="5" strokeLinecap="round" />
        <path d="M39 38Q45 34 50 37 M63 37Q69 33 74 37" fill="none" stroke="#30232A" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M39 42Q44 38 49 42Q45 47 40 44Z M63 42Q68 38 73 42Q69 47 64 44Z" fill="#F7EEE8" />
        <ellipse cx="45" cy="42" rx="2.1" ry="3" fill="#34272A" />
        <ellipse cx="68" cy="42" rx="2.1" ry="3" fill="#34272A" />
        <circle cx="45.6" cy="41.2" r=".8" fill="#FFF" />
        <circle cx="68.6" cy="41.2" r=".8" fill="#FFF" />
        <path d="M56 43Q53 49 55 51L59 51" fill="none" stroke="#9D665A" strokeWidth="1.8" strokeLinecap="round" />
        {celebrating || waving ? (
          <path d="M46 55Q57 64 69 54" fill="none" stroke="#713F43" strokeWidth="2.5" strokeLinecap="round" />
        ) : (
          <path d="M48 56Q57 60 66 55" fill="none" stroke="#713F43" strokeWidth="2.2" strokeLinecap="round" />
        )}
        <path d="M38 50Q40 52 43 51 M69 51Q72 52 74 50" fill="none" stroke="#D99A88" strokeWidth="1.5" opacity=".8" />
        <path d="M40 58Q48 65 57 65Q68 64 74 57" fill="none" stroke="#A76D60" strokeWidth="1" opacity=".3" />
        <path d="M31 26Q29 20 34 17 M76 14Q82 18 81 25 M46 8L49 4 M61 8L65 4" fill="none" stroke="#1F1D22" strokeWidth="2.3" strokeLinecap="round" />
      </g>

      {/* Context props only appear when he reaches the matching part of the homepage. */}
      {sitting && (
        <g className="mini-aman-prop">
          {pose === "work" ? (
            <>
              <path d="M17 92L88 92L98 111L25 111Z" fill="#3A353D" stroke="#211F25" strokeWidth="2" />
              <path d="M22 95L83 95L89 106L29 106Z" fill="#D9E6E8" stroke="#27252C" strokeWidth="1.5" />
              <path d="M46 110L68 110" stroke="#F4EEE7" strokeWidth="1.7" />
              <path d="M54 99L62 99" stroke="#E46D32" strokeWidth="2" />
            </>
          ) : (
            <>
              <path d="M23 95Q40 88 53 98L53 119Q38 110 23 118Z" fill="#E5B15C" stroke="#29262E" strokeWidth="2" />
              <path d="M53 98Q68 88 84 95L84 118Q67 110 53 119Z" fill="#F0D39A" stroke="#29262E" strokeWidth="2" />
              <path d="M53 99V118" stroke="#B8753B" strokeWidth="1.5" />
              <path d="M29 103L45 101 M60 102L77 99" stroke="#8B6241" strokeWidth="1" />
            </>
          )}
        </g>
      )}

      {inspecting && (
        <g className="mini-aman-prop">
          <circle cx="91" cy="67" r="10" fill="none" stroke="#29262E" strokeWidth="3" />
          <circle cx="91" cy="67" r="6.5" fill="#F9E9D4" fillOpacity=".55" stroke="#E46D32" strokeWidth="1.4" />
          <path d="M84 75L76 86" stroke="#29262E" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}

      {clicking && (
        <g className="mini-aman-prop mini-aman-click-spark">
          <path d="M100 62V54 M95 67L89 62 M105 67L111 63" stroke="#E46D32" strokeWidth="2" strokeLinecap="round" />
          <circle cx="102" cy="75" r="3" fill="#E46D32" />
        </g>
      )}

      {celebrating && <g className="mini-aman-sparks"><path d="M14 14L9 8 M98 18L105 11 M8 58L2 58 M105 53L111 51" stroke="#E46D32" strokeWidth="2.5" strokeLinecap="round" /></g>}
    </svg>
  );
}

export function MiniAman() {
  const pathname = usePathname();
  const mounted = useSyncExternalStore(subscribeToMount, getClientMountSnapshot, getServerMountSnapshot);
  const [sceneIndex, setSceneIndex] = useState(-1);
  const [pose, setPose] = useState<Pose>("peek");
  const [message, setMessage] = useState("");
  const [transition, setTransition] = useState<"enter" | "run" | "jump" | "rest">("enter");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const sceneIndexRef = useRef(-1);
  const interactionTimer = useRef<number | null>(null);
  const transitionTimers = useRef<number[]>([]);
  const lastTarget = useRef<string>("");

  const isHome = pathname === "/" || pathname === "/MY-WEBSITE" || pathname === "/MY-WEBSITE/";

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!mounted || !isHome) return;
    const targets = WAYPOINTS.flatMap((waypoint, index) => {
      const element = document.querySelector(waypoint.selector);
      return element ? [{ element, index }] : [];
    });
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      const active = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      const match = targets.find((target) => target.element === active.target);
      if (match) setSceneIndex(match.index);
    }, { rootMargin: "-22% 0px -46% 0px", threshold: [0, 0.08, 0.2, 0.35] });

    targets.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, [mounted, isHome]);

  useEffect(() => {
    if (sceneIndex < 0) return;
    const waypoint = WAYPOINTS[sceneIndex];
    const previous = sceneIndexRef.current;
    sceneIndexRef.current = sceneIndex;
    if (interactionTimer.current !== null) window.clearTimeout(interactionTimer.current);
    transitionTimers.current.forEach((timer) => window.clearTimeout(timer));
    transitionTimers.current = [];

    if (reducedMotion) return;

    const enterScene = () => {
      setPose(waypoint.pose);
      setTransition("rest");
      setMessage(waypoint.message);
      const clearMessage = window.setTimeout(() => setMessage(""), 1900);
      transitionTimers.current.push(clearMessage);
    };

    if (previous === -1 && sceneIndex === 0) {
      setPose("peek");
      setTransition("enter");
      const timer = window.setTimeout(enterScene, 720);
      transitionTimers.current.push(timer);
    } else {
      setPose("run");
      setTransition("run");
      const runTimer = window.setTimeout(() => {
        setPose("jump");
        setTransition("jump");
        const landTimer = window.setTimeout(enterScene, 620);
        transitionTimers.current.push(landTimer);
      }, 420);
      transitionTimers.current.push(runTimer);
    }

    return () => {
      transitionTimers.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, [sceneIndex, reducedMotion]);

  useEffect(() => {
    if (!mounted || !isHome || reducedMotion) return;

    const restorePose = () => {
      if (interactionTimer.current !== null) window.clearTimeout(interactionTimer.current);
      interactionTimer.current = window.setTimeout(() => {
        const current = WAYPOINTS[sceneIndexRef.current];
        setPose(current?.pose ?? "idle");
        setMessage("");
        lastTarget.current = "";
      }, 1400);
    };

    const onPointerOver = (event: PointerEvent) => {
      const origin = event.target;
      if (!(origin instanceof Element)) return;
      const video = origin.closest(".aj-video-card");
      const pillar = origin.closest(".aj-pillar");
      const curiosity = origin.closest(".ce-node, .ce-tab, .ce-journey-stop");
      const project = origin.closest(".aj-feature-card, .aj-project-card, .aj-project-card-fokus");
      const target = video || project || pillar || curiosity;
      if (!target) return;
      const pillarTitle = pillar?.querySelector("h2")?.textContent?.trim().toLowerCase() ?? "";
      const buildCard = pillarTitle === "build";
      const key = video ? "video" : project ? "project" : pillar ? "pillar-" + pillarTitle : "curiosity";
      if (lastTarget.current === key) return;
      lastTarget.current = key;
      setPose(video ? "click" : project || buildCard ? "work" : pillar ? "inspect" : "think");
      setMessage(video ? "This one!" : project || buildCard ? "Let's build." : pillar ? "Let's look closer." : "Interesting...");
      restorePose();
    };

    const onPointerDown = (event: PointerEvent) => {
      const origin = event.target;
      if (!(origin instanceof Element)) return;
      if (origin.closest(".aj-video-card")) {
        setPose("click");
        setMessage("Tap!");
        restorePose();
      } else if (origin.closest(".aj-pillar")) {
        const title = origin.closest(".aj-pillar")?.querySelector("h2")?.textContent?.trim().toLowerCase();
        setPose(title === "build" ? "work" : "inspect");
        setMessage(title === "build" ? "Let's build." : "Good direction.");
        restorePose();
      } else if (origin.closest(".ce-node, .ce-tab, .ce-journey-stop")) {
        setPose("think");
        setMessage("Noted. Interesting.");
        restorePose();
      } else if (origin.closest(".aj-button, .aj-contact-detail, .aj-nav-cta")) {
        setPose("wave");
        setMessage("Good choice.");
        restorePose();
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      const origin = event.target;
      if (!(origin instanceof Element)) return;
      if (origin.closest(".aj-video-card, .aj-feature-card, .aj-project-card, .aj-project-card-fokus, .aj-pillar, .ce-node, .ce-tab, .ce-journey-stop")) {
        const related = event.relatedTarget;
        if (!(related instanceof Element) || !origin.closest(".aj-video-card, .aj-feature-card, .aj-project-card, .aj-project-card-fokus, .aj-pillar, .ce-node, .ce-tab, .ce-journey-stop")?.contains(related)) {
          lastTarget.current = "";
        }
      }
    };

    const onFocusIn = (event: FocusEvent) => {
      const origin = event.target;
      if (!(origin instanceof Element)) return;
      if (origin.closest(".aj-video-card")) {
        setPose("click");
        setMessage("This one!");
        restorePose();
      }
    };

    document.addEventListener("pointerover", onPointerOver, true);
    document.addEventListener("pointerout", onPointerOut, true);
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("focusin", onFocusIn, true);
    return () => {
      document.removeEventListener("pointerover", onPointerOver, true);
      document.removeEventListener("pointerout", onPointerOut, true);
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("focusin", onFocusIn, true);
      if (interactionTimer.current !== null) window.clearTimeout(interactionTimer.current);
    };
  }, [mounted, isHome, reducedMotion]);

  useEffect(() => () => {
    transitionTimers.current.forEach((timer) => window.clearTimeout(timer));
    if (interactionTimer.current !== null) window.clearTimeout(interactionTimer.current);
  }, []);

  if (!mounted || !isHome) return null;

  const displayPose: Pose = reducedMotion ? "idle" : pose;
  const displayTransition = reducedMotion ? "rest" : transition;
  const displayMessage = reducedMotion ? "" : message;
  const waypoint = WAYPOINTS[Math.max(0, sceneIndex)];
  const sideStyle: CSSProperties = waypoint.side === "left"
    ? { left: "max(5px, calc((100vw - 1180px) / 2 - 54px))", right: "auto", top: waypoint.top }
    : { right: "max(5px, calc((100vw - 1180px) / 2 - 54px))", left: "auto", top: waypoint.top };

  return (
    <div
      className={"mini-aman mini-aman-side-" + waypoint.side + (displayTransition !== "rest" ? " mini-aman-transition-" + displayTransition : "") + (!pageVisible ? " mini-aman-page-paused" : "")}
      style={sideStyle}
      data-pose={displayPose}
      aria-hidden="true"
    >
      <div className={"mini-aman-bubble" + (displayMessage ? " is-visible" : "")}>{displayMessage}</div>
      <div className="mini-aman-character">
        <span className="mini-aman-trail" />
        <MiniAmanArt pose={displayPose} />
        <span className="mini-aman-shadow" />
      </div>
    </div>
  );
}
