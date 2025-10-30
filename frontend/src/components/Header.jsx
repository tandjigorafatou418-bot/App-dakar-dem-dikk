import React from 'react';
import { Bus, User, Bell, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Header({ onMenuClick, showMenu = false }) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
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
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Bus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dakar Dem Dikk</h1>
                <p className="text-xs text-gray-600">Plateforme de Transport</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <button
                onClick={logout}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
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
