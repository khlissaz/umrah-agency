'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Compass, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href={`/${locale}`} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">OmraGency</h3>
                <p className="text-sm text-gray-400">Spiritual Journeys</p>
              </div>
            </Link>
            
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner for spiritual journeys to the holy cities of Makkah and Madinah. We provide comprehensive Umrah services with comfort, guidance, and peace of mind.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale}`} className="text-gray-400 hover:text-primary-400 transition-colors">{t('nav.home')}</Link></li>
              <li><Link href={`/${locale}/packages`} className="text-gray-400 hover:text-primary-400 transition-colors">{t('nav.packages')}</Link></li>
              <li><Link href={`/${locale}/services`} className="text-gray-400 hover:text-primary-400 transition-colors">{t('nav.services')}</Link></li>
              <li><Link href={`/${locale}/about`} className="text-gray-400 hover:text-primary-400 transition-colors">{t('nav.about')}</Link></li>
              <li><Link href={`/${locale}/contact`} className="text-gray-400 hover:text-primary-400 transition-colors">{t('nav.contact')}</Link></li>
              <li><Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href={`/${locale}/terms`} className="text-gray-400 hover:text-primary-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Visa Processing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Flight Booking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Hotel Accommodation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Transportation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Guided Tours</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">24/7 Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Group Packages</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">123 Islamic Center Street</p>
                  <p className="text-gray-400">Downtown, City 12345</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                  <p className="text-gray-400">+1 (555) 987-6543</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">info@omragency.com</p>
                  <p className="text-gray-400">support@omragency.com</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Certified & Licensed</p>
              <div className="flex space-x-2">
                <div className="bg-primary-600 text-white text-xs px-2 py-1 rounded">IATA</div>
                <div className="bg-primary-600 text-white text-xs px-2 py-1 rounded">Nusuk</div>
                <div className="bg-primary-600 text-white text-xs px-2 py-1 rounded">Licensed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 OmraGency. All rights reserved. Licensed travel agency specializing in Islamic pilgrimage services.
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>🇸🇦 Official Nusuk Partner</span>
              <span>🛡️ Secure & Trusted</span>
              <span>🌍 Multilingual Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}