
'use client';

import {
  useState,
  useRef,
  useEffect,
  useActionState,
} from 'react';
import { useFormStatus } from 'react-dom';
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
  status: 'idle',
  message: '',
  chatHistory: [],
};

function EditorSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending} className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8">
      {pending ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <CornerDownLeft className="h-4 w-4" />
      )}
      <span className="sr-only">Send</span>
    </Button>
  );
}

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

  useEffect(() => {
    if (formState.status === 'success' && formState.newMessage) {
      setMessages(prevMessages => [...prevMessages, formState.newMessage as Message]);
      formRef.current?.reset();
    }
  }, [formState]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        setTimeout(() => {
            if (scrollAreaRef.current) {
                scrollAreaRef.current.scrollTo({
                    top: scrollAreaRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
  }, [messages]);

  const handleAction = async (formData: FormData) => {
    const userInput = formData.get('message') as string;
    if (!userInput.trim()) return;

    const userMessage: Message = { role: 'user', content: userInput };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    const newFormData = new FormData();
    newFormData.append('message', userInput);
    newFormData.append('history', JSON.stringify(messages)); // Pass current messages

    action(newFormData);
  };


  return (
    <TooltipProvider>
      <div className="h-full w-full">
        <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
            <div className="flex h-full flex-col p-4 gap-4">
              <h2 className="text-xl font-semibold">Component Library</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search components..." className="pl-10" />
              </div>
              <ScrollArea className="flex-1 -mx-4">
                <Accordion type="multiple" defaultValue={['ai', 'cloud']} className="w-full">
                  <AccordionItem value="ai">
                    <AccordionTrigger className="px-4">AI & ML</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 px-4">
                        {libraryItems.ai.map(item => (
                          <li key={item} className="p-2 rounded-md hover:bg-muted cursor-pointer text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="cloud">
                    <AccordionTrigger className="px-4">Cloud</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 px-4">
                        {libraryItems.cloud.map(item => (
                          <li key={item} className="p-2 rounded-md hover:bg-muted cursor-pointer text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="dev">
                    <AccordionTrigger className="px-4">Development</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 px-4">
                        {libraryItems.dev.map(item => (
                          <li key={item} className="p-2 rounded-md hover:bg-muted cursor-pointer text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="security">
                    <AccordionTrigger className="px-4">Security</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 px-4">
                        {libraryItems.security.map(item => (
                          <li key={item} className="p-2 rounded-md hover:bg-muted cursor-pointer text-sm">
                            {item}
                          </li>
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
                    <Button variant="ghost" size="icon">
                      <MousePointer2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Select (V)</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Move className="h-4 w-4" />
                    </Button>
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
            <Tabs defaultValue="chat" className="flex flex-col h-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="flex-1 flex flex-col h-0">
                <div className="flex-1 flex flex-col h-full">
                  <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                    <div className="space-y-4 pr-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={cn(
                            'flex items-start gap-3',
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                          )}
                        >
                          {message.role === 'model' && (
                            <div className="bg-primary rounded-full p-2">
                              <Bot className="h-5 w-5 text-primary-foreground" />
                            </div>
                          )}
                          <div
                            className={cn(
                              'p-3 rounded-lg max-w-[80%]',
                              message.role === 'user' ? 'bg-muted' : 'bg-secondary'
                            )}
                          >
                            <p className="text-sm">{message.content}</p>
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
                    <form
                        ref={formRef}
                        action={handleAction}
                        className="relative"
                    >
                      <Textarea
                        name="message"
                        placeholder="Ask the AI to modify the diagram..."
                        className="resize-none pr-12"
                        autoComplete="off"
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
