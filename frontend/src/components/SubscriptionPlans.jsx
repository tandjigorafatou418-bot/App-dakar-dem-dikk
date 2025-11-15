import React, { useState } from 'react';
import { Calendar, Check, Star, CreditCard, Users, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export default function SubscriptionPlans() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: 'urban-basic',
      name: 'Urbain Mensuel',
      type: 'urban',
      price: 15000,
      originalPrice: 25000,
      duration: '1 mois',
      trips: 'Illimité',
      zones: ['Dakar', 'Pikine', 'Guédiawaye'],
      color: 'from-ddd-green-500 to-ddd-green-600',
      icon: '🚍',
      features: [
        'Trajets illimités urbains',
        'Toutes les lignes Dakar',
        'Horaires prioritaires 6h-22h',
        'Économie de 40%'
      ]
    },
    {
      id: 'student',
      name: 'Étudiant',
      type: 'student',
      price: 8000,
      originalPrice: 25000,
      duration: '1 mois',
      trips: 'Illimité',
      zones: ['Dakar', 'Pikine', 'Guédiawaye', 'Rufisque'],
      color: 'from-ddd-yellow-500 to-ddd-yellow-600',
      icon: '🎓',
      popular: true,
      features: [
        'Réduction de 68%',
        'Carte étudiant requise',
        'Trajets urbains illimités',
        'Accès prioritaire aux bus'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Sénégal',
      type: 'premium',
      price: 45000,
      originalPrice: 80000,
      duration: '1 mois',
      trips: 'Illimité',
      zones: ['Tout le Sénégal'],
      color: 'from-ddd-red-500 to-ddd-red-600',
      icon: '⭐',
      features: [
        'Urbain + Interurbain',
        'Tout le territoire',
        'Express AIBD inclus',
        'Siège VIP garanti',
        'Économie de 44%'
      ]
    },
    {
      id: 'family',
      name: 'Famille (4 personnes)',
      type: 'family',
      price: 50000,
      originalPrice: 100000,
      duration: '1 mois',
      trips: 'Illimité',
      zones: ['Dakar', 'Pikine', 'Guédiawaye', 'Thiès'],
      color: 'from-purple-500 to-purple-600',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Jusqu\'à 4 personnes',
        'Trajets urbains illimités',
        '1 trajet interurbain/semaine',
        'Économie de 50%'
      ]
    }
  ];

  const handleSubscribe = async (plan) => {
    if (!user) {
      alert('Veuillez vous connecter pour souscrire');
      return;
    }

    setSelectedPlan(plan.id);
    setIsProcessing(true);

    try {
      const response = await axios.post(`${API_URL}/subscriptions`, {
        userId: user.id,
        planId: plan.id,
        planName: plan.name,
        price: plan.price,
        duration: plan.duration
      });

      if (response.data.success) {
        alert(`✅ Abonnement ${plan.name} activé!\n\nVotre carte d'abonnement est disponible dans votre profil.\nNuméro: ${response.data.subscription.id}`);
      }
    } catch (error) {
      console.error('Erreur souscription:', error);
      alert('❌ Erreur lors de la souscription. Réessayez.');
    } finally {
      setIsProcessing(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-ddd-yellow-500 to-ddd-red-500 rounded-full mb-4">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Abonnements Mensuels</h2>
        <p className="text-lg text-gray-600">Économisez jusqu'à 68% avec nos formules</p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-2xl shadow-xl overflow-hidden border-4 ${
              plan.popular ? 'border-ddd-yellow-400 transform scale-105' : 'border-gray-200'
            } hover:shadow-2xl transition-all`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-ddd-yellow-400 text-gray-900 px-4 py-1 text-xs font-bold rounded-bl-lg">
                ⭐ POPULAIRE
              </div>
            )}

            <div className={`bg-gradient-to-r ${plan.color} p-6 text-white text-center`}>
              <div className="text-5xl mb-3">{plan.icon}</div>
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold">{plan.price.toLocaleString()}</span>
                <span className="text-lg"> FCFA</span>
              </div>
              <div className="text-sm line-through opacity-75">{plan.originalPrice.toLocaleString()} FCFA</div>
              <div className="mt-2 text-sm font-medium">{plan.duration} • {plan.trips}</div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-600 mb-2">ZONES COUVERTES</p>
                <div className="flex flex-wrap gap-1">
                  {plan.zones.map((zone, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {zone}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start text-sm">
                    <Check className="w-4 h-4 text-ddd-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSubscribe(plan)}
                disabled={isProcessing && selectedPlan === plan.id}
                className={`w-full bg-gradient-to-r ${plan.color} text-white py-3 rounded-lg font-bold hover:opacity-90 transition-all disabled:opacity-50`}
              >
                {isProcessing && selectedPlan === plan.id ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Traitement...
                  </span>
                ) : (
                  'Souscrire'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Avantages */}
      <div className="bg-gradient-to-r from-ddd-yellow-50 to-ddd-red-50 rounded-2xl p-8 border-2 border-ddd-yellow-400">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Pourquoi choisir un abonnement ?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-ddd-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Économies garanties</h4>
            <p className="text-sm text-gray-600">Jusqu'à 68% d'économies par rapport aux billets unitaires</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-ddd-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Sans limite</h4>
            <p className="text-sm text-gray-600">Voyagez autant que vous voulez pendant 30 jours</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-ddd-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Accès prioritaire</h4>
            <p className="text-sm text-gray-600">Files dédiées et sièges garantis aux heures de pointe</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Questions fréquentes</h3>
        <div className="space-y-4">
          {[
            {
              q: 'Comment utiliser mon abonnement ?',
              a: 'Une carte d\'abonnement virtuelle est générée avec un QR code. Présentez-la simplement à chaque montée dans le bus.'
            },
            {
              q: 'Puis-je suspendre mon abonnement ?',
              a: 'Oui, en cas de maladie ou voyage prolongé. Contactez le support avec un justificatif.'
            },
            {
              q: 'L\'abonnement étudiant, comment ça marche ?',
              a: 'Présentez votre carte d\'étudiant lors de la souscription. Renouvellement annuel requis.'
            }
          ].map((faq, idx) => (
            <details key={idx} className="border-l-4 border-ddd-yellow-400 pl-4">
              <summary className="font-semibold text-gray-900 cursor-pointer hover:text-ddd-red-600">
                {faq.q}
              </summary>
              <p className="mt-2 text-sm text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}