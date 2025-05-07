
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 bg-bravo-blue text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para transformar sua vida?
          </h2>
          <p className="text-xl mb-8">
            Junte-se aos milhares de homens que já descobriram o poder de cuidar
            da própria saúde com a Bravo.
          </p>
          <Link to="/anamnese/queda-capilar">
            <Button className="bg-white text-bravo-blue hover:bg-gray-100 rounded-full text-lg px-8 py-6">
              Comece seu tratamento agora <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
