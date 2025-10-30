import React from 'react';
import { Bus, Phone, Mail, LogIn } from 'lucide-react';

export default function PublicHeader({ onLoginClick }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et nom */}
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Bus className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dakar Dem Dikk</h1>
              <p className="text-xs text-gray-600">Transport Public du Sénégal</p>
            </div>
          </div>

          {/* Informations de contact et connexion */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>+221 33 123 45 67</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>contact@dakardemlikk.sn</span>
              </div>
            </div>
            
            <button
              onClick={onLoginClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Se connecter</span>
            </button>
          </div>

          {/* Version mobile */}
          <div className="md:hidden">
            <button
              onClick={onLoginClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1"
            >
              <LogIn className="w-4 h-4" />
              <span>Connexion</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
