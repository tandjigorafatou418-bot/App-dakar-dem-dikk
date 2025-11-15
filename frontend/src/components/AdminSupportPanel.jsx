import React, { useState } from 'react';


// ============ COMPOSANT ADMIN SUPPORT ============
export function AdminSupportPanel() {
  const [supportMessages, setSupportMessages] = useState([
    {
      id: 1,
      userId: '3',
      userName: 'Fatou Diakho',
      category: 'annulation',
      message: 'Bonjour, je voudrais annuler ma réservation DDK1704123456',
      time: '10:30',
      status: 'new'
    },
    {
      id: 2,
      userId: '5',
      userName: 'Noguay Diouf',
      category: 'probleme_scan',
      message: 'Mon QR code ne fonctionne pas au scan',
      time: '11:45',
      status: 'new'
    },
    {
      id: 3,
      userId: '7',
      userName: 'Thierno Sow',
      category: 'suggestion',
      message: 'Pourriez-vous ajouter plus de bus vers Rufisque le matin ?',
      time: '12:20',
      status: 'replied'
    }
  ]);

  const getCategoryBadge = (category) => {
    const badges = {
      annulation: { bg: 'bg-ddd-red-100', text: 'text-ddd-red-800', label: 'Annulation' },
      probleme_scan: { bg: 'bg-ddd-yellow-100', text: 'text-ddd-yellow-800', label: 'Problème scan' },
      suggestion: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Suggestion' },
      autre: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Autre' }
    };
    const badge = badges[category] || badges.autre;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Messages Support Client</h2>
        <p className="text-gray-600">Gérez les demandes des clients</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-ddd-red-400">
          <p className="text-sm text-gray-600 mb-2">Nouveaux messages</p>
          <p className="text-3xl font-bold text-ddd-red-600">
            {supportMessages.filter(m => m.status === 'new').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-ddd-green-400">
          <p className="text-sm text-gray-600 mb-2">Traités aujourd'hui</p>
          <p className="text-3xl font-bold text-ddd-green-600">
            {supportMessages.filter(m => m.status === 'replied').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-ddd-yellow-400">
          <p className="text-sm text-gray-600 mb-2">Temps de réponse moyen</p>
          <p className="text-3xl font-bold text-ddd-yellow-600">15 min</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border-2 border-ddd-yellow-400">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-ddd-yellow-500 to-ddd-red-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Message</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Heure</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {supportMessages.map((msg) => (
                <tr key={msg.id} className={`hover:bg-gray-50 ${msg.status === 'new' ? 'bg-ddd-yellow-50' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-ddd-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {msg.userName.charAt(0)}
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900">{msg.userName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getCategoryBadge(msg.category)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{msg.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{msg.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="bg-ddd-green-600 hover:bg-ddd-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Répondre
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}