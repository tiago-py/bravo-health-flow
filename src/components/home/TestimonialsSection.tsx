
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Gustavo Faria',
      text: 'Equipe maravilhosa e com bom atendimento, trabalho 100% garantido.',
      image: '/lovable-uploads/43e13e57-4b45-403b-abea-8876dca43d16.png',
      beforeAfter: '/lovable-uploads/47eb143c-647b-4ea2-ac9e-647d921c48a4.png',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sandro Campanaro',
      text: 'Ótimo atendimento, Ótima equipe!!! Adorei o resultado do meu procedimento!!!',
      image: '/lovable-uploads/e1f34512-6561-4947-b87a-f32b60629397.png',
      beforeAfter: '/lovable-uploads/6157c83c-8e39-4868-a2c7-9bae96c63ec0.png',
      rating: 5,
    },
    {
      id: 3,
      name: 'Leandro Aparecido Rodrigues',
      text: 'Equipe muito atenciosa e com excelência no atendimento, procedimento maravilhoso!!!',
      image: '/lovable-uploads/41b68a51-63b0-4551-bcfb-685740ef870d.png',
      beforeAfter: '/lovable-uploads/d4184579-b9bc-4266-a7ee-7c9776d602eb.png',
      rating: 5,
    },
  ];
  
  return (
    <section className="py-16 bg-bravo-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            O que <span className="text-bravo-blue">dizem</span> nossos <span className="text-bravo-blue">clientes</span>
          </h2>
          <p className="text-xl text-gray-700 mt-2">
            Homens reais, resultados reais
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="w-16 h-16 rounded-full mr-4 border-2 border-gray-200">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{testimonial.name}</h3>
                    <div className="flex mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-bravo-blue text-bravo-blue" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="rounded-lg overflow-hidden border border-gray-100">
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
