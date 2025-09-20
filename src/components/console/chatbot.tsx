
'use client';

import { useState, useRef, useEffect } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Bot, Send, Loader, User, AlertCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatAction } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const initialFormState = {
  status: 'idle' as 'idle' | 'success' | 'error',
  error: null as string | null,
  newMessage: null as Message | null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      <span className="sr-only">Send message</span>
    </Button>
  );
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [formState, action] = useActionState(chatAction, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (formState.status === 'success' && formState.newMessage) {
      // Replace the last message (which was the loading indicator) with the actual response
      setMessages(prevMessages => [...prevMessages.slice(0, -1), formState.newMessage as Message]);
      formRef.current?.reset();
    } else if (formState.status === 'error') {
      // Replace the loading indicator with an error message
      const errorMessage: Message = { role: 'model', content: `Error: ${formState.error}` };
      setMessages(prevMessages => [...prevMessages.slice(0, -1), errorMessage]);
    }
    setIsPending(false);
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
    setIsPending(true);

    const userMessage: Message = { role: 'user', content: userInput };
    const loadingMessage: Message = { role: 'model', content: '...' };
    const updatedMessages = [...messages, userMessage, loadingMessage];
    
    setMessages(updatedMessages);

    const newFormData = new FormData();
    newFormData.append('message', userInput);
    newFormData.append('history', JSON.stringify([...messages, userMessage])); // Send history *with* new user message

    action(newFormData);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Bot className="h-5 w-5" />
          <span className="sr-only">Open Chatbot</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 md:w-96 p-0">
        <div className="flex flex-col h-[60vh]">
          <div className="flex-1 p-4">
            <h3 className="text-lg font-semibold mb-4">ArchiSketch Assistant</h3>
            <ScrollArea className="h-[calc(60vh-120px)]" ref={scrollAreaRef}>
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
                        <User className="h-5 w-5 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
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
              className="flex items-center gap-2"
              onSubmit={(e) => {
                  e.preventDefault();
                  handleAction(new FormData(e.currentTarget));
              }}
            >
              <Input
                name="message"
                placeholder="Ask me anything..."
                className="flex-1"
                autoComplete="off"
                disabled={isPending}
              />
              <SubmitButton />
            </form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
