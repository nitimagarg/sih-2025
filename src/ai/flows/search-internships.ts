'use server';
/**
 * @fileOverview AI-powered internship search that matches users with relevant opportunities.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SearchInternshipsInputSchema = z.object({
  skills: z.string().describe("Comma-separated list of user skills"),
  education: z.string().describe("User's education background"),
  filters: z.object({
    duration: z.string().describe("Preferred duration (short, medium, long, all)"),
    mode: z.string().describe("Work mode preference (remote, on-site, hybrid, all)"),
    category: z.string().describe("Job category preference (development, data science, design, marketing, all)"),
    salaryRange: z.string().describe("Salary range preference (low, medium, high, all)")
  }),
  userProfile: z.object({
    experience: z.string().optional().describe("User's work experience level"),
    location: z.string().optional().describe("User's preferred location"),
    availability: z.string().optional().describe("When user can start")
  }).optional()
});

export type SearchInternshipsInput = z.infer<typeof SearchInternshipsInputSchema>;

const InternshipSchema = z.object({
  id: z.number(),
  title: z.string().describe("Internship title"),
  company: z.string().describe("Company name"),
  location: z.string().describe("Work location"),
  duration: z.string().describe("Internship duration"),
  mode: z.string().describe("Work mode (Remote, On-site, Hybrid)"),
  salary: z.string().describe("Salary/stipend amount"),
  skills: z.array(z.string()).describe("Required skills"),
  education: z.string().describe("Required education level"),
  requirements: z.string().describe("Detailed requirements"),
  description: z.string().describe("Job description"),
  officialLink: z.string().describe("Company application URL"),
  rating: z.number().describe("Company rating out of 5"),
  applicants: z.number().describe("Number of current applicants"),
  posted: z.string().describe("When it was posted"),
  category: z.string().describe("Job category"),
  matchScore: z.number().describe("How well this matches the user (0-100)"),
  whyRecommended: z.string().describe("Why this internship is recommended for the user")
});

const SearchInternshipsOutputSchema = z.object({
  internships: z.array(InternshipSchema),
  searchSummary: z.string().describe("Summary of the search results and recommendations"),
  suggestions: z.array(z.string()).describe("Suggestions for improving the user's profile to get better matches")
});

export type SearchInternshipsOutput = z.infer<typeof SearchInternshipsOutputSchema>;

export async function searchInternships(
  input: SearchInternshipsInput
): Promise<SearchInternshipsOutput> {
  return searchInternshipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchInternshipsPrompt',
  input: {schema: SearchInternshipsInputSchema},
  output: {schema: SearchInternshipsOutputSchema},
  prompt: `You are an AI career advisor specializing in matching students and professionals with relevant internship opportunities in India.

User Profile:
- Skills: {{{skills}}}
- Education: {{{education}}}
- Experience: {{#if userProfile.experience}}{{{userProfile.experience}}}{{else}}Not specified{{/if}}
- Location: {{#if userProfile.location}}{{{userProfile.location}}}{{else}}Not specified{{/if}}
- Availability: {{#if userProfile.availability}}{{{userProfile.availability}}}{{else}}Not specified{{/if}}

Search Filters:
- Duration: {{{filters.duration}}}
- Mode: {{{filters.mode}}}
- Category: {{{filters.category}}}
- Salary Range: {{{filters.salaryRange}}}

IMPORTANT: Generate internships that DIRECTLY match the user's skills and education. If the user has "React, JavaScript" skills and "Computer Science" education, prioritize Frontend Development, Full Stack Development, and Web Development internships.

For each internship, provide:
- A realistic Indian company name (e.g., "TechCorp Solutions", "DataFlow Analytics", "CloudTech Innovations")
- Appropriate location (Mumbai, Bangalore, Delhi, Pune, Hyderabad, or Remote)
- Duration that matches user preferences (3-6 months typically)
- Salary range in INR (₹10,000-₹25,000/month for internships)
- Skills that DIRECTLY match user's skills (if user has React, include React in requirements)
- Detailed requirements that are realistic and achievable
- A compelling description of the role
- A realistic company rating (4.0-4.9/5)
- Realistic applicant count (50-500 applicants)
- Posted date (1-7 days ago)
- A high match score (70-95) for relevant internships
- An explanation of why this internship is recommended

Generate 8-10 internships that are HIGHLY RELEVANT to the user's specific skills and education background.

Also provide:
- A search summary explaining why these internships match the user's profile
- Suggestions for how the user can improve their profile to get better matches

Focus on creating internships that the user would actually want to apply for based on their skills and education.`,
});

const searchInternshipsFlow = ai.defineFlow(
  {
    name: 'searchInternshipsFlow',
    inputSchema: SearchInternshipsInputSchema,
    outputSchema: SearchInternshipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
