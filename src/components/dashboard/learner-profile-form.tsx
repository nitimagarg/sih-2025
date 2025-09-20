"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";

const formSchema = z.object({
  academicBackground: z.string().min(10, {
    message: "Please provide more details about your academic background.",
  }),
  priorSkills: z.string().min(5, {
    message: "Please list at least one prior skill. e.g. 'Java, Python, Project Management'",
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

export type FormSchema = z.infer<typeof formSchema>;

interface LearnerProfileFormProps {
  onSubmit: (values: FormSchema) => void;
  isLoading: boolean;
}

export function LearnerProfileForm({ onSubmit, isLoading }: LearnerProfileFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      academicBackground: "",
      priorSkills: "",
      socioEconomicContext: "",
      learningPace: "medium",
      aspirations: "",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Career Profile</CardTitle>
        <CardDescription>Tell us about yourself to generate a personalized career roadmap.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <FormField
                control={form.control}
                name="aspirations"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Career Aspirations</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Aspiring to become a Data Scientist in the healthcare industry" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="academicBackground"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Educational Background</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Bachelor's in Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priorSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prior Skills & Experience</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Proficient in Python, 1 year of project management" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socioEconomicContext"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Context</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Looking for remote work, have family commitments" {...field} />
                    </FormControl>
                     <FormDescription>This helps us find suitable opportunities.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="learningPace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Learning Pace</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Fast, medium, part-time" {...field} />
                    </FormControl>
                    <FormDescription>How quickly do you prefer to learn?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate My Pathways
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
