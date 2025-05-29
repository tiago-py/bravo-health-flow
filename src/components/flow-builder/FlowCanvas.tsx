
import { useState, useEffect, useRef } from 'react';
import { FlowBlock } from '@/pages/admin/FlowBuilder';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  HelpCircle, 
  FileText,
  Star, 
  CreditCard,
  ArrowRight,
  LayoutList
} from 'lucide-react';
import { motion } from 'framer-motion';
import FlowBlockComponent from './FlowBlockComponent';
import { toast } from '@/components/ui/sonner';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

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
    
    // Calculate the next position based on existing blocks
    const xPosition = blocks.length > 0 
      ? Math.max(...blocks.map(b => b.position.x)) + 320 
      : 20;
    
    const newBlock: FlowBlock = {
      id: `block-${Date.now()}`,
      type,
      title: blockTitles[type],
      position: { x: xPosition, y: 120 },
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
    
    // Automatically connect this block to the previous one
    let updatedBlocks = [...blocks];
    if (blocks.length > 0) {
      const lastBlockIndex = blocks.length - 1;
      updatedBlocks[lastBlockIndex] = {
        ...blocks[lastBlockIndex],
        next: newBlock.id
      };
    }
    
    setBlocks([...updatedBlocks, newBlock]);
    toast.success(`Etapa ${blocks.length + 1}: ${blockTitles[type]} adicionada!`);
  };
  
  const handleUpdateBlock = (updatedBlock: FlowBlock) => {
    setBlocks(blocks.map(block => 
      block.id === updatedBlock.id ? updatedBlock : block
    ));
  };
  
  const handleDeleteBlock = (id: string) => {
    const blockToDelete = blocks.find(block => block.id === id);
    const blockIndex = blocks.findIndex(block => block.id === id);
    
    let updatedBlocks = blocks.filter(block => block.id !== id);
    
    if (blockIndex > 0) {
      const previousBlock = blocks[blockIndex - 1];
      updatedBlocks = updatedBlocks.map(block => 
        block.id === previousBlock.id 
          ? { ...block, next: blockToDelete?.next || null } 
          : block
      );
    }
    
    setBlocks(updatedBlocks);
    toast.success('Etapa removida!');
  };
  
  const handleConnectBlocks = (sourceId: string, targetId: string) => {
    setBlocks(blocks.map(block => 
      block.id === sourceId ? { ...block, next: targetId } : block
    ));
    toast.success('Conexão criada!');
  };

  const orderedBlocks = [...blocks].sort((a, b) => a.position.x - b.position.x);
  
  const blockTypeIcons = {
    question: <HelpCircle className="h-4 w-4" />,
    diagnosis: <FileText className="h-4 w-4" />,
    plan: <Star className="h-4 w-4" />,
    checkout: <CreditCard className="h-4 w-4" />
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with controls */}
      <div className="bg-white p-4 border-b shrink-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center">
            <LayoutList className="mr-2 h-5 w-5" />
            <h3 className="text-lg font-medium">Etapas do Fluxo</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <div className="flex border rounded-lg bg-white shadow-sm overflow-x-auto">
              <Button
                variant={newBlockType === 'question' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-none first:rounded-l-lg whitespace-nowrap"
                onClick={() => setNewBlockType('question')}
              >
                <HelpCircle className="h-3 w-3 mr-1" />
                Pergunta
              </Button>
              <Button
                variant={newBlockType === 'diagnosis' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-none whitespace-nowrap"
                onClick={() => setNewBlockType('diagnosis')}
              >
                <FileText className="h-3 w-3 mr-1" />
                Diagnóstico
              </Button>
              <Button
                variant={newBlockType === 'plan' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-none whitespace-nowrap"
                onClick={() => setNewBlockType('plan')}
              >
                <Star className="h-3 w-3 mr-1" />
                Plano
              </Button>
              <Button
                variant={newBlockType === 'checkout' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-none last:rounded-r-lg whitespace-nowrap"
                onClick={() => setNewBlockType('checkout')}
              >
                <CreditCard className="h-3 w-3 mr-1" />
                Checkout
              </Button>
            </div>
            <Button 
              onClick={() => handleAddBlock(newBlockType)}
              className="whitespace-nowrap"
              size="sm"
            >
              <Plus className="h-3 w-3 mr-1" />
              Adicionar
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Crie etapas sequenciais para construir o fluxo de anamnese do paciente
        </p>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 bg-gray-50 min-h-full">
          {orderedBlocks.length > 0 ? (
            <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
              {orderedBlocks.map((block, index) => (
                <div key={block.id} className="w-full mb-6 last:mb-0">
                  <div className="flex items-center mb-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="ml-3 text-lg font-medium flex items-center">
                      {blockTypeIcons[block.type]}
                      <span className="ml-2">Etapa {index + 1}: {block.title}</span>
                    </div>
                  </div>
                  
                  <div className="pl-11">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      <Card className="w-full shadow-sm">
                        <CardContent className="p-0">
                          <FlowBlockComponent
                            block={block}
                            onUpdate={handleUpdateBlock}
                            onDelete={handleDeleteBlock}
                            onConnect={handleConnectBlocks}
                            availableBlocks={blocks.filter(b => b.id !== block.id)}
                            tags={flow.tags}
                            isInlineDisplay={true}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    {index < orderedBlocks.length - 1 && (
                      <div className="flex justify-center my-6">
                        <div className="h-12 border-l-2 border-dashed border-gray-300 relative">
                          <ArrowRight className="text-gray-400 absolute -ml-3 mt-8" size={18} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-80 w-full">
              <Card className="p-8 text-center max-w-md">
                <div className="flex flex-col items-center space-y-4">
                  <LayoutList className="h-16 w-16 text-gray-300" />
                  <h3 className="text-lg font-medium">Comece seu fluxo</h3>
                  <p className="text-gray-500 text-sm">
                    Adicione etapas para construir o fluxo de anamnese do paciente.
                    As etapas serão conectadas automaticamente na ordem em que forem adicionadas.
                  </p>
                  <Button onClick={() => handleAddBlock('question')}>
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar Primeira Etapa
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowCanvas;
