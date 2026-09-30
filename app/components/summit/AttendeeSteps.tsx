"use client";

import { useLanguage } from "../../i18n";
import styles from "./AttendeeSteps.module.css";

export function AttendeeSteps() {
  const { t } = useLanguage();
  const steps = [
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
    <section className={styles.section} aria-labelledby="attendee-steps-title">
      <div className={`wrap ${styles.inner}`}>
        <h2 id="attendee-steps-title" className={styles.title}>{t("Steps to join Vietnam Living Summit 2026", "Các bước tham gia Vietnam Living Summit 2026")}</h2>
        <ol className={styles.grid}>
          {steps.map((step, index) => (
            <li key={step.title} className={styles.card}>
              <span className={styles.stepNumber} aria-hidden="true">{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
