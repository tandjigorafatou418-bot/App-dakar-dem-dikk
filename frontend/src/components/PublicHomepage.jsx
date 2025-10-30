import React, { useState } from 'react';
import { 
  Bus, Clock, MapPin, Phone, Mail, Star, Headphones, X, ArrowRight, 
  Calendar, CreditCard, Map as MapIcon, UserPlus, Eye, EyeOff, Users 
} from 'lucide-react';
import { urbanRoutes, interurbanRoutes, urbanStations, interurbanStations } from '../data/stations';
import StationsMap from './StationsMap';
import LiveTracking from './LiveTracking';

export default function PublicHomepage({ onLoginClick }) {
  const [activeTab, setActiveTab] = useState('urban');
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

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
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

  const renderContent = () => {
    switch (selectedSection) {
      case 'schedules': return <div>Horaires...</div>;
      case 'prices': return <div>Tarifs...</div>;
      case 'stations': return <div>Stations...</div>;
      case 'contact': return <div>Contact...</div>;
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto py-4">
            {['home', 'schedules', 'prices', 'stations', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedSection === section
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {section === 'home' ? 'Accueil' :
                 section === 'schedules' ? 'Horaires' :
                 section === 'prices' ? 'Tarifs' :
                 section === 'stations' ? 'Gares' : 'Contact'}
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
            <button
              onClick={() => setShowSignupModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-6">Créer un compte</h2>
            <form className="space-y-4" onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Nom complet"
                required
                value={signupForm.name}
                onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={signupForm.email}
                onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <input
                type="tel"
                placeholder="Téléphone"
                required
                value={signupForm.phone}
                onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  required
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                  className="w-full px-4 py-2 pr-12 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                  className="w-full px-4 py-2 pr-12 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Créer un compte
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
