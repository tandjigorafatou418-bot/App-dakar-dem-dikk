import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import LiveTracking from '../components/LiveTracking';
import ReservationForm from '../components/ReservationForm';
import StationsMap from '../components/StationsMap';
import RoutesList from '../components/RoutesList';
import QRCodeModal from '../components/QRCodeModal';
import TicketDownload from '../components/TicketDownload';
import AgentDashboard from '../components/AgentDashboard';

export default function MainApp() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const stats = {
    totalUsers: 15847,
    activeBuses: 28,
    dailyRevenue: 847650,
    reservationsToday: 234,
  };

  const showQRCode = (ticket) => {
    setSelectedTicket(ticket);
    setQrModalOpen(true);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return user?.role === 'client' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Bienvenue, {user.name} !
              </h2>
              <p className="text-gray-600">
                Réservez votre prochain voyage ou suivez les bus en temps réel.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Réservation rapide</h3>
                <p className="mb-4 opacity-90">Réservez votre billet en quelques clics</p>
                <button
                  onClick={() => setActiveView('reservation')}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-2 rounded-lg transition-all"
                >
                  Réserver maintenant
                </button>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Suivi en temps réel</h3>
                <p className="mb-4 opacity-90">Localisez les bus sur votre trajet</p>
                <button
                  onClick={() => setActiveView('tracking')}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-2 rounded-lg transition-all"
                >
                  Voir la carte
                </button>
              </div>
            </div>
            <LiveTracking />
          </div>
        ) : (
          <Dashboard stats={stats} />
        );

      case 'tracking':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Suivi en Temps Réel</h2>
              <p className="text-gray-600">Localisez tous les bus actifs sur le réseau</p>
            </div>
            <LiveTracking />
          </div>
        );

      case 'reservation':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Nouvelle Réservation</h2>
              <p className="text-gray-600">Réservez votre billet de transport</p>
            </div>
            <ReservationForm />
          </div>
        );

      case 'routes':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gestion des Lignes</h2>
              <p className="text-gray-600">Gérez les lignes urbaines et interurbaines</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-6">
                <button onClick={() => setActiveView('routes-urban')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg">
                  Lignes Urbaines
                </button>
                <button onClick={() => setActiveView('routes-interurban')} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg">
                  Lignes Interurbaines
                </button>
                <button onClick={() => setActiveView('stations-map')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Carte des Gares
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RoutesList type="urban" />
                <RoutesList type="interurban" />
              </div>
            </div>
          </div>
        );

      case 'buses':
        return <AgentDashboard activeView={activeView} setActiveView={setActiveView} />;

      case 'tickets':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Mes Billets</h2>
              <p className="text-gray-600">Consultez vos réservations et billets</p>
            </div>
            <div className="grid gap-6">
              {[{
                id: 'DDK1704123456',
                route: 'Dakar → Pikine',
                date: '2025-01-15',
                time: '14:30',
                status: 'Confirmé',
                seats: 2,
                price: 1000,
                passengerName: user?.name
              }].map((ticket) => (
                <div key={ticket.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-4">
                        <p className="text-lg font-bold text-gray-900">{ticket.route}</p>
                      </div>
                      <button
                        onClick={() => showQRCode(ticket)}
                        className="text-blue-600 text-sm font-medium"
                      >
                        Voir QR Code
                      </button>
                      <TicketDownload ticket={ticket} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h2 className="text-xl font-bold">Fonctionnalité en développement</h2>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          showMenu={true}
        />

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8">
            {renderContent()}
          </div>
        </main>
      </div>

      <QRCodeModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        ticket={selectedTicket}
      />
    </div>
  );
}
