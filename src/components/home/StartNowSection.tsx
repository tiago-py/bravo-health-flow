
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Treatment {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  path: string;
}

interface StartNowSectionProps {
  treatments: Treatment[];
}

const StartNowSection = ({ treatments }: StartNowSectionProps) => {
  return (
    <section className="py-16 bg-bravo-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Comece <span className="text-bravo-blue">agora</span>
          </h2>
        </div>
        
        <div className="relative">
          {treatments.map((treatment, index) => (
            <Card 
              key={treatment.id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 mx-auto max-w-xs md:max-w-none md:w-[90%] md:mb-0"
              style={{
                position: index === 0 ? 'relative' : 'relative',
                zIndex: 3 - index,
                marginTop: index === 0 ? '0' : '',
                marginLeft: index === 1 ? 'auto' : '',
                marginRight: index === 2 ? '' : '',
              }}
            >
              <div className="p-6 md:p-8">
                <div className="mb-4">
                  <img 
                    src={treatment.image} 
                    alt={treatment.title} 
                    className="w-full h-auto max-h-64 rounded-lg object-cover"
                  />
                </div>
                <h3 className="text-xl text-bravo-blue font-bold mb-2">{treatment.title}</h3>
                <p className="text-gray-700 mb-6">{treatment.description}</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm">a partir de</p>
                    <p className="text-2xl font-semibold">{treatment.price}</p>
                  </div>
                  <Link to={treatment.path}>
                    <Button className="w-full bg-bravo-blue hover:bg-bravo-dark rounded-full">
                      Começar agora
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-32 text-center">
        <h2 className="text-4xl font-bold">
          O lugar do homem <span className="text-bravo-blue">moderno é aqui</span>.
        </h2>
        <p className="text-lg text-gray-700 mt-4 mb-2">
          Bravo Homem – Tratamentos e cuidados pensados em você, para você.
        </p>
        <p className="text-gray-600 mb-8">
          Sem julgamento. Sem complicação. Sem mimimi.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button className="bg-bravo-blue hover:bg-bravo-dark rounded-full px-6">
            Começar meu tratamento
          </Button>
          <Button variant="outline" className="border-bravo-blue text-bravo-blue hover:bg-bravo-beige rounded-full px-6">
            Agendar atendimento
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StartNowSection;
