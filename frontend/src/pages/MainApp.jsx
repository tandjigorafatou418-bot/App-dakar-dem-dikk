import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard } from 'lucide-react';
import axios from 'axios';

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
import UsersList from '../components/UsersList';
import BusManagement from '../components/BusManagement';
import ReservationsList from '../components/ReservationsList';
import FinanceDashboard from '../components/FinanceDashboard';
import Settings from '../components/Settings';
import UserProfile from '../components/UserProfile';
import { AdminSupportPanel } from '../components/AdminSupportPanel';
import SubscriptionPlans from '../components/SubscriptionPlans';
import ExpressAIBD from '../components/ExpressAIBD';
import HeroSlider from '../components/HeroSlider';
import Chatbot from '../components/Chatbot';

const API_URL = 'http://localhost:5000/api';

export default function MainApp() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [userTickets, setUserTickets] = useState([]);

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeBuses: 0,
    dailyRevenue: 0,
    reservationsToday: 0,
  });

  // Charger statistiques admin
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

  // Charger tickets client
  useEffect(() => {
    if (user?.role === 'client') {
      loadUserTickets();
    }
  }, [user]);

  const loadUserTickets = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/reservations/user/${user.id}`
      );
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
  };

  const showQRCode = (ticket) => {
    setSelectedTicket(ticket);
    setQrModalOpen(true);
  };

  // 🏠 Page d’accueil client
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
            Bienvenue sur la plateforme{' '}
            <span className="text-blue-600">Dakar Dem Dikk</span>
          </h1>
          <p className="text-gray-700 mb-8 text-lg">
            Voyagez confortablement et réservez vos trajets en toute simplicité.
          </p>
          <button
            onClick={() => setActiveView('reservation')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg"
          >
            Réserver maintenant
          </button>
        </div>
      </div>
    </div>
  );

  // 🌐 Rendu principal selon rôle + page active
  const renderContent = () => {

    // 🧑‍💼 ADMIN
    if (user?.role === 'admin') {
      switch (activeView) {
        case 'dashboard': return <Dashboard stats={stats} />;
        case 'tracking': return <LiveTracking />;
        case 'users': return <UsersList />;
        case 'buses': return <BusManagement />;
        case 'routes': return (
          <div className="space-y-6">
            <StationsMap />
            <RoutesList type="urban" />
            <RoutesList type="interurban" />
          </div>
        );
        case 'reservations': return <ReservationsList />;
        case 'finance': return <FinanceDashboard />;
        case 'support': return <AdminSupportPanel />;
        case 'abonnements': return <SubscriptionPlans />;
        case 'expressAIBD': return <ExpressAIBD />;
        case 'settings': return <Settings />;
        default: return <Dashboard stats={stats} />;
      }
    }

    // 🧑‍🔧 AGENT
    if (user?.role === 'agent') {
      switch (activeView) {
        case 'dashboard': return <AgentDashboard activeView="dashboard" />;
        case 'buses': return <BusManagement />;
        case 'tracking': return <LiveTracking />;
        case 'reservations': return <ReservationsList />;
        case 'support': return <AdminSupportPanel />;
        case 'abonnements': return <SubscriptionPlans />;
        case 'expressAIBD': return <ExpressAIBD />;
        case 'profile': return <UserProfile />;
        default: return <AgentDashboard activeView="dashboard" />;
      }
    }

    // 🧍 CLIENT
    if (user?.role === 'client') {
      switch (activeView) {
        case 'dashboard': return renderHomePage();

        case 'reservation': 
          return (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Nouvelle Réservation</h2>
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
                  <p className="text-gray-600 mb-4">Aucune réservation enregistrée.</p>
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
                      className="bg-white border-2 border-gray-200 p-6 rounded-lg hover:shadow-lg"
                    >
                      <h3 className="text-xl font-bold">{ticket.route}</h3>
                      <p className="text-gray-600">Date : {ticket.date}</p>
                      <p className="text-gray-600 mb-4">Prix : {ticket.price} FCFA</p>
                      <button
                        onClick={() => showQRCode(ticket)}
                        className="bg-blue-600 hover:bg-blue-700 w-full text-white py-2 rounded-lg"
                      >
                        Voir QR Code
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

  // 🧩 Structure générale
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

      <Chatbot />
    </div>
  );
}