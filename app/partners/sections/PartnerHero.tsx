"use client";

import { useLanguage } from "../../i18n";
import shared from "../../components/summit/SummitShared.module.css";
import styles from "./PartnerHero.module.css";

export function PartnerHero() {
  const { t } = useLanguage();

  return (
    <section className={`${styles.hero} wrap`}>
      <div className={styles.copy}>
        <h1><span className={styles.titleLine}>Vietnam Living</span><br /><em>Summit 2026.</em></h1>
        <p className={styles.lede}>{t("Meet newcomers, build relationships with businesses and potential clients and help create a community Vietnam can be proud of.", "Gặp gỡ người mới đến, xây dựng quan hệ với doanh nghiệp và khách hàng tiềm năng, đồng thời góp phần tạo nên một cộng đồng đáng tự hào tại Việt Nam.")}</p>
        <div className={styles.actions}>
          <a className={shared.button} href="#event-signup">{t("Apply to partner", "Đăng ký đối tác")} <span>↓</span></a>
          <a className={shared.textLink} href="#partner-benefits">{t("See the opportunity", "Khám phá cơ hội")} <span>↓</span></a>
        </div>
        <dl className={styles.quickFacts}>
          <div><dt>{t("High-intent clients", "Khách hàng có nhu cầu cao")}</dt><dd>100+</dd></div>
          <div><dt>{t("Service sectors", "Lĩnh vực dịch vụ")}</dt><dd>14</dd></div>
          <div><dt>{t("Trusted partners", "Đối tác đáng tin cậy")}</dt><dd>200+</dd></div>
        </dl>
      </div>
    </section>
  );
}
