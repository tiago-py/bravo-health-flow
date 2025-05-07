
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      text: 'Equipe maravilhosa e com bom atendimento, trabalho 100% garantido.',
      beforeAfter: '/lovable-uploads/47eb143c-647b-4ea2-ac9e-647d921c48a4.png',
      rating: 5,
    },
    {
      id: 2,
      text: 'Ótimo atendimento, Ótima equipe!!! Adorei o resultado do meu procedimento!!!',
      beforeAfter: '/lovable-uploads/6157c83c-8e39-4868-a2c7-9bae96c63ec0.png',
      rating: 5,
    },
    {
      id: 3,
      text: 'Equipe muito atenciosa e com excelência no atendimento, procedimento maravilhoso!!!',
      beforeAfter: '/lovable-uploads/d4184579-b9bc-4266-a7ee-7c9776d602eb.png',
      rating: 5,
    },
  ];
  
  return (
    <section className="py-16 bg-bravo-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            O que <span className="text-bravo-blue">nossos</span> clientes <span className="text-bravo-blue">dizem</span>
          </h2>
          <p className="text-xl text-gray-700 mt-2">
            Homens reais, resultados reais
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow max-w-xs">
              <CardContent className="p-4">
                <div className="flex justify-center mb-2">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 text-center text-sm italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="rounded overflow-hidden">
                  <img 
                    src={testimonial.beforeAfter} 
                    alt="Antes e depois" 
                    className="w-full h-auto" 
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
