'use server';

/**
 * @fileOverview A chatbot flow that uses Genkit to generate responses.
 *
 * - chat - A function that takes a message history and returns a response.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema),
  message: z.string(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  message: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({history, message}) => {
    const chatHistory = history.map(h => ({
      role: h.role,
      content: [{text: h.content}],
    }));

    const result = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      history: chatHistory,
      prompt: message,
    });

    return {
      message: result.text,
    };
  }
);
