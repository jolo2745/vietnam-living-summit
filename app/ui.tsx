"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LanguageSwitch, useLanguage } from "./i18n";

export function Brand({ pageTitle = false }: { pageTitle?: boolean }) {
  return (
    <Link href="/relocate" className="brand">
      {pageTitle ? (
        <Image
          className="site-logo"
          src="/images/vietnam-living-summit-logo-trimmed.png"
          alt="Vietnam Living Summit 2026"
          width={1303}
          height={749}
          priority
        />
      ) : (
        <><span className="brand-dot" />annie<span className="brand-suffix">/ vn</span></>
      )}
    </Link>
  );
}

function HeaderPartnerLogos({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      aria-label="TUBUDD and Travellive"
      className={`header-partner-logos${mobile ? " header-partner-logos-mobile" : ""}`}
    >
      <Image
        className="header-partner-logo header-partner-logo-tubudd"
        src="/images/header/tubudd-white.png"
        alt="TUBUDD"
        width={1551}
        height={323}
      />
      <span aria-hidden="true" className="header-partner-divider" />
      <Image
        className="header-partner-logo header-partner-logo-travellive"
        src="/images/header/travellive.png"
        alt="Travellive"
        width={1459}
        height={581}
      />
    </div>
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
          <Link className={active === "relocate" ? "active" : ""} href="/relocate">{t("Moving to Vietnam", "Dành cho người tham dự")}</Link>
          <Link className={active === "partners" ? "active" : ""} href="/partners">{t("Become our partner", "Dành cho doanh nghiệp")}</Link>
        </nav>
        <div className="header-actions">
          <HeaderPartnerLogos />
          <a href="mailto:marketing@tubudd.com" className="header-contact">{t("Contact", "Liên hệ")} <span>↗</span></a>
          <LanguageSwitch />
        </div>
        <HeaderPartnerLogos mobile />
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
            <Link href="/relocate" onClick={() => setIsMenuOpen(false)}>{t("Moving to Vietnam", "Dành cho người tham dự")}<span className="mobile-nav-arrow">→</span></Link>
            <Link href="/partners" onClick={() => setIsMenuOpen(false)}>{t("Become our partner", "Dành cho doanh nghiệp")}<span className="mobile-nav-arrow">→</span></Link>
            <a href="mailto:marketing@tubudd.com" onClick={() => setIsMenuOpen(false)}>{t("Contact", "Liên hệ")}<span className="mobile-nav-arrow">↗</span></a>
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
        <div className="footer-about">
          <Brand pageTitle />
          <p className="footer-tagline">{t("Relocate. Invest. Build a life in Vietnam.", "Định cư. Đầu tư. Xây dựng cuộc sống tại Việt Nam.")}</p>
          <div className="footer-contact">
            <a href="tel:+84966743471">+84 966 7434 71</a>
            <a href="mailto:marketing@tubudd.com">marketing@tubudd.com</a>
            <a href="https://www.google.com/maps/search/?api=1&query=7%2C%20ng%C3%B5%203%20Li%E1%BB%85u%20Giai%2C%20H%C3%A0%20N%E1%BB%99i" target="_blank" rel="noreferrer">
              {t("No. 7, Alley 3 Lieu Giai, Hanoi", "Số 7, ngõ 3 Liễu Giai, Hà Nội")} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <nav className="footer-column" aria-label={t("Moving to Vietnam links", "Liên kết trang Chuyển đến Việt Nam")}>
          <Link className="footer-heading" href="/relocate">{t("Moving to Vietnam", "Chuyển đến Việt Nam")}</Link>
          <a href="/relocate/#event-overview">{t("Why you should attend?", "Vì sao bạn nên tham dự?")}</a>
          <a href="/relocate/#agenda">{t("Agenda", "Lịch trình")}</a>
          <a href="/relocate/#meet-the-alliance">{t("Consultant", "Chuyên gia")}</a>
          <a href="/relocate/#event-signup">{t("Register for free", "Đăng ký miễn phí")}</a>
        </nav>

        <nav className="footer-column" aria-label={t("Become a partner links", "Liên kết trang Trở thành đối tác")}>
          <Link className="footer-heading" href="/partners">{t("Become a Partner", "Trở thành đối tác")}</Link>
          <Link href="/partners#partner-benefits">{t("Grow Your Business with TUBUDD alliance", "Phát triển doanh nghiệp cùng liên minh TUBUDD")}</Link>
          <Link href="/partners#industries">{t("Which service do you serve?", "Bạn cung cấp dịch vụ trong lĩnh vực nào?")}</Link>
          <Link href="/partners#partnership-levels">{t("Choose your sponsorship package.", "Chọn gói tài trợ của bạn.")}</Link>
          <Link href="/partners#event-signup">{t("Register to become our partner", "Đăng ký trở thành đối tác")}</Link>
        </nav>

        <nav className="footer-column footer-social" aria-label={t("Social media and contact links", "Liên kết mạng xã hội và liên hệ")}>
          <span className="footer-heading">{t("Social media", "Mạng xã hội")}</span>
          <a href="https://www.tiktok.com/@relocatetovietnam?lang=vi-VN" target="_blank" rel="noreferrer">TikTok <span aria-hidden="true">↗</span></a>
          <a href="https://www.facebook.com/profile.php?id=61593119474921" target="_blank" rel="noreferrer">Facebook <span aria-hidden="true">↗</span></a>
          <a href="https://www.instagram.com/vietnam.living.summit/" target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a>
          <a href="tel:+84896684588">Hotline: +84 8966 84588</a>
        </nav>
      </div>
    </footer>
  );
}
