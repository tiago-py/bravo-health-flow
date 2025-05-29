
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ImageUploadField } from '@/components/anamnese/ImageUploadField';
import { Download, Calendar, Camera, FileText, Trash2, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ClientPrescriptions = () => {
  const [photos, setPhotos] = useState([
    {
      id: 1,
      url: '/lovable-uploads/0087efeb-bff4-47e0-98e8-86830938bb11.png',
      date: '2023-03-01',
      description: 'Início do tratamento'
    },
    {
      id: 2,
      url: '/lovable-uploads/05ed9e82-9a9f-43ca-8a66-f2c99955f746.png',
      date: '2023-03-15',
      description: '2 semanas de tratamento'
    }
  ]);

  const [newPhoto, setNewPhoto] = useState({
    url: '',
    description: '',
    size: 'medium' as 'small' | 'medium' | 'large'
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

  const handleAddPhoto = () => {
    if (newPhoto.url && newPhoto.description) {
      const photo = {
        id: Date.now(),
        url: newPhoto.url,
        date: new Date().toISOString().split('T')[0],
        description: newPhoto.description
      };
      setPhotos([...photos, photo]);
      setNewPhoto({ url: '', description: '', size: 'medium' });
      toast({
        title: 'Foto adicionada com sucesso!',
        description: 'Sua evolução foi registrada.',
      });
    }
  };

  const handleRemovePhoto = (id: number) => {
    setPhotos(photos.filter(photo => photo.id !== id));
    toast({
      title: 'Foto removida',
      description: 'A foto foi removida do seu histórico.',
    });
  };

  const handleDownload = () => {
    toast({
      title: 'Baixando prescrição...',
      description: 'O arquivo será baixado em instantes.',
    });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-bravo-blue mb-2">Acompanhamento do Tratamento</h1>
            <p className="text-gray-600">
              Registre sua evolução com fotos e acompanhe seu progresso
            </p>
          </div>
          
          {/* Prescrição Button - Less Visible */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                <FileText size={14} className="mr-1" />
                Ver prescrição
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Prescrição Atual</DialogTitle>
                <DialogDescription>
                  {currentPrescription.doctorName} • {new Date(currentPrescription.date).toLocaleDateString('pt-BR')}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1 text-gray-500" />
                    <span className="text-gray-500">
                      Válida até {new Date(currentPrescription.expiry).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <Badge variant="secondary">Ativa</Badge>
                </div>
                
                <div>
                  <h3 className="font-medium text-bravo-blue mb-4">Medicamentos e Orientações</h3>
                  <div className="space-y-4">
                    {currentPrescription.products.map((product, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{product.name}</h4>
                        <p className="text-sm text-gray-700">{product.instructions}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-bravo-beige bg-opacity-30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Instruções Gerais</h4>
                  <p className="text-sm text-gray-700">{currentPrescription.generalInstructions}</p>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" onClick={handleDownload}>
                    <Download size={16} className="mr-2" />
                    Baixar PDF
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add New Photo Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus size={20} className="mr-2" />
              Adicionar Nova Foto
            </CardTitle>
            <CardDescription>
              Registre sua evolução enviando uma nova foto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ImageUploadField
              imageUrl={newPhoto.url}
              imageSize={newPhoto.size}
              onImageChange={(url) => setNewPhoto(prev => ({ ...prev, url: url || '' }))}
              onImageSizeChange={(size) => setNewPhoto(prev => ({ ...prev, size }))}
            />
            
            <div>
              <label className="block text-sm font-medium mb-2">Descrição</label>
              <input
                type="text"
                placeholder="Ex: 3 meses de tratamento, região frontal..."
                value={newPhoto.description}
                onChange={(e) => setNewPhoto(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bravo-blue focus:border-transparent"
              />
            </div>
            
            <Button 
              onClick={handleAddPhoto} 
              disabled={!newPhoto.url || !newPhoto.description}
              className="w-full"
            >
              <Camera size={16} className="mr-2" />
              Adicionar Foto
            </Button>
          </CardContent>
        </Card>

        {/* Progress Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo do Progresso</CardTitle>
            <CardDescription>
              Estatísticas do seu tratamento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{photos.length}</div>
                <div className="text-sm text-green-600">Fotos registradas</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.floor((Date.now() - new Date('2023-03-01').getTime()) / (1000 * 60 * 60 * 24))}
                </div>
                <div className="text-sm text-blue-600">Dias de tratamento</div>
              </div>
            </div>
            
            <div className="bg-bravo-beige bg-opacity-30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Próxima consulta</h4>
              <p className="text-sm text-gray-700">
                Agendada para {new Date('2023-04-15').toLocaleDateString('pt-BR')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Photos Gallery */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Histórico de Evolução</CardTitle>
          <CardDescription>
            Suas fotos de acompanhamento organizadas por data
          </CardDescription>
        </CardHeader>
        <CardContent>
          {photos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <img 
                      src={photo.url} 
                      alt={photo.description}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium">{photo.description}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemovePhoto(photo.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(photo.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Camera size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Nenhuma foto registrada ainda.</p>
              <p className="text-sm text-gray-400">Adicione sua primeira foto para começar o acompanhamento.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientPrescriptions;
