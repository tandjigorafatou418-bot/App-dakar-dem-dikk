import React from 'react';
import { 
  Home, 
  Map, 
  Calendar, 
  Users, 
  Settings, 
  BarChart3, 
  Bus,
  CreditCard,
  User, 
  Ticket,
  Plane,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar({ activeView, setActiveView, isOpen, onClose }) {
  const { user } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', name: 'Tableau de bord', icon: Home },
      { id: 'tracking', name: 'Suivi en temps réel', icon: Map },
      { id: 'support', name: 'Support Client', icon: MessageCircle },
      { id: 'abonnements', name: 'Abonnements', icon: Ticket },
      { id: 'expressAIBD', name: 'Express AIBD', icon: Plane },
    ];

    if (user && user.role === 'admin') {
      return [
        ...baseItems,
        { id: 'users', name: 'Utilisateurs', icon: Users },
        { id: 'buses', name: 'Flotte de bus', icon: Bus },
        { id: 'routes', name: 'Lignes & Gares', icon: BarChart3 },
        { id: 'reservations', name: 'Réservations', icon: Calendar },
        { id: 'finance', name: 'Finances', icon: CreditCard },
        { id: 'settings', name: 'Paramètres', icon: Settings },
      ];
    } else if (user && user.role === 'agent') {
      return [
        ...baseItems,
        { id: 'buses', name: 'Mes bus', icon: Bus },
        { id: 'reservations', name: 'Réservations', icon: Calendar },
        { id: 'profile', name: 'Mon profil', icon: User },
      ];
    } else {
      return [
        { id: 'dashboard', name: 'Accueil', icon: Home },
        { id: 'reservation', name: 'Réserver', icon: Calendar },
        { id: 'tracking', name: 'Suivi des bus', icon: Map },
        { id: 'tickets', name: 'Mes billets', icon: CreditCard },
        { id: 'profile', name: 'Mon profil', icon: User },
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:sticky top-0 left-0 z-50 md:z-auto
        w-64 h-screen bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Dakar Dem Dikk</h2>
                <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveView(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeView === item.id
                        ? 'bg-emerald-100 text-emerald-700 border-r-2 border-emerald-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}