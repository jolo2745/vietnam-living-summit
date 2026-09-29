"use client";

import Image from "next/image";
import { useLanguage } from "../../i18n";
import shared from "../../components/summit/SummitShared.module.css";

export function PartnerHero() {
  const { t } = useLanguage();

  return (
    <section className={`${shared.showcaseHero} ${shared.showcaseHeroPartner} wrap`}>
      <div className={shared.showcaseInner}>
        <Image
          className={shared.showcaseLogo}
          src="/images/vietnam-living-summit-logo-trimmed.png"
          alt="Vietnam Living Summit 2026"
          width={1303}
          height={749}
          priority
        />
        <p className={shared.showcaseTagline}>{t("Partner with TUBUDD to build Vietnam's ecosystem for foreign residents.", "Cùng TUBUDD xây dựng hệ sinh thái cho người nước ngoài tại Việt Nam")}</p>
        <dl className={shared.showcaseDetails} aria-label={t("Event details", "Thông tin sự kiện")}>
          <div><dt>{t("Location", "Địa điểm")}</dt><dd>{t("Hanoi, Vietnam", "Hà Nội, Việt Nam")}</dd></div>
          <div><dt>{t("Time", "Thời gian")}</dt><dd>8AM – 12AM · 30/10/2026</dd></div>
        </dl>
        <div className={shared.showcaseActions}>
          <a className={shared.showcasePrimary} href="/#who-we-are">{t("Explore the event", "Khám phá sự kiện")} <span aria-hidden="true">↘</span></a>
          <a className={shared.showcaseSecondary} href="/partners/#who-we-are">{t("Become our partner", "Trở thành đối tác")} <span aria-hidden="true">↗</span></a>
        </div>
        <dl className={shared.showcaseFacts}>
          <div><dt>{t("High-intent clients", "Khách hàng từng sử dụng dịch vụ tại TUBUDD")}</dt><dd>50,000+</dd></div>
          <div><dt>{t("Social media reach", "Lượt tiếp cận trên mạng xã hội")}</dt><dd>9,000,000+</dd></div>
          <div><dt>{t("In-person event attendees", "Khách hàng tham dự trực tiếp event")}</dt><dd>200+</dd></div>
        </dl>
      </div>
    </section>
  );
}
