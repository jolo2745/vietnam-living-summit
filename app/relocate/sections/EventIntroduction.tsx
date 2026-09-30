"use client";

import Script from "next/script";
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
            <div className={styles.profileGrid}>
              <article className={styles.profileCard}>
                <h3>TikTok</h3>
                <div className={styles.profileSurface}>
                  <div className={styles.tiktokProfile}>
                    <span className={styles.tiktokAvatar} aria-hidden="true">♪</span>
                    <strong>@relocatetovietnam</strong>
                    <span>{t("Relocate to Vietnam", "Chuyển đến Việt Nam")}</span>
                    <p>{t("Videos and practical guidance for building a life in Vietnam.", "Video và hướng dẫn thực tế để xây dựng cuộc sống tại Việt Nam.")}</p>
                    <a href="https://www.tiktok.com/@relocatetovietnam" target="_blank" rel="noreferrer">
                      {t("View live TikTok profile", "Xem trang TikTok trực tiếp")} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>

              <article className={styles.profileCard}>
                <h3>Facebook</h3>
                <div className={styles.profileSurface}>
                  <iframe
                    className={styles.facebookEmbed}
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61593119474921&tabs=timeline&width=360&height=440&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                    title={t("Vietnam Living Summit Facebook profile", "Trang Facebook Vietnam Living Summit")}
                    width="360"
                    height="440"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                </div>
              </article>

              <article className={styles.profileCard}>
                <h3>Instagram</h3>
                <div className={styles.profileSurface}>
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink="https://www.instagram.com/vietnam.living.summit/"
                    data-instgrm-version="14"
                  >
                    <a href="https://www.instagram.com/vietnam.living.summit/" target="_blank" rel="noreferrer">
                      {t("View Vietnam Living Summit on Instagram ↗", "Xem Vietnam Living Summit trên Instagram ↗")}
                    </a>
                  </blockquote>
                </div>
              </article>
            </div>
          </div>
        </div>

        <figure className={styles.media}>
          <div className={styles.poster}>
            <iframe
              className={styles.video}
              src="https://www.tiktok.com/player/v1/7684170915671723284?autoplay=0&controls=1&description=0&rel=0"
              title={t("Relocate to Vietnam — introduction video", "Relocate to Vietnam — video giới thiệu")}
              loading="lazy"
              allow="fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
          <figcaption className={styles.videoCaption}>
            <a href="https://www.tiktok.com/@relocatetovietnam/video/7684170915671723284" target="_blank" rel="noreferrer">
              {t("Watch on TikTok ↗", "Xem trên TikTok ↗")}
            </a>
          </figcaption>
        </figure>
      </div>

      <Script id="instagram-profile-embed" src="https://www.instagram.com/embed.js" strategy="afterInteractive" />
    </section>
  );
}
