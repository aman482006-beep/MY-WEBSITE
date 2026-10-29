"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Fokus", href: "/work" },
  { label: "Creator", href: "/creator" },
  { label: "Recruiters", href: "/recruiters" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

type Highlight = { left: number; width: number; visible: boolean };

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuState, setMenuState] = useState({ open: false, pathname: "/" });
  const [highlight, setHighlight] = useState<Highlight>({ left: 0, width: 0, visible: false });
  const mobileMenuOpen = menuState.open && menuState.pathname === pathname;
  const closeMenu = useCallback(() => setMenuState((current) => ({ ...current, open: false })), []);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const currentHighlightRef = useRef<HTMLAnchorElement | null>(null);

  const findActiveLink = useCallback(() => {
    const links = Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>("[data-nav-href]") ?? []);
    return links.find((link) => {
      const href = link.dataset.navHref;
      return href === pathname || (href !== "/" && Boolean(href) && pathname.startsWith(href + "/"));
    }) ?? links[0] ?? null;
  }, [pathname]);

  const moveHighlight = useCallback((element: HTMLAnchorElement | null) => {
    const menu = menuRef.current;
    if (!menu || !element || !menu.contains(element)) {
      setHighlight((current) => ({ ...current, visible: false }));
      return;
    }

    const menuBounds = menu.getBoundingClientRect();
    const elementBounds = element.getBoundingClientRect();
    currentHighlightRef.current = element;
    setHighlight({
      left: elementBounds.left - menuBounds.left,
      width: elementBounds.width,
      visible: elementBounds.width > 0 && elementBounds.height > 0,
    });
  }, []);

  const restoreActiveHighlight = useCallback(() => {
    const focused = document.activeElement;
    const focusedLink = focused instanceof HTMLAnchorElement && menuRef.current?.contains(focused)
      ? focused
      : null;
    const active = focusedLink ?? findActiveLink();
    currentHighlightRef.current = active;
    moveHighlight(active);
  }, [findActiveLink, moveHighlight]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the sliding highlight aligned when the route, font metrics, or viewport changes.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const active = findActiveLink();
      currentHighlightRef.current = active;
      moveHighlight(active);
    });
    const onResize = () => {
      const target = currentHighlightRef.current ?? findActiveLink();
      moveHighlight(target);
    };
    window.addEventListener("resize", onResize, { passive: true });
    const menu = menuRef.current;
    const observer = menu && typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(onResize)
      : null;
    if (menu && observer) observer.observe(menu);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, [pathname, findActiveLink, moveHighlight]);

  useEffect(() => {
    document.body.classList.toggle("aj-menu-open", mobileMenuOpen);

    if (mobileMenuOpen) {
      wasOpenRef.current = true;
      menuRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus();

      const onPointerDown = (event: PointerEvent) => {
        if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
          closeMenu();
        }
      };

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          closeMenu();
          toggleRef.current?.focus();
          return;
        }

        if (event.key !== "Tab" || !menuRef.current) return;
        const items = Array.from(menuRef.current.querySelectorAll<HTMLAnchorElement>("a[href]"));
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && (active === first || !menuRef.current.contains(active))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (active === last || !menuRef.current.contains(active))) {
          event.preventDefault();
          first.focus();
        }
      };

      document.addEventListener("pointerdown", onPointerDown);
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("pointerdown", onPointerDown);
        document.removeEventListener("keydown", onKeyDown);
        document.body.classList.remove("aj-menu-open");
      };
    }

    document.body.classList.remove("aj-menu-open");
    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      toggleRef.current?.focus();
    }
    return () => document.body.classList.remove("aj-menu-open");
  }, [mobileMenuOpen, closeMenu]);

  return (
    <header ref={headerRef} className={"aj-site-header" + (scrolled ? " is-scrolled" : "")}>
      <nav className="aj-nav aj-container" aria-label="Main navigation">
        <Link href="/" className="aj-brand" aria-label="Aman Jain — Home" onClick={closeMenu}>
          <span className="aj-brand-monogram">AJ<span>.</span></span>
          <span className="aj-brand-name">AMAN JAIN</span>
        </Link>

        <div
          ref={menuRef}
          className={"aj-nav-links" + (mobileMenuOpen ? " is-open" : "")}
          id="primary-navigation"
          onMouseLeave={restoreActiveHighlight}
          onBlurCapture={(event) => {
            if (event.relatedTarget instanceof Node && menuRef.current?.contains(event.relatedTarget)) return;
            restoreActiveHighlight();
          }}
        >
          <span
            className="aj-nav-animated-highlight"
            aria-hidden="true"
            style={{
              width: highlight.width,
              transform: `translateX(${highlight.left}px)`,
              opacity: highlight.visible ? 1 : 0,
            }}
          />
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));
            return (
              <Link
                key={link.href}
                href={link.href}
                data-nav-href={link.href}
                className={active ? "is-active" : ""}
                aria-current={active ? "page" : undefined}
                onMouseEnter={(event) => moveHighlight(event.currentTarget)}
                onFocus={(event) => moveHighlight(event.currentTarget)}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/contact" className="aj-mobile-cta" onClick={closeMenu}>Let&apos;s connect <span aria-hidden="true">↗</span></Link>
        </div>

        <Link href="/contact" className="aj-nav-cta"><span /> Let&apos;s connect <b aria-hidden="true">›</b></Link>
        <button
          ref={toggleRef}
          className="aj-menu-toggle"
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuState({ open: !mobileMenuOpen, pathname })}
        >
          <span /><span />
        </button>
      </nav>
    </header>
  );
}
