'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { 
  CreditCard, 
  Building, 
  DollarSign, 
  Calendar,
  Lock,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PaymentFormProps {
  amount: number;
  currency: string;
  description: string;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: any;
  description: string;
  processingTime: string;
}

export function PaymentForm({ amount, currency, description, onSuccess, onError }: PaymentFormProps) {
  const t = useTranslations();
  const [selectedMethod, setSelectedMethod] = useState<string>('credit_card');
  const [loading, setLoading] = useState(false);
  const [installmentPlan, setInstallmentPlan] = useState<number>(1);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'credit_card',
      name: 'Carte de Crédit',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
      processingTime: 'Instantané'
    },
    {
      id: 'bank_transfer',
      name: 'Virement Bancaire',
      icon: Building,
      description: 'Virement depuis votre banque',
      processingTime: '1-3 jours ouvrables'
    },
    {
      id: 'installment',
      name: 'Paiement Échelonné',
      icon: Calendar,
      description: 'Payez en plusieurs fois',
      processingTime: 'Selon le plan choisi'
    }
  ];

  const installmentOptions = [
    { months: 1, label: 'Paiement unique', fee: 0 },
    { months: 3, label: '3 mensualités', fee: 2.5 },
    { months: 6, label: '6 mensualités', fee: 5 },
    { months: 12, label: '12 mensualités', fee: 8 }
  ];

  const calculateInstallmentAmount = (months: number) => {
    const option = installmentOptions.find(opt => opt.months === months);
    if (!option) return amount;
    
    const totalWithFee = amount * (1 + option.fee / 100);
    return totalWithFee / months;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockPaymentIntent = {
        id: 'pi_' + Math.random().toString(36).substr(2, 9),
        status: 'succeeded',
        amount: amount * 100,
        currency: currency.toLowerCase(),
        payment_method: selectedMethod,
        created: Date.now() / 1000
      };

      onSuccess(mockPaymentIntent);
    } catch (error) {
      onError('Erreur lors du traitement du paiement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Finaliser le Paiement</h2>
            <p className="text-green-100 mt-1">{description}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">${amount.toLocaleString()}</div>
            <div className="text-green-100">{currency.toUpperCase()}</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Méthode de Paiement</h3>
          <div className="grid grid-cols-1 gap-3">
            {paymentMethods.map((method) => (
              <motion.label
                key={method.id}
                className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    selectedMethod === method.id ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <method.icon className={`w-6 h-6 ${
                      selectedMethod === method.id ? 'text-green-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{method.name}</div>
                    <div className="text-sm text-gray-500">{method.description}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Traitement: {method.processingTime}
                    </div>
                  </div>
                </div>
                {selectedMethod === method.id && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </motion.label>
            ))}
          </div>
        </div>

        {/* Installment Options */}
        {selectedMethod === 'installment' && (
          <motion.div
            className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-medium text-gray-900 mb-3">Plan de Paiement</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {installmentOptions.map((option) => (
                <label
                  key={option.months}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                    installmentPlan === option.months
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="installmentPlan"
                    value={option.months}
                    checked={installmentPlan === option.months}
                    onChange={(e) => setInstallmentPlan(parseInt(e.target.value))}
                    className="sr-only"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{option.label}</div>
                    {option.months > 1 && (
                      <div className="text-sm text-gray-600">
                        ${calculateInstallmentAmount(option.months).toFixed(2)}/mois
                      </div>
                    )}
                  </div>
                  {option.fee > 0 && (
                    <div className="text-xs text-orange-600">+{option.fee}%</div>
                  )}
                </label>
              ))}
            </div>
          </motion.div>
        )}

        {/* Card Details (if credit card selected) */}
        {selectedMethod === 'credit_card' && (
          <motion.div
            className="mb-6 space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-medium text-gray-900">Informations de la Carte</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de Carte
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d'Expiration
                </label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  maxLength={4}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom sur la Carte
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        )}

        {/* Security Notice */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <span>Vos informations de paiement sont sécurisées et cryptées</span>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Montant:</span>
              <span className="font-medium">${amount.toLocaleString()}</span>
            </div>
            {selectedMethod === 'installment' && installmentPlan > 1 && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frais ({installmentOptions.find(o => o.months === installmentPlan)?.fee}%):</span>
                  <span className="font-medium">
                    ${((amount * (installmentOptions.find(o => o.months === installmentPlan)?.fee || 0)) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-green-700 border-t border-green-200 pt-2">
                  <span>Total:</span>
                  <span>${(amount * (1 + (installmentOptions.find(o => o.months === installmentPlan)?.fee || 0) / 100)).toFixed(2)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Traitement en cours...</span>
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              <span>Confirmer le Paiement</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}