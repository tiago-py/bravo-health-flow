import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
const BravoMaxSection = () => {
  return <section className="py-16 bg-bravo-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-bravo-blue mb-2">Bravo Max</h2>
          <p className="text-xl text-gray-700">Para sua potência não falhar</p>
        </div>
        
        <div className="flex justify-start">
          <div className="w-full max-w-3xl">
            {/* Card Container - Positioned to the right */}
            <div className="relative w-full max-w-2xl bg-bravo-beige rounded-xl overflow-hidden ml-auto mr-0">
              {/* Imagem com os rótulos informativos */}
              <div className="relative">
                <img src="/lovable-uploads/0087efeb-bff4-47e0-98e8-86830938bb11.png" alt="Bravo Max - Homem confiante" className="w-full" />
                
                {/* Tags informativas posicionadas ao redor da imagem */}
                
                
                
                
                
                
                
                
                
                
                
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
    </section>;
};
export default BravoMaxSection;