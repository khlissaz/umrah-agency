'use client';

import { useState, useEffect } from 'react';
import { 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  RefreshCw,
  Users,
  Building,
  Plane,
  FileText,
  Settings,
  Activity,
  TrendingUp,
  Download
} from 'lucide-react';
import { motion } from 'framer-motion';

interface NusukStats {
  connectionStatus: 'connected' | 'disconnected' | 'error';
  lastSync: Date;
  visaRequests: {
    pending: number;
    approved: number;
    rejected: number;
  };
  hotelBookings: {
    active: number;
    pending: number;
    cancelled: number;
  };
  transportBookings: {
    confirmed: number;
    pending: number;
  };
  permits: {
    haramPermits: number;
    nabawPermits: number;
  };
}

interface NusukActivity {
  id: string;
  type: 'visa' | 'hotel' | 'transport' | 'permit';
  action: string;
  status: 'success' | 'pending' | 'error';
  timestamp: Date;
  details: string;
}

export default function NusukIntegrationPage() {
  const [stats, setStats] = useState<NusukStats | null>(null);
  const [activities, setActivities] = useState<NusukActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        connectionStatus: 'connected',
        lastSync: new Date(Date.now() - 120000), // 2 minutes ago
        visaRequests: {
          pending: 47,
          approved: 234,
          rejected: 12
        },
        hotelBookings: {
          active: 89,
          pending: 23,
          cancelled: 5
        },
        transportBookings: {
          confirmed: 156,
          pending: 34
        },
        permits: {
          haramPermits: 445,
          nabawPermits: 378
        }
      });

      setActivities([
        {
          id: '1',
          type: 'visa',
          action: 'Visa approved for Group G-2024-001',
          status: 'success',
          timestamp: new Date(Date.now() - 300000),
          details: '15 pilgrims processed successfully'
        },
        {
          id: '2',
          type: 'hotel',
          action: 'Hotel booking confirmed at Hilton Makkah',
          status: 'success',
          timestamp: new Date(Date.now() - 600000),
          details: 'Booking ID: HM-2024-0156'
        },
        {
          id: '3',
          type: 'transport',
          action: 'Airport transfer scheduled',
          status: 'pending',
          timestamp: new Date(Date.now() - 900000),
          details: 'Jeddah Airport to Makkah - 25 passengers'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    // Simulate sync process
    setTimeout(() => {
      setSyncing(false);
      if (stats) {
        setStats({
          ...stats,
          lastSync: new Date()
        });
      }
    }, 2000);
  };

  const statusCards = [
    {
      title: 'Visa Requests',
      data: stats?.visaRequests,
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Hotel Bookings',
      data: stats?.hotelBookings,
      icon: Building,
      color: 'emerald'
    },
    {
      title: 'Transport',
      data: stats?.transportBookings,
      icon: Plane,
      color: 'purple'
    },
    {
      title: 'Permits',
      data: stats?.permits,
      icon: Shield,
      color: 'orange'
    }
  ];

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
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Shield className="w-8 h-8 mr-3 text-emerald-600" />
                Nusuk Integration
              </h1>
              <p className="text-gray-600 mt-1">Manage your official Nusuk services and integrations</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                stats?.connectionStatus === 'connected' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {stats?.connectionStatus === 'connected' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {stats?.connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              
              <button
                onClick={handleSync}
                disabled={syncing}
                className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                <span>{syncing ? 'Syncing...' : 'Sync Now'}</span>
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            Last sync: {stats?.lastSync.toLocaleString()}
          </div>
        </div>

        {/* Connection Status Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-emerald-800">
                Successfully connected to Nusuk Platform
              </h3>
              <p className="text-sm text-emerald-700 mt-1">
                All services are operational. API rate limit: 1000 requests/hour (234 used)
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statusCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                <card.icon className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-2">
                {card.data && Object.entries(card.data).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 capitalize">{key}:</span>
                    <span className="text-sm font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Recent Nusuk Activities
                  </h3>
                  <button className="text-sm text-emerald-600 hover:text-emerald-700">
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {activities.map((activity) => (
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
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {activity.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* API Configuration */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  API Configuration
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Version</span>
                  <span className="text-sm font-medium text-gray-900">v2.1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Partner ID</span>
                  <span className="text-sm font-medium text-gray-900">OMR-2024-001</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rate Limit</span>
                  <span className="text-sm font-medium text-gray-900">1000/hour</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Environment</span>
                  <span className="text-sm font-medium text-emerald-600">Production</span>
                </div>
                <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                  Update Configuration
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
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Process Visa Batch</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Building className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium">Sync Hotel Inventory</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">Generate Permits</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium">Export Reports</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}