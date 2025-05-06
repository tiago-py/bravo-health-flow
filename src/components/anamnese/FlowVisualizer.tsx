
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  FileText, 
  CheckCircle, 
  CreditCard,
  Tag, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

// Define block types that match FlowBuilderCanvas
type FlowBlockType = 'question' | 'diagnosis' | 'plan-selection' | 'checkout' | 'conditional' | 'tag' | 'group';

interface FlowBlock {
  id: string;
  type: FlowBlockType;
  title: string;
  description?: string;
}

interface FlowVisualizerProps {
  blocks: FlowBlock[];
  className?: string;
}

function getBlockIcon(type: FlowBlockType): ReactNode {
  switch (type) {
    case 'question':
      return <MessageCircle className="text-blue-600" />;
    case 'diagnosis':
      return <FileText className="text-green-600" />;
    case 'plan-selection':
      return <CheckCircle className="text-amber-600" />;
    case 'checkout':
      return <CreditCard className="text-purple-600" />;
    case 'conditional':
      return <AlertCircle className="text-red-600" />;
    case 'tag':
      return <Tag className="text-gray-600" />;
    default:
      return <MessageCircle className="text-gray-600" />;
  }
}

function getBlockColor(type: FlowBlockType): string {
  switch (type) {
    case 'question':
      return 'border-blue-100 bg-blue-50';
    case 'diagnosis':
      return 'border-green-100 bg-green-50';
    case 'plan-selection':
      return 'border-amber-100 bg-amber-50';
    case 'checkout':
      return 'border-purple-100 bg-purple-50';
    case 'conditional':
      return 'border-red-100 bg-red-50';
    case 'tag':
      return 'border-gray-100 bg-gray-50';
    default:
      return 'border-gray-100 bg-gray-50';
  }
}

function getBlockName(type: FlowBlockType): string {
  switch (type) {
    case 'question':
      return 'Pergunta';
    case 'diagnosis':
      return 'Diagnóstico';
    case 'plan-selection':
      return 'Seleção de Plano';
    case 'checkout':
      return 'Checkout';
    case 'conditional':
      return 'Condicional';
    case 'tag':
      return 'Tag';
    case 'group':
      return 'Grupo';
    default:
      return 'Bloco';
  }
}

export function FlowVisualizer({ blocks, className = '' }: FlowVisualizerProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <Card className="p-8 text-center border-dashed">
        <p className="text-gray-500">Nenhum bloco adicionado ao fluxo</p>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="relative">
        {blocks.map((block, index) => (
          <div key={block.id} className="mb-12 relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className={`rounded-lg border-2 p-4 ${getBlockColor(block.type)}`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-white">
                  {getBlockIcon(block.type)}
                </div>
                <div className="flex-1">
                  <div className="font-medium mb-1 flex items-center gap-2">
                    <span className="text-xs text-gray-500">{index + 1}.</span>
                    <span>{getBlockName(block.type)}</span>
                  </div>
                  <p className="font-medium text-lg">{block.title}</p>
                  {block.description && (
                    <p className="text-sm text-gray-600 mt-1">{block.description}</p>
                  )}
                </div>
                <Button variant="outline" size="sm" className="opacity-0">
                  <ArrowRight size={16} />
                </Button>
              </div>
            </motion.div>
            
            {/* Connector arrow */}
            {index < blocks.length - 1 && (
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 text-gray-300">
                <ArrowRight size={32} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
