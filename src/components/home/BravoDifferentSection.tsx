
import { Check } from 'lucide-react';

const BravoDifferentSection = () => {
  const differences = [
    {
      id: 1,
      title: 'Atendimento 100% Online',
      description: 'Consulte com um médico especializado sem sair de casa.',
      icon: '🏠',
    },
    {
      id: 2,
      title: 'Entrega Discreta',
      description: 'Seu tratamento chega em embalagem sem identificação.',
      icon: '📦',
    },
    {
      id: 3,
      title: 'Fórmulas Personalizadas',
      description: 'Medicamentos manipulados de acordo com sua necessidade.',
      icon: '⚗️',
    },
    {
      id: 4,
      title: 'Acompanhamento Contínuo',
      description: 'Suporte durante todo seu tratamento para tirar dúvidas e avaliar resultados.',
      icon: '📱',
    },
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-bravo-blue">Bravo é diferente</h2>
          <p className="text-xl text-gray-700 mt-2">
            Nosso método foi desenvolvido para oferecer a melhor experiência
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differences.map((item) => (
            <div key={item.id} className="bg-bravo-beige p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="italic text-lg">
            "Nossa missão é transformar a forma como os homens cuidam da saúde."
          </p>
        </div>
      </div>
    </section>
  );
};

export default BravoDifferentSection;
