"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n";
import styles from "./AlliancePartners.module.css";

// Visual placeholders only. Replace with confirmed partners and booking URLs.
const profilePlaceholders = [
  { category: ["Immigration & law", "Di trú & pháp lý"], description: ["Visas, work permits and company setup.", "Thị thực, giấy phép lao động và thành lập công ty."], image: "/images/industries/immigration-law.png" },
  { category: ["Property & relocation", "Bất động sản & chuyển đến"], description: ["Finding a home and planning your move.", "Tìm nhà và lên kế hoạch chuyển đến."], image: "/images/industries/real-estate.png" },
  { category: ["Health & insurance", "Sức khỏe & bảo hiểm"], description: ["Healthcare and cover for life in Vietnam.", "Chăm sóc sức khỏe và bảo hiểm cho cuộc sống tại Việt Nam."], image: "/images/industries/health-insurance.png" },
  { category: ["Education & family", "Giáo dục & gia đình"], description: ["Schools and support for your family.", "Trường học và hỗ trợ dành cho gia đình bạn."], image: "/images/industries/schools.png" },
];

export function AlliancePartners() {
  const { language, t } = useLanguage();
  const languageIndex = language === "vi" ? 1 : 0;
  const [activeIndex, setActiveIndex] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const activeRef = useRef(1);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const rotating = !hovered && !focused && !touching && !paused && !reducedMotion;

  const showProfile = useCallback((index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    const distance = slide.getBoundingClientRect().left + slide.offsetWidth / 2
      - (track.getBoundingClientRect().left + track.clientWidth / 2);
    track.scrollTo({
      left: track.scrollLeft + distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(() => {
      const section = sectionRef.current;
      if (!section || document.hidden) return;
      const bounds = section.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
      showProfile((activeRef.current + 1) % profilePlaceholders.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [rotating, activeIndex, showProfile]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;

    function centreCurrent() {
      const slide = track!.children[activeRef.current] as HTMLElement;
      const distance = slide.getBoundingClientRect().left + slide.offsetWidth / 2
        - (track!.getBoundingClientRect().left + track!.clientWidth / 2);
      track!.scrollTo({ left: track!.scrollLeft + distance, behavior: "instant" });
    }

    function handleScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const centre = track!.getBoundingClientRect().left + track!.clientWidth / 2;
        let closest = 0;
        let minimum = Infinity;
        Array.from(track!.children).forEach((slide, index) => {
          const rect = slide.getBoundingClientRect();
          const distance = Math.abs(rect.left + rect.width / 2 - centre);
          if (distance < minimum) { minimum = distance; closest = index; }
        });
        activeRef.current = closest;
        setActiveIndex(closest);
      });
    }

    centreCurrent();
    track.addEventListener("scroll", handleScroll, { passive: true });
    const observer = new ResizeObserver(centreCurrent);
    observer.observe(track);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="meet-the-alliance"
      aria-labelledby="alliance-title"
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover)").matches) setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onTouchStart={() => setTouching(true)}
      onTouchEnd={() => setTouching(false)}
      onTouchCancel={() => setTouching(false)}
    >
      <div className="wrap">
        <div className={styles.heading}>
          <h2 id="alliance-title">{t("Meet the ", "Gặp gỡ ")}<em>{t("Alliance.", "Liên minh.")}</em></h2>
          <p id="alliance-preview-note">{t("Partner profiles coming soon.", "Hồ sơ đối tác sẽ sớm được cập nhật.")}</p>
        </div>

        <div className={styles.carousel} role="region" aria-roledescription={t("carousel", "băng chuyền")} aria-label={t("Alliance partner profiles", "Hồ sơ đối tác Liên minh")}>
        <ul
          ref={trackRef}
          className={styles.track}
          aria-label={t("Partner profile previews", "Xem trước hồ sơ đối tác")}
          aria-describedby="alliance-preview-note"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            const next = event.key === "ArrowRight" ? Math.min(activeIndex + 1, profilePlaceholders.length - 1)
              : event.key === "ArrowLeft" ? Math.max(activeIndex - 1, 0)
              : event.key === "Home" ? 0 : event.key === "End" ? profilePlaceholders.length - 1 : null;
            if (next !== null) { event.preventDefault(); showProfile(next); }
          }}
        >
          {profilePlaceholders.map(({ category, description, image }, index) => (
            <li className={styles.slide} key={category[0]}>
            <article className={`${styles.card} ${index === activeIndex ? styles.active : ""}`} aria-label={`${category[languageIndex]}, ${t("profile", "hồ sơ")} ${index + 1} ${t("of", "trên")} ${profilePlaceholders.length}`}>
              <div className={styles.logoPanel} aria-label={`${category[languageIndex]}: ${t("partner logo placeholder", "vị trí logo đối tác")}`}>
                <span>{t("Partner logo", "Logo đối tác")}</span>
              </div>
              <div className={styles.details}>
                <p className={styles.category}>{category[languageIndex]}</p>
                <h3>{t("Partner name", "Tên đối tác")}</h3>
                <p className={styles.description}>{description[languageIndex]}</p>
                <button
                  className={styles.consultation}
                  type="button"
                  disabled
                  aria-describedby="alliance-preview-note"
                >
                  {t("Book a consultation", "Đặt lịch tư vấn")} <span aria-hidden="true">↗</span>
                </button>
              </div>
              <div className={styles.illustration} aria-hidden="true">
                <Image src={image} alt="" fill sizes="(max-width: 560px) 40vw, 200px" />
              </div>
            </article>
            </li>
          ))}
        </ul>
        <div className={styles.controls}>
          <button className={styles.arrow} type="button" aria-label={t("Previous partner", "Đối tác trước")} disabled={activeIndex === 0} onClick={() => showProfile(activeIndex - 1)}>←</button>
          <div className={styles.dots} aria-label={t("Choose a partner profile", "Chọn hồ sơ đối tác")}>
            {profilePlaceholders.map(({ category }, index) => (
              <button key={category[0]} type="button" aria-label={`${t("Show", "Hiển thị")} ${category[languageIndex]} ${t("profile", "hồ sơ")}`} aria-pressed={index === activeIndex} onClick={() => showProfile(index)} />
            ))}
          </div>
          <button className={styles.arrow} type="button" aria-label={t("Next partner", "Đối tác tiếp theo")} disabled={activeIndex === profilePlaceholders.length - 1} onClick={() => showProfile(activeIndex + 1)}>→</button>
          <button
            className={styles.arrow}
            type="button"
            aria-label={paused ? t("Resume automatic rotation", "Tiếp tục chuyển tự động") : t("Pause automatic rotation", "Tạm dừng chuyển tự động")}
            aria-pressed={paused}
            disabled={reducedMotion}
            title={reducedMotion ? t("Automatic rotation is off for reduced motion", "Chuyển tự động đã tắt theo tùy chọn giảm chuyển động") : undefined}
            onClick={() => setPaused(value => !value)}
          ><span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span></button>
        </div>
        <p className={styles.srOnly} role="status" aria-live={rotating ? "off" : "polite"} aria-atomic="true">
          {t("Profile", "Hồ sơ")} {activeIndex + 1} {t("of", "trên")} {profilePlaceholders.length}: {profilePlaceholders[activeIndex].category[languageIndex]}
        </p>
        </div>
      </div>
    </section>
  );
}
