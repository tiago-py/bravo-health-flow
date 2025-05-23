
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user role type
export type UserRole = 'admin' | 'doctor' | 'client';

// Define User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // Add any other user properties here
}

// Define AuthContext interface
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  forgotPassword: async () => {},
});

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on component mount
  useEffect(() => {
    // Simulate checking for an authenticated user
    const checkAuth = async () => {
      try {
        // In a real app, this would make an API call to verify the token
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication error:', error);
        // Clear any invalid session data
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock users with specific credentials
      let mockUser: User;
      
      if (email === 'admin@bravohomem.com.br' && password === 'admin123') {
        mockUser = { id: '1', name: 'Admin Sistema', email, role: 'admin' };
      } else if (email === 'dr.silva@bravohomem.com.br' && password === 'medico123') {
        mockUser = { id: '2', name: 'Dr. João Silva', email, role: 'doctor' };
      } else if (email === 'joao.cliente@gmail.com' && password === 'cliente123') {
        mockUser = { id: '3', name: 'João Cliente', email, role: 'client' };
      } else {
        // For any other email, create a client user (backward compatibility)
        mockUser = { id: Math.random().toString(36).substring(2, 15), name: 'Usuário Teste', email, role: 'client' };
      }
      
      // Save user to local storage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    try {
      // In a real app, this would make an API call to create a new user
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user (always a client for new registrations)
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        name,
        email,
        role: 'client'
      };
      
      // Save user to local storage
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Forgot password function
  const forgotPassword = async (email: string): Promise<void> => {
    try {
      // In a real app, this would make an API call to send reset password email
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just console log
      console.log(`Password reset email sent to ${email}`);
      
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        forgotPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
