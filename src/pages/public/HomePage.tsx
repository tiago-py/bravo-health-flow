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
import BravoHairSection from '@/components/home/BravoHairSection';
import BravoMaxSection from '@/components/home/BravoMaxSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BravoDifferentSection from '@/components/home/BravoDifferentSection';
import WhoWeAreSection from '@/components/home/WhoWeAreSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import StartNowSection from '@/components/home/StartNowSection';

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

      {/* Bravo Hair - Novo Componente */}
      <BravoHairSection />

      {/* Bravo Max */}
      <BravoMaxSection />

      {/* Depoimentos */}
      <TestimonialsSection />

      {/* Bravo é diferente */}
      <BravoDifferentSection />

      {/* Quem somos */}
      <WhoWeAreSection />

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <CTASection />

      {/* Comece agora */}
      <StartNowSection treatments={treatments} />
    </PublicLayout>
  );
};

export default HomePage;
