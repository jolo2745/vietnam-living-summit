"use client";

import Image from "next/image";
import { useLanguage } from "../../i18n";
import styles from "./SponsorsSection.module.css";

export function SponsorsSection() {
  const { t } = useLanguage();

  return (
    <section className={styles.section} aria-labelledby="sponsors-title">
      <div className="wrap">
        <div className={styles.heading}>
          <h2 id="sponsors-title">{t("Co-organizers and ", "Đơn vị đồng tổ chức và ")}<em>{t("Sponsors", "Nhà tài trợ")}</em></h2>
        </div>

        <div className={styles.groups}>
          <article className={styles.group}>
            <p>{t("Co-organized by", "Đồng tổ chức bởi")}</p>
            <div className={styles.logoCard}>
              <Image
                className={styles.travelliveLogo}
                src="/images/sponsors/travellive.png"
                alt="Travellive"
                width={1459}
                height={581}
                sizes="(max-width: 800px) 85vw, 42vw"
              />
            </div>
          </article>

          <article className={styles.group}>
            <p>{t("Media Sponsor · Gold Sponsor", "Nhà tài trợ Truyền thông · Hạng Vàng")}</p>
            <div className={styles.logoCard}>
              <Image
                className={styles.haLogo}
                src="/images/sponsors/ha-media-color.png"
                alt="HA Media"
                width={1720}
                height={376}
                sizes="(max-width: 800px) 85vw, 42vw"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
