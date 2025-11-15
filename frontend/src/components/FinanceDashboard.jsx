import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Wallet, PieChart, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FinanceDashboard() {
  const revenueData = [
    { month: 'Jan', revenue: 450000, expenses: 320000 },
    { month: 'Fév', revenue: 520000, expenses: 340000 },
    { month: 'Mar', revenue: 480000, expenses: 330000 },
    { month: 'Avr', revenue: 610000, expenses: 360000 },
    { month: 'Mai', revenue: 550000, expenses: 350000 },
    { month: 'Jun', revenue: 670000, expenses: 380000 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Finances</h2>
        <p className="text-gray-600">Vue d'ensemble de la situation financière</p>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8" />
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-emerald-100 text-sm mb-1">Revenus du mois</p>
          <p className="text-3xl font-bold">670,000 FCFA</p>
          <p className="text-emerald-100 text-sm mt-2">+12% vs mois dernier</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <CreditCard className="w-8 h-8" />
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-blue-100 text-sm mb-1">Dépenses du mois</p>
          <p className="text-3xl font-bold">380,000 FCFA</p>
          <p className="text-blue-100 text-sm mt-2">+5% vs mois dernier</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Wallet className="w-8 h-8" />
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-purple-100 text-sm mb-1">Bénéfice net</p>
          <p className="text-3xl font-bold">290,000 FCFA</p>
          <p className="text-purple-100 text-sm mt-2">+18% vs mois dernier</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8" />
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-amber-100 text-sm mb-1">Taux de croissance</p>
          <p className="text-3xl font-bold">12.5%</p>
          <p className="text-amber-100 text-sm mt-2">Objectif: 15%</p>
        </div>
      </div>

      {/* Graphique */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution sur 6 mois</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `${value.toLocaleString()} FCFA`} />
            <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} name="Revenus" />
            <Line type="monotone" dataKey="expenses" stroke="#3B82F6" strokeWidth={3} name="Dépenses" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Détails */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenus par ligne</h3>
          <div className="space-y-3">
            {[
              { name: 'Dakar → Pikine', revenue: 245000, percentage: 37 },
              { name: 'Plateau → Guédiawaye', revenue: 180000, percentage: 27 },
              { name: 'Dakar → Thiès', revenue: 150000, percentage: 22 },
              { name: 'Autres', revenue: 95000, percentage: 14 }
            ].map((line, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{line.name}</span>
                  <span className="font-semibold text-emerald-600">{line.revenue.toLocaleString()} FCFA</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${line.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dépenses par catégorie</h3>
          <div className="space-y-3">
            {[
              { name: 'Carburant', amount: 150000, color: 'bg-red-500' },
              { name: 'Maintenance', amount: 95000, color: 'bg-orange-500' },
              { name: 'Salaires', amount: 80000, color: 'bg-blue-500' },
              { name: 'Autres', amount: 55000, color: 'bg-gray-500' }
            ].map((expense, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${expense.color}`}></div>
                  <span className="text-sm text-gray-700">{expense.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{expense.amount.toLocaleString()} FCFA</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}