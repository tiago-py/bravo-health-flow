
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DoctorProfile = () => {
  const { user } = useAuth();
  
  const [profileInfo, setProfileInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    crm: 'CRM/SP 123456',
    specialty: 'Dermatologia',
    phone: '(11) 98765-4321',
  });
  
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const handleProfileInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: e.target.value,
    });
  };
  
  const handlePasswordInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInfo({
      ...passwordInfo,
      [e.target.name]: e.target.value,
    });
  };
  
  const saveProfileInfo = () => {
    // In a real app, this would send an API request
    toast.success('Informações profissionais salvas com sucesso!');
  };
  
  const changePassword = () => {
    // Validate passwords
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      toast.error('As senhas não conferem.');
      return;
    }
    
    if (passwordInfo.newPassword.length < 6) {
      toast.error('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    // In a real app, this would send an API request
    toast.success('Senha alterada com sucesso!');
    
    // Clear password fields
    setPasswordInfo({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue mb-2">Meu Perfil</h1>
        <p className="text-gray-600">
          Gerencie suas informações profissionais
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Informações Profissionais</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>
        
        {/* Professional Information */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informações Profissionais</CardTitle>
              <CardDescription>
                Atualize seus dados pessoais e profissionais
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileInfo.name}
                    onChange={handleProfileInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileInfo.email}
                    onChange={handleProfileInfoChange}
                    disabled
                  />
                  <p className="text-xs text-gray-500">
                    O e-mail não pode ser alterado.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="crm">CRM</Label>
                  <Input
                    id="crm"
                    name="crm"
                    value={profileInfo.crm}
                    onChange={handleProfileInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialty">Especialidade</Label>
                  <Input
                    id="specialty"
                    name="specialty"
                    value={profileInfo.specialty}
                    onChange={handleProfileInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileInfo.phone}
                    onChange={handleProfileInfoChange}
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t border-gray-100 pt-4">
              <Button onClick={saveProfileInfo}>
                Salvar alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>
                Altere sua senha de acesso
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha atual</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordInfo.currentPassword}
                  onChange={handlePasswordInfoChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova senha</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordInfo.newPassword}
                    onChange={handlePasswordInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirme a nova senha</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordInfo.confirmPassword}
                    onChange={handlePasswordInfoChange}
                  />
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">
                  A senha deve ter pelo menos 6 caracteres.
                </p>
              </div>
            </CardContent>
            
            <CardFooter className="border-t border-gray-100 pt-4">
              <Button onClick={changePassword}>
                Alterar senha
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorProfile;
