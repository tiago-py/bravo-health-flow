
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';
import { FlowBlock } from '@/pages/admin/FlowBuilder';
import { 
  HelpCircle, 
  FileText,
  Star, 
  CreditCard,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import BlockEditor from './BlockEditor';
import { Badge } from '@/components/ui/badge';

interface FlowBlockComponentProps {
  block: FlowBlock;
  onUpdate: (block: FlowBlock) => void;
  onDelete: (id: string) => void;
  onConnect: (sourceId: string, targetId: string) => void;
  availableBlocks: FlowBlock[];
  tags: string[];
  isInlineDisplay?: boolean;
}

const FlowBlockComponent = ({ 
  block, 
  onUpdate, 
  onDelete,
  onConnect,
  availableBlocks,
  tags,
  isInlineDisplay = false
}: FlowBlockComponentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  
  const blockTypeIcons = {
    question: <HelpCircle className="h-4 w-4" />,
    diagnosis: <FileText className="h-4 w-4" />,
    plan: <Star className="h-4 w-4" />,
    checkout: <CreditCard className="h-4 w-4" />
  };
  
  const blockTypeColors = {
    question: 'border-blue-200 bg-blue-50',
    diagnosis: 'border-amber-200 bg-amber-50',
    plan: 'border-green-200 bg-green-50',
    checkout: 'border-purple-200 bg-purple-50'
  };
  
  const blockTypeTitles = {
    question: 'Pergunta',
    diagnosis: 'Diagnóstico',
    plan: 'Plano',
    checkout: 'Checkout'
  };

  if (isInlineDisplay) {
    return (
      <>
        <div className="w-full">
          <div className={`${blockTypeColors[block.type]} rounded-lg overflow-hidden`}>
            <div className="flex items-center justify-between p-4 border-b border-current border-opacity-20">
              <div className="flex items-center flex-1 min-w-0">
                {blockTypeIcons[block.type]}
                <span className="ml-2 font-medium truncate">{blockTypeTitles[block.type]}: {block.title}</span>
              </div>
              <div className="flex space-x-1 ml-2 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => onDelete(block.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {isExpanded && (
              <div className="p-4">
                {block.type === 'question' && (
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-sm mb-1">Pergunta:</div>
                      <p className="text-gray-700 text-sm">{block.data.question || 'Sem pergunta definida'}</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <div>
                        <div className="font-medium text-sm mb-1">Tipo:</div>
                        <Badge variant="outline" className="text-xs">
                          {block.data.questionType || 'texto'}
                        </Badge>
                      </div>
                      {block.data.required !== undefined && (
                        <div>
                          <div className="font-medium text-sm mb-1">Obrigatória:</div>
                          <Badge variant={block.data.required ? "destructive" : "secondary"} className="text-xs">
                            {block.data.required ? 'Sim' : 'Não'}
                          </Badge>
                        </div>
                      )}
                    </div>
                    {block.data.options && block.data.options.length > 0 && (
                      <div>
                        <div className="font-medium text-sm mb-2">Opções:</div>
                        <div className="flex flex-wrap gap-1">
                          {block.data.options.slice(0, 3).map((option: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">{option}</Badge>
                          ))}
                          {block.data.options.length > 3 && (
                            <Badge variant="outline" className="text-xs">+{block.data.options.length - 3}</Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {block.type === 'diagnosis' && (
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-sm mb-1">Título:</div>
                      <p className="text-gray-700 text-sm">{block.data.title || 'Sem título definido'}</p>
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Descrição:</div>
                      <p className="text-gray-700 text-sm line-clamp-2">{block.data.description || 'Sem descrição definida'}</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <div>
                        <div className="font-medium text-sm mb-1">Fase:</div>
                        <Badge variant="outline" className="text-xs">{block.data.phase || 'Não definida'}</Badge>
                      </div>
                      <div>
                        <div className="font-medium text-sm mb-1">Duração:</div>
                        <Badge variant="outline" className="text-xs">{block.data.duration || 'Não definida'}</Badge>
                      </div>
                    </div>
                  </div>
                )}
                
                {block.type === 'plan' && (
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-sm mb-1">Título:</div>
                      <p className="text-gray-700 text-sm">{block.data.title || 'Sem título definido'}</p>
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Descrição:</div>
                      <p className="text-gray-700 text-sm line-clamp-2">{block.data.description || 'Sem descrição definida'}</p>
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Preço:</div>
                      <Badge variant="default" className="text-xs">
                        {block.data.price ? `R$ ${block.data.price.toFixed(2)}` : 'Não definido'}
                      </Badge>
                    </div>
                    {block.data.features && block.data.features.length > 0 && (
                      <div>
                        <div className="font-medium text-sm mb-2">Características:</div>
                        <div className="flex flex-wrap gap-1">
                          {block.data.features.slice(0, 2).map((feature: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">{feature}</Badge>
                          ))}
                          {block.data.features.length > 2 && (
                            <Badge variant="outline" className="text-xs">+{block.data.features.length - 2}</Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {block.type === 'checkout' && (
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-sm mb-1">Título:</div>
                      <p className="text-gray-700 text-sm">{block.data.title || 'Sem título definido'}</p>
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Descrição:</div>
                      <p className="text-gray-700 text-sm line-clamp-2">{block.data.description || 'Sem descrição definida'}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {block.data.termsRequired && (
                        <Badge variant="outline" className="text-xs">Aceite de termos obrigatório</Badge>
                      )}
                      {block.data.collectShipping && (
                        <Badge variant="outline" className="text-xs">Coletar endereço</Badge>
                      )}
                    </div>
                    {block.data.successRedirect && (
                      <div>
                        <div className="font-medium text-sm mb-1">Redirecionamento:</div>
                        <Badge variant="outline" className="text-xs">{block.data.successRedirect}</Badge>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{`Editar ${blockTypeTitles[block.type]}`}</DialogTitle>
              <DialogDescription>
                Configure os detalhes e a lógica desta etapa.
              </DialogDescription>
            </DialogHeader>
            
            <BlockEditor 
              block={block}
              onUpdate={(updatedBlock) => {
                onUpdate(updatedBlock);
              }}
              tags={tags}
              onClose={() => setIsEditing(false)}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return null;
};

export default FlowBlockComponent;
