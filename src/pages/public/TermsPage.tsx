
import PublicLayout from '@/layouts/PublicLayout';

const TermsPage = () => {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-bravo-blue mb-6">Termos de Uso</h1>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Ao acessar ou utilizar os serviços da Bravo Homem, você concorda com os termos e condições descritos abaixo. Leia atentamente.
          </p>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">1. Aceitação dos Termos</h2>
          <p className="mb-4">
            Ao utilizar nossos serviços, você confirma que leu, entendeu e concorda com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, você não deverá utilizar nossos serviços.
          </p>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">2. Descrição dos Serviços</h2>
          <p className="mb-4">
            A Bravo Homem oferece uma plataforma digital que conecta usuários a médicos para avaliação e tratamento de condições de saúde masculina, incluindo queda capilar e disfunção erétil. Nossos serviços incluem questionários de anamnese online, avaliação médica à distância, prescrição médica e entrega de medicamentos.
          </p>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">3. Elegibilidade</h2>
          <p className="mb-4">
            Para utilizar nossos serviços, você deve:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Ter pelo menos 18 anos de idade</li>
            <li>Residir no Brasil</li>
            <li>Possuir capacidade legal para celebrar contratos</li>
            <li>Fornecer informações precisas e completas</li>
          </ul>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">4. Cadastro e Conta</h2>
          <p className="mb-4">
            Para utilizar nossos serviços, você deverá criar uma conta fornecendo informações precisas e completas. Você é responsável por manter a confidencialidade de sua senha e por todas as atividades realizadas com sua conta.
          </p>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">5. Relacionamento Médico-Paciente</h2>
          <p className="mb-4">
            Nossos serviços facilitam a conexão entre pacientes e médicos, mas não substituem consultas presenciais quando necessárias. Você concorda que:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Fornecerá informações verdadeiras e completas sobre seu histórico médico</li>
            <li>Utilizará os medicamentos conforme prescrito pelo médico</li>
            <li>Reportará quaisquer efeitos adversos ou complicações</li>
            <li>Buscará atendimento de emergência quando necessário</li>
          </ul>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">6. Pagamentos e Assinatura</h2>
          <p className="mb-4">
            Ao adquirir um plano ou tratamento, você concorda com os termos de pagamento apresentados no momento da compra. As assinaturas são renovadas automaticamente até que sejam canceladas. Você pode cancelar sua assinatura a qualquer momento através de sua conta ou entrando em contato conosco.
          </p>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">7. Política de Reembolso</h2>
          <p className="mb-4">
            Reembolsos podem ser concedidos de acordo com nossa política vigente e conforme a legislação aplicável. Entre em contato com nosso serviço de atendimento ao cliente para solicitar reembolsos.
          </p>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">8. Propriedade Intelectual</h2>
          <p className="mb-4">
            Todos os conteúdos disponibilizados em nossa plataforma, incluindo textos, gráficos, logotipos, ícones, imagens, clipes de áudio e software, são propriedade da Bravo Homem ou de seus licenciadores e são protegidos por leis de propriedade intelectual.
          </p>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">9. Limitação de Responsabilidade</h2>
          <p className="mb-4">
            A Bravo Homem não será responsável por danos indiretos, incidentais, especiais, punitivos ou consequentes resultantes do uso ou incapacidade de usar nossos serviços, mesmo que tenhamos sido informados da possibilidade de tais danos.
          </p>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">10. Alterações nos Termos</h2>
          <p className="mb-4">
            Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações entrarão em vigor imediatamente após sua publicação. O uso contínuo dos serviços após tais alterações constitui sua aceitação dos novos termos.
          </p>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">11. Lei Aplicável</h2>
          <p className="mb-4">
            Estes termos serão regidos e interpretados de acordo com as leis do Brasil. Qualquer disputa relacionada a estes termos será submetida à jurisdição exclusiva dos tribunais brasileiros.
          </p>

          <p className="mt-8 text-sm text-gray-500">
            Última atualização: 10 de março de 2023
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default TermsPage;
