
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';

interface RequireAuthProps {
  children: ReactNode;
  role?: UserRole | UserRole[];
}

const RequireAuth = ({ children, role }: RequireAuthProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-pulse text-bravo-blue text-lg">Carregando...</div>
      </div>
    );
  }

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is required, check if the user has the required role
  if (role) {
    const roles = Array.isArray(role) ? role : [role];
    
    if (!roles.includes(user.role)) {
      // Redirect to appropriate dashboard based on user role
      let redirectPath = '/';
      
      switch (user.role) {
        case 'admin':
          redirectPath = '/admin/dashboard';
          break;
        case 'doctor':
          redirectPath = '/medico/dashboard';
          break;
        case 'client':
          redirectPath = '/cliente/dashboard';
          break;
      }
      
      return <Navigate to={redirectPath} replace />;
    }
  }

  // If authorized, render the children
  return <>{children}</>;
};

export default RequireAuth;
