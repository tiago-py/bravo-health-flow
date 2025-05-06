
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft, Save } from 'lucide-react';

const AdminAnamneseEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const saveAnamnese = () => {
    // Validation
    if (!title.trim()) {
      toast.error('Por favor, insira um título para a anamnese');
      return;
    }
    
    if (!description.trim()) {
      toast.error('Por favor, insira uma descrição para a anamnese');
      return;
    }
    
    // Save logic would go here
    toast.success('Anamnese salva com sucesso!');
    navigate('/admin/dashboard');
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-bravo-blue mb-2">
            Editar Anamnese
          </h1>
          <p className="text-gray-600">
            Esta página está em construção. Voltaremos em breve com uma nova versão.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={saveAnamnese}>
            <Save size={16} className="mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Informações da Anamnese</CardTitle>
            <CardDescription>
              Atualize as informações gerais do formulário de anamnese.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Título da Anamnese"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descrição da Anamnese"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
          <ArrowLeft size={16} className="mr-2" />
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default AdminAnamneseEdit;
