'use client';

import React, { JSX } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Play, Star, Users, MapPin } from 'lucide-react';
import { MotionBox } from './ui/MotionBox';

export function Hero(): JSX.Element {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-emerald-800/80 to-emerald-600/70 z-10" />
        <img
          src="https://images.pexels.com/photos/4668228/pexels-photo-4668228.jpeg"
          alt="Kaaba and pilgrims during Umrah"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 z-20">
        <MotionBox
          variant="scalePulse"
          className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"
        />
        <MotionBox
          variant="scalePulse"
          delay={1}
          className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-300/10 rounded-full blur-2xl"
        />
        <MotionBox
          variant="float"
          delay={0.5}
          className="absolute top-1/2 left-1/4 w-20 h-20 bg-yellow-300/10 rounded-full blur-xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <MotionBox
            variant="fadeUp"
            className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8"
          >
            <Star className="w-4 h-4 text-yellow-300 fill-current" />
            <span className="text-white text-sm font-medium">{t('trusted_by')}</span>
            <Star className="w-4 h-4 text-yellow-300 fill-current" />
          </MotionBox>

          <MotionBox
            variant="fadeUp"
            delay={0.2}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {t('title')}
          </MotionBox>

          <MotionBox
            variant="fadeUp"
            delay={0.4}
            className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            {t('subtitle')}
          </MotionBox>

          {/* CTA Buttons */}
          <MotionBox
            variant="fadeUp"
            delay={0.6}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href={`/${locale}/packages`}
              className="group flex items-center space-x-3 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <span className="text-lg">{t('cta')}</span>
              <ArrowRight
                className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`}
              />
            </Link>

            <button className="group flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300">
              <Play className="w-5 h-5" />
              <span className="text-lg">{t('learn_more')}</span>
            </button>
          </MotionBox>

          {/* Stats */}
          <MotionBox
            variant="fadeUp"
            delay={0.8}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { icon: Users, value: '10,000+', label: 'Happy Pilgrims' },
              { icon: MapPin, value: '50+', label: 'Destinations' },
              { icon: Star, value: '4.9', label: 'Rating', filled: true },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4">
                  <item.icon className={`w-8 h-8 text-white ${item.filled ? 'fill-current' : ''}`} />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{item.value}</div>
                <div className="text-white/80">{item.label}</div>
              </div>
            ))}
          </MotionBox>
        </div>
      </div>

      {/* Scroll Indicator */}
      <MotionBox
        variant="float"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </MotionBox>
    </section>
  );
}
