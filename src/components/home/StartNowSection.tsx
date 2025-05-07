
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
          <h2 className="text-4xl font-bold text-bravo-blue">Comece agora</h2>
          <p className="text-xl text-gray-700 mt-2">
            Escolha o tratamento ideal para você
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {treatments.map((treatment) => (
            <Card key={treatment.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={treatment.image} 
                  alt={treatment.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{treatment.title}</h3>
                <p className="text-gray-700 mb-4">{treatment.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-bravo-blue">{treatment.price}</span>
                  <Link to={treatment.path}>
                    <Button className="rounded-full bg-bravo-blue">
                      Escolher <ArrowRight className="ml-1" size={16} />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StartNowSection;
