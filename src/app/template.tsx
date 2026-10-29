"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

let resolvePendingViewTransition: (() => void) | null = null;

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => { finished: Promise<void> };
};

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const transitionDocument = document as ViewTransitionDocument;

    if (prefersReducedMotion || typeof transitionDocument.startViewTransition !== "function") {
      document.documentElement.classList.remove("aj-view-transitions");
      return;
    }

    document.documentElement.classList.add("aj-view-transitions");

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download") || link.getAttribute("rel")?.includes("external")) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(href)) return;

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return;

      event.preventDefault();
      transitionDocument.startViewTransition?.(() => new Promise<void>((resolve) => {
        resolvePendingViewTransition = resolve;
        router.push(destination.pathname + destination.search + destination.hash);
      }));
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.documentElement.classList.remove("aj-view-transitions");
    };
  }, [pathname, router]);

  // Resolve the browser's snapshot callback only after React has committed the new route.
  useEffect(() => {
    const resolve = resolvePendingViewTransition;
    if (!resolve) return;
    resolvePendingViewTransition = null;
    resolve();
  }, [pathname]);

  return <div className="aj-route-transition">{children}</div>;
}
