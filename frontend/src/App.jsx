import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PublicHeader from './components/PublicHeader';
import PublicHomepage from './components/PublicHomepage';
import LoginForm from './components/LoginForm';
import MainApp from './pages/MainApp';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [showLogin, setShowLogin] = React.useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (showLogin && !user) {
    return <LoginForm onBack={() => setShowLogin(false)} />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div>
          <PublicHeader onLoginClick={() => setShowLogin(true)} />
          <PublicHomepage onLoginClick={() => setShowLogin(true)} />
        </div>
      </div>
    );
  }

  return <MainApp />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}