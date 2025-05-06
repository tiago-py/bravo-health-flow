
import { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const openWhatsApp = () => {
    // Replace with actual WhatsApp number
    window.open('https://wa.me/5511999999999?text=Olá!%20Estou%20entrando%20em%20contato%20através%20do%20site%20da%20Bravo%20Homem.', '_blank');
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-bravo-blue mb-6 text-center">Entre em Contato</h1>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="h-12 w-12 bg-bravo-beige rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={24} className="text-bravo-blue" />
              </div>
              <h3 className="text-lg font-semibold text-bravo-blue mb-2">Telefone</h3>
              <p className="text-gray-700">(11) 3333-4444</p>
              <p className="text-gray-700">(11) 99999-8888</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="h-12 w-12 bg-bravo-beige rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-bravo-blue" />
              </div>
              <h3 className="text-lg font-semibold text-bravo-blue mb-2">E-mail</h3>
              <p className="text-gray-700">contato@bravohomem.com.br</p>
              <p className="text-gray-700">suporte@bravohomem.com.br</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="h-12 w-12 bg-bravo-beige rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-bravo-blue" />
              </div>
              <h3 className="text-lg font-semibold text-bravo-blue mb-2">Endereço</h3>
              <p className="text-gray-700">Av. Paulista, 1000</p>
              <p className="text-gray-700">São Paulo - SP, 01310-100</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-semibold text-bravo-blue mb-6">Envie-nos uma mensagem</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Assunto
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                  </Button>
                </div>
              </form>
            </div>
            
            {/* WhatsApp and Information */}
            <div className="flex flex-col">
              <div className="bg-bravo-beige p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold text-bravo-blue mb-4">
                  Fale pelo WhatsApp
                </h2>
                <p className="text-gray-700 mb-6">
                  Prefere conversar diretamente? Entre em contato com nosso time de suporte por WhatsApp para atendimento imediato.
                </p>
                <Button 
                  onClick={openWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  Conversar no WhatsApp
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-bravo-blue mb-4">Horário de atendimento</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Segunda a Sexta</span>
                    <span>08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado</span>
                    <span>09:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo e Feriados</span>
                    <span>Fechado</span>
                  </div>
                </div>
                
                <hr className="my-4 border-gray-200" />
                
                <div className="text-gray-700">
                  <p className="mb-2">
                    <strong>Resposta em até:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>1 hora por WhatsApp (em horário comercial)</li>
                    <li>24 horas por e-mail</li>
                    <li>48 horas para o formulário de contato</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ContactPage;
