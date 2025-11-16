import React, { useState } from 'react';
import { 
  Camera,
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
      passenger: 'Absa Niang', 
      time: '14:30', 
      price: 1000, 
      status: 'Vendu', 
      paymentMethod: 'Wave' 
    },
    { 
      id: 'DDK1704123457', 
      route: 'Plateau → Guédiawaye', 
      passenger: 'Arame Cisse', 
      time: '15:15', 
      price: 600, 
      status: 'Validé', 
      paymentMethod: 'Orange Money' 
    },
    { 
      id: 'DDK1704123458', 
      route: 'Dakar → Thiès', 
      passenger: 'Noguay Diouf', 
      time: '07:00', 
      price: 7500, 
      status: 'Vendu', 
      paymentMethod: 'Espèces' 
    }
  ];

  const calculatePrice = (departure, destination) => {
    const prices = {
      'Dakar-Thiès': 2500,
      'Dakar-Kaolack': 4500,
      'Dakar-Saint-Louis': 5500,
      'Plateau-Colobane': 500,
      'Colobane-Pikine': 750,
      'Dakar-Pikine': 500,
      'Plateau-Guediawaye': 600
    };
    return prices[`${departure}-${destination}`] || 2000;
  };

  const handleTicketSale = (e) => {
    e.preventDefault();
    const price = calculatePrice(ticketSaleForm.departure, ticketSaleForm.destination);
    const newTicket = {
      id: `DDK${Date.now()}`,
      ...ticketSaleForm,
      route: `${ticketSaleForm.departure} → ${ticketSaleForm.destination}`,
      price: price * ticketSaleForm.passengers,
      qrCode: `QR-${Date.now()}`,
      status: 'Vendu'
    };
    
    setSelectedTicket(newTicket);
    setShowQRModal(true);
    
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

  const handleQRScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScanResult({
        ticketId: 'DDK1704123456',
        passenger: 'Absa Niang',
        route: 'Dakar → Thiès',
        date: '2025-01-15',
        time: '14:30',
        status: Math.random() > 0.3 ? 'valid' : 'invalid',
        seatNumber: 'A12'
      });
      setIsScanning(false);
    }, 2000);
  };

  const handleIncidentReport = (e) => {
    e.preventDefault();
    alert('✅ Incident signalé!\n\nType: ' + incidentForm.type);
    setIncidentForm({
      type: '',
      description: '',
      busNumber: '',
      priority: 'normal'
    });
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex space-x-4 overflow-x-auto">
          {['dashboard', 'ticket-sale', 'qr-scanner', 'incidents'].map((section, idx) => (
            <button 
              key={section} 
              onClick={() => setActiveSection(section)}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap ${
                activeSection === section 
                  ? ['bg-emerald-600', 'bg-blue-600', 'bg-green-600', 'bg-orange-600'][idx] + ' text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {['Tableau de bord', 'Vente de Billets', 'Scanner QR Code', 'Signaler Incident'][idx]}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard */}
      {activeSection === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Billets vendus', value: todayStats.ticketsSold, icon: Ticket, color: 'emerald' },
              { label: 'Revenus', value: todayStats.revenue.toLocaleString(), icon: CreditCard, color: 'blue' },
              { label: 'Validés', value: todayStats.validatedTickets, icon: CheckCircle, color: 'green' },
              { label: 'Incidents', value: todayStats.incidents, icon: AlertTriangle, color: 'orange' }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`w-10 h-10 text-${stat.color}-600`} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h3 className="text-lg font-bold mb-4">Billets récents</h3>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['Référence', 'Passager', 'Trajet', 'Heure', 'Prix', 'Paiement'].map(h => (
                    <th key={h} className="px-4 py-2 text-left text-xs font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentTickets.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{t.id}</td>
                    <td className="px-4 py-3 text-sm">{t.passenger}</td>
                    <td className="px-4 py-3 text-sm">{t.route}</td>
                    <td className="px-4 py-3 text-sm">{t.time}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-emerald-600">{t.price} FCFA</td>
                    <td className="px-4 py-3 text-sm">{t.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Vente de Billets */}
      {activeSection === 'ticket-sale' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Ticket className="w-6 h-6 mr-2 text-blue-600" />
            Vente de Billets
          </h2>
          <form onSubmit={handleTicketSale} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {['departure', 'destination'].map((field, i) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-2">{['Départ', 'Destination'][i]}</label>
                  <select 
                    value={ticketSaleForm[field]} 
                    required
                    onChange={(e) => setTicketSaleForm({ ...ticketSaleForm, [field]: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner...</option>
                    {(i === 0 
                      ? ['Dakar', 'Plateau', 'Pikine', 'Thiès'] 
                      : ['Pikine', 'Guédiawaye', 'Thiès', 'Kaolack']
                    ).map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input 
                  type="date" 
                  value={ticketSaleForm.date} 
                  required 
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setTicketSaleForm({ ...ticketSaleForm, date: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Heure</label>
                <select 
                  value={ticketSaleForm.time} 
                  required
                  onChange={(e) => setTicketSaleForm({ ...ticketSaleForm, time: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner...</option>
                  {Array.from({length: 13}, (_, i) => `${6+i}:00`).map(t => 
                    <option key={t} value={t}>{t}</option>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Places</label>
                <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  value={ticketSaleForm.passengers} 
                  required
                  onChange={(e) => setTicketSaleForm({ ...ticketSaleForm, passengers: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nom du passager</label>
                <input 
                  type="text" 
                  value={ticketSaleForm.passengerName} 
                  required
                  onChange={(e) => setTicketSaleForm({ ...ticketSaleForm, passengerName: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                  placeholder="Nom complet" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Téléphone</label>
                <input 
                  type="tel" 
                  value={ticketSaleForm.phone} 
                  required
                  onChange={(e) => setTicketSaleForm({ ...ticketSaleForm, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                  placeholder="+221 XX XXX XX XX" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mode de paiement</label>
              <div className="grid grid-cols-3 gap-4">
                {['Wave', 'Orange Money', 'Espèces'].map(m => (
                  <button 
                    key={m} 
                    type="button"
                    onClick={() => setTicketSaleForm({ ...ticketSaleForm, paymentMethod: m })}
                    className={`p-3 border-2 rounded-lg ${
                      ticketSaleForm.paymentMethod === m 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              Vendre le billet
            </button>
          </form>
        </div>
      )}

      {/* Scanner QR Code */}
      {activeSection === 'qr-scanner' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <QrCode className="w-6 h-6 mr-2 text-green-600" />
            Scanner QR Code
          </h2>
          <div className="text-center">
            {!isScanning && !scanResult && (
              <div>
                <div className="w-64 h-64 mx-auto mb-6 border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <Camera className="w-24 h-24 text-gray-400" />
                </div>
                <button 
                  onClick={handleQRScan} 
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"
                >
                  Démarrer le scan
                </button>
              </div>
            )}

            {isScanning && (
              <div className="py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Scan en cours...</p>
              </div>
            )}

            {scanResult && (
              <div className={`p-6 rounded-lg ${
                scanResult.status === 'valid' 
                  ? 'bg-green-50 border-2 border-green-500' 
                  : 'bg-red-50 border-2 border-red-500'
              }`}>
                {scanResult.status === 'valid' 
                  ? <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" /> 
                  : <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                }
                <h3 className={`text-2xl font-bold mb-4 ${
                  scanResult.status === 'valid' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {scanResult.status === 'valid' ? 'Billet Valide ✓' : 'Billet Invalide ✗'}
                </h3>
                <div className="space-y-2 text-left max-w-md mx-auto">
                  <p><strong>Référence:</strong> {scanResult.ticketId}</p>
                  <p><strong>Passager:</strong> {scanResult.passenger}</p>
                  <p><strong>Trajet:</strong> {scanResult.route}</p>
                  <p><strong>Date:</strong> {scanResult.date}</p>
                  <p><strong>Heure:</strong> {scanResult.time}</p>
                </div>
                <button 
                  onClick={() => setScanResult(null)} 
                  className="mt-6 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
                >
                  Nouveau scan
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Signaler Incident */}
      {activeSection === 'incidents' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-orange-600" />
              Signaler un Incident
            </h2>
            <form onSubmit={handleIncidentReport} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Type d'incident</label>
                <select 
                  value={incidentForm.type} 
                  required
                  onChange={(e) => setIncidentForm({ ...incidentForm, type: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Sélectionner...</option>
                  {['Panne mécanique', 'Retard', 'Accident', 'Comportement passager', 'Autre'].map(t => 
                    <option key={t} value={t.toLowerCase()}>{t}</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Numéro du bus</label>
                <input 
                  type="text" 
                  value={incidentForm.busNumber} 
                  required
                  onChange={(e) => setIncidentForm({ ...incidentForm, busNumber: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" 
                  placeholder="Ex: DDD-001" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Priorité</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {v:'low', l:'Faible', c:'green'},
                    {v:'normal', l:'Normal', c:'blue'},
                    {v:'high', l:'Urgent', c:'red'}
                  ].map(p => (
                    <button 
                      key={p.v} 
                      type="button"
                      onClick={() => setIncidentForm({ ...incidentForm, priority: p.v })}
                      className={`p-3 border-2 rounded-lg ${
                        incidentForm.priority === p.v 
                          ? `border-${p.c}-500 bg-${p.c}-50` 
                          : 'border-gray-300'
                      }`}
                    >
                      {p.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea 
                  value={incidentForm.description} 
                  required 
                  rows={4}
                  onChange={(e) => setIncidentForm({ ...incidentForm, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" 
                  placeholder="Décrivez l'incident..." 
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold"
              >
                Signaler l'incident
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h3 className="text-lg font-bold mb-4">Incidents récents</h3>
            <div className="space-y-3">
              {[
                {type:'Retard', bus:'DDD-005', time:'30 min', priority:'normal'},
                {type:'Panne', bus:'DDD-012', time:'2h', priority:'high'}
              ].map((inc, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{inc.type} - Bus {inc.bus}</p>
                      <p className="text-sm text-gray-600">Il y a {inc.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      inc.priority === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {inc.priority === 'high' ? 'Urgent' : 'Normal'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <QRCodeModal 
        isOpen={showQRModal} 
        onClose={() => setShowQRModal(false)} 
        ticket={selectedTicket} 
      />
    </div>
  );
}