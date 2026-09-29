"use client";

import shared from "../../components/summit/SummitShared.module.css";
import { useLanguage } from "../../i18n";
import styles from "./EventAgenda.module.css";

export function EventAgenda() {
  const { t } = useLanguage();
  const mainAgenda = [
    ["08:30–09:00", t("Check-in", "Đón khách")],
    ["09:00–09:10", t("Opening", "Khai mạc")],
    ["09:15–10:00", t("Showcase: Legal essentials — company formation, real estate and visas", "Giới thiệu: Các vấn đề pháp lý thiết yếu — thành lập công ty, bất động sản và thị thực")],
    ["10:00–11:00", t("Panel: Relocating to Vietnam and what you need to prepare for", "Tọa đàm: Chuyển đến Việt Nam và những điều bạn cần chuẩn bị")],
    ["11:00–11:20", t("Lucky draw and mini game", "Bốc thăm may mắn và trò chơi nhỏ")],
    ["11:30–12:00", t("Light refreshments, interviews and closing", "Tiệc nhẹ, phỏng vấn và bế mạc")],
  ];
  const parallelAgenda = [
    ["08:30–12:00", t("Booth exploration", "Khám phá gian hàng"), t("Meet service providers and explore the Alliance throughout the morning.", "Gặp gỡ các nhà cung cấp dịch vụ và tìm hiểu Liên minh trong suốt buổi sáng.")],
    ["10:00–12:00", t("1-to-1 consultation zone", "Khu tư vấn 1-1"), t("Speak privately with an expert about your situation.", "Trao đổi riêng với chuyên gia về tình huống của bạn.")],
  ];

  return (
    <section className={styles.section} id="agenda" aria-labelledby="agenda-title">
      <div className="wrap">
        <div className={`${shared.sectionHeading} ${styles.heading}`}>
          <p className={shared.kicker}>{t("Event agenda", "Lịch trình sự kiện")}</p>
          <h2 id="agenda-title">{t("One morning.", "Một buổi sáng.")}<br /><em>{t("Real next steps.", "Những bước đi thiết thực.")}</em></h2>
        </div>

        <div className={styles.layout}>
          <div className={styles.main}>
            <p className={styles.columnLabel}>{t("Main activities", "Hoạt động chính")}</p>
            <ol>
              {mainAgenda.map(([time, title], index) => (
                <li key={time}>
                  <time>{time}</time>
                  <span className={styles.marker} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                </li>
              ))}
            </ol>
          </div>

          <aside className={styles.parallel} aria-label={t("Activities running alongside the main agenda", "Các hoạt động diễn ra song song với chương trình chính")}>
            <p className={styles.columnLabel}>{t("Running alongside", "Diễn ra song song")}</p>
            {parallelAgenda.map(([time, title, description]) => (
              <article key={title}>
                <time>{time}</time>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
