'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { 
  Package, 
  Save, 
  Eye, 
  ArrowLeft,
  Plus,
  Trash2,
  Building,
  Plane,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Star,
  Clock,
  Utensils,
  Car,
  Shield,
  Camera,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PackageForm {
  name: {
    en: string;
    fr: string;
    ar: string;
  };
  description: {
    en: string;
    fr: string;
    ar: string;
  };
  duration: number;
  basePrice: number;
  maxPilgrims: number;
  category: 'budget' | 'standard' | 'premium' | 'luxury';
  hotels: {
    makkah: {
      name: string;
      rating: number;
      nights: number;
      roomType: string;
    };
    madinah: {
      name: string;
      rating: number;
      nights: number;
      roomType: string;
    };
  };
  transport: {
    flights: boolean;
    airportTransfer: boolean;
    intercityTransport: boolean;
    localTransport: boolean;
  };
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    specialDiets: boolean;
  };
  services: {
    visa: boolean;
    guide: boolean;
    ziyarat: boolean;
    laundry: boolean;
    wifi: boolean;
    medical: boolean;
  };
  itinerary: {
    day: number;
    title: {
      en: string;
      fr: string;
      ar: string;
    };
    description: {
      en: string;
      fr: string;
      ar: string;
    };
    location: string;
    activities: string[];
  }[];
}

export default function PackageBuilderPage() {
  const t = useTranslations('dashboard');
  const [currentStep, setCurrentStep] = useState(1);
  const [packageForm, setPackageForm] = useState<PackageForm>({
    name: { en: '', fr: '', ar: '' },
    description: { en: '', fr: '', ar: '' },
    duration: 7,
    basePrice: 1500,
    maxPilgrims: 40,
    category: 'standard',
    hotels: {
      makkah: { name: '', rating: 4, nights: 4, roomType: 'double' },
      madinah: { name: '', rating: 4, nights: 3, roomType: 'double' }
    },
    transport: {
      flights: true,
      airportTransfer: true,
      intercityTransport: true,
      localTransport: true
    },
    meals: {
      breakfast: true,
      lunch: true,
      dinner: true,
      specialDiets: false
    },
    services: {
      visa: true,
      guide: true,
      ziyarat: true,
      laundry: false,
      wifi: true,
      medical: false
    },
    itinerary: []
  });

  const steps = [
    { id: 1, name: 'Informations de base', icon: Package },
    { id: 2, name: 'Hébergement', icon: Building },
    { id: 3, name: 'Transport', icon: Plane },
    { id: 4, name: 'Services', icon: Shield },
    { id: 5, name: 'Itinéraire', icon: MapPin },
    { id: 6, name: 'Tarification', icon: DollarSign },
    { id: 7, name: 'Aperçu', icon: Eye }
  ];

  const addItineraryDay = () => {
    setPackageForm(prev => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          day: prev.itinerary.length + 1,
          title: { en: '', fr: '', ar: '' },
          description: { en: '', fr: '', ar: '' },
          location: '',
          activities: []
        }
      ]
    }));
  };

  const removeItineraryDay = (index: number) => {
    setPackageForm(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  const calculateTotalPrice = () => {
    let total = packageForm.basePrice;
    
    // Add hotel costs
    total += (packageForm.hotels.makkah.rating * 50 * packageForm.hotels.makkah.nights);
    total += (packageForm.hotels.madinah.rating * 50 * packageForm.hotels.madinah.nights);
    
    // Add service costs
    if (packageForm.services.guide) total += 200;
    if (packageForm.services.ziyarat) total += 150;
    if (packageForm.services.medical) total += 100;
    if (packageForm.services.laundry) total += 50;
    
    return total;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Informations de base</h3>
            
            {/* Package Names */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Nom (Anglais)
                </label>
                <input
                  type="text"
                  value={packageForm.name.en}
                  onChange={(e) => setPackageForm(prev => ({
                    ...prev,
                    name: { ...prev.name, en: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Premium Umrah Experience"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Nom (Français)
                </label>
                <input
                  type="text"
                  value={packageForm.name.fr}
                  onChange={(e) => setPackageForm(prev => ({
                    ...prev,
                    name: { ...prev.name, fr: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Expérience Omra Premium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Nom (Arabe)
                </label>
                <input
                  type="text"
                  value={packageForm.name.ar}
                  onChange={(e) => setPackageForm(prev => ({
                    ...prev,
                    name: { ...prev.name, ar: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
                  placeholder="تجربة العمرة المميزة"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Durée (jours)
                </label>
                <input
                  type="number"
                  value={packageForm.duration}
                  onChange={(e) => setPackageForm(prev => ({
                    ...prev,
                    duration: parseInt(e.target.value)
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="3"
                  max="30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Max Pèlerins
                </label>
                <input
                  type="number"
                  value={packageForm.maxPilgrims}
                  onChange={(e) => setPackageForm(prev => ({
                    ...prev,
                    maxPilgrims: parseInt(e.target.value)
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="10"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Star className="w-4 h-4 inline mr-1" />
                  Catégorie
                </label>
                <select
                  value={packageForm.category}
                  onChange={(e) => setPackageForm(prev => ({
                    ...prev,
                    category: e.target.value as any
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="budget">Budget</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="luxury">Luxe</option>
                </select>
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Français)</label>
                <textarea
                  value={packageForm.description.fr}
                  onChange={(e) => setPackageForm(prev => ({
                    ...prev,
                    description: { ...prev.description, fr: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Description détaillée du package..."
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Hébergement</h3>
            
            {/* Makkah Hotel */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2 text-emerald-600" />
                Hôtel à Makkah
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'hôtel</label>
                  <input
                    type="text"
                    value={packageForm.hotels.makkah.name}
                    onChange={(e) => setPackageForm(prev => ({
                      ...prev,
                      hotels: {
                        ...prev.hotels,
                        makkah: { ...prev.hotels.makkah, name: e.target.value }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Hilton Makkah Convention Hotel"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Étoiles</label>
                  <select
                    value={packageForm.hotels.makkah.rating}
                    onChange={(e) => setPackageForm(prev => ({
                      ...prev,
                      hotels: {
                        ...prev.hotels,
                        makkah: { ...prev.hotels.makkah, rating: parseInt(e.target.value) }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value={3}>3 étoiles</option>
                    <option value={4}>4 étoiles</option>
                    <option value={5}>5 étoiles</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nuits</label>
                  <input
                    type="number"
                    value={packageForm.hotels.makkah.nights}
                    onChange={(e) => setPackageForm(prev => ({
                      ...prev,
                      hotels: {
                        ...prev.hotels,
                        makkah: { ...prev.hotels.makkah, nights: parseInt(e.target.value) }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type de chambre</label>
                  <select
                    value={packageForm.hotels.makkah.roomType}
                    onChange={(e) => setPackageForm(prev => ({
                      ...prev,
                      hotels: {
                        ...prev.hotels,
                        makkah: { ...prev.hotels.makkah, roomType: e.target.value }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="single">Simple</option>
                    <option value="double">Double</option>
                    <option value="triple">Triple</option>
                    <option value="quad">Quadruple</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Madinah Hotel */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2 text-blue-600" />
                Hôtel à Madinah
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'hôtel</label>
                  <input
                    type="text"
                    value={packageForm.hotels.madinah.name}
                    onChange={(e) => setPackageForm(prev => ({
                      ...prev,
                      hotels: {
                        ...prev.hotels,
                        madinah: { ...prev.hotels.madinah, name: e.target.value }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Pullman Zamzam Madina"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Étoiles</label>
                  <select
                    value={packageForm.hotels.madinah.rating}
                    onChange={(e) => setPackageForm(prev => ({
                      ...prev,
                      hotels: {
                        ...prev.hotels,
                        madinah: { ...prev.hotels.madinah, rating: parseInt(e.target.value) }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value={3}>3 étoiles</option>
                    <option value={4}>4 étoiles</option>
                    <option value={5}>5 étoiles</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nuits</label>
                  <input
                    type="number"
                    value={packageForm.hotels.madinah.nights}
                    onChange={(e) => setPackageForm(prev => ({
                      ...prev,
                      hotels: {
                        ...prev.hotels,
                        madinah: { ...prev.hotels.madinah, nights: parseInt(e.target.value) }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type de chambre</label>
                  <select
                    value={packageForm.hotels.madinah.roomType}
                    onChange={(e) => setPackageForm(prev => ({
                      ...prev,
                      hotels: {
                        ...prev.hotels,
                        madinah: { ...prev.hotels.madinah, roomType: e.target.value }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="single">Simple</option>
                    <option value="double">Double</option>
                    <option value="triple">Triple</option>
                    <option value="quad">Quadruple</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Tarification</h3>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Prix de base</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prix par personne ($)</label>
                      <input
                        type="number"
                        value={packageForm.basePrice}
                        onChange={(e) => setPackageForm(prev => ({
                          ...prev,
                          basePrice: parseInt(e.target.value)
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        min="500"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Prix calculé</h4>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Prix de base:</span>
                        <span className="text-sm font-medium">${packageForm.basePrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Hôtels:</span>
                        <span className="text-sm font-medium">
                          ${(packageForm.hotels.makkah.rating * 50 * packageForm.hotels.makkah.nights) + 
                            (packageForm.hotels.madinah.rating * 50 * packageForm.hotels.madinah.nights)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Services:</span>
                        <span className="text-sm font-medium">
                          ${(packageForm.services.guide ? 200 : 0) + 
                            (packageForm.services.ziyarat ? 150 : 0) + 
                            (packageForm.services.medical ? 100 : 0)}
                        </span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-900">Total:</span>
                          <span className="font-bold text-purple-600 text-lg">${calculateTotalPrice()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Aperçu du Package</h3>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{packageForm.name.fr}</h4>
                  <p className="text-gray-600 mb-4">{packageForm.description.fr}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{packageForm.duration} jours</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">Max {packageForm.maxPilgrims} pèlerins</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-gray-400" />
                      <span className="text-sm capitalize">{packageForm.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    ${calculateTotalPrice()}
                  </div>
                  <div className="text-sm text-gray-500">par personne</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h5 className="font-medium text-gray-900 mb-3">Hébergement</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-emerald-600" />
                    <div>
                      <div className="font-medium">{packageForm.hotels.makkah.name || 'Hôtel Makkah'}</div>
                      <div className="text-sm text-gray-500">
                        {packageForm.hotels.makkah.rating} étoiles • {packageForm.hotels.makkah.nights} nuits
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">{packageForm.hotels.madinah.name || 'Hôtel Madinah'}</div>
                      <div className="text-sm text-gray-500">
                        {packageForm.hotels.madinah.rating} étoiles • {packageForm.hotels.madinah.nights} nuits
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Étape en cours de développement...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Constructeur de Package</h1>
              <p className="text-gray-600 mt-1">Créez un nouveau package Omra personnalisé</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Eye className="w-4 h-4" />
              <span>Aperçu</span>
            </button>
            <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              <Save className="w-4 h-4" />
              <span>Sauvegarder</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Steps Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Étapes</h3>
              <nav className="space-y-2">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      currentStep === step.id
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{step.name}</span>
                  </button>
                ))}
              </nav>
              
              {/* Progress */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progression</span>
                  <span className="text-sm text-gray-500">{Math.round((currentStep / steps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Précédent</span>
                </button>
                
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    Sauvegarder brouillon
                  </button>
                  <button
                    onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                    disabled={currentStep === steps.length}
                    className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{currentStep === steps.length ? 'Terminer' : 'Suivant'}</span>
                    {currentStep < steps.length && <ArrowLeft className="w-4 h-4 rotate-180" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}