
'use client';

import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
  FileText,
  ZoomIn,
  ZoomOut,
  Download,
  Search,
  Plus,
  Minus,
  Move,
  MousePointer2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const libraryItems = {
  ai: ['AI Model', 'ML Pipeline', 'Agent'],
  cloud: ['Server', 'Database', 'Load Balancer', 'Storage Bucket'],
  dev: ['API Endpoint', 'User', 'Function', 'Container'],
  security: ['Firewall', 'WAF', 'IAM Role', 'VPN'],
};

export function EditorLayout() {
  return (
    <TooltipProvider>
      <div className="grid h-screen w-full">
        <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
            <div className="flex h-full flex-col p-4 gap-4">
                <h2 className="text-xl font-semibold">Component Library</h2>
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search components..." className="pl-10" />
                </div>
              <ScrollArea className="flex-1">
                <Accordion type="multiple" defaultValue={['ai', 'cloud']} className="w-full">
                  <AccordionItem value="ai">
                    <AccordionTrigger>AI & ML</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {libraryItems.ai.map((item) => (
                          <li key={item} className="p-2 rounded-md hover:bg-muted cursor-pointer text-sm">{item}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="cloud">
                    <AccordionTrigger>Cloud</AccordionTrigger>
                    <AccordionContent>
                       <ul className="space-y-2">
                        {libraryItems.cloud.map((item) => (
                          <li key={item} className="p-2 rounded-md hover:bg-muted cursor-pointer text-sm">{item}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="dev">
                    <AccordionTrigger>Development</AccordionTrigger>
                    <AccordionContent>
                       <ul className="space-y-2">
                        {libraryItems.dev.map((item) => (
                          <li key={item} className="p-2 rounded-md hover:bg-muted cursor-pointer text-sm">{item}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="security">
                    <AccordionTrigger>Security</AccordionTrigger>
                    <AccordionContent>
                        <ul className="space-y-2">
                        {libraryItems.security.map((item) => (
                          <li key={item} className="p-2 rounded-md hover:bg-muted cursor-pointer text-sm">{item}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ScrollArea>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={55}>
            <div className="relative flex h-full flex-col items-center justify-center">
              <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-lg border flex items-center gap-2">
                 <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon"><MousePointer2 className="h-4 w-4" /></Button>
                  </TooltipTrigger>
                  <TooltipContent>Select (V)</TooltipContent>
                </Tooltip>
                 <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon"><Move className="h-4 w-4" /></Button>
                  </TooltipTrigger>
                  <TooltipContent>Pan (H)</TooltipContent>
                </Tooltip>
              </div>
               <div className="flex items-center justify-center h-full w-full border-2 border-dashed rounded-lg bg-muted/50">
                  <p className="text-muted-foreground">Infinity Canvas</p>
              </div>
              <div className="absolute bottom-4 right-4 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-lg border flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Input type="text" readOnly value="100%" className="w-16 h-8 text-center" />
                <Button variant="ghost" size="icon">
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
               <div className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-lg border flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Button>
                    <Share className="h-4 w-4 mr-2" />
                    Share
                </Button>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
            <Tabs defaultValue="chat" className="h-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="h-[calc(100%-40px)]">
                 <div className="flex h-full flex-col">
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                             <div className="flex items-start gap-3">
                                <div className="bg-secondary rounded-full p-2">
                                    <Bot className="h-5 w-5 text-secondary-foreground" />
                                </div>
                                <div className="p-3 rounded-lg bg-muted">
                                    <p className="text-sm">Welcome! How can I help you design your architecture today?</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-3 justify-end">
                                <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                                    <p className="text-sm">Create a simple 3-tier web app</p>
                                </div>
                                 <div className="bg-secondary rounded-full p-2">
                                    <SquareUser className="h-5 w-5 text-secondary-foreground" />
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                    <div className="p-4 border-t">
                        <form className="relative">
                        <Textarea
                            placeholder="Ask the AI to modify the diagram..."
                            className="resize-none pr-12"
                        />
                        <Button type="submit" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8">
                            <CornerDownLeft className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                        </form>
                    </div>
                </div>
              </TabsContent>
              <TabsContent value="properties" className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Properties</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="label">Label</Label>
                            <Input id="label" placeholder="Enter component label" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="color">Color</Label>
                            <Input id="color" type="color" defaultValue="#a7c4c4" />
                        </div>
                    </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </TooltipProvider>
  );
}
