
'use client';

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useActionState,
} from 'react';
import { useFormStatus } from 'react-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Bot,
  CornerDownLeft,
  Download,
  MousePointer2,
  Move,
  Search,
  Share,
  SquareUser,
  ZoomIn,
  ZoomOut,
  Loader,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { cn } from '@/lib/utils';
import { chatAction } from '@/lib/actions';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ItemTypes = {
  COMPONENT: 'component',
};

const libraryItems = {
  ai: ['AI Model', 'ML Pipeline', 'Agent'],
  cloud: ['Server', 'Database', 'Load Balancer', 'Storage Bucket'],
  dev: ['API Endpoint', 'User', 'Function', 'Container'],
  security: ['Firewall', 'WAF', 'IAM Role', 'VPN'],
};

type Message = {
  role: 'user' | 'model';
  content: string;
};

const initialFormState = {
  status: 'idle' as 'idle' | 'success' | 'error',
  error: null as string | null,
  newMessage: null as Message | null,
};

function EditorSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending} className="absolute right-3 top-3 h-8 w-8">
      {pending ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <CornerDownLeft className="h-4 w-4" />
      )}
      <span className="sr-only">Send</span>
    </Button>
  );
}

const DraggableComponent = ({ name }: { name: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <li
      ref={drag}
      className={cn(
        "p-2 rounded-md hover:bg-muted cursor-pointer text-sm",
        isDragging && "opacity-50"
      )}
    >
      {name}
    </li>
  );
};

const DroppedComponent = ({ id, left, top, children }: any) => {
  return (
    <div style={{ left, top }} className="absolute p-2 bg-card border rounded-md shadow-md">
      {children}
    </div>
  );
};

export function EditorLayout() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: 'Welcome! How can I help you design your architecture today?',
    },
  ]);
  const [formState, action] = useActionState(chatAction, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isPending, setIsPending] = useState(false);

  const [droppedComponents, setDroppedComponents] = useState<any[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.COMPONENT,
    drop: (item: { name: string }, monitor) => {
      const canvasBounds = canvasRef.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      if (canvasBounds && clientOffset) {
        const left = clientOffset.x - canvasBounds.left;
        const top = clientOffset.y - canvasBounds.top;
        const newComponent = {
          id: `${item.name}-${Date.now()}`,
          name: item.name,
          top,
          left,
        };
        setDroppedComponents((prev) => [...prev, newComponent]);
      }
    },
  }), [setDroppedComponents]);
  
  drop(canvasRef);

  useEffect(() => {
    if (formState.status === 'success' && formState.newMessage) {
        setMessages(prevMessages => [...prevMessages.slice(0, -1), formState.newMessage as Message]);
        formRef.current?.reset();
    } else if (formState.status === 'error') {
      const errorMessage: Message = { role: 'model', content: `Error: ${formState.error}` };
      setMessages(prevMessages => [...prevMessages.slice(0, -1), errorMessage]);
    }
    setIsPending(false);
  }, [formState]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        setTimeout(() => {
            const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTo({
                    top: viewport.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
  }, [messages]);

  const handleAction = async (formData: FormData) => {
    const userInput = formData.get('message') as string;
    if (!userInput.trim()) return;
    setIsPending(true);

    const userMessage: Message = { role: 'user', content: userInput };
    const loadingMessage: Message = { role: 'model', content: '...' };

    const updatedMessages = [...messages, userMessage, loadingMessage];
    setMessages(updatedMessages);

    const newFormData = new FormData();
    newFormData.append('message', userInput);
    newFormData.append('history', JSON.stringify(messages));

    action(newFormData);
  };


  return (
    <DndProvider backend={HTML5Backend}>
      <TooltipProvider>
        <div className="h-full w-full overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
            <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
              <div className="flex h-full flex-col p-2 gap-2">
                <h2 className="text-lg font-semibold px-2 pt-2">Component Library</h2>
                <div className="relative px-2">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search components..." className="pl-10" />
                </div>
                <ScrollArea className="flex-1 -mx-2">
                  <Accordion type="multiple" defaultValue={['ai', 'cloud']} className="w-full">
                    <AccordionItem value="ai">
                      <AccordionTrigger className="px-4 text-sm">AI & ML</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1 pl-8 pr-4">
                          {libraryItems.ai.map(item => (
                            <DraggableComponent key={item} name={item} />
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="cloud">
                      <AccordionTrigger className="px-4 text-sm">Cloud</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1 pl-8 pr-4">
                          {libraryItems.cloud.map(item => (
                            <DraggableComponent key={item} name={item} />
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="dev">
                      <AccordionTrigger className="px-4 text-sm">Development</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1 pl-8 pr-4">
                          {libraryItems.dev.map(item => (
                            <DraggableComponent key={item} name={item} />
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="security">
                      <AccordionTrigger className="px-4 text-sm">Security</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1 pl-8 pr-4">
                          {libraryItems.security.map(item => (
                            <DraggableComponent key={item} name={item} />
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
              <div className="relative flex h-full flex-col items-center justify-center bg-background m-4 rounded-lg border">
                <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm p-1 rounded-lg border flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MousePointer2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Select (V)</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Move className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Pan (H)</TooltipContent>
                  </Tooltip>
                </div>
                 <div
                    ref={canvasRef}
                    className="h-full w-full relative overflow-hidden"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)',
                      backgroundSize: '20px 20px',
                    }}
                  >
                   {droppedComponents.map((component) => (
                    <DroppedComponent key={component.id} id={component.id} left={component.left} top={component.top}>
                      {component.name}
                    </DroppedComponent>
                  ))}
                </div>
                <div className="absolute bottom-4 right-4 z-10 bg-background/80 backdrop-blur-sm p-1 rounded-lg border flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Input type="text" readOnly value="100%" className="w-16 h-8 text-center" />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm p-1 rounded-lg border flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Export</TooltipContent>
                  </Tooltip>
                  <Button size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
              <Tabs defaultValue="chat" className="flex flex-col h-full">
                <TabsList className="grid w-full grid-cols-2 mt-2 px-2">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="properties">Properties</TabsTrigger>
                </TabsList>
                <TabsContent value="chat" className="flex-1 flex flex-col h-0 overflow-hidden">
                  <div className="flex-1 flex flex-col h-full">
                    <ScrollArea className="flex-1" ref={scrollAreaRef}>
                      <div className="space-y-4 p-4 pr-6">
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={cn(
                              'flex items-start gap-3',
                              message.role === 'user' ? 'justify-end' : ''
                            )}
                          >
                            {message.role === 'model' && (
                              <div className="bg-primary rounded-full p-2">
                                <Bot className="h-5 w-5 text-primary-foreground" />
                              </div>
                            )}
                            <div
                              className={cn(
                                'p-3 rounded-lg max-w-[85%]',
                                message.role === 'user'
                                  ? 'bg-muted'
                                  : message.content.startsWith('Error:')
                                  ? 'bg-destructive/20 text-destructive'
                                  : 'bg-secondary'
                              )}
                            >
                               {message.content === '...' ? (
                                  <Loader className="h-5 w-5 animate-spin" />
                                ) : (
                                  <p className="text-sm">{message.content.replace(/^Error: /, '')}</p>
                                )}
                            </div>
                            {message.role === 'user' && (
                              <div className="bg-secondary rounded-full p-2">
                                <SquareUser className="h-5 w-5 text-secondary-foreground" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="p-4 border-t">
                       {formState.status === 'error' && formState.error && !isPending && (
                          <Alert variant="destructive" className="mb-4">
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>
                                  {formState.error.replace('Failed to get a response from the chatbot.', '')}
                              </AlertDescription>
                          </Alert>
                      )}
                      <form
                          ref={formRef}
                          action={handleAction}
                          onSubmit={(e) => {
                              e.preventDefault();
                              handleAction(new FormData(e.currentTarget));
                          }}
                          className="relative"
                      >
                        <Textarea
                          name="message"
                          placeholder="Ask the AI to modify the diagram..."
                          className="resize-none pr-12"
                          autoComplete="off"
                          disabled={isPending}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              formRef.current?.requestSubmit();
                            }
                          }}
                        />
                        <EditorSubmitButton />
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
                        <Input id="color" type="color" defaultValue="#a7c4c4" className="p-1" />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </TooltipProvider>
    </DndProvider>
  );
}
