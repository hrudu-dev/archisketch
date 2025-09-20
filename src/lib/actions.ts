'use server';

import { z } from 'zod';
import { generateDiagramFromPrompt } from '@/ai/flows/generate-diagram-from-prompt';
import { suggestComponentsAndConnections } from '@/ai/flows/suggest-components-and-connections';
import { chat } from '@/ai/flows/chatbot';

const generateSchema = z.object({
  prompt: z.string().min(1, 'Prompt cannot be empty.'),
});

export async function generateDiagramAction(prevState: any, formData: FormData) {
  const validated = generateSchema.safeParse({ prompt: formData.get('prompt') });

  if (!validated.success) {
    return { status: 'error', error: validated.error.errors[0].message };
  }

  try {
    const result = await generateDiagramFromPrompt({ prompt: validated.data.prompt });
    const diagram = JSON.parse(result.diagramDefinition);
    return { status: 'success', diagram };
  } catch (e) {
    console.error(e);
    return { status: 'error', error: 'Failed to generate diagram. The AI might have returned an invalid format.' };
  }
}

const suggestSchema = z.object({
  canvasContext: z.string(),
  userInput: z.string(),
});

export async function suggestAction(prevState: any, formData: FormData) {
  const validated = suggestSchema.safeParse({
    canvasContext: formData.get('canvasContext'),
    userInput: formData.get('userInput'),
  });

  if (!validated.success) {
    return { status: 'error', error: validated.error.errors[0].message };
  }

  try {
    const suggestions = await suggestComponentsAndConnections(validated.data);
    return { status: 'success', suggestions };
  } catch (e) {
    console.error(e);
    return { status: 'error', error: 'Failed to get suggestions.' };
  }
}

const chatSchema = z.object({
    message: z.string().min(1, 'Message cannot be empty.'),
    history: z.string(), // JSON string of the history
});

export async function chatAction(prevState: any, formData: FormData) {
    const validated = chatSchema.safeParse({
        message: formData.get('message'),
        history: formData.get('history'),
    });

    if (!validated.success) {
        return { status: 'error', error: validated.error.errors[0].message, newMessage: null };
    }

    try {
        const history = JSON.parse(validated.data.history);
        // The last message in the history is the new user message
        const message = validated.data.message;
        // The history for the AI should be everything *before* the new message
        const aiHistory = history.slice(0, -1);

        const result = await chat({
            history: aiHistory,
            message: message,
        });

        return {
            status: 'success',
            newMessage: { role: 'model', content: result.message },
        };
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        return { 
            status: 'error', 
            error: `Failed to get a response from the chatbot. ${errorMessage}`,
            newMessage: null
        };
    }
}
