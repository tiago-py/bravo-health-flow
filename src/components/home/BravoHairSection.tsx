
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const BravoHairSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-bravo-blue mb-2">Bravo Hair</h2>
          <p className="text-xl text-gray-700">Tratamento completo contra queda de cabelo</p>
        </div>

        <div className="flex justify-center mt-12">
          <div className="relative w-full max-w-5xl bg-bravo-beige rounded-xl overflow-hidden">
            <div className="p-6 md:p-10 flex flex-col md:flex-row">
              {/* Texto à esquerda */}
              <div className="md:w-1/2 md:pr-8 z-10 pb-8 md:pb-0">
                <h3 className="text-2xl font-bold mb-4">Cabelo ralo, entradas aumentando ou calvície avançando?</h3>
                <p className="text-gray-700 mb-6">
                  O Bravo Hair é um tratamento completo, aprovado por médicos, com
                  fórmula personalizada para fortalecer o couro cabeludo, estimular o
                  crescimento e prevenir a queda.
                </p>
                <Button className="bg-bravo-blue hover:bg-bravo-dark rounded-full">
                  Quero recuperar meu cabelo
                </Button>
              </div>
              
              {/* Imagem com as tags à direita */}
              <div className="md:w-1/2 relative">
                {/* Tags posicionadas sobre a imagem */}
                <div className="absolute top-0 left-0 right-0 bottom-0 z-10">
                  <div className="absolute top-[5%] left-[10%]">
                    <div className="bg-[#6798B6] bg-opacity-70 text-white rounded-md py-1 px-3 inline-flex items-center">
                      <Check size={16} className="mr-2" /> Entrega discreta
                    </div>
                  </div>
                  
                  <div className="absolute top-[5%] right-[5%]">
                    <div className="bg-[#6798B6] bg-opacity-70 text-white rounded-md py-1 px-3 inline-flex items-center">
                      <Check size={16} className="mr-2" /> Resultados visíveis em semanas
                    </div>
                  </div>
                  
                  <div className="absolute top-[20%] left-[5%]">
                    <div className="bg-[#6798B6] bg-opacity-70 text-white rounded-md py-1 px-3 inline-flex items-center">
                      <Check size={16} className="mr-2" /> Fórmula manipulada sob medida
                    </div>
                  </div>
                  
                  <div className="absolute top-[35%] right-[15%]">
                    <div className="bg-[#6798B6] bg-opacity-70 text-white rounded-md py-1 px-3 inline-flex items-center">
                      <Check size={16} className="mr-2" /> Discrição e entrega garantidas
                    </div>
                  </div>
                  
                  <div className="absolute bottom-[30%] left-[15%]">
                    <div className="bg-[#6798B6] bg-opacity-70 text-white rounded-md py-1 px-3 inline-flex items-center">
                      <Check size={16} className="mr-2" /> Consulta rápida, 100% online
                    </div>
                  </div>
                  
                  <div className="absolute bottom-[15%] right-[5%]">
                    <div className="bg-[#6798B6] bg-opacity-70 text-white rounded-md py-1 px-3 inline-flex items-center">
                      <Check size={16} className="mr-2" /> Ingredientes com eficácia comprovada
                    </div>
                  </div>
                </div>
                
                {/* Imagem em fundo transparente com o desenho de bar */}
                <img 
                  src="/lovable-uploads/05ed9e82-9a9f-43ca-8a66-f2c99955f746.png" 
                  alt="Bravo Hair - Homem sorridente" 
                  className="w-full h-full object-contain z-0" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BravoHairSection;
