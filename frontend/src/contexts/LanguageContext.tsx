import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.packages': 'Packages',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Dashboard',
    'nav.login': 'Login',
    'nav.register': 'Register',
    
    // Hero Section
    'hero.title': 'Your Spiritual Journey Begins Here',
    'hero.subtitle': 'Complete integrated platform for group Umrah journeys with official Nusuk services and certified local providers',
    'hero.cta': 'Explore Packages',
    'hero.learn_more': 'Learn More',
    
    // Features
    'features.title': 'Why Choose Our Omra Services',
    'features.nusuk_title': 'Official Nusuk Integration',
    'features.nusuk_desc': 'Direct integration with Saudi Arabia\'s official platform',
    'features.guide_title': 'Expert Guidance',
    'features.guide_desc': 'Experienced guides for all rituals and visits',
    'features.comfort_title': 'Premium Comfort',
    'features.comfort_desc': 'Carefully selected accommodations near Haram',
    'features.support_title': '24/7 Support',
    'features.support_desc': 'Round-the-clock assistance throughout your journey',
    
    // Packages
    'packages.title': 'Omra Packages',
    'packages.subtitle': 'Choose from our carefully crafted spiritual journey packages',
    'packages.days': 'days',
    'packages.from': 'From',
    'packages.per_person': 'per person',
    'packages.book_now': 'Book Now',
    'packages.view_details': 'View Details',
    
    // Platform Features
    'platform.title': 'Complete Umrah Management Platform',
    'platform.subtitle': 'From visa to post-journey support - everything in one place',
    'platform.pre_journey': 'Pre-Journey',
    'platform.during_journey': 'During Journey',
    'platform.post_journey': 'Post-Journey',
    'platform.visa_processing': 'Visa & Documentation',
    'platform.booking_management': 'Booking Management',
    'platform.ritual_guidance': 'Ritual Guidance',
    'platform.field_operations': 'Field Operations',
    'platform.follow_up': 'Follow-up Support',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.packages': 'Forfaits',
    'nav.services': 'Services',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Tableau de Bord',
    'nav.login': 'Connexion',
    'nav.register': 'S\'inscrire',
    
    // Hero Section
    'hero.title': 'Votre Voyage Spirituel Commence Ici',
    'hero.subtitle': 'Plateforme intégrée complète pour les voyages Omra de groupe avec services Nusuk officiels et fournisseurs locaux certifiés',
    'hero.cta': 'Explorer les Forfaits',
    'hero.learn_more': 'En Savoir Plus',
    
    // Features
    'features.title': 'Pourquoi Choisir Nos Services Omra',
    'features.nusuk_title': 'Intégration Officielle Nusuk',
    'features.nusuk_desc': 'Intégration directe avec la plateforme officielle d\'Arabie Saoudite',
    'features.guide_title': 'Guidance Expert',
    'features.guide_desc': 'Guides expérimentés pour tous les rituels et visites',
    'features.comfort_title': 'Confort Premium',
    'features.comfort_desc': 'Hébergements soigneusement sélectionnés près du Haram',
    'features.support_title': 'Support 24/7',
    'features.support_desc': 'Assistance continue tout au long de votre voyage',
    
    // Packages
    'packages.title': 'Forfaits Omra',
    'packages.subtitle': 'Choisissez parmi nos forfaits de voyage spirituel soigneusement élaborés',
    'packages.days': 'jours',
    'packages.from': 'À partir de',
    'packages.per_person': 'par personne',
    'packages.book_now': 'Réserver',
    'packages.view_details': 'Voir Détails',
    
    // Platform Features
    'platform.title': 'Plateforme Complète de Gestion Omra',
    'platform.subtitle': 'Du visa au support post-voyage - tout en un seul endroit',
    'platform.pre_journey': 'Pré-Voyage',
    'platform.during_journey': 'Pendant le Voyage',
    'platform.post_journey': 'Post-Voyage',
    'platform.visa_processing': 'Visa et Documentation',
    'platform.booking_management': 'Gestion des Réservations',
    'platform.ritual_guidance': 'Guide des Rituels',
    'platform.field_operations': 'Opérations Terrain',
    'platform.follow_up': 'Support de Suivi',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur survenue',
    'common.success': 'Succès',
    'common.cancel': 'Annuler',
    'common.save': 'Sauvegarder',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.view': 'Voir',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.packages': 'الباقات',
    'nav.services': 'الخدمات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.dashboard': 'لوحة التحكم',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'التسجيل',
    
    // Hero Section
    'hero.title': 'رحلتك الروحانية تبدأ من هنا',
    'hero.subtitle': 'منصة متكاملة شاملة لرحلات العمرة الجماعية مع خدمات نُسُك الرسمية ومقدمي الخدمات المحليين المعتمدين',
    'hero.cta': 'استكشف الباقات',
    'hero.learn_more': 'اعرف المزيد',
    
    // Features
    'features.title': 'لماذا تختار خدمات العمرة لدينا',
    'features.nusuk_title': 'التكامل الرسمي مع نُسُك',
    'features.nusuk_desc': 'التكامل المباشر مع المنصة الرسمية للمملكة العربية السعودية',
    'features.guide_title': 'الإرشاد المتخصص',
    'features.guide_desc': 'مرشدون خبراء لجميع المناسك والزيارات',
    'features.comfort_title': 'الراحة المتميزة',
    'features.comfort_desc': 'أماكن إقامة مختارة بعناية قريبة من الحرم',
    'features.support_title': 'الدعم على مدار الساعة',
    'features.support_desc': 'مساعدة مستمرة طوال رحلتك',
    
    // Packages
    'packages.title': 'باقات العمرة',
    'packages.subtitle': 'اختر من باقات الرحلة الروحانية المصممة بعناية',
    'packages.days': 'أيام',
    'packages.from': 'ابتداءً من',
    'packages.per_person': 'للشخص الواحد',
    'packages.book_now': 'احجز الآن',
    'packages.view_details': 'عرض التفاصيل',
    
    // Platform Features
    'platform.title': 'منصة إدارة العمرة المتكاملة',
    'platform.subtitle': 'من التأشيرة إلى الدعم اللاحق - كل شيء في مكان واحد',
    'platform.pre_journey': 'ما قبل الرحلة',
    'platform.during_journey': 'أثناء الرحلة',
    'platform.post_journey': 'ما بعد الرحلة',
    'platform.visa_processing': 'التأشيرة والوثائق',
    'platform.booking_management': 'إدارة الحجوزات',
    'platform.ritual_guidance': 'إرشاد المناسك',
    'platform.field_operations': 'العمليات الميدانية',
    'platform.follow_up': 'الدعم اللاحق',
    
    // Common
    'common.loading': 'جارٍ التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'عرض',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div className={isRTL ? 'rtl' : 'ltr'} dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};