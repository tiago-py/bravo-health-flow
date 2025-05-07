
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BravoHairSection = () => {
  return (
    <section className="py-16 bg-bravo-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-bravo-blue mb-2">Bravo Hair</h2>
          <p className="text-xl text-gray-700">Tratamento completo contra queda de cabelo</p>
        </div>

        <div className="flex justify-end">
          <div className="w-full max-w-3xl">
            {/* Card Container - Positioned to the left */}
            <div className="relative w-full max-w-2xl bg-white rounded-xl overflow-hidden ml-0 mr-auto">
              {/* Imagem principal */}
              <img 
                src="/lovable-uploads/d33e3010-a4d3-4b53-a946-47d98363f585.png" 
                alt="Bravo Hair - Homem sorridente" 
                className="w-full" 
              />
              
              {/* Conteúdo abaixo da imagem */}
              <div className="p-6 md:p-10">
                <h3 className="text-2xl font-bold mb-4">Cabelo ralo, entradas aumentando ou calvície avançando?</h3>
                <p className="text-gray-700 mb-6">
                  O Bravo Hair é um tratamento completo, aprovado por médicos, com
                  fórmula personalizada para fortalecer o couro cabeludo, estimular o
                  crescimento e prevenir a queda.
                </p>
                <div className="flex justify-start">
                  <Button className="bg-bravo-blue hover:bg-bravo-dark rounded-full">
                    Quero recuperar meu cabelo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BravoHairSection;
