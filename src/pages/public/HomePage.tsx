
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
