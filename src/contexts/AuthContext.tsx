
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user roles
export type UserRole = 'client' | 'doctor' | 'admin';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Create provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would verify the token with a backend
        const storedUser = localStorage.getItem('bravoUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Mock login function - would call API in a real app
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // For demo purposes, create mock users based on email
      let mockUser: User | null = null;
      
      if (email.includes('admin')) {
        mockUser = { id: '1', name: 'Admin', email, role: 'admin' };
      } else if (email.includes('doctor') || email.includes('medico')) {
        mockUser = { id: '2', name: 'Dr. Bravo', email, role: 'doctor' };
      } else {
        mockUser = { id: '3', name: 'Cliente Bravo', email, role: 'client' };
      }
      
      // Save user in local storage
      localStorage.setItem('bravoUser', JSON.stringify(mockUser));
      setUser(mockUser);
      
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Create a new client user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role: 'client'
      };
      
      // Save user in local storage
      localStorage.setItem('bravoUser', JSON.stringify(newUser));
      setUser(newUser);
      
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Falha no registro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('bravoUser');
    setUser(null);
  };

  // Mock forgot password function
  const forgotPassword = async (email: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      return true;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw new Error('Falha ao enviar email de recuperação. Tente novamente.');
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    forgotPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
