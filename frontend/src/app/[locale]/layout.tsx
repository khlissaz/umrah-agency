import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import getMessages from '@/i18n';
import { setRequestLocale } from 'next-intl/server';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
 
  console.log("locale", locale);
  const { locale: currentLocale, messages } = await getMessages({ locale });

  setRequestLocale(currentLocale);

  return (
    <html lang={currentLocale} dir={currentLocale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${inter.className}`}>
        <NextIntlClientProvider locale={currentLocale} messages={messages}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
