"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function Brand({ pageTitle = false }: { pageTitle?: boolean }) {
  return (
    <Link href="/" className="brand">
      <span className="brand-dot" />
      {pageTitle ? <span className="brand-wordmark">Vietnam Living Summit</span> : <>annie<span className="brand-suffix">/ vn</span></>}
    </Link>
  );
}

export function Header({ active }: { active?: "relocate" | "partners" }) {
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateHeader = () => {
      frame = 0;
      const currentScrollY = Math.max(0, window.scrollY);
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (isMenuOpen || currentScrollY <= 16) {
        setIsHidden(false);
      } else if (Math.abs(scrollDelta) >= 6) {
        setIsHidden(scrollDelta > 0 && currentScrollY > 80);
        lastScrollY.current = currentScrollY;
      }
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeader);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientY <= 18) setIsHidden(false);
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setIsHidden(false);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    };

    const handleResize = () => {
      if (window.innerWidth > 800) setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`site-header${isHidden ? " site-header-hidden" : ""}`}
      onFocusCapture={() => setIsHidden(false)}
    >
      <div className="site-header-inner wrap">
        <Brand pageTitle />
        <nav aria-label="Main navigation" className="desktop-nav">
          <Link className={active === "relocate" ? "active" : ""} href="/relocate">For people</Link>
          <Link className={active === "partners" ? "active" : ""} href="/partners">For businesses</Link>
        </nav>
        <a href="mailto:hello@meetannie.co" className="header-contact">Contact <span>↗</span></a>
        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className={`menu-toggle${isMenuOpen ? " menu-toggle-open" : ""}`}
          onClick={() => setIsMenuOpen((current) => !current)}
          ref={menuButtonRef}
          type="button"
        >
          <span /><span /><span />
        </button>
      </div>

      {isMenuOpen ? (
        <>
          <button aria-hidden="true" className="mobile-backdrop" onClick={() => setIsMenuOpen(false)} tabIndex={-1} type="button" />
          <nav aria-label="Mobile navigation" className="mobile-nav" id="mobile-navigation">
            <Link href="/relocate" onClick={() => setIsMenuOpen(false)}>For people<span className="mobile-nav-arrow">→</span></Link>
            <Link href="/partners" onClick={() => setIsMenuOpen(false)}>For businesses<span className="mobile-nav-arrow">→</span></Link>
            <a href="mailto:hello@meetannie.co" onClick={() => setIsMenuOpen(false)}>Contact<span className="mobile-nav-arrow">↗</span></a>
          </nav>
        </>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <Brand />
        <p>Helping people arrive well<br />and build a life in Vietnam.</p>
        <div><Link href="/relocate">Moving to Vietnam</Link><Link href="/partners">Partner with us</Link></div>
        <div className="footer-end"><a href="mailto:hello@meetannie.co">hello@meetannie.co</a><small>© 2026 Annie</small></div>
      </div>
    </footer>
  );
}
