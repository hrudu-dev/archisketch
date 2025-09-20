'use client';

import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Header } from '@/components/console/header';
import { ComponentLibrary } from '@/components/console/component-library';
import { AiPanel } from '@/components/console/ai-panel';
import { Canvas } from '@/components/console/canvas';
import type { Diagram, DiagramNode, LibraryComponent } from '@/lib/types';
import { diagramTemplates } from '@/lib/data';

export default function ConsolePage() {
  const [diagram, setDiagram] = useState<Diagram>({ nodes: [], edges: [] });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleNodeMove = useCallback(
    (id: string, newPosition: { x: number; y: number }) => {
      setDiagram((prev) => ({
        ...prev,
        nodes: prev.nodes.map((node) => (node.id === id ? { ...node, position: newPosition } : node)),
      }));
    },
    []
  );
  
  const handleDrop = useCallback((item: LibraryComponent, position: { x: number; y: number }) => {
    const newNode: DiagramNode = {
      id: `${item.id}-${Date.now()}`,
      type: item.id,
      position,
      data: { label: item.name },
    };
    setDiagram((prev) => ({ ...prev, nodes: [...prev.nodes, newNode] }));
  }, []);

  const loadTemplate = useCallback((templateId: string) => {
    const template = diagramTemplates.find(t => t.id === templateId);
    if(template) {
      setDiagram(template.diagram);
      setSelectedNodeId(null);
    }
  }, []);
  
  const updateNodeLabel = useCallback((nodeId: string, newLabel: string) => {
    setDiagram(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => node.id === nodeId ? {...node, data: {...node.data, label: newLabel}} : node)
    }));
  }, []);

  const setGeneratedDiagram = useCallback((newDiagram: Diagram) => {
    setDiagram(newDiagram);
    setSelectedNodeId(null);
  }, []);

  const selectedNode = diagram.nodes.find(n => n.id === selectedNodeId) || null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen w-full flex-col bg-muted/40">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <ComponentLibrary loadTemplate={loadTemplate} />
          <main className="flex-1 relative">
            <Canvas
              diagram={diagram}
              onNodeMove={handleNodeMove}
              onNewComponentDrop={handleDrop}
              onNodeSelect={setSelectedNodeId}
              selectedNodeId={selectedNodeId}
              updateNodeLabel={updateNodeLabel}
            />
          </main>
          <AiPanel 
            diagram={diagram}
            selectedNode={selectedNode}
            setGeneratedDiagram={setGeneratedDiagram}
          />
        </div>
      </div>
    </DndProvider>
  );
}
