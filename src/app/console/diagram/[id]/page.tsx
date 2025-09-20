
'use client';

import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  PanelLeft,
  PanelRight,
  LayoutDashboard,
  Settings,
  LifeBuoy,
  LogOut,
  FolderKanban,
  ClipboardPlus,
  Home
} from 'lucide-react';
import Link from 'next/link';

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
import { Separator } from '@/components/ui/separator';

function DiagramEditorLayout() {
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
  const { setOpen: setRightSidebarOpen } = useSidebar();
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen w-full flex-col bg-background">
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
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <Link href="/console">
                      <Home />
                      <span className="group-data-[collapsible=icon]:hidden">Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Editor" isActive>
                    <Link href="/console/diagram/1">
                      <LayoutDashboard />
                      <span className="group-data-[collapsible=icon]:hidden">Editor</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Projects">
                    <Link href="/console/projects">
                      <FolderKanban />
                      <span className="group-data-[collapsible=icon]:hidden">Projects</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Templates">
                    <Link href="/console/templates">
                      <ClipboardPlus />
                      <span className="group-data-[collapsible=icon]:hidden">Templates</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              <div className="mt-auto">
                <Separator className="my-2" />
                <ComponentLibrary loadTemplate={loadTemplate} />
              </div>

            </SidebarContent>
            <SidebarFooter>
                <Separator className="my-2" />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Support">
                          <Link href="/console/help">
                            <LifeBuoy />
                            <span className="group-data-[collapsible=icon]:hidden">Support</span>
                          </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Settings">
                            <Link href="/console/settings">
                                <Settings />
                                <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Log Out">
                        <Link href="/">
                          <LogOut />
                          <span className="group-data-[collapsible=icon]:hidden">Log Out</span>
                        </Link>
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

export default function DiagramEditorPage() {
  return (
    <SidebarProvider>
      <DiagramEditorLayout />
    </SidebarProvider>
  );
}
