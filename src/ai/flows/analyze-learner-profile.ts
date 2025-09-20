'use server';

/**
 * @fileOverview This file defines the analyzeLearnerProfile flow, which analyzes a learner's profile
 * to provide personalized training recommendations.
 *
 * @fileOverview
 * - analyzeLearnerProfile - Analyzes learner data and returns personalized training recommendations.
 * - AnalyzeLearnerProfileInput - The input type for the analyzeLearnerProfile function.
 * - AnalyzeLearnerProfileOutput - The return type for the analyzeLearnerProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeLearnerProfileInputSchema = z.object({
  educationalBackground: z
    .string()
    .describe('The learner\'s educational background.'),
  priorSkills: z.string().describe('The learner\'s prior skills.'),
  careerAspirations: z.string().describe('The learner\'s career aspirations.'),
  socioEconomicContext: z
    .string()
    .describe('The learner\'s socio-economic context.'),
  learningPace: z.string().describe('The learner\'s learning pace.'),
});
export type AnalyzeLearnerProfileInput = z.infer<
  typeof AnalyzeLearnerProfileInputSchema
>;

const AnalyzeLearnerProfileOutputSchema = z.object({
  personalizedRecommendations: z
    .string()
    .describe('Personalized training recommendations for the learner.'),
});
export type AnalyzeLearnerProfileOutput = z.infer<
  typeof AnalyzeLearnerProfileOutputSchema
>;

export async function analyzeLearnerProfile(
  input: AnalyzeLearnerProfileInput
): Promise<AnalyzeLearnerProfileOutput> {
  return analyzeLearnerProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeLearnerProfilePrompt',
  input: {schema: AnalyzeLearnerProfileInputSchema},
  output: {schema: AnalyzeLearnerProfileOutputSchema},
  prompt: `You are an AI career advisor. Analyze the learner's profile and provide personalized training recommendations based on their background, skills, and aspirations.

Learner Profile:
Educational Background: {{{educationalBackground}}}
Prior Skills: {{{priorSkills}}}
Career Aspirations: {{{careerAspirations}}}
Socio-economic Context: {{{socioEconomicContext}}}
Learning Pace: {{{learningPace}}}

Based on this profile, what personalized training recommendations can you provide?`,
});

const analyzeLearnerProfileFlow = ai.defineFlow(
  {
    name: 'analyzeLearnerProfileFlow',
    inputSchema: AnalyzeLearnerProfileInputSchema,
    outputSchema: AnalyzeLearnerProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
