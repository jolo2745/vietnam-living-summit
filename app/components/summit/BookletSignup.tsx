"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "../../i18n";
import styles from "./BookletSignup.module.css";

type BookletSignupProps = {
  source: "people" | "business";
};

export function BookletSignup({ source }: BookletSignupProps) {
  const { language, t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const website = String(data.get("website") ?? "").trim();

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/booklet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, source, requestId: crypto.randomUUID() }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || t("We could not send the booklet right now.", "Hiện tại chúng tôi chưa thể gửi cẩm nang."));

      setStatus("success");
      setMessage(t("Check your inbox — your roadmap and event registration link are on their way.", "Hãy kiểm tra hộp thư — lộ trình và liên kết đăng ký sự kiện đang được gửi đến bạn."));
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(language === "vi"
        ? "Hiện tại chúng tôi chưa thể gửi cẩm nang. Vui lòng thử lại sau."
        : error instanceof Error ? error.message : "We could not send the booklet right now.");
    }
  }

  return (
    <section className={styles.section} id="roadmap-booklet" aria-labelledby={`booklet-title-${source}`}>
      <div className={`${styles.layout} wrap`}>
        <div className={styles.copy}>
          <p className={styles.kicker}>{t("Free relocation roadmap", "Lộ trình chuyển đến miễn phí")}</p>
          <h2 id={`booklet-title-${source}`}>{t("Your move starts", "Hành trình của bạn bắt đầu")}<br />{t("with a ", "với một ")}<em>{t("clear plan.", "kế hoạch rõ ràng.")}</em></h2>
          <p className={styles.intro}>{t("Get the Vietnam relocation roadmap booklet and the summit registration link delivered to your inbox.", "Nhận cẩm nang lộ trình chuyển đến Việt Nam và liên kết đăng ký hội nghị ngay trong hộp thư của bạn.")}</p>
        </div>

        <div className={styles.booklet} aria-hidden="true">
          <span>Vietnam Living Summit</span>
          <strong>{t("Relocation", "Lộ trình")}<br />{t("Roadmap", "chuyển đến")}</strong>
          <small>Vietnam · 2026</small>
        </div>

        <form className={styles.form} onSubmit={submit}>
          <label htmlFor={`booklet-email-${source}`}>{t("Your email", "Email của bạn")}</label>
          <div className={styles.fieldRow}>
            <input
              id={`booklet-email-${source}`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              disabled={status === "sending"}
            />
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? t("Sending…", "Đang gửi…") : t("Email me the booklet", "Gửi cẩm nang qua email")}
              <span aria-hidden="true">↗</span>
            </button>
          </div>
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor={`booklet-website-${source}`}>{t("Website", "Trang web")}</label>
            <input id={`booklet-website-${source}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <p className={styles.privacy}>{t("We use your email only to send the requested booklet and event information.", "Chúng tôi chỉ sử dụng email của bạn để gửi cẩm nang đã yêu cầu và thông tin sự kiện.")}</p>
          <p className={`${styles.status} ${status === "error" ? styles.error : ""}`} role="status" aria-live="polite">{message}</p>
        </form>
      </div>
    </section>
  );
}
