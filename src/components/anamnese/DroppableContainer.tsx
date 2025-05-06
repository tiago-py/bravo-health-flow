
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface DroppableContainerProps {
  id: string;
  items: string[];
  children: React.ReactNode;
}

export function DroppableContainer({ id, items, children }: DroppableContainerProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext 
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div 
        ref={setNodeRef} 
        className="rounded-md border-2 border-dashed border-gray-200 p-4 min-h-[200px]"
      >
        {children}
      </div>
    </SortableContext>
  );
}
