import React, { useState } from 'react';
import { Bus, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginForm({ onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (!success) {
      setError('Email ou mot de passe incorrect');
    }
  };

  const demoAccounts = [
    { role: 'Administrateur', email: 'admin@dakardemlikk.sn', password: 'admin123' },
    { role: 'Agent', email: 'agent@dakardemlikk.sn', password: 'agent123' },
    { role: 'Client', email: 'client@dakardemlikk.sn', password: 'client123' },
  ];

  const fillDemo = (email, password) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-4">
            <Bus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Dakar Dem Dikk</h1>
          <p className="text-gray-600 mt-2">Connectez-vous à votre compte</p>
        </div>

        {/* Demo Accounts */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-blue-900 mb-3">Comptes de démonstration:</h3>
          <div className="space-y-2">
            {demoAccounts.map((account, index) => (
              <button
                key={index}
                onClick={() => fillDemo(account.email, account.password)}
                className="w-full text-left p-2 rounded bg-white hover:bg-blue-50 border border-blue-200 transition-colors text-sm"
              >
                <div className="font-medium text-blue-900">{account.role}</div>
                <div className="text-blue-700">{account.email}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Votre mot de passe"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Connexion...
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            {onBack && (
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-gray-700 font-medium mr-4"
              >
                ← Retour à l'accueil
              </button>
            )}
            <p className="text-gray-600 text-sm">
              Mot de passe oublié? 
              <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium ml-1">
                Réinitialiser
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2025 Dakar Dem Dikk. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}
