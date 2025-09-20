
'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { PanelLeft, PanelRight, LayoutDashboard, Settings, LifeBuoy } from 'lucide-react';
import { Header } from '@/components/console/header';
import { ComponentLibrary } from '@/components/console/component-library';
import { AiPanel } from '@/components/console/ai-panel';
import { Canvas } from '@/components/console/canvas';
import type { Diagram, DiagramNode, LibraryComponent } from '@/lib/types';
import { diagramTemplates } from '@/lib/data';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

function ConsoleLayout() {
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
    const template = diagramTemplates.find((t) => t.id === templateId);
    if (template) {
      setDiagram(template.diagram);
      setSelectedNodeId(null);
    }
  }, []);

  const updateNodeLabel = useCallback((nodeId: string, newLabel: string) => {
    setDiagram((prev) => ({
      ...prev,
      nodes: prev.nodes.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, label: newLabel } } : node)),
    }));
  }, []);

  const setGeneratedDiagram = useCallback((newDiagram: Diagram) => {
    setDiagram(newDiagram);
    setSelectedNodeId(null);
  }, []);

  const selectedNode = diagram.nodes.find((n) => n.id === selectedNodeId) || null;
  const { isMobile, setOpenMobile } = useSidebar();
  const { setOpen: setRightSidebarOpen } = useSidebar();

  const handleLoadTemplate = useCallback(
    (id: string) => {
      loadTemplate(id);
      if (isMobile) {
        setOpenMobile(false);
      }
    },
    [loadTemplate, isMobile, setOpenMobile]
  );
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen w-full flex-col bg-muted/40">
        <Header>
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden">
              <PanelLeft />
              <span className="sr-only">Toggle Left Sidebar</span>
            </SidebarTrigger>
             <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setRightSidebarOpen(v => !v)}>
              <PanelRight />
              <span className="sr-only">Toggle Right Sidebar</span>
            </Button>
          </div>
        </Header>
        <div className="flex flex-1">
          <Sidebar side="left" collapsible="icon">
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive>
                    <Link href="/console">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              <Accordion type="multiple" defaultValue={['components']} className="w-full px-2 mt-4">
                  <AccordionItem value="components">
                    <AccordionTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground hover:no-underline p-2 rounded-md">
                      <span>Components</span>
                    </AccordionTrigger>
                    <AccordionContent className="p-0">
                      <ComponentLibrary loadTemplate={handleLoadTemplate} />
                    </AccordionContent>
                  </AccordionItem>
              </Accordion>
            </SidebarContent>
            <SidebarFooter>
                <Separator className="my-2" />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <LifeBuoy />
                            <span>Support</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Settings />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            <Canvas
              diagram={diagram}
              onNodeMove={handleNodeMove}
              onNewComponentDrop={handleDrop}
              onNodeSelect={setSelectedNodeId}
              selectedNodeId={selectedNodeId}
              updateNodeLabel={updateNodeLabel}
            />
          </SidebarInset>

          <Sidebar side="right" collapsible="offcanvas" variant="inset">
             <SidebarContent>
                <AiPanel diagram={diagram} selectedNode={selectedNode} setGeneratedDiagram={setGeneratedDiagram} />
             </SidebarContent>
          </Sidebar>
        </div>
      </div>
    </DndProvider>
  );
}

export default function ConsolePage() {
  return (
    <SidebarProvider>
      <ConsoleLayout />
    </SidebarProvider>
  );
}
