import { Link } from 'react-router-dom';
const PublicFooter = () => {
  return <footer className="pt-12 pb-4 bg-slate-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          {/* Brand Column */}
          <div>
            <Link to="/" className="text-2xl font-montserrat font-bold">
              BRAVO <span className="text-xs align-bottom">HOMEM</span>
            </Link>
            <p className="mt-3 text-sm text-gray-700 max-w-xs">
              Tratamentos dermatológicos personalizados para uma pele saudável e radiante.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-700 hover:text-bravo-blue">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sobre-nos" className="text-sm text-gray-700 hover:text-bravo-blue">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-700 hover:text-bravo-blue">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/perguntas-frequentes" className="text-sm text-gray-700 hover:text-bravo-blue">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-sm text-gray-700 hover:text-bravo-blue">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Tratamentos Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tratamentos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tratamentos/acne" className="text-sm text-gray-700 hover:text-bravo-blue">
                  Acne
                </Link>
              </li>
              <li>
                <Link to="/tratamentos/melasma" className="text-sm text-gray-700 hover:text-bravo-blue">
                  Melasma
                </Link>
              </li>
              <li>
                <Link to="/tratamentos/rejuvenescimento" className="text-sm text-gray-700 hover:text-bravo-blue">
                  Rejuvenescimento
                </Link>
              </li>
              <li>
                <Link to="/tratamentos/rosacea" className="text-sm text-gray-700 hover:text-bravo-blue">
                  Rosácea
                </Link>
              </li>
              <li>
                <Link to="/tratamentos/capilares" className="text-sm text-gray-700 hover:text-bravo-blue">
                  Tratamentos Capilares
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-bravo-blue mr-2">📍</span>
                <span className="text-sm text-gray-700">Av. Paulista, 1000, São Paulo - SP</span>
              </li>
              <li className="flex items-center">
                <span className="text-bravo-blue mr-2">📞</span>
                <span className="text-sm text-gray-700">(11) 99999-9999</span>
              </li>
              <li className="flex items-center">
                <span className="text-bravo-blue mr-2">✉️</span>
                <span className="text-sm text-gray-700">contato@bravohomem.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-300 text-sm text-center text-gray-600">
          © {new Date().getFullYear()} Bravo. Todos os direitos reservados.
        </div>
      </div>
    </footer>;
};
export default PublicFooter;