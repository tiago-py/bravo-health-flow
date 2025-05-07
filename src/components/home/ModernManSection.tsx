
import { Link } from 'react-router-dom';

const ModernManSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="bg-[#6798B6] rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/f62c904d-2284-4b4a-89c8-8bd5a981b37f.png" 
                alt="Homem moderno" 
                className="w-full object-cover" 
              />
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Feito para o <br />
              <span className="text-bravo-blue">homem moderno</span>
            </h2>
            <p className="text-gray-700 mb-4">
              Você cuida da sua carreira, da sua família, dos seus objetivos.
              Mas... e de você?
            </p>
            <p className="text-gray-700 mb-4">
              A Bravo nasceu pra isso: um espaço onde a prioridade é se cuidar.
            </p>
            <p className="text-gray-700">
              Com atendimento especializado e produtos exclusivos para resolver problemas
              reais, de forma prática e confidencial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernManSection;
