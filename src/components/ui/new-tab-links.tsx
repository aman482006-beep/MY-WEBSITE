"use client";

import { useEffect } from "react";

function makeLinkOpenInNewTab(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href")?.trim().toLowerCase();

  // Keep in-page jumps and device/app actions in their natural context.
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:")
  ) {
    return;
  }

  anchor.setAttribute("target", "_blank");

  const rel = new Set((anchor.getAttribute("rel") ?? "").split(/\s+/).filter(Boolean));
  rel.add("noopener");
  rel.add("noreferrer");
  anchor.setAttribute("rel", Array.from(rel).join(" "));
}

function updateLinksWithin(node: Node) {
  if (node instanceof HTMLAnchorElement) {
    makeLinkOpenInNewTab(node);
  }

  if (node instanceof Element) {
    node.querySelectorAll<HTMLAnchorElement>("a[href]").forEach(makeLinkOpenInNewTab);
  }
}

export function NewTabLinks() {
  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach(makeLinkOpenInNewTab);

    // Also handle links rendered later by client components or dynamic content.
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(updateLinksWithin);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
