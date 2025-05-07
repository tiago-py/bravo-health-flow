
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DraggableProps {
  initialPosition: { x: number, y: number };
  onPositionChange: (position: { x: number, y: number }) => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Draggable: React.FC<DraggableProps> = ({
  initialPosition,
  onPositionChange,
  children,
  className = '',
  style = {}
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);
  
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);
  
  const handleDrag = (event: any, info: any) => {
    const newPosition = {
      x: info.point.x - info.offset.x,
      y: info.point.y - info.offset.y,
    };
    
    setPosition(newPosition);
  };
  
  const handleDragEnd = (event: any, info: any) => {
    const newPosition = {
      x: Math.max(0, info.point.x - info.offset.x),
      y: Math.max(0, info.point.y - info.offset.y),
    };
    
    setPosition(newPosition);
    onPositionChange(newPosition);
    setIsDragging(false);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => setIsDragging(true)}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      className={`${className} ${isDragging ? 'z-10' : ''}`}
      style={{
        ...style,
        position: 'absolute',
        left: position.x,
        top: position.y
      }}
    >
      {children}
    </motion.div>
  );
};
