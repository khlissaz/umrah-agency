'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Calendar, Users, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export function Packages() {
  const t = useTranslations('packages');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const packages = [
    {
      id: 'essential',
      name: t('essential'),
      description: 'Perfect for first-time pilgrims with essential services and comfortable accommodations',
      duration: 7,
      price: 1200,
      includes: ['Accommodation', 'Transportation', 'Guided Tours', 'Visa Processing'],
      popular: false
    },
    {
      id: 'premium',
      name: t('premium'),
      description: 'Enhanced experience with luxury accommodations and exclusive services',
      duration: 10,
      price: 2500,
      includes: ['5-Star Hotels', 'Private Transportation', 'Personal Guide', 'Premium Meals'],
      popular: true
    },
    {
      id: 'family',
      name: t('family'),
      description: 'Special packages designed for families with children-friendly services',
      duration: 14,
      price: 1800,
      includes: ['Family Rooms', 'Kids Activities', 'Flexible Schedule', 'Medical Support'],
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-white">
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              // className={`relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
              //   pkg.popular ? 'lg:scale-105 border-primary-200' : ''
              // }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-6 -right-12 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-12 py-2 text-sm font-bold transform rotate-45 shadow-lg">
                  Popular
                </div>
              )}

              {/* Header */}
              <div className="relative p-8 pb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-600/5"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {pkg.description}
                  </p>
                  
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-primary-600">${pkg.price}</span>
                    <span className="text-gray-500 ml-2">{t('per_person')}</span>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{pkg.duration} {t('days')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Max 40</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="px-8 pb-8">
                <div className="space-y-4 mb-8">
                  {pkg.includes.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <Link
                    href={`/${locale}/packages/${pkg.id}/book`}
                    className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors group-hover:bg-primary-700 flex items-center justify-center space-x-2"
                  >
                    <span>{t('book_now')}</span>
                    <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                  
                  <Link
                    href={`/${locale}/packages/${pkg.id}`}
                    className="w-full text-primary-600 py-3 rounded-xl font-medium hover:bg-primary-50 transition-colors border border-primary-200 flex items-center justify-center"
                  >
                    {t('view_details')}
                  </Link>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-400/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary-400/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}