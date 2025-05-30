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
      image: '/lovable-uploads/7673d9b3-9048-488f-8c54-e00ee99cc10c.png',
      path: '/tratamento/queda-capilar',
    },
    {
      id: 2,
      title: 'Bravo Max',
      description: 'Tratamento para disfunção erétil e performance.',
      price: 'R$ XX/mês',
      image: '/lovable-uploads/c3b0d7bb-6e5f-4883-90bc-09a23028a1b2.png',
      path: '/tratamento/disfuncao-eretil',
    },
    {
      id: 3,
      title: 'Combinação Bravo(Hair + Max)',
      description: 'Tratamento completo ideal para solucionar tudo de uma vez.',
      price: 'R$ XX/mês',
      image: '/lovable-uploads/3cb9c079-bd08-492d-a8aa-dbeed3acd3ae.png',
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
