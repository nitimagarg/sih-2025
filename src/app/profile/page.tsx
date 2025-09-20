
"use client";

import * as React from "react";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset } from "@/components/ui/sidebar";
import Link from "next/link";
import { LayoutDashboard, Briefcase, BookOpen, Settings, User, Loader2, GraduationCap } from "lucide-react";
import { Logo } from "@/components/logo";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeDropzone, ResumeParsedData } from "@/components/resume/ResumeDropzone";
import { useProfile, UserProfile } from "@/hooks/use-profile";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
	const { user, loading } = useAuth();
	const router = useRouter();
	const { toast } = useToast();
	const { profile, saveProfile, loading: profileLoading } = useProfile();

	const [isFormVisible, setIsFormVisible] = React.useState(true);

	React.useEffect(() => {
		if (!loading && !user) router.push("/");
	}, [user, loading, router]);


	if (loading || profileLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-background">
				<Loader2 className="w-12 h-12 animate-spin text-primary" />
			</div>
		);
	}

	const autofill = (data: ResumeParsedData) => {
		const next: UserProfile = {
			name: data.name || "",
			email: data.email || "",
			phone: data.phone || "",
			skills: data.skills || [],
			education: data.education || [],
			experience: data.experience || [],
		};
		saveProfile(next);
		
		// Hide the form after successful parsing
		setIsFormVisible(false);
		
		// Enhanced success message with more details
		const extractedFields = [];
		if (data.name) extractedFields.push(`Name: ${data.name}`);
		if (data.email) extractedFields.push(`Email: ${data.email}`);
		if (data.phone) extractedFields.push(`Phone: ${data.phone}`);
		if (data.skills?.length) extractedFields.push(`${data.skills.length} skills`);
		if (data.education?.length) extractedFields.push(`${data.education.length} education entries`);
		if (data.experience?.length) extractedFields.push(`${data.experience.length} experience entries`);
		
		const summary = extractedFields.join(" • ");
		toast({ 
			title: "Profile Updated Successfully", 
			description: summary || "We extracted details from your resume and updated your profile.",
			duration: 5000
		});
	};

	const onParseError = (message: string) => {
		toast({ variant: "destructive", title: "Parsing failed", description: message });
	};


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
							<SidebarMenuButton asChild isActive tooltip="Profile">
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
			</Sidebar>
			<SidebarInset>
				<main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
					<div className="mb-8">
						<h1 className="text-3xl font-bold tracking-tight mb-1">Profile</h1>
						<p className="text-muted-foreground">Upload your resume to automatically update your profile.</p>
					</div>

					<div className="grid gap-8">
						<Card>
							<CardHeader>
								<CardTitle>Autofill from Resume</CardTitle>
								<CardDescription>Drop your resume. We'll extract the basics for you.</CardDescription>
							</CardHeader>
							<CardContent>
								<ResumeDropzone onParsed={autofill} onError={onParseError} />
							</CardContent>
						</Card>

						{!isFormVisible && (
							<Card>
								<CardHeader>
									<CardTitle>Profile Updated Successfully!</CardTitle>
									<CardDescription>Your profile has been updated with the extracted resume data.</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="text-center py-8">
										<div className="text-6xl mb-4">✅</div>
										<h3 className="text-xl font-semibold mb-2">Profile Complete</h3>
										<p className="text-muted-foreground mb-4">
											Your resume has been successfully parsed and your profile has been updated.
										</p>
									</div>
								</CardContent>
							</Card>
						)}
					</div>
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
