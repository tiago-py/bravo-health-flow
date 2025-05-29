import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
const TestimonialsSection = () => {
  const testimonials = [{
    id: 1,
    text: 'Equipe maravilhosa e com bom atendimento, trabalho 100% garantido.',
    beforeImage: '/lovable-uploads/2e8f2383-f7cc-42ae-80ea-e81c20998782.png',
    afterImage: '/lovable-uploads/83583421-0282-492b-a113-76a6b14fa928.png',
    rating: 5
  }, {
    id: 2,
    text: 'Ótimo atendimento, Ótima equipe!!! Adorei o resultado do meu procedimento!!!',
    beforeImage: '/lovable-uploads/1a2ab4b4-c1b2-416c-a52a-423410af5e7a.png',
    afterImage: '/lovable-uploads/9fb139c0-61a9-4dbe-8894-886c5feccfa0.png',
    rating: 5
  }, {
    id: 3,
    text: 'Equipe muito atenciosa e com excelência no atendimento, procedimento maravilhoso!!!',
    beforeImage: '/lovable-uploads/c327e76a-eaa1-4b90-8674-7c8f09cedd9d.png',
    afterImage: '/lovable-uploads/ca55df51-7d2a-4dec-88b4-8a23de5854cc.png',
    rating: 5
  }];
  return <section className="py-16 bg-slate-100">
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
          {testimonials.map(testimonial => <Card key={testimonial.id} className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow max-w-[220px]">
              <CardContent className="p-3">
                <div className="flex justify-center mb-2">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
                <p className="text-gray-700 mb-3 text-center text-xs italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex gap-1 rounded overflow-hidden">
                  <div className="w-1/2">
                    <img src={testimonial.beforeImage} alt="Antes" className="w-full h-auto object-cover" />
                  </div>
                  <div className="w-1/2">
                    <img src={testimonial.afterImage} alt="Depois" className="w-full h-auto object-cover" />
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;