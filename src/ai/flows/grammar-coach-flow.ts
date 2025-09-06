
'use server';

/**
 * @fileOverview An AI-powered grammar correction agent.
 *
 * - grammarCoach - A function that corrects grammar and explains the changes.
 * - GrammarCoachInput - The input type for the grammarCoach function.
 * - GrammarCoachOutput - The return type for the grammarCoach function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GrammarCoachInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe('The conversation history.'),
  message: z.string().describe('The latest message from the user.'),
});
export type GrammarCoachInput = z.infer<typeof GrammarCoachInputSchema>;

const GrammarCoachOutputSchema = z.object({
  response: z.string().describe('The AI\'s response, which could be a correction, an explanation, or a conversational reply.'),
});
export type GrammarCoachOutput = z.infer<typeof GrammarCoachOutputSchema>;

export async function grammarCoach(input: GrammarCoachInput): Promise<GrammarCoachOutput> {
  return grammarCoachFlow(input);
}

const prompt = ai.definePrompt({
  name: 'grammarCoachPrompt',
  input: { schema: GrammarCoachInputSchema },
  output: { schema: GrammarCoachOutputSchema },
  prompt: `You are an expert, friendly, and conversational English grammar coach. Your main goal is to help users improve their grammar.

- If the user asks for a grammar check, correct their text. Provide the corrected version and a simple, friendly explanation for the changes.
- If the user asks a question, answer it clearly and concisely.
- If the user just wants to chat, be a good conversational partner. Keep your responses brief and engaging.
- Always be encouraging and positive.

Analyze the user's message in the context of the conversation history.

Conversation History:
{{#each history}}
{{role}}: {{{content}}}
{{/each}}

User's Latest Message:
{{{message}}}
`,
});

const grammarCoachFlow = ai.defineFlow(
  {
    name: 'grammarCoachFlow',
    inputSchema: GrammarCoachInputSchema,
    outputSchema: GrammarCoachOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
