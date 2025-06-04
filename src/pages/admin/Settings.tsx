
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { Globe, ShieldCheck } from 'lucide-react';

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
  
  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    adminEmail: 'admin@bravohomem.com.br',
    requireTwoFactor: false,
    sessionTimeout: '60',
    passwordMinLength: '8',
    requirePasswordComplexity: true,
    allowPasswordReset: true,
    maxLoginAttempts: '5',
    lockoutDuration: '30',
  });
  
  // Handle general settings change
  const handleGeneralChange = (field: string, value: any) => {
    setGeneralSettings({
      ...generalSettings,
      [field]: value,
    });
  };
  
  // Handle security settings change
  const handleSecurityChange = (field: string, value: any) => {
    setSecuritySettings({
      ...securitySettings,
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
          <TabsTrigger value="security">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Segurança
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
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>
                Configure os parâmetros de segurança e autenticação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Configurações de Conta</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail">E-mail do administrador</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        value={securitySettings.adminEmail}
                        onChange={(e) => handleSecurityChange('adminEmail', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Timeout da sessão (minutos)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        min="5"
                        max="480"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="requireTwoFactor"
                      checked={securitySettings.requireTwoFactor}
                      onCheckedChange={(checked) => handleSecurityChange('requireTwoFactor', checked)}
                    />
                    <Label htmlFor="requireTwoFactor">
                      Exigir autenticação de dois fatores
                    </Label>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium">Políticas de Senha</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="passwordMinLength">Comprimento mínimo da senha</Label>
                      <Select
                        value={securitySettings.passwordMinLength}
                        onValueChange={(value) => handleSecurityChange('passwordMinLength', value)}
                      >
                        <SelectTrigger id="passwordMinLength">
                          <SelectValue placeholder="Selecione o comprimento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 caracteres</SelectItem>
                          <SelectItem value="8">8 caracteres</SelectItem>
                          <SelectItem value="10">10 caracteres</SelectItem>
                          <SelectItem value="12">12 caracteres</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="maxLoginAttempts">Máximo de tentativas de login</Label>
                      <Select
                        value={securitySettings.maxLoginAttempts}
                        onValueChange={(value) => handleSecurityChange('maxLoginAttempts', value)}
                      >
                        <SelectTrigger id="maxLoginAttempts">
                          <SelectValue placeholder="Selecione o máximo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 tentativas</SelectItem>
                          <SelectItem value="5">5 tentativas</SelectItem>
                          <SelectItem value="10">10 tentativas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lockoutDuration">Duração do bloqueio (minutos)</Label>
                      <Select
                        value={securitySettings.lockoutDuration}
                        onValueChange={(value) => handleSecurityChange('lockoutDuration', value)}
                      >
                        <SelectTrigger id="lockoutDuration">
                          <SelectValue placeholder="Selecione a duração" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutos</SelectItem>
                          <SelectItem value="30">30 minutos</SelectItem>
                          <SelectItem value="60">60 minutos</SelectItem>
                          <SelectItem value="120">120 minutos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="requirePasswordComplexity"
                        checked={securitySettings.requirePasswordComplexity}
                        onCheckedChange={(checked) => handleSecurityChange('requirePasswordComplexity', checked)}
                      />
                      <Label htmlFor="requirePasswordComplexity">
                        Exigir complexidade de senha (maiúsculas, números e símbolos)
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="allowPasswordReset"
                        checked={securitySettings.allowPasswordReset}
                        onCheckedChange={(checked) => handleSecurityChange('allowPasswordReset', checked)}
                      />
                      <Label htmlFor="allowPasswordReset">
                        Permitir reset de senha por e-mail
                      </Label>
                    </div>
                  </div>
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
      </Tabs>
    </div>
  );
};

export default AdminSettings;
