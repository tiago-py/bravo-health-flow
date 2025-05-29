import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
const BravoDifferentSection = () => {
  return <section className="py-16 bg-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Coluna de texto - Esquerda */}
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold text-bravo-blue mb-2">Bravo é diferente</h2>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Nada de julgamento.<br />
              Nada de fingir que tá tudo bem.
            </h3>
            
            <p className="text-gray-600 mb-6">
              A Bravo é um lugar feito para homens reais que também têm problemas.
              A gente entende as suas dúvidas, o seu tempo, os seus objetivos e o seu
              jeito de viver.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <Check className="text-bravo-blue mr-2 mt-1" />
                <p className="text-gray-700">Atendimento humanizado</p>
              </div>
              
              <div className="flex items-start">
                <Check className="text-bravo-blue mr-2 mt-1" />
                <p className="text-gray-700">Tratamentos reais, sem enrolação</p>
              </div>
              
              <div className="flex items-start">
                <Check className="text-bravo-blue mr-2 mt-1" />
                <p className="text-gray-700">Foco no bem-estar total: físico, sexual e emocional</p>
              </div>
            </div>
            
            <Button className="bg-bravo-blue hover:bg-bravo-dark rounded-full">
              Quero começar meu tratamento
            </Button>
          </div>
          
          {/* Imagem - Direita */}
          <div className="w-full md:w-1/2">
            <img src="/lovable-uploads/35fd93b1-34c9-4858-a15a-3e306cc50712.png" alt="Homem sorridente com cabelo black power" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>;
};
export default BravoDifferentSection;