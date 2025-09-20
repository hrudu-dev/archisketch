
'use client';

import { useState, useRef, useEffect } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Bot, Send, Loader, User } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatAction } from '@/lib/actions';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const initialFormState = {
  status: 'idle',
  message: '',
  chatHistory: [],
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

  useEffect(() => {
    if (formState.status === 'success' && formState.newMessage) {
      setMessages(prevMessages => [...prevMessages, formState.newMessage as Message]);
      formRef.current?.reset();
    }
    // You can add handling for 'error' status here if needed
  }, [formState]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack to scroll to the bottom.
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

    const chatHistory = [...messages, userMessage];
    const newFormData = new FormData();
    newFormData.append('message', userInput);
    newFormData.append('history', JSON.stringify(chatHistory));

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
                          : 'bg-secondary'
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
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
            <form
              ref={formRef}
              action={handleAction}
              className="flex items-center gap-2"
            >
              <Input
                name="message"
                placeholder="Ask me anything..."
                className="flex-1"
                autoComplete="off"
              />
              <SubmitButton />
            </form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
