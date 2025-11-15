import React, { useState } from 'react';
<<<<<<< HEAD
import { 
  Bus, Clock, MapPin, Phone, Mail, Star, Headphones, X, ArrowRight, 
  Calendar, CreditCard, Map as MapIcon, UserPlus, Eye, EyeOff, Users 
} from 'lucide-react';
import { urbanRoutes, interurbanRoutes, urbanStations, interurbanStations } from '../data/stations';
import StationsMap from './StationsMap';
import LiveTracking from './LiveTracking';

export default function PublicHomepage({ onLoginClick }) {
  const [activeTab, setActiveTab] = useState('urban');
=======
import NewsSlider from './NewsSlider';
import ExpressAIBD from './ExpressAIBD';
import SocialMediaSidebar from './SocialMediaSidebar';
import { 
  Bus, Clock, MapPin, Phone, Mail, Calendar, CreditCard, 
  Map as MapIcon, UserPlus, Eye, EyeOff, Users, ArrowRight,
  Navigation, DollarSign, MapPinned, MessageCircle
} from 'lucide-react';
import { urbanRoutes, interurbanRoutes, urbanStations, interurbanStations } from '../data/stations';

export default function PublicHomepage({ onLoginClick }) {
>>>>>>> 48f4252 (Mise à jour finale du projet)
  const [selectedSection, setSelectedSection] = useState('home');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupForm, setSignupForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReservationClick = () => {
    alert('Vous devez vous connecter pour faire une réservation');
    onLoginClick();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    alert('Compte créé avec succès! Vous pouvez maintenant vous connecter.');
    setShowSignupModal(false);
    setSignupForm({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    onLoginClick();
  };

<<<<<<< HEAD
  // ------------------------ RENDER FUNCTIONS ------------------------

  const renderHome = () => (
    <div className="space-y-12">
      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl text-white p-8 md:p-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Voyagez en toute simplicité avec Dakar Dem Dikk
          </h1>
          <p className="text-xl mb-8 text-emerald-100">
            Réservez vos billets en ligne, suivez vos trajets en temps réel et profitez d'un transport moderne et confortable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleReservationClick}
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Réserver maintenant</span>
            </button>
            <button
              onClick={() => setShowSignupModal(true)}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors flex items-center justify-center space-x-2"
            >
              <UserPlus className="w-5 h-5" />
              <span>Créer un compte</span>
            </button>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
=======
  // ==================== SECTION ACCUEIL ====================
  const renderHome = () => (
    <div className="space-y-12">
      {/* Slider d'actualités - REMPLACE LE BLOC GRIS */}
      <NewsSlider />

      {/* Express AIBD */}
      <ExpressAIBD />

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
>>>>>>> 48f4252 (Mise à jour finale du projet)
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Bus className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Transport Urbain</h3>
          <p className="text-gray-600 mb-6">
            Déplacez-vous facilement dans Dakar et sa banlieue avec nos lignes urbaines modernes et confortables.
          </p>
          <button
            onClick={() => setSelectedSection('schedules')}
            className="text-blue-600 font-semibold flex items-center space-x-2 hover:text-blue-700 transition-colors"
          >
            <span>Voir les horaires</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

<<<<<<< HEAD
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
=======
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
>>>>>>> 48f4252 (Mise à jour finale du projet)
          <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <MapPin className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Transport Interurbain</h3>
          <p className="text-gray-600 mb-6">
            Voyagez vers les autres régions du Sénégal avec nos liaisons interurbaines sûres et ponctuelles.
          </p>
          <button
            onClick={() => setSelectedSection('stations')}
            className="text-emerald-600 font-semibold flex items-center space-x-2 hover:text-emerald-700 transition-colors"
          >
            <span>Voir les destinations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Pourquoi choisir Dakar Dem Dikk ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Ponctualité</h3>
            <p className="text-gray-600">
              Nos bus respectent les horaires pour que vous arriviez toujours à l'heure.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Paiement facile</h3>
            <p className="text-gray-600">
              Payez en ligne avec Wave, Orange Money ou en espèces à bord.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapIcon className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Suivi temps réel</h3>
            <p className="text-gray-600">
              Suivez votre bus en temps réel et ne ratez plus jamais votre trajet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

<<<<<<< HEAD
  const renderContent = () => {
    switch (selectedSection) {
      case 'schedules': return <div>Horaires...</div>;
      case 'prices': return <div>Tarifs...</div>;
      case 'stations': return <div>Stations...</div>;
      case 'contact': return <div>Contact...</div>;
=======
  // ==================== SECTION HORAIRES ====================
  const renderSchedules = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8">
        <Clock className="w-12 h-12 mb-4" />
        <h1 className="text-4xl font-bold mb-4">Horaires des Bus</h1>
        <p className="text-xl text-blue-100">
          Consultez les horaires de nos lignes urbaines et interurbaines
        </p>
      </div>

      {/* Lignes Urbaines */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Bus className="w-6 h-6 mr-3 text-emerald-600" />
          Lignes Urbaines
        </h2>
        <div className="grid gap-4">
          {urbanRoutes.map((route) => (
            <div key={route.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{route.name}</h3>
                  <p className="text-sm text-gray-600">{route.startPoint} → {route.endPoint}</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                  {route.price} FCFA
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{route.duration} min</span>
                </div>
                <div className="flex items-center">
                  <Navigation className="w-4 h-4 mr-1" />
                  <span>{route.distance} km</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{route.frequency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lignes Interurbaines */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <MapPin className="w-6 h-6 mr-3 text-amber-600" />
          Lignes Interurbaines
        </h2>
        <div className="grid gap-4">
          {interurbanRoutes.map((route) => (
            <div key={route.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-amber-500 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{route.name}</h3>
                  <p className="text-sm text-gray-600">{route.startPoint} → {route.endPoint}</p>
                </div>
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                  {route.price} FCFA
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{route.duration} min</span>
                </div>
                <div className="flex items-center">
                  <Navigation className="w-4 h-4 mr-1" />
                  <span>{route.distance} km</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{route.frequency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ==================== SECTION TARIFS ====================
  const renderPrices = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-8">
        <DollarSign className="w-12 h-12 mb-4" />
        <h1 className="text-4xl font-bold mb-4">Tarifs</h1>
        <p className="text-xl text-purple-100">
          Grille tarifaire de nos services de transport
        </p>
      </div>

      {/* Tarifs Urbains */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Transport Urbain</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ligne</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Distance</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tarif Normal</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Abonnement Mensuel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {urbanRoutes.map((route) => (
                <tr key={route.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{route.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{route.distance} km</td>
                  <td className="px-6 py-4 text-sm font-semibold text-emerald-600">{route.price} FCFA</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">{route.price * 20} FCFA</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tarifs Interurbains */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Transport Interurbain</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ligne</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Distance</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tarif Standard</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tarif VIP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {interurbanRoutes.map((route) => (
                <tr key={route.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{route.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{route.distance} km</td>
                  <td className="px-6 py-4 text-sm font-semibold text-amber-600">{route.price} FCFA</td>
                  <td className="px-6 py-4 text-sm font-semibold text-purple-600">{Math.round(route.price * 1.5)} FCFA</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Réductions */}
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6 border-2 border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Réductions disponibles</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">-50%</div>
            <div className="font-semibold text-gray-900">Étudiants</div>
            <div className="text-sm text-gray-600">Avec carte d'étudiant valide</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-3xl font-bold text-emerald-600 mb-2">-30%</div>
            <div className="font-semibold text-gray-900">Seniors (+60 ans)</div>
            <div className="text-sm text-gray-600">Carte d'identité requise</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">-20%</div>
            <div className="font-semibold text-gray-900">Abonnement</div>
            <div className="text-sm text-gray-600">Sur les tarifs mensuels</div>
          </div>
        </div>
      </div>
    </div>
  );

  // ==================== SECTION GARES ====================
  const renderStations = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl p-8">
        <MapPinned className="w-12 h-12 mb-4" />
        <h1 className="text-4xl font-bold mb-4">Nos Gares</h1>
        <p className="text-xl text-emerald-100">
          Trouvez la gare la plus proche de vous
        </p>
      </div>

      {/* Gares Urbaines */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Gares Urbaines (Dakar)</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {urbanStations.map((station) => (
            <div key={station.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{station.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {station.city}, {station.region}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  station.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {station.status === 'active' ? 'Actif' : 'Maintenance'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {station.facilities.map((facility, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                    {facility}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gares Interurbaines */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Gares Interurbaines</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {interurbanStations.map((station) => (
            <div key={station.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-amber-500 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{station.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {station.city}, {station.region}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  station.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {station.status === 'active' ? 'Actif' : 'Maintenance'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {station.facilities.map((facility, idx) => (
                  <span key={idx} className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded">
                    {facility}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ==================== SECTION CONTACT ====================
  const renderContact = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8">
        <MessageCircle className="w-12 h-12 mb-4" />
        <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
        <p className="text-xl text-blue-100">
          Notre équipe est à votre écoute 7j/7
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulaire de contact */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
              <input
                type="text"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+221 XX XXX XX XX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Votre message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Envoyer le message
            </button>
          </form>
        </div>

        {/* Informations de contact */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Nos coordonnées</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Téléphone</div>
                  <div className="text-gray-600">+221 33 123 45 67</div>
                  <div className="text-gray-600">+221 77 123 45 67</div>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Email</div>
                  <div className="text-gray-600">contact@dakardemlikk.sn</div>
                  <div className="text-gray-600">support@dakardemlikk.sn</div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Adresse</div>
                  <div className="text-gray-600">
                    Gare Routière Pompiers<br />
                    Dakar, Sénégal
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-6 border-2 border-emerald-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Horaires d'ouverture</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span className="font-semibold">6h00 - 22h00</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi</span>
                <span className="font-semibold">7h00 - 21h00</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche</span>
                <span className="font-semibold">8h00 - 20h00</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Service client 24/7</h3>
            <p className="text-gray-700 mb-4">
              Notre service client est disponible 24h/24 et 7j/7 pour répondre à toutes vos questions.
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Chat en direct
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ==================== RENDU PRINCIPAL ====================
  const renderContent = () => {
    switch (selectedSection) {
      case 'schedules': return renderSchedules();
      case 'prices': return renderPrices();
      case 'stations': return renderStations();
      case 'contact': return renderContact();
>>>>>>> 48f4252 (Mise à jour finale du projet)
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
<<<<<<< HEAD
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto py-4">
            {['home', 'schedules', 'prices', 'stations', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedSection === section
=======
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto py-4">
            {[
              { id: 'home', label: 'Accueil', icon: Bus },
              { id: 'schedules', label: 'Horaires', icon: Clock },
              { id: 'prices', label: 'Tarifs', icon: CreditCard },
              { id: 'stations', label: 'Gares', icon: MapPin },
              { id: 'contact', label: 'Contact', icon: Phone }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  selectedSection === section.id
>>>>>>> 48f4252 (Mise à jour finale du projet)
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
<<<<<<< HEAD
                {section === 'home' ? 'Accueil' :
                 section === 'schedules' ? 'Horaires' :
                 section === 'prices' ? 'Tarifs' :
                 section === 'stations' ? 'Gares' : 'Contact'}
=======
                <section.icon className="w-4 h-4" />
                <span>{section.label}</span>
>>>>>>> 48f4252 (Mise à jour finale du projet)
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderContent()}
      </main>

      {/* Footer */}
<<<<<<< HEAD
      <footer className="bg-gray-900 text-gray-200 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">Dakar Dem Dikk</h4>
            <p>Transport moderne et fiable à travers le Sénégal.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Liens utiles</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setSelectedSection('home')}>Accueil</button></li>
              <li><button onClick={() => setSelectedSection('schedules')}>Horaires</button></li>
              <li><button onClick={() => setSelectedSection('stations')}>Gares</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="flex items-center space-x-2"><Phone className="w-4 h-4" /><span>+221 33 123 45 67</span></p>
            <p className="flex items-center space-x-2"><Mail className="w-4 h-4" /><span>contact@dakkardem.com</span></p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Suivez-nous</h4>
            <p>Facebook / Twitter / Instagram</p>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md relative">
=======
      <footer className="bg-gray-900 text-gray-200 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4 text-white">Dakar Dem Dikk</h4>
            <p className="text-sm">Transport moderne et fiable à travers le Sénégal.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Liens utiles</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setSelectedSection('home')} className="hover:text-emerald-400">Accueil</button></li>
              <li><button onClick={() => setSelectedSection('schedules')} className="hover:text-emerald-400">Horaires</button></li>
              <li><button onClick={() => setSelectedSection('stations')} className="hover:text-emerald-400">Gares</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Contact</h4>
            <p className="text-sm flex items-center mb-2">
              <Phone className="w-4 h-4 mr-2" />
              +221 33 123 45 67
            </p>
            <p className="text-sm flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              contact@dakardemlikk.sn
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Suivez-nous</h4>
            <p className="text-sm">Facebook / Twitter / Instagram</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          © 2025 Dakar Dem Dikk. Tous droits réservés.
        </div>
      </footer>

      {/* Modal d'inscription */}
      {showSignupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
>>>>>>> 48f4252 (Mise à jour finale du projet)
            <button
              onClick={() => setShowSignupModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
<<<<<<< HEAD
              <X className="w-5 h-5" />
=======
              ✕
>>>>>>> 48f4252 (Mise à jour finale du projet)
            </button>
            <h2 className="text-2xl font-bold mb-6">Créer un compte</h2>
            <form className="space-y-4" onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Nom complet"
                required
                value={signupForm.name}
                onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
<<<<<<< HEAD
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
=======
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
>>>>>>> 48f4252 (Mise à jour finale du projet)
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={signupForm.email}
                onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
<<<<<<< HEAD
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
=======
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
>>>>>>> 48f4252 (Mise à jour finale du projet)
              />
              <input
                type="tel"
                placeholder="Téléphone"
                required
                value={signupForm.phone}
                onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
<<<<<<< HEAD
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
=======
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
>>>>>>> 48f4252 (Mise à jour finale du projet)
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  required
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
<<<<<<< HEAD
                  className="w-full px-4 py-2 pr-12 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
=======
                  className="w-full px-4 py-2 pr-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
>>>>>>> 48f4252 (Mise à jour finale du projet)
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmer le mot de passe"
                  required
                  value={signupForm.confirmPassword}
                  onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
<<<<<<< HEAD
                  className="w-full px-4 py-2 pr-12 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
=======
                  className="w-full px-4 py-2 pr-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
>>>>>>> 48f4252 (Mise à jour finale du projet)
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <button
                type="submit"
<<<<<<< HEAD
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
=======
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
>>>>>>> 48f4252 (Mise à jour finale du projet)
              >
                Créer un compte
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 48f4252 (Mise à jour finale du projet)
