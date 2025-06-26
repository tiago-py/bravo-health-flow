
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HowItWorksStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  mt: string;
}

const HowItWorksSection = () => {
  const howItWorks: HowItWorksStep[] = [
    {
      id: 1,
      title: 'Você escolhe o tratamento',
      description: 'Selecione o que faz sentido pra você: Bravo Hair ou Bravo Max - ou os dois.',
      icon: '/lovable-uploads/8aa55960-a17a-42e7-8352-d332a64b7f67.png',
      mt: "md:mt-[0px]"
    },
    {
      id: 2,
      title: 'Consulta com nosso time médico',
      description: 'Avaliação online, com um especialista em saúde masculina.',
      icon: '/lovable-uploads/812f9dca-ee8a-48bb-bc21-50853fe6dbc1.png',
      mt: "md:mt-[30px]"
    },
    {
      id: 3,
      title: 'Tratamentos aprovados',
      description: 'Fórmulas manipuladas por farmácias autorizadas pela ANVISA, para você ter o máximo de qualidade nos seus tratamentos.',
      icon: '/lovable-uploads/b490a1c5-54dc-4adb-8b09-ae0700add0ed.png',
      mt: "md:mt-[60px]"
    },
    {
      id: 4,
      title: 'Receba em casa, com descrição total',
      description: 'Seu tratamento chega de forma prática, segura e discreta.',
      icon: '/lovable-uploads/babc2bd2-1984-43ad-999d-8a3e77971958.png',
      mt: "md:mt-[90px]"
    },
    {
      id: 5,
      title: 'Acompanhamento Bravo',
      description: 'Estamos com você em cada etapa. Tira dúvidas, suporte e evolução monitorada.',
      icon: '/lovable-uploads/b490a1c5-54dc-4adb-8b09-ae0700add0ed.png',
      mt: "md:mt-[120px]"
    },
  ];
  
  return (
    <section className="py-16 bg-white font-sans">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-xl md:text-6xl font-bold text-bravo-blue">Como funciona</h2>
          <div className='flex md:flex-nowrap flex-wrap items-center md:justify-between justify-center mt-4'>
            <p className='font-light text-lg'>
              A bravo nasceu pra isso: um espaço onde homens é prioridade. Com atendimeto especializado e
              produtos exclusivos para resolver problemas reais, de forma prática e  confidencial.
            </p>

            <Button className='rounded-full md:mt-0 mt-3 p-8 px-14 bg-bravo-blue hover:bg-bravo-dark'>Começar meu tratamento agora+</Button>
          </div>
        </div>
        
        <div className='md:mt-[-80px] flex items-center justify-center md:flex-nowrap flex-wrap gap-3 md:gap-1'>
          {howItWorks.map((step, index) => (
            <div key={step.id}
             className={`w-[275px] ${step.mt} flex flex-col justify-between items-center 
             h-[340px] px-9 py-6 rounded-md bg-bravo-beige`}>
              <div>
                <h3 className='text-xl font-semibold mb-2'>{step.title}</h3>
                <p className='font-light text-sm'>{step.description}</p>
              </div>

              <div className='mb-5'>
                <img src={step.icon} alt={step.title} className='w-20 h-20' />
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default HowItWorksSection;
