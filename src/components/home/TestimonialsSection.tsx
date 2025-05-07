
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Gustavo Faria',
      text: 'Equipe maravilhosa e com bom atendimento, trabalho 100% garantido.',
      image: '/lovable-uploads/ec3a20ac-e0c1-4795-81a1-1db372988776.png',
      beforeAfter: '/lovable-uploads/0923a035-69ed-49d0-a802-8755eff0a0ea.png',
    },
    {
      id: 2,
      name: 'Sandro Campanaro',
      text: 'Ótimo atendimento, Ótima equipe!!! Adorei o resultado do meu procedimento!!!',
      image: '/lovable-uploads/ec3a20ac-e0c1-4795-81a1-1db372988776.png',
      beforeAfter: '/lovable-uploads/0923a035-69ed-49d0-a802-8755eff0a0ea.png',
    },
    {
      id: 3,
      name: 'Leandro Aparecido Rodrigues',
      text: 'Equipe muito atenciosa e com excelência no atendimento, procedimento maravilhoso!!!',
      image: '/lovable-uploads/ec3a20ac-e0c1-4795-81a1-1db372988776.png',
      beforeAfter: '/lovable-uploads/0923a035-69ed-49d0-a802-8755eff0a0ea.png',
    },
  ];
  
  return (
    <section className="py-16 bg-bravo-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-bravo-blue">O que dizem nossos clientes</h2>
          <p className="text-xl text-gray-700 mt-2">
            Homens reais, resultados reais
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  </div>
                  <p className="text-gray-700">{testimonial.text}</p>
                </div>
                <div className="border-t border-gray-200">
                  <img 
                    src={testimonial.beforeAfter} 
                    alt="Antes e depois" 
                    className="w-full" 
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
