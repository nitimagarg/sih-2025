
"use client";

import * as React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  User,
  Settings,
  LifeBuoy,
  Loader2,
  Sparkles,
  BookOpen,
  LogOut,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { LearnerProfileForm, FormSchema } from "@/components/dashboard/learner-profile-form";
import { generatePathwaysAction } from "@/app/actions";
import type { GeneratePersonalizedTrainingPathwaysOutput } from "@/ai/flows/generate-personalized-training-pathways";
import { useToast } from "@/hooks/use-toast";
import { PathwayDisplay } from "@/components/dashboard/pathway-display";
import { PathwayFlowchart } from "@/components/dashboard/pathway-flowchart";
import { DifficultyFeedback } from "@/components/dashboard/difficulty-feedback";
import { ProgressTracker } from "@/components/dashboard/progress-tracker";
import { DashboardHeader } from "@/components/dashboard/header";
import { Logo } from "@/components/logo";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Pathway } from "@/lib/types";
import Link from "next/link";

function transformAiDataToPathways(data: GeneratePersonalizedTrainingPathwaysOutput): Pathway[] {
  return data.trainingPathways.map((pathway, index) => ({
    id: `pathway-${index}`,
    courses: pathway.courses.map(course => ({
      name: typeof course === 'string' ? course : course.name,
      completed: false,
      ...(course.substeps ? { substeps: course.substeps } : {})
    })),
    microCredentials: pathway.microCredentials.map(name => ({ name, completed: false })),
    certifications: pathway.certifications.map(name => ({ name, completed: false })),
    onTheJobTraining: pathway.onTheJobTraining.map(name => ({ name, completed: false })),
  }));
}


export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [aiData, setAiData] = React.useState<GeneratePersonalizedTrainingPathwaysOutput | null>(null);
  const [pathways, setPathways] = React.useState<Pathway[] | null>(null);
  const [showDifficultyFeedback, setShowDifficultyFeedback] = React.useState(false);
  const [showFlowchart, setShowFlowchart] = React.useState(false);
  const [currentFormData, setCurrentFormData] = React.useState<FormSchema | null>(null);
  const [completedPathways, setCompletedPathways] = React.useState<Set<string>>(new Set());

  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);


  const handleFormSubmit = async (values: FormSchema) => {
    setIsLoading(true);
    setAiData(null);
    setPathways(null);
    setShowDifficultyFeedback(false);
    setShowFlowchart(false);
    setCurrentFormData(values);

    try {
      const result = await generatePathwaysAction(values);
      setAiData(result);
      if (result && result.trainingPathways) {
        setPathways(transformAiDataToPathways(result));
        setShowFlowchart(true);
        setShowDifficultyFeedback(true);
        toast({
            title: "Pathways Generated",
            description: "Your personalized career pathways are ready.",
        });
      } else {
         toast({
            variant: "destructive",
            title: "An Error Occurred",
            description: "AI response was not in the expected format.",
        });
      }
    } catch (error) {
      console.error("Error generating pathways:", error);
      toast({
        variant: "destructive",
        title: "An Error Occurred",
        description: "Failed to generate pathways. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDifficultySelected = async (difficulty: string) => {
    if (!currentFormData) return;
    
    setIsLoading(true);
    setShowDifficultyFeedback(false);

    try {
      const result = await generatePathwaysAction(currentFormData, difficulty as any);
      setAiData(result);
      if (result && result.trainingPathways) {
        setPathways(transformAiDataToPathways(result));
        setShowFlowchart(true);
        toast({
          title: "Pathways Regenerated",
          description: `Your pathways have been adjusted for ${difficulty} level.`,
        });
      }
    } catch (error) {
      console.error("Error regenerating pathways:", error);
      toast({
        variant: "destructive",
        title: "An Error Occurred",
        description: "Failed to regenerate pathways. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    setShowDifficultyFeedback(false);
    setShowFlowchart(true);
  };

  const handleToggleComplete = (pathwayIndex: number, itemType: keyof Omit<Pathway, 'id'>, itemIndex: number) => {
    let toastData: { title: string; description: string; duration?: number } | null = null;
    setPathways(prevPathways => {
      if (!prevPathways) return null;
      const newPathways = [...prevPathways];
      const item = newPathways[pathwayIndex][itemType][itemIndex];
      const wasCompleted = item.completed;
      item.completed = !item.completed;

      // Check if entire pathway is completed
      const pathway = newPathways[pathwayIndex];
      const allItems = [
        ...pathway.courses,
        ...pathway.microCredentials,
        ...pathway.certifications,
        ...pathway.onTheJobTraining,
      ];
      const isPathwayComplete = allItems.every(item => item.completed);

      if (!wasCompleted) {
        if (isPathwayComplete && !completedPathways.has(pathway.id)) {
          setCompletedPathways(prev => new Set([...prev, pathway.id]));
          toastData = {
            title: "🏆 Pathway Complete!",
            description: `Congratulations! You've completed the entire pathway \"${pathway.id}\"!`,
            duration: 5000,
          };
        } else {
          toastData = {
            title: "🎉 Great job!",
            description: `You've completed \"${item.name}\"! Keep up the excellent work.`,
            duration: 3000,
          };
        }
      } else {
        if (completedPathways.has(pathway.id)) {
          setCompletedPathways(prev => {
            const newSet = new Set(prev);
            newSet.delete(pathway.id);
            return newSet;
          });
        }
        toastData = {
          title: "Item unchecked",
          description: `\"${item.name}\" has been marked as incomplete.`,
          duration: 2000,
        };
      }

      // Return new pathways state
      return newPathways;
    });
    // Call toast after state update
    if (toastData) {
      toast(toastData);
    }
  };


  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive tooltip="Dashboard">
                <Link href="/dashboard">
                    <LayoutDashboard />
                    Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Job Insights">
                 <Link href="/jobs">
                    <Briefcase />
                    Job Insights
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Internships">
                 <Link href="/internships">
                    <GraduationCap />
                    Internships
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Programs">
                <Link href="/programs">
                    <BookOpen />
                    NSQF Programs
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Profile">
                <Link href="/profile">
                    <User />
                    Profile
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Link href="/settings">
                    <Settings />
                    Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Support">
                <Link href="#">
                  <LifeBuoy />
                  Support
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <Button variant="ghost" onClick={signOut} className="w-full justify-start text-sm">
                    <LogOut className="mr-2" /> Sign Out
                </Button>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="flex items-center gap-3 p-2 border-t mt-2">
            <Avatar>
              <AvatarImage src={user.photoURL ?? ""} alt="User" />
              <AvatarFallback>{user.displayName?.[0] ?? 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm group-data-[collapsible=icon]:hidden">
              <span className="font-semibold text-sidebar-foreground">
                {user.displayName}
              </span>
              <span className="text-xs text-sidebar-foreground/70">{user.email}</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-8">
          <DashboardHeader />
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <LearnerProfileForm onSubmit={handleFormSubmit} isLoading={isLoading} />
              <div className="mt-8">
                {isLoading && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                      <Loader2 className="animate-spin" />
                      Generating your personalized pathways...
                    </div>
                    <p className="text-muted-foreground">Our AI is analyzing your profile. This may take a moment.</p>
                    <div className="space-y-4 pt-4">
                       <PathwayDisplay.Skeleton />
                    </div>
                  </div>
                )}
                {showFlowchart && aiData && pathways && (
                  <PathwayFlowchart 
                    pathways={pathways} 
                    onToggleComplete={handleToggleComplete} 
                  />
                )}

                {showDifficultyFeedback && aiData && pathways && (
                  <DifficultyFeedback 
                    onDifficultySelected={handleDifficultySelected}
                    onRegenerate={handleRegenerate}
                    isRegenerating={isLoading}
                  />
                )}

                {!showDifficultyFeedback && !showFlowchart && !isLoading && (
                   <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg bg-card mt-8">
                      <Sparkles className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Unlock Your Potential</h3>
                      <p className="text-muted-foreground max-w-md">Fill out your profile form above, and our AI will generate a personalized roadmap to help you achieve your career goals.</p>
                   </div>
                )}
              </div>
            </div>
            <div className="lg:col-span-1">
              <ProgressTracker pathways={pathways} />
            </div>
            <div className="chatbot">
              <script id="omnidimension-web-widget" async src="https://backend.omnidim.io/web_widget.js?secret_key=0b520870d72626de3eddb192ce00dacc" ></script>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
