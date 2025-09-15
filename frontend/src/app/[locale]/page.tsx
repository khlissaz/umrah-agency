import { useTranslations } from 'next-intl';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Packages } from '@/components/Packages';
import { Services } from '@/components/Services';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <Packages />
        <Services />
      </main>
      <Footer />
    </div>
  );
}