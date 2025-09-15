'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { 
  CreditCard, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Download,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  DollarSign,
  Calendar,
  User,
  Building,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Receipt
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Payment {
  id: string;
  bookingId: string;
  pilgrimName: string;
  groupName: string;
  amount: number;
  currency: string;
  method: 'credit_card' | 'bank_transfer' | 'cash' | 'installment';
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'partial';
  stripePaymentIntentId?: string;
  transactionId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PaymentStats {
  totalRevenue: number;
  pendingPayments: number;
  completedPayments: number;
  failedPayments: number;
  monthlyGrowth: number;
  averageTransaction: number;
}

export default function PaymentsPage() {
  const t = useTranslations('dashboard');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<PaymentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('30');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalRevenue: 1247500,
        pendingPayments: 23,
        completedPayments: 456,
        failedPayments: 12,
        monthlyGrowth: 15.3,
        averageTransaction: 2850
      });

      setPayments([
        {
          id: 'PAY-2024-001',
          bookingId: 'BK-2024-001',
          pilgrimName: 'Ahmed Al-Rashid',
          groupName: 'Ramadan Umrah Group 2024',
          amount: 2500,
          currency: 'USD',
          method: 'credit_card',
          status: 'completed',
          stripePaymentIntentId: 'pi_1234567890',
          transactionId: 'TXN-001-2024',
          description: 'Premium Umrah Package Payment',
          createdAt: new Date('2024-02-15T10:30:00'),
          updatedAt: new Date('2024-02-15T10:35:00')
        },
        {
          id: 'PAY-2024-002',
          bookingId: 'BK-2024-002',
          pilgrimName: 'Fatima Hassan',
          groupName: 'Family Umrah Journey',
          amount: 1800,
          currency: 'USD',
          method: 'installment',
          status: 'partial',
          transactionId: 'TXN-002-2024',
          description: 'Family Package - First Installment',
          createdAt: new Date('2024-02-14T14:20:00'),
          updatedAt: new Date('2024-02-14T14:25:00')
        },
        {
          id: 'PAY-2024-003',
          bookingId: 'BK-2024-003',
          pilgrimName: 'Omar Khalil',
          groupName: 'Youth Umrah Adventure',
          amount: 1200,
          currency: 'USD',
          method: 'bank_transfer',
          status: 'pending',
          transactionId: 'TXN-003-2024',
          description: 'Essential Package Payment',
          createdAt: new Date('2024-02-13T09:15:00'),
          updatedAt: new Date('2024-02-13T09:15:00')
        },
        {
          id: 'PAY-2024-004',
          bookingId: 'BK-2024-004',
          pilgrimName: 'Sarah Johnson',
          groupName: 'International Umrah Group',
          amount: 2200,
          currency: 'USD',
          method: 'credit_card',
          status: 'failed',
          stripePaymentIntentId: 'pi_failed_123',
          transactionId: 'TXN-004-2024',
          description: 'Premium Package - Payment Failed',
          createdAt: new Date('2024-02-12T16:45:00'),
          updatedAt: new Date('2024-02-12T16:50:00')
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'partial': return 'bg-blue-100 text-blue-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'refunded': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'partial': return <Clock className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      case 'refunded': return <ArrowDownRight className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card': return <CreditCard className="w-4 h-4" />;
      case 'bank_transfer': return <Building className="w-4 h-4" />;
      case 'cash': return <DollarSign className="w-4 h-4" />;
      case 'installment': return <Calendar className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.pilgrimName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
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
              <CreditCard className="w-8 h-8 mr-3 text-green-600" />
              {t('payments')}
            </h1>
            <p className="text-gray-600 mt-1">Gérer les paiements et transactions</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Actualiser</span>
            </button>
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Nouveau Paiement</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus Total</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${stats?.totalRevenue.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+{stats?.monthlyGrowth}%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paiements Terminés</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.completedPayments}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En Attente</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.pendingPayments}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Transaction Moyenne</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${stats?.averageTransaction.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, groupe ou transaction..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="completed">Terminé</option>
                <option value="pending">En attente</option>
                <option value="partial">Partiel</option>
                <option value="failed">Échoué</option>
                <option value="refunded">Remboursé</option>
              </select>

              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Toutes les méthodes</option>
                <option value="credit_card">Carte de crédit</option>
                <option value="bank_transfer">Virement bancaire</option>
                <option value="cash">Espèces</option>
                <option value="installment">Échelonné</option>
              </select>

              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="7">7 derniers jours</option>
                <option value="30">30 derniers jours</option>
                <option value="90">90 derniers jours</option>
                <option value="365">Cette année</option>
              </select>
              
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Plus de filtres</span>
              </button>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pèlerin / Groupe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Méthode
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment, index) => (
                  <motion.tr
                    key={payment.id}
                    className="hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{payment.transactionId}</div>
                        <div className="text-sm text-gray-500">{payment.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{payment.pilgrimName}</div>
                          <div className="text-sm text-gray-500">{payment.groupName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        ${payment.amount.toLocaleString()} {payment.currency}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getMethodIcon(payment.method)}
                        <span className="text-sm text-gray-900 capitalize">
                          {payment.method.replace('_', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        <span className="capitalize">{payment.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Receipt className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
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
        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun paiement trouvé</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all' || methodFilter !== 'all'
                ? 'Essayez d\'ajuster vos filtres de recherche' 
                : 'Les paiements apparaîtront ici une fois les réservations effectuées'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}