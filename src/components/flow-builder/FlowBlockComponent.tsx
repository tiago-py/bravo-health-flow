import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { FlowBlock } from '@/pages/admin/FlowBuilder';
import { 
  HelpCircle, 
  FileText,
  Star, 
  CreditCard,
  Pencil,
  Trash2,
  Link,
  ChevronDown,
  ChevronRight,
  ChevronUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Draggable } from '@/components/flow-builder/Draggable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import BlockEditor from './BlockEditor';

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
  
  const handlePositionChange = (newPosition: { x: number, y: number }) => {
    onUpdate({
      ...block,
      position: newPosition
    });
  };

  // When used in a linear, step-by-step display
  if (isInlineDisplay) {
    return (
      <>
        <div className="w-full">
          <div className={`${blockTypeColors[block.type]}`}>
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                {blockTypeIcons[block.type]}
                <span className="ml-2 font-medium">{blockTypeTitles[block.type]}: {block.title}</span>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500" onClick={() => onDelete(block.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {isExpanded && (
              <div className="p-4">
                {block.type === 'question' && (
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-sm">Pergunta:</div>
                      <p className="text-gray-700">{block.data.question || 'Sem pergunta definida'}</p>
                    </div>
                    <div>
                      <div className="font-medium text-sm">Tipo:</div>
                      <p className="text-gray-700 capitalize">
                        {block.data.questionType || 'texto'}
                      </p>
                    </div>
                    {block.data.options && block.data.options.length > 0 && (
                      <div>
                        <div className="font-medium text-sm">Opções:</div>
                        <ul className="list-disc pl-5">
                          {block.data.options.map((option: string, idx: number) => (
                            <li key={idx} className="text-gray-700">{option}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {block.data.required !== undefined && (
                      <div className="text-sm">
                        <span className={`font-medium ${block.data.required ? 'text-red-500' : 'text-gray-500'}`}>
                          {block.data.required ? 'Resposta obrigatória' : 'Resposta opcional'}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                {block.type === 'diagnosis' && (
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-sm">Título:</div>
                      <p className="text-gray-700">{block.data.title || 'Sem título definido'}</p>
                    </div>
                    <div>
                      <div className="font-medium text-sm">Descrição:</div>
                      <p className="text-gray-700">{block.data.description || 'Sem descrição definida'}</p>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <div className="font-medium text-sm">Fase:</div>
                        <p className="text-gray-700">{block.data.phase || 'Não definida'}</p>
                      </div>
                      <div>
                        <div className="font-medium text-sm">Duração:</div>
                        <p className="text-gray-700">{block.data.duration || 'Não definida'}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {block.type === 'plan' && (
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-sm">Título:</div>
                      <p className="text-gray-700">{block.data.title || 'Sem título definido'}</p>
                    </div>
                    <div>
                      <div className="font-medium text-sm">Descrição:</div>
                      <p className="text-gray-700">{block.data.description || 'Sem descrição definida'}</p>
                    </div>
                    <div>
                      <div className="font-medium text-sm">Preço:</div>
                      <p className="text-gray-700">
                        {block.data.price ? `R$ ${block.data.price.toFixed(2)}` : 'Não definido'}
                      </p>
                    </div>
                    {block.data.features && block.data.features.length > 0 && (
                      <div>
                        <div className="font-medium text-sm">Características:</div>
                        <ul className="list-disc pl-5">
                          {block.data.features.map((feature: string, idx: number) => (
                            <li key={idx} className="text-gray-700">{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                {block.type === 'checkout' && (
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-sm">Título:</div>
                      <p className="text-gray-700">{block.data.title || 'Sem título definido'}</p>
                    </div>
                    <div>
                      <div className="font-medium text-sm">Descrição:</div>
                      <p className="text-gray-700">{block.data.description || 'Sem descrição definida'}</p>
                    </div>
                    <div className="space-y-1">
                      {block.data.termsRequired && (
                        <div className="flex items-center text-sm">
                          <div className="w-4 h-4 border border-gray-300 rounded mr-2 flex items-center justify-center bg-blue-500 text-white">
                            ✓
                          </div>
                          <span>Aceite dos termos obrigatório</span>
                        </div>
                      )}
                      {block.data.collectShipping && (
                        <div className="flex items-center text-sm">
                          <div className="w-4 h-4 border border-gray-300 rounded mr-2 flex items-center justify-center bg-blue-500 text-white">
                            ✓
                          </div>
                          <span>Coletar endereço de entrega</span>
                        </div>
                      )}
                    </div>
                    {block.data.successRedirect && (
                      <div className="text-sm">
                        <span className="font-medium">Redirecionamento: </span>
                        <span className="text-gray-700">{block.data.successRedirect}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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

  // Original draggable version for canvas view (keeping for compatibility)
  return (
    <>
      <Draggable
        initialPosition={block.position}
        onPositionChange={handlePositionChange}
        className="absolute"
        style={{
          left: `${block.position.x}px`,
          top: `${block.position.y}px`,
          width: '280px' // Increased width for better visibility
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className={`shadow-md cursor-move ${blockTypeColors[block.type]}`}>
            <CardHeader className="p-3 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center">
                  {blockTypeIcons[block.type]}
                  <span className="ml-1">{blockTypeTitles[block.type]}</span>
                </CardTitle>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsEditing(true)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Link className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {availableBlocks.length > 0 ? (
                        availableBlocks.map((targetBlock) => (
                          <DropdownMenuItem 
                            key={targetBlock.id}
                            onClick={() => onConnect(block.id, targetBlock.id)}
                          >
                            {blockTypeIcons[targetBlock.type]}
                            <span className="ml-2">
                              {targetBlock.title || blockTypeTitles[targetBlock.type]}
                            </span>
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <DropdownMenuItem disabled>
                          Nenhum bloco disponível
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onDelete(block.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div>
                <h4 className="font-medium text-sm">{block.title}</h4>
                {block.type === 'question' && block.data.question && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {block.data.question}
                  </p>
                )}
                {block.type === 'diagnosis' && block.data.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {block.data.description}
                  </p>
                )}
                {block.type === 'plan' && block.data.price && (
                  <p className="text-xs text-gray-500 mt-1">
                    R$ {block.data.price.toFixed(2)}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Draggable>
      
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{`Editar ${blockTypeTitles[block.type]}`}</DialogTitle>
            <DialogDescription>
              Configure os detalhes e a lógica deste bloco.
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
};

export default FlowBlockComponent;
