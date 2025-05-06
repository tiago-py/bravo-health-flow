
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { Plus, Tag, X } from 'lucide-react';

interface TagRule {
  id: string;
  answer: string | boolean | number | string[];
  tags: string[];
}

interface QuestionTagsConfigProps {
  questionId: string;
  questionText: string;
  questionType: string;
  options?: string[];
  availableTags: string[];
  tagRules: TagRule[];
  onTagRulesChange: (tagRules: TagRule[]) => void;
  onCreateTag?: (tag: string) => void;
}

export function QuestionTagsConfig({
  questionId,
  questionText,
  questionType,
  options,
  availableTags,
  tagRules,
  onTagRulesChange,
  onCreateTag
}: QuestionTagsConfigProps) {
  const [newTag, setNewTag] = useState('');
  const [activeRuleId, setActiveRuleId] = useState<string | null>(null);
  
  const addTag = (ruleId: string, tag: string) => {
    if (!tag.trim()) return;
    
    const updatedRules = tagRules.map(rule => {
      if (rule.id === ruleId) {
        if (!rule.tags.includes(tag)) {
          return {
            ...rule,
            tags: [...rule.tags, tag]
          };
        }
      }
      return rule;
    });
    
    onTagRulesChange(updatedRules);
    setNewTag('');
  };
  
  const removeTag = (ruleId: string, tagToRemove: string) => {
    const updatedRules = tagRules.map(rule => {
      if (rule.id === ruleId) {
        return {
          ...rule,
          tags: rule.tags.filter(tag => tag !== tagToRemove)
        };
      }
      return rule;
    });
    
    onTagRulesChange(updatedRules);
  };
  
  const createNewTag = () => {
    if (newTag.trim() && !availableTags.includes(newTag) && onCreateTag) {
      onCreateTag(newTag.trim());
      if (activeRuleId) {
        addTag(activeRuleId, newTag.trim());
      }
    }
  };
  
  const getDisplayValueForAnswer = (answer: string | boolean | number | string[]) => {
    if (typeof answer === 'boolean') {
      return answer ? 'Sim' : 'Não';
    }
    
    if (Array.isArray(answer)) {
      return answer.join(', ');
    }
    
    return String(answer);
  };

  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Tag size={18} />
          Regras de atribuição de tags
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Defina quais tags serão atribuídas ao usuário com base nas respostas.
        </p>
        
        <Accordion type="single" collapsible className="w-full">
          {tagRules.map(rule => (
            <AccordionItem key={rule.id} value={rule.id}>
              <AccordionTrigger className="hover:bg-gray-50 p-3 rounded-md">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Quando responder: </span>
                  <Badge variant="outline">
                    {getDisplayValueForAnswer(rule.answer)}
                  </Badge>
                  <span className="mx-2">→</span>
                  {rule.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {rule.tags.map(tag => (
                        <Badge key={tag} variant="default" className="bg-green-100 text-green-800">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 italic text-sm">Nenhuma tag</span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-gray-50 p-4 rounded-md">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-gray-700">Tags atribuídas:</Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {rule.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="bg-green-100 text-green-800 pl-3 pr-2 py-1.5 flex items-center gap-1"
                        >
                          {tag}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 p-0 hover:bg-green-200 ml-1"
                            onClick={() => removeTag(rule.id, tag)}
                          >
                            <X size={12} />
                          </Button>
                        </Badge>
                      ))}
                      
                      {rule.tags.length === 0 && (
                        <p className="text-sm text-gray-500">
                          Nenhuma tag adicionada ainda
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    <div className="md:col-span-4">
                      <Input
                        placeholder="Digite uma nova tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="w-full"
                        onFocus={() => setActiveRuleId(rule.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            if (availableTags.includes(newTag)) {
                              addTag(rule.id, newTag);
                            } else if (onCreateTag) {
                              createNewTag();
                            }
                          }
                        }}
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={() => {
                        setActiveRuleId(rule.id);
                        if (availableTags.includes(newTag)) {
                          addTag(rule.id, newTag);
                        } else if (onCreateTag) {
                          createNewTag();
                        }
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Plus size={16} className="mr-1" />
                      Adicionar
                    </Button>
                  </div>
                  
                  <div className="mt-3">
                    <Label className="text-sm text-gray-700 mb-2 block">Tags disponíveis:</Label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.filter(tag => !rule.tags.includes(tag)).map(tag => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer hover:bg-green-50 px-2 py-1 border-dashed"
                          onClick={() => addTag(rule.id, tag)}
                        >
                          + {tag}
                        </Badge>
                      ))}
                      
                      {availableTags.filter(tag => !rule.tags.includes(tag)).length === 0 && (
                        <p className="text-sm text-gray-500">
                          Todas as tags disponíveis já foram adicionadas
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
