
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-bravo-beige py-0 font-sans">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-8 md:p-16">
          <h1 className="text-3xl md:text-6xl font-medium mb-6">
            Cuidar de você é <br /> 
            <span className="text-bravo-blue font-bold">coisa de homem.</span>
          </h1>
          <p className="text-gray-700 mb-6 font-light">
            Na Bravo, a saúde íntima e estética masculina são tratadas com seriedade, 
            respeito e soluções seguras. Aqui, você encontra os cuidados que o homem
            moderno precisa – sem tabu, sem burocracia e no seu ritmo.
          </p>
          <div className="space-y-2 text-xl mb-8 font-medium">
            Clínica integrativa masculina. <br />
            Produtos recomendados por médicos. <br />
            Atendimento que entende você.
          </div>
          <div className='w-full flex justify-center md:justify-start'>
            <Link to="/anamnese/queda-capilar">
              <Button className="rounded-full font-normal bg-bravo-blue hover:bg-bravo-dark">
                Começar meu tratamento agora
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute inset-0 bg-right bg-no-repeat opacity-50" style={{
          backgroundImage: "url('/lovable-uploads/4ce4a204-aeff-445e-a1f8-ee3536e3d5fc.png')",
          backgroundSize: "cover",
          zIndex: -1
        }}></div>
          <img alt="Homem confiante" className="w-full h-full object-cover" src="/lovable-uploads/388f08e2-7e3c-41e0-b7c6-3165c091ee56.png" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
