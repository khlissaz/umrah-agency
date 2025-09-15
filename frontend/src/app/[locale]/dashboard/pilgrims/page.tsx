'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  Phone,
  Mail,
  FileText,
  Download,
  Upload,
  UserPlus
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Pilgrim {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  nationality: string;
  passportNumber: string;
  passportExpiry: Date;
  gender: 'male' | 'female';
  medicalConditions?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  groupId?: string;
  groupName?: string;
  status: 'pending' | 'approved' | 'visa_processing' | 'confirmed' | 'completed';
  createdAt: Date;
}

export default function PilgrimsPage() {
  const t = useTranslations('dashboard');
  const [pilgrims, setPilgrims] = useState<Pilgrim[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [selectedPilgrims, setSelectedPilgrims] = useState<string[]>([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPilgrims([
        {
          id: 'P-2024-001',
          name: 'Ahmed Al-Rashid',
          email: 'ahmed.rashid@email.com',
          phone: '+966501234567',
          dateOfBirth: new Date('1985-03-15'),
          nationality: 'Saudi Arabia',
          passportNumber: 'A12345678',
          passportExpiry: new Date('2026-03-15'),
          gender: 'male',
          medicalConditions: 'Diabetes',
          emergencyContact: {
            name: 'Fatima Al-Rashid',
            phone: '+966501234568',
            relationship: 'Wife'
          },
          groupId: 'G-2024-001',
          groupName: 'Ramadan Umrah Group 2024',
          status: 'confirmed',
          createdAt: new Date('2024-01-15')
        },
        {
          id: 'P-2024-002',
          name: 'Fatima Hassan',
          email: 'fatima.hassan@email.com',
          phone: '+33612345678',
          dateOfBirth: new Date('1990-07-22'),
          nationality: 'France',
          passportNumber: 'F87654321',
          passportExpiry: new Date('2025-12-10'),
          gender: 'female',
          emergencyContact: {
            name: 'Omar Hassan',
            phone: '+33612345679',
            relationship: 'Husband'
          },
          groupId: 'G-2024-002',
          groupName: 'Family Umrah Journey',
          status: 'visa_processing',
          createdAt: new Date('2024-02-01')
        },
        {
          id: 'P-2024-003',
          name: 'Omar Khalil',
          email: 'omar.khalil@email.com',
          phone: '+1234567890',
          dateOfBirth: new Date('1995-11-08'),
          nationality: 'United States',
          passportNumber: 'US123456789',
          passportExpiry: new Date('2027-05-20'),
          gender: 'male',
          emergencyContact: {
            name: 'Sarah Khalil',
            phone: '+1234567891',
            relationship: 'Sister'
          },
          status: 'pending',
          createdAt: new Date('2024-02-15')
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700';
      case 'approved': return 'bg-blue-100 text-blue-700';
      case 'visa_processing': return 'bg-orange-100 text-orange-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'visa_processing': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredPilgrims = pilgrims.filter(pilgrim => {
    const matchesSearch = pilgrim.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pilgrim.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pilgrim.passportNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pilgrim.status === statusFilter;
    const matchesGender = genderFilter === 'all' || pilgrim.gender === genderFilter;
    return matchesSearch && matchesStatus && matchesGender;
  });

  const handleSelectPilgrim = (pilgrimId: string) => {
    setSelectedPilgrims(prev => 
      prev.includes(pilgrimId) 
        ? prev.filter(id => id !== pilgrimId)
        : [...prev, pilgrimId]
    );
  };

  const handleSelectAll = () => {
    setSelectedPilgrims(
      selectedPilgrims.length === filteredPilgrims.length 
        ? [] 
        : filteredPilgrims.map(p => p.id)
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
              <Users className="w-8 h-8 mr-3 text-emerald-600" />
              {t('pilgrims')}
            </h1>
            <p className="text-gray-600 mt-1">Gérer les pèlerins et leurs informations</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Importer</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </button>
            <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              <UserPlus className="w-4 h-4" />
              <span>Ajouter Pèlerin</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pèlerins</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{pilgrims.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmés</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {pilgrims.filter(p => p.status === 'confirmed').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En Traitement</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {pilgrims.filter(p => p.status === 'visa_processing').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En Attente</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {pilgrims.filter(p => p.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
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
                  placeholder="Rechercher par nom, email ou passeport..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="approved">Approuvé</option>
                <option value="visa_processing">Traitement visa</option>
                <option value="confirmed">Confirmé</option>
                <option value="completed">Terminé</option>
              </select>

              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">Tous les genres</option>
                <option value="male">Homme</option>
                <option value="female">Femme</option>
              </select>
              
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Plus de filtres</span>
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedPilgrims.length > 0 && (
            <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-700">
                  {selectedPilgrims.length} pèlerin(s) sélectionné(s)
                </span>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition-colors">
                    Traitement par lot
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                    Exporter sélection
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pilgrims Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedPilgrims.length === filteredPilgrims.length && filteredPilgrims.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pèlerin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Passeport
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Groupe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPilgrims.map((pilgrim, index) => (
                  <motion.tr
                    key={pilgrim.id}
                    className="hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedPilgrims.includes(pilgrim.id)}
                        onChange={() => handleSelectPilgrim(pilgrim.id)}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{pilgrim.name}</div>
                          <div className="text-sm text-gray-500">
                            {pilgrim.gender === 'male' ? 'Homme' : 'Femme'} • {pilgrim.nationality}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {pilgrim.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {pilgrim.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{pilgrim.passportNumber}</div>
                      <div className="text-sm text-gray-500">
                        Exp: {pilgrim.passportExpiry.toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {pilgrim.groupName ? (
                        <div className="text-sm text-gray-900">{pilgrim.groupName}</div>
                      ) : (
                        <span className="text-sm text-gray-500 italic">Non assigné</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pilgrim.status)}`}>
                        {getStatusIcon(pilgrim.status)}
                        <span className="capitalize">{pilgrim.status.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredPilgrims.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun pèlerin trouvé</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all' || genderFilter !== 'all'
                ? 'Essayez d\'ajuster vos filtres de recherche' 
                : 'Ajoutez votre premier pèlerin pour commencer'
              }
            </p>
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              Ajouter un Pèlerin
            </button>
          </div>
        )}
      </div>
    </div>
  );
}