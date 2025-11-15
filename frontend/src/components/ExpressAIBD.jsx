import React, { useState } from 'react';
import { Plane, MapPin, Clock, Users, CreditCard, ArrowRight, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ExpressAIBD() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false); // ✅ AJOUT : contrôle d’affichage du formulaire

  const [booking, setBooking] = useState({
    direction: 'to-airport',
    departurePoint: '',
    date: '',
    time: '',
    passengers: 1,
    luggage: 1
  });

  const departurePoints = [
    { id: 'plateau', name: 'Plateau (Place Indépendance)', price: 3000, duration: '45 min' },
    { id: 'pikine', name: 'Pikine Terminus', price: 2500, duration: '35 min' },
    { id: 'guediawaye', name: 'Guédiawaye Centre', price: 2800, duration: '40 min' },
    { id: 'thies', name: 'Thiès Gare Routière', price: 1500, duration: '25 min' },
    { id: 'rufisque', name: 'Rufisque', price: 2000, duration: '30 min' }
  ];

  const schedules = [
    '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
    '20:00', '21:00', '22:00', '23:00'
  ];

  const selectedPoint = departurePoints.find(p => p.id === booking.departurePoint);
  const totalPrice = selectedPoint ? selectedPoint.price * booking.passengers : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Réservation Express AIBD confirmée!\n\nTrajet: ${booking.direction === 'to-airport' ? "Vers l'aéroport" : "Depuis l'aéroport"}\nPoint: ${selectedPoint?.name}\nDate: ${booking.date}\nHeure: ${booking.time}\nPassagers: ${booking.passengers}\nPrix: ${totalPrice.toLocaleString()} FCFA`);
setShowForm(false);

  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-ddd-green-500 to-ddd-green-700 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 text-9xl opacity-10">✈️</div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Plane className="w-8 h-8 text-ddd-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Express AIBD</h1>
              <p className="text-lg text-white/90">Navettes Aéroport Blaise Diagne</p>
            </div>
          </div>

          {/* ✅ Bouton pour afficher le formulaire */}
          <div className="mt-6">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-white text-ddd-green-700 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-ddd-green-100 transition-all flex items-center space-x-2"
            >
              <span>{showForm ? 'Fermer la réservation' : 'Réserver maintenant'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Petites cartes infos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <Clock className="w-6 h-6 mb-2" />
              <p className="font-bold">20 départs/jour</p>
              <p className="text-sm text-white/90">De 4h à 23h</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <Users className="w-6 h-6 mb-2" />
              <p className="font-bold">Confort garanti</p>
              <p className="text-sm text-white/90">Sièges climatisés</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <MapPin className="w-6 h-6 mb-2" />
              <p className="font-bold">5 points de départ</p>
              <p className="text-sm text-white/90">À travers Dakar</p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Formulaire de réservation (affiché uniquement quand showForm = true) */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-ddd-green-400">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Réserver votre navette</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Direction */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Direction</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setBooking({ ...booking, direction: 'to-airport' })}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    booking.direction === 'to-airport'
                      ? 'border-ddd-green-500 bg-ddd-green-50'
                      : 'border-gray-300 hover:border-ddd-green-300'
                  }`}
                >
                  <Plane className="w-6 h-6 mx-auto mb-2 text-ddd-green-600" />
                  <p className="font-semibold">Vers l'aéroport</p>
                </button>
                <button
                  type="button"
                  onClick={() => setBooking({ ...booking, direction: 'from-airport' })}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    booking.direction === 'from-airport'
                      ? 'border-ddd-green-500 bg-ddd-green-50'
                      : 'border-gray-300 hover:border-ddd-green-300'
                  }`}
                >
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-ddd-green-600" />
                  <p className="font-semibold">Depuis l'aéroport</p>
                </button>
              </div>
            </div>

            {/* Point de départ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {booking.direction === 'to-airport' ? 'Point de départ' : 'Destination'}
              </label>
              <select
                value={booking.departurePoint}
                onChange={(e) => setBooking({ ...booking, departurePoint: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-ddd-green-500 focus:border-ddd-green-500"
                required
              >
                <option value="">Sélectionner...</option>
                {departurePoints.map((point) => (
                  <option key={point.id} value={point.id}>
                    {point.name} - {point.price.toLocaleString()} FCFA ({point.duration})
                  </option>
                ))}
              </select>
            </div>

            {/* Date et Heure */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={booking.date}
                  onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-ddd-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Heure</label>
                <select
                  value={booking.time}
                  onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-ddd-green-500"
                  required
                >
                  <option value="">Sélectionner...</option>
                  {schedules.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Passagers et Bagages */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passagers</label>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={booking.passengers}
                  onChange={(e) => setBooking({ ...booking, passengers: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-ddd-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bagages (max 23kg/pièce)</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={booking.luggage}
                  onChange={(e) => setBooking({ ...booking, luggage: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-ddd-green-500"
                />
              </div>
            </div>

            {/* Prix total */}
            {selectedPoint && (
              <div className="bg-ddd-green-50 border-2 border-ddd-green-400 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-700">Prix total</span>
                  <span className="text-3xl font-bold text-ddd-green-600">
                    {totalPrice.toLocaleString()} FCFA
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {booking.passengers} passager(s) • {selectedPoint.duration} de trajet
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-ddd-green-500 to-ddd-green-600 text-white py-4 rounded-lg font-bold text-lg hover:from-ddd-green-600 hover:to-ddd-green-700 transition-all flex items-center justify-center space-x-2"
            >
              <span>Confirmer la réservation</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Avantages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-ddd-yellow-400">
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="font-bold text-gray-900 mb-2">Ponctualité garantie</h3>
          <p className="text-sm text-gray-600">Départs à l'heure précise, arrivée assurée 2h avant votre vol</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-ddd-red-400">
          <div className="text-4xl mb-3">❄️</div>
          <h3 className="font-bold text-gray-900 mb-2">Confort climatisé</h3>
          <p className="text-sm text-gray-600">Bus modernes avec climatisation, WiFi gratuit et prises USB</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-ddd-green-400">
          <div className="text-4xl mb-3">🛡️</div>
          <h3 className="font-bold text-gray-900 mb-2">Sécurité maximale</h3>
          <p className="text-sm text-gray-600">Conducteurs professionnels, bagages surveillés, assurance incluse</p>
        </div>
      </div>
    </div>
  );
}
