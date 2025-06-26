
import { Link } from 'react-router-dom';

const ModernManSection = () => {
  return (
    <section className="py-16 bg-white font-sans">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img 
              src="/lovable-uploads/185c713d-af26-4728-8fb5-8fdf1bf94b0a.png" 
              alt="Homem moderno" 
              className="w-full object-cover" 
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl md:text-6xl font-bold mb-6">
              Feito para o <br />
              <span className="text-bravo-blue font-bold">homem moderno</span>
            </h2>
            <p className="text-gray-700 mb-4 font-semibold text-xl">
              Você cuida da sua carreira, da sua família, dos seus objetivos.
              Mas... e de você?
            </p>
            <p className="text-gray-700 mb-4">
              A Bravo nasceu pra isso: um espaço onde a prioridade é se cuidar.
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
