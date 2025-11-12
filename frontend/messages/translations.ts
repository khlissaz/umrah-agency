// i18n/translations.ts
export type Language = 'en' | 'fr' | 'ar';

export const translations: Record<Language, Record<string, string>> = {
  en: require('./en.json'),
  fr: require('./fr.json'),
  ar: require('./ar.json'),
};

export function getTranslation(lang: Language) {
  return translations[lang];
}
