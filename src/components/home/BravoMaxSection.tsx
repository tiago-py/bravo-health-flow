
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BravoMaxSection = () => {
  return (
    <section className="py-16 bg-bravo-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-bravo-blue mb-2">Bravo Max</h2>
          <p className="text-xl text-gray-700">Tratamento para disfunção erétil e performance</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Recupere sua confiança e performance</h3>
            <p className="text-gray-700 mb-6">
              O Bravo Max foi desenvolvido por médicos especialistas para ajudar homens
              a recuperarem sua confiança e performance sexual com discrição e eficácia.
            </p>
            <Button className="bg-bravo-blue hover:bg-bravo-dark rounded-full">
              Quero saber mais
            </Button>
          </div>
          
          <div className="md:w-1/2">
            <img 
              src="/lovable-uploads/166de199-b9a4-49e5-a49e-1e1971e9f9b6.png" 
              alt="Bravo Max" 
              className="w-full rounded-lg" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BravoMaxSection;
