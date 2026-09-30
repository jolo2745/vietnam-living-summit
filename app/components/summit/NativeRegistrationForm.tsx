"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "../../i18n";
import styles from "./NativeRegistrationForm.module.css";

type Props = { source: "people" | "business" };
type Status = "idle" | "sending" | "success" | "error";

export function NativeRegistrationForm({ source }: Props) {
  const { language, t } = useLanguage();
  const isBusiness = source === "business";
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [consultation, setConsultation] = useState("");
  const [groupError, setGroupError] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const statuses = [
    ["Considering a move", "Đang cân nhắc chuyển đến Việt Nam"],
    ["Just arrived (0–6 months)", "Mới đến (0–6 tháng)"],
    ["Living here (6 months–2 years)", "Đã sống tại đây (6 tháng–2 năm)"],
    ["Long-term resident (2+ years)", "Đã sống tại đây trên 2 năm"],
    ["Other", "Khác"],
  ];
  const roles = [
    ["Expat", "Người nước ngoài sinh sống tại Việt Nam"],
    ["Digital nomad", "Người làm việc từ xa"],
    ["Foreign investor", "Nhà đầu tư nước ngoài"],
    ["Business owner", "Chủ doanh nghiệp"],
    ["Teacher", "Giáo viên"],
    ["Other", "Khác"],
  ];
  const interests = [
    ["Visa & legal", "Visa và pháp lý"],
    ["Real estate & housing", "Bất động sản và nhà ở"],
    ["Business setup", "Thành lập doanh nghiệp"],
    ["Healthcare", "Y tế"],
    ["Networking", "Kết nối cộng đồng"],
    ["Education / schooling", "Giáo dục"],
  ];
  const discovery = [
    ["Instagram", "Instagram"],
    ["Facebook Page", "Trang Facebook"],
    ["TikTok", "TikTok"],
    ["Friend", "Bạn bè"],
    ["TUBUDD website", "Trang web TUBUDD"],
    ["Other", "Khác"],
  ];
  const consultationAreas = [
    ["Visa & immigration", "Visa và xuất nhập cảnh"],
    ["Business setup / company formation", "Thành lập doanh nghiệp"],
    ["Real estate / housing", "Bất động sản / nhà ở"],
    ["Healthcare", "Y tế"],
    ["Banking & finance", "Ngân hàng và tài chính"],
    ["Tax", "Thuế"],
    ["Other", "Khác"],
  ];
  const partnershipTypes = [
    ["Sponsorship", "Tài trợ"],
    ["Exhibiting", "Gian hàng triển lãm"],
    ["Service alliance", "Tham gia Liên minh dịch vụ"],
    ["Speaking", "Diễn giả"],
  ];

  function nextStep(form: HTMLFormElement) {
    const fields = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("[data-step='1'] input, [data-step='1'] select, [data-step='1'] textarea");
    for (const field of fields) {
      if (!field.reportValidity()) return;
    }
    setStatus("idle");
    setMessage("");
    setStep(2);
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const groupName = isBusiness ? "partnershipTypes" : "interests";
    const selections = data.getAll(groupName).map(String);
    if (!selections.length) {
      setGroupError(true);
      form.querySelector<HTMLInputElement>(`input[name="${groupName}"]`)?.focus();
      return;
    }

    setGroupError(false);
    setStatus("sending");
    setMessage("");
    const payload = {
      ...Object.fromEntries(data.entries()),
      source,
      language,
      interests: isBusiness ? [] : selections,
      partnershipTypes: isBusiness ? selections : [],
      futureUpdates: data.get("futureUpdates") === "yes",
      requestId: crypto.randomUUID(),
    };

    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        setStatus("error");
        setMessage(response.status === 429
          ? t("Too many attempts. Please try again in a few minutes.", "Bạn đã thử quá nhiều lần. Vui lòng thử lại sau ít phút.")
          : t("We couldn't send your form right now. Please try again later.", "Hiện tại chúng tôi chưa thể gửi biểu mẫu. Vui lòng thử lại sau."));
        return;
      }
      setStatus("success");
      setMessage(isBusiness
        ? t("Thank you. We've received your partnership enquiry and will be in touch.", "Cảm ơn bạn. Chúng tôi đã nhận được thông tin hợp tác và sẽ liên hệ lại.")
        : t("Thank you. We've received your registration and will email you with the next steps.", "Cảm ơn bạn. Chúng tôi đã nhận được thông tin đăng ký và sẽ gửi email về các bước tiếp theo."));
      form.reset();
      setConsultation("");
      setStep(1);
    } catch {
      setStatus("error");
      setMessage(t("We couldn't send your form right now. Please try again later.", "Hiện tại chúng tôi chưa thể gửi biểu mẫu. Vui lòng thử lại sau."));
    }
  }

  const options = (items: string[][]) => items.map(([value, label]) => (
    <option key={value} value={value}>{language === "vi" ? label : value}</option>
  ));

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.header}>
        <div>
          <span>{isBusiness ? t("Partnership enquiry", "Thông tin hợp tác") : t("Your registration", "Thông tin đăng ký")}</span>
          <h3>{step === 1 ? t("Your details", "Thông tin của bạn") : isBusiness ? t("Partnership details", "Thông tin hợp tác") : t("Your interests", "Mối quan tâm của bạn")}</h3>
        </div>
        <p>{t(`Step ${step} of 2`, `Bước ${step} / 2`)}<br />{t("Fields marked * are required.", "Các mục có dấu * là bắt buộc.")}</p>
      </div>
      <div className={styles.progress} aria-label={t(`Step ${step} of 2`, `Bước ${step} / 2`)}><span className={step >= 1 ? styles.current : ""} /><span className={step === 2 ? styles.current : ""} /></div>

      <div className={styles.grid} data-step="1" hidden={step !== 1}>
        {isBusiness ? (
          <>
            <label className={styles.field}>{t("Company / organisation *", "Tên công ty / tổ chức *")}<input name="companyName" autoComplete="organization" maxLength={120} required={step === 1} /></label>
            <label className={styles.field}>{t("Your name *", "Họ và tên *")}<input name="fullName" autoComplete="name" maxLength={100} required={step === 1} /></label>
          </>
        ) : (
          <label className={`${styles.field} ${styles.wide}`}>{t("Full name *", "Họ và tên *")}<input name="fullName" autoComplete="name" maxLength={100} required={step === 1} /></label>
        )}
        <label className={styles.field}>{t("Email *", "Email *")}<input name="email" type="email" autoComplete="email" inputMode="email" maxLength={254} required={step === 1} /></label>
        <label className={styles.field}>{t("Phone / WhatsApp / Zalo *", "Số điện thoại / WhatsApp / Zalo *")}<input name="phone" type="tel" autoComplete="tel" maxLength={40} required={step === 1} /></label>

        {!isBusiness ? (
          <>
            <label className={styles.field}>{t("Nationality *", "Quốc tịch *")}<input name="nationality" autoComplete="country-name" maxLength={80} required={step === 1} /></label>
            <label className={styles.field}>{t("Current status in Vietnam *", "Tình trạng hiện tại tại Việt Nam *")}
              <select name="residencyStatus" defaultValue="" required={step === 1}><option value="" disabled>{t("Choose one", "Chọn một mục")}</option>{options(statuses)}</select>
            </label>
            <label className={`${styles.field} ${styles.wide}`}>{t("Which best describes you? *", "Mô tả nào phù hợp nhất với bạn? *")}
              <select name="role" defaultValue="" required={step === 1}><option value="" disabled>{t("Choose one", "Chọn một mục")}</option>{options(roles)}</select>
            </label>
          </>
        ) : null}
      </div>

      <div className={styles.grid} hidden={step !== 2}>

        {isBusiness ? (
          <>
            <label className={styles.field}>{t("Industry / service *", "Ngành nghề / dịch vụ *")}<input name="industry" maxLength={100} required={step === 2} /></label>
            <label className={styles.field}>{t("Website", "Trang web")}<input name="companyWebsite" type="url" placeholder="https://" maxLength={300} /></label>
            <fieldset className={`${styles.choiceGroup} ${styles.wide}`}>
              <legend>{t("How would you like to take part? *", "Bạn muốn tham gia theo hình thức nào? *")}</legend>
              <div className={styles.options}>{partnershipTypes.map(([value, label]) => (
                <label key={value}><input name="partnershipTypes" type="checkbox" value={value} />{language === "vi" ? label : value}</label>
              ))}</div>
              {groupError ? <p className={styles.fieldError}>{t("Choose at least one option.", "Vui lòng chọn ít nhất một mục.")}</p> : null}
            </fieldset>
            <label className={`${styles.field} ${styles.wide}`}>{t("Tell us about your business and what you'd like to contribute", "Giới thiệu về doanh nghiệp và cách bạn muốn đóng góp")}<textarea name="message" rows={4} maxLength={2000} /></label>
          </>
        ) : (
          <>
            <label className={`${styles.field} ${styles.wide}`}>{t("How did you hear about us? *", "Bạn biết đến sự kiện qua đâu? *")}
              <select name="heardFrom" defaultValue="" required={step === 2}><option value="" disabled>{t("Choose one", "Chọn một mục")}</option>{options(discovery)}</select>
            </label>
            <fieldset className={`${styles.choiceGroup} ${styles.wide}`}>
              <legend>{t("What are you interested in? *", "Bạn quan tâm đến lĩnh vực nào? *")}</legend>
              <div className={styles.options}>{interests.map(([value, label]) => (
                <label key={value}><input name="interests" type="checkbox" value={value} />{language === "vi" ? label : value}</label>
              ))}</div>
              {groupError ? <p className={styles.fieldError}>{t("Choose at least one option.", "Vui lòng chọn ít nhất một mục.")}</p> : null}
            </fieldset>
            <label className={`${styles.checkboxLine} ${styles.wide}`}><input name="futureUpdates" type="checkbox" value="yes" />{t("Send me updates about future TUBUDD events.", "Gửi cho tôi thông tin về các sự kiện TUBUDD trong tương lai.")}</label>
            <div className={`${styles.formSection} ${styles.wide}`}>
              <h3>{t("Free one-to-one consultation", "Tư vấn riêng miễn phí")}</h3>
              <p>{t("Tell us if you'd like to speak with an expert at the summit.", "Cho chúng tôi biết nếu bạn muốn trao đổi với chuyên gia tại sự kiện.")}</p>
            </div>
            <label className={`${styles.field} ${styles.wide}`}>{t("Would you like a consultation? *", "Bạn có muốn được tư vấn riêng không? *")}
              <select name="consultation" value={consultation} onChange={(event) => setConsultation(event.target.value)} required={step === 2}>
                <option value="" disabled>{t("Choose one", "Chọn một mục")}</option>
                <option value="Yes">{t("Yes", "Có")}</option><option value="No">{t("No", "Không")}</option>
              </select>
            </label>
            {consultation === "Yes" ? (
              <>
                <label className={styles.field}>{t("What do you need help with?", "Bạn cần hỗ trợ về vấn đề gì?")}
                  <select name="consultationArea" defaultValue=""><option value="">{t("Choose one", "Chọn một mục")}</option>{options(consultationAreas)}</select>
                </label>
                <label className={styles.field}>{t("How urgent is this?", "Mức độ khẩn cấp?")}
                  <select name="urgency" defaultValue=""><option value="">{t("Choose one", "Chọn một mục")}</option><option value="Exploring">{t("Just exploring / no rush", "Đang tìm hiểu / chưa vội")}</option><option value="3–6 months">{t("Planning within 3–6 months", "Dự định trong 3–6 tháng")}</option><option value="Urgent">{t("Need help soon", "Cần hỗ trợ sớm")}</option></select>
                </label>
                <label className={`${styles.field} ${styles.wide}`}>{t("Briefly describe your question", "Mô tả ngắn gọn câu hỏi của bạn")}<textarea name="consultationQuestion" rows={3} maxLength={2000} /></label>
              </>
            ) : null}
          </>
        )}
      </div>

      <div className={styles.honeypot} aria-hidden="true"><label>{t("Leave this field empty", "Để trống mục này")}<input name="trapWebsite" tabIndex={-1} autoComplete="off" /></label></div>
      {step === 2 ? <p className={styles.privacy}>{isBusiness
        ? t("We use these details to respond to your partnership enquiry.", "Chúng tôi sử dụng thông tin này để phản hồi yêu cầu hợp tác của bạn.")
        : t("We use these details to respond to your registration. Future event updates are optional.", "Chúng tôi sử dụng thông tin này để phản hồi đăng ký của bạn. Việc nhận tin về các sự kiện trong tương lai là tùy chọn.")}</p> : null}
      <div className={styles.actions}>
        {step === 2 ? <button className={styles.back} type="button" onClick={() => { setStep(1); setGroupError(false); setMessage(""); setStatus("idle"); }}>{t("Back", "Quay lại")}</button> : null}
        {step === 1
          ? <button className={styles.submit} type="button" onClick={(event) => nextStep(event.currentTarget.form!)}>{t("Continue", "Tiếp tục")}<span aria-hidden="true">↗</span></button>
          : <button className={styles.submit} type="submit" disabled={status === "sending"}>{status === "sending" ? t("Sending…", "Đang gửi…") : isBusiness ? t("Send partnership enquiry", "Gửi thông tin hợp tác") : t("Register interest", "Đăng ký quan tâm")}<span aria-hidden="true">↗</span></button>}
      </div>
      <p className={`${styles.status} ${status === "error" ? styles.error : ""}`} role="status" aria-live="polite">{message}</p>
    </form>
  );
}
