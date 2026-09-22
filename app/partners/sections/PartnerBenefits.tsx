"use client";

import shared from "../../components/summit/SummitShared.module.css";
import { useLanguage } from "../../i18n";
import styles from "./PartnerBenefits.module.css";

export function PartnerBenefits() {
  const { t } = useLanguage();
  const benefits = [
    [t("Tap into a High-Potential Market", "Tiếp cận thị trường giàu tiềm năng"), t("Connect directly with a curated audience of expats, foreign professionals, and international visitors actively seeking trusted local services.", "Kết nối trực tiếp với cộng đồng người nước ngoài, chuyên gia quốc tế và du khách đang chủ động tìm kiếm các dịch vụ địa phương đáng tin cậy.")],
    [t("Cross-Client Referral Network", "Mạng lưới giới thiệu khách hàng chéo"), t("Collaborate with complementary service providers to exchange leads, drive cross-sales, and offer all-in-one solutions.", "Hợp tác với các nhà cung cấp dịch vụ bổ trợ để trao đổi khách hàng tiềm năng, thúc đẩy bán chéo và cung cấp giải pháp toàn diện.")],
    [t("Exclusive Partner Dinner", "Tiệc tối độc quyền dành cho đối tác"), t("Join an intimate VIP dinner prior to the summit to launch the alliance, network with executive peers, and align on joint strategies.", "Tham gia tiệc tối VIP thân mật trước hội nghị để ra mắt liên minh, kết nối với các lãnh đạo và thống nhất chiến lược chung.")],
  ];

  return (
    <section className={`${styles.benefits} wrap`} id="partner-benefits">
      <div className={`${shared.sectionHeading} ${styles.heading}`}>
        <p className={shared.kicker}>{t("Why you should join us", "Vì sao bạn nên đồng hành")}</p>
        <h2>{t("Grow Your Business with ", "Phát triển doanh nghiệp cùng ")}<em>{t("TUBUDD alliance.", "liên minh TUBUDD.")}</em></h2>
      </div>
      <div className={styles.grid}>
        {benefits.map(([title, text]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
