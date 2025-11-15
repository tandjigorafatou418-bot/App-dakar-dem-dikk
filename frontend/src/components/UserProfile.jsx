import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function UserProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: 'Dakar, Sénégal',
    birthDate: '1990-01-01'
  });

  const handleSave = () => {
    alert('Profil mis à jour avec succès !');
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mon Profil</h2>
        <p className="text-gray-600">Gérez vos informations personnelles</p>
      </div>

      {/* Carte profil */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header avec bannière */}
        <div className="h-32 bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
        
        {/* Contenu profil */}
        <div className="px-6 pb-6">
          {/* Photo de profil */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <div className="w-28 h-28 bg-emerald-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-gray-900">{user?.name}</h3>
              <p className="text-gray-600 capitalize">{user?.role}</p>
            </div>

            <div className="sm:ml-auto mt-4 sm:mt-0">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Modifier</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Enregistrer</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Informations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Nom complet
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              ) : (
                <p className="text-gray-900 font-medium">{formData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              ) : (
                <p className="text-gray-900 font-medium">{formData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Téléphone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              ) : (
                <p className="text-gray-900 font-medium">{formData.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Adresse
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              ) : (
                <p className="text-gray-900 font-medium">{formData.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date de naissance
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              ) : (
                <p className="text-gray-900 font-medium">
                  {new Date(formData.birthDate).toLocaleDateString('fr-FR')}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rôle
              </label>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                user?.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                user?.role === 'agent' ? 'bg-blue-100 text-blue-800' :
                'bg-emerald-100 text-emerald-800'
              }`}>
                {user?.role === 'admin' ? 'Administrateur' :
                 user?.role === 'agent' ? 'Agent' : 'Client'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sécurité */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sécurité</h3>
        <div className="space-y-4">
          <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Changer le mot de passe</p>
                <p className="text-sm text-gray-600">Dernière modification il y a 30 jours</p>
              </div>
              <Edit className="w-5 h-5 text-gray-400" />
            </div>
          </button>

          <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Authentification à deux facteurs</p>
                <p className="text-sm text-gray-600">Non activée</p>
              </div>
              <Edit className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </div>
      </div>

      {/* Statistiques (pour client) */}
      {user?.role === 'client' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Réservations totales</p>
            <p className="text-3xl font-bold text-emerald-600">12</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Dépenses totales</p>
            <p className="text-3xl font-bold text-blue-600">45,000 FCFA</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Points fidélité</p>
            <p className="text-3xl font-bold text-purple-600">450</p>
          </div>
        </div>
      )}
    </div>
  );
}