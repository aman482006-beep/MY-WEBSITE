"use client";

import { useEffect } from "react";

const WEBSITE_HOSTS = new Set(["amanmalu.me", "www.amanmalu.me");

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

function shouldSkipNewTab(href: string, anchor: HTMLAnchorElement): boolean {
  return (
    !href ||
    href.startsWith("#") ||
    href.toLowerCase().startsWith("mailto:") ||
    href.toLowerCase().startsWith("tel:") ||
    href.toLowerCase().startsWith("javascript:") ||
    anchor.hasAttribute("download")
  );
}

function makeLinkOpenInNewTab(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href")?.trim();

  // Keep in-page jumps and device/app actions in their natural context.
  if (shouldSkipNewTab(href ?? "", anchor)) return;

  if (isInternalWebsiteLink(href!)) {
    anchor.removeAttribute("target");

    // Remove tab-opening security tokens when the destination is internal.
    const rel = new Set((anchor.getAttribute("rel") ?? "").split(/\\s+/).filter(Boolean));
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

  const rel = new Set((anchor.getAttribute("rel") ?? "").split(/\\s+/).filter(Boolean));
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

function handleExternalLinkClick(event: MouseEvent) {
  // Preserve normal browser behaviour for modified clicks and non-primary buttons.
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const eventTarget = event.target;
  const anchor = eventTarget instanceof Element
    ? eventTarget.closest<HTMLAnchorElement>("a[href]")
    : null;

  if (!anchor) return;

  const href = anchor.getAttribute("href")?.trim() ?? "";
  if (shouldSkipNewTab(href, anchor) || isInternalWebsiteLink(href)) return;

  // Explicitly open external destinations in a fresh tab before any client-side
  // navigation or smooth-scroll handler can turn the click into same-tab routing.
  event.preventDefault();
  event.stopImmediatePropagation();
  window.open(anchor.href, "_blank", "noopener,noreferrer");
}

export function NewTabLinks() {
  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach(makeLinkOpenInNewTab);

    // Capture external-link clicks so client-side navigation handlers cannot
    // override the requested new-tab behaviour.
    document.addEventListener("click", handleExternalLinkClick, true);

    // Also handle anchors rendered later and links whose href is populated or
    // changed after the element has mounted.
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.target instanceof HTMLAnchorElement) {
          makeLinkOpenInNewTab(mutation.target);
          return;
        }
        mutation.addedNodes.forEach(updateLinksWithin);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href"],
    });

    return () => {
      document.removeEventListener("click", handleExternalLinkClick, true);
      observer.disconnect();
    };
  }, []);

  return null;
}
