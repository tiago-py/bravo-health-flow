
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DiagnosticRuleEditor } from './DiagnosticRuleEditor';
import { DroppableContainer } from './DroppableContainer';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Tag, Plus, Copy, Edit, Trash2, ArrowUp, ArrowDown, FileText } from 'lucide-react';

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

interface DiagnosticRulesListProps {
  rules: DiagnosticRule[];
  onAddRule: (rule: DiagnosticRule) => void;
  onUpdateRule: (rule: DiagnosticRule) => void;
  onRemoveRule: (id: string) => void;
  onDuplicateRule: (id: string) => void;
  onReorderRules: (rules: DiagnosticRule[]) => void;
  availableTags: string[];
}

export function DiagnosticRulesList({
  rules,
  onAddRule,
  onUpdateRule,
  onRemoveRule,
  onDuplicateRule,
  onReorderRules,
  availableTags
}: DiagnosticRulesListProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentRule, setCurrentRule] = useState<DiagnosticRule | undefined>();
  
  const handleAddRule = () => {
    setCurrentRule(undefined);
    setIsEditing(true);
  };
  
  const handleEditRule = (rule: DiagnosticRule) => {
    setCurrentRule(rule);
    setIsEditing(true);
  };
  
  const handleSaveRule = (rule: DiagnosticRule) => {
    if (currentRule) {
      onUpdateRule(rule);
    } else {
      onAddRule(rule);
    }
    setIsEditing(false);
  };

  const handleMovePriority = (ruleId: string, direction: 'up' | 'down') => {
    const ruleIndex = rules.findIndex(r => r.id === ruleId);
    if (
      (direction === 'up' && ruleIndex === 0) || 
      (direction === 'down' && ruleIndex === rules.length - 1)
    ) {
      return;
    }

    const newRules = [...rules];
    const rule = newRules[ruleIndex];
    const swapIndex = direction === 'up' ? ruleIndex - 1 : ruleIndex + 1;
    const swapRule = newRules[swapIndex];
    
    // Swap priorities
    const tempPriority = rule.priority;
    rule.priority = swapRule.priority;
    swapRule.priority = tempPriority;
    
    // Reorder array
    newRules[ruleIndex] = swapRule;
    newRules[swapIndex] = rule;
    
    onReorderRules(newRules);
  };

  if (isEditing) {
    return (
      <DiagnosticRuleEditor
        rule={currentRule}
        onSave={handleSaveRule}
        onCancel={() => setIsEditing(false)}
        availableTags={availableTags}
      />
    );
  }

  const sortedRules = [...rules].sort((a, b) => a.priority - b.priority);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Regras de Diagnóstico</h3>
        <Button onClick={handleAddRule}>
          <Plus size={16} className="mr-2" />
          Adicionar Regra
        </Button>
      </div>

      {sortedRules.length === 0 && (
        <Card className="border-dashed border-2">
          <CardContent className="py-8 text-center">
            <FileText className="mx-auto h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              Nenhuma regra de diagnóstico criada. Clique em "Adicionar Regra" para criar sua primeira regra.
            </p>
            <Button variant="outline" className="mt-4" onClick={handleAddRule}>
              <Plus size={16} className="mr-1" />
              Criar Primeira Regra
            </Button>
          </CardContent>
        </Card>
      )}

      {sortedRules.map((rule, index) => (
        <Card key={rule.id} className={`overflow-hidden ${!rule.isActive ? 'opacity-60' : ''}`}>
          <CardHeader className="pb-3 bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  {rule.internalName}
                  {!rule.isActive && <Badge variant="outline">Inativo</Badge>}
                </CardTitle>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleMovePriority(rule.id, 'up')} 
                  disabled={index === 0}
                >
                  <ArrowUp size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleMovePriority(rule.id, 'down')} 
                  disabled={index === sortedRules.length - 1}
                >
                  <ArrowDown size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onDuplicateRule(rule.id)}
                >
                  <Copy size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEditRule(rule)}
                >
                  <Edit size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => onRemoveRule(rule.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm text-gray-500">Título exibido:</p>
                  <p>{rule.title}</p>
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-500">Fase do tratamento:</p>
                  <p>{rule.phaseName} {rule.phaseDuration ? `(${rule.phaseDuration})` : ''}</p>
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-500">Condições de ativação:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {rule.activationTags.length > 0 ? rule.activationTags.map((tag, i) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag size={10} className="mr-1" />
                        {tag}
                        {i < rule.activationTags.length - 1 && rule.tagLogic === 'AND' && <span className="ml-1">+</span>}
                        {i < rule.activationTags.length - 1 && rule.tagLogic === 'OR' && <span className="ml-1">ou</span>}
                      </Badge>
                    )) : (
                      <span className="text-sm text-gray-400">Nenhuma condição definida</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm text-gray-500">Descrição exibida:</p>
                  <p className="text-sm line-clamp-3">{rule.description}</p>
                </div>
                {rule.imageUrl && (
                  <div className="h-20 w-32 relative">
                    <img 
                      src={rule.imageUrl} 
                      alt="Imagem do diagnóstico" 
                      className="h-full w-full object-cover rounded" 
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
