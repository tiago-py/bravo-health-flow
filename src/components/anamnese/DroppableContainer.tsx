
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';

interface DroppableContainerProps {
  id: string;
  items: string[];
  children: React.ReactNode;
  className?: string;
  title?: string;
  direction?: 'vertical' | 'horizontal';
  emptyStateMessage?: string;
}

export function DroppableContainer({ 
  id, 
  items, 
  children, 
  className = '',
  title,
  direction = 'vertical',
  emptyStateMessage = 'Arraste itens para esta área'
}: DroppableContainerProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });
  
  const isEmpty = React.Children.count(children) === 0;

  return (
    <SortableContext 
      items={items}
      strategy={direction === 'vertical' ? verticalListSortingStrategy : undefined}
    >
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        ref={setNodeRef} 
        className={`rounded-md border-2 ${
          isOver 
            ? 'border-blue-400 bg-blue-50/30 shadow-md' 
            : isEmpty 
              ? 'border-dashed border-gray-300' 
              : 'border-dashed border-gray-200'
        } p-4 transition-all duration-300 ${
          direction === 'horizontal' ? 'flex gap-4 overflow-x-auto' : ''
        } ${className}`}
      >
        {title && (
          <h3 className="text-sm font-medium text-gray-500 mb-3 sticky left-0">{title}</h3>
        )}
        
        {isEmpty ? (
          <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
            <p>{emptyStateMessage}</p>
          </div>
        ) : children}
      </motion.div>
    </SortableContext>
  );
}
