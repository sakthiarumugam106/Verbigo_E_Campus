
'use server';
/**
 * @fileOverview An AI agent for assessing a user's English proficiency level.
 *
 * - assessLevel - A function that generates questions and evaluates answers to determine a user's language level.
 * - LevelAssessmentInput - The input type for the assessLevel function.
 * - LevelAssessmentOutput - The return type for the assessLevel function.
 */

import {ai} from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import {z} from 'genkit';

const LevelAssessmentInputSchema = z.object({
  previousQuestions: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).describe('An array of questions already asked and the user\'s answers.'),
});
export type LevelAssessmentInput = z.infer<typeof LevelAssessmentInputSchema>;

const LevelAssessmentOutputSchema = z.object({
  nextQuestion: z.string().optional().describe('The next question for the user. Omit if the assessment is complete.'),
  isFinal: z.boolean().describe('Set to true if you have enough information to create a final report.'),
  report: z.object({
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']).describe("The user's assessed English level."),
    score: z.number().int().min(0).max(100).describe('A percentage score from 0 to 100 representing the user\'s proficiency.'),
    summary: z.string().describe('A brief, encouraging summary of the user\'s strengths and areas for improvement.'),
    skillBreakdown: z.array(z.object({
      skill: z.string().describe('A specific skill area, e.g., "Verb Tense" or "Vocabulary".'),
      level: z.enum(['Beginner', 'Intermediate', 'Advanced']).describe('The assessed level for this specific skill.'),
    })).describe('A breakdown of the user\'s performance in different grammatical areas.'),
  }).optional().describe('The final report. Only include this when isFinal is true.'),
});
export type LevelAssessmentOutput = z.infer<typeof LevelAssessmentOutputSchema>;


export async function assessLevel(input: LevelAssessmentInput): Promise<LevelAssessmentOutput> {
  return levelAssessmentFlow(input);
}


const prompt = ai.definePrompt({
  name: 'levelAssessmentPrompt',
  input: {schema: LevelAssessmentInputSchema},
  output: {schema: LevelAssessmentOutputSchema},
  model: 'gemini-2.0-flash',
  prompt: `You are an expert English language tutor conducting a proficiency assessment. Your goal is to determine if a user is a Beginner, Intermediate, or Advanced speaker by asking a series of 3 questions.

You will be given a list of previous questions and the user's answers.
- If the list is empty, ask your first question. It should be a simple, open-ended question to gauge basic sentence structure.
- Based on the user's answer, ask a follow-up question that is progressively more difficult.
- After the user has answered 3 questions, you must provide a final report. Set the 'isFinal' flag to true and generate the report. Do not ask a 4th question.

The assessment should follow this structure:
1.  **Question 1 (Beginner):** Ask a simple question. (e.g., "What did you do last weekend?")
2.  **Question 2 (Intermediate):** Based on the answer, ask a more complex question. (e.g., If they say "I go to beach", you might ask "Could you describe the most interesting thing you saw at the beach? Try to use at least two adjectives.")
3.  **Question 3 (Advanced):** Ask a question that requires nuanced vocabulary or hypothetical thinking. (e.g., "If you could give one piece of advice to someone learning your native language, what would it be and why?")

After 3 questions, generate a final report with:
- A final level ('Beginner', 'Intermediate', 'Advanced').
- A proficiency score from 0-100.
- A brief, encouraging summary.
- A skill breakdown for at least two specific areas (e.g., Verb Tense, Sentence Structure, Vocabulary).

Current conversation history:
{{#each previousQuestions}}
Q: {{{question}}}
A: {{{answer}}}
{{/each}}
`,
});


const levelAssessmentFlow = ai.defineFlow(
  {
    name: 'levelAssessmentFlow',
    inputSchema: LevelAssessmentInputSchema,
    outputSchema: LevelAssessmentOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
