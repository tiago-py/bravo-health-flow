
import { BadgeCheck, User, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

const WhoWeAreSection = () => {
  return (
    <section className="py-16 bg-bravo-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-2">
            Quem <span className="text-bravo-blue">somos</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            A Bravo é um espaço integrativo para o homem moderno, com atendimento 100% digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 - Quem cuida dos seus tratamentos */}
          <Card className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <BadgeCheck className="text-bravo-blue mr-3 h-6 w-6" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Quem cuida dos<br />seus tratamentos
                </h3>
              </div>
              <div className="mt-4">
                <img
                  src="/lovable-uploads/4814ac17-67a9-4748-866b-a0018d46bc06.png"
                  alt="Médico especialista"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </Card>

          {/* Card 2 - Quem organiza as suas informações */}
          <Card className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <User className="text-bravo-blue mr-3 h-6 w-6" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Quem organiza as<br />suas informações
                </h3>
              </div>
              <div className="mt-4">
                <img
                  src="/lovable-uploads/9faa8b96-66ab-43e8-b7dd-de313586efc0.png"
                  alt="Profissional de atendimento"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </Card>

          {/* Card 3 - Quem planeja o seu futuro */}
          <Card className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Star className="text-bravo-blue mr-3 h-6 w-6" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Quem planeja<br />o seu futuro
                </h3>
              </div>
              <div className="mt-4">
                <img
                  src="/lovable-uploads/0e0a614e-dd02-4dd5-a663-72e1477e5795.png"
                  alt="Equipe de planejamento"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
