'use server';

/**
 * @fileOverview AI-powered component and connection suggestion flow for the ArchiSketch application.
 *
 * - suggestComponentsAndConnections - A function that suggests relevant components and connections for an architectural diagram based on the existing canvas context.
 * - SuggestComponentsAndConnectionsInput - The input type for the suggestComponentsAndConnections function.
 * - SuggestComponentsAndConnectionsOutput - The return type for the suggestComponentsAndConnections function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestComponentsAndConnectionsInputSchema = z.object({
  canvasContext: z
    .string()
    .describe(
      'A description of the current state of the diagram canvas, including existing components and their relationships.'
    ),
  userInput: z.string().describe('The user input or prompt.'),
});
export type SuggestComponentsAndConnectionsInput = z.infer<
  typeof SuggestComponentsAndConnectionsInputSchema
>;

const SuggestComponentsAndConnectionsOutputSchema = z.object({
  suggestedComponents: z
    .array(z.string())
    .describe('An array of suggested architectural components.'),
  suggestedConnections: z
    .array(z.string())
    .describe('An array of suggested connections between components.'),
  explanation: z
    .string()
    .describe('An explanation of why the components and connections were suggested.'),
});
export type SuggestComponentsAndConnectionsOutput = z.infer<
  typeof SuggestComponentsAndConnectionsOutputSchema
>;

export async function suggestComponentsAndConnections(
  input: SuggestComponentsAndConnectionsInput
): Promise<SuggestComponentsAndConnectionsOutput> {
  return suggestComponentsAndConnectionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestComponentsAndConnectionsPrompt',
  input: {schema: SuggestComponentsAndConnectionsInputSchema},
  output: {schema: SuggestComponentsAndConnectionsOutputSchema},
  prompt: `You are an AI assistant that suggests components and connections for architecture diagrams.

  Based on the current canvas context and user input, suggest relevant components and connections.

  Canvas Context: {{{canvasContext}}}
  User Input: {{{userInput}}}

  Components should be selected from (AI, Cloud, Dev, Security) common architectural elements. Connections should be worded clearly.
  Explain why you are suggesting these components and connections.

  Format your output as a JSON object with 'suggestedComponents', 'suggestedConnections', and 'explanation' fields. The suggestedComponents and suggestedConnections fields should be arrays of strings.
`,
});

const suggestComponentsAndConnectionsFlow = ai.defineFlow(
  {
    name: 'suggestComponentsAndConnectionsFlow',
    inputSchema: SuggestComponentsAndConnectionsInputSchema,
    outputSchema: SuggestComponentsAndConnectionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
