
import { Link } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

const HomePage = () => {
  const howItWorks = [
    {
      id: 1,
      title: 'Responda o questionário',
      description: 'Conte-nos sobre sua saúde e objetivos de tratamento através da nossa anamnese online.',
      icon: '📋',
    },
    {
      id: 2,
      title: 'Avaliação médica',
      description: 'Um médico especialista irá analisar suas respostas e criar um plano personalizado.',
      icon: '👨‍⚕️',
    },
    {
      id: 3,
      title: 'Receba em casa',
      description: 'Seus medicamentos são entregues discretamente na sua porta a cada mês.',
      icon: '📦',
    },
  ];

  const treatments = [
    {
      id: 1,
      title: 'Queda Capilar',
      description: 'Tratamentos personalizados com minoxidil e finasterida para combater a queda de cabelo.',
      path: '/tratamento/queda-capilar',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
    },
    {
      id: 2,
      title: 'Disfunção Erétil',
      description: 'Soluções eficazes baseadas em evidências científicas para melhorar seu desempenho sexual.',
      path: '/tratamento/disfuncao-eretil',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Carlos M.',
      age: 35,
      text: 'Depois de 3 meses usando o tratamento da Bravo, consegui reverter minha queda de cabelo e já vejo novos fios crescendo.',
    },
    {
      id: 2,
      name: 'Ricardo P.',
      age: 42,
      text: 'O tratamento para disfunção erétil mudou minha vida. Recuperei minha confiança e meu relacionamento melhorou significativamente.',
    },
    {
      id: 3,
      name: 'André L.',
      age: 29,
      text: 'Excelente atendimento e acompanhamento médico. O plano personalizado fez toda diferença nos resultados.',
    },
  ];

  const faqs = [
    {
      id: 1,
      question: 'Os médicos são especializados?',
      answer: 'Sim, todos os nossos médicos são especialistas em saúde masculina e possuem experiência comprovada.',
    },
    {
      id: 2,
      question: 'Como funciona a entrega dos medicamentos?',
      answer: 'Enviamos os medicamentos em embalagens discretas diretamente para o endereço cadastrado, garantindo sua privacidade.',
    },
    {
      id: 3,
      question: 'Posso cancelar meu plano a qualquer momento?',
      answer: 'Sim, você pode cancelar seu plano quando quiser sem multas ou taxas adicionais.',
    },
    {
      id: 4,
      question: 'Meus dados médicos são confidenciais?',
      answer: 'Absolutamente. Seguimos rigorosos protocolos de segurança e confidencialidade para proteger suas informações.',
    },
    {
      id: 5,
      question: 'Como sei se o tratamento está funcionando?',
      answer: 'Realizamos acompanhamentos regulares e ajustes no seu tratamento conforme necessário para garantir os melhores resultados.',
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-bravo-beige py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-bravo-blue mb-6">
              Tratamento personalizado para queda de cabelo
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Recupere sua confiança com tratamentos médicos personalizados, 
              desenvolvidos especialmente para suas necessidades.
            </p>
            <Link to="/anamnese/queda-capilar">
              <Button className="btn-primary text-lg px-8 py-6">
                Começar agora <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-bravo-blue mb-4">Como funciona</h2>
          <p className="text-gray-700">
            Nosso processo é simples, seguro e personalizado para suas necessidades específicas.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {howItWorks.map((step) => (
            <div key={step.id} className="text-center bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-bravo-blue mb-3">
                {step.title}
              </h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Treatments */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-bravo-blue mb-12 text-center">
            Nossos Tratamentos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {treatments.map((treatment) => (
              <div key={treatment.id} className="card-treatment overflow-hidden">
                <div 
                  className="h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${treatment.image})` }}
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-bravo-blue mb-2">
                    {treatment.title}
                  </h3>
                  <p className="text-gray-700 mb-6">
                    {treatment.description}
                  </p>
                  <Link to={treatment.path}>
                    <Button variant="outline" className="btn-outline">
                      Ver opções <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-bravo-blue mb-4">O que dizem nossos clientes</h2>
          <p className="text-gray-700">
            Histórias reais de homens que transformaram sua qualidade de vida com a Bravo.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6">"{testimonial.text}"</p>
              <div className="font-medium text-bravo-blue">
                {testimonial.name}, {testimonial.age} anos
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guarantees */}
      <section className="bg-bravo-beige py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-bravo-blue mb-4">Nossas Garantias</h2>
            <p className="text-gray-700">
              Seu bem-estar e privacidade são nossas prioridades.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex items-start">
              <div className="mr-4 bg-white p-2 rounded-full">
                <Check className="text-bravo-blue" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-bravo-blue mb-2">
                  Confidencialidade total
                </h3>
                <p className="text-gray-700">
                  Seus dados e consultas médicas são protegidos e tratados com sigilo absoluto.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 bg-white p-2 rounded-full">
                <Check className="text-bravo-blue" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-bravo-blue mb-2">
                  Entrega discreta
                </h3>
                <p className="text-gray-700">
                  Embalagens sem identificação externa sobre o conteúdo para sua privacidade.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 bg-white p-2 rounded-full">
                <Check className="text-bravo-blue" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-bravo-blue mb-2">
                  Aprovação médica
                </h3>
                <p className="text-gray-700">
                  Todos os tratamentos são aprovados e supervisionados por médicos qualificados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-bravo-blue mb-4">Perguntas Frequentes</h2>
          <p className="text-gray-700">
            Dúvidas comuns sobre nossos tratamentos e processos.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((faq) => (
            <div key={faq.id} className="py-6">
              <h3 className="text-lg font-semibold text-bravo-blue mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bravo-blue text-white py-16 md:py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Pronto para começar seu tratamento personalizado?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Responda algumas perguntas e receba um plano de tratamento feito especialmente para você.
            </p>
            <Link to="/anamnese/queda-capilar">
              <Button className="bg-white text-bravo-blue hover:bg-bravo-beige rounded-full text-lg px-8 py-6">
                Começar agora <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HomePage;
