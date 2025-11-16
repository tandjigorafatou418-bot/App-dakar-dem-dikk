import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, CreditCard, ArrowRight, Check } from 'lucide-react';
import { urbanRoutes, interurbanRoutes } from '../data/stations';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import SeatSelector from './SeatSelector';

const API_URL = 'http://localhost:5000/api';

export default function ReservationForm({ onSuccess }) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [routeType, setRouteType] = useState('urban');
  const [isLoading, setIsLoading] = useState(false);

  const [reservation, setReservation] = useState({
    route: '',
    routeName: '',
    date: '',
    time: '',
    seats: 1,
    passengerName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    paymentMethod: '',
    price: 0,
    userId: user?.id || '',
    selectedSeat: null
  });

  const routes = routeType === 'urban' ? urbanRoutes : interurbanRoutes;
  const selectedRoute = routes.find(r => r.id === reservation.route);

  const handleRouteSelect = (route) => {
    setReservation({
      ...reservation,
      route: route.id,
      routeName: route.name,
      price: route.price
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const reservationData = {
        ...reservation,
        userId: user?.id,
        route: reservation.routeName,
        totalPrice: reservation.price * reservation.seats
      };

      const response = await axios.post(`${API_URL}/reservations`, reservationData);

      if (response.data.success) {
        if (onSuccess) onSuccess(response.data.reservation);

        alert(`🎉 Réservation confirmée !\n\nRéférence: ${response.data.reservation.id}\nTrajet: ${reservation.routeName}\nPrix total: ${reservation.price * reservation.seats} FCFA`);

        setReservation({
          route: '',
          routeName: '',
          date: '',
          time: '',
          seats: 1,
          passengerName: user?.name || '',
          phone: user?.phone || '',
          email: user?.email || '',
          paymentMethod: '',
          price: 0,
          userId: user?.id || '',
          selectedSeat: null
        });
        setStep(1);
      }
    } catch (error) {
      console.error('❌ Erreur réservation:', error);
      alert('Erreur lors de la réservation. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 text-center">Choisir votre trajet</h3>

      <div className="flex space-x-4 justify-center">
        <button
          onClick={() => {
            setRouteType('urban');
            setReservation({ ...reservation, route: '', routeName: '', price: 0 });
          }}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            routeType === 'urban'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Transport Urbain
        </button>
        <button
          onClick={() => {
            setRouteType('interurban');
            setReservation({ ...reservation, route: '', routeName: '', price: 0 });
          }}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            routeType === 'interurban'
              ? 'bg-amber-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Transport Interurbain
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {routes.map((route) => (
          <div
            key={route.id}
            onClick={() => handleRouteSelect(route)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              reservation.route === route.id
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="font-bold text-lg text-gray-900">{route.name}</h4>
                <p className="text-sm text-gray-600">{route.startPoint} → {route.endPoint}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-emerald-600">{route.price} FCFA</p>
                <p className="text-xs text-gray-500">par personne</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {route.duration} min
              </span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {route.distance} km
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            type="date"
            value={reservation.date}
            onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Places</label>
          <select
            value={reservation.seats}
            onChange={(e) => setReservation({ ...reservation, seats: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {[1, 2, 3, 4, 5].map(n => (
              <option key={n} value={n}>{n} place{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Heure de départ</label>
        <div className="grid grid-cols-4 gap-2">
          {['05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', 
            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
            '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
            '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'].map(time => (
            <button
              key={time}
              onClick={() => setReservation({ ...reservation, time })}
              className={`p-2 border rounded-lg transition-colors text-sm ${
                reservation.time === time
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-medium'
                  : 'border-gray-200 hover:border-emerald-300'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <SeatSelector onSelect={(seat) => setReservation({ ...reservation, selectedSeat: seat })} />

      <button
        onClick={() => setStep(2)}
        disabled={!reservation.route || !reservation.date || !reservation.time}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
      >
        Continuer
        <ArrowRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 text-center">Informations passager</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
          <input
            type="text"
            value={reservation.passengerName}
            onChange={(e) => setReservation({ ...reservation, passengerName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Votre nom"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
          <input
            type="tel"
            value={reservation.phone}
            onChange={(e) => setReservation({ ...reservation, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="+221 XX XXX XX XX"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={reservation.email}
            onChange={(e) => setReservation({ ...reservation, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="votre@email.com"
            required
          />
        </div>
      </div>
      <div className="flex space-x-3">
        <button onClick={() => setStep(1)} className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
          Retour
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!reservation.passengerName || !reservation.phone || !reservation.email}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
        >
          Continuer
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 text-center">Confirmation et paiement</h3>

      <div className="bg-gray-50 rounded-lg p-6 space-y-3">
        <h4 className="font-semibold text-gray-900 mb-4">Récapitulatif</h4>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Trajet:</span>
          <span className="font-medium">{selectedRoute?.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Date:</span>
          <span className="font-medium">{reservation.date}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Heure:</span>
          <span className="font-medium">{reservation.time}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Place choisie:</span>
          <span className="font-medium">
            {reservation.selectedSeat ? `N° ${reservation.selectedSeat}` : 'Non sélectionnée'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Passager:</span>
          <span className="font-medium">{reservation.passengerName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Places:</span>
          <span className="font-medium">{reservation.seats}</span>
        </div>
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-emerald-600">
              {reservation.price * reservation.seats} FCFA
            </span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Mode de paiement</label>
        <div className="space-y-2">
          {[
            { id: 'wave', name: 'Wave', icon: '📱' },
            { id: 'orange_money', name: 'Orange Money', icon: '🟠' },
            { id: 'cash', name: 'Espèces à bord', icon: '💵' }
          ].map(method => (
            <button
              key={method.id}
              onClick={() => setReservation({ ...reservation, paymentMethod: method.id })}
              className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                reservation.paymentMethod === method.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-300'
              }`}
            >
              <span className="text-2xl mr-3">{method.icon}</span>
              <span className="font-medium">{method.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex space-x-3">
        <button onClick={() => setStep(2)} className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
          Retour
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading || !reservation.paymentMethod}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Traitement...
            </>
          ) : (
            <>
              <Check className="w-5 h-5 mr-2" />
              Confirmer et Payer
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-24 h-1 ${step > s ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Trajet</span>
          <span>Passager</span>
          <span>Paiement</span>
        </div>
      </div>

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
}