
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, GripVertical, ImageIcon, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DraggableQuestionProps {
  id: string;
  question: {
    id: string;
    text: string;
    type: string;
    options?: string[];
    imageUrl?: string;
    imageSize?: 'small' | 'medium' | 'large';
  };
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
  onPreview: (id: string) => void;
}

export function DraggableQuestion({ 
  id, 
  question, 
  onRemove, 
  onEdit,
  onPreview
}: DraggableQuestionProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-2">
      <Card className="p-3 shadow-sm border-2 border-gray-100 hover:border-blue-200 transition-all">
        <div className="flex items-start gap-2">
          <div 
            className="cursor-move p-1 rounded hover:bg-gray-100 mt-1"
            {...attributes}
            {...listeners}
          >
            <GripVertical size={16} />
          </div>
          
          <div className="flex-1">
            <div className="font-medium text-gray-800">{question.text}</div>
            <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
              <Badge variant="outline">Tipo: {question.type}</Badge>
              {question.imageUrl && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <ImageIcon size={12} />
                  Imagem ({question.imageSize || 'média'})
                </Badge>
              )}
              {question.options?.length > 0 && (
                <span className="text-xs">{question.options.length} opções</span>
              )}
            </div>
          </div>
          
          <div className="flex gap-1">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={() => onPreview(question.id)}
              className="h-8 w-8"
            >
              <Eye size={16} />
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={() => onEdit(question.id)}
              className="h-8 w-8"
            >
              <span className="sr-only">Editar</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-pencil"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              onClick={() => onRemove(question.id)}
              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <span className="sr-only">Remover</span>
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
