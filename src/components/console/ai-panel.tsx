'use client';

import React from 'react';
import { useActionState } from 'react';
import { Bot, Lightbulb, SlidersHorizontal, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateDiagramAction, suggestAction } from '@/lib/actions';
import type { Diagram, DiagramNode } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface AiPanelProps {
  diagram: Diagram;
  selectedNode: DiagramNode | null;
  setGeneratedDiagram: (diagram: Diagram) => void;
}

function GenerateForm({ setGeneratedDiagram }: { setGeneratedDiagram: (diagram: Diagram) => void }) {
  const [state, formAction] = useActionState(generateDiagramAction, { status: 'idle' });

  React.useEffect(() => {
    if (state.status === 'success' && state.diagram) {
      setGeneratedDiagram(state.diagram);
    }
  }, [state, setGeneratedDiagram]);

  return (
    <form action={formAction} className="space-y-4 p-1">
      <Textarea
        name="prompt"
        placeholder="e.g., A 3-tier web application with a load balancer..."
        className="min-h-[100px] font-mono text-sm"
      />
      <Button type="submit" className="w-full">
        <Bot className="mr-2 h-4 w-4" />
        Generate Diagram
      </Button>
      {state.status === 'error' && <p className="text-sm text-destructive">{state.error}</p>}
    </form>
  );
}

function SuggestionForm({ diagram }: { diagram: Diagram }) {
    const [state, formAction] = useActionState(suggestAction, { status: 'idle' });

    const canvasContext = `Current diagram has ${diagram.nodes.length} nodes and ${diagram.edges.length} edges. Nodes: ${diagram.nodes.map(n => n.data.label).join(', ')}`;

    return (
        <form action={formAction} className="space-y-4 p-1">
            <input type="hidden" name="canvasContext" value={canvasContext} />
            <Textarea
                name="userInput"
                placeholder="e.g., 'add authentication' or 'how can I improve scalability?'"
                className="min-h-[80px] font-mono text-sm"
            />
            <Button type="submit" className="w-full">
                <Lightbulb className="mr-2 h-4 w-4" />
                Get Suggestions
            </Button>
            {state.status === 'success' && state.suggestions && (
                <Card className="bg-muted/50">
                    <CardContent className="p-4 space-y-3 text-sm">
                        <p className="font-semibold">Explanation:</p>
                        <p className="text-muted-foreground">{state.suggestions.explanation}</p>
                        
                        <p className="font-semibold pt-2">Suggested Components:</p>
                        <ul className="list-disc list-inside text-muted-foreground">
                            {state.suggestions.suggestedComponents.map((c: string) => <li key={c}>{c}</li>)}
                        </ul>

                        <p className="font-semibold pt-2">Suggested Connections:</p>
                        <ul className="list-disc list-inside text-muted-foreground">
                            {state.suggestions.suggestedConnections.map((c: string) => <li key={c}>{c}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            )}
            {state.status === 'error' && <p className="text-sm text-destructive">{state.error}</p>}
        </form>
    );
}

function PropertiesPanel({ selectedNode }: { selectedNode: DiagramNode | null }) {
  if (!selectedNode) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <SlidersHorizontal className="h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-sm text-muted-foreground">Select a component on the canvas to view and edit its properties.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="node-label">Label</Label>
        <div className="relative">
            <Pencil className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="node-label" value={selectedNode.data.label} readOnly className="pl-10" />
        </div>
        <p className="text-xs text-muted-foreground">Double-click the node on the canvas to edit its label.</p>
      </div>
       <div className="space-y-2">
        <Label htmlFor="node-id">Node ID</Label>
        <Input id="node-id" value={selectedNode.id} readOnly />
      </div>
       <div className="space-y-2">
        <Label htmlFor="node-type">Type</Label>
        <Input id="node-type" value={selectedNode.type} readOnly />
      </div>
    </div>
  );
}

export function AiPanel({ diagram, selectedNode, setGeneratedDiagram }: AiPanelProps) {
  return (
    <aside className="flex h-full w-full flex-col bg-background">
      <Tabs defaultValue="ai-assistant" className="flex-1 flex flex-col">
        <div className="p-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
          </TabsList>
        </div>
        <ScrollArea className="flex-1">
          <TabsContent value="ai-assistant" className="mt-0 p-2">
            <div className="space-y-6">
                <h3 className="text-base font-semibold px-2 pt-2">Generate</h3>
                <GenerateForm setGeneratedDiagram={setGeneratedDiagram} />
                <h3 className="text-base font-semibold px-2 pt-4">Suggestions</h3>
                <SuggestionForm diagram={diagram} />
            </div>
          </TabsContent>
          <TabsContent value="properties" className="mt-0">
            <PropertiesPanel selectedNode={selectedNode} />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </aside>
  );
}
