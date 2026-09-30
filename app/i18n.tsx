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
export function localizedHref(path: string, language: Language) {
  return language === "vi" ? (path === "/" ? "/vi" : `/vi${path}`) : path;
}

export function LanguageProvider({ children, initialLanguage }: { children: ReactNode; initialLanguage: Language }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  const setLanguage = useCallback((nextLanguage: Language) => {
    if (nextLanguage === language) return;
    setLanguageState(nextLanguage);
    window.localStorage.setItem(storageKey, nextLanguage);
    const currentPath = window.location.pathname.replace(/^\/vi(?=\/|$)/, "") || "/";
    window.location.assign(`${localizedHref(currentPath, nextLanguage)}${window.location.search}${window.location.hash}`);
  }, [language]);

  useEffect(() => {
    if (initialLanguage !== "en" || window.localStorage.getItem(storageKey) !== "vi") return;
    const path = window.location.pathname;
    if (path === "/" || path === "/partners" || path === "/partners/") {
      window.location.replace(`${localizedHref(path, "vi")}${window.location.search}${window.location.hash}`);
    }
  }, [initialLanguage]);

  useEffect(() => {
    document.documentElement.lang = language;
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
