'use client';

import { usePathname, useRouter } from "next/navigation";
import { Language, getTranslation } from '../../messages/translations';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [language, setLanguageState] = useState<Language>('en');

  // 🔥 Sync language with Next.js locale
  useEffect(() => {
    const locale = (router as any).locale || 'en';
    setLanguageState(locale as Language);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [ (router as any).locale ]); // this is the most important line

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);

    // 🔥 Update HTML dir & lang
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    // 🔥 Change URL locale
    router.push(`/${lang}${pathname.replace(/^\/(en|ar|fr)/, "")}`);
  };

  const t = (key: string): string => {
    const translations = getTranslation(language);
    return translations[key as keyof typeof translations] || key;
  };
  const isRTL = language === "ar";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? "rtl" : "ltr"}>{children}</div>
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
