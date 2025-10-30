import React, { useState } from 'react';
import { 
  Scan, 
  Plus, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Users, 
  Bus, 
  CreditCard,
  Clock,
  MapPin,
  Phone,
  QrCode,
  Download,
  Search,
  Filter,
  Ticket
} from 'lucide-react';
import QRCodeModal from './QRCodeModal';

export default function AgentDashboard({ activeView, setActiveView }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  const [ticketSaleForm, setTicketSaleForm] = useState({
    departure: '',
    destination: '',
    date: '',
    time: '',
    passengers: 1,
    passengerName: '',
    phone: '',
    paymentMethod: ''
  });

  const [incidentForm, setIncidentForm] = useState({
    type: '',
    description: '',
    busNumber: '',
    priority: 'normal'
  });

  const todayStats = {
    ticketsSold: 45,
    revenue: 67500,
    validatedTickets: 38,
    incidents: 2
  };

  const recentTickets = [
    {
      id: 'DDK1704123456',
      route: 'Dakar → Pikine',
      passenger: 'Fatou Diakho',
      time: '14:30',
      price: 500,
      status: 'Vendu',
      paymentMethod: 'Orange Money'
    },
    {
      id: 'DDK1704123457',
      route: 'Plateau → Guédiawaye',
      passenger: 'Absa Niang',
      time: '15:15',
      price: 600,
      status: 'Validé',
      paymentMethod: 'Wave'
    }
  ];

  const handleTicketSale = (e) => {
    e.preventDefault();
    const newTicket = {
      id: `TK${Date.now()}`,
      ...ticketSaleForm,
      price: calculatePrice(ticketSaleForm.departure, ticketSaleForm.destination),
      qrCode: `QR-${Date.now()}`,
      status: 'Vendu'
    };
    
    setSelectedTicket(newTicket);
    setShowQRModal(true);
    
    alert(`Billet vendu avec succès!\nNuméro: ${newTicket.id}\nPrix: ${newTicket.price} FCFA`);
    setTicketSaleForm({
      departure: '',
      destination: '',
      date: '',
      time: '',
      passengers: 1,
      passengerName: '',
      phone: '',
      paymentMethod: ''
    });
  };

  const calculatePrice = (departure, destination) => {
    const prices = {
      'Dakar-Thiès': 2500,
      'Dakar-Kaolack': 3500,
      'Dakar-Saint-Louis': 4500,
      'Plateau-Colobane': 500,
      'Colobane-Pikine': 750,
      'Dakar-Pikine': 500,
      'Plateau-Guediawaye': 600
    };
    return prices[`${departure}-${destination}`] || 2000;
  };

  const handleQRScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const mockScanResult = {
        ticketId: 'TK123456789',
        passenger: 'Fatou Diakho',
        route: 'Dakar → Thiès',
        date: '2025-01-15',
        time: '14:30',
        status: Math.random() > 0.3 ? 'valid' : 'invalid',
        seatNumber: 'A12'
      };
      setScanResult(mockScanResult);
      setIsScanning(false);
    }, 2000);
  };

  const handleIncidentReport = (e) => {
    e.preventDefault();
    alert('Incident signalé avec succès!');
    setIncidentForm({
      type: '',
      description: '',
      busNumber: '',
      priority: 'normal'
    });
  };

  // === Rendu ===

  const renderTicketSale = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Ticket className="w-6 h-6 mr-2 text-blue-600" />
        Vente de Billets
      </h2>
      <form onSubmit={handleTicketSale} className="space-y-4">
        {/* Form fields ici (départ, destination, date, heure, passagers...) */}
        {/* ... conserver tout le JSX existant */}
      </form>
    </div>
  );

  const renderQRScanner = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <QrCode className="w-6 h-6 mr-2 text-green-600" />
        Scanner QR Code
      </h2>
      {/* Contenu du scanner */}
    </div>
  );

  const renderIncidents = () => (
    <div className="space-y-6">
      {/* Formulaire et incidents récents */}
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Statistiques et tickets récents */}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'ticket-sale': return renderTicketSale();
      case 'qr-scanner': return renderQRScanner();
      case 'incidents': return renderIncidents();
      default: return renderDashboard();
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex space-x-4 overflow-x-auto">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeSection === 'dashboard' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Tableau de bord
          </button>
          <button
            onClick={() => setActiveSection('ticket-sale')}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeSection === 'ticket-sale' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Vente de Billets
          </button>
          <button
            onClick={() => setActiveSection('qr-scanner')}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeSection === 'qr-scanner' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Scanner QR Code
          </button>
          <button
            onClick={() => setActiveSection('incidents')}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeSection === 'incidents' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Signaler Incident
          </button>
        </div>
      </div>

      {renderContent()}

      <QRCodeModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        ticket={selectedTicket}
      />
    </div>
  );
}
