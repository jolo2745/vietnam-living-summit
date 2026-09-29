"use client";

import { useLanguage } from "../../i18n";
import styles from "./PartnerLevels.module.css";

const levels = [
  {
    name: ["Gold Sponsor", "Nhà tài trợ Vàng"],
    shortName: ["Gold", "Vàng"],
    benefits: [
      ["Consultation booth", "Gian hàng tư vấn"],
      ["1-on-1 consultation", "Tư vấn 1-1"],
      ["Logo featured on all event communications as a “Gold Sponsor”", "Logo xuất hiện trên toàn bộ truyền thông sự kiện với danh vị “Nhà tài trợ Vàng”"],
      ["1 in-depth industry interview video before the event", "1 video phỏng vấn chuyên sâu về ngành trước sự kiện"],
      ["2–3 joint introduction and thank-you posts before and after the event", "2–3 bài đăng giới thiệu chung và cảm ơn trước và sau sự kiện"],
      ["2 dedicated introduction and thank-you posts before and after the event", "2 bài đăng giới thiệu riêng và cảm ơn trước và sau sự kiện"],
      ["Featured in the Partner section of the Vietnam Living Summit website", "Xuất hiện nổi bật trong mục Đối tác trên website Vietnam Living Summit"],
      ["5 complimentary event passes", "5 vé tham dự sự kiện miễn phí"],
    ],
    sponsor: [
      ["Sponsorship commitment fee: VND 5,000,000 per slot", "Phí cam kết tài trợ: 5.000.000 VNĐ mỗi suất"],
      ["1 TUBUDD video + 1 social media post on the sponsor’s social platforms (content prepared by TUBUDD and subject to the sponsor’s review and approval)", "1 video TUBUDD + 1 bài đăng trên nền tảng mạng xã hội của nhà tài trợ (nội dung do TUBUDD chuẩn bị và được nhà tài trợ xem xét, phê duyệt)"],
    ],
  },
  {
    name: ["Silver Sponsor", "Nhà tài trợ Bạc"],
    shortName: ["Silver", "Bạc"],
    benefits: [
      ["Logo featured on all event communications as a “Silver Sponsor”", "Logo xuất hiện trên toàn bộ truyền thông sự kiện với danh vị “Nhà tài trợ Bạc”"],
      ["1 in-depth industry interview video before the event", "1 video phỏng vấn chuyên sâu về ngành trước sự kiện"],
      ["2–3 joint introduction and thank-you posts before and after the event", "2–3 bài đăng giới thiệu chung và cảm ơn trước và sau sự kiện"],
      ["2 dedicated introduction and thank-you posts before and after the event", "2 bài đăng giới thiệu riêng và cảm ơn trước và sau sự kiện"],
      ["Featured in the Partner section of the Vietnam Living Summit website", "Xuất hiện nổi bật trong mục Đối tác trên website Vietnam Living Summit"],
      ["5 complimentary event passes", "5 vé tham dự sự kiện miễn phí"],
    ],
    sponsor: [
      ["Sponsorship commitment fee: VND 1,000,000 per slot", "Phí cam kết tài trợ: 1.000.000 VNĐ mỗi suất"],
      ["1 TUBUDD video + 1 social media post on the sponsor’s social platforms (content prepared by TUBUDD and subject to the sponsor’s review and approval)", "1 video TUBUDD + 1 bài đăng trên nền tảng mạng xã hội của nhà tài trợ (nội dung do TUBUDD chuẩn bị và được nhà tài trợ xem xét, phê duyệt)"],
    ],
  },
  {
    name: ["Bronze Sponsor", "Nhà tài trợ Đồng"],
    shortName: ["Bronze", "Đồng"],
    benefits: [
      ["Featured in the Partner section of the Vietnam Living Summit website", "Xuất hiện nổi bật trong mục Đối tác trên website Vietnam Living Summit"],
      ["1 complimentary event pass", "1 vé tham dự sự kiện miễn phí"],
    ],
    sponsor: [
      ["1 TUBUDD video + 1 social media post on the sponsor’s social platforms (content created by TUBUDD and subject to the sponsor’s review and approval)", "1 video TUBUDD + 1 bài đăng trên nền tảng mạng xã hội của nhà tài trợ (nội dung do TUBUDD thực hiện và được nhà tài trợ xem xét, phê duyệt)"],
    ],
  },
];

export function PartnerLevels() {
  const { language, t } = useLanguage();
  const languageIndex = language === "vi" ? 1 : 0;

  return (
    <section className={`${styles.levels} wrap`} id="partnership-levels">
      <div className={styles.heading}>
        <div>
          <p className={styles.kicker}>{t("Sponsorship packages", "Các gói tài trợ")}</p>
          <h2>{t("Choose your", "Chọn ")}<br /><em>{t("sponsorship package.", "gói tài trợ.")}</em></h2>
        </div>
        <p className={styles.intro}>
          {t("Three sponsorship packages designed to give your brand a meaningful presence before, during, and after the summit.", "Ba gói tài trợ giúp thương hiệu của bạn tạo dấu ấn ý nghĩa trước, trong và sau event.")}
        </p>
      </div>

      <div className={styles.grid}>
        {levels.map(({ name, shortName, benefits, sponsor }, index) => (
          <article className={styles.card} key={name[0]}>
            <div className={styles.cardHeader}>
              <span className={styles.number}>0{index + 1}</span>
              <span className={styles.shortName}>{shortName[languageIndex]}</span>
            </div>
            <h3><span aria-hidden="true">✦</span> {name[languageIndex]}</h3>
            <div className={styles.packageSection}>
              <h4>{t("Benefits", "Quyền lợi")}</h4>
              <ul>
                {benefits.map((benefit, benefitIndex) => (
                  <li className={index === 0 && benefitIndex < 2 ? styles.emphasis : ""} key={benefit[0]}>{benefit[languageIndex]}</li>
                ))}
              </ul>
            </div>
            <div className={styles.packageSection}>
              <h4>{t("Sponsor", "Nhà tài trợ")}</h4>
              <ul>
                {sponsor.map((item) => (
                  <li className={item[0].startsWith("Sponsorship commitment fee") ? styles.fee : ""} key={item[0]}>
                    {item[languageIndex]}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
