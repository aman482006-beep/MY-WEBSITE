"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Creator", href: "/creator" },
  { label: "Recruiters", href: "/recruiters" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuState, setMenuState] = useState({ open: false, pathname: "/" });
  const mobileMenuOpen = menuState.open && menuState.pathname === pathname;
  const closeMenu = useCallback(() => setMenuState((current) => ({ ...current, open: false })), []);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


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

        <div ref={menuRef} className={"aj-nav-links" + (mobileMenuOpen ? " is-open" : "")} id="primary-navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return <Link key={link.href} href={link.href} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined} onClick={closeMenu}>{link.label}</Link>;
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
