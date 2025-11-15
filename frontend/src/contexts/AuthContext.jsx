import React, { createContext, useContext, useState, useEffect } from 'react';
<<<<<<< HEAD

// Mock users for demo
const mockUsers = {
  'admin@dakardemlikk.sn': {
    id: '1',
    name: 'Administrateur',
    email: 'admin@dakardemlikk.sn',
    role: 'admin',
    phone: '+221 77 123 4567',
    password: 'admin123'
  },
  'agent@dakardemlikk.sn': {
    id: '2',
    name: 'Agent Transport',
    email: 'agent@dakardemlikk.sn',
    role: 'agent',
    phone: '+221 77 234 5678',
    password: 'agent123'
  },
  'client@dakardemlikk.sn': {
    id: '3',
    name: 'Fatou Diakho',
    email: 'client@dakardemlikk.sn',
    role: 'client',
    phone: '+221 77 345 6789',
    password: 'client123'
  }
};

const AuthContext = createContext();

=======
import axios from 'axios';

const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api';

>>>>>>> 48f4252 (Mise à jour finale du projet)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
<<<<<<< HEAD
    // Check for stored user
    const storedUser = localStorage.getItem('dakar_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
=======
    // Vérifier si utilisateur déjà connecté
    const storedUser = localStorage.getItem('dakar_user');
    const storedToken = localStorage.getItem('dakar_token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
>>>>>>> 48f4252 (Mise à jour finale du projet)
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
<<<<<<< HEAD

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser = mockUsers[email];
    if (mockUser && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('dakar_user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
=======
    
    console.log('🔐 Frontend: Tentative de connexion', { email, password });
    
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
>>>>>>> 48f4252 (Mise à jour finale du projet)
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dakar_user');
<<<<<<< HEAD
=======
    localStorage.removeItem('dakar_token');
    delete axios.defaults.headers.common['Authorization'];
>>>>>>> 48f4252 (Mise à jour finale du projet)
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
<<<<<<< HEAD
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
=======
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}
>>>>>>> 48f4252 (Mise à jour finale du projet)
