
import { Link } from 'react-router-dom';

const PublicFooter = () => {
  return (
    <footer className="bg-bravo-blue text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div>
            <Link to="/" className="text-2xl font-montserrat font-bold">
              Bravo Homem
            </Link>
            <p className="mt-3 text-sm opacity-80 max-w-xs">
              Saúde e bem-estar masculino com tratamentos personalizados e acompanhamento médico especializado.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tratamento/queda-capilar" className="text-sm opacity-80 hover:opacity-100">
                  Queda Capilar
                </Link>
              </li>
              <li>
                <Link to="/tratamento/disfuncao-eretil" className="text-sm opacity-80 hover:opacity-100">
                  Disfunção Erétil
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm opacity-80 hover:opacity-100">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-sm opacity-80 hover:opacity-100">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informações Legais</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/termos" className="text-sm opacity-80 hover:opacity-100">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/politica-de-privacidade" className="text-sm opacity-80 hover:opacity-100">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/20 text-sm text-center opacity-70">
          © {new Date().getFullYear()} Bravo Homem. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
