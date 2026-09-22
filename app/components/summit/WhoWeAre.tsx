"use client";

import Image from "next/image";
import { useLanguage } from "../../i18n";
import styles from "./WhoWeAre.module.css";

type WhoWeAreProps = {
  tone: "people" | "business";
};

export function WhoWeAre({ tone }: WhoWeAreProps) {
  const { t } = useLanguage();
  const proof = [
    ["50,000+", t("clients supported", "khách hàng được hỗ trợ")],
    ["9,000,000+", t("content views", "lượt xem nội dung")],
    ["200+", t("trusted partners", "đối tác đáng tin cậy")],
  ];

  return (
    <section className={`${styles.section} ${styles[tone]} wrap`} id="who-we-are">
      <div className={styles.layout}>
        {tone === "people" ? (
          <div className={styles.photo}>
            <Image
              src="/images/who-we-are-community.webp"
              alt={t("Visitors exploring Vietnam with a local guide", "Du khách khám phá Việt Nam cùng hướng dẫn viên địa phương")}
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </div>
        ) : (
          <div className={styles.photo}>
            <Image
              src="/images/business-collaboration.jpg"
              alt={t("The TUBUDD team collaborating around a table", "Đội ngũ TUBUDD cùng làm việc quanh bàn")}
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
            <span className={styles.caption}>{t("Meet TUBUDD", "Gặp gỡ TUBUDD")}</span>
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.heading}>
            <h2>{t("Who we ", "Chúng tôi ")}<em>{t("are", "là ai")}</em></h2>
            <p className={styles.intro}>
              {t("A premier travel-tech platform delivering full-suite travel and relocation services in Vietnam to more than 50,000 clients. Founded in Hanoi in 2018, TUBUDD connects international residents and travellers with local knowledge and a growing network of trusted service partners. Vietnam Living Summit brings that experience together to help people relocate, invest, and build a life in Vietnam with clearer next steps.", "Nền tảng công nghệ du lịch hàng đầu cung cấp trọn bộ dịch vụ du lịch và chuyển đến Việt Nam cho hơn 50.000 khách hàng. Thành lập tại Hà Nội năm 2018, TUBUDD kết nối cư dân quốc tế và du khách với kiến thức địa phương cùng mạng lưới đối tác dịch vụ đáng tin cậy ngày càng phát triển. Vietnam Living Summit quy tụ những kinh nghiệm đó để giúp mọi người chuyển đến, đầu tư và xây dựng cuộc sống tại Việt Nam với các bước tiếp theo rõ ràng hơn.")}
            </p>
          </div>

          {tone === "business" && (
            <dl className={styles.proof} aria-label={t("TUBUDD at a glance", "Tổng quan về TUBUDD")}>
              {proof.map(([value, label]) => (
                <div key={label}>
                  <dt>{value}</dt>
                  <dd>{label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      {tone === "people" && (
        <dl className={`${styles.proof} ${styles.proofBelow}`} aria-label={t("TUBUDD at a glance", "Tổng quan về TUBUDD")}>
          {proof.map(([value, label]) => (
            <div key={label}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
