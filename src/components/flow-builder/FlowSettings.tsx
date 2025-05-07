
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Tag } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface FlowSettingsProps {
  flow: {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    tags: string[];
  };
  setFlow: (flow: any) => void;
}

const FlowSettings = ({ flow, setFlow }: FlowSettingsProps) => {
  const [newTag, setNewTag] = useState('');
  
  const handleAddTag = () => {
    if (!newTag.trim()) {
      toast.error('Por favor, digite uma tag válida.');
      return;
    }
    
    if (flow.tags.includes(newTag.trim())) {
      toast.error('Esta tag já existe.');
      return;
    }
    
    const updatedTags = [...flow.tags, newTag.trim()];
    setFlow({
      ...flow,
      tags: updatedTags
    });
    setNewTag('');
    toast.success('Tag adicionada com sucesso!');
  };
  
  const handleRemoveTag = (tag: string) => {
    const updatedTags = flow.tags.filter(t => t !== tag);
    setFlow({
      ...flow,
      tags: updatedTags
    });
    toast.success('Tag removida com sucesso!');
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Fluxo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Fluxo</Label>
            <Input
              id="name"
              value={flow.name}
              onChange={(e) => setFlow({ ...flow, name: e.target.value })}
              placeholder="Ex: Queda Capilar"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={flow.description}
              onChange={(e) => setFlow({ ...flow, description: e.target.value })}
              placeholder="Descreva o propósito deste fluxo"
              rows={3}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={flow.isActive}
              onCheckedChange={(checked) => setFlow({ ...flow, isActive: checked })}
            />
            <Label htmlFor="active">Fluxo Ativo</Label>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Tag className="mr-2 h-5 w-5" />
            Gerenciamento de TAGs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Tags são usadas para conectar perguntas, diagnósticos e planos. Adicione as tags relevantes para este fluxo.
          </p>
          
          <div className="flex space-x-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Nova tag"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button onClick={handleAddTag}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-medium mb-2">Tags Disponíveis ({flow.tags.length})</h4>
            <ScrollArea className="h-[220px] rounded-md border">
              <div className="p-4">
                {flow.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {flow.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="pl-3 pr-2 py-1.5 flex items-center">
                        {tag}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-gray-200 ml-1"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-8">
                    Nenhuma tag disponível. Adicione tags para usar em perguntas, diagnósticos e planos.
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm">
            <h5 className="font-medium text-amber-800 mb-1">Como usar TAGs</h5>
            <ul className="list-disc list-inside space-y-1 text-amber-700">
              <li>Atribua TAGs às respostas das perguntas</li>
              <li>Use TAGs como condição para mostrar diagnósticos</li>
              <li>Conecte planos recomendados com TAGs específicas</li>
              <li>Define prioridades usando lógica E/OU nas regras</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlowSettings;
