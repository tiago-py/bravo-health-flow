
import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

interface Treatment {
  type: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  products: Product[];
  heroImage: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

const TreatmentPage = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  
  const treatments: Record<string, Treatment> = {
    'queda-capilar': {
      type: 'queda-capilar',
      title: 'Tratamento para Queda Capilar',
      subtitle: 'Soluções comprovadas para combater a perda de cabelo',
      description: 'A calvície masculina, ou alopecia androgenética, afeta até 70% dos homens ao longo da vida. Nossos tratamentos combinam medicamentos clinicamente comprovados e uma abordagem personalizada para combater a queda e estimular o crescimento de novos fios.',
      benefits: [
        'Redução significativa da queda em até 90% dos casos',
        'Estímulo do crescimento de novos fios',
        'Fortalecimento da estrutura capilar',
        'Tratamentos personalizados para seu tipo específico de queda',
        'Acompanhamento médico especializado'
      ],
      products: [
        {
          id: 1,
          name: 'Minoxidil',
          description: 'Solução tópica que estimula o crescimento capilar e fortalece os fios existentes.',
          image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22'
        },
        {
          id: 2,
          name: 'Finasterida',
          description: 'Medicamento oral que bloqueia a conversão de testosterona em DHT, hormônio responsável pela miniaturização dos folículos.',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
        },
        {
          id: 3,
          name: 'Complexo Vitamínico',
          description: 'Suplementação específica para fortalecer os folículos capilares e melhorar a qualidade dos fios.',
          image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843'
        }
      ],
      heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475'
    },
    'disfuncao-eretil': {
      type: 'disfuncao-eretil',
      title: 'Tratamento para Disfunção Erétil',
      subtitle: 'Recupere sua confiança e desempenho sexual',
      description: 'A disfunção erétil afeta milhões de homens e pode ser causada por fatores físicos, psicológicos ou uma combinação de ambos. Nossos tratamentos são desenvolvidos para abordar as causas subjacentes e proporcionar resultados efetivos e seguros.',
      benefits: [
        'Melhora significativa da função erétil',
        'Aumento da confiança e autoestima',
        'Tratamentos discretos e convenientes',
        'Abordagem holística para saúde sexual',
        'Consultas médicas confidenciais'
      ],
      products: [
        {
          id: 1,
          name: 'Sildenafila',
          description: 'Medicamento que aumenta o fluxo sanguíneo para o pênis, facilitando e mantendo a ereção.',
          image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'
        },
        {
          id: 2,
          name: 'Tadalafila',
          description: 'Tratamento de ação prolongada que oferece maior espontaneidade na vida sexual.',
          image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b'
        },
        {
          id: 3,
          name: 'Suporte Psicológico',
          description: 'Orientações e técnicas para gerenciar os aspectos psicológicos da disfunção erétil.',
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
        }
      ],
      heroImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05'
    }
  };
  
  const treatment = type ? treatments[type] : null;
  
  useEffect(() => {
    // Redirect to home if treatment type is invalid
    if (!treatment) {
      navigate('/');
    }
    // Scroll to top when treatment changes
    window.scrollTo(0, 0);
  }, [treatment, navigate]);
  
  if (!treatment) return null;

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section 
        className="pt-16 pb-20 md:pt-24 md:pb-32 bg-cover bg-center relative"
        style={{ 
          backgroundImage: `linear-gradient(rgba(93, 124, 138, 0.85), rgba(93, 124, 138, 0.85)), url(${treatment.heroImage})` 
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {treatment.title}
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              {treatment.subtitle}
            </p>
            <Link to={`/anamnese/${treatment.type}`}>
              <Button className="bg-white text-bravo-blue hover:bg-bravo-beige rounded-full text-lg px-8 py-6">
                Começar tratamento <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="section-container">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-bravo-blue mb-6 text-center">
            Entenda o problema
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            {treatment.description}
          </p>
          
          <h3 className="text-2xl font-semibold text-bravo-blue mb-6">
            Benefícios do nosso tratamento
          </h3>
          <ul className="space-y-4 mb-12">
            {treatment.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-4 text-bravo-blue">
                  <Check size={20} />
                </div>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-bravo-blue mb-12 text-center">
            Soluções que oferecemos
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {treatment.products.map((product) => (
              <div key={product.id} className="card-treatment overflow-hidden">
                <div 
                  className="h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-bravo-blue mb-3">
                    {product.name}
                  </h3>
                  <p className="text-gray-700 mb-6">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-bravo-blue mb-6">
            Pronto para transformar sua vida?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Nosso processo de avaliação é rápido, confidencial e desenvolvido por especialistas para criar um plano personalizado para você.
          </p>
          <Link to={`/anamnese/${treatment.type}`}>
            <Button className="btn-primary text-lg px-8 py-6">
              Começar tratamento agora <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default TreatmentPage;
