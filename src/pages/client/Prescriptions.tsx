import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Calendar } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
const ClientPrescriptions = () => {
  const [activeTab, setActiveTab] = useState('current');

  // Mock prescription data
  const currentPrescriptions = [{
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
  }];
  const pastPrescriptions = [{
    id: 2,
    doctorName: 'Dr. Bruno Silva',
    date: '2022-09-10',
    expiry: '2023-03-10',
    products: [{
      name: 'Minoxidil 2%',
      instructions: 'Aplicar 1ml na região afetada, duas vezes ao dia (manhã e noite)'
    }, {
      name: 'Finasterida 1mg',
      instructions: 'Tomar 1 comprimido por dia, sempre no mesmo horário'
    }],
    generalInstructions: 'Este é o seu tratamento inicial. Após 3 meses, faremos uma reavaliação para ajustar a dosagem conforme necessário.',
    pdfUrl: '#'
  }];
  const handleDownload = (id: number) => {
    // In a real app, this would download the PDF
    toast.success('Baixando prescrição...');
  };
  return <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bravo-blue mb-2">Meus Tratamentos</h1>
        <p className="text-gray-600">
          Veja suas prescrições atuais e anteriores
        </p>
      </div>
      
      <Tabs defaultValue="current" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="current">Prescrição Atual</TabsTrigger>
          <TabsTrigger value="past">Prescrições Anteriores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          {currentPrescriptions.length > 0 ? <div className="space-y-6">
              {currentPrescriptions.map(prescription => <Card key={prescription.id}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <CardTitle>Prescrição Atual</CardTitle>
                        <CardDescription>
                          {prescription.doctorName} • {new Date(prescription.date).toLocaleDateString('pt-BR')}
                        </CardDescription>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center text-sm">
                        <Calendar size={16} className="mr-1 text-gray-500" />
                        <span className="text-gray-500">
                          Válida até {new Date(prescription.expiry).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <h3 className="font-medium text-bravo-blue mb-4">Medicamentos e Orientações</h3>
                    
                    <div className="space-y-4 mb-6">
                      {prescription.products.map((product, index) => <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">{product.name}</h4>
                          <p className="text-sm text-gray-700">{product.instructions}</p>
                        </div>)}
                    </div>
                    
                    <div className="bg-bravo-beige bg-opacity-30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Instruções Gerais</h4>
                      <p className="text-sm text-gray-700">{prescription.generalInstructions}</p>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t border-gray-100 pt-4">
                    <Button variant="outline" className="ml-auto" onClick={() => handleDownload(prescription.id)}>
                      <Download size={16} className="mr-2" />
                      Baixar PDF
                    </Button>
                  </CardFooter>
                </Card>)}
            </div> : <div className="text-center py-8">
              <p className="text-gray-500">Você não possui nenhuma prescrição ativa no momento.</p>
            </div>}
        </TabsContent>
        
        <TabsContent value="past">
          {pastPrescriptions.length > 0 ? <div className="space-y-6">
              {pastPrescriptions.map(prescription => <Card key={prescription.id} className="opacity-90">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <CardTitle>Prescrição Anterior</CardTitle>
                        <CardDescription>
                          {prescription.doctorName} • {new Date(prescription.date).toLocaleDateString('pt-BR')}
                        </CardDescription>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center text-sm">
                        <Calendar size={16} className="mr-1 text-gray-500" />
                        <span className="text-gray-500">
                          Expirou em {new Date(prescription.expiry).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <h3 className="font-medium text-bravo-blue mb-4">Medicamentos e Orientações</h3>
                    
                    <div className="space-y-4 mb-6">
                      {prescription.products.map((product, index) => <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">{product.name}</h4>
                          <p className="text-sm text-gray-700">{product.instructions}</p>
                        </div>)}
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Instruções Gerais</h4>
                      <p className="text-sm text-gray-700">{prescription.generalInstructions}</p>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t border-gray-100 pt-4">
                    <Button variant="outline" className="ml-auto" onClick={() => handleDownload(prescription.id)}>
                      <Download size={16} className="mr-2" />
                      Baixar PDF
                    </Button>
                  </CardFooter>
                </Card>)}
            </div> : <div className="text-center py-8">
              <p className="text-gray-500">Você não possui prescrições anteriores.</p>
            </div>}
        </TabsContent>
      </Tabs>
    </div>;
};
export default ClientPrescriptions;