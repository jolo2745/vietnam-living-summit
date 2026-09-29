"use client";

import { useLanguage } from "../../i18n";
import styles from "./ConversionCta.module.css";

type ConversionCtaProps = {
  audience: "attendees" | "business";
};

export function ConversionCta({ audience }: ConversionCtaProps) {
  const { t } = useLanguage();
  const isBusiness = audience === "business";

  const content = isBusiness
    ? {
        title: t("Your next customer is in this room.", "Khách hàng tiếp theo của bạn đang ở trong sự kiện lần này."),
        description: t(
          "Get direct access to 200+ investors, business owners, and relocating professionals actively looking for your services.",
          "Tiếp cận trực tiếp hơn 200 nhà đầu tư, chủ doanh nghiệp và chuyên gia đang chuyển đến Việt Nam, những người đang chủ động tìm kiếm dịch vụ của bạn.",
        ),
        primary: t("Become a partner", "Trở thành đối tác"),
        secondary: t("View sponsorship packages", "Xem các gói tài trợ"),
        secondaryHref: "#partnership-levels",
        tagline: t(
          "Partner with TUBUDD to build Vietnam's ecosystem for foreign residents.",
          "Đồng hành cùng TUBUDD xây dựng hệ sinh thái cho người nước ngoài tại Việt Nam.",
        ),
      }
    : {
        title: t("Your next chapter in Vietnam starts here.", "Chương tiếp theo của bạn tại Việt Nam bắt đầu từ đây."),
        description: t(
          "Meet legal, real estate, and visa experts, connect with fellow expats, and get every question about relocating answered — in one day.",
          "Gặp gỡ các chuyên gia pháp lý, bất động sản và visa, kết nối với cộng đồng người nước ngoài, đồng thời giải đáp mọi câu hỏi về định cư — chỉ trong một ngày.",
        ),
        primary: t("Register free now", "Đăng ký ngay"),
        secondary: t("View agenda", "Xem lịch trình"),
        secondaryHref: "#agenda",
        tagline: t(
          "Relocate. Invest. Build a life in Vietnam.",
          "Định cư. Làm việc. Đầu tư tại Việt Nam.",
        ),
      };

  return (
    <section className={styles.section} aria-labelledby={`conversion-cta-${audience}`}>
      <div className={styles.inner}>
        <h2 id={`conversion-cta-${audience}`}>{content.title}</h2>
        <p className={styles.description}>{content.description}</p>
        <div className={styles.actions}>
          <a className={styles.primary} href="#event-signup">{content.primary}<span aria-hidden="true">↓</span></a>
          <a className={styles.secondary} href={content.secondaryHref}>{content.secondary}<span aria-hidden="true">↘</span></a>
        </div>
        <p className={styles.tagline}>{content.tagline}</p>
      </div>
    </section>
  );
}
