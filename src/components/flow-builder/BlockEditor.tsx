
import { useState } from 'react';
import { FlowBlock } from '@/pages/admin/FlowBuilder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2 } from 'lucide-react';
import { DialogFooter } from '@/components/ui/dialog';
import TagSelector from './TagSelector';

interface BlockEditorProps {
  block: FlowBlock;
  onUpdate: (block: FlowBlock) => void;
  onClose: () => void;
  tags: string[];
}

const BlockEditor = ({ block, onUpdate, onClose, tags }: BlockEditorProps) => {
  const [editedBlock, setEditedBlock] = useState<FlowBlock>({ ...block });
  
  // Handle common field changes
  const handleChange = (field: string, value: any) => {
    setEditedBlock({
      ...editedBlock,
      [field]: value
    });
  };
  
  // Handle nested data field changes
  const handleDataChange = (field: string, value: any) => {
    setEditedBlock({
      ...editedBlock,
      data: {
        ...editedBlock.data,
        [field]: value
      }
    });
  };
  
  const handleSave = () => {
    onUpdate(editedBlock);
    onClose();
  };
  
  // Render different editors based on block type
  const renderBlockTypeEditor = () => {
    switch(editedBlock.type) {
      case 'question':
        return renderQuestionEditor();
      case 'diagnosis':
        return renderDiagnosisEditor();
      case 'plan':
        return renderPlanEditor();
      case 'checkout':
        return renderCheckoutEditor();
      default:
        return null;
    }
  };
  
  // Question Block Editor
  const renderQuestionEditor = () => {
    const { data } = editedBlock;
    
    const addOption = () => {
      const options = [...(data.options || []), ''];
      handleDataChange('options', options);
    };
    
    const updateOption = (index: number, value: string) => {
      const options = [...(data.options || [])];
      options[index] = value;
      handleDataChange('options', options);
    };
    
    const removeOption = (index: number) => {
      const options = [...(data.options || [])];
      options.splice(index, 1);
      handleDataChange('options', options);
    };
    
    const handleTagRuleChange = (questionValue: any, selectedTags: string[]) => {
      const updatedRules = [...(data.tagRules || [])];
      const existingRuleIndex = updatedRules.findIndex(rule => 
        JSON.stringify(rule.answer) === JSON.stringify(questionValue)
      );
      
      if (existingRuleIndex >= 0) {
        updatedRules[existingRuleIndex].tags = selectedTags;
      } else {
        updatedRules.push({
          id: `rule-${Date.now()}`,
          answer: questionValue,
          tags: selectedTags
        });
      }
      
      handleDataChange('tagRules', updatedRules);
    };
    
    const getTagsForAnswer = (answer: any): string[] => {
      const rule = (data.tagRules || []).find(rule => 
        JSON.stringify(rule.answer) === JSON.stringify(answer)
      );
      return rule ? rule.tags : [];
    };

    return (
      <Tabs defaultValue="basic">
        <TabsList className="mb-4">
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="options">Opções</TabsTrigger>
          <TabsTrigger value="tags">TAGs</TabsTrigger>
          <TabsTrigger value="logic">Lógica</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <div>
            <Label htmlFor="question-title">Título do Bloco</Label>
            <Input
              id="question-title"
              value={editedBlock.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="question-text">Texto da Pergunta</Label>
            <Textarea
              id="question-text"
              value={data.question || ''}
              onChange={(e) => handleDataChange('question', e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="question-type">Tipo de Pergunta</Label>
            <Select 
              value={data.questionType || 'text'} 
              onValueChange={(value) => handleDataChange('questionType', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Texto</SelectItem>
                <SelectItem value="yesno">Sim/Não</SelectItem>
                <SelectItem value="number">Número</SelectItem>
                <SelectItem value="choice">Múltipla Escolha</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="required"
              checked={data.required || false}
              onCheckedChange={(checked) => handleDataChange('required', checked)}
            />
            <Label htmlFor="required">Pergunta Obrigatória</Label>
          </div>
        </TabsContent>
        
        <TabsContent value="options" className="space-y-4">
          {(data.questionType === 'choice') && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Opções de Resposta</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addOption}
                  className="h-8"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Adicionar Opção
                </Button>
              </div>
              
              <ScrollArea className="h-[300px] rounded-md border">
                <div className="p-4 space-y-2">
                  {(data.options || []).length > 0 ? (
                    (data.options || []).map((option: string, index: number) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          placeholder={`Opção ${index + 1}`}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOption(index)}
                          className="h-10 w-10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Nenhuma opção adicionada. Clique em "Adicionar Opção" para começar.
                    </p>
                  )}
                </div>
              </ScrollArea>
            </div>
          )}
          
          {(data.questionType !== 'choice') && (
            <div className="flex items-center justify-center h-[200px]">
              <p className="text-gray-500">
                {data.questionType === 'text' ? 'Perguntas de texto não precisam de opções.' : 
                data.questionType === 'number' ? 'Perguntas de número não precisam de opções.' : 
                data.questionType === 'yesno' ? 'Perguntas de Sim/Não têm opções predefinidas.' : 
                'Selecione um tipo de pergunta para configurar opções.'}
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="tags" className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Configure quais TAGs serão atribuídas com base nas respostas.
          </p>
          
          {data.questionType === 'yesno' && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-4 space-y-2">
                  <h4 className="font-medium">Para resposta "Sim"</h4>
                  <TagSelector
                    selectedTags={getTagsForAnswer(true)}
                    availableTags={tags}
                    onChange={(selectedTags) => handleTagRuleChange(true, selectedTags)}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 space-y-2">
                  <h4 className="font-medium">Para resposta "Não"</h4>
                  <TagSelector
                    selectedTags={getTagsForAnswer(false)}
                    availableTags={tags}
                    onChange={(selectedTags) => handleTagRuleChange(false, selectedTags)}
                  />
                </CardContent>
              </Card>
            </div>
          )}
          
          {data.questionType === 'choice' && (
            <div className="space-y-4">
              {(data.options || []).length > 0 ? (
                (data.options || []).map((option: string, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-4 space-y-2">
                      <h4 className="font-medium">Para resposta "{option}"</h4>
                      <TagSelector
                        selectedTags={getTagsForAnswer(option)}
                        availableTags={tags}
                        onChange={(selectedTags) => handleTagRuleChange(option, selectedTags)}
                      />
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">
                  Adicione opções na aba "Opções" para configurar TAGs.
                </p>
              )}
            </div>
          )}
          
          {(data.questionType === 'text' || data.questionType === 'number') && (
            <div className="flex items-center justify-center h-[200px]">
              <p className="text-gray-500 text-center">
                A configuração de TAGs para respostas de {data.questionType === 'text' ? 'texto' : 'número'} será implementada em breve.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="logic" className="space-y-4">
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-gray-500 text-center">
              A configuração de lógica condicional entre perguntas será implementada em breve.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    );
  };
  
  // Diagnosis Block Editor
  const renderDiagnosisEditor = () => {
    const { data } = editedBlock;

    return (
      <Tabs defaultValue="basic">
        <TabsList className="mb-4">
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="tags">Regras de TAGs</TabsTrigger>
          <TabsTrigger value="visual">Visual</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <div>
            <Label htmlFor="diagnosis-title">Título do Bloco</Label>
            <Input
              id="diagnosis-title"
              value={editedBlock.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="diagnosis-description">Descrição do Diagnóstico</Label>
            <Textarea
              id="diagnosis-description"
              value={data.description || ''}
              onChange={(e) => handleDataChange('description', e.target.value)}
              className="mt-1"
              rows={3}
              placeholder="Ex: Com base nas suas respostas, identificamos..."
            />
          </div>
          
          <div>
            <Label htmlFor="diagnosis-phase">Nome da Fase</Label>
            <Input
              id="diagnosis-phase"
              value={data.phase || ''}
              onChange={(e) => handleDataChange('phase', e.target.value)}
              className="mt-1"
              placeholder="Ex: Fase 1 - Estabilização"
            />
          </div>
          
          <div>
            <Label htmlFor="diagnosis-duration">Duração Estimada</Label>
            <Input
              id="diagnosis-duration"
              value={data.duration || ''}
              onChange={(e) => handleDataChange('duration', e.target.value)}
              className="mt-1"
              placeholder="Ex: 1-3 meses"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="tags" className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Configure quais TAGs são necessárias para mostrar este diagnóstico.
          </p>
          
          <div>
            <Label className="mb-2 block">Lógica de Ativação</Label>
            <Select 
              value={data.tagLogic || 'AND'} 
              onValueChange={(value) => handleDataChange('tagLogic', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a lógica" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AND">Todas as TAGs (E)</SelectItem>
                <SelectItem value="OR">Qualquer TAG (OU)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              {data.tagLogic === 'AND' 
                ? 'Todas as TAGs selecionadas devem estar presentes para mostrar este diagnóstico.' 
                : 'Qualquer uma das TAGs selecionadas ativa este diagnóstico.'}
            </p>
          </div>
          
          <div className="mt-4">
            <Label className="mb-2 block">TAGs Necessárias</Label>
            <TagSelector
              selectedTags={data.requiredTags || []}
              availableTags={tags}
              onChange={(selectedTags) => handleDataChange('requiredTags', selectedTags)}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="visual" className="space-y-4">
          <div>
            <Label htmlFor="diagnosis-icon">Ícone</Label>
            <Select 
              value={data.icon || 'shield'} 
              onValueChange={(value) => handleDataChange('icon', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione um ícone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shield">Escudo (Proteção)</SelectItem>
                <SelectItem value="leaf">Folha (Natural)</SelectItem>
                <SelectItem value="trending-up">Gráfico Crescente (Melhoria)</SelectItem>
                <SelectItem value="zap">Raio (Energia)</SelectItem>
                <SelectItem value="heart">Coração (Saúde)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <Switch
              id="animate"
              checked={data.animate || false}
              onCheckedChange={(checked) => handleDataChange('animate', checked)}
            />
            <Label htmlFor="animate">Adicionar Animações</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="fullscreen"
              checked={data.fullscreen || true}
              onCheckedChange={(checked) => handleDataChange('fullscreen', checked)}
            />
            <Label htmlFor="fullscreen">Mostrar em Tela Cheia</Label>
          </div>
        </TabsContent>
      </Tabs>
    );
  };
  
  // Plan Block Editor
  const renderPlanEditor = () => {
    const { data } = editedBlock;
    
    const addFeature = () => {
      const features = [...(data.features || []), ''];
      handleDataChange('features', features);
    };
    
    const updateFeature = (index: number, value: string) => {
      const features = [...(data.features || [])];
      features[index] = value;
      handleDataChange('features', features);
    };
    
    const removeFeature = (index: number) => {
      const features = [...(data.features || [])];
      features.splice(index, 1);
      handleDataChange('features', features);
    };

    return (
      <Tabs defaultValue="basic">
        <TabsList className="mb-4">
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="features">Recursos</TabsTrigger>
          <TabsTrigger value="tags">Regras de TAGs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <div>
            <Label htmlFor="plan-title">Título do Plano</Label>
            <Input
              id="plan-title"
              value={editedBlock.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="plan-description">Descrição</Label>
            <Textarea
              id="plan-description"
              value={data.description || ''}
              onChange={(e) => handleDataChange('description', e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="plan-price">Preço (R$)</Label>
            <Input
              id="plan-price"
              type="number"
              value={data.price || ''}
              onChange={(e) => handleDataChange('price', parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="plan-button">Texto do Botão</Label>
            <Input
              id="plan-button"
              value={data.buttonText || 'Quero esse plano'}
              onChange={(e) => handleDataChange('buttonText', e.target.value)}
              className="mt-1"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="features" className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Recursos do Plano</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addFeature}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Adicionar Recurso
              </Button>
            </div>
            
            <ScrollArea className="h-[300px] rounded-md border">
              <div className="p-4 space-y-2">
                {(data.features || []).length > 0 ? (
                  (data.features || []).map((feature: string, index: number) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder={`Recurso ${index + 1}`}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Nenhum recurso adicionado. Clique em "Adicionar Recurso" para começar.
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        </TabsContent>
        
        <TabsContent value="tags" className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Configure quais TAGs são necessárias para recomendar este plano.
          </p>
          
          <div>
            <Label className="mb-2 block">Lógica de Ativação</Label>
            <Select 
              value={data.tagLogic || 'AND'} 
              onValueChange={(value) => handleDataChange('tagLogic', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a lógica" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AND">Todas as TAGs (E)</SelectItem>
                <SelectItem value="OR">Qualquer TAG (OU)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              {data.tagLogic === 'AND' 
                ? 'Todas as TAGs selecionadas devem estar presentes para recomendar este plano.' 
                : 'Qualquer uma das TAGs selecionadas ativa esta recomendação.'}
            </p>
          </div>
          
          <div className="mt-4">
            <Label className="mb-2 block">TAGs Necessárias</Label>
            <TagSelector
              selectedTags={data.tagRequirements || []}
              availableTags={tags}
              onChange={(selectedTags) => handleDataChange('tagRequirements', selectedTags)}
            />
          </div>
        </TabsContent>
      </Tabs>
    );
  };
  
  // Checkout Block Editor
  const renderCheckoutEditor = () => {
    const { data } = editedBlock;

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="checkout-title">Título</Label>
          <Input
            id="checkout-title"
            value={editedBlock.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="checkout-description">Descrição</Label>
          <Textarea
            id="checkout-description"
            value={data.description || ''}
            onChange={(e) => handleDataChange('description', e.target.value)}
            className="mt-1"
            rows={3}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="terms-required"
            checked={data.termsRequired || false}
            onCheckedChange={(checked) => handleDataChange('termsRequired', checked)}
          />
          <Label htmlFor="terms-required">Exigir aceitação dos Termos</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="collect-shipping"
            checked={data.collectShipping || false}
            onCheckedChange={(checked) => handleDataChange('collectShipping', checked)}
          />
          <Label htmlFor="collect-shipping">Coletar Endereço de Entrega</Label>
        </div>
        
        <div>
          <Label htmlFor="success-redirect">URL após pagamento bem-sucedido</Label>
          <Input
            id="success-redirect"
            value={data.successRedirect || '/confirmacao'}
            onChange={(e) => handleDataChange('successRedirect', e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
          <h5 className="text-sm font-medium text-amber-800">Sobre o Checkout</h5>
          <p className="text-xs text-amber-700 mt-1">
            O checkout utiliza Stripe para processamento de pagamentos e mostrará automaticamente o plano selecionado pelo cliente.
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="py-4">
        {renderBlockTypeEditor()}
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave}>Salvar Alterações</Button>
      </DialogFooter>
    </>
  );
};

export default BlockEditor;
