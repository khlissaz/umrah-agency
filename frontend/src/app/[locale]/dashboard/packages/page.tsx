'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { 
  Package, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  Building,
  Plane,
  Utensils,
  Copy,
  Settings
} from 'lucide-react';
import { MotionBox } from '@/components/ui/MotionBox';

interface UmrahPackage {
  id: string;
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
  includes: string[];
  status: 'draft' | 'active' | 'inactive' | 'archived';
  hotels: {
    makkah: string;
    madinah: string;
  };
  rating: number;
  bookingsCount: number;
  revenue: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function PackagesPage() {
  const t = useTranslations('dashboard');
  const [packages, setPackages] = useState<UmrahPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPackages([
        {
          id: 'PKG-2024-001',
          name: {
            en: 'Premium Umrah Experience',
            fr: 'Expérience Omra Premium',
            ar: 'تجربة العمرة المميزة'
          },
          description: {
            en: 'Luxury Umrah package with 5-star accommodations and premium services',
            fr: 'Package Omra de luxe avec hébergements 5 étoiles et services premium',
            ar: 'باقة عمرة فاخرة مع إقامة 5 نجوم وخدمات مميزة'
          },
          duration: 10,
          basePrice: 2500,
          maxPilgrims: 40,
          includes: ['5-Star Hotels', 'Private Transportation', 'Personal Guide', 'Premium Meals', 'Ziyarat Tours'],
          status: 'active',
          hotels: {
            makkah: 'Hilton Makkah Convention Hotel',
            madinah: 'Pullman Zamzam Madina'
          },
          rating: 4.8,
          bookingsCount: 156,
          revenue: 390000,
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-02-15')
        },
        {
          id: 'PKG-2024-002',
          name: {
            en: 'Essential Umrah Journey',
            fr: 'Voyage Omra Essentiel',
            ar: 'رحلة العمرة الأساسية'
          },
          description: {
            en: 'Affordable Umrah package with comfortable accommodations and essential services',
            fr: 'Package Omra abordable avec hébergements confortables et services essentiels',
            ar: 'باقة عمرة ميسورة مع إقامة مريحة وخدمات أساسية'
          },
          duration: 7,
          basePrice: 1200,
          maxPilgrims: 50,
          includes: ['3-Star Hotels', 'Group Transportation', 'Guided Tours', 'Meals', 'Visa Processing'],
          status: 'active',
          hotels: {
            makkah: 'Makkah Towers',
            madinah: 'Madinah Hilton'
          },
          rating: 4.5,
          bookingsCount: 234,
          revenue: 280800,
          createdAt: new Date('2024-01-05'),
          updatedAt: new Date('2024-02-10')
        },
        {
          id: 'PKG-2024-003',
          name: {
            en: 'Family Umrah Package',
            fr: 'Package Omra Familial',
            ar: 'باقة العمرة العائلية'
          },
          description: {
            en: 'Family-friendly Umrah package with special activities for children',
            fr: 'Package Omra familial avec activités spéciales pour enfants',
            ar: 'باقة عمرة عائلية مع أنشطة خاصة للأطفال'
          },
          duration: 14,
          basePrice: 1800,
          maxPilgrims: 30,
          includes: ['Family Rooms', 'Kids Activities', 'Flexible Schedule', 'Medical Support', 'Educational Tours'],
          status: 'draft',
          hotels: {
            makkah: 'Swissotel Makkah',
            madinah: 'Crowne Plaza Madinah'
          },
          rating: 4.6,
          bookingsCount: 89,
          revenue: 160200,
          createdAt: new Date('2024-02-01'),
          updatedAt: new Date('2024-02-20')
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'archived': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'draft': return <Clock className="w-4 h-4" />;
      case 'inactive': return <AlertCircle className="w-4 h-4" />;
      case 'archived': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.name.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.name.ar.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter;
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'budget' && pkg.basePrice < 1500) ||
                        (priceFilter === 'mid' && pkg.basePrice >= 1500 && pkg.basePrice < 2000) ||
                        (priceFilter === 'premium' && pkg.basePrice >= 2000);
    return matchesSearch && matchesStatus && matchesPrice;
  });

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackages(prev => 
      prev.includes(packageId) 
        ? prev.filter(id => id !== packageId)
        : [...prev, packageId]
    );
  };

  const handleSelectAll = () => {
    setSelectedPackages(
      selectedPackages.length === filteredPackages.length 
        ? [] 
        : filteredPackages.map(p => p.id)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Package className="w-8 h-8 mr-3 text-purple-600" />
              Packages Omra
            </h1>
            <p className="text-gray-600 mt-1">Créer et gérer les packages de voyage Omra</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Settings className="w-4 h-4" />
              <span>Templates</span>
            </button>
            <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Nouveau Package</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Packages</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{packages.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Actifs</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {packages.filter(p => p.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Réservations</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {packages.reduce((sum, p) => sum + p.bookingsCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${packages.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher des packages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="draft">Brouillon</option>
                <option value="inactive">Inactif</option>
                <option value="archived">Archivé</option>
              </select>

              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Tous les prix</option>
                <option value="budget">Budget (&lt; $1500)</option>
                <option value="mid">Moyen ($1500-$2000)</option>
                <option value="premium">Premium (&gt; $2000)</option>
              </select>
              
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Plus de filtres</span>
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedPackages.length > 0 && (
            <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-purple-700">
                  {selectedPackages.length} package(s) sélectionné(s)
                </span>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors">
                    Activer
                  </button>
                  <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors">
                    Désactiver
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                    Dupliquer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPackages.map((pkg, index) => (
            <MotionBox
              key={pkg.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Card Header */}
              <div className="relative p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedPackages.includes(pkg.id)}
                      onChange={() => handleSelectPackage(pkg.id)}
                      className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{pkg.name.fr}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{pkg.description.fr}</p>
                      
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}>
                        {getStatusIcon(pkg.status)}
                        <span className="capitalize">{pkg.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Price & Duration */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-2xl font-bold text-gray-900">${pkg.basePrice}</span>
                      <span className="text-sm text-gray-500">/ personne</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{pkg.duration} jours</span>
                    </div>
                  </div>

                  {/* Rating & Bookings */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900">{pkg.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{pkg.bookingsCount} réservations</span>
                    </div>
                  </div>

                  {/* Hotels */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Makkah:</span>
                      <span className="font-medium text-gray-900">{pkg.hotels.makkah}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Madinah:</span>
                      <span className="font-medium text-gray-900">{pkg.hotels.madinah}</span>
                    </div>
                  </div>

                  {/* Includes */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Inclus:</h4>
                    <div className="flex flex-wrap gap-1">
                      {pkg.includes.slice(0, 3).map((item, i) => (
                        <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          {item}
                        </span>
                      ))}
                      {pkg.includes.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{pkg.includes.length - 3} plus
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Revenue */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Revenus générés:</span>
                      <span className="font-semibold text-green-600">${pkg.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Mis à jour {pkg.updatedAt.toLocaleDateString()}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </MotionBox>
          ))}
        </div>

        {/* Empty State */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun package trouvé</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all' || priceFilter !== 'all'
                ? 'Essayez d\'ajuster vos filtres de recherche' 
                : 'Créez votre premier package Omra pour commencer'
              }
            </p>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Créer un Package
            </button>
          </div>
        )}
      </div>
    </div>
  );
}