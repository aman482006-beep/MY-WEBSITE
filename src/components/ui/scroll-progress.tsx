"use client";

import { useEffect, useRef } from "react";

export function ScrollProgressBar() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0
        ? Math.max(0, Math.min(1, window.scrollY / scrollableHeight))
        : 0;

      fillRef.current?.style.setProperty("transform", `scaleX(${progress})`);
    };

    const scheduleUpdate = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[1000] pointer-events-none bg-[var(--aj-line)]"
      aria-hidden="true"
    >
      <div
        ref={fillRef}
        className="aj-scroll-progress-fill relative h-full origin-left bg-[var(--aj-orange)]"
        style={{ transform: "scaleX(0)" }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--aj-orange)]" />
      </div>
    </div>
  );
}
