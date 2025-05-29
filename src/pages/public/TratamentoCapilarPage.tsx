import { Link } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
const TratamentoCapilarPage = () => {
  return <PublicLayout>
      {/* Hero Section */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Recupere sua <span className="text-bravo-blue">confiança</span> junto com seu <span className="text-bravo-blue">cabelo</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Tratamento personalizado e eficaz contra queda capilar, calvície e entradas. Desenvolvido por médicos especialistas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/anamnese/queda-capilar">
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
              <img alt="Homem com cabelo saudável" className="w-full rounded-lg shadow-lg" src="/lovable-uploads/7ef515bd-3f89-46d9-91de-938a15572671.png" />
            </div>
          </div>
        </div>
      </section>

      {/* O problema section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              A queda de cabelo afeta <span className="text-bravo-blue">milhões de homens</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Mais de 50% dos homens irão experimentar alguma forma de queda capilar antes dos 50 anos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 bg-slate-100">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13 2.05C13 2.05 16 6 16 12" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11 2.05C11 2.05 8 6 8 12" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.63 15.5H21.37" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.63 8.5H21.37" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Genética</h3>
                <p className="text-gray-700">
                  A hereditariedade é responsável por até 80% dos casos de calvície masculina. Se seu pai ou avô tiveram queda de cabelo, suas chances são maiores.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 bg-slate-100">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L12 5L21 9L12 13L3 9Z" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 9V15" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 11.5V16.5C7 16.5 9 18.5 12 18.5C15 18.5 17 16.5 17 16.5V11.5" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Hormônios</h3>
                <p className="text-gray-700">
                  A DHT, um derivado da testosterona, contribui significativamente para a queda capilar ao enfraquecer os folículos capilares ao longo do tempo.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 bg-slate-100">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V16" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 12H16" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0075FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Estresse</h3>
                <p className="text-gray-700">
                  O estresse crônico e altos níveis de cortisol podem acelerar o processo de queda capilar e dificultar o crescimento de novos fios.
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
              O <span className="text-bravo-blue">tratamento</span> Bravo Hair
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Uma abordagem científica e personalizada para combater a queda capilar e estimular o crescimento de novos fios.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h3 className="text-2xl font-bold mb-4">Formulação personalizada</h3>
              <p className="text-gray-700 mb-4">
                Cada fórmula é desenvolvida especificamente para seu tipo de queda capilar, estágio de calvície e necessidades únicas.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <Check className="h-5 w-5 text-bravo-blue" />
                  </div>
                  <span className="text-gray-700">Minoxidil em concentração personalizada</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <Check className="h-5 w-5 text-bravo-blue" />
                  </div>
                  <span className="text-gray-700">Finasterida tópica sem efeitos colaterais sistêmicos</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <Check className="h-5 w-5 text-bravo-blue" />
                  </div>
                  <span className="text-gray-700">Complexo vitamínico específico para cada caso</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <img alt="Homem com cabelo crespo" className="w-full rounded-lg shadow-lg" src="/lovable-uploads/cc489b53-968d-4728-a78d-da2c8f24debb.png" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12">
              <h3 className="text-2xl font-bold mb-4">Acompanhamento médico contínuo</h3>
              <p className="text-gray-700 mb-4">
                Médicos especialistas acompanham seu progresso e fazem ajustes quando necessário para garantir os melhores resultados.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <Check className="h-5 w-5 text-bravo-blue" />
                  </div>
                  <span className="text-gray-700">Consultas virtuais com dermatologistas</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <Check className="h-5 w-5 text-bravo-blue" />
                  </div>
                  <span className="text-gray-700">Ajustes da fórmula conforme sua resposta</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1">
                    <Check className="h-5 w-5 text-bravo-blue" />
                  </div>
                  <span className="text-gray-700">Suporte contínuo durante todo o tratamento</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <img src="/lovable-uploads/b25e2366-4221-42c8-9fc1-459138f111b2.png" alt="Médico Bravo Hair" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Resultados section */}
      <section className="py-16 bg-white">
        
      </section>

      {/* Benefícios section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img alt="Homem confiante" className="w-full rounded-lg shadow-lg" src="/lovable-uploads/652f10c9-f9e7-43b4-bf8b-3e7bdfc1bf72.png" />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Por que escolher a <span className="text-bravo-blue">Bravo Hair</span>
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="bg-bravo-blue rounded-full p-2 mr-4">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gray-800 text-lg">Consulta rápida, 100% online</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-bravo-blue rounded-full p-2 mr-4">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gray-800 text-lg">Fórmula manipulada sob medida</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-bravo-blue rounded-full p-2 mr-4">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gray-800 text-lg">Entrega discreta na sua casa</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-bravo-blue rounded-full p-2 mr-4">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gray-800 text-lg">Resultados visíveis em semanas</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-bravo-blue rounded-full p-2 mr-4">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gray-800 text-lg">Ingredientes com eficácia comprovada</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-bravo-blue text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Pronto para transformar seu cabelo e sua confiança?
            </h2>
            <p className="text-xl mb-8">
              Junte-se aos milhares de homens que já recuperaram seus cabelos com o tratamento Bravo Hair.
            </p>
            <Link to="/anamnese/queda-capilar">
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
              <h3 className="text-xl font-semibold mb-2">Quanto tempo leva para ver resultados?</h3>
              <p className="text-gray-700">
                Os primeiros resultados geralmente começam a aparecer entre 3 e 6 meses de tratamento consistente. Resultados completos podem ser vistos após 12 meses de uso.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-xl font-semibold mb-2">O tratamento funciona para qualquer tipo de calvície?</h3>
              <p className="text-gray-700">
                O tratamento Bravo Hair é mais eficaz para casos de calvície androgenética (padrão masculino) em estágios iniciais a moderados. Durante sua consulta, nossos médicos avaliarão seu caso específico.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-xl font-semibold mb-2">Existem efeitos colaterais?</h3>
              <p className="text-gray-700">
                Nossa formulação tópica minimiza efeitos colaterais. Alguns usuários podem experimentar leve irritação local inicial, que geralmente diminui com o uso continuado.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-xl font-semibold mb-2">Preciso usar o tratamento para sempre?</h3>
              <p className="text-gray-700">
                Para manter os resultados, o tratamento deve ser continuado. A interrupção pode levar à reversão gradual dos ganhos obtidos, com a retomada do processo de queda capilar.
              </p>
            </div>

            <div className="pb-4">
              <h3 className="text-xl font-semibold mb-2">Como funciona o acompanhamento médico?</h3>
              <p className="text-gray-700">
                Você terá consultas virtuais regulares com nossos dermatologistas para avaliar seu progresso e fazer ajustes no tratamento quando necessário. Nosso suporte está disponível sempre que precisar.
              </p>
            </div>
          </div>
        </div>
      </section>

    </PublicLayout>;
};
export default TratamentoCapilarPage;