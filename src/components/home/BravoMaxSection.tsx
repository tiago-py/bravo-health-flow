
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const BravoMaxSection = () => {
  return (
    <section className="py-16 bg-bravo-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-bravo-blue mb-2">Bravo Max</h2>
          <p className="text-xl text-gray-700">Para sua potência não falhar</p>
        </div>
        
        <div className="flex justify-center">
          <div className="w-full max-w-3xl mx-auto">
            {/* Card Container - Positioned slightly to the right */}
            <div className="relative w-full max-w-2xl bg-bravo-beige rounded-xl overflow-hidden ml-auto mr-[10%]">
              {/* Imagem com os rótulos informativos */}
              <div className="relative">
                <img 
                  src="/lovable-uploads/0087efeb-bff4-47e0-98e8-86830938bb11.png" 
                  alt="Bravo Max - Homem confiante" 
                  className="w-full" 
                />
                
                {/* Tags informativas posicionadas ao redor da imagem */}
                <div className="absolute top-4 left-4 bg-amber-600 text-white px-4 py-1 rounded-full flex items-center">
                  <Check size={16} className="mr-1" /> Consulta rápida
                </div>
                
                <div className="absolute top-4 right-4 bg-amber-600 text-white px-4 py-1 rounded-full flex items-center">
                  <Check size={16} className="mr-1" /> Envio em embalagem discreta
                </div>
                
                <div className="absolute top-1/3 left-4 bg-amber-600 text-white px-4 py-1 rounded-full flex items-center">
                  <Check size={16} className="mr-1" /> Solução contínua – não só pontual
                </div>
                
                <div className="absolute top-1/3 right-4 bg-amber-600 text-white px-4 py-1 rounded-full flex items-center">
                  <Check size={16} className="mr-1" /> Tratamento seguro, com acompanhamento médico
                </div>
                
                <div className="absolute bottom-40 left-4 bg-amber-600 text-white px-4 py-1 rounded-full flex items-center">
                  <Check size={16} className="mr-1" /> Fórmula manipulada sob medida
                </div>
                
                <div className="absolute bottom-40 right-4 bg-amber-600 text-white px-4 py-1 rounded-full flex items-center">
                  <Check size={16} className="mr-1" /> Resultados reais, com discrição e acolhimento
                </div>
              </div>
              
              <div className="p-6 md:p-10">
                <h3 className="text-2xl font-bold mb-4">Você não está sozinho.</h3>
                <p className="text-gray-700 mb-6">
                  A disfunção erétil atinge milhões de homens - mas não precisa ser um peso na sua vida. 
                  O Bravo Max combina ingredientes com respaldo clínico para melhorar sua performance, 
                  aumentar o desejo e devolver sua confiança.
                </p>
                <div className="flex justify-end">
                  <Button className="bg-bravo-blue hover:bg-bravo-dark rounded-full">
                    Quero mais potência
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

export default BravoMaxSection;
