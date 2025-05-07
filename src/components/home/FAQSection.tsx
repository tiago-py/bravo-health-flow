
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQSection = () => {
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
    {
      id: 4,
      question: 'Preciso de receita médica?',
      answer: 'Nosso processo inclui consulta online com médico, que avalia seu caso e prescreve o tratamento adequado quando necessário.',
    },
    {
      id: 5,
      question: 'O que acontece se eu não gostar do produto?',
      answer: 'Oferecemos garantia de satisfação. Se não estiver satisfeito, entre em contato com nosso suporte para resolvermos sua situação.',
    },
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-bravo-blue">Perguntas frequentes</h2>
          <p className="text-xl text-gray-700 mt-2">
            Tire suas dúvidas sobre nossos tratamentos
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                <AccordionTrigger className="text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
