
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
          <h2 className="text-4xl font-bold text-gray-800">
            Comece <span className="text-bravo-blue">agora</span>
          </h2>
          <p className="text-xl text-gray-700 mt-2">
            Escolha o tratamento ideal para você
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 relative">
          {treatments.map((treatment, index) => (
            <div 
              key={treatment.id} 
              className={`w-full md:w-72 transform ${
                index === 0 ? 'md:-translate-y-4' : index === 2 ? 'md:translate-y-4' : ''
              } transition-all duration-300`}
            >
              <Card className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={treatment.image} 
                    alt={treatment.title} 
                    className="w-full h-60 object-cover" 
                  />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-bravo-blue mb-1">{treatment.title}</h3>
                  <p className="text-gray-700 mb-4 flex-grow">{treatment.description}</p>
                  <div className="mt-auto">
                    <p className="text-sm text-gray-600 mb-1">a partir de</p>
                    <p className="font-bold text-gray-800 text-lg mb-4">R$ XX/mês</p>
                    <Link to={treatment.path} className="block">
                      <Button className="w-full rounded-full bg-bravo-blue hover:bg-bravo-dark">
                        Começar agora
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StartNowSection;
