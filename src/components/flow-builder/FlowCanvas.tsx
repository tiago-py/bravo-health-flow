
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
  LayoutList,
  ChevronDown
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
    // Position horizontally in sequence with appropriate spacing
    const xPosition = blocks.length > 0 
      ? Math.max(...blocks.map(b => b.position.x)) + 320 
      : 20;
    
    const newBlock: FlowBlock = {
      id: `block-${Date.now()}`,
      type,
      title: blockTitles[type],
      position: { x: xPosition, y: 120 }, // Fixed Y position for horizontal alignment
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
    // Update connections before deleting
    const blockToDelete = blocks.find(block => block.id === id);
    const blockIndex = blocks.findIndex(block => block.id === id);
    
    let updatedBlocks = blocks.filter(block => block.id !== id);
    
    // If a block points to this one, update it to point to the next block in the chain
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

  // Group blocks by their sequential order for the step-by-step display
  const orderedBlocks = [...blocks].sort((a, b) => {
    // Sort by their X position (which represents their order)
    return a.position.x - b.position.x;
  });
  
  const blockTypeIcons = {
    question: <HelpCircle className="h-5 w-5" />,
    diagnosis: <FileText className="h-5 w-5" />,
    plan: <Star className="h-5 w-5" />,
    checkout: <CreditCard className="h-5 w-5" />
  };

  return (
    <ResizablePanelGroup direction="vertical" className="h-full">
      <ResizablePanel className="min-h-[100px]">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium flex items-center">
              <LayoutList className="mr-2 h-5 w-5" />
              Etapas do Fluxo
            </h3>
            <div className="flex gap-2">
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
              </Tabs>
              <Button 
                onClick={() => handleAddBlock(newBlockType)}
                className="whitespace-nowrap"
              >
                <Plus className="h-4 w-4 mr-1" />
                Adicionar Etapa
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Crie etapas sequenciais para construir o fluxo de anamnese do paciente
          </p>
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={75} className="overflow-auto">
        <div className="relative min-h-[600px] p-6 bg-gray-50" ref={canvasRef}>
          {/* Timeline representation of the flow */}
          <div className="flex flex-col items-center">
            {orderedBlocks.length > 0 ? (
              <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
                {orderedBlocks.map((block, index) => (
                  <div key={block.id} className="w-full mb-8">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="ml-3 text-lg font-medium flex items-center">
                        {blockTypeIcons[block.type]}
                        <span className="ml-2">Etapa {index + 1}: {block.title}</span>
                      </div>
                    </div>
                    
                    <div className="pl-12">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                      >
                        <Card className="w-full shadow">
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
                      
                      {/* Arrow connector if not the last block */}
                      {index < orderedBlocks.length - 1 && (
                        <div className="flex justify-center my-4">
                          <div className="h-16 border-l-2 border-dashed border-gray-300"></div>
                          <ArrowRight className="text-gray-400 absolute -ml-2 mt-8" size={20} />
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
                    <p className="text-gray-500">
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
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default FlowCanvas;
