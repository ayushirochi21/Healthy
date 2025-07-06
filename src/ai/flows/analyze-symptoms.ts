// use server'
'use server';
/**
 * @fileOverview Analyzes user-provided symptoms and provides potential preventions, treatments, and consequences.
 *
 * - analyzeSymptoms - A function that handles the symptom analysis process.
 * - AnalyzeSymptomsInput - The input type for the analyzeSymptoms function.
 * - AnalyzeSymptomsOutput - The return type for the analyzeSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSymptomsInputSchema = z.object({
  symptoms: z.string().describe('The symptoms described by the user.'),
});
export type AnalyzeSymptomsInput = z.infer<typeof AnalyzeSymptomsInputSchema>;

const AnalyzeSymptomsOutputSchema = z.object({
  analysis: z.object({
    potentialConditions: z.array(z.object({
        name: z.string().describe("The name of the potential disease or condition."),
        description: z.string().describe("A brief description of the condition and why it might be relevant based on the symptoms provided.")
    })).describe("A list of potential diseases or conditions based on the symptoms."),
    prevention: z.string().describe('Possible preventions for the described symptoms.'),
    treatments: z.string().describe('Potential treatments for the described symptoms.'),
    consequences: z.string().describe('Possible consequences of the described symptoms.'),
    articlesSummary: z.array(z.string()).describe('Summarized bullet points from relevant articles.'),
  }).describe('Analysis of the symptoms provided'),
});
export type AnalyzeSymptomsOutput = z.infer<typeof AnalyzeSymptomsOutputSchema>;

export async function analyzeSymptoms(input: AnalyzeSymptomsInput): Promise<AnalyzeSymptomsOutput> {
  return analyzeSymptomsFlow(input);
}

const analyzeSymptomsPrompt = ai.definePrompt({
  name: 'analyzeSymptomsPrompt',
  input: {schema: AnalyzeSymptomsInputSchema},
  output: {schema: AnalyzeSymptomsOutputSchema},
  prompt: `You are a medical assistant. Analyze the symptoms described by the user and provide the following information:
1. A list of potential diseases or conditions that could match the symptoms. For each condition, provide its name and a short description.
2. General advice on possible preventions for the symptoms.
3. General advice on potential treatments for the symptoms.
4. General advice on possible consequences if the symptoms are left untreated.
5. A summary of relevant medical articles in brief, readable bullet points.

ALWAYS include a disclaimer that this is not a substitute for professional medical advice and the user should consult a healthcare professional for an accurate diagnosis. You can add this disclaimer within the generated text.

Symptoms: {{{symptoms}}}`,
});

const analyzeSymptomsFlow = ai.defineFlow(
  {
    name: 'analyzeSymptomsFlow',
    inputSchema: AnalyzeSymptomsInputSchema,
    outputSchema: AnalyzeSymptomsOutputSchema,
  },
  async input => {
    const {output} = await analyzeSymptomsPrompt(input);
    return output!;
  }
);
