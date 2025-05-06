
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from "@/components/ui/switch";
import { ImageUploadField } from './ImageUploadField';
import { TagsManager } from './TagsManager';
import { FileText, AlertTriangle, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from 'framer-motion';

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
  onAddTag?: (tag: string) => void;
}

export function DiagnosticRuleEditor({ 
  rule, 
  onSave, 
  onCancel, 
  availableTags,
  onAddTag 
}: DiagnosticRuleEditorProps) {
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
  
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!internalName.trim()) newErrors.internalName = 'Nome interno é obrigatório';
    if (!title.trim()) newErrors.title = 'Título é obrigatório';
    if (!description.trim()) newErrors.description = 'Descrição é obrigatória';
    if (!phaseName.trim()) newErrors.phaseName = 'Nome da fase é obrigatório';
    if (activationTags.length === 0) newErrors.activationTags = 'Selecione pelo menos uma tag';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-sm border border-blue-100">
        <CardHeader className="bg-blue-50/50">
          <CardTitle className="flex items-center">
            <FileText size={20} className="mr-2 text-blue-600" />
            {rule ? 'Editar Regra de Diagnóstico' : 'Nova Regra de Diagnóstico'}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-6">
          <div className="flex space-x-4 border-b">
            <button
              className={`pb-2 px-1 font-medium text-sm ${
                activeTab === 'basic' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('basic')}
            >
              Informações Básicas
            </button>
            <button
              className={`pb-2 px-1 font-medium text-sm ${
                activeTab === 'advanced' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('advanced')}
            >
              Condições e Avançado
            </button>
          </div>
          
          {activeTab === 'basic' && (
            <div className="space-y-5">
              {/* Basic Information */}
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="internalName" className="flex items-center">
                    Nome interno (para referência)
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info size={14} className="ml-1.5 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-xs">
                            Nome usado apenas no painel administrativo para identificar esta regra
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="internalName"
                    placeholder="Ex: Queda leve, Disfunção por ansiedade"
                    value={internalName}
                    onChange={(e) => setInternalName(e.target.value)}
                    className={errors.internalName ? "border-red-300" : ""}
                  />
                  {errors.internalName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertTriangle size={12} className="mr-1" />
                      {errors.internalName}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center">
                    Título exibido ao cliente
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info size={14} className="ml-1.5 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-xs">
                            Este título será exibido ao cliente como o diagnóstico principal
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Ex: Você apresenta um quadro de queda capilar moderada"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={errors.title ? "border-red-300" : ""}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertTriangle size={12} className="mr-1" />
                      {errors.title}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center">
                    Texto explicativo detalhado
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info size={14} className="ml-1.5 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-xs">
                            Descrição detalhada do diagnóstico, recomendações e explicação para o cliente
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Explicação detalhada sobre o diagnóstico e recomendações"
                    className={`min-h-[180px] ${errors.description ? "border-red-300" : ""}`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertTriangle size={12} className="mr-1" />
                      {errors.description}
                    </p>
                  )}
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
                    className={errors.phaseName ? "border-red-300" : ""}
                  />
                  {errors.phaseName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertTriangle size={12} className="mr-1" />
                      {errors.phaseName}
                    </p>
                  )}
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

              {/* Optional Image */}
              <div className="space-y-3">
                <Label className="flex items-center">
                  Imagem ou ícone (opcional)
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={14} className="ml-1.5 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">
                          Uma imagem de apoio para ilustrar o diagnóstico
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <ImageUploadField
                  imageUrl={imageUrl}
                  imageSize={imageUrl ? "medium" : undefined}
                  onImageChange={setImageUrl}
                  onImageSizeChange={() => {}}
                />
              </div>
            </div>
          )}
          
          {activeTab === 'advanced' && (
            <div className="space-y-5">
              {/* Tags and Logic */}
              <div className="space-y-3">
                <Label className="flex items-center">
                  Condições de ativação (TAGs)
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={14} className="ml-1.5 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">
                          TAGs que, quando presentes, ativam este diagnóstico
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>

                <TagsManager
                  availableTags={availableTags}
                  selectedTags={activationTags}
                  onTagsChange={setActivationTags}
                  onCreateTag={onAddTag}
                  tagLogic={tagLogic}
                  onTagLogicChange={setTagLogic}
                  showTagsList={true}
                  title="Condições de Ativação"
                />
                
                {errors.activationTags && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertTriangle size={12} className="mr-1" />
                    {errors.activationTags}
                  </p>
                )}
              </div>

              {/* Priority and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority" className="flex items-center">
                    Prioridade
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info size={14} className="ml-1.5 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs text-xs">
                            Ordem de verificação. Números menores = maior prioridade
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
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
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Salvar
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
