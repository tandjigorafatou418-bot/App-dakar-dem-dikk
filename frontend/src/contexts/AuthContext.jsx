import React, { createContext, useContext, useState, useEffect } from 'react';

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

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user
    const storedUser = localStorage.getItem('dakar_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);

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
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dakar_user');
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
