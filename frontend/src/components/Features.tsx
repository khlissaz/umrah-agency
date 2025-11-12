'use client';

import { useTranslations } from 'next-intl';
import { Shield, Heart, Star, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export function Features() {
  const t = useTranslations('features');

  const features = [
    {
      icon: Shield,
      titleKey: 'nusuk_title',
      descKey: 'nusuk_desc',
      color: 'emerald',
    },
    {
      icon: Heart,
      titleKey: 'guide_title',
      descKey: 'guide_desc',
      color: 'rose',
    },
    {
      icon: Star,
      titleKey: 'comfort_title',
      descKey: 'comfort_desc',
      color: 'gold',
    },
    {
      icon: Phone,
      titleKey: 'support_title',
      descKey: 'support_desc',
      color: 'blue',
    },
  ];

  const colorMap = {
    emerald: 'from-emerald-500 to-emerald-600',
    rose: 'from-rose-500 to-rose-600',
    gold: 'from-gold-500 to-gold-600',
    blue: 'from-blue-500 to-blue-600',
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          // className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              // className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 card-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 rounded-2xl opacity-5 islamic-pattern"></div>

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorMap[feature.color as keyof typeof colorMap]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                {t(feature.titleKey)}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {t(feature.descKey)}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}