import { Link } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
const TratamentoEretilPage = () => {
  return <PublicLayout>
      {/* Hero Section */}
      <section className="py-20 bg-bravo-beige">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Recupere sua <span className="text-bravo-blue">performance</span> e <span className="text-bravo-blue">confiança</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Tratamento personalizado e discreto para disfunção erétil e melhora do desempenho sexual. Desenvolvido por especialistas em saúde masculina.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/anamnese/disfuncao-eretil">
                  <Button className="bg-bravo-blue hover:bg-bravo-dark rounded-full px-8 py-6 text-lg">
                    Começar agora <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link to="#como-funciona">
                  <Button variant="outline" className="rounded-full px-8 py-6 text-lg">
                    Como funciona
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src="/lovable-uploads/c3b0d7bb-6e5f-4883-90bc-09a23028a1b2.png" alt="Homem confiante" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* O problema section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A disfunção erétil afeta <span className="text-bravo-blue">mais homens</span> do que você imagina
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Cerca de 40% dos homens acima de 40 anos enfrentam algum grau de disfunção erétil, mas poucos buscam tratamento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="bg-bravo-beige p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 6V12L16 14" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Idade</h3>
                <p className="text-gray-700">
                  Com o avanço da idade, há uma diminuição natural nos níveis de testosterona e mudanças na circulação sanguínea que podem afetar a função erétil.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="bg-bravo-beige p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.84 4.60999C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.60999L12 5.66999L10.94 4.60999C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.60999C2.1283 5.64169 1.54871 7.04096 1.54871 8.49999C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.49999C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.60999Z" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Doenças crônicas</h3>
                <p className="text-gray-700">
                  Condições como diabetes, hipertensão e problemas cardíacos podem comprometer significativamente a saúde vascular necessária para ereções firmes.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="bg-bravo-beige p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Estresse e ansiedade</h3>
                <p className="text-gray-700">
                  Fatores psicológicos como estresse, ansiedade de desempenho e depressão podem interferir significativamente na capacidade de obter e manter ereções.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* A solução section */}
      <section className="py-16 bg-bravo-light" id="como-funciona">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O <span className="text-bravo-blue">tratamento</span> Bravo Max
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Uma abordagem científica e personalizada para melhorar a função erétil e devolver sua confiança.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h3 className="text-2xl font-bold mb-4">Formulação personalizada</h3>
              <p className="text-gray-700 mb-4">
                Cada fórmula é adaptada às suas necessidades específicas, considerando sua idade, saúde geral e gravidade dos sintomas.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <Check className="h-5 w-5 text-bravo-blue" />
                  </div>
                  <span className="text-gray-700">Tadalafila em dose personalizada para seu caso</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <Check className="h-5 w-5 text-bravo-blue" />
                  </div>
                  <span className="text-gray-700">L-Arginina para melhorar a circulação sanguínea</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <Check className="h-5 w-5 text-bravo-blue" />
                  </div>
                  <span className="text-gray-700">Vitaminas e minerais que apoiam a saúde vascular</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <img src="/lovable-uploads/0087efeb-bff4-47e0-98e8-86830938bb11.png" alt="Produto Bravo Max" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12">
              <h3 className="text-2xl font-bold mb-4">Abordagem holística</h3>
              <p className="text-gray-700 mb-4">
                Nosso tratamento não se limita à medicação. Oferecemos orientações sobre estilo de vida, alimentação e exercícios específicos para melhorar sua saúde sexual.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <Check className="h-5 w-5 text-bravo-blue" />
                  </div>
                  <span className="text-gray-700">Consultas confidenciais com médicos especializados</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <Check className="h-5 w-5 text-bravo-blue" />
                  </div>
                  <span className="text-gray-700">Planos de alimentação complementares ao tratamento</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <Check className="h-5 w-5 text-bravo-blue" />
                  </div>
                  <span className="text-gray-700">Técnicas para redução de ansiedade e estresse</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Benefícios do <span className="text-bravo-blue">tratamento</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Muito além de melhorar as ereções, o Bravo Max transforma sua qualidade de vida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="bg-bravo-beige p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 9H9.01" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 9H15.01" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Confiança renovada</h3>
                <p className="text-gray-700">
                  Recupere sua autoestima e confiança em situações íntimas, eliminando a ansiedade de desempenho.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="bg-bravo-beige p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.84 4.60999C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.60999L12 5.66999L10.94 4.60999C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.60999C2.1283 5.64169 1.54871 7.04096 1.54871 8.49999C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.49999C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.60999Z" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Relacionamentos melhores</h3>
                <p className="text-gray-700">
                  Melhore sua conexão emocional e física com seu parceiro, proporcionando maior satisfação para ambos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="bg-bravo-beige p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12H18L15 21L9 3L6 12H2" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Melhor desempenho</h3>
                <p className="text-gray-700">
                  Ereções mais firmes e duradouras, permitindo encontros íntimos mais satisfatórios e prazerosos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="bg-bravo-beige p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 12L12 16L16 12" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8V16" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Saúde geral</h3>
                <p className="text-gray-700">
                  A disfunção erétil pode ser sinal de outros problemas de saúde. Nosso tratamento melhora não só a função sexual, mas também aspectos gerais da sua saúde.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Depoimentos section */}
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <svg key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>)}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "Depois de anos evitando relacionamentos íntimos por medo de falhar, finalmente encontrei uma solução que funciona. O tratamento Bravo Max mudou minha vida."
                </p>
                <p className="text-gray-500 text-sm">Carlos, 52 anos</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <svg key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>)}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "Pensei que fosse apenas parte do envelhecimento, mas o Bravo Max provou que eu estava errado. Minha esposa e eu estamos mais felizes do que nunca."
                </p>
                <p className="text-gray-500 text-sm">Ricardo, 48 anos</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <svg key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>)}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "O atendimento discreto e personalizado fez toda a diferença. Em duas semanas já notei resultados significativos. Recomendo a todos."
                </p>
                <p className="text-gray-500 text-sm">André, 39 anos</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-bravo-blue text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Pronto para transformar sua vida íntima?
            </h2>
            <p className="text-xl mb-8">
              Junte-se aos milhares de homens que já recuperaram sua confiança e desempenho com o tratamento Bravo Max.
            </p>
            <Link to="/anamnese/disfuncao-eretil">
              <Button className="bg-white text-bravo-blue hover:bg-gray-100 rounded-full text-lg px-8 py-6">
                Comece seu tratamento agora <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perguntas <span className="text-bravo-blue">frequentes</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-xl font-semibold mb-2">O tratamento é seguro?</h3>
              <p className="text-gray-700">
                Sim. Todos os nossos tratamentos são prescritos por médicos licenciados após uma avaliação cuidadosa do seu histórico médico. Utilizamos apenas medicamentos aprovados e com perfil de segurança estabelecido.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-xl font-semibold mb-2">Quanto tempo leva para o tratamento fazer efeito?</h3>
              <p className="text-gray-700">
                Muitos pacientes relatam melhora já nos primeiros dias de uso. Para efeitos ideais e sustentados, recomendamos seguir o tratamento conforme prescrito por pelo menos 3 meses.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-xl font-semibold mb-2">Existem efeitos colaterais?</h3>
              <p className="text-gray-700">
                Nossa formulação é otimizada para minimizar efeitos colaterais. Alguns pacientes podem experimentar leve dor de cabeça ou congestão nasal no início do tratamento, mas esses efeitos geralmente são passageiros.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-xl font-semibold mb-2">O tratamento é discreto?</h3>
              <p className="text-gray-700">
                Absolutamente. Valorizamos sua privacidade. Tanto as consultas quanto a entrega dos medicamentos são realizadas com total discrição, em embalagens neutras e sem identificação do conteúdo.
              </p>
            </div>

            <div className="pb-4">
              <h3 className="text-xl font-semibold mb-2">Posso tomar com outros medicamentos?</h3>
              <p className="text-gray-700">
                Alguns medicamentos podem interagir com o tratamento. Por isso, nossos médicos revisam cuidadosamente seu histórico médico e ajustam a formulação conforme necessário para garantir compatibilidade com seus outros medicamentos.
              </p>
            </div>
          </div>
        </div>
      </section>

    </PublicLayout>;
};
export default TratamentoEretilPage;