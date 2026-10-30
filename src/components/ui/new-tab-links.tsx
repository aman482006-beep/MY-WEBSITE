"use client";

import { useEffect } from "react";

const WEBSITE_HOSTS = new Set(["amanmalu.me", "www.amanmalu.me"]);

function isInternalWebsiteLink(href: string): boolean {
  try {
    const destination = new URL(href, window.location.href);

    // Relative links and same-origin links stay in the current tab.
    if (destination.origin === window.location.origin) return true;

    // Treat the custom domain as this same site, including when browsing
    // the GitHub Pages preview rather than the custom domain.
    if (WEBSITE_HOSTS.has(destination.hostname)) return true;

    // GitHub Pages preview URL for this portfolio.
    if (
      destination.hostname === "aman482006-beep.github.io" &&
      destination.pathname.startsWith("/MY-WEBSITE")
    ) {
      return true;
    }

    return false;
  } catch {
    // Unknown or malformed destinations should not be forced into a new tab.
    return true;
  }
}

function makeLinkOpenInNewTab(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href")?.trim();

  // Keep in-page jumps and device/app actions in their natural context.
  if (
    !href ||
    href.startsWith("#") ||
    href.toLowerCase().startsWith("mailto:") ||
    href.toLowerCase().startsWith("tel:") ||
    href.toLowerCase().startsWith("javascript:")
  ) {
    return;
  }

  if (isInternalWebsiteLink(href)) {
    anchor.removeAttribute("target");

    // Remove tab-opening security tokens when the destination is internal.
    const rel = new Set((anchor.getAttribute("rel") ?? "").split(/\s+/).filter(Boolean));
    rel.delete("noopener");
    rel.delete("noreferrer");
    if (rel.size > 0) {
      anchor.setAttribute("rel", Array.from(rel).join(" "));
    } else {
      anchor.removeAttribute("rel");
    }
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
