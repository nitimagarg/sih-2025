
"use client";

import * as React from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Loader2, Briefcase, Search, Sparkles, Wand2, DollarSign, Lightbulb, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  BookOpen,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { getJobInsightsAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import type { GetJobMarketInsightsOutput } from "@/ai/flows/get-job-market-insights";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";


const formSchema = z.object({
  jobTitle: z.string().min(3, {
    message: "Please enter a job title (e.g., 'Software Engineer').",
  }),
});


const InsightCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <Card>
    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
      {icon}
      <CardTitle className="text-base font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

const InsightsDisplay = ({ data }: { data: GetJobMarketInsightsOutput }) => (
  <div className="mt-8 space-y-6 animate-in fade-in-50">
    <InsightCard icon={<DollarSign className="h-6 w-6 text-primary" />} title="Average Salary">
      <p className="text-2xl font-bold text-primary">{data.averageSalary}</p>
      <p className="text-xs text-muted-foreground">Based on data from major international markets.</p>
    </InsightCard>
    <InsightCard icon={<Lightbulb className="h-6 w-6 text-yellow-500" />} title="Required Skills">
      <div className="flex flex-wrap gap-2">
        {data.requiredSkills.map(skill => (
          <Badge key={skill} variant="secondary">{skill}</Badge>
        ))}
      </div>
    </InsightCard>
    <InsightCard icon={<TrendingUp className="h-6 w-6 text-blue-500" />} title="Future Outlook">
       <p className="text-muted-foreground">{data.futureOutlook}</p>
    </InsightCard>
  </div>
);

const InsightsSkeleton = () => (
  <div className="mt-8 space-y-6">
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-48 mb-1" />
        <Skeleton className="h-3 w-64" />
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-32" />
      </CardContent>
    </Card>
     <Card>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  </div>
);


export default function JobsPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [insights, setInsights] = React.useState<GetJobMarketInsightsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
    },
  });

  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setInsights(null);
    try {
      const result = await getJobInsightsAction(values);
      setInsights(result);
    } catch(e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch job insights. Please try again."
      })
    } finally {
      setIsLoading(false);
    }
  }


  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
              <SidebarMenuButton asChild tooltip="Dashboard">
                 <Link href="/dashboard">
                    <LayoutDashboard />
                    Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive tooltip="Job Insights">
                <Link href="/jobs">
                    <Briefcase />
                    Job Insights
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
                <Link href="/support">
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
        <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-1">Job Market Insights</h1>
                <p className="text-muted-foreground">Get AI-powered insights into any career path.</p>
            </div>
            
            <Card>
                <CardContent className="p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
                            <FormField
                            control={form.control}
                            name="jobTitle"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                <FormControl>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input placeholder="Enter a job title like 'Data Analyst'..." className="pl-10" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" disabled={isLoading}>
                               {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
                                <span className="ml-2 hidden sm:inline">Get Insights</span>
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {isLoading && <InsightsSkeleton />}
            
            {insights ? <InsightsDisplay data={insights} /> : !isLoading && (
              <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg bg-card mt-8">
                <Sparkles className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Curious About a Career?</h3>
                <p className="text-muted-foreground max-w-md">Enter a job title above to explore salary trends, required skills, and future demand, all powered by AI.</p>
              </div>
            )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
