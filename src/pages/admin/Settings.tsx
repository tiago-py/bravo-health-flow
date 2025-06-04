import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { Clock, Mail, Phone, Globe, CreditCard, Users, Truck, ShieldCheck, Loader2 } from 'lucide-react';

interface Settings {
  general: {
    companyName: string;
    siteUrl: string;
    contactEmail: string;
    supportPhone: string;
    timezone: string;
    maintenanceMode: boolean;
  };
  email: {
    fromEmail: string;
    replyTo: string;
    emailProvider: string;
    emailFooter: string;
    sendWelcomeEmail: boolean;
    sendOrderConfirmation: boolean;
    sendShippingNotification: boolean;
  };
  shipping: {
    defaultShippingMethod: string;
    shippingTimeMinimum: string;
    shippingTimeMaximum: string;
    trackingUrl: string;
    discreteShipping: boolean;
    shippingLabel: string;
  };
  payment: {
    currency: string;
    currencySymbol: string;
    paymentGateway: string;
    allowedPaymentMethods: string[];
    stripeLiveKey: string;
    stripeTestKey: string;
    testMode: boolean;
  };
}

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<Settings>({
    general: {
      companyName: '',
      siteUrl: '',
      contactEmail: '',
      supportPhone: '',
      timezone: 'America/Sao_Paulo',
      maintenanceMode: false,
    },
    email: {
      fromEmail: '',
      replyTo: '',
      emailProvider: 'ses',
      emailFooter: '',
      sendWelcomeEmail: true,
      sendOrderConfirmation: true,
      sendShippingNotification: true,
    },
    shipping: {
      defaultShippingMethod: 'correios',
      shippingTimeMinimum: '3',
      shippingTimeMaximum: '5',
      trackingUrl: '',
      discreteShipping: true,
      shippingLabel: '',
    },
    payment: {
      currency: 'BRL',
      currencySymbol: 'R$',
      paymentGateway: 'stripe',
      allowedPaymentMethods: ['credit_card', 'pix', 'boleto'],
      stripeLiveKey: '',
      stripeTestKey: '',
      testMode: false,
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const API_BASE_URL = 'http://localhost:3000';

  // Fetch settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/admin/settings`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch settings');
        }

        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Handle settings change
  const handleSettingsChange = (section: keyof Settings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Save all settings
  const saveSettings = async () => {
    try {
      setSaving(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(settings)
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-bravo-blue" />
        <span className="ml-2">Loading settings...</span>
      </div>
    );
  }

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
                    value={settings.general.companyName}
                    onChange={(e) => handleSettingsChange('general', 'companyName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">URL do site</Label>
                  <Input
                    id="siteUrl"
                    value={settings.general.siteUrl}
                    onChange={(e) => handleSettingsChange('general', 'siteUrl', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">E-mail de contato</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.general.contactEmail}
                    onChange={(e) => handleSettingsChange('general', 'contactEmail', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="supportPhone">Telefone de suporte</Label>
                  <Input
                    id="supportPhone"
                    value={settings.general.supportPhone}
                    onChange={(e) => handleSettingsChange('general', 'supportPhone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso horário</Label>
                  <Select
                    value={settings.general.timezone}
                    onValueChange={(value) => handleSettingsChange('general', 'timezone', value)}
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
                  checked={settings.general.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingsChange('general', 'maintenanceMode', checked)}
                />
                <Label htmlFor="maintenanceMode" className="font-medium">
                  Ativar modo de manutenção
                </Label>
              </div>
              
              {settings.general.maintenanceMode && (
                <div className="rounded-md bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
                  <strong>Atenção:</strong> O modo de manutenção bloqueia o acesso de usuários comuns ao site.
                </div>
              )}
            </CardContent>
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
                    value={settings.email.fromEmail}
                    onChange={(e) => handleSettingsChange('email', 'fromEmail', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="replyTo">Responder para</Label>
                  <Input
                    id="replyTo"
                    type="email"
                    value={settings.email.replyTo}
                    onChange={(e) => handleSettingsChange('email', 'replyTo', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailProvider">Provedor de e-mail</Label>
                  <Select
                    value={settings.email.emailProvider}
                    onValueChange={(value) => handleSettingsChange('email', 'emailProvider', value)}
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
                  value={settings.email.emailFooter}
                  onChange={(e) => handleSettingsChange('email', 'emailFooter', e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-medium">Notificações por e-mail</h3>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sendWelcomeEmail"
                    checked={settings.email.sendWelcomeEmail}
                    onCheckedChange={(checked) => handleSettingsChange('email', 'sendWelcomeEmail', checked)}
                  />
                  <Label htmlFor="sendWelcomeEmail">
                    Enviar e-mail de boas-vindas
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sendOrderConfirmation"
                    checked={settings.email.sendOrderConfirmation}
                    onCheckedChange={(checked) => handleSettingsChange('email', 'sendOrderConfirmation', checked)}
                  />
                  <Label htmlFor="sendOrderConfirmation">
                    Enviar confirmação de pedido
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sendShippingNotification"
                    checked={settings.email.sendShippingNotification}
                    onCheckedChange={(checked) => handleSettingsChange('email', 'sendShippingNotification', checked)}
                  />
                  <Label htmlFor="sendShippingNotification">
                    Enviar notificação de envio
                  </Label>
                </div>
              </div>
            </CardContent>
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
                    value={settings.shipping.defaultShippingMethod}
                    onValueChange={(value) => handleSettingsChange('shipping', 'defaultShippingMethod', value)}
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
                      value={settings.shipping.shippingTimeMinimum}
                      onChange={(e) => handleSettingsChange('shipping', 'shippingTimeMinimum', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shippingTimeMaximum">Prazo máximo (dias)</Label>
                    <Input
                      id="shippingTimeMaximum"
                      type="number"
                      min="1"
                      value={settings.shipping.shippingTimeMaximum}
                      onChange={(e) => handleSettingsChange('shipping', 'shippingTimeMaximum', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="trackingUrl">URL de rastreamento</Label>
                  <Input
                    id="trackingUrl"
                    value={settings.shipping.trackingUrl}
                    onChange={(e) => handleSettingsChange('shipping', 'trackingUrl', e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Use {'{tracking_code}'} como placeholder para o código de rastreio.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shippingLabel">Nome na etiqueta de envio</Label>
                  <Input
                    id="shippingLabel"
                    value={settings.shipping.shippingLabel}
                    onChange={(e) => handleSettingsChange('shipping', 'shippingLabel', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-4">
                <Switch
                  id="discreteShipping"
                  checked={settings.shipping.discreteShipping}
                  onCheckedChange={(checked) => handleSettingsChange('shipping', 'discreteShipping', checked)}
                />
                <Label htmlFor="discreteShipping" className="font-medium">
                  Ativar envio discreto
                </Label>
              </div>
            </CardContent>
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
                    value={settings.payment.currency}
                    onValueChange={(value) => handleSettingsChange('payment', 'currency', value)}
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
                    value={settings.payment.currencySymbol}
                    onChange={(e) => handleSettingsChange('payment', 'currencySymbol', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paymentGateway">Gateway de pagamento</Label>
                  <Select
                    value={settings.payment.paymentGateway}
                    onValueChange={(value) => handleSettingsChange('payment', 'paymentGateway', value)}
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
                    value={settings.payment.stripeLiveKey}
                    onChange={(e) => handleSettingsChange('payment', 'stripeLiveKey', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stripeTestKey">Chave de teste</Label>
                  <Input
                    id="stripeTestKey"
                    type="password"
                    value={settings.payment.stripeTestKey}
                    onChange={(e) => handleSettingsChange('payment', 'stripeTestKey', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-medium">Métodos de pagamento aceitos</h3>
                
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="paymentMethod-credit_card"
                      checked={settings.payment.allowedPaymentMethods.includes('credit_card')}
                      onCheckedChange={(checked) => {
                        const methods = checked 
                          ? [...settings.payment.allowedPaymentMethods, 'credit_card'] 
                          : settings.payment.allowedPaymentMethods.filter(m => m !== 'credit_card');
                        handleSettingsChange('payment', 'allowedPaymentMethods', methods);
                      }}
                    />
                    <Label htmlFor="paymentMethod-credit_card">
                      Cartão de Crédito
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="paymentMethod-pix"
                      checked={settings.payment.allowedPaymentMethods.includes('pix')}
                      onCheckedChange={(checked) => {
                        const methods = checked 
                          ? [...settings.payment.allowedPaymentMethods, 'pix'] 
                          : settings.payment.allowedPaymentMethods.filter(m => m !== 'pix');
                        handleSettingsChange('payment', 'allowedPaymentMethods', methods);
                      }}
                    />
                    <Label htmlFor="paymentMethod-pix">
                      PIX
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="paymentMethod-boleto"
                      checked={settings.payment.allowedPaymentMethods.includes('boleto')}
                      onCheckedChange={(checked) => {
                        const methods = checked 
                          ? [...settings.payment.allowedPaymentMethods, 'boleto'] 
                          : settings.payment.allowedPaymentMethods.filter(m => m !== 'boleto');
                        handleSettingsChange('payment', 'allowedPaymentMethods', methods);
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
                  checked={settings.payment.testMode}
                  onCheckedChange={(checked) => handleSettingsChange('payment', 'testMode', checked)}
                />
                <Label htmlFor="testMode" className="font-medium">
                  Ativar modo de teste
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save button fixed at bottom */}
      <div className="fixed bottom-6 right-6">
        <Button 
          onClick={saveSettings}
          disabled={saving}
          className="shadow-lg"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Salvando...
            </>
          ) : 'Salvar todas as configurações'}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;