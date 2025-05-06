
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DraggableQuestion } from './DraggableQuestion';

interface SortableQuestionProps {
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

export function SortableQuestion(props: SortableQuestionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <DraggableQuestion
        id={props.id}
        question={props.question}
        onRemove={props.onRemove}
        onEdit={props.onEdit}
        onPreview={props.onPreview}
        {...attributes}
        {...listeners}
      />
    </div>
  );
}
