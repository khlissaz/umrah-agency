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
  AlertCircle
} from 'lucide-react';
import { MotionBox } from '@/components/ui/MotionBox';

interface Group {
  id: string;
  name: string;
  description: string;
  leaderId: string;
  leaderName: string;
  packageName: string;
  maxSize: number;
  currentSize: number;
  status: 'draft' | 'open' | 'full' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  departureDate: Date;
  returnDate: Date;
  createdAt: Date;
}

export default function GroupsPage() {
  const t = useTranslations('dashboard');
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGroups([
        {
          id: 'G-2024-001',
          name: 'Ramadan Umrah Group 2024',
          description: 'Special Ramadan Umrah package with extended stay',
          leaderId: 'user-1',
          leaderName: 'Ahmed Al-Rashid',
          packageName: 'Premium Umrah Package',
          maxSize: 40,
          currentSize: 35,
          status: 'confirmed',
          departureDate: new Date('2024-03-15'),
          returnDate: new Date('2024-03-25'),
          createdAt: new Date('2024-01-15')
        },
        {
          id: 'G-2024-002',
          name: 'Family Umrah Journey',
          description: 'Family-friendly Umrah with special activities for children',
          leaderId: 'user-2',
          leaderName: 'Fatima Hassan',
          packageName: 'Family Umrah Package',
          maxSize: 25,
          currentSize: 18,
          status: 'open',
          departureDate: new Date('2024-04-10'),
          returnDate: new Date('2024-04-20'),
          createdAt: new Date('2024-02-01')
        },
        {
          id: 'G-2024-003',
          name: 'Youth Umrah Adventure',
          description: 'Umrah program designed for young adults',
          leaderId: 'user-3',
          leaderName: 'Omar Khalil',
          packageName: 'Essential Umrah Package',
          maxSize: 30,
          currentSize: 12,
          status: 'open',
          departureDate: new Date('2024-05-05'),
          returnDate: new Date('2024-05-12'),
          createdAt: new Date('2024-02-15')
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700';
      case 'open': return 'bg-blue-100 text-blue-700';
      case 'full': return 'bg-purple-100 text-purple-700';
      case 'in_progress': return 'bg-orange-100 text-orange-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'open': return <Clock className="w-4 h-4" />;
      case 'full': return <Users className="w-4 h-4" />;
      case 'in_progress': return <MapPin className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.leaderName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || group.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
              <Users className="w-8 h-8 mr-3 text-blue-600" />
              {t('groups')}
            </h1>
            <p className="text-gray-600 mt-1">Manage Umrah groups and their members</p>
          </div>
          
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Create Group</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search groups or leaders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="open">Open</option>
                <option value="full">Full</option>
                <option value="confirmed">Confirmed</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGroups.map((group, index) => (
            <MotionBox
              key={group.id}
               className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{group.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                    
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(group.status)}`}>
                      {getStatusIcon(group.status)}
                      <span className="capitalize">{group.status.replace('_', ' ')}</span>
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
                  {/* Group Leader */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{group.leaderName}</p>
                      <p className="text-xs text-gray-500">Group Leader</p>
                    </div>
                  </div>

                  {/* Package */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{group.packageName}</p>
                      <p className="text-xs text-gray-500">Package</p>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Capacity</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {group.currentSize}/{group.maxSize}
                      </span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(group.currentSize / group.maxSize) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Departure</span>
                    <span className="font-medium text-gray-900">
                      {group.departureDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Created {group.createdAt.toLocaleDateString()}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
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
        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Create your first Umrah group to get started'
              }
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Create First Group
            </button>
          </div>
        )}
      </div>
    </div>
  );
}