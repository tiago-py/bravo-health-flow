
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HowItWorksStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const HowItWorksSection = () => {
  const howItWorks: HowItWorksStep[] = [
    {
      id: 1,
      title: 'Você escolhe o tratamento',
      description: 'Selecione o que faz sentido pra você: Bravo Hair ou Bravo Max - ou os dois.',
      icon: '/lovable-uploads/64b4be0c-85da-4089-8c5d-a9da4a8e3548.png',
    },
    {
      id: 2,
      title: 'Consulta com nosso time médico',
      description: 'Avaliação online, com um especialista em saúde masculina.',
      icon: '/lovable-uploads/babc2bd2-1984-43ad-999d-8a3e77971958.png',
    },
    {
      id: 3,
      title: 'Tratamentos aprovados',
      description: 'Fórmulas manipuladas por farmácias autorizadas pela ANVISA, para você ter o máximo de qualidade nos seus tratamentos.',
      icon: '/lovable-uploads/8aa55960-a17a-42e7-8352-d332a64b7f67.png',
    },
    {
      id: 4,
      title: 'Receba em casa, com descrição total',
      description: 'Seu tratamento chega de forma prática, segura e discreta.',
      icon: '/lovable-uploads/812f9dca-ee8a-48bb-bc21-50853fe6dbc1.png',
    },
    {
      id: 5,
      title: 'Acompanhamento Bravo',
      description: 'Estamos com você em cada etapa. Tira dúvidas, suporte e evolução monitorada.',
      icon: '/lovable-uploads/b490a1c5-54dc-4adb-8b09-ae0700add0ed.png',
    },
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-bravo-blue">Como funciona</h2>
        </div>
        
        <div className="flex justify-center items-stretch mb-12">
          <Link to="/anamnese/queda-capilar">
            <Button className="rounded-full bg-bravo-blue hover:bg-bravo-dark">
              Começar meu tratamento agora+
            </Button>
          </Link>
        </div>
        
        <div className="relative flex flex-col md:flex-row items-start justify-center">
          {howItWorks.map((step, index) => (
            <div 
              key={step.id}
              className={`bg-slate-100 p-6 rounded-lg shadow-sm flex-1 w-full md:w-1/5 md:mx-2 mb-4 md:mb-0 md:transform transition-all duration-300 ease-in-out`}
              style={{
                marginTop: `${index * 20}px`,
                zIndex: 5 - index
              }}
            >
              <div className="flex flex-col h-full relative">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-bravo-blue text-white font-bold mb-4">
                  {step.id}
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-700 text-sm mb-6 flex-grow">
                  {step.description}
                </p>
                <div className="mt-auto flex justify-center">
                  <img src={step.icon} alt={step.title} className="h-16 w-auto" />
                </div>
                
                {/* Connecting line (visible on desktop) */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gray-300 z-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
