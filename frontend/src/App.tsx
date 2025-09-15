import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Packages } from './components/Packages';
import { PlatformJourney } from './components/PlatformJourney';
import { Services } from './components/Services';
import { Footer } from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <Hero />
          <Features />
          <PlatformJourney />
          <Packages />
          <Services />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;