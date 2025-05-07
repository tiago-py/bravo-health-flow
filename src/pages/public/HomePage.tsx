
import { Link } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Importing section components
import HeroSection from '@/components/home/HeroSection';
import ModernManSection from '@/components/home/ModernManSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';

const HomePage = () => {
  const treatments = [
    {
      id: 1,
      title: 'Bravo Hair',
      description: 'Tratamento para queda, entradas e calvície.',
      price: 'R$ XX/mês',
      image: '/lovable-uploads/5eeca943-d84b-4583-9f6c-3a95476fe153.png',
      path: '/tratamento/queda-capilar',
    },
    {
      id: 2,
      title: 'Bravo Max',
      description: 'Tratamento para disfunção erétil e performance.',
      price: 'R$ XX/mês',
      image: '/lovable-uploads/166de199-b9a4-49e5-a49e-1e1971e9f9b6.png',
      path: '/tratamento/disfuncao-eretil',
    },
    {
      id: 3,
      title: 'Combinação Bravo(Hair + Max)',
      description: 'Tratamento completo ideal para solucionar tudo de uma vez.',
      price: 'R$ XX/mês',
      image: '/lovable-uploads/22d996f6-2053-4905-b9d5-8c64a604e6c7.png',
      path: '/tratamento/combinacao',
    },
  ];

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

  const faqs = [
    {
      id: 1,
      question: 'É seguro comprar Bravo Hair e Bravo Max?',
      answer: 'Sim! Todos os nossos produtos têm prescrição médica quando necessário e passam por controle de qualidade rigoroso.',
    },
    {
      id: 2,
      question: 'Em quanto tempo vejo resultado?',
      answer: 'Depende do seu caso – mas muitos homens notam mudanças a partir da 3ª semana.',
    },
    {
      id: 3,
      question: 'Como é feita a entrega?',
      answer: 'Discreta, rápida e com toda segurança. Ninguém precisa saber do seu tratamento – só você.',
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <HeroSection />

      {/* Feito para o homem moderno */}
      <ModernManSection />

      {/* Como funciona - com efeito escadinha */}
      <HowItWorksSection />

      {/* Bravo Hair */}
      <section className="py-16 bg-bravo-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-bravo-blue mb-2">Bravo Hair</h2>
            <p className="text-xl text-gray-700">Tratamento completo contra queda de cabelo</p>
          </div>

          <div className="flex flex-col md:flex-row mt-12">
            <div className="md:w-1/2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                <div className="bg-bravo-blue bg-opacity-60 text-white rounded-md p-2 px-4 inline-flex items-center">
                  <Check size={18} className="mr-2" /> Entrega discreta
                </div>
                <div className="bg-bravo-blue bg-opacity-60 text-white rounded-md p-2 px-4 inline-flex items-center">
                  <Check size={18} className="mr-2" /> Resultados visíveis em semanas
                </div>
                <div className="bg-bravo-blue bg-opacity-60 text-white rounded-md p-2 px-4 inline-flex items-center">
                  <Check size={18} className="mr-2" /> Fórmula manipulada sob medida
                </div>
                <div className="bg-bravo-blue bg-opacity-60 text-white rounded-md p-2 px-4 inline-flex items-center">
                  <Check size={18} className="mr-2" /> Discrição e entrega garantidas
                </div>
                <div className="bg-bravo-blue bg-opacity-60 text-white rounded-md p-2 px-4 inline-flex items-center">
                  <Check size={18} className="mr-2" /> Consulta rápida, 100% online
                </div>
                <div className="bg-bravo-blue bg-opacity-60 text-white rounded-md p-2 px-4 inline-flex items-center">
                  <Check size={18} className="mr-2" /> Ingredientes com eficácia comprovada
                </div>
              </div>

              <div className="mt-8">
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
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
              <img 
                src="/lovable-uploads/166de199-b9a4-49e5-a49e-1e1971e9f9b6.png" 
                alt="Bravo Hair" 
                className="max-h-96" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bravo Max */}
      <section className="py-16 bg-bravo-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-700 mb-2">Bravo Max</h2>
            <p className="text-xl text-gray-700">Para sua potência não falhar</p>
          </div>

          <div className="flex flex-col md:flex-row mt-12">
            <div className="md:w-1/2 mt-8 md:mt-0 md:order-1">
              <img 
                src="/lovable-uploads/22d996f6-2053-4905-b9d5-8c64a604e6c7.png" 
                alt="Bravo Max" 
                className="max-h-96" 
              />
            </div>
            <div className="md:w-1/2 md:pr-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                <div className="bg-amber-600 bg-opacity-60 text-white rounded-md p-2 px-4 inline-flex items-center">
                  <Check size={18} className="mr-2" /> Consulta rápida
                </div>
                <div className="bg-amber-600 bg-opacity-60 text-white rounded-md p-2 px-4 inline-flex items-center">
                  <Check size={18} className="mr-2" /> Envio em embalagem discreta
                </div>
                <div className="bg-amber-600 bg-opacity-60 text-white rounded-md p-2 px-4 inline-flex items-center">
                  <Check size={18} className="mr-2" /> Solução contínua - não só pontual
                </div>
                <div className="bg-amber-600 bg-opacity-60 text-white rounded-md p-2 px-4 inline-flex items-center">
                  <Check size={18} className="mr-2" /> Tratamento seguro, com acompanhamento médico
                </div>
                <div className="bg-amber-600 bg-opacity-60 text-white rounded-md p-2 px-4 inline-flex items-center">
                  <Check size={18} className="mr-2" /> Fórmula manipulada sob medida
                </div>
                <div className="bg-amber-600 bg-opacity-60 text-white rounded-md p-2 px-4 inline-flex items-center">
                  <Check size={18} className="mr-2" /> Resultados reais, com discrição e acolhimento
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">Você não está sozinho.</h3>
                <p className="text-gray-700 mb-6">
                  A disfunção erétil atinge milhões de homens – mas não precisa ser um peso na sua
                  vida. O Bravo Max combina ingredientes com respaldo clínico para melhorar sua
                  performance, aumentar o desejo e devolver sua confiança.
                </p>
                <Button className="bg-amber-700 hover:bg-amber-800 rounded-full">
                  Quero mais potência
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              O que nossos <span className="text-bravo-blue">clientes dizem</span>
            </h2>
            <div className="flex space-x-2">
              <button className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                &lt;
              </button>
              <button className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                &gt;
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="border border-gray-100 rounded-lg p-6 shadow-sm">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-10 h-10 rounded-full mr-3 object-cover" 
                  />
                  <span className="font-medium">{testimonial.name}</span>
                </div>
                <div className="mt-4">
                  <img 
                    src={testimonial.beforeAfter} 
                    alt="Antes e depois" 
                    className="w-full h-auto rounded-lg" 
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <div className="flex space-x-1">
              <div className="h-2 w-2 rounded-full bg-bravo-blue"></div>
              <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              <div className="h-2 w-2 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Bravo é diferente */}
      <section className="py-16 bg-bravo-beige">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-4xl md:text-5xl font-bold text-bravo-blue mb-6">
                Bravo é diferente
              </h2>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Nada de julgamento.</h3>
                <h3 className="text-2xl font-bold mb-4">Nada de fingir que tá tudo bem.</h3>
              </div>
              <p className="text-gray-700 mb-6">
                A Bravo é um lugar feito para homens reais que também têm problemas.
                A gente entende as suas dúvidas, o seu tempo, os seus objetivos e o seu
                jeito de viver.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="text-bravo-blue mr-2" size={20} />
                  <p>Atendimento humanizado</p>
                </div>
                <div className="flex items-center">
                  <Check className="text-bravo-blue mr-2" size={20} />
                  <p>Tratamentos reais, sem enrolação</p>
                </div>
                <div className="flex items-center">
                  <Check className="text-bravo-blue mr-2" size={20} />
                  <p>Foco no bem-estar total: físico, sexual e emocional</p>
                </div>
              </div>
              <div className="mt-8">
                <Button className="bg-bravo-blue hover:bg-bravo-dark rounded-full">
                  Quero começar meu tratamento
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/98379736-4569-4dbd-8663-6d694ceadb41.png" 
                alt="Homem diferente" 
                className="rounded-lg w-full" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quem somos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Quem <span className="text-bravo-blue">somos</span>
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            A Bravo é um espaço integrativo para o homem moderno, com atendimento 100% digital.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="mr-3 text-bravo-blue">🩺</span>
                  <h3 className="text-xl font-medium text-bravo-blue">
                    Quem cuida dos seus tratamentos
                  </h3>
                </div>
                <div className="mt-6">
                  <img 
                    src="/lovable-uploads/5eeca943-d84b-4583-9f6c-3a95476fe153.png" 
                    alt="Médico especialista" 
                    className="w-full h-48 object-cover rounded-md" 
                  />
                </div>
              </div>
            </Card>
            
            <Card className="border shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="mr-3 text-bravo-blue">📋</span>
                  <h3 className="text-xl font-medium text-bravo-blue">
                    Quem organiza as suas informações
                  </h3>
                </div>
                <div className="mt-6">
                  <img 
                    src="/lovable-uploads/166de199-b9a4-49e5-a49e-1e1971e9f9b6.png" 
                    alt="Organizadora de informações" 
                    className="w-full h-48 object-cover rounded-md" 
                  />
                </div>
              </div>
            </Card>
            
            <Card className="border shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="mr-3 text-bravo-blue">🔮</span>
                  <h3 className="text-xl font-medium text-bravo-blue">
                    Quem planeja o seu futuro
                  </h3>
                </div>
                <div className="mt-6">
                  <img 
                    src="/lovable-uploads/22d996f6-2053-4905-b9d5-8c64a604e6c7.png" 
                    alt="Planejadores de futuro" 
                    className="w-full h-48 object-cover rounded-md" 
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Dúvidas <span className="text-bravo-blue">frequentes</span>
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border-t border-gray-200 py-2">
                  <AccordionTrigger className="text-xl font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="text-center mt-8">
              <Button variant="outline" className="rounded-full border-bravo-blue text-bravo-blue">
                Ver todas as perguntas
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-bravo-beige">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            O lugar do homem moderno <span className="text-bravo-blue">é aqui.</span>
          </h2>
          <p className="text-xl mb-4">
            Bravo Homem – Tratamentos e cuidados pensados em você, para você.
          </p>
          <p className="mb-8">
            Sem julgamento. Sem complicação. Sem mimimi.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-bravo-blue hover:bg-bravo-dark rounded-full">
              Começar meu tratamento
            </Button>
            <Button variant="outline" className="border-bravo-blue text-bravo-blue rounded-full">
              Agendar atendimento
            </Button>
          </div>
        </div>
      </section>

      {/* Comece agora */}
      <section className="py-16 bg-bravo-beige">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Comece <span className="text-bravo-blue">agora</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {treatments.map((treatment) => (
              <Card key={treatment.id} className="overflow-hidden bg-white">
                <div className="p-4">
                  <img 
                    src={treatment.image} 
                    alt={treatment.title} 
                    className="w-full h-48 object-cover rounded-lg mb-4" 
                  />
                  <h3 className="text-2xl font-bold text-bravo-blue mb-2">
                    {treatment.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {treatment.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">a partir de</p>
                  <p className="text-2xl font-bold mb-4">{treatment.price}</p>
                  <Link to={treatment.path}>
                    <Button className="w-full rounded-full bg-bravo-blue hover:bg-bravo-dark">
                      Começar agora
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HomePage;
