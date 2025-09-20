
'use client';

import { useDrag } from 'react-dnd';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { componentLibrary, diagramTemplates } from '@/lib/data';
import type { LibraryComponent, ComponentCategory } from '@/lib/types';
import { Button } from '../ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const DraggableComponent = ({ component }: { component: LibraryComponent }) => {
  const [, drag] = useDrag(() => ({
    type: 'component',
    item: component,
  }));

  return (
    <div
      ref={drag}
      className="flex cursor-grab items-center gap-3 rounded-lg border bg-card p-2 text-card-foreground transition-all hover:bg-accent hover:text-accent-foreground active:cursor-grabbing"
    >
      <div className="p-1.5 bg-muted rounded-md">
        <component.icon className="h-5 w-5" />
      </div>
      <span className="font-medium text-sm">{component.name}</span>
    </div>
  );
};

export function ComponentLibrary({ loadTemplate }: { loadTemplate: (id: string) => void }) {
  const categories: ComponentCategory[] = ['AI', 'Cloud', 'Dev', 'Security', 'Data'];

  return (
      <div className="flex-1 px-2">
        <Tabs defaultValue="components">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          <TabsContent value="components" className="mt-2">
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <Accordion type="multiple" defaultValue={['Cloud', 'Dev', 'AI']} className="w-full">
                {categories.map((category) => (
                  <AccordionItem value={category} key={category}>
                    <AccordionTrigger className="text-sm font-medium p-2 rounded-md hover:no-underline">
                      <span>{category}</span>
                    </AccordionTrigger>
                    <AccordionContent className="p-0">
                       <div className="grid grid-cols-1 gap-2 p-2 pt-0">
                        {componentLibrary
                          .filter((c) => c.category === category)
                          .map((component) => (
                            <DraggableComponent key={component.id} component={component} />
                          ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="templates" className="mt-2">
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <div className="space-y-3 p-2">
                {diagramTemplates.map(template => (
                  <Card key={template.id}>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription className="text-xs">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <Button size="sm" className="w-full" onClick={() => loadTemplate(template.id)}>Load Template</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
  );
}
