
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, FileText, Tag, GripVertical, Check, 
  Eye, Copy, Edit, Trash2, GripHorizontal, Blocks, 
  CreditCard, AlertTriangle, ShieldCheck, Package
} from 'lucide-react';
import { cn } from '@/lib/utils';

type BlockType = 'question' | 'diagnosis' | 'plan-selection' | 'checkout' | 'conditional' | 'tag' | 'group';

interface FlowBlockItemProps {
  id: string;
  type: BlockType;
  title: string;
  description?: string;
  onEdit?: (id: string) => void;
  onPreview?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onRemove?: (id: string) => void;
  disabled?: boolean;
  required?: boolean;
  active?: boolean;
  error?: boolean;
  tags?: string[];
}

export function FlowBlockItem({
  id,
  type,
  title,
  description,
  onEdit,
  onPreview,
  onDuplicate,
  onRemove,
  disabled = false,
  required = false,
  active = true,
  error = false,
  tags = []
}: FlowBlockItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  const getIcon = () => {
    switch (type) {
      case 'question':
        return <MessageSquare size={16} className="text-green-600" />;
      case 'diagnosis':
        return <ShieldCheck size={16} className="text-blue-600" />;
      case 'plan-selection':
        return <Package size={16} className="text-amber-600" />;
      case 'checkout':
        return <CreditCard size={16} className="text-green-600" />;
      case 'conditional':
        return <AlertTriangle size={16} className="text-red-600" />;
      case 'tag':
        return <Tag size={16} className="text-purple-600" />;
      case 'group':
        return <Blocks size={16} className="text-indigo-600" />;
      default:
        return <MessageSquare size={16} className="text-green-600" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'question':
        return 'Pergunta';
      case 'diagnosis':
        return 'Diagnóstico';
      case 'plan-selection':
        return 'Planos';
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
  };
  
  const getBlockClasses = () => {
    switch (type) {
      case 'question':
        return 'border-green-200 hover:border-green-300';
      case 'diagnosis':
        return 'border-blue-200 hover:border-blue-300';
      case 'plan-selection':
        return 'border-amber-200 hover:border-amber-300';
      case 'checkout':
        return 'border-green-200 hover:border-green-300';
      case 'conditional':
        return 'border-red-200 hover:border-red-300';
      case 'tag':
        return 'border-purple-200 hover:border-purple-300';
      case 'group':
        return 'border-indigo-200 hover:border-indigo-300';
      default:
        return 'border-gray-200 hover:border-gray-300';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'question':
        return 'bg-green-100 text-green-800';
      case 'diagnosis':
        return 'bg-blue-100 text-blue-800';
      case 'plan-selection':
        return 'bg-amber-100 text-amber-800';
      case 'checkout':
        return 'bg-green-100 text-green-800';
      case 'conditional':
        return 'bg-red-100 text-red-800';
      case 'tag':
        return 'bg-purple-100 text-purple-800';
      case 'group':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className={cn(
        "border-2 transition-all shadow-sm",
        getBlockClasses(),
        isDragging ? "shadow-md z-50" : "",
        disabled ? "opacity-60" : "",
        !active ? "border-dashed opacity-70" : "",
        error ? "border-red-300" : ""
      )}
    >
      <CardHeader className="p-3 pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div 
            {...attributes} 
            {...listeners}
            className="cursor-grab p-1 hover:bg-gray-100 rounded-md"
          >
            <GripVertical size={14} className="text-gray-400" />
          </div>
          
          <div className="flex items-center gap-1.5">
            <span className={cn("bg-gray-100 p-1 rounded-md", getTypeColor())}>
              {getIcon()}
            </span>
            <Badge variant="outline" className={cn("font-normal text-xs", getTypeColor())}>
              {getTypeLabel()}
            </Badge>
            {required && (
              <Badge variant="secondary" className="text-xs bg-red-50 text-red-600 border-red-200">
                Obrigatório
              </Badge>
            )}
            {!active && (
              <Badge variant="secondary" className="text-xs">
                Inativo
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {onPreview && (
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => onPreview(id)}>
              <Eye size={14} />
            </Button>
          )}
          {onEdit && (
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => onEdit(id)}>
              <Edit size={14} />
            </Button>
          )}
          {onDuplicate && type !== 'checkout' && (
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => onDuplicate(id)}>
              <Copy size={14} />
            </Button>
          )}
          {onRemove && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0 hover:text-red-500" 
              onClick={() => onRemove(id)}
            >
              <Trash2 size={14} />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-3 pt-0">
        <h3 className="font-medium text-sm mb-1">{title}</h3>
        {description && (
          <p className="text-gray-500 text-xs line-clamp-2">{description}</p>
        )}
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="text-xs px-1.5 py-0">
                <Tag size={10} className="mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
