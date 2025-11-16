import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import PublicHeader from './components/PublicHeader';
import PublicHomepage from './components/PublicHomepage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import MainApp from './pages/MainApp';
import Chatbot from './components/Chatbot';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Chargement...</p>
        </div>
      </div>
    );
  }

  // Formulaire de connexion
  if (showLogin && !user) {
    return <LoginForm onBack={() => {
      setShowLogin(false);
      setShowSignup(false);
    }} />;
  }

  // Formulaire d'inscription
  if (showSignup && !user) {
    return (
      <SignupForm 
        onBack={() => {
          setShowSignup(false);
          setShowLogin(true);
        }} 
        onSuccess={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    );
  }

  if (!user) {
    // Version publique pour les utilisateurs non connectés
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <PublicHeader 
          onLoginClick={() => setShowLogin(true)} 
          onSignupClick={() => setShowSignup(true)} 
        />
        <PublicHomepage onLoginClick={() => setShowLogin(true)} />
      </div>
    );
  }

  // Version privée pour les utilisateurs connectés
  return (
    <>
      <MainApp />
      <Chatbot />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}