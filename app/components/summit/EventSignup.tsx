"use client";

import { useLanguage } from "../../i18n";
import { NativeRegistrationForm } from "./NativeRegistrationForm";
import styles from "./EventSignup.module.css";

type EventSignupProps = {
  source: "people" | "business";
};

export function EventSignup({ source }: EventSignupProps) {
  const { t } = useLanguage();
  const isBusiness = source === "business";

  return (
    <section className={styles.section} id="event-signup" aria-labelledby={`event-signup-title-${source}`}>
      <div className={`${styles.layout} wrap`}>
        <div className={styles.copy}>
          <p className={styles.kicker}>{isBusiness ? t("Partner sign-up", "Đăng ký đối tác") : t("Event sign-up", "Đăng ký sự kiện")}</p>
          <h2 id={`event-signup-title-${source}`}>
            {isBusiness ? t("Partner with Vietnam Living", "Đồng hành cùng Vietnam Living") : t("Join Vietnam Living", "Tham gia Vietnam Living")}<br />
            <em>Summit 2026.</em>
          </h2>
          <p>
            {isBusiness
              ? t("Complete the form here to register your interest in partnering with the event.", "Hoàn thành biểu mẫu tại đây để đăng ký quan tâm trở thành đối tác của sự kiện.")
              : t("Complete the form here to register your interest in the event.", "Hoàn thành biểu mẫu tại đây để đăng ký quan tâm đến sự kiện.")}
          </p>
          <dl>
            <div><dt>{t("Where", "Địa điểm")}</dt><dd>{t("Hanoi, Vietnam", "Hà Nội, Việt Nam")}</dd></div>
            <div><dt>{t("Time", "Thời gian")}</dt><dd>8:30 AM–12:00 PM, 30/10/2026</dd></div>
            <div>
              <dt>{isBusiness ? t("Format", "Hình thức") : t("Entry", "Vé vào cửa")}</dt>
              <dd>{isBusiness ? t("Summit + partner gathering", "Tham gia Liên minh và Event \"VLS 2026\"") : t("Free for attendees", "Miễn phí cho người tham dự")}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.embed}><NativeRegistrationForm source={source} /></div>
      </div>
    </section>
  );
}
