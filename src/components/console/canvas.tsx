'use client';

import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { CanvasNode } from './canvas-node';
import type { Diagram, LibraryComponent } from '@/lib/types';
import { componentLibrary } from '@/lib/data';

interface CanvasProps {
  diagram: Diagram;
  onNodeMove: (id: string, position: { x: number; y: number }) => void;
  onNewComponentDrop: (item: LibraryComponent, position: { x: number; y: number }) => void;
  onNodeSelect: (id: string | null) => void;
  selectedNodeId: string | null;
  updateNodeLabel: (nodeId: string, newLabel: string) => void;
}

export function Canvas({ diagram, onNodeMove, onNewComponentDrop, onNodeSelect, selectedNodeId, updateNodeLabel }: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(
    () => ({
      accept: ['component', 'node'],
      drop: (item: any, monitor) => {
        const itemType = monitor.getItemType();

        if (itemType === 'component') {
          const canvasBounds = canvasRef.current?.getBoundingClientRect();
          const clientOffset = monitor.getClientOffset();
          if (canvasBounds && clientOffset) {
            const x = clientOffset.x - canvasBounds.left;
            const y = clientOffset.y - canvasBounds.top;
            onNewComponentDrop(item as LibraryComponent, { x, y });
          }
        } else if (itemType === 'node') {
          const delta = monitor.getDifferenceFromInitialOffset();
          if (delta) {
            const x = Math.round(item.x + delta.x);
            const y = Math.round(item.y + delta.y);
            onNodeMove(item.id, { x, y });
          }
        }
      },
    }),
    [onNewComponentDrop, onNodeMove]
  );

  const getNodeCenter = (nodeId: string) => {
    const node = diagram.nodes.find(n => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };
    // Assuming node width of 160 and height of 56
    return { x: node.position.x + 80, y: node.position.y + 28 };
  };

  return (
    <div
      id="diagram-canvas"
      ref={(el) => {
        canvasRef.current = el;
        drop(el);
      }}
      className="h-full w-full bg-white relative overflow-hidden"
      onClick={(e) => {
        if (e.target === canvasRef.current) {
          onNodeSelect(null);
        }
      }}
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)',
        backgroundSize: '20px 20px',
      }}
    >
      <svg className="absolute top-0 left-0 h-full w-full pointer-events-none">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--muted-foreground))" />
          </marker>
        </defs>
        {diagram.edges.map(edge => {
          const sourceCenter = getNodeCenter(edge.source);
          const targetCenter = getNodeCenter(edge.target);
          return (
            <line
              key={edge.id}
              x1={sourceCenter.x}
              y1={sourceCenter.y}
              x2={targetCenter.x}
              y2={targetCenter.y}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          );
        })}
      </svg>

      {diagram.nodes.map(node => {
        const component = componentLibrary.find(c => c.id === node.type);
        if (!component) return null;
        return (
          <CanvasNode
            key={node.id}
            id={node.id}
            position={node.position}
            label={node.data.label}
            icon={component.icon}
            onSelect={onNodeSelect}
            isSelected={node.id === selectedNodeId}
            updateLabel={updateNodeLabel}
          />
        );
      })}
    </div>
  );
}
