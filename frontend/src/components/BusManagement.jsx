import React, { useState, useEffect } from 'react';
import { Bus, Plus, Edit, Trash2, MapPin, Users, Activity, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export default function BusManagement() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {
    try {
      const response = await axios.get(`${API_URL}/buses`);
      if (response.data.success) {
        setBuses(response.data.buses);
      }
    } catch (error) {
      console.error('Erreur chargement bus:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { bg: 'bg-green-100', text: 'text-green-800', label: 'En service' },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Hors service' },
      maintenance: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Maintenance' }
    };
    const badge = badges[status] || badges.inactive;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion de la Flotte</h2>
          <p className="text-gray-600">{buses.length} bus dans la flotte</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Ajouter un bus</span>
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{buses.length}</p>
            </div>
            <Bus className="w-10 h-10 text-gray-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En service</p>
              <p className="text-2xl font-bold text-green-600">
                {buses.filter(b => b.status === 'active').length}
              </p>
            </div>
            <Activity className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Maintenance</p>
              <p className="text-2xl font-bold text-orange-600">
                {buses.filter(b => b.status === 'maintenance').length}
              </p>
            </div>
            <AlertTriangle className="w-10 h-10 text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Taux occupation moyen</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(buses.reduce((sum, b) => sum + (b.occupancy / b.capacity), 0) / buses.length * 100)}%
              </p>
            </div>
            <Users className="w-10 h-10 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Liste des bus */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buses.map((bus) => (
          <div key={bus.id} className="bg-white rounded-lg shadow-sm border-2 border-gray-200 hover:border-emerald-500 transition-all p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Bus className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{bus.name}</h3>
                  <p className="text-sm text-gray-600">{bus.route}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Statut:</span>
                {getStatusBadge(bus.status)}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Capacité:</span>
                <span className="font-semibold">{bus.capacity} places</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Occupation:</span>
                <span className="font-semibold text-emerald-600">{bus.occupancy}/{bus.capacity}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    (bus.occupancy / bus.capacity) > 0.8 ? 'bg-red-500' :
                    (bus.occupancy / bus.capacity) > 0.6 ? 'bg-orange-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${(bus.occupancy / bus.capacity) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Position: {bus.position[0].toFixed(4)}, {bus.position[1].toFixed(4)}</span>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                <Edit className="w-4 h-4 mr-1" />
                Modifier
              </button>
              <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-1" />
                Localiser
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}