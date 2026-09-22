"use client";

import { useLanguage } from "../../i18n";
import { attendeeRegistrationAnchor } from "../links";
import shared from "../../components/summit/SummitShared.module.css";
import styles from "./RelocateHero.module.css";

export function RelocateHero() {
  const { t } = useLanguage();

  return (
    <section className={`${styles.hero} wrap`}>
      <div className={styles.copy}>
        <h1><span className={styles.titleLine}>Vietnam Living</span><br /><em>Summit 2026.</em></h1>
        <p className={styles.lede}>{t("The ecosystem for living, working, and growing in Vietnam.", "Hệ sinh thái dành cho cuộc sống, công việc và phát triển tại Việt Nam.")}</p>
        <div className={styles.actions}>
          <a className={`${shared.button} ${styles.primaryButton}`} href={attendeeRegistrationAnchor}>{t("Register free", "Đăng ký miễn phí")} <span>↓</span></a>
          <a className={shared.textLink} href="#event-overview">{t("Explore the event", "Khám phá sự kiện")} <span>↓</span></a>
        </div>
        <dl className={styles.quickFacts}>
          <div><dt>{t("Service sectors", "Lĩnh vực dịch vụ")}</dt><dd>14</dd></div>
          <div><dt>{t("Clients supported", "Khách hàng được hỗ trợ")}</dt><dd>50,000+</dd></div>
          <div><dt>{t("Trusted partners", "Đối tác đáng tin cậy")}</dt><dd>200+</dd></div>
        </dl>
      </div>
    </section>
  );
}
