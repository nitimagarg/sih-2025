// src/ai/flows/identify-skill-gaps.ts
'use server';
/**
 * @fileOverview Identifies skill gaps between a learner's current skills and the skills required for their desired career.
 *
 * - identifySkillGaps - A function that identifies skill gaps.
 * - IdentifySkillGapsInput - The input type for the identifySkillGaps function.
 * - IdentifySkillGapsOutput - The return type for the identifySkillGaps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifySkillGapsInputSchema = z.object({
  learnerSkills: z
    .string()
    .describe('A comma-separated list of the learner\'s current skills.'),
  desiredCareer: z.string().describe('The learner\'s desired career path.'),
  jobDescription: z.string().optional().describe('Optional: A job description for the desired career.'),
});
export type IdentifySkillGapsInput = z.infer<typeof IdentifySkillGapsInputSchema>;

const IdentifySkillGapsOutputSchema = z.object({
  skillGaps: z
    .string()
    .describe(
      'A comma-separated list of skills the learner needs to develop to be qualified for their desired career.'
    ),
  suggestedResources: z
    .string()
    .describe(
      'A comma-separated list of resources to help the learner develop the skills they are missing.'
    ),
});
export type IdentifySkillGapsOutput = z.infer<typeof IdentifySkillGapsOutputSchema>;

export async function identifySkillGaps(input: IdentifySkillGapsInput): Promise<IdentifySkillGapsOutput> {
  return identifySkillGapsFlow(input);
}

const identifySkillGapsPrompt = ai.definePrompt({
  name: 'identifySkillGapsPrompt',
  input: {schema: IdentifySkillGapsInputSchema},
  output: {schema: IdentifySkillGapsOutputSchema},
  prompt: `You are a career advisor. You will analyze a learner's current skills and their desired career, and identify the skills they need to develop to be qualified for that career.

Learner's current skills: {{{learnerSkills}}}
Desired career: {{{desiredCareer}}}

{{#if jobDescription}}
Here is a job description for the desired career:
{{{jobDescription}}}
{{/if}}

What skills does the learner need to develop to be qualified for their desired career? What resources can they use to develop those skills?

{{#if jobDescription}}
Consider the job description in your answer.
{{/if}}`,
});

const identifySkillGapsFlow = ai.defineFlow(
  {
    name: 'identifySkillGapsFlow',
    inputSchema: IdentifySkillGapsInputSchema,
    outputSchema: IdentifySkillGapsOutputSchema,
  },
  async input => {
    const {output} = await identifySkillGapsPrompt(input);
    return output!;
  }
);
