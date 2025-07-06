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
  prompt: `You are a medical assistant. Analyze the symptoms described by the user and provide possible preventions, treatments, and consequences.
Also, summarize relevant articles into brief and readable bullet points.

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
