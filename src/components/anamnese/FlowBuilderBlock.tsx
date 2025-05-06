
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  MessageCircle, 
  CreditCard, 
  Tag as TagIcon,
  Package
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
        return <MessageCircle className="text-blue-600" size={18} />;
      case 'diagnosis':
        return <FileText className="text-green-600" size={18} />;
      case 'plan-selection':
        return <Package className="text-amber-600" size={18} />;
      case 'checkout':
        return <CreditCard className="text-purple-600" size={18} />;
      case 'tag':
        return <TagIcon className="text-gray-600" size={18} />;
      default:
        return <MessageCircle className="text-gray-600" size={18} />;
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
        return 'bg-blue-100 text-blue-800';
      case 'diagnosis':
        return 'bg-green-100 text-green-800';
      case 'plan-selection':
        return 'bg-amber-100 text-amber-800';
      case 'checkout':
        return 'bg-purple-100 text-purple-800';
      case 'tag':
        return 'bg-gray-100 text-gray-800';
      case 'conditional':
        return 'bg-red-100 text-red-800';
      case 'group':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={disabled ? undefined : onClick}
      className={`p-4 rounded-lg ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer hover:shadow-md'
      } ${
        selected 
          ? 'border-2 border-blue-500 shadow-md' 
          : 'border border-gray-200'
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
    </motion.div>
  );
}
