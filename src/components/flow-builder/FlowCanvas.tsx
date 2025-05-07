
import { useState, useEffect, useRef } from 'react';
import { FlowBlock } from '@/pages/admin/FlowBuilder';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  HelpCircle, 
  FileText,
  Star, 
  CreditCard,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import FlowBlockComponent from './FlowBlockComponent';
import { toast } from '@/components/ui/sonner';

interface FlowCanvasProps {
  flow: {
    id: string;
    name: string;
    blocks: FlowBlock[];
    tags: string[];
  };
  setFlow: (flow: any) => void;
}

const FlowCanvas = ({ flow, setFlow }: FlowCanvasProps) => {
  const [blocks, setBlocks] = useState<FlowBlock[]>(flow.blocks);
  const [draggingBlock, setDraggingBlock] = useState<FlowBlock | null>(null);
  const [isDraggingNew, setIsDraggingNew] = useState(false);
  const [newBlockType, setNewBlockType] = useState<'question' | 'diagnosis' | 'plan' | 'checkout'>('question');
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Update local blocks when flow blocks change
  useEffect(() => {
    setBlocks(flow.blocks);
  }, [flow.blocks]);
  
  // Update parent flow when blocks change
  useEffect(() => {
    setFlow({
      ...flow,
      blocks: blocks
    });
  }, [blocks]);
  
  const handleAddBlock = (type: 'question' | 'diagnosis' | 'plan' | 'checkout') => {
    const blockTitles = {
      question: 'Nova Pergunta',
      diagnosis: 'Diagnóstico',
      plan: 'Plano Recomendado',
      checkout: 'Checkout e Pagamento'
    };
    
    const newBlock: FlowBlock = {
      id: `block-${Date.now()}`,
      type,
      title: blockTitles[type],
      position: { x: blocks.length * 260, y: 100 },
      data: {},
      next: null
    };
    
    if (type === 'question') {
      newBlock.data = {
        questionType: 'text',
        question: 'Digite sua pergunta aqui',
        options: [],
        required: true,
        tagRules: []
      };
    } else if (type === 'diagnosis') {
      newBlock.data = {
        title: 'Diagnóstico Personalizado',
        description: 'Com base nas suas respostas, identificamos o seguinte:',
        phase: 'Fase Inicial',
        duration: '1-2 meses',
        icon: 'shield',
        requiredTags: [],
        tagLogic: 'AND'
      };
    } else if (type === 'plan') {
      newBlock.data = {
        title: 'Plano Recomendado',
        description: 'Este é o plano ideal para o seu caso:',
        price: 299.90,
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
        tagRequirements: [],
        tagLogic: 'AND',
        buttonText: 'Quero esse plano'
      };
    } else if (type === 'checkout') {
      newBlock.data = {
        title: 'Finalizar Pedido',
        description: 'Você está a um passo de iniciar seu tratamento',
        termsRequired: true,
        collectShipping: false,
        successRedirect: '/confirmacao'
      };
    }
    
    setBlocks([...blocks, newBlock]);
    toast.success(`Bloco de ${blockTitles[type]} adicionado!`);
  };
  
  const handleUpdateBlock = (updatedBlock: FlowBlock) => {
    setBlocks(blocks.map(block => 
      block.id === updatedBlock.id ? updatedBlock : block
    ));
  };
  
  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
    // Also remove any connections to this block
    setBlocks(prevBlocks => prevBlocks.map(block => ({
      ...block,
      next: block.next === id ? null : block.next
    })));
    toast.success('Bloco removido!');
  };
  
  const handleConnectBlocks = (sourceId: string, targetId: string) => {
    setBlocks(blocks.map(block => 
      block.id === sourceId ? { ...block, next: targetId } : block
    ));
  };

  return (
    <div className="relative h-full overflow-auto bg-gray-50 p-4" ref={canvasRef}>
      <div className="absolute top-4 left-4 z-10">
        <Tabs defaultValue="question" className="bg-white border rounded-lg shadow-sm">
          <TabsList>
            <TabsTrigger value="question" onClick={() => setNewBlockType('question')}>
              <HelpCircle className="h-4 w-4 mr-1" />
              Pergunta
            </TabsTrigger>
            <TabsTrigger value="diagnosis" onClick={() => setNewBlockType('diagnosis')}>
              <FileText className="h-4 w-4 mr-1" />
              Diagnóstico
            </TabsTrigger>
            <TabsTrigger value="plan" onClick={() => setNewBlockType('plan')}>
              <Star className="h-4 w-4 mr-1" />
              Plano
            </TabsTrigger>
            <TabsTrigger value="checkout" onClick={() => setNewBlockType('checkout')}>
              <CreditCard className="h-4 w-4 mr-1" />
              Checkout
            </TabsTrigger>
          </TabsList>
          <div className="p-2">
            <Button 
              size="sm"
              onClick={() => handleAddBlock(newBlockType)}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-1" />
              Adicionar {newBlockType === 'question' ? 'Pergunta' : 
                        newBlockType === 'diagnosis' ? 'Diagnóstico' : 
                        newBlockType === 'plan' ? 'Plano' : 'Checkout'}
            </Button>
          </div>
        </Tabs>
      </div>
      
      {/* Workspace area */}
      <div className="relative w-[2000px] h-[800px]">
        {/* Draw connections between blocks */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {blocks.map(block => {
            if (block.next) {
              const source = block;
              const target = blocks.find(b => b.id === block.next);
              if (target) {
                const startX = source.position.x + 240;
                const startY = source.position.y + 60;
                const endX = target.position.x;
                const endY = target.position.y + 60;
                
                return (
                  <g key={`connection-${source.id}-${target.id}`}>
                    <path
                      d={`M${startX},${startY} C${startX + 50},${startY} ${endX - 50},${endY} ${endX},${endY}`}
                      stroke="#94a3b8"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="0"
                    />
                    {/* Arrow */}
                    <circle cx={endX} cy={endY} r="4" fill="#94a3b8" />
                  </g>
                );
              }
            }
            return null;
          })}
        </svg>
        
        {/* Blocks */}
        {blocks.map(block => (
          <FlowBlockComponent
            key={block.id}
            block={block}
            onUpdate={handleUpdateBlock}
            onDelete={handleDeleteBlock}
            onConnect={handleConnectBlocks}
            availableBlocks={blocks.filter(b => b.id !== block.id)}
            tags={flow.tags}
          />
        ))}
        
        {/* Empty state */}
        {blocks.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Card className="p-8 text-center max-w-md">
              <div className="flex flex-col items-center space-y-4">
                <ArrowRight className="h-16 w-16 text-gray-300" />
                <h3 className="text-lg font-medium">Comece seu fluxo</h3>
                <p className="text-gray-500">
                  Adicione blocos de perguntas, diagnóstico, planos e checkout para construir o fluxo de anamnese.
                </p>
                <Button onClick={() => handleAddBlock('question')}>
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar Primeiro Bloco
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlowCanvas;
