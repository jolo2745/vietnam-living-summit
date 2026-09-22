"use client";

import shared from "../../components/summit/SummitShared.module.css";
import { useLanguage } from "../../i18n";
import styles from "./EventOverview.module.css";

export function EventOverview() {
  const { t } = useLanguage();

  return (
    <section className={`${styles.overview} wrap`} id="event-overview">
      <div className={shared.sectionHeading}>
        <p className={shared.kicker}>{t("Event overview", "Tổng quan sự kiện")}</p>
        <h2>{t("Why Attend the Vietnam Living Summit", "Vì sao nên tham dự Vietnam Living Summit")}<em>?</em></h2>
      </div>
      <div className={styles.grid}>
        <article>
          <h3>{t("14 key service sectors under one roof", "14 lĩnh vực dịch vụ thiết yếu tại một nơi")}</h3>
          <p>{t("Access a fully verified network of top-tier local service providers in one place, saving you time, money, and stress.", "Tiếp cận mạng lưới nhà cung cấp dịch vụ địa phương hàng đầu đã được xác minh tại một nơi, giúp bạn tiết kiệm thời gian, chi phí và công sức.")}</p>
        </article>
        <article>
          <h3>{t("Direct 1-on-1 expert matchmaking", "Kết nối trực tiếp 1-1 với chuyên gia")}</h3>
          <p>{t("Book dedicated private sessions with top specialists across legal, real estate, banking, and education tailored to your specific needs.", "Đặt lịch tư vấn riêng với các chuyên gia hàng đầu về pháp lý, bất động sản, ngân hàng và giáo dục, phù hợp với nhu cầu cụ thể của bạn.")}</p>
        </article>
        <article className={styles.highlight}>
          <h3>{t("Free entry", "Vào cửa miễn phí")}</h3>
          <p>{t("Overcome local bureaucracy and complex procedures effortlessly with direct guidance from vetted, English-speaking experts.", "Xử lý các thủ tục địa phương phức tạp dễ dàng hơn với hướng dẫn trực tiếp từ những chuyên gia đã được xác minh và có thể giao tiếp bằng tiếng Anh.")}</p>
        </article>
      </div>
    </section>
  );
}
