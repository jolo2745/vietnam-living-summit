"use client";

import Image from "next/image";
import { useLanguage } from "../../i18n";
import styles from "./EventIntroduction.module.css";

export function EventIntroduction() {
  const { t } = useLanguage();

  return (
    <section className={styles.section} id="event-introduction" aria-labelledby="event-introduction-title">
      <div className={`${styles.layout} wrap`}>
        <div className={styles.copy}>
          <h2 id="event-introduction-title">{t("Welcome to Vietnam Living Summit 2026", "Chào mừng đến với Vietnam Living Summit 2026")}</h2>

          <div className={styles.socials}>
            <span className={styles.socialLabel}>{t("Follow the story", "Theo dõi hành trình")}</span>
            <div className={styles.socialLinks}>
              <div className={styles.socialItem}>
                <a href="https://www.instagram.com/vietnam.living.summit/" target="_blank" rel="noreferrer" aria-label={t("Vietnam Living Summit on Instagram (opens in a new tab)", "Vietnam Living Summit trên Instagram (mở trong tab mới)")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
                  </svg>
                  <span>Instagram</span><span className={styles.arrow} aria-hidden="true">↗</span>
                </a>
                <span className={styles.socialCount}>{t("88 followers", "88 người theo dõi")}</span>
              </div>
              <div className={styles.socialItem}>
                <a href="https://www.facebook.com/profile.php?id=61593119474921" target="_blank" rel="noreferrer" aria-label={t("Vietnam Living Summit on Facebook (opens in a new tab)", "Vietnam Living Summit trên Facebook (mở trong tab mới)")}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M14 21v-8h2.7l.4-3H14V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9a21 21 0 0 0-2.5-.1c-2.5 0-4.1 1.5-4.1 4.2v2H8v3h2.7v8H14Z" />
                  </svg>
                  <span>Facebook</span><span className={styles.arrow} aria-hidden="true">↗</span>
                </a>
                <span className={styles.socialCount}>{t("811 followers", "811 người theo dõi")}</span>
              </div>
              <div className={styles.socialItem}>
                <a href="https://www.tiktok.com/@relocatetovietnam?lang=vi-VN" target="_blank" rel="noreferrer" aria-label={t("Relocate to Vietnam on TikTok (opens in a new tab)", "Relocate to Vietnam trên TikTok (mở trong tab mới)")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 4v10.3a4 4 0 1 1-3-3.85" />
                    <path d="M14 4c.55 2.72 2.2 4.25 5 4.6" />
                  </svg>
                  <span>TikTok</span><span className={styles.arrow} aria-hidden="true">↗</span>
                </a>
                <span className={styles.socialCount}>{t("3K followers · 9.5K likes", "3K người theo dõi · 9,5K lượt thích")}</span>
              </div>
            </div>
          </div>
        </div>

        <figure className={styles.media} aria-label={t("Introduction video placeholder", "Vị trí video giới thiệu")}>
          <div className={styles.poster}>
            <div className={styles.placeholder}>
              <Image className={styles.logo} src="/images/vietnam-living-summit-logo.svg" alt="" width={1200} height={680} />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
