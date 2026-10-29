"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = [
  ".aj-hero-copy",
  ".aj-hero-visual",
  ".aj-pillars-section .aj-section-topline",
  ".aj-pillar",
  ".aj-section-heading",
  ".aj-feature-card",
  ".aj-focus-art",
  ".aj-finance-bridge-card",
  ".aj-finance-work-card",
  ".aj-video-card",
  ".aj-case-feature",
  ".aj-case-screenshot-placeholder",
  ".aj-recruiter-facts article",
  ".aj-home-story-heading",
  ".aj-sticky-note",
  ".aj-no-plan-intro",
  ".aj-story-step",
  ".aj-story-end-note",
  ".aj-work-tags",
  ".aj-video-unavailable",
  ".aj-recruiter-intro",
  ".aj-recruiter-facts",
  ".aj-contact-grid",
  ".aj-inner-heading",
  ".aj-case-section",
  ".aj-case-next",
  ".aj-creator-pillar",
  ".aj-recruiter-overview-card",
  ".aj-recruiter-skill-card",
  ".aj-credential-item",
  ".aj-contact-compose",
  ".aj-contact-direct",
  ".aj-contact-social-card",
  ".aj-resource-card",
  ".aj-resource-request",
].join(",");

export function MotionRoot({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const cleanupHandlers: Array<() => void> = [];
    let observer: IntersectionObserver | null = null;

    if ("IntersectionObserver" in window && revealNodes.length > 0) {
      const siblingIndexes = new Map<Element, number>();
      for (const node of revealNodes) {
        const parent = node.parentElement;
        const index = parent ? (siblingIndexes.get(parent) ?? 0) : 0;
        if (parent) siblingIndexes.set(parent, index + 1);
        node.dataset.reveal = "true";
        node.removeAttribute("data-revealed");
        node.style.setProperty("--aj-reveal-delay", Math.min(index, 5) * 65 + "ms");
      }

      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer?.unobserve(entry.target);
        }
      }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });

      document.documentElement.classList.add("aj-motion-enabled");
      revealNodes.forEach((node) => observer?.observe(node));
    }

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const pillarCards = Array.from(document.querySelectorAll<HTMLElement>(".aj-pillar"));
      for (const card of pillarCards) {
        const onMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty("--aj-pillar-x", x.toFixed(2) + "%");
          card.style.setProperty("--aj-pillar-y", y.toFixed(2) + "%");
          card.dataset.pointerActive = "true";
        };
        const onLeave = () => {
          delete card.dataset.pointerActive;
          card.style.removeProperty("--aj-pillar-x");
          card.style.removeProperty("--aj-pillar-y");
        };
        card.addEventListener("pointermove", onMove, { passive: true });
        card.addEventListener("pointerleave", onLeave, { passive: true });
        cleanupHandlers.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
          onLeave();
        });
      }

      const buttons = Array.from(document.querySelectorAll<HTMLElement>(".aj-button-primary"));
      for (const button of buttons) {
        const onMove = (event: PointerEvent) => {
          const rect = button.getBoundingClientRect();
          const x = Math.max(-6, Math.min(6, (event.clientX - rect.left - rect.width / 2) * 0.12));
          const y = Math.max(-6, Math.min(6, (event.clientY - rect.top - rect.height / 2) * 0.12));
          button.style.translate = x.toFixed(2) + "px " + y.toFixed(2) + "px";
        };
        const onLeave = () => { button.style.translate = "0px 0px"; };
        button.addEventListener("pointermove", onMove, { passive: true });
        button.addEventListener("pointerleave", onLeave, { passive: true });
        cleanupHandlers.push(() => {
          button.removeEventListener("pointermove", onMove);
          button.removeEventListener("pointerleave", onLeave);
          button.style.translate = "";
        });
      }

      const videoCards = Array.from(document.querySelectorAll<HTMLElement>(".aj-video-card"));
      for (const card of videoCards) {
        const onMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width - 0.5;
          const ny = (event.clientY - rect.top) / rect.height - 0.5;
          const rotateX = Math.max(-3.5, Math.min(3.5, -ny * 7));
          const rotateY = Math.max(-3.5, Math.min(3.5, nx * 7));
          card.style.transform = "perspective(900px) rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg)";
        };
        const onLeave = () => { card.style.transform = ""; };
        card.addEventListener("pointermove", onMove, { passive: true });
        card.addEventListener("pointerleave", onLeave, { passive: true });
        cleanupHandlers.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
          card.style.transform = "";
        });
      }

      const heroVisuals = Array.from(document.querySelectorAll<HTMLElement>(".aj-hero-visual"));
      for (const visual of heroVisuals) {
        const photo = visual.querySelector<HTMLElement>(".aj-photo-frame");
        const leftNote = visual.querySelector<HTMLElement>(".aj-note-left");
        const rightNote = visual.querySelector<HTMLElement>(".aj-note-right");
        const onMove = (event: PointerEvent) => {
          const rect = visual.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          if (photo) photo.style.translate = (x * 7).toFixed(2) + "px " + (y * 7).toFixed(2) + "px";
          if (leftNote) leftNote.style.translate = (x * -9).toFixed(2) + "px " + (y * -7).toFixed(2) + "px";
          if (rightNote) rightNote.style.translate = (x * 10).toFixed(2) + "px " + (y * 8).toFixed(2) + "px";
        };
        const onLeave = () => {
          if (photo) photo.style.translate = "";
          if (leftNote) leftNote.style.translate = "";
          if (rightNote) rightNote.style.translate = "";
        };
        visual.addEventListener("pointermove", onMove, { passive: true });
        visual.addEventListener("pointerleave", onLeave, { passive: true });
        cleanupHandlers.push(() => {
          visual.removeEventListener("pointermove", onMove);
          visual.removeEventListener("pointerleave", onLeave);
          onLeave();
        });
      }
    }

    return () => {
      observer?.disconnect();
      document.documentElement.classList.remove("aj-motion-enabled");
      for (const node of revealNodes) {
        node.removeAttribute("data-reveal");
        node.removeAttribute("data-revealed");
        node.style.removeProperty("--aj-reveal-delay");
      }
      cleanupHandlers.forEach((cleanup) => cleanup());
    };
  }, [pathname]);

  return <>{children}</>;
}
