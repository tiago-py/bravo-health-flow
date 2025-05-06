
import PublicLayout from '@/layouts/PublicLayout';

const PrivacyPolicyPage = () => {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-bravo-blue mb-6">Política de Privacidade</h1>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            Esta Política de Privacidade descreve como a Bravo Homem coleta, usa e compartilha suas informações pessoais quando você utiliza nossos serviços, website e aplicativos.
          </p>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">Informações que coletamos</h2>
          
          <h3 className="text-lg font-medium mt-6 mb-2">Informações que você nos fornece</h3>
          <p className="mb-4">
            Coletamos informações que você fornece diretamente, incluindo:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Informações de cadastro (nome, e-mail, telefone, senha)</li>
            <li>Informações de perfil (data de nascimento, endereço)</li>
            <li>Informações de saúde fornecidas durante a anamnese</li>
            <li>Histórico médico e condições preexistentes</li>
            <li>Histórico de pedidos e transações</li>
            <li>Comunicações com nossa equipe</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-2">Informações coletadas automaticamente</h3>
          <p className="mb-4">
            Quando você acessa nossos serviços, podemos coletar automaticamente:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Informações do dispositivo (modelo, sistema operacional)</li>
            <li>Endereço IP e dados de localização aproximada</li>
            <li>Informações de navegação e uso dos serviços</li>
            <li>Cookies e tecnologias similares</li>
          </ul>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">Como usamos suas informações</h2>
          <p className="mb-4">
            Utilizamos suas informações para:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Fornecer, manter e melhorar nossos serviços</li>
            <li>Processar e personalizar seu plano de tratamento</li>
            <li>Facilitar a comunicação entre você e os médicos</li>
            <li>Processar pagamentos e entregas</li>
            <li>Enviar comunicações sobre seu tratamento e serviços</li>
            <li>Cumprir obrigações legais e regulatórias</li>
            <li>Prevenir fraudes e garantir a segurança</li>
          </ul>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">Compartilhamento de informações</h2>
          <p className="mb-4">
            Podemos compartilhar suas informações com:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Médicos e profissionais de saúde que fazem parte da nossa rede</li>
            <li>Prestadores de serviços que nos auxiliam (processamento de pagamentos, logística)</li>
            <li>Parceiros de negócios, com seu consentimento explícito</li>
            <li>Autoridades governamentais, quando exigido por lei</li>
          </ul>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">Segurança dos dados</h2>
          <p className="mb-4">
            Implementamos medidas técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, perda ou alteração. Entretanto, nenhum sistema é completamente seguro, e não podemos garantir a segurança absoluta de suas informações.
          </p>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">Seus direitos</h2>
          <p className="mb-4">
            Você tem direitos em relação aos seus dados pessoais, incluindo:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Acesso às suas informações pessoais</li>
            <li>Correção de dados imprecisos</li>
            <li>Exclusão de dados em determinadas circunstâncias</li>
            <li>Restrição ou objeção ao processamento</li>
            <li>Portabilidade de dados</li>
            <li>Retirada de consentimento</li>
          </ul>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">Alterações nesta política</h2>
          <p className="mb-4">
            Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente estará sempre disponível em nosso website, e notificaremos sobre alterações significativas.
          </p>

          <h2 className="text-xl font-semibold text-bravo-blue mt-8 mb-4">Contato</h2>
          <p className="mb-4">
            Se você tiver dúvidas ou preocupações sobre esta política ou sobre o processamento de seus dados pessoais, entre em contato conosco pelo e-mail: privacidade@bravohomem.com.br
          </p>

          <p className="mt-8 text-sm text-gray-500">
            Última atualização: 10 de março de 2023
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PrivacyPolicyPage;
