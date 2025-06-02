import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Download, Calendar, FileText } from 'lucide-react';

const ClientProfile = () => {
  const { user } = useAuth();
  
  // Personal information state
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(11) 98765-4321',
    birthdate: '1990-05-15',
  });
  
  // Address information state
  const [addressInfo, setAddressInfo] = useState({
    street: 'Rua Exemplo',
    number: '123',
    complement: 'Apto 45',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipcode: '01234-567',
  });
  
  // Password change state
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Mock prescription data
  const currentPrescription = {
    id: 1,
    doctorName: 'Dr. Bruno Silva',
    date: '2023-03-15',
    expiry: '2023-09-15',
    products: [{
      name: 'Minoxidil 5%',
      instructions: 'Aplicar 1ml na região afetada, duas vezes ao dia (manhã e noite)'
    }, {
      name: 'Finasterida 1mg',
      instructions: 'Tomar 1 comprimido por dia, sempre no mesmo horário'
    }, {
      name: 'Complexo Vitamínico Capilar',
      instructions: 'Tomar 1 cápsula por dia, preferencialmente com o almoço'
    }],
    generalInstructions: 'Mantenha o uso contínuo para melhores resultados. Evite interromper o tratamento sem consulta médica. Em caso de efeitos adversos, entre em contato imediatamente.',
    pdfUrl: '#'
  };
  
  // Handle personal info change
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };
  
  // Handle address info change
  const handleAddressInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInfo({
      ...addressInfo,
      [e.target.name]: e.target.value,
    });
  };
  
  // Handle password change
  const handlePasswordInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInfo({
      ...passwordInfo,
      [e.target.name]: e.target.value,
    });
  };
  
  // Save personal information
  const savePersonalInfo = () => {
    // In a real app, this would send an API request
    toast.success('Informações pessoais salvas com sucesso!');
  };
  
  // Save address information
  const saveAddressInfo = () => {
    // In a real app, this would send an API request
    toast.success('Endereço salvo com sucesso!');
  };
  
  // Change password
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

  const handleDownload = () => {
    toast.success('Baixando prescrição...', {
      description: 'O arquivo será baixado em instantes.',
    });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue mb-2">Meu Perfil</h1>
        <p className="text-gray-600">
          Gerencie suas informações pessoais e endereço de entrega
        </p>
      </div>
      
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
          <TabsTrigger value="address">Endereço de Entrega</TabsTrigger>
          <TabsTrigger value="prescriptions">Minhas Prescrições</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>
        
        {/* Personal Information */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>
                Atualize seus dados pessoais
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={personalInfo.name}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    disabled
                  />
                  <p className="text-xs text-gray-500">
                    O e-mail não pode ser alterado.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Data de nascimento</Label>
                  <Input
                    id="birthdate"
                    name="birthdate"
                    type="date"
                    value={personalInfo.birthdate}
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t border-gray-100 pt-4">
              <Button onClick={savePersonalInfo}>
                Salvar alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Address Information */}
        <TabsContent value="address">
          <Card>
            <CardHeader>
              <CardTitle>Endereço de Entrega</CardTitle>
              <CardDescription>
                Atualize seu endereço para entrega dos medicamentos
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="space-y-2 md:col-span-4">
                  <Label htmlFor="street">Rua/Avenida</Label>
                  <Input
                    id="street"
                    name="street"
                    value={addressInfo.street}
                    onChange={handleAddressInfoChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    name="number"
                    value={addressInfo.number}
                    onChange={handleAddressInfoChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-3">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    name="complement"
                    value={addressInfo.complement}
                    onChange={handleAddressInfoChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-3">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    name="neighborhood"
                    value={addressInfo.neighborhood}
                    onChange={handleAddressInfoChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="zipcode">CEP</Label>
                  <Input
                    id="zipcode"
                    name="zipcode"
                    value={addressInfo.zipcode}
                    onChange={handleAddressInfoChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-3">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    name="city"
                    value={addressInfo.city}
                    onChange={handleAddressInfoChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    name="state"
                    value={addressInfo.state}
                    onChange={handleAddressInfoChange}
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t border-gray-100 pt-4">
              <Button onClick={saveAddressInfo}>
                Salvar endereço
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Prescriptions */}
        <TabsContent value="prescriptions">
          <Card>
            <CardHeader>
              <CardTitle>Minhas Prescrições</CardTitle>
              <CardDescription>
                Visualize e baixe suas prescrições médicas
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <Card className="border-l-4 border-l-bravo-blue">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Prescrição Atual</CardTitle>
                        <CardDescription>
                          {currentPrescription.doctorName} • {new Date(currentPrescription.date).toLocaleDateString('pt-BR')}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">Ativa</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1 text-gray-500" />
                          <span className="text-gray-500">
                            Válida até {new Date(currentPrescription.expiry).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-bravo-blue mb-3">Medicamentos Prescritos</h4>
                        <div className="space-y-3">
                          {currentPrescription.products.map((product, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg">
                              <h5 className="font-medium mb-1">{product.name}</h5>
                              <p className="text-sm text-gray-700">{product.instructions}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-bravo-beige bg-opacity-30 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Instruções Gerais</h4>
                        <p className="text-sm text-gray-700">{currentPrescription.generalInstructions}</p>
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <Button variant="outline" onClick={handleDownload}>
                          <Download size={16} className="mr-2" />
                          Baixar PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
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

export default ClientProfile;
