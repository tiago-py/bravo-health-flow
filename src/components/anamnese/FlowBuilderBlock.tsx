
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  MessageSquare, 
  CreditCard, 
  Tag as TagIcon,
  Package,
  ShieldCheck,
  AlertTriangle,
  Blocks
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FlowBlockType } from './FlowBuilderCanvas';

interface FlowBuilderBlockProps {
  type: FlowBlockType;
  title: string;
  description?: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export function FlowBuilderBlock({ 
  type, 
  title, 
  description,
  onClick,
  selected = false,
  disabled = false
}: FlowBuilderBlockProps) {
  const getBlockTypeIcon = () => {
    switch(type) {
      case 'question':
        return <MessageSquare className="text-green-600" size={18} />;
      case 'diagnosis':
        return <ShieldCheck className="text-blue-600" size={18} />;
      case 'plan-selection':
        return <Package className="text-amber-600" size={18} />;
      case 'checkout':
        return <CreditCard className="text-purple-600" size={18} />;
      case 'tag':
        return <TagIcon className="text-purple-600" size={18} />;
      case 'conditional':
        return <AlertTriangle className="text-red-600" size={18} />;
      case 'group':
        return <Blocks className="text-indigo-600" size={18} />;
      default:
        return <MessageSquare className="text-gray-600" size={18} />;
    }
  };
  
  const getBlockTypeName = () => {
    switch(type) {
      case 'question':
        return 'Pergunta';
      case 'diagnosis':
        return 'Diagnóstico';
      case 'plan-selection':
        return 'Seleção de Plano';
      case 'checkout':
        return 'Checkout';
      case 'tag':
        return 'Tag';
      case 'conditional':
        return 'Condicional';
      case 'group':
        return 'Grupo';
      default:
        return 'Bloco';
    }
  };
  
  const getBlockTypeColor = () => {
    switch(type) {
      case 'question':
        return 'bg-green-100 text-green-800';
      case 'diagnosis':
        return 'bg-blue-100 text-blue-800';
      case 'plan-selection':
        return 'bg-amber-100 text-amber-800';
      case 'checkout':
        return 'bg-purple-100 text-purple-800';
      case 'tag':
        return 'bg-purple-100 text-purple-800';
      case 'conditional':
        return 'bg-red-100 text-red-800';
      case 'group':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBlockBorderColor = () => {
    switch(type) {
      case 'question':
        return 'border-green-200 hover:border-green-300';
      case 'diagnosis':
        return 'border-blue-200 hover:border-blue-300';
      case 'plan-selection':
        return 'border-amber-200 hover:border-amber-300';
      case 'checkout':
        return 'border-purple-200 hover:border-purple-300';
      case 'tag':
        return 'border-purple-200 hover:border-purple-300';
      case 'conditional':
        return 'border-red-200 hover:border-red-300';
      case 'group':
        return 'border-indigo-200 hover:border-indigo-300';
      default:
        return 'border-gray-200 hover:border-gray-300';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={disabled ? undefined : onClick}
      className={`p-4 rounded-lg border-2 ${getBlockBorderColor()} ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer hover:shadow-md'
      } ${
        selected 
          ? 'border-2 border-blue-500 shadow-md' 
          : ''
      } transition-all duration-200`}
    >
      <div className="flex justify-between items-start mb-2">
        <Badge variant="secondary" className={`${getBlockTypeColor()} flex items-center gap-1`}>
          {getBlockTypeIcon()}
          {getBlockTypeName()}
        </Badge>
      </div>
      
      <h3 className="font-medium text-base line-clamp-1">{title}</h3>
      
      {description && (
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
      )}
      
      {disabled && (
        <div className="mt-2 text-xs text-red-600 font-medium flex items-center gap-1">
          <AlertTriangle size={12} />
          Já existe no fluxo
        </div>
      )}
    </motion.div>
  );
}
