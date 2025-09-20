"use server";

import { z } from "zod";
import {
  generatePersonalizedTrainingPathways,
  GeneratePersonalizedTrainingPathwaysInput,
} from "@/ai/flows/generate-personalized-training-pathways";
import { getJobMarketInsights } from "@/ai/flows/get-job-market-insights";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  academicBackground: z.string().min(10, {
    message: "Please provide more details about your academic background.",
  }),
  priorSkills: z.string().min(5, {
    message: "Please list at least one prior skill.",
  }),
  socioEconomicContext: z.string().min(10, {
    message: "Please provide more details about your context.",
  }),
  learningPace: z.string().min(3, {
    message: "Please specify your preferred learning pace (e.g., slow, fast).",
  }),
  aspirations: z.string().min(10, {
    message: "Please describe your career aspirations in more detail.",
  }),
});

export async function generatePathwaysAction(
  values: z.infer<typeof FormSchema>,
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
) {
  try {
    const aiInput: GeneratePersonalizedTrainingPathwaysInput = {
      learnerProfile: {
        academicBackground: values.academicBackground,
        priorSkills: values.priorSkills,
        socioEconomicContext: values.socioEconomicContext,
        learningPace: values.learningPace,
        aspirations: values.aspirations,
      },
      careerAspirations: values.aspirations,
      difficultyLevel: difficultyLevel,
    };

    const result = await generatePersonalizedTrainingPathways(aiInput);

    if (!result || !result.trainingPathways || !result.skillGaps) {
       throw new Error("AI response is not in the expected format.");
    }
    
    revalidatePath("/dashboard");
    return result;

  } catch (error) {
    console.error("Error calling AI flow:", error);
    throw new Error("Failed to generate personalized pathways. Please try again later.");
  }
}

const JobInsightSchema = z.object({
  jobTitle: z.string().min(3, { message: "Please enter a job title." }),
});

export async function getJobInsightsAction(values: z.infer<typeof JobInsightSchema>) {
   try {
    const result = await getJobMarketInsights({ jobTitle: values.jobTitle });
    if (!result) {
      throw new Error("AI response is not in the expected format.");
    }
    return result;
  } catch (error) {
    console.error("Error calling AI flow:", error);
    throw new Error("Failed to generate job insights. Please try again later.");
  }
}
