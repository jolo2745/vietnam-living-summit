"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLanguage } from "../../i18n";
import styles from "./Industries.module.css";

const industries = [
  {
    title: ["Immigration & Corporate Law", "Di trú & Luật doanh nghiệp"],
    description: ["Work permits, company formation, and labour contracts.", "Giấy phép lao động, thành lập công ty và hợp đồng lao động."],
    image: "/images/industries/immigration-law.png",
  },
  {
    title: ["Tax & Accounting", "Thuế & Kế toán"],
    description: ["Personal and corporate tax advisory, plus FDI accounting.", "Tư vấn thuế cá nhân, doanh nghiệp và kế toán FDI."],
    image: "/images/industries/tax-accounting.png",
  },
  {
    title: ["Banking & Fintech", "Ngân hàng & Công nghệ tài chính"],
    description: ["Bank account opening and international money transfers.", "Mở tài khoản ngân hàng và chuyển tiền quốc tế."],
    image: "/images/industries/banking-fintech.png",
  },
  {
    title: ["Real Estate & Property Rental", "Bất động sản & Thuê nhà"],
    description: ["Home rentals, property purchasing, and secure lease agreements.", "Thuê nhà, mua bất động sản và hợp đồng thuê an toàn."],
    image: "/images/industries/real-estate.png",
  },
  {
    title: ["International Health Insurance", "Bảo hiểm sức khỏe quốc tế"],
    description: ["Medical and life-insurance coverage for expats and families.", "Bảo hiểm y tế và nhân thọ cho người nước ngoài và gia đình."],
    image: "/images/industries/health-insurance.png",
  },
  {
    title: ["International Schools", "Trường quốc tế"],
    description: ["K–12 education solutions for international families.", "Giải pháp giáo dục K–12 cho các gia đình quốc tế."],
    image: "/images/industries/schools.png",
  },
  {
    title: ["International Hospitals & Clinics", "Bệnh viện & Phòng khám quốc tế"],
    description: ["World-class healthcare and medical services in Vietnam.", "Dịch vụ chăm sóc sức khỏe và y tế tiêu chuẩn quốc tế tại Việt Nam."],
    image: "/images/industries/hospitals.png",
  },
  {
    title: ["Coworking Spaces", "Không gian làm việc chung"],
    description: ["Flexible workspaces for freelancers, digital nomads, and startups.", "Không gian làm việc linh hoạt cho người làm tự do, du mục số và startup."],
    image: "/images/industries/coworking.png",
  },
  {
    title: ["International Relocation & Moving", "Chuyển nhà & Di dời quốc tế"],
    description: ["Household moving and international logistics support.", "Hỗ trợ chuyển nhà và hậu cần quốc tế."],
    image: "/images/industries/relocation-moving.png",
  },
  {
    title: ["Car Rental & Chauffeur Services", "Thuê xe & Tài xế riêng"],
    description: ["Long-term vehicle rentals and private-driver services.", "Dịch vụ thuê xe dài hạn và tài xế riêng."],
    image: "/images/industries/car-chauffeur.png",
  },
  {
    title: ["Business Consultancy & Company Setup", "Tư vấn & Thành lập doanh nghiệp"],
    description: ["Business formation and Vietnam market-entry strategy.", "Thành lập doanh nghiệp và chiến lược gia nhập thị trường Việt Nam."],
    image: "/images/industries/business-consultancy.png",
  },
  {
    title: ["Luxury Resorts & Experiential Travel", "Nghỉ dưỡng cao cấp & Du lịch trải nghiệm"],
    description: ["Premium getaways and curated domestic travel experiences.", "Kỳ nghỉ cao cấp và trải nghiệm du lịch trong nước được tuyển chọn."],
    image: "/images/industries/luxury-travel.png",
  },
];

type IndustriesProps = {
  context?: "business" | "attendees";
};

export function Industries({ context = "business" }: IndustriesProps) {
  const { language, t } = useLanguage();
  const languageIndex = language === "vi" ? 1 : 0;
  const gridRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid || !("IntersectionObserver" in window)) {
      return;
    }

    const cards = Array.from(grid.querySelectorAll("li"));
    grid.classList.add(styles.revealReady);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add(styles.visible);
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    });

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`${styles.industries} wrap`}
      id={context === "attendees" ? "meet-the-alliance" : "industries"}
      aria-labelledby={context === "attendees" ? "alliance-title" : "industries-title"}
    >
      <div className={styles.directory}>
        <div className={styles.intro}>
          <h2 id={context === "attendees" ? "alliance-title" : "industries-title"}>
            {context === "attendees" ? (
              <>{t("Meet the ", "Gặp gỡ ")}<em>{t("Alliance.", "Liên minh.")}</em></>
            ) : (
              <>{t("Growth solutions for ", "Giải pháp tăng trưởng cho ")}<em>{t("every industry.", "mọi ngành nghề.")}</em></>
            )}
          </h2>
          <div className={styles.introCopy}>
            <span>{t("12 service sectors", "12 lĩnh vực dịch vụ")}</span>
            <p>{t("One connected alliance bringing the essential services to relocate, invest, build in Vietnam under one roof.", "Một liên minh kết nối các dịch vụ thiết yếu cho định cư, làm việc và đầu tư tại Việt Nam trong cùng một hệ sinh thái.")}</p>
          </div>
        </div>

        <ol ref={gridRef} className={styles.grid} aria-label={t("Industries represented at Vietnam Living Summit 2026", "Các ngành nghề có mặt tại Vietnam Living Summit 2026")}>
          {industries.map(({ title, description, image }) => (
            <li key={title[0]}>
              <div className={styles.tileCopy}>
                <h3>{title[languageIndex]}</h3>
                <p>{description[languageIndex]}</p>
                {context === "attendees" ? (
                  <a
                    className={styles.expertLink}
                    href="https://wa.me/84896684588"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${t("Speak with an expert about", "Trao đổi với chuyên gia về")} ${title[languageIndex]} ${t("on WhatsApp", "qua WhatsApp")}`}
                  >
                    {t("Speak with an Expert", "Trao đổi với chuyên gia")} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <a
                    className={styles.expertLink}
                    href="#event-signup"
                    aria-label={`${t("Join the Alliance for", "Tham gia Liên minh trong lĩnh vực")} ${title[languageIndex]}`}
                  >
                    {t("Join the Alliance", "Tham gia Liên minh")} <span aria-hidden="true">↓</span>
                  </a>
                )}
              </div>
              <div className={styles.illustration} aria-hidden="true">
                <Image src={image} alt="" fill loading="lazy" sizes="(max-width: 620px) 45vw, (max-width: 1080px) 24vw, 16vw" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
