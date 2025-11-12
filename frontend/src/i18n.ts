
import { getTranslation, Language } from '../messages/translations';

const locales: Language[] = ['en', 'fr', 'ar'];

export default async function getMessages({ locale }: { locale: string }) {
   const lang = (locale as Language) || 'en';
  if (!locales.includes(lang)) {
    throw new Error(`Invalid locale: ${locale}`);
  }
  return getTranslation(lang);
}
