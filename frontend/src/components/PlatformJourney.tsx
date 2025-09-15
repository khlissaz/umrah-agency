import React from 'react';
import { FileText, Calendar, MapPin, Users, HeadphonesIcon, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const PlatformJourney: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const journeyPhases = [
    {
      phase: 'pre_journey',
      titleKey: 'platform.pre_journey',
      color: 'blue',
      icon: FileText,
      services: [
        { key: 'platform.visa_processing', icon: FileText },
        { key: 'platform.booking_management', icon: Calendar }
      ]
    },
    {
      phase: 'during_journey',
      titleKey: 'platform.during_journey',
      color: 'emerald',
      icon: MapPin,
      services: [
        { key: 'platform.ritual_guidance', icon: MapPin },
        { key: 'platform.field_operations', icon: Users }
      ]
    },
    {
      phase: 'post_journey',
      titleKey: 'platform.post_journey',
      color: 'purple',
      icon: HeadphonesIcon,
      services: [
        { key: 'platform.follow_up', icon: HeadphonesIcon }
      ]
    }
  ];

  const colorMap = {
    blue: { 
      bg: 'from-blue-500 to-blue-600', 
      light: 'bg-blue-50', 
      text: 'text-blue-600',
      border: 'border-blue-200'
    },
    emerald: { 
      bg: 'from-emerald-500 to-emerald-600', 
      light: 'bg-emerald-50', 
      text: 'text-emerald-600',
      border: 'border-emerald-200'
    },
    purple: { 
      bg: 'from-purple-500 to-purple-600', 
      light: 'bg-purple-50', 
      text: 'text-purple-600',
      border: 'border-purple-200'
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('platform.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('platform.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {journeyPhases.map((phase, index) => {
            const colors = colorMap[phase.color as keyof typeof colorMap];
            
            return (
              <div key={phase.phase} className="relative">
                {/* Connection Line */}
                {index < journeyPhases.length - 1 && (
                  <div className={`hidden lg:block absolute top-16 ${isRTL ? 'right-0' : 'left-full'} w-8 h-0.5 bg-gray-300 z-10`}>
                    <ArrowRight className={`absolute -top-2 ${isRTL ? 'left-0 rotate-180' : 'right-0'} w-4 h-4 text-gray-400`} />
                  </div>
                )}

                <div className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 ${colors.border} group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}>
                  {/* Phase Number */}
                  <div className={`absolute -top-4 ${isRTL ? 'right-8' : 'left-8'} w-8 h-8 rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center text-white font-bold text-sm`}>
                    {index + 1}
                  </div>

                  {/* Phase Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <phase.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Phase Title */}
                  <h3 className={`text-2xl font-bold mb-6 ${colors.text}`}>
                    {t(phase.titleKey)}
                  </h3>

                  {/* Services */}
                  <div className="space-y-4">
                    {phase.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className={`flex items-center space-x-4 p-4 rounded-xl ${colors.light} border ${colors.border} group-hover:shadow-md transition-all duration-300`}>
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                          <service.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${colors.text}`}>
                            {t(service.key)}
                          </h4>
                        </div>
                        <CheckCircle className={`w-5 h-5 ${colors.text}`} />
                      </div>
                    ))}
                  </div>

                  {/* Background Pattern */}
                  <div className="absolute inset-0 rounded-3xl opacity-5">
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-3xl`}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* User Types Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">المعتمرون</h3>
            <p className="text-gray-600 text-sm">واجهة سهلة للحجز والمتابعة</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">قادة المجموعات</h3>
            <p className="text-gray-600 text-sm">أدوات إدارة المجموعات المتقدمة</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">فريق الوكالة</h3>
            <p className="text-gray-600 text-sm">لوحة تحكم شاملة للإدارة</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">المزودون المحليون</h3>
            <p className="text-gray-600 text-sm">تكامل مع مقدمي الخدمات</p>
          </div>
        </div>
      </div>
    </section>
  );
};