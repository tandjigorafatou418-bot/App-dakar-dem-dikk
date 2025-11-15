import React from 'react';
<<<<<<< HEAD
import { Bus, User, Bell, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
=======
import { Bus, User, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import NotificationCenter from './NotificationCenter';
>>>>>>> 48f4252 (Mise à jour finale du projet)

export default function Header({ onMenuClick, showMenu = false }) {
  const { user, logout } = useAuth();

  return (
<<<<<<< HEAD
    <header className="bg-white shadow-sm border-b border-gray-200">
=======
    <header className="bg-white shadow-sm border-b-4 border-ddd-yellow-400">
>>>>>>> 48f4252 (Mise à jour finale du projet)
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {showMenu && (
              <button
                onClick={onMenuClick}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <div className="flex items-center space-x-3">
<<<<<<< HEAD
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Bus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dakar Dem Dikk</h1>
=======
              <div className="bg-gradient-to-r from-ddd-yellow-500 to-ddd-red-500 p-2 rounded-lg">
                <Bus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-ddd-yellow-600 to-ddd-red-600 bg-clip-text text-transparent">
                  Dakar Dem Dikk
                </h1>
>>>>>>> 48f4252 (Mise à jour finale du projet)
                <p className="text-xs text-gray-600">Plateforme de Transport</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
<<<<<<< HEAD
            <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
=======
            {/* Notification Center (uniquement pour clients) */}
            <NotificationCenter />
>>>>>>> 48f4252 (Mise à jour finale du projet)
            
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
<<<<<<< HEAD
                <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
=======
                <p className={`text-xs font-semibold capitalize ${
                  user?.role === 'admin' ? 'text-purple-600' :
                  user?.role === 'agent' ? 'text-blue-600' : 'text-ddd-green-600'
                }`}>
                  {user?.role === 'admin' ? 'Administrateur' :
                   user?.role === 'agent' ? 'Agent' : 'Client'}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-ddd-yellow-500 to-ddd-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
>>>>>>> 48f4252 (Mise à jour finale du projet)
                <User className="w-6 h-6 text-white" />
              </div>
              <button
                onClick={logout}
<<<<<<< HEAD
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
=======
                className="text-sm text-ddd-red-600 hover:text-ddd-red-700 font-semibold transition-colors"
>>>>>>> 48f4252 (Mise à jour finale du projet)
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 48f4252 (Mise à jour finale du projet)
