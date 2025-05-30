
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-bravo-beige py-0">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-8 md:p-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Cuidar de você é <br /> 
            <span className="text-bravo-blue">coisa de homem.</span>
          </h1>
          <p className="text-gray-700 mb-6">
            Na Bravo, a saúde íntima e estética masculina são tratadas com seriedade, 
            respeito e soluções seguras. Aqui, você encontra os cuidados que o homem
            moderno precisa – sem tabu, sem burocracia e no seu ritmo.
          </p>
          <div className="space-y-2 mb-8">
            <p className="font-medium flex items-center"><Check size={16} className="mr-2 text-bravo-blue" /> Clínica integrativa masculina.</p>
            <p className="font-medium flex items-center"><Check size={16} className="mr-2 text-bravo-blue" /> Produtos recomendados por médicos.</p>
            <p className="font-medium flex items-center"><Check size={16} className="mr-2 text-bravo-blue" /> Atendimento que entende você.</p>
          </div>
          <Link to="/anamnese/queda-capilar">
            <Button className="rounded-full bg-bravo-blue hover:bg-bravo-dark">
              Começar meu tratamento agora+
            </Button>
          </Link>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute inset-0 bg-right bg-no-repeat opacity-50" style={{ 
            backgroundImage: "url('/lovable-uploads/4ce4a204-aeff-445e-a1f8-ee3536e3d5fc.png')",
            backgroundSize: "cover",
            zIndex: -1
          }}></div>
          <img 
            src="/lovable-uploads/4ce4a204-aeff-445e-a1f8-ee3536e3d5fc.png" 
            alt="Homem confiante" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
