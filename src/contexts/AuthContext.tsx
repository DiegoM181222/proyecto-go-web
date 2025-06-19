import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers = [
  { id: '1', email: 'admin@goweb.com', password: 'admin123', name: 'Administrador', role: 'admin' as const },
  { id: '2', email: 'user@goweb.com', password: 'user123', name: 'Usuario Regular', role: 'user' as const },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: 'admin' | 'user'): Promise<boolean> => {
    const foundUser = mockUsers.find(u => 
      u.email === email && u.password === password && u.role === role
    );
    
    if (foundUser) {
      setUser({
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}