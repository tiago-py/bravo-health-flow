
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
import { Clock, Globe, ShieldCheck, Loader2, Eye, EyeOff } from 'lucide-react';

interface Settings {
  general: {
    companyName: string;
    siteUrl: string;
    contactEmail: string;
    supportPhone: string;
    timezone: string;
    maintenanceMode: boolean;
  };
  security: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    email: string;
    twoFactorEnabled: boolean;
    sessionTimeout: number;
  };
}

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    general: {
      companyName: '',
      siteUrl: '',
      contactEmail: '',
      supportPhone: '',
      timezone: 'America/Sao_Paulo',
      maintenanceMode: false,
    },
    security: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      email: '',
      twoFactorEnabled: false,
      sessionTimeout: 30,
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

  // Change password
  const changePassword = async () => {
    if (settings.security.newPassword !== settings.security.confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (settings.security.newPassword.length < 8) {
      toast.error('A nova senha deve ter pelo menos 8 caracteres');
      return;
    }

    try {
      setSaving(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          currentPassword: settings.security.currentPassword,
          newPassword: settings.security.newPassword
        })
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      toast.success('Senha alterada com sucesso!');
      // Clear password fields
      setSettings(prev => ({
        ...prev,
        security: {
          ...prev.security,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
      }));
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Erro ao alterar senha');
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
        
        {/* Security Settings */}
        <TabsContent value="security">
          <div className="space-y-6">
            {/* Change Email */}
            <Card>
              <CardHeader>
                <CardTitle>Alterar E-mail</CardTitle>
                <CardDescription>
                  Atualize o e-mail da conta de administrador
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Novo e-mail</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.security.email}
                    onChange={(e) => handleSettingsChange('security', 'email', e.target.value)}
                    placeholder="admin@exemplo.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle>Alterar Senha</CardTitle>
                <CardDescription>
                  Atualize a senha da conta de administrador
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Senha atual</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={settings.security.currentPassword}
                      onChange={(e) => handleSettingsChange('security', 'currentPassword', e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova senha</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={settings.security.newPassword}
                      onChange={(e) => handleSettingsChange('security', 'newPassword', e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={settings.security.confirmPassword}
                      onChange={(e) => handleSettingsChange('security', 'confirmPassword', e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <Button 
                  onClick={changePassword}
                  disabled={saving || !settings.security.currentPassword || !settings.security.newPassword || !settings.security.confirmPassword}
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Alterando...
                    </>
                  ) : 'Alterar Senha'}
                </Button>
              </CardContent>
            </Card>

            {/* Security Options */}
            <Card>
              <CardHeader>
                <CardTitle>Opções de Segurança</CardTitle>
                <CardDescription>
                  Configure as opções de segurança da conta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="twoFactorEnabled"
                    checked={settings.security.twoFactorEnabled}
                    onCheckedChange={(checked) => handleSettingsChange('security', 'twoFactorEnabled', checked)}
                  />
                  <Label htmlFor="twoFactorEnabled" className="font-medium">
                    Ativar autenticação de dois fatores
                  </Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Timeout da sessão (minutos)</Label>
                  <Select
                    value={settings.security.sessionTimeout.toString()}
                    onValueChange={(value) => handleSettingsChange('security', 'sessionTimeout', parseInt(value))}
                  >
                    <SelectTrigger id="sessionTimeout">
                      <SelectValue placeholder="Selecione o timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="120">2 horas</SelectItem>
                      <SelectItem value="480">8 horas</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    Tempo de inatividade antes do logout automático
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
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
