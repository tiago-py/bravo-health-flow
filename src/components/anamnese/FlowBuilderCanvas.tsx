
import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent
} from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DroppableContainer } from './DroppableContainer';
import { FlowBlockItem } from './FlowBlockItem';
import { Plus, ArrowRight, Eye, GripHorizontal, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { FlowBuilderBlock } from './FlowBuilderBlock';

// Define block types
export type FlowBlockType = 'question' | 'diagnosis' | 'plan-selection' | 'checkout' | 'conditional' | 'tag' | 'group';

// Interface for flow blocks
export interface FlowBlock {
  id: string;
  type: FlowBlockType;
  title: string;
  description?: string;
  required?: boolean;
  active?: boolean;
  data?: any;
  tags?: string[];
}

interface FlowBuilderCanvasProps {
  blocks: FlowBlock[];
  onBlocksChange: (blocks: FlowBlock[]) => void;
  onAddBlock: (type: FlowBlockType) => void;
  onEditBlock?: (id: string) => void;
  onPreviewBlock?: (id: string) => void;
  onDuplicateBlock?: (id: string) => void;
  onRemoveBlock?: (id: string) => void;
  onPreviewFlow?: () => void;
}

export function FlowBuilderCanvas({
  blocks,
  onBlocksChange,
  onAddBlock,
  onEditBlock,
  onPreviewBlock,
  onDuplicateBlock,
  onRemoveBlock,
  onPreviewFlow
}: FlowBuilderCanvasProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showBlockLibrary, setShowBlockLibrary] = useState(false);
  
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex(block => block.id === active.id);
      const newIndex = blocks.findIndex(block => block.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newBlocks = arrayMove(blocks, oldIndex, newIndex);
        onBlocksChange(newBlocks);
      }
    }
    
    setActiveId(null);
  };

  const getActiveBlock = () => {
    if (!activeId) return null;
    return blocks.find(block => block.id === activeId);
  };
  
  const activeBlock = getActiveBlock();
  
  // Flow validity check
  const hasQuestionBlock = blocks.some(block => block.type === 'question');
  const hasDiagnosisBlock = blocks.some(block => block.type === 'diagnosis');
  const hasPlanSelectionBlock = blocks.some(block => block.type === 'plan-selection');
  const hasCheckoutBlock = blocks.some(block => block.type === 'checkout');
  
  const getFlowValidity = () => {
    if (blocks.length === 0) return { valid: false, message: 'Adicione blocos ao fluxo' };
    if (!hasQuestionBlock) return { valid: false, message: 'Adicione pelo menos uma pergunta' };
    
    // Check block order
    const diagnosisIndex = blocks.findIndex(block => block.type === 'diagnosis');
    const planIndex = blocks.findIndex(block => block.type === 'plan-selection');
    const checkoutIndex = blocks.findIndex(block => block.type === 'checkout');
    
    if (diagnosisIndex !== -1 && planIndex !== -1 && diagnosisIndex > planIndex) {
      return { valid: false, message: 'O bloco de diagnóstico deve vir antes da seleção de plano' };
    }
    
    if (planIndex !== -1 && checkoutIndex !== -1 && planIndex > checkoutIndex) {
      return { valid: false, message: 'A seleção de plano deve vir antes do checkout' };
    }
    
    if (!hasDiagnosisBlock) {
      return { valid: false, message: 'Adicione um bloco de diagnóstico' };
    }
    
    if (!hasPlanSelectionBlock) {
      return { valid: false, message: 'Adicione um bloco de seleção de plano' };
    }
    
    if (!hasCheckoutBlock) {
      return { valid: false, message: 'Adicione um bloco de checkout' };
    }
    
    return { valid: true, message: '' };
  };
  
  const flowValidity = getFlowValidity();

  // Available block templates to add
  const blockTemplates: FlowBlock[] = [
    { 
      id: 'template-question', 
      type: 'question', 
      title: 'Pergunta', 
      description: 'Adiciona uma pergunta ao fluxo' 
    },
    { 
      id: 'template-diagnosis', 
      type: 'diagnosis', 
      title: 'Diagnóstico', 
      description: 'Exibe um diagnóstico personalizado com base nas respostas',
      required: !hasDiagnosisBlock // Only one diagnosis block allowed
    },
    { 
      id: 'template-plan-selection', 
      type: 'plan-selection', 
      title: 'Seleção de Planos', 
      description: 'Mostra os planos recomendados para escolha',
      required: !hasPlanSelectionBlock // Only one plan selection block allowed
    },
    { 
      id: 'template-checkout', 
      type: 'checkout', 
      title: 'Checkout', 
      description: 'Finaliza a compra com pagamento via Stripe',
      required: !hasCheckoutBlock // Only one checkout block allowed
    },
    { 
      id: 'template-tag', 
      type: 'tag', 
      title: 'Atribuição de Tags', 
      description: 'Define tags com base em condições' 
    },
    { 
      id: 'template-conditional', 
      type: 'conditional', 
      title: 'Bloco Condicional', 
      description: 'Exibe conteúdo com base em condições' 
    },
    { 
      id: 'template-group', 
      type: 'group', 
      title: 'Grupo de Perguntas', 
      description: 'Agrupa perguntas relacionadas' 
    }
  ];

  return (
    <div className="w-full mt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GripHorizontal size={18} className="text-gray-400" />
          <h2 className="text-lg font-medium text-gray-700">Jornada do Fluxo</h2>
        </div>
        
        <div className="flex items-center gap-2">
          {onPreviewFlow && (
            <Button onClick={onPreviewFlow} variant="outline" className="gap-2">
              <Eye size={16} />
              Preview
            </Button>
          )}
          <Button onClick={() => setShowBlockLibrary(!showBlockLibrary)}>
            <Plus size={16} className="mr-1" />
            Adicionar Bloco
          </Button>
        </div>
      </div>
      
      {blocks.length > 0 && !flowValidity.valid && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-700 text-sm flex items-center gap-2">
          <AlertCircle size={16} />
          {flowValidity.message}
        </div>
      )}
      
      {showBlockLibrary && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6"
        >
          <Card className="p-4 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Biblioteca de Blocos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {blockTemplates.map(template => (
                <FlowBuilderBlock
                  key={template.id}
                  type={template.type}
                  title={template.title}
                  description={template.description}
                  onClick={() => {
                    onAddBlock(template.type);
                    setShowBlockLibrary(false);
                  }}
                  disabled={template.required === false} // Disable if the block is already present and only one is allowed
                />
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      <div className="overflow-x-auto">
        <Card className="p-6 bg-gray-50 border-dashed">
          {blocks.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center">
              <div className="mb-4 p-6 bg-blue-50 rounded-full">
                <ArrowRight size={40} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">Construa seu Fluxo de Anamnese</h3>
              <p className="text-gray-500 mb-6 max-w-md">
                Adicione blocos ao seu fluxo para criar uma jornada personalizada para seus clientes, 
                desde a coleta de informações até o checkout.
              </p>
              <Button onClick={() => setShowBlockLibrary(true)}>
                <Plus size={16} className="mr-2" />
                Adicionar Primeiro Bloco
              </Button>
            </div>
          ) : (
            <div className="py-6">
              <div className="min-w-[800px] pb-8">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext 
                    items={blocks.map(block => block.id)}
                    strategy={horizontalListSortingStrategy}
                  >
                    <div className="relative">
                      {/* Flow Connection Lines */}
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                      
                      {/* Flow Blocks with Connection Points */}
                      <div className="relative flex gap-4">
                        {blocks.map((block, index) => (
                          <div key={block.id} className="flex-shrink-0 w-64 z-10">
                            {/* Block */}
                            <div className="flex flex-col items-center">
                              {/* Connection Point */}
                              {index > 0 && (
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                                  <ArrowRight size={16} className="text-white" />
                                </div>
                              )}
                              
                              <FlowBlockItem
                                id={block.id}
                                type={block.type}
                                title={block.title}
                                description={block.description}
                                onEdit={onEditBlock}
                                onPreview={onPreviewBlock}
                                onDuplicate={onDuplicateBlock}
                                onRemove={onRemoveBlock}
                                required={block.required}
                                active={block.active}
                                tags={block.tags}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SortableContext>

                  <DragOverlay>
                    {activeBlock && (
                      <div className="w-64">
                        <FlowBlockItem
                          id={activeBlock.id}
                          type={activeBlock.type}
                          title={activeBlock.title}
                          description={activeBlock.description}
                          required={activeBlock.required}
                          active={activeBlock.active}
                          tags={activeBlock.tags}
                        />
                      </div>
                    )}
                  </DragOverlay>
                </DndContext>
              </div>

              <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-md flex items-center justify-between">
                <div className="text-sm text-blue-700">
                  <span className="font-medium">Fluxo atual:</span> {blocks.length} {blocks.length === 1 ? 'bloco' : 'blocos'} configurados
                </div>
                
                {flowValidity.valid ? (
                  <Button size="sm" variant="outline" className="text-blue-700 border-blue-200" onClick={onPreviewFlow}>
                    Testar fluxo 
                    <ArrowRight size={14} className="ml-1" />
                  </Button>
                ) : (
                  <span className="text-sm text-amber-600 font-medium flex items-center gap-1">
                    <AlertCircle size={14} />
                    {flowValidity.message}
                  </span>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
