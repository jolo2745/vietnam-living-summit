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
  const attendeeSteps = [
    {
      title: t("Register online", "Đăng ký trực tuyến"),
      description: t("Fill in the form on this page with your name and contact details.", "Điền biểu mẫu ngay trên trang này với họ tên và thông tin liên hệ của bạn."),
    },
    {
      title: t("Get confirmation", "Nhận xác nhận"),
      description: t("We'll email you with the next steps and event details.", "Chúng tôi sẽ gửi email về các bước tiếp theo và thông tin sự kiện."),
    },
    {
      title: t("Mark your calendar", "Đánh dấu lịch"),
      description: t("Join us on October 30, 2026, in Hanoi. Check-in opens at 8:15 AM.", "Tham gia cùng chúng tôi vào ngày 30/10/2026 tại Hà Nội. Quầy check-in mở cửa lúc 8:15."),
    },
    {
      title: t("Check in on-site", "Check-in tại sự kiện"),
      description: t("Arrive between 8:15–8:45 AM, check in with your confirmation, and pick up your event badge.", "Đến trong khoảng 8:15–8:45, check-in bằng thông tin xác nhận và nhận thẻ tham dự sự kiện."),
    },
    {
      title: t("Explore and connect", "Khám phá và kết nối"),
      description: t("Browse partner booths, book 1-on-1 consultations, and join the speaker showcase and panel sessions throughout the day.", "Khám phá các gian hàng đối tác, đặt lịch tư vấn 1:1 và tham gia phần giới thiệu của diễn giả cùng các phiên thảo luận trong suốt sự kiện."),
    },
  ];

  return (
    <section className={styles.section} id="event-signup" aria-labelledby={`event-signup-title-${source}`}>
      <div className={`${styles.layout} ${!isBusiness ? styles.attendeeLayout : ""} wrap`}>
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

        {!isBusiness ? (
          <div className={styles.steps}>
            <h3>{t("Steps to join Vietnam Living Summit 2026", "Các bước tham gia Vietnam Living Summit 2026")}</h3>
            <ol>
              {attendeeSteps.map((step, index) => (
                <li key={step.title}>
                  <span className={styles.stepNumber} aria-hidden="true">{index + 1}</span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        <div className={styles.embed}><NativeRegistrationForm source={source} /></div>
      </div>
    </section>
  );
}
