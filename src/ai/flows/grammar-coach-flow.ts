
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
  text: z.string().describe('The text to be checked for grammar mistakes.'),
});
export type GrammarCoachInput = z.infer<typeof GrammarCoachInputSchema>;

const GrammarCoachOutputSchema = z.object({
  correctedText: z.string().describe('The grammatically correct version of the text.'),
  explanation: z.string().describe('A brief explanation of the corrections made.'),
});
export type GrammarCoachOutput = z.infer<typeof GrammarCoachOutputSchema>;

export async function grammarCoach(input: GrammarCoachInput): Promise<GrammarCoachOutput> {
  return grammarCoachFlow(input);
}

const prompt = ai.definePrompt({
  name: 'grammarCoachPrompt',
  input: { schema: GrammarCoachInputSchema },
  output: { schema: GrammarCoachOutputSchema },
  prompt: `You are an expert English grammar coach. Your task is to correct the provided text and provide a simple, friendly explanation for the changes.

You must identify any grammatical errors, spelling mistakes, or awkward phrasing in the user's text.
Provide a corrected version of the text.
Provide a concise, easy-to-understand explanation of the main correction. For example, if you corrected a verb tense, explain why the new tense is correct.

Analyze the following text:
{{{text}}}`,
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

    