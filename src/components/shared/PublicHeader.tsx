
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';

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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-montserrat font-bold text-bravo-blue">Bravo Homem</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-bravo-blue transition-colors">
            Início
          </Link>
          <Link to="/tratamento/queda-capilar" className="text-gray-700 hover:text-bravo-blue transition-colors">
            Queda Capilar
          </Link>
          <Link to="/tratamento/disfuncao-eretil" className="text-gray-700 hover:text-bravo-blue transition-colors">
            Disfunção Erétil
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-bravo-blue transition-colors">
            Blog
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
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <User size={16} />
              {user ? 'Minha Conta' : 'Entrar'}
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-bravo-blue py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/tratamento/queda-capilar" 
              className="text-gray-700 hover:text-bravo-blue py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Queda Capilar
            </Link>
            <Link 
              to="/tratamento/disfuncao-eretil" 
              className="text-gray-700 hover:text-bravo-blue py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Disfunção Erétil
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-bravo-blue py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to={getDashboardLink()} 
              className="text-bravo-blue font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {user ? 'Minha Conta' : 'Entrar'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;
