'use client';

import { useDrag } from 'react-dnd';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { componentLibrary, diagramTemplates } from '@/lib/data';
import type { LibraryComponent, ComponentCategory } from '@/lib/types';
import { Button } from '../ui/button';

const DraggableComponent = ({ component }: { component: LibraryComponent }) => {
  const [, drag] = useDrag(() => ({
    type: 'component',
    item: component,
  }));

  return (
    <div
      ref={drag}
      className="flex cursor-grab items-center gap-3 rounded-lg border bg-card p-3 text-card-foreground transition-all hover:bg-accent hover:text-accent-foreground active:cursor-grabbing"
    >
      <component.icon className="h-6 w-6" />
      <span className="font-medium">{component.name}</span>
    </div>
  );
};

export function ComponentLibrary({ loadTemplate }: { loadTemplate: (id: string) => void }) {
  const categories: ComponentCategory[] = ['AI', 'Cloud', 'Dev', 'Security', 'Data'];

  return (
    <aside className="flex h-full w-full flex-col bg-background">
      <div className="flex-1 p-4">
        <Tabs defaultValue="components">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          <TabsContent value="components">
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <div className="space-y-4 pt-4">
                {categories.map((category) => (
                  <div key={category}>
                    <h3 className="mb-2 text-sm font-semibold text-muted-foreground">{category}</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {componentLibrary
                        .filter((c) => c.category === category)
                        .map((component) => (
                          <DraggableComponent key={component.id} component={component} />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="templates">
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <div className="space-y-3 pt-4">
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
    </aside>
  );
}
