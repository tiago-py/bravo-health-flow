
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { Clock, Mail, Phone, Globe, CreditCard, Users, Truck, ShieldCheck } from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'Bravo Homem',
    siteUrl: 'https://bravohomem.com.br',
    contactEmail: 'contato@bravohomem.com.br',
    supportPhone: '(11) 3333-4444',
    timezone: 'America/Sao_Paulo',
    maintenanceMode: false,
  });
  
  // Email settings state
  const [emailSettings, setEmailSettings] = useState({
    fromEmail: 'no-reply@bravohomem.com.br',
    replyTo: 'suporte@bravohomem.com.br',
    emailProvider: 'ses',
    emailFooter: 'Bravo Homem - Cuidando da sua saúde | Av. Paulista, 1000 - São Paulo, SP',
    sendWelcomeEmail: true,
    sendOrderConfirmation: true,
    sendShippingNotification: true,
  });
  
  // Shipping settings state
  const [shippingSettings, setShippingSettings] = useState({
    defaultShippingMethod: 'correios',
    shippingTimeMinimum: '3',
    shippingTimeMaximum: '5',
    trackingUrl: 'https://bravohomem.com.br/rastreio/{tracking_code}',
    discreteShipping: true,
    shippingLabel: 'BH Distribuidora LTDA',
  });
  
  // Payment settings state
  const [paymentSettings, setPaymentSettings] = useState({
    currency: 'BRL',
    currencySymbol: 'R$',
    paymentGateway: 'stripe',
    allowedPaymentMethods: ['credit_card', 'pix', 'boleto'],
    stripeLiveKey: '••••••••••••••••••••••••',
    stripeTestKey: '••••••••••••••••••••••••',
    testMode: false,
  });
  
  // Handle general settings change
  const handleGeneralChange = (field: string, value: any) => {
    setGeneralSettings({
      ...generalSettings,
      [field]: value,
    });
  };
  
  // Handle email settings change
  const handleEmailChange = (field: string, value: any) => {
    setEmailSettings({
      ...emailSettings,
      [field]: value,
    });
  };
  
  // Handle shipping settings change
  const handleShippingChange = (field: string, value: any) => {
    setShippingSettings({
      ...shippingSettings,
      [field]: value,
    });
  };
  
  // Handle payment settings change
  const handlePaymentChange = (field: string, value: any) => {
    setPaymentSettings({
      ...paymentSettings,
      [field]: value,
    });
  };
  
  // Save settings
  const saveSettings = () => {
    // In a real app, this would send an API request with the updated settings
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue mb-2">Configurações</h1>
        <p className="text-gray-600">
          Configure os parâmetros gerais da plataforma
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="mb-6">
          <TabsTrigger value="general">
            <Globe className="h-4 w-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" />
            E-mail
          </TabsTrigger>
          <TabsTrigger value="shipping">
            <Truck className="h-4 w-4 mr-2" />
            Envio
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="h-4 w-4 mr-2" />
            Pagamento
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configurações básicas da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome da empresa</Label>
                  <Input
                    id="companyName"
                    value={generalSettings.companyName}
                    onChange={(e) => handleGeneralChange('companyName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">URL do site</Label>
                  <Input
                    id="siteUrl"
                    value={generalSettings.siteUrl}
                    onChange={(e) => handleGeneralChange('siteUrl', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">E-mail de contato</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => handleGeneralChange('contactEmail', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="supportPhone">Telefone de suporte</Label>
                  <Input
                    id="supportPhone"
                    value={generalSettings.supportPhone}
                    onChange={(e) => handleGeneralChange('supportPhone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso horário</Label>
                  <Select
                    value={generalSettings.timezone}
                    onValueChange={(value) => handleGeneralChange('timezone', value)}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Selecione o fuso horário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">América/São Paulo (GMT-3)</SelectItem>
                      <SelectItem value="America/Manaus">América/Manaus (GMT-4)</SelectItem>
                      <SelectItem value="America/Belem">América/Belém (GMT-3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-4">
                <Switch
                  id="maintenanceMode"
                  checked={generalSettings.maintenanceMode}
                  onCheckedChange={(checked) => handleGeneralChange('maintenanceMode', checked)}
                />
                <Label htmlFor="maintenanceMode" className="font-medium">
                  Ativar modo de manutenção
                </Label>
              </div>
              
              {generalSettings.maintenanceMode && (
                <div className="rounded-md bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
                  <strong>Atenção:</strong> O modo de manutenção bloqueia o acesso de usuários comuns ao site. Apenas administradores poderão fazer login.
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t border-gray-100 pt-4">
              <Button onClick={saveSettings}>
                Salvar configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de E-mail</CardTitle>
              <CardDescription>
                Configure os parâmetros para envio de e-mails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">E-mail de envio</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) => handleEmailChange('fromEmail', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="replyTo">Responder para</Label>
                  <Input
                    id="replyTo"
                    type="email"
                    value={emailSettings.replyTo}
                    onChange={(e) => handleEmailChange('replyTo', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailProvider">Provedor de e-mail</Label>
                  <Select
                    value={emailSettings.emailProvider}
                    onValueChange={(value) => handleEmailChange('emailProvider', value)}
                  >
                    <SelectTrigger id="emailProvider">
                      <SelectValue placeholder="Selecione o provedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ses">Amazon SES</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                      <SelectItem value="smtp">SMTP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emailFooter">Rodapé dos e-mails</Label>
                <Textarea
                  id="emailFooter"
                  value={emailSettings.emailFooter}
                  onChange={(e) => handleEmailChange('emailFooter', e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-medium">Notificações por e-mail</h3>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sendWelcomeEmail"
                    checked={emailSettings.sendWelcomeEmail}
                    onCheckedChange={(checked) => handleEmailChange('sendWelcomeEmail', checked)}
                  />
                  <Label htmlFor="sendWelcomeEmail">
                    Enviar e-mail de boas-vindas para novos usuários
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sendOrderConfirmation"
                    checked={emailSettings.sendOrderConfirmation}
                    onCheckedChange={(checked) => handleEmailChange('sendOrderConfirmation', checked)}
                  />
                  <Label htmlFor="sendOrderConfirmation">
                    Enviar confirmação de assinatura/pedido
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sendShippingNotification"
                    checked={emailSettings.sendShippingNotification}
                    onCheckedChange={(checked) => handleEmailChange('sendShippingNotification', checked)}
                  />
                  <Label htmlFor="sendShippingNotification">
                    Enviar notificação de envio com código de rastreio
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-100 pt-4">
              <Button onClick={saveSettings}>
                Salvar configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Shipping Settings */}
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Envio</CardTitle>
              <CardDescription>
                Configure os parâmetros para envio de medicamentos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultShippingMethod">Método de envio padrão</Label>
                  <Select
                    value={shippingSettings.defaultShippingMethod}
                    onValueChange={(value) => handleShippingChange('defaultShippingMethod', value)}
                  >
                    <SelectTrigger id="defaultShippingMethod">
                      <SelectValue placeholder="Selecione o método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="correios">Correios</SelectItem>
                      <SelectItem value="jadlog">Jadlog</SelectItem>
                      <SelectItem value="loggi">Loggi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shippingTimeMinimum">Prazo mínimo (dias)</Label>
                    <Input
                      id="shippingTimeMinimum"
                      type="number"
                      min="1"
                      value={shippingSettings.shippingTimeMinimum}
                      onChange={(e) => handleShippingChange('shippingTimeMinimum', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shippingTimeMaximum">Prazo máximo (dias)</Label>
                    <Input
                      id="shippingTimeMaximum"
                      type="number"
                      min="1"
                      value={shippingSettings.shippingTimeMaximum}
                      onChange={(e) => handleShippingChange('shippingTimeMaximum', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="trackingUrl">URL de rastreamento</Label>
                  <Input
                    id="trackingUrl"
                    value={shippingSettings.trackingUrl}
                    onChange={(e) => handleShippingChange('trackingUrl', e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Use {'{tracking_code}'} como placeholder para o código de rastreio.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shippingLabel">Nome na etiqueta de envio</Label>
                  <Input
                    id="shippingLabel"
                    value={shippingSettings.shippingLabel}
                    onChange={(e) => handleShippingChange('shippingLabel', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-4">
                <Switch
                  id="discreteShipping"
                  checked={shippingSettings.discreteShipping}
                  onCheckedChange={(checked) => handleShippingChange('discreteShipping', checked)}
                />
                <Label htmlFor="discreteShipping" className="font-medium">
                  Ativar envio discreto
                </Label>
              </div>
              
              {shippingSettings.discreteShipping && (
                <div className="rounded-md bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700">
                  <p>
                    <ShieldCheck size={16} className="inline-block mr-1" />
                    <strong>Envio discreto ativado:</strong> Os pacotes não terão nenhuma identificação do conteúdo ou da finalidade dos medicamentos.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t border-gray-100 pt-4">
              <Button onClick={saveSettings}>
                Salvar configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Payment Settings */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Pagamento</CardTitle>
              <CardDescription>
                Configure os parâmetros para processamento de pagamentos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Moeda</Label>
                  <Select
                    value={paymentSettings.currency}
                    onValueChange={(value) => handlePaymentChange('currency', value)}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Selecione a moeda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRL">Real Brasileiro (BRL)</SelectItem>
                      <SelectItem value="USD">Dólar Americano (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currencySymbol">Símbolo da moeda</Label>
                  <Input
                    id="currencySymbol"
                    value={paymentSettings.currencySymbol}
                    onChange={(e) => handlePaymentChange('currencySymbol', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paymentGateway">Gateway de pagamento</Label>
                  <Select
                    value={paymentSettings.paymentGateway}
                    onValueChange={(value) => handlePaymentChange('paymentGateway', value)}
                  >
                    <SelectTrigger id="paymentGateway">
                      <SelectValue placeholder="Selecione o gateway" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="pagseguro">PagSeguro</SelectItem>
                      <SelectItem value="mercadopago">MercadoPago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stripeLiveKey">Chave de produção</Label>
                  <Input
                    id="stripeLiveKey"
                    type="password"
                    value={paymentSettings.stripeLiveKey}
                    onChange={(e) => handlePaymentChange('stripeLiveKey', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stripeTestKey">Chave de teste</Label>
                  <Input
                    id="stripeTestKey"
                    type="password"
                    value={paymentSettings.stripeTestKey}
                    onChange={(e) => handlePaymentChange('stripeTestKey', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-medium">Métodos de pagamento aceitos</h3>
                
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="paymentMethod-credit_card"
                      checked={paymentSettings.allowedPaymentMethods.includes('credit_card')}
                      onCheckedChange={(checked) => {
                        const methods = checked 
                          ? [...paymentSettings.allowedPaymentMethods, 'credit_card'] 
                          : paymentSettings.allowedPaymentMethods.filter(m => m !== 'credit_card');
                        handlePaymentChange('allowedPaymentMethods', methods);
                      }}
                    />
                    <Label htmlFor="paymentMethod-credit_card">
                      Cartão de Crédito
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="paymentMethod-pix"
                      checked={paymentSettings.allowedPaymentMethods.includes('pix')}
                      onCheckedChange={(checked) => {
                        const methods = checked 
                          ? [...paymentSettings.allowedPaymentMethods, 'pix'] 
                          : paymentSettings.allowedPaymentMethods.filter(m => m !== 'pix');
                        handlePaymentChange('allowedPaymentMethods', methods);
                      }}
                    />
                    <Label htmlFor="paymentMethod-pix">
                      PIX
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="paymentMethod-boleto"
                      checked={paymentSettings.allowedPaymentMethods.includes('boleto')}
                      onCheckedChange={(checked) => {
                        const methods = checked 
                          ? [...paymentSettings.allowedPaymentMethods, 'boleto'] 
                          : paymentSettings.allowedPaymentMethods.filter(m => m !== 'boleto');
                        handlePaymentChange('allowedPaymentMethods', methods);
                      }}
                    />
                    <Label htmlFor="paymentMethod-boleto">
                      Boleto
                    </Label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-4">
                <Switch
                  id="testMode"
                  checked={paymentSettings.testMode}
                  onCheckedChange={(checked) => handlePaymentChange('testMode', checked)}
                />
                <Label htmlFor="testMode" className="font-medium">
                  Ativar modo de teste
                </Label>
              </div>
              
              {paymentSettings.testMode && (
                <div className="rounded-md bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
                  <strong>Atenção:</strong> O modo de teste está ativado. Nenhum pagamento real será processado.
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t border-gray-100 pt-4">
              <Button onClick={saveSettings}>
                Salvar configurações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
