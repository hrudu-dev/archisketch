'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating architecture diagrams from textual prompts.
 *
 * It includes:
 * - `generateDiagramFromPrompt`: An exported function that takes a prompt as input and returns a diagram definition.
 * - `GenerateDiagramFromPromptInput`: The input type for the `generateDiagramFromPrompt` function.
 * - `GenerateDiagramFromPromptOutput`: The output type for the `generateDiagramFromPrompt` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDiagramFromPromptInputSchema = z.object({
  prompt: z.string().describe('A textual prompt describing the desired architecture diagram.'),
});
export type GenerateDiagramFromPromptInput = z.infer<typeof GenerateDiagramFromPromptInputSchema>;

const GenerateDiagramFromPromptOutputSchema = z.object({
  diagramDefinition: z.string().describe('A string representation of the diagram definition, in a format suitable for rendering on a canvas (e.g., JSON).'),
});
export type GenerateDiagramFromPromptOutput = z.infer<typeof GenerateDiagramFromPromptOutputSchema>;

export async function generateDiagramFromPrompt(input: GenerateDiagramFromPromptInput): Promise<GenerateDiagramFromPromptOutput> {
  return generateDiagramFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDiagramFromPromptPrompt',
  input: {schema: GenerateDiagramFromPromptInputSchema},
  output: {schema: GenerateDiagramFromPromptOutputSchema},
  prompt: `You are an AI expert in generating architecture diagrams based on user prompts.  Your output MUST be valid JSON representing the diagram.

User Prompt: {{{prompt}}}

Diagram Definition (JSON):`, 
});

const generateDiagramFromPromptFlow = ai.defineFlow(
  {
    name: 'generateDiagramFromPromptFlow',
    inputSchema: GenerateDiagramFromPromptInputSchema,
    outputSchema: GenerateDiagramFromPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
