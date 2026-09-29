"use client";

import shared from "../../components/summit/SummitShared.module.css";
import { useLanguage } from "../../i18n";
import styles from "./PartnerBenefits.module.css";

export function PartnerBenefits() {
  const { language, t } = useLanguage();
  const benefits = [
    [t("Tap into a High-Potential Market", "Tiếp cận thị trường giàu tiềm năng"), t("Connect directly with a curated audience of expats, foreign professionals, and international visitors actively seeking trusted local services.", "Kết nối trực tiếp với cộng đồng người nước ngoài, chuyên gia quốc tế và du khách đang chủ động tìm kiếm các dịch vụ địa phương đáng tin cậy.")],
    [t("Cross-Client Referral Network", "Mạng lưới giới thiệu khách hàng chéo"), t("Collaborate with complementary service providers to exchange leads, drive cross-sales, and offer all-in-one solutions.", "Hợp tác với các nhà cung cấp dịch vụ bổ trợ để trao đổi khách hàng tiềm năng, giới thiệu chéo lâu dài và cung cấp giải pháp toàn diện.")],
    [t("Exclusive Partner Dinner", "Dinner Party dành cho đối tác liên minh"), t("Join an intimate VIP dinner prior to the summit to launch the alliance, network with executive peers, and align on joint strategies.", "Tham gia Dinner Party thân mật trước event để ra mắt liên minh, kết nối với các lãnh đạo và thống nhất chiến lược chung.")],
    [t("Meet Leads Face-to-Face – 1:1 Consultations", "Gặp gỡ khách hàng tiềm năng trực tiếp – Tư vấn 1:1"), t("Connect directly with high-quality leads through a dedicated 1-on-1 consultation room at the event.", "Kết nối trực tiếp với khách hàng tiềm năng chất lượng cao thông qua phòng tư vấn 1:1 riêng tại sự kiện.")],
  ];

  return (
    <section className={`${styles.benefits} wrap`} id="partner-benefits">
      <div className={`${shared.sectionHeading} ${styles.heading}`}>
        <p className={shared.kicker}>{t("Why you should join us", "Vì sao bạn nên đồng hành")}</p>
        <h2>{t("Grow Your Business with ", "Phát triển doanh nghiệp cùng ")}<em>{t("TUBUDD alliance.", "liên minh TUBUDD.")}</em></h2>
      </div>
      <div className={styles.grid}>
        {benefits.map(([title, text], index) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{language === "vi" && index === 0
              ? <>Kết nối trực tiếp với nhóm <strong>200 người nước ngoài, chuyên gia nước ngoài và khách quốc tế</strong> đang chủ động tìm kiếm các dịch vụ địa phương đáng tin cậy.</>
              : language === "en" && index === 0
                ? <>Connect directly with a curated audience of <strong>200 expats, foreign professionals, and international visitors</strong> actively seeking trusted local services.</>
                : language === "vi" && index === 1
                  ? <>Hợp tác với các nhà cung cấp dịch vụ bổ trợ để trao đổi khách hàng tiềm năng, <strong>giới thiệu chéo lâu dài</strong> và cung cấp giải pháp toàn diện.</>
                  : language === "en" && index === 1
                    ? <>Collaborate with complementary service providers to <strong>exchange leads</strong>, drive cross-sales, and offer all-in-one solutions.</>
                  : language === "vi" && index === 2
                    ? <>Tham gia <strong>Dinner Party</strong> thân mật trước event để ra mắt liên minh, kết nối với các lãnh đạo và thống nhất chiến lược chung.</>
                    : language === "en" && index === 2
                      ? <>Join an <strong>intimate VIP dinner</strong> prior to the summit to launch the alliance, network with executive peers, and align on joint strategies.</>
                    : language === "vi" && index === 3
                      ? <>Kết nối trực tiếp với khách hàng tiềm năng chất lượng cao thông qua <strong>phòng tư vấn 1:1</strong> riêng tại sự kiện.</>
                      : language === "en" && index === 3
                        ? <>Connect directly with <strong>high-quality leads</strong> through a dedicated <strong>1-on-1 consultation</strong> room at the event.</>
                      : text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
