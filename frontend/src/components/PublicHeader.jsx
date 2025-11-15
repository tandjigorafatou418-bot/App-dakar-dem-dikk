import React from 'react';
import { Bus, Phone, Mail, LogIn } from 'lucide-react';

export default function PublicHeader({ onLoginClick }) {
  return (
<<<<<<< HEAD
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
=======
    <header className="bg-gradient-to-r from-ddd-yellow-500 to-ddd-red-500 shadow-lg border-b-4 border-ddd-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo et nom */}
          <div className="flex items-center space-x-4">
            {/* Logo SVG Dakar Dem Dikk */}
            <div className="relative">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-ddd-green-600">
                <svg viewBox="0 0 100 100" className="w-12 h-12">
                  {/* Bus stylisé */}
                  <rect x="15" y="30" width="70" height="50" rx="8" fill="#F59E0B" />
                  <rect x="20" y="35" width="60" height="30" fill="#EF4444" />
                  {/* Roues */}
                  <circle cx="30" cy="75" r="8" fill="#16A34A" />
                  <circle cx="70" cy="75" r="8" fill="#16A34A" />
                  {/* Fenêtres */}
                  <rect x="25" y="40" width="15" height="15" fill="white" opacity="0.9" />
                  <rect x="45" y="40" width="15" height="15" fill="white" opacity="0.9" />
                  <rect x="65" y="40" width="15" height="15" fill="white" opacity="0.9" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                Dakar Dem Dikk
              </h1>
              <p className="text-sm text-white/90 font-medium">
                🇸🇳 Transport Public du Sénégal
              </p>
>>>>>>> 48f4252 (Mise à jour finale du projet)
            </div>
          </div>

          {/* Informations de contact et connexion */}
          <div className="hidden md:flex items-center space-x-6">
<<<<<<< HEAD
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>+221 33 123 45 67</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>contact@dakardemlikk.sn</span>
=======
            <div className="flex items-center space-x-4 text-sm text-white">
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm">
                <Phone className="w-4 h-4" />
                <span className="font-medium">+221 33 123 45 67</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm">
                <Mail className="w-4 h-4" />
                <span className="font-medium">contact@dakardemlikk.sn</span>
>>>>>>> 48f4252 (Mise à jour finale du projet)
              </div>
            </div>
            
            <button
              onClick={onLoginClick}
<<<<<<< HEAD
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <LogIn className="w-4 h-4" />
=======
              className="bg-white text-ddd-red-600 px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-ddd-green-50 transition-all transform hover:scale-105 flex items-center space-x-2 border-2 border-ddd-green-600"
            >
              <LogIn className="w-5 h-5" />
>>>>>>> 48f4252 (Mise à jour finale du projet)
              <span>Se connecter</span>
            </button>
          </div>

          {/* Version mobile */}
          <div className="md:hidden">
            <button
              onClick={onLoginClick}
<<<<<<< HEAD
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1"
=======
              className="bg-white text-ddd-red-600 px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-ddd-green-50 transition-all flex items-center space-x-2"
>>>>>>> 48f4252 (Mise à jour finale du projet)
            >
              <LogIn className="w-4 h-4" />
              <span>Connexion</span>
            </button>
          </div>
        </div>
<<<<<<< HEAD
      </div>
    </header>
  );
}
=======

        {/* Barre Express AIBD */}
        <div className="pb-3">
          <div className="bg-ddd-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white text-ddd-green-600 p-2 rounded">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                </svg>
              </div>
              <div>
                <p className="font-bold text-sm">✈️ EXPRESS AIBD</p>
                <p className="text-xs text-white/90">Navettes Aéroport Blaise Diagne ⚡</p>
              </div>
            </div>
            <button className="bg-white text-ddd-green-600 px-4 py-1 rounded-lg text-sm font-bold hover:bg-ddd-yellow-400 transition-colors">
              Réserver
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
>>>>>>> 48f4252 (Mise à jour finale du projet)
