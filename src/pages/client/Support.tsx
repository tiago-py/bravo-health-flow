
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from '@/components/ui/sonner';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const ClientSupport = () => {
  const [messageForm, setMessageForm] = useState({
    subject: '',
    message: '',
  });
  
  // Handle form change
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessageForm({
      ...messageForm,
      [e.target.name]: e.target.value,
    });
  };
  
  // Send message
  const sendMessage = () => {
    // Validate form
    if (!messageForm.subject.trim() || !messageForm.message.trim()) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }
    
    // In a real app, this would send an API request
    toast.success('Mensagem enviada com sucesso! Responderemos em breve.');
    
    // Clear form
    setMessageForm({
      subject: '',
      message: '',
    });
  };
  
  // Open WhatsApp
  const openWhatsApp = () => {
    window.open('https://wa.me/5511999999999?text=Olá!%20Sou%20cliente%20da%20Bravo%20e%20preciso%20de%20ajuda.', '_blank');
  };
  
  // FAQ questions
  const faqItems = [
    {
      question: 'Posso cancelar meu plano a qualquer momento?',
      answer: 'Sim, você pode cancelar seu plano a qualquer momento sem taxas adicionais. Basta entrar em contato com nosso suporte via WhatsApp ou e-mail com pelo menos 7 dias de antecedência do próximo ciclo de faturamento.'
    },
    {
      question: 'Como funciona a entrega dos medicamentos?',
      answer: 'Os medicamentos são enviados mensalmente para o endereço cadastrado em sua conta, em embalagens discretas sem identificação do conteúdo. Normalmente, o envio acontece 5 dias antes do término da sua medicação atual.'
    },
    {
      question: 'É possível alterar meu plano de tratamento?',
      answer: 'Sim, você pode solicitar uma revisão do seu plano a qualquer momento. Basta fazer uma nova avaliação pelo app ou entrar em contato com nosso time médico para discutir ajustes no seu tratamento.'
    },
    {
      question: 'Quanto tempo demora para ver resultados?',
      answer: 'O tempo de resposta varia de acordo com cada organismo e tipo de tratamento. Para queda capilar, os primeiros resultados são geralmente observados após 3-4 meses de uso contínuo. Para disfunção erétil, os medicamentos têm efeito imediato, mas resultados mais consistentes podem ser observados após algumas semanas de tratamento.'
    },
    {
      question: 'O que fazer se eu sentir efeitos colaterais?',
      answer: 'Se você sentir qualquer efeito colateral, entre em contato imediatamente com nosso suporte médico via WhatsApp. Nossa equipe está disponível para orientar sobre como proceder e, se necessário, ajustar seu tratamento.'
    },
    {
      question: 'Como posso atualizar meu endereço de entrega?',
      answer: 'Você pode atualizar seu endereço de entrega a qualquer momento através da seção "Meu Perfil" > "Endereço de Entrega". As alterações realizadas até 3 dias antes da data de envio serão aplicadas na próxima entrega.'
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue mb-2">Suporte</h1>
        <p className="text-gray-600">
          Precisa de ajuda? Estamos aqui para você
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* WhatsApp Support */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader>
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <CardTitle>WhatsApp</CardTitle>
                <CardDescription className="text-green-700">
                  Resposta em minutos
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Atendimento rápido e personalizado pelo WhatsApp. Nossa equipe está disponível nos dias úteis das 8h às 18h.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-green-500 hover:bg-green-600"
              onClick={openWhatsApp}
            >
              Falar pelo WhatsApp
            </Button>
          </CardFooter>
        </Card>
        
        {/* Phone Support */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Phone className="h-8 w-8 text-bravo-blue mr-3" />
              <div>
                <CardTitle>Telefone</CardTitle>
                <CardDescription>
                  Horário comercial
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Precisa falar conosco? Estamos disponíveis de segunda a sexta, das 8h às 18h.
            </p>
            <p className="font-medium text-lg">
              (11) 3333-4444
            </p>
          </CardContent>
        </Card>
        
        {/* Email Support */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-bravo-blue mr-3" />
              <div>
                <CardTitle>E-mail</CardTitle>
                <CardDescription>
                  Resposta em até 24h
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Para assuntos que não precisam de resposta imediata, envie um e-mail para:
            </p>
            <p className="font-medium">
              suporte@bravohomem.com.br
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Message Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Envie uma mensagem</CardTitle>
              <CardDescription>
                Nossa equipe responderá em até 24 horas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={messageForm.subject}
                  onChange={handleFormChange}
                  placeholder="Ex: Dúvida sobre meu tratamento"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={messageForm.message}
                  onChange={handleFormChange}
                  placeholder="Descreva sua dúvida ou problema..."
                  rows={5}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={sendMessage}
              >
                Enviar mensagem
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* FAQ */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>
                Respostas para as dúvidas mais comuns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientSupport;
