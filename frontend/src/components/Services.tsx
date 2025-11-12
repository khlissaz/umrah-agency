'use client';

import { useTranslations } from 'next-intl';
import { Plane, Hotel, Car, MapPin, Shield, Utensils, Phone, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { MotionBox } from './ui/MotionBox';

export function Services() {
  const t = useTranslations();

  const services = [
    {
      icon: Shield,
      title: 'Visa Processing',
      description: 'Complete visa assistance with Nusuk platform integration for hassle-free applications',
      color: 'emerald'
    },
    {
      icon: Plane,
      title: 'Flight Booking',
      description: 'Best deals on flights with flexible options and group discounts',
      color: 'blue'
    },
    {
      icon: Hotel,
      title: 'Accommodation',
      description: 'Premium hotels near Haram with various comfort levels and amenities',
      color: 'purple'
    },
    {
      icon: Car,
      title: 'Transportation',
      description: 'Private and group transportation with experienced local drivers',
      color: 'orange'
    },
    {
      icon: Users,
      title: 'Group Management',
      description: 'Organized group activities and personalized attention for each pilgrim',
      color: 'rose'
    },
    {
      icon: MapPin,
      title: 'Guided Tours',
      description: 'Expert guides for Ziyarat and historical site visits in Makkah and Madinah',
      color: 'teal'
    },
    {
      icon: Utensils,
      title: 'Halal Meals',
      description: 'Delicious halal meals with local and international cuisine options',
      color: 'amber'
    },
    {
      icon: Phone,
      title: '24/7 Support',
      description: 'Round-the-clock assistance in multiple languages throughout your journey',
      color: 'indigo'
    }
  ];

  const colorMap = {
    emerald: { bg: 'from-emerald-500 to-emerald-600', light: 'emerald-50', text: 'emerald-600' },
    blue: { bg: 'from-blue-500 to-blue-600', light: 'blue-50', text: 'blue-600' },
    purple: { bg: 'from-purple-500 to-purple-600', light: 'purple-50', text: 'purple-600' },
    orange: { bg: 'from-orange-500 to-orange-600', light: 'orange-50', text: 'orange-600' },
    rose: { bg: 'from-rose-500 to-rose-600', light: 'rose-50', text: 'rose-600' },
    teal: { bg: 'from-teal-500 to-teal-600', light: 'teal-50', text: 'teal-600' },
    amber: { bg: 'from-amber-500 to-amber-600', light: 'amber-50', text: 'amber-600' },
    indigo: { bg: 'from-indigo-500 to-indigo-600', light: 'indigo-50', text: 'indigo-600' }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionBox 
          // className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Complete Umrah Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From planning to completion, we handle every aspect of your spiritual journey with care and expertise
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto mt-6"></div>
        </MotionBox>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const colors = colorMap[service.color as keyof typeof colorMap];
            
            return (
              <MotionBox
                key={index}
                // className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className={`text-lg font-bold text-gray-900 mb-3 group-hover:text-${colors.text} transition-colors`}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </MotionBox>
            );
          })}
        </div>

        {/* Nusuk Integration Highlight */}
        <MotionBox 
          // className="mt-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 islamic-pattern opacity-30"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Official Nusuk Integration</h3>
                  <p className="text-primary-100">Authorized Partner</p>
                </div>
              </div>
              
              <p className="text-lg text-primary-100 mb-8 leading-relaxed">
                We're proud to be an official partner of Nusuk, Saudi Arabia's unified platform for pilgrimage and visit services. This partnership ensures seamless, authentic, and government-approved services for your sacred journey.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-1">100%</div>
                  <div className="text-primary-100 text-sm">Official Compliance</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-1">24/7</div>
                  <div className="text-primary-100 text-sm">Platform Support</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
                    <span className="text-primary-100">Real-time visa processing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
                    <span className="text-primary-100">Direct hotel bookings</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
                    <span className="text-primary-100">Integrated transportation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
                    <span className="text-primary-100">Authenticated services</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionBox>
      </div>
    </section>
  );
}