
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Download, FileText } from 'lucide-react';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  birthdate: string;
}

interface AddressInfo {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
}

interface PasswordInfo {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Prescription {
  id: number;
  name: string;
  date: string;
  pdfUrl: string;
}

const ClientProfile = () => {
  const { user } = useAuth();
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(11) 98765-4321',
    birthdate: '1990-05-15',
  });
  
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    street: 'Rua Exemplo',
    number: '123',
    complement: 'Apto 45',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipcode: '01234-567',
  });
  
  const [passwordInfo, setPasswordInfo] = useState<PasswordInfo>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const prescriptions: Prescription[] = [
    {
      id: 1,
      name: 'Dutasterida 0.5 mg',
      date: '28 maio 2025',
      pdfUrl: '#'
    },
    {
      id: 2,
      name: 'Minoxidil 2.5mg',
      date: '28 maio 2025',
      pdfUrl: '#'
    },
    {
      id: 3,
      name: 'Dutasterida 0.5 mg',
      date: '27 fevereiro 2025',
      pdfUrl: '#'
    },
    {
      id: 4,
      name: 'Minoxidil 2.5mg',
      date: '27 fevereiro 2025',
      pdfUrl: '#'
    }
  ];
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleAddressInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handlePasswordInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const savePersonalInfo = () => {
    toast.success('Informações pessoais salvas com sucesso!');
  };
  
  const saveAddressInfo = () => {
    toast.success('Endereço salvo com sucesso!');
  };
  
  const changePassword = () => {
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      toast.error('As senhas não conferem.');
      return;
    }
    
    if (passwordInfo.newPassword.length < 6) {
      toast.error('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    toast.success('Senha alterada com sucesso!');
    
    setPasswordInfo({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleDownload = (prescriptionName: string) => {
    toast.success('Baixando prescrição...', {
      description: `Baixando ${prescriptionName}`,
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

        <TabsContent value="prescriptions">
          <Card>
            <CardHeader>
              <CardTitle>Minhas Prescrições</CardTitle>
              <CardDescription>
                Baixe seus documentos no seu celular ou computador como PDF
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ Lembre-se de que esses documentos podem conter informações pessoais.
                </p>
              </div>

              <div className="space-y-3">
                {prescriptions.map((prescription) => (
                  <div 
                    key={prescription.id} 
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <FileText size={20} className="text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Prescrição</h4>
                        <p className="text-sm font-medium text-gray-700">{prescription.name}</p>
                        <p className="text-xs text-gray-500">{prescription.date}</p>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(prescription.name)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Download size={16} />
                    </Button>
                  </div>
                ))}
              </div>

              {prescriptions.length === 0 && (
                <div className="text-center py-8">
                  <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Nenhuma prescrição encontrada.</p>
                  <p className="text-sm text-gray-400">Suas prescrições aparecerão aqui quando disponíveis.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
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
