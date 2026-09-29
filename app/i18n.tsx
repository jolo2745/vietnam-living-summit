"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "vi";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (english: string, vietnamese: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const storageKey = "vls-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    document.documentElement.lang = nextLanguage;
    window.localStorage.setItem(storageKey, nextLanguage);
  }, []);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(storageKey);
    if (savedLanguage === "vi") setLanguageState("vi");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content = language === "vi"
        ? "Sự kiện kết nối những người xây dựng cuộc sống tại Việt Nam với các doanh nghiệp, dịch vụ và cộng đồng địa phương đáng tin cậy."
        : "A summit connecting people building a life in Vietnam with trusted local businesses, services, and communities.";
    }
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    t: (english, vietnamese) => language === "vi" ? vietnamese : english,
  }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

export function LanguageSwitch({ mobile = false }: { mobile?: boolean }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={`language-switch${mobile ? " language-switch-mobile" : ""}`} role="group" aria-label={t("Choose language", "Chọn ngôn ngữ")}>
      <button aria-pressed={language === "en"} onClick={() => setLanguage("en")} type="button">EN</button>
      <span aria-hidden="true">/</span>
      <button aria-pressed={language === "vi"} onClick={() => setLanguage("vi")} type="button">VI</button>
    </div>
  );
}
