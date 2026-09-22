"use client";

import { useEffect, useState } from "react";
import shared from "../components/summit/SummitShared.module.css";
import { useLanguage } from "../i18n";
import { BookletSignup } from "../components/summit/BookletSignup";
import { EventSignup } from "../components/summit/EventSignup";
import { WhoWeAre } from "../components/summit/WhoWeAre";
import { Footer, Header } from "../ui";
import { Industries } from "./sections/Industries";
import { PartnerBenefits } from "./sections/PartnerBenefits";
import { PartnerHero } from "./sections/PartnerHero";
import { PartnerLevels } from "./sections/PartnerLevels";

export default function PartnersPage() {
  const { t } = useLanguage();
  const [showFloatingRegistration, setShowFloatingRegistration] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateVisibility = () => {
      frame = 0;
      setShowFloatingRegistration(window.scrollY > window.innerHeight * 0.6);
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <main className={`${shared.page} ${shared.partnerPage}`}>
      <Header active="partners" />
      {showFloatingRegistration ? (
        <a className={shared.floatingFormJump} href="#event-signup" aria-label={t("Go to the business partnership form", "Đi đến biểu mẫu hợp tác doanh nghiệp")}>
          <span className={shared.floatingFormLabel}>{t("Apply to partner", "Đăng ký đối tác")}</span>
          <span className={shared.floatingFormArrow} aria-hidden="true">↓</span>
        </a>
      ) : null}
      <PartnerHero />
      <WhoWeAre tone="business" />
      <PartnerBenefits />
      <Industries />
      <PartnerLevels />
      <BookletSignup source="business" />
      <EventSignup source="business" />
      <Footer />
    </main>
  );
}
