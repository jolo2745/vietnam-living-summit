"use client";

import Image from "next/image";
import { useLanguage } from "../../i18n";
import shared from "../../components/summit/SummitShared.module.css";

export function RelocateHero() {
  const { t } = useLanguage();

  return (
    <section className={`${shared.showcaseHero} ${shared.showcaseHeroRelocate} wrap`}>
      <div className={shared.showcaseInner}>
        <Image
          className={shared.showcaseLogo}
          src="/images/vietnam-living-summit-logo-trimmed.png"
          alt="Vietnam Living Summit 2026"
          width={1303}
          height={749}
          priority
        />
        <p className={shared.showcaseTagline}>{t("Relocate. Invest. Build a life in Vietnam.", "Hệ sinh thái dành cho người nước ngoài định cư, làm việc và đầu tư tại Việt Nam.")}</p>
        <dl className={shared.showcaseDetails} aria-label={t("Event details", "Thông tin sự kiện")}>
          <div><dt>{t("Location", "Địa điểm")}</dt><dd>{t("Hanoi, Vietnam", "Hà Nội, Việt Nam")}</dd></div>
          <div><dt>{t("Time", "Thời gian")}</dt><dd>8:30 AM–12:00 PM · 30/10/2026</dd></div>
        </dl>
        <div className={shared.showcaseActions}>
          <a className={shared.showcasePrimary} href="#event-signup">{t("Register for free", "Đăng ký miễn phí")} <span aria-hidden="true">↘</span></a>
          <a className={shared.showcaseSecondary} href="/partners/">{t("Become our partner", "Trở thành đối tác")} <span aria-hidden="true">↗</span></a>
        </div>
        <dl className={shared.showcaseFacts}>
          <div><dt>{t("Service sectors", "Lĩnh vực dịch vụ")}</dt><dd>12</dd></div>
          <div><dt>{t("Clients supported", "Khách hàng được hỗ trợ")}</dt><dd>50,000+</dd></div>
          <div><dt>{t("Trusted partners", "Đối tác đáng tin cậy")}</dt><dd>200+</dd></div>
        </dl>
      </div>
    </section>
  );
}
