"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LanguageSwitch, useLanguage } from "./i18n";

export function Brand({ pageTitle = false }: { pageTitle?: boolean }) {
  return (
    <Link href="/" className="brand">
      {pageTitle ? (
        <Image
          className="site-logo"
          src="/images/vietnam-living-summit-logo.svg"
          alt="Vietnam Living Summit 2026"
          width={1200}
          height={680}
          priority
        />
      ) : (
        <><span className="brand-dot" />annie<span className="brand-suffix">/ vn</span></>
      )}
    </Link>
  );
}

export function Header({ active }: { active?: "relocate" | "partners" }) {
  const { t } = useLanguage();
  const [isHidden, setIsHidden] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateHeader = () => {
      frame = 0;
      const currentScrollY = Math.max(0, window.scrollY);
      const scrollDelta = currentScrollY - lastScrollY.current;
      setIsAtTop(currentScrollY <= 16);

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
    setIsAtTop(window.scrollY <= 16);
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
      if (window.innerWidth > 900) setIsMenuOpen(false);
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
      className={`site-header${isAtTop && !isMenuOpen ? " site-header-at-top" : ""}${isHidden ? " site-header-hidden" : ""}`}
      onFocusCapture={() => setIsHidden(false)}
    >
      <div className="site-header-inner wrap">
        <Brand pageTitle />
        <nav aria-label={t("Main navigation", "Điều hướng chính")} className="desktop-nav">
          <Link className={active === "relocate" ? "active" : ""} href="/relocate">{t("For people", "Dành cho cá nhân")}</Link>
          <Link className={active === "partners" ? "active" : ""} href="/partners">{t("For businesses", "Dành cho doanh nghiệp")}</Link>
        </nav>
        <div className="header-actions">
          <a href="mailto:hello@meetannie.co" className="header-contact">{t("Contact", "Liên hệ")} <span>↗</span></a>
          <LanguageSwitch />
        </div>
        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? t("Close navigation menu", "Đóng menu điều hướng") : t("Open navigation menu", "Mở menu điều hướng")}
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
          <nav aria-label={t("Mobile navigation", "Điều hướng di động")} className="mobile-nav" id="mobile-navigation">
            <Link href="/relocate" onClick={() => setIsMenuOpen(false)}>{t("For people", "Dành cho cá nhân")}<span className="mobile-nav-arrow">→</span></Link>
            <Link href="/partners" onClick={() => setIsMenuOpen(false)}>{t("For businesses", "Dành cho doanh nghiệp")}<span className="mobile-nav-arrow">→</span></Link>
            <a href="mailto:hello@meetannie.co" onClick={() => setIsMenuOpen(false)}>{t("Contact", "Liên hệ")}<span className="mobile-nav-arrow">↗</span></a>
            <LanguageSwitch mobile />
          </nav>
        </>
      ) : null}
    </header>
  );
}

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <Brand />
        <p>{t("Helping people arrive well", "Giúp mọi người khởi đầu thuận lợi")}<br />{t("and build a life in Vietnam.", "và xây dựng cuộc sống tại Việt Nam.")}</p>
        <div><Link href="/relocate">{t("Moving to Vietnam", "Chuyển đến Việt Nam")}</Link><Link href="/partners">{t("Partner with us", "Trở thành đối tác")}</Link></div>
        <div className="footer-end">
          <a href="mailto:hello@meetannie.co">hello@meetannie.co</a>
          <a href="https://www.instagram.com/vietnam.living.summit/" target="_blank" rel="noreferrer">Instagram <span>↗</span></a>
          <a href="https://www.facebook.com/profile.php?id=61593119474921" target="_blank" rel="noreferrer">Facebook <span>↗</span></a>
          <a href="https://www.tiktok.com/@relocatetovietnam?lang=vi-VN" target="_blank" rel="noreferrer">TikTok <span>↗</span></a>
          <small>© 2026 Annie</small>
        </div>
      </div>
    </footer>
  );
}
