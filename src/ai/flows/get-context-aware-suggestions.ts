'use server';

/**
 * @fileOverview AI-powered context-aware suggestion flow for the ArchiSketch application.
 *
 * - getContextAwareSuggestions - A function that provides intelligent suggestions based on the current diagram context and user actions.
 * - GetContextAwareSuggestionsInput - The input type for the getContextAwareSuggestions function.
 * - GetContextAwareSuggestionsOutput - The return type for the getContextAwareSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetContextAwareSuggestionsInputSchema = z.object({
  canvasContext: z
    .string()
    .describe(
      'A description of the current state of the diagram canvas, including existing components and their relationships.'
    ),
  userAction: z.string().describe('The most recent action performed by the user.'),
});
export type GetContextAwareSuggestionsInput = z.infer<
  typeof GetContextAwareSuggestionsInputSchema
>;

const GetContextAwareSuggestionsOutputSchema = z.object({
  suggestedComponents: z
    .array(z.string())
    .describe('An array of suggested architectural components.'),
  suggestedConnections: z
    .array(z.string())
    .describe('An array of suggested connections between components.'),
  explanation:
    z.string().describe('An explanation of why the components and connections were suggested.'),
});
export type GetContextAwareSuggestionsOutput = z.infer<
  typeof GetContextAwareSuggestionsOutputSchema
>;

export async function getContextAwareSuggestions(
  input: GetContextAwareSuggestionsInput
): Promise<GetContextAwareSuggestionsOutput> {
  return getContextAwareSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getContextAwareSuggestionsPrompt',
  input: {schema: GetContextAwareSuggestionsInputSchema},
  output: {schema: GetContextAwareSuggestionsOutputSchema},
  prompt: `You are an AI assistant that provides context-aware suggestions for architecture diagrams.

  Based on the current canvas context and the user's most recent action, suggest relevant components and connections.

  Canvas Context: {{{canvasContext}}}
  User Action: {{{userAction}}}

  Components should be selected from (AI, Cloud, Dev, Security) common architectural elements. Connections should be worded clearly.
  Explain why you are suggesting these components and connections.

  Format your output as a JSON object with 'suggestedComponents', 'suggestedConnections', and 'explanation' fields. The suggestedComponents and suggestedConnections fields should be arrays of strings.
`,
});

const getContextAwareSuggestionsFlow = ai.defineFlow(
  {
    name: 'getContextAwareSuggestionsFlow',
    inputSchema: GetContextAwareSuggestionsInputSchema,
    outputSchema: GetContextAwareSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
