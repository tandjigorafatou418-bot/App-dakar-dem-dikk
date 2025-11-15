import React, { useState, useEffect } from 'react';
import { Bell, X, Check, AlertCircle, Info, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function NotificationCenter() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Notifications de démo
    if (user?.role === 'client') {
      setNotifications([
        {
          id: 1,
          type: 'success',
          title: '✅ Réservation confirmée',
          message: 'Votre billet pour Dakar → Pikine (15/01/2025 à 14:30) est confirmé.',
          time: '5 min',
          read: false
        },
        {
          id: 2,
          type: 'info',
          title: '📢 Nouveau service Express AIBD',
          message: 'Profitez de nos navettes pour l\'aéroport Blaise Diagne. Réservez maintenant !',
          time: '1h',
          read: false
        },
        {
          id: 3,
          type: 'warning',
          title: '⚠️ Modification d\'horaire',
          message: 'Le départ de 16:00 pour Thiès est reporté à 16:30.',
          time: '2h',
          read: true
        }
      ]);
    }
  }, [user]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <Check className="w-5 h-5 text-ddd-green-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-ddd-yellow-600" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-ddd-red-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  if (user?.role !== 'client') return null;

  return (
    <div className="relative">
      {/* Bouton notification */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-ddd-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Panneau notifications */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border-2 border-ddd-yellow-400 z-50 max-h-96 overflow-hidden">
            <div className="bg-gradient-to-r from-ddd-yellow-500 to-ddd-red-500 p-4 flex items-center justify-between">
              <h3 className="text-white font-bold flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifications ({unreadCount})
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-80">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>Aucune notification</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b hover:bg-gray-50 transition-colors ${
                      !notif.read ? 'bg-ddd-yellow-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="mt-1">{getIcon(notif.type)}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm">{notif.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                          <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>Il y a {notif.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1">
                        {!notif.read && (
                          <button
                            onClick={() => markAsRead(notif.id)}
                            className="text-ddd-green-600 hover:text-ddd-green-700 p-1"
                            title="Marquer comme lu"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notif.id)}
                          className="text-ddd-red-600 hover:text-ddd-red-700 p-1"
                          title="Supprimer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-3 bg-gray-50 border-t">
                <button
                  onClick={() => setNotifications([])}
                  className="w-full text-center text-sm text-ddd-red-600 hover:text-ddd-red-700 font-medium"
                >
                  Tout effacer
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}