
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
import { Plus, GripHorizontal, Eye } from 'lucide-react';

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

  return (
    <div className="w-full mt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GripHorizontal size={18} className="text-gray-400" />
          <h2 className="text-lg font-medium text-gray-700">Blocos do Fluxo</h2>
        </div>
        
        <div className="flex items-center gap-2">
          {onPreviewFlow && (
            <Button onClick={onPreviewFlow} variant="outline" className="gap-2">
              <Eye size={16} />
              Preview
            </Button>
          )}
          <div className="flex gap-1.5">
            <Button size="sm" onClick={() => onAddBlock('question')}>
              <Plus size={16} className="mr-1" />
              Pergunta
            </Button>
            <Button size="sm" variant="outline" onClick={() => onAddBlock('diagnosis')}>
              Diagnóstico
            </Button>
            <Button size="sm" variant="outline" onClick={() => onAddBlock('plan-selection')}>
              Planos
            </Button>
            <Button size="sm" variant="outline" onClick={() => onAddBlock('checkout')}>
              Checkout
            </Button>
          </div>
        </div>
      </div>

      <Card className="p-6 bg-gray-50 border-dashed overflow-x-auto">
        <div className="min-w-[800px]">
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
              <DroppableContainer
                id="flow-canvas"
                items={blocks.map(block => block.id)}
                className="flex gap-4 p-6 min-h-[160px] bg-white rounded-lg"
                title="Ordem do fluxo (arraste para reorganizar)"
              >
                {blocks.map((block) => (
                  <div key={block.id} className="w-[240px] shrink-0">
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
                ))}
                {blocks.length === 0 && (
                  <div className="flex flex-col items-center justify-center w-full h-24 text-gray-400">
                    <p className="mb-2">Adicione blocos ao seu fluxo</p>
                    <Button size="sm" onClick={() => onAddBlock('question')}>
                      <Plus size={16} className="mr-1" />
                      Adicionar Bloco
                    </Button>
                  </div>
                )}
              </DroppableContainer>
            </SortableContext>

            <DragOverlay>
              {activeBlock && (
                <div className="w-[240px]">
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
      </Card>
    </div>
  );
}
