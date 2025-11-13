'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Play, Star, Users, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { MotionBox } from './ui/MotionBox';

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-emerald-800/90 to-emerald-700/85 z-10"></div>
        <img
          src="https://images.pexels.com/photos/4668228/pexels-photo-4668228.jpeg"
          alt="Beautiful view of Masjid al-Haram and Kaaba in Makkah during Umrah season"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 z-20 opacity-10">
        <div className="absolute inset-0 islamic-pattern"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-25">
        <MotionBox 
          className="absolute top-20 left-10 w-40 h-40 bg-gold-400/10 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <MotionBox 
          className="absolute bottom-32 right-16 w-56 h-56 bg-emerald-400/8 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <MotionBox 
          className="absolute top-1/3 right-1/4 w-28 h-28 bg-white/5 rounded-full blur-xl"
          animate={{ 
            y: [-10, 10, -10],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <MotionBox 
            className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Star className="w-4 h-4 text-gold-400 fill-current" />
            <span className="text-white text-sm font-medium">{t('trusted_by')}</span>
            <Star className="w-4 h-4 text-gold-400 fill-current" />
          </MotionBox>

          <MotionBox 
          as='h1'
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block text-gold-400 text-2xl md:text-3xl font-normal mb-4">
              ✨ {locale === 'ar' ? 'بسم الله الرحمن الرحيم' : locale === 'fr' ? 'Au nom d\'Allah' : 'In the name of Allah'} ✨
            </span>
            {t('title')}
          </MotionBox>
          
          <MotionBox
          as='p' 
            className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('subtitle')}
          </MotionBox>

          {/* CTA Buttons */}
          <MotionBox 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href={`/${locale}/packages`}
              className="group flex items-center space-x-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
            >
              <span className="text-lg">{t('cta')}</span>
              <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
            
            <button className="group flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
              <Play className="w-5 h-5" />
              <span className="text-lg">{t('learn_more')}</span>
            </button>
          </MotionBox>

          {/* Stats */}
          <MotionBox 
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4">
                <Users className="w-8 h-8 text-gold-300" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-white/80">Happy Pilgrims</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4">
                <MapPin className="w-8 h-8 text-gold-300" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-white/80">Destinations</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4">
                <Star className="w-8 h-8 text-gold-300 fill-current" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">4.9</div>
              <div className="text-white/80">Rating</div>
            </div>
          </MotionBox>
        </div>
      </div>

      {/* Scroll Indicator */}
      <MotionBox 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </MotionBox>
    </section>
  );
}