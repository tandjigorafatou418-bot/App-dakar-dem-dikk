import React from 'react';
import { Bus, User, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import NotificationCenter from './NotificationCenter';
import DarkModeToggle from './DarkModeToggle';

export default function Header({ onMenuClick, showMenu = false }) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b-4 border-ddd-yellow-400 dark:border-ddd-green-500">
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
              <div className="bg-gradient-to-r from-ddd-yellow-500 to-ddd-red-500 p-2 rounded-lg">
                <Bus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Dakar Dem Dikk
               </h1>
                <p className="text-xs text-gray-600 dark:text-gray-300">Plateforme de Transport</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notification Center (uniquement pour clients) */}
            <NotificationCenter />
            
             {/* Bouton Dark Mode */}
             <DarkModeToggle />
         <div className="flex items-center space-x-3"></div>


            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                <p className={`text-xs font-semibold capitalize ${
                   user?.role === 'admin' ? 'text-purple-600 dark:text-purple-400' :
                   user?.role === 'agent' ? 'text-blue-600 dark:text-blue-400' : 'text-ddd-green-600 dark:text-ddd-green-400'
                }`}>
                  {user?.role === 'admin' ? 'Administrateur' :
                   user?.role === 'agent' ? 'Agent' : 'Client'}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-ddd-yellow-500 to-ddd-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
             <button
               onClick={logout}
                className="text-sm text-ddd-red-600 dark:text-ddd-red-400 hover:text-ddd-red-700 dark:hover:text-ddd-red-300 font-semibold transition-colors"
              >
              Déconnexion
             </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}