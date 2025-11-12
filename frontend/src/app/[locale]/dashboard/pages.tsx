'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Users, Package, DollarSign, Calendar, Shield, CheckCircle, Clock, AlertCircle, Building, Plane } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { MotionBox } from '@/components/ui/MotionBox';


interface Activity {
  id: string;
  type: 'booking' | 'payment' | 'visa' | 'group';
  message: string;
  timestamp: string;
  status: 'success' | 'pending' | 'error';
}

interface DashboardStats {
  totalPilgrims: number;
  activeGroups: number;
  totalRevenue: number;
  pendingBookings: number;
  nusukIntegrationStatus: 'connected' | 'disconnected' | 'error';
  recentActivities: Activity[];
}

export default function AdminDashboard() {
  const t = useTranslations('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Simulate API fetch — replace with your backend endpoint later
        const response = await fetch('/api/admin-dashboard');
        if (!response.ok) throw new Error('Failed to load');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { title: t('pilgrims'), value: stats?.totalPilgrims ?? 0, icon: Users, color: 'emerald', change: '+12%' },
    { title: t('groups'), value: stats?.activeGroups ?? 0, icon: Package, color: 'blue', change: '+8%' },
    { title: 'Revenue', value: `$${(stats?.totalRevenue ?? 0).toLocaleString()}`, icon: DollarSign, color: 'purple', change: '+23%' },
    { title: t('bookings'), value: stats?.pendingBookings ?? 0, icon: Calendar, color: 'orange', change: '+5%' }
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('welcome')}</h1>
            <p className="text-gray-600 mt-1">Manage your Umrah operations efficiently</p>
          </div>
          <div
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              stats?.nusukIntegrationStatus === 'connected'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">
              Nusuk {stats?.nusukIntegrationStatus === 'connected' ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, i) => (
                  <MotionBox
                    key={i}
                    className="bg-gray-100 animate-pulse rounded-xl h-32"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  />
                ))
            : statCards.map((card, i) => (
                <StatCard key={card.title} delay={i * 0.1} {...card} />
              ))}
        </div>

        {/* Activities section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>

          {loading ? (
            <div className="space-y-3">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <MotionBox
                    key={i}
                    className="h-8 bg-gray-100 animate-pulse rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  />
                ))}
            </div>
          ) : (
            <div className="space-y-4">
              {stats?.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.status === 'success'
                        ? 'bg-emerald-100'
                        : activity.status === 'pending'
                        ? 'bg-yellow-100'
                        : 'bg-red-100'
                    }`}
                  >
                    {activity.status === 'success' && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                    {activity.status === 'pending' && <Clock className="w-4 h-4 text-yellow-600" />}
                    {activity.status === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
