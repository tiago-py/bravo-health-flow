
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from '@/components/ui/badge';
import { ImageUploadField } from './ImageUploadField';
import { Trash2, Plus, Copy, ArrowUp, ArrowDown, Tag, FileText } from 'lucide-react';

interface DiagnosticRule {
  id: string;
  internalName: string;
  title: string;
  description: string;
  phaseName: string;
  phaseDuration?: string;
  priority: number;
  activationTags: string[];
  tagLogic: 'AND' | 'OR';
  isActive: boolean;
  imageUrl?: string;
}

interface DiagnosticRuleEditorProps {
  rule?: DiagnosticRule;
  onSave: (rule: DiagnosticRule) => void;
  onCancel: () => void;
  availableTags: string[];
}

export function DiagnosticRuleEditor({ rule, onSave, onCancel, availableTags }: DiagnosticRuleEditorProps) {
  const [internalName, setInternalName] = useState(rule?.internalName || '');
  const [title, setTitle] = useState(rule?.title || '');
  const [description, setDescription] = useState(rule?.description || '');
  const [phaseName, setPhaseName] = useState(rule?.phaseName || '');
  const [phaseDuration, setPhaseDuration] = useState(rule?.phaseDuration || '');
  const [priority, setPriority] = useState(rule?.priority || 1);
  const [activationTags, setActivationTags] = useState<string[]>(rule?.activationTags || []);
  const [tagLogic, setTagLogic] = useState<'AND' | 'OR'>(rule?.tagLogic || 'AND');
  const [isActive, setIsActive] = useState(rule?.isActive !== false);
  const [imageUrl, setImageUrl] = useState(rule?.imageUrl || undefined);
  const [newTag, setNewTag] = useState('');

  const handleSave = () => {
    if (!internalName.trim() || !title.trim() || !description.trim() || !phaseName.trim()) {
      return;
    }

    const updatedRule: DiagnosticRule = {
      id: rule?.id || Date.now().toString(),
      internalName,
      title,
      description,
      phaseName,
      phaseDuration: phaseDuration || undefined,
      priority,
      activationTags,
      tagLogic,
      isActive,
      imageUrl
    };

    onSave(updatedRule);
  };

  const addTag = () => {
    if (newTag && !activationTags.includes(newTag)) {
      setActivationTags([...activationTags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setActivationTags(activationTags.filter(t => t !== tag));
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{rule ? 'Editar Regra de Diagnóstico' : 'Nova Regra de Diagnóstico'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Information */}
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="internalName">Nome interno (para referência)</Label>
            <Input
              id="internalName"
              placeholder="Ex: Queda leve, Disfunção por ansiedade"
              value={internalName}
              onChange={(e) => setInternalName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Título exibido ao cliente</Label>
            <Input
              id="title"
              placeholder="Ex: Você apresenta um quadro de queda capilar moderada"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Texto explicativo detalhado</Label>
            <Textarea
              id="description"
              placeholder="Explicação detalhada sobre o diagnóstico e recomendações"
              className="min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Phase Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phaseName">Nome da fase</Label>
            <Input
              id="phaseName"
              placeholder="Ex: Fase 1 - Estabilização"
              value={phaseName}
              onChange={(e) => setPhaseName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phaseDuration">Duração estimada (opcional)</Label>
            <Input
              id="phaseDuration"
              placeholder="Ex: 1 a 3 meses"
              value={phaseDuration}
              onChange={(e) => setPhaseDuration(e.target.value)}
            />
          </div>
        </div>

        {/* Tags and Logic */}
        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Condições de ativação (TAGs)</Label>
            <div className="flex items-center gap-2 mb-2">
              <Select value={tagLogic} onValueChange={(val) => setTagLogic(val as 'AND' | 'OR')}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Lógica" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AND">E (AND)</SelectItem>
                  <SelectItem value="OR">OU (OR)</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-500">
                {tagLogic === 'AND' ? 'Todas as TAGs devem estar presentes' : 'Qualquer uma das TAGs ativa a regra'}
              </span>
            </div>

            <div className="flex gap-2">
              <Select value={newTag} onValueChange={setNewTag}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Selecionar TAG" />
                </SelectTrigger>
                <SelectContent>
                  {availableTags.filter(tag => !activationTags.includes(tag)).map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={addTag}>
                <Plus size={16} className="mr-1" />
                Adicionar
              </Button>
            </div>

            {activationTags.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {activationTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1 py-1 px-2">
                    <Tag size={12} />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-2">
                Nenhuma TAG adicionada. Adicione pelo menos uma TAG para ativar o diagnóstico.
              </p>
            )}
          </div>
        </div>

        {/* Priority and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="priority">Prioridade (menor = maior prioridade)</Label>
            <Input
              id="priority"
              type="number"
              min={1}
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
            />
            <p className="text-xs text-gray-500">
              O sistema verifica as regras por ordem de prioridade e exibe o primeiro diagnóstico compatível.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="isActive" className="block mb-2">Status</Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="isActive" className="cursor-pointer">
                {isActive ? 'Ativo' : 'Inativo'}
              </Label>
            </div>
          </div>
        </div>

        {/* Optional Image */}
        <div className="space-y-2">
          <Label>Imagem ou ícone (opcional)</Label>
          <ImageUploadField
            imageUrl={imageUrl}
            imageSize={imageUrl ? "medium" : undefined}
            onImageChange={setImageUrl}
            onImageSizeChange={() => {}}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
