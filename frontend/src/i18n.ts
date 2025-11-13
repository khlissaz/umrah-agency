import { getTranslation, Language } from '../messages/translations';

const locales: Language[] = ['en', 'fr', 'ar'];

export default async function getMessages({ locale }: { locale: string }) {
  const lang = locales.includes(locale as Language) ? (locale as Language) : 'en';
console.log(lang, locale);
  return {
    locale: lang,
    messages: getTranslation(lang)
  };
}
