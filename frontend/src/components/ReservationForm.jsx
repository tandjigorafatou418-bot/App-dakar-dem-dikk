import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, CreditCard, QrCode, Phone } from 'lucide-react';
import { urbanRoutes, interurbanRoutes } from '../data/stations';
import QRCode from 'qrcode';
import QRCodeModal from './QRCodeModal';

export default function ReservationForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [reservation, setReservation] = useState({
    route: '',
    date: '',
    time: '',
    seats: 1,
    passengerName: '',
    phone: '',
    email: '',
    paymentMethod: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [routeType, setRouteType] = useState('urban');
  const [showQRModal, setShowQRModal] = useState(false);
  const [completedReservation, setCompletedReservation] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const routes = routeType === 'urban' ? urbanRoutes : interurbanRoutes;
  const selectedRoute = routes.find(r => r.id === reservation.route);
  const totalPrice = selectedRoute ? selectedRoute.price * reservation.seats : 0;

  const handleReservation = async () => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const reservationData = {
      id: `DDK${Date.now()}`,
      route: selectedRoute?.name,
      date: reservation.date,
      time: reservation.time,
      seats: reservation.seats,
      passenger: reservation.passengerName,
      price: totalPrice,
      passengerName: reservation.passengerName,
      status: 'Confirmé'
    };

    setCompletedReservation(reservationData);
    setStep(4);

    try {
      const qrData = JSON.stringify({
        ticketId: reservationData.id,
        route: reservationData.route,
        date: reservationData.date,
        time: reservationData.time,
        seats: reservationData.seats,
        passenger: reservationData.passengerName || 'Client',
        price: reservationData.price,
        validatedAt: new Date().toISOString()
      });
      
      const url = await QRCode.toDataURL(qrData, {
        width: 200,
        margin: 2,
        color: { dark: '#10B981', light: '#FFFFFF' }
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Erreur génération QR code:', error);
    }

    setIsLoading(false);
  };

  // Les étapes du formulaire (Step1, Step2, Step3, Step4)
  const steps = [
    () => (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 text-center">Choisir votre trajet</h3>
        <div className="flex space-x-4 justify-center">
          <button onClick={() => { setRouteType('urban'); setReservation({ ...reservation, route: '' }); }}
            className={`px-6 py-3 rounded-lg ${routeType === 'urban' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>
            Transport Urbain
          </button>
          <button onClick={() => { setRouteType('interurban'); setReservation({ ...reservation, route: '' }); }}
            className={`px-6 py-3 rounded-lg ${routeType === 'interurban' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}>
            Transport Interurbain
          </button>
        </div>

        <div className="space-y-3">
          {routes.map(route => (
            <div key={route.id} onClick={() => setReservation({ ...reservation, route: route.id })}
              className={`p-4 border-2 rounded-lg cursor-pointer ${reservation.route === route.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'}`}>
              <div className="flex justify-between">
                <div>{route.name}</div>
                <div>{route.price} FCFA</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="date" value={reservation.date} onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
            min={new Date().toISOString().split('T')[0]} className="border p-2 rounded"/>
          <select value={reservation.seats} onChange={(e) => setReservation({ ...reservation, seats: parseInt(e.target.value) })} className="border p-2 rounded">
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} place{n>1?'s':''}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {['06:00','07:00','08:00'].map(time => (
            <button key={time} onClick={() => setReservation({ ...reservation, time })}
              className={`p-2 border ${reservation.time===time?'border-emerald-500 bg-emerald-50':'border-gray-200'}`}>{time}</button>
          ))}
        </div>

        <button onClick={() => setStep(2)} disabled={!reservation.route || !reservation.date || !reservation.time}
          className="w-full bg-emerald-600 text-white py-2 rounded">Continuer</button>
      </div>
    ),
    () => (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 text-center">Informations passager</h3>
        <input placeholder="Nom complet" value={reservation.passengerName} onChange={(e) => setReservation({ ...reservation, passengerName: e.target.value })} className="border p-2 w-full rounded"/>
        <input placeholder="Téléphone" value={reservation.phone} onChange={(e) => setReservation({ ...reservation, phone: e.target.value })} className="border p-2 w-full rounded"/>
        <input placeholder="Email" value={reservation.email} onChange={(e) => setReservation({ ...reservation, email: e.target.value })} className="border p-2 w-full rounded"/>
        <div className="flex space-x-3">
          <button onClick={() => setStep(1)} className="flex-1 border p-2 rounded">Retour</button>
          <button onClick={() => setStep(3)} disabled={!reservation.passengerName || !reservation.phone || !reservation.email} className="flex-1 bg-emerald-600 text-white p-2 rounded">Continuer</button>
        </div>
      </div>
    ),
    () => (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 text-center">Confirmation et paiement</h3>
        <div className="bg-gray-50 p-4 rounded">
          <div>Trajet: {selectedRoute?.name}</div>
          <div>Date: {reservation.date}</div>
          <div>Heure: {reservation.time}</div>
          <div>Passager: {reservation.passengerName}</div>
          <div>Places: {reservation.seats}</div>
          <div>Total: {totalPrice} FCFA</div>
        </div>

        <div className="flex space-x-3">
          <button onClick={() => setStep(2)} className="flex-1 border p-2 rounded">Retour</button>
          <button onClick={handleReservation} disabled={isLoading || !reservation.paymentMethod} className="flex-1 bg-emerald-600 text-white p-2 rounded">
            {isLoading ? 'Traitement...' : `Payer ${totalPrice} FCFA`}
          </button>
        </div>
      </div>
    ),
    () => (
      <div className="space-y-4 text-center">
        <h3 className="text-xl font-semibold text-gray-900">Réservation confirmée !</h3>
        {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32 mx-auto"/>}
        <button onClick={() => setStep(1)} className="w-full bg-emerald-600 text-white p-2 rounded">Nouvelle réservation</button>
        {onClose && <button onClick={onClose} className="w-full border p-2 rounded">Fermer</button>}
      </div>
    )
  ];

  return <div className="bg-white p-6 rounded shadow">{steps[step-1]()}</div>;
}
