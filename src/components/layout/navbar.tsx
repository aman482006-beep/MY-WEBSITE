"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Creator", href: "/creator" },
  { label: "Recruiters", href: "/recruiters" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [highlight, setHighlight] = useState({ left: 0, width: 0, visible: false });
  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  const moveHighlight = useCallback((target: HTMLAnchorElement | null) => {
    const menu = menuRef.current;
    if (!menu || !target || target.getBoundingClientRect().width === 0) {
      setHighlight((current) => ({ ...current, visible: false }));
      return;
    }

    const menuRect = menu.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    setHighlight({
      left: targetRect.left - menuRect.left,
      width: targetRect.width,
      visible: true,
    });
  }, []);

  const restoreActiveHighlight = useCallback(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const links = Array.from(menu.querySelectorAll<HTMLAnchorElement>("a[data-nav-href]"));
    const active = links.find((link) => {
      const href = link.dataset.navHref;
      return href === pathname || (href !== "/" && Boolean(href) && pathname.startsWith(href + "/"));
    }) ?? links[0] ?? null;

    moveHighlight(active);
  }, [pathname, moveHighlight]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(restoreActiveHighlight);
    const onResize = () => restoreActiveHighlight();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [restoreActiveHighlight]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Route links close the menu in their click handlers. Also close it when
  // browser Back/Forward changes history while the menu is open.
  useEffect(() => {
    const onPopState = () => closeMenu();
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [closeMenu]);

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
            window.requestAnimationFrame(restoreActiveHighlight);
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
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </nav>
    </header>
  );
}
