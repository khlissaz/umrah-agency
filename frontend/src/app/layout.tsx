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
  params: { locale?: string };
}) {
  const currentLocale = locale || 'en';

  setRequestLocale(currentLocale);
const messages = await getMessages({ locale: currentLocale });

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} ${locale === 'ar' ? 'font-arabic' : ''}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LanguageProvider>{children}</LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
