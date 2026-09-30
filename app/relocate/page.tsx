"use client";

import { useEffect, useState } from "react";
import shared from "../components/summit/SummitShared.module.css";
import { useLanguage } from "../i18n";
import { BookletSignup } from "../components/summit/BookletSignup";
import { ConversionCta } from "../components/summit/ConversionCta";
import { EventSignup } from "../components/summit/EventSignup";
import { AttendeeSteps } from "../components/summit/AttendeeSteps";
import { WhoWeAre } from "../components/summit/WhoWeAre";
import { SponsorsSection } from "../components/summit/SponsorsSection";
import { Footer, Header } from "../ui";
import { EventOverview } from "./sections/EventOverview";
import { EventIntroduction } from "./sections/EventIntroduction";
import { EventAgenda } from "./sections/EventAgenda";
import { RelocateHero } from "./sections/RelocateHero";
import { Industries } from "../partners/sections/Industries";

export default function RelocatePage() {
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
    <main className={`${shared.page} ${shared.expatPage}`}>
      <Header active="relocate" />
      {showFloatingRegistration ? (
        <a className={shared.floatingFormJump} href="#event-signup" aria-label={t("Go to the event sign-up form", "Đi đến biểu mẫu đăng ký sự kiện")}>
          <span className={shared.floatingFormLabel}>{t("Register free now", "Tham gia miễn phí")}</span>
          <span className={shared.floatingFormArrow} aria-hidden="true">↓</span>
        </a>
      ) : null}
      <RelocateHero />
      <EventIntroduction />
      <WhoWeAre tone="people" />
      <EventOverview />
      <ConversionCta audience="attendees" />
      <Industries context="attendees" />
      <EventAgenda />
      <BookletSignup source="people" />
      <AttendeeSteps />
      <EventSignup source="people" />
      <SponsorsSection />
      <Footer />
    </main>
  );
}
