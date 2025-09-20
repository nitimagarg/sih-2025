'use server';
/**
 * @fileOverview Generates personalized training pathways for learners based on their profile and career aspirations.
 *
 * - generatePersonalizedTrainingPathways - A function that generates personalized training pathways.
 * - GeneratePersonalizedTrainingPathwaysInput - The input type for the generatePersonalizedTrainingPathways function.
 * - GeneratePersonalizedTrainingPathwaysOutput - The return type for the generatePersonalizedTrainingPathways function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedTrainingPathwaysInputSchema = z.object({
  learnerProfile: z.object({
    academicBackground: z.string().describe('The learner\'s academic background.'),
    priorSkills: z.string().describe('The learner\'s prior skills.'),
    socioEconomicContext: z.string().describe('The learner\'s socio-economic context.'),
    learningPace: z.string().describe('The learner\'s learning pace.'),
    aspirations: z.string().describe('The learner\'s career aspirations.'),
  }).describe('The learner\'s profile.'),
  careerAspirations: z.string().describe('The learner\'s career aspirations.'),
  difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional().describe('The learner\'s preferred difficulty level.'),
});
export type GeneratePersonalizedTrainingPathwaysInput = z.infer<
  typeof GeneratePersonalizedTrainingPathwaysInputSchema
>;

const TrainingPathwaySchema = z.object({
  courses: z.array(z.object({
    name: z.string().describe('Course name'),
    substeps: z.array(z.string()).optional().describe('Substeps for the course if difficulty is reduced'),
  })).describe('A list of recommended courses.'),
  microCredentials: z.array(z.string()).describe('A list of recommended micro-credentials.'),
  certifications: z.array(z.string()).describe('A list of recommended certifications.'),
  onTheJobTraining: z.array(z.string()).describe('A list of recommended on-the-job training opportunities.'),
});

const GeneratePersonalizedTrainingPathwaysOutputSchema = z.object({
  trainingPathways: z.array(TrainingPathwaySchema).describe('A list of personalized training pathways.'),
  skillGaps: z.array(z.string()).describe('A list of skill gaps identified.'),
});

export type GeneratePersonalizedTrainingPathwaysOutput = z.infer<
  typeof GeneratePersonalizedTrainingPathwaysOutputSchema
>;

export async function generatePersonalizedTrainingPathways(
  input: GeneratePersonalizedTrainingPathwaysInput
): Promise<GeneratePersonalizedTrainingPathwaysOutput> {
  return generatePersonalizedTrainingPathwaysFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedTrainingPathwaysPrompt',
  input: {schema: GeneratePersonalizedTrainingPathwaysInputSchema},
  output: {schema: GeneratePersonalizedTrainingPathwaysOutputSchema},
  prompt: `You are an AI career navigator and personalized skilling assistant. Generate personalized training pathways for the learner based on their profile and career aspirations.

Learner Profile:
Academic Background: {{{learnerProfile.academicBackground}}}
Prior Skills: {{{learnerProfile.priorSkills}}}
Socio-Economic Context: {{{learnerProfile.socioEconomicContext}}}
Learning Pace: {{{learnerProfile.learningPace}}}
Aspirations: {{{learnerProfile.aspirations}}}

Career Aspirations: {{{careerAspirations}}}
{{#if difficultyLevel}}
Difficulty Level: {{{difficultyLevel}}}
{{/if}}

Consider the learner's profile and career aspirations to generate personalized training pathways that include courses, micro-credentials, certifications, and on-the-job training opportunities. Also, identify any skill gaps between the learner's current skills and the requirements for their desired career.

If the learner requests help for a specific course, generate a breakdown of that course into smaller substeps or topics, with the difficulty reduced from the original. Output these substeps in the course's "substeps" field in the JSON.

{{#if difficultyLevel}}
IMPORTANT: Adjust the complexity and depth of the training pathways based on the specified difficulty level:
- Beginner: Focus on foundational concepts, basic skills, and introductory courses
- Intermediate: Include moderate complexity topics and practical applications
- Advanced: Cover complex topics, advanced techniques, and specialized knowledge
- Expert: Focus on leadership, innovation, and cutting-edge developments

Ensure the pathway progression matches the difficulty level and builds appropriately from basic to advanced concepts.
{{/if}}

Output the training pathways and skill gaps in a JSON format. If substeps are requested for a course, include them in the output.
`,
});

const generatePersonalizedTrainingPathwaysFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedTrainingPathwaysFlow',
    inputSchema: GeneratePersonalizedTrainingPathwaysInputSchema,
    outputSchema: GeneratePersonalizedTrainingPathwaysOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
