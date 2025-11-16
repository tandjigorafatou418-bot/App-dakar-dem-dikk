import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = 'http://localhost:5000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si utilisateur déjà connecté
    const storedUser = localStorage.getItem('dakar_user');
    const storedToken = localStorage.getItem('dakar_token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    console.log('🔐 Frontend: Tentative de connexion', { email });
    
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      console.log('📥 Frontend: Réponse reçue', response.data);
      
      if (response.data.success) {
        const { user, token } = response.data;
        
        console.log('✅ Frontend: Connexion réussie', user);
        
        setUser(user);
        localStorage.setItem('dakar_user', JSON.stringify(user));
        localStorage.setItem('dakar_token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setIsLoading(false);
        return { success: true };
      } else {
        console.error('❌ Frontend: Échec (success=false)');
        setIsLoading(false);
        return { success: false, error: 'Connexion échouée' };
      }
    } catch (error) {
      console.error('❌ Frontend: Erreur complète', error);
      console.error('❌ Frontend: Détails erreur', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      const errorMessage = error.response?.data?.error || 'Erreur de connexion au serveur';
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dakar_user');
    localStorage.removeItem('dakar_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}