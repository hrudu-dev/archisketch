'use client';

import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

interface CanvasNodeProps {
  id: string;
  position: { x: number; y: number };
  label: string;
  icon: LucideIcon;
  onSelect: (id: string) => void;
  isSelected: boolean;
  updateLabel: (nodeId: string, newLabel: string) => void;
}

export function CanvasNode({ id, position, label, icon: Icon, onSelect, isSelected, updateLabel }: CanvasNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'node',
      item: { id, ...position },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, position]
  );

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedLabel(e.target.value);
  };

  const handleLabelBlur = () => {
    setIsEditing(false);
    updateLabel(id, editedLabel);
  };

  const handleLabelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLabelBlur();
    }
  };

  return (
    <div
      ref={drag}
      className={cn(
        'absolute flex w-40 cursor-move items-center gap-3 rounded-lg border bg-card p-2 text-card-foreground shadow-md transition-all',
        isSelected && !isDragging ? 'ring-2 ring-primary ring-offset-2' : '',
        isDragging ? 'opacity-50' : 'opacity-100'
      )}
      style={{ left: position.x, top: position.y }}
      onMouseDown={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex-shrink-0 rounded-md bg-primary/10 p-2 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 overflow-hidden">
        {isEditing ? (
          <Input 
            value={editedLabel} 
            onChange={handleLabelChange} 
            onBlur={handleLabelBlur}
            onKeyDown={handleLabelKeyDown}
            autoFocus 
            className="h-7 text-sm p-1"/>
        ) : (
          <span className="truncate text-sm font-medium">{label}</span>
        )}
      </div>
    </div>
  );
}
