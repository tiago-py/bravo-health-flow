
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const PublicHeader = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Determine dashboard link based on user role
  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'doctor':
        return '/medico/dashboard';
      case 'client':
        return '/cliente/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-montserrat font-bold">BRAVO <span className="text-xs align-bottom">HOMEM</span></span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-12">
          <Link to="/tratamentos" className="text-gray-700 hover:text-bravo-blue transition-colors uppercase text-sm font-medium">
            Tratamentos
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-bravo-blue transition-colors uppercase text-sm font-medium">
            Blog
          </Link>
          <Link to="/quem-somos" className="text-gray-700 hover:text-bravo-blue transition-colors uppercase text-sm font-medium">
            Quem Somos
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-700">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Account/Login Button */}
        <div className="hidden md:block">
          <Link to={getDashboardLink()}>
            <Button variant="outline" size="sm" className="uppercase text-sm font-medium">
              Entrar
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link 
              to="/tratamentos" 
              className="text-gray-700 hover:text-bravo-blue py-2 transition-colors uppercase text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tratamentos
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-bravo-blue py-2 transition-colors uppercase text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/quem-somos" 
              className="text-gray-700 hover:text-bravo-blue py-2 transition-colors uppercase text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Quem Somos
            </Link>
            <Link 
              to={getDashboardLink()} 
              className="text-bravo-blue font-medium py-2 uppercase text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Entrar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;
