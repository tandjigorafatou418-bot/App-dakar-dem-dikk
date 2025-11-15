<<<<<<< HEAD
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard } from 'lucide-react';
=======
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
>>>>>>> 48f4252 (Mise à jour finale du projet)
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import LiveTracking from '../components/LiveTracking';
import ReservationForm from '../components/ReservationForm';
import StationsMap from '../components/StationsMap';
import RoutesList from '../components/RoutesList';
import QRCodeModal from '../components/QRCodeModal';
<<<<<<< HEAD
import TicketDownload from '../components/TicketDownload';
import AgentDashboard from '../components/AgentDashboard';
=======
import AgentDashboard from '../components/AgentDashboard';
import UsersList from '../components/UsersList';
import BusManagement from '../components/BusManagement';
import ReservationsList from '../components/ReservationsList';
import FinanceDashboard from '../components/FinanceDashboard';
import Settings from '../components/Settings';
import UserProfile from '../components/UserProfile';
import { AdminSupportPanel } from '../components/AdminSupportPanel';
import SubscriptionPlans from '../components/SubscriptionPlans';
import ExpressAIBD from '../components/ExpressAIBD';
import HeroSlider from '../components/HeroSlider'; // 🖼️ slider moderne
import Chatbot from '../components/Chatbot'; // 💬 chatbot intelligent

const API_URL = 'http://localhost:5000/api';
>>>>>>> 48f4252 (Mise à jour finale du projet)

export default function MainApp() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
<<<<<<< HEAD

  const stats = {
    totalUsers: 15847,
    activeBuses: 28,
    dailyRevenue: 847650,
    reservationsToday: 234,
=======
  const [userTickets, setUserTickets] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeBuses: 0,
    dailyRevenue: 0,
    reservationsToday: 0
  });

  // Charger les statistiques admin
  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await axios.get(`${API_URL}/stats`);
        if (response.data.success) {
          setStats(response.data.stats);
        }
      } catch (error) {
        console.error('Erreur chargement stats:', error);
      }
    };
    loadStats();
  }, []);

  // Charger les réservations utilisateur
  useEffect(() => {
    if (user?.role === 'client') {
      loadUserTickets();
    }
  }, [user]);

  const loadUserTickets = async () => {
    try {
      const response = await axios.get(`${API_URL}/reservations/user/${user.id}`);
      if (response.data.success) {
        setUserTickets(response.data.reservations);
      }
    } catch (error) {
      console.error('Erreur chargement billets:', error);
    }
  };

  const handleReservationSuccess = (newReservation) => {
    setUserTickets((prev) => [newReservation, ...prev]);
    setActiveView('tickets');
>>>>>>> 48f4252 (Mise à jour finale du projet)
  };

  const showQRCode = (ticket) => {
    setSelectedTicket(ticket);
    setQrModalOpen(true);
  };

<<<<<<< HEAD
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

=======
  // 🏠 Page d’accueil avec image floue + slider
  const renderHomePage = () => (
    <div className="relative bg-gray-100 min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-75 blur-sm"
        style={{ backgroundImage: "url('/images/dakar-dem-dikk-bg.jpg')" }}
      ></div>

      <div className="relative z-10">
        <HeroSlider />
        <div className="text-center mt-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Bienvenue sur la plateforme <span className="text-blue-600">Dakar Dem Dikk</span>
          </h1>
          <p className="text-gray-700 mb-8 text-lg">
            Voyagez confortablement et réservez vos trajets en toute simplicité.
          </p>
          <button
            onClick={() => setActiveView('reservation')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all"
          >
            Réserver maintenant
          </button>
        </div>
      </div>
    </div>
  );

  // 🌐 Contenu principal selon rôle et vue active
  const renderContent = () => {
    // 🧑‍💼 ADMIN
    if (user?.role === 'admin') {
      switch (activeView) {
        case 'dashboard': return <Dashboard stats={stats} />;
        case 'tracking': return <LiveTracking />;
        case 'users': return <UsersList />;
        case 'buses': return <BusManagement />;
        case 'routes':
          return (
            <div className="space-y-6">
              <StationsMap />
              <RoutesList type="urban" />
              <RoutesList type="interurban" />
            </div>
          );
        case 'reservations': return <ReservationsList />;
        case 'finance': return <FinanceDashboard />;

        // ✅ Pages spécifiques
        case 'support': return <AdminSupportPanel />;
        case 'abonnements': return <SubscriptionPlans />;
        case 'expressAIBD': return <ExpressAIBD />; // 🔥 corrige le nom du cas ici
        case 'settings': return <Settings />;

        default: return <Dashboard stats={stats} />;
      }
    }

    // 🧑‍🔧 AGENT
    // ========== AGENT ==========
if (user?.role === 'agent') {
  switch (activeView) {
    case 'dashboard':
      return <AgentDashboard activeView="dashboard" />;
    case 'buses':
      return <BusManagement />; // ✅ vue spécifique “Mes Bus”
    case 'tracking':
      return <LiveTracking />;
    case 'reservations':
      return <ReservationsList />;
    case 'support':
      return <AdminSupportPanel />;
    case 'abonnements':
      return <SubscriptionPlans />;
    case 'expressAIBD':
      return <ExpressAIBD />;
    case 'profile':
      return <UserProfile />;
    default:
      return <AgentDashboard activeView="dashboard" />;
  }
}



    // 🧍 CLIENT
    if (user?.role === 'client') {
      switch (activeView) {
        case 'dashboard': return renderHomePage();

        case 'reservation':
          return (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nouvelle Réservation</h2>
              <ReservationForm onSuccess={handleReservationSuccess} />
            </div>
          );

        case 'tracking': return <LiveTracking />;

        case 'tickets':
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Mes Billets</h2>
              {userTickets.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <p className="text-gray-600 mb-4">Aucune réservation pour l’instant.</p>
                  <button
                    onClick={() => setActiveView('reservation')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                  >
                    Réserver un billet
                  </button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {userTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <h3 className="text-xl font-bold text-gray-900">{ticket.route}</h3>
                      <p className="text-gray-600 mb-2">Date : {ticket.date}</p>
                      <p className="text-gray-600 mb-4">Prix : {ticket.price} FCFA</p>
                      <button
                        onClick={() => showQRCode(ticket)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                      >
                        Voir le QR Code
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );

        case 'profile': return <UserProfile />;

        default: return renderHomePage();
      }
    }

    return <div className="text-center py-12">Vue non définie</div>;
  };

  // 🧩 Structure principale
>>>>>>> 48f4252 (Mise à jour finale du projet)
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
<<<<<<< HEAD
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          showMenu={true}
        />

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8">
            {renderContent()}
          </div>
=======
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} showMenu={true} />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8">{renderContent()}</div>
>>>>>>> 48f4252 (Mise à jour finale du projet)
        </main>
      </div>

      <QRCodeModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        ticket={selectedTicket}
      />
<<<<<<< HEAD
=======

      {/* 💬 Chatbot amélioré */}
      <Chatbot />
>>>>>>> 48f4252 (Mise à jour finale du projet)
    </div>
  );
}
