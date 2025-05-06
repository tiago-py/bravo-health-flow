
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
}

export function DroppableContainer({ 
  id, 
  items, 
  children, 
  className = '',
  title
}: DroppableContainerProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <SortableContext 
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        ref={setNodeRef} 
        className={`rounded-md border-2 ${isOver ? 'border-blue-400 bg-blue-50/30' : 'border-dashed border-gray-200'} p-4 min-h-[200px] transition-colors duration-200 ${className}`}
      >
        {title && (
          <h3 className="text-sm font-medium text-gray-500 mb-3">{title}</h3>
        )}
        {children}
      </motion.div>
    </SortableContext>
  );
}
