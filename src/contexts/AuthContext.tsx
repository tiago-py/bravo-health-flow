
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user role type
export type UserRole = 'ADMIN' | 'MEDICO' | 'CLIENTE';

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

// Mock users database
const mockUsers = [
  { id: '1', name: 'Admin Sistema', email: 'admin@bravohomem.com.br', password: 'admin123', role: 'admin' as UserRole },
  { id: '2', name: 'Dr. João Silva', email: 'dr.silva@bravohomem.com.br', password: 'medico123', role: 'doctor' as UserRole },
  { id: '3', name: 'Dr. Maria Santos', email: 'dr.maria@bravohomem.com.br', password: 'medico123', role: 'doctor' as UserRole },
  { id: '4', name: 'Dr. Carlos Lima', email: 'dr.carlos@bravohomem.com.br', password: 'medico123', role: 'doctor' as UserRole },
  { id: '5', name: 'João Cliente', email: 'joao.cliente@gmail.com', password: 'cliente123', role: 'client' as UserRole },
  { id: '6', name: 'Maria Cliente', email: 'maria.cliente@gmail.com', password: 'cliente123', role: 'client' as UserRole },
  { id: '7', name: 'Pedro Cliente', email: 'pedro.cliente@gmail.com', password: 'cliente123', role: 'client' as UserRole },
];

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

  // Login function with mock authentication
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock database
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Email ou senha incorretos');
      }
      
      // Create user object without password
      const authenticatedUser: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      };
      
      // Save user to local storage
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      setUser(authenticatedUser);
      
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
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        throw new Error('Usuário já existe com este email');
      }
      
      // Create a new user (always a client for new registrations)
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        name,
        email,
        role: 'CLIENTE'
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
      
      // Check if user exists
      const foundUser = mockUsers.find(u => u.email === email);
      if (!foundUser) {
        throw new Error('Usuário não encontrado com este email');
      }
      
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
