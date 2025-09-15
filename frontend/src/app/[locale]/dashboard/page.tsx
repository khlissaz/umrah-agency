'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { 
  Users, 
  Package, 
  CreditCard, 
  TrendingUp, 
  Calendar,
  MapPin,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  UserCheck,
  Building,
  Plane
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardStats {
  totalPilgrims: number;
  activeGroups: number;
  totalRevenue: number;
  pendingBookings: number;
  nusukIntegrationStatus: 'connected' | 'disconnected' | 'error';
  recentActivities: Activity[];
}

interface Activity {
  id: string;
  type: 'booking' | 'payment' | 'visa' | 'group';
  message: string;
  timestamp: Date;
  status: 'success' | 'pending' | 'error';
}

export default function AdminDashboard() {
  const t = useTranslations('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalPilgrims: 1247,
        activeGroups: 23,
        totalRevenue: 2847500,
        pendingBookings: 15,
        nusukIntegrationStatus: 'connected',
        recentActivities: [
          {
            id: '1',
            type: 'booking',
            message: 'New group booking from Ahmed Al-Rashid (15 pilgrims)',
            timestamp: new Date(),
            status: 'success'
          },
          {
            id: '2',
            type: 'visa',
            message: 'Visa processing completed for Group #G-2024-001',
            timestamp: new Date(Date.now() - 3600000),
            status: 'success'
          },
          {
            id: '3',
            type: 'payment',
            message: 'Payment received: $12,500 from Group #G-2024-003',
            timestamp: new Date(Date.now() - 7200000),
            status: 'success'
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    {
      title: t('pilgrims'),
      value: stats?.totalPilgrims || 0,
      icon: Users,
      color: 'emerald',
      change: '+12%'
    },
    {
      title: t('groups'),
      value: stats?.activeGroups || 0,
      icon: Package,
      color: 'blue',
      change: '+8%'
    },
    {
      title: 'Revenue',
      value: `$${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'purple',
      change: '+23%'
    },
    {
      title: t('bookings'),
      value: stats?.pendingBookings || 0,
      icon: Calendar,
      color: 'orange',
      change: '+5%'
    }
  ];

  const colorMap = {
    emerald: { bg: 'from-emerald-500 to-emerald-600', light: 'bg-emerald-50', text: 'text-emerald-600' },
    blue: { bg: 'from-blue-500 to-blue-600', light: 'bg-blue-50', text: 'text-blue-600' },
    purple: { bg: 'from-purple-500 to-purple-600', light: 'bg-purple-50', text: 'text-purple-600' },
    orange: { bg: 'from-orange-500 to-orange-600', light: 'bg-orange-50', text: 'text-orange-600' }
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
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('welcome')}</h1>
              <p className="text-gray-600 mt-1">Manage your Umrah operations efficiently</p>
            </div>
            
            {/* Nusuk Status */}
            <div className="flex items-center space-x-3">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                stats?.nusukIntegrationStatus === 'connected' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Nusuk {stats?.nusukIntegrationStatus === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => {
            const colors = colorMap[card.color as keyof typeof colorMap];
            return (
              <motion.div
                key={card.title}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                    <p className="text-sm text-emerald-600 mt-1">{card.change} from last month</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {stats?.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.status === 'success' ? 'bg-emerald-100' :
                        activity.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                      }`}>
                        {activity.status === 'success' && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                        {activity.status === 'pending' && <Clock className="w-4 h-4 text-yellow-600" />}
                        {activity.status === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Nusuk Integration Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-emerald-600" />
                  Nusuk Integration
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Status</span>
                  <span className="text-sm font-medium text-emerald-600">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Sync</span>
                  <span className="text-sm text-gray-900">2 minutes ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Visa Requests</span>
                  <span className="text-sm text-gray-900">47 pending</span>
                </div>
                <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
                  Sync with Nusuk
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Create New Group</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Package className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">Add Package</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Building className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium">Manage Hotels</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Plane className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium">Flight Bookings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}