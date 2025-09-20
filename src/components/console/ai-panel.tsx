'use client';

import React from 'react';
import { useActionState } from 'react';
import { Bot, Lightbulb } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateDiagramAction, suggestAction } from '@/lib/actions';
import type { Diagram, DiagramNode } from '@/lib/types';

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
    <form action={formAction} className="space-y-4">
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
        <form action={formAction} className="space-y-4">
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

export function AiPanel({ diagram, setGeneratedDiagram }: AiPanelProps) {
  return (
    <aside className="flex h-full w-full flex-col bg-background">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          <Accordion type="single" collapsible defaultValue="generate" className="w-full">
            <AccordionItem value="generate">
              <AccordionTrigger className="text-base font-semibold">AI Diagram Generation</AccordionTrigger>
              <AccordionContent>
                <GenerateForm setGeneratedDiagram={setGeneratedDiagram} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="suggest">
              <AccordionTrigger className="text-base font-semibold">Contextual Suggestions</AccordionTrigger>
              <AccordionContent>
                <SuggestionForm diagram={diagram} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
    </aside>
  );
}
