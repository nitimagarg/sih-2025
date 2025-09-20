"use client";

import * as React from "react";
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
  BookOpen,
  LogOut,
  Briefcase,
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  ExternalLink,
  GraduationCap,
  Code,
  Building2,
  Calendar,
  Users,
  Star,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Sample internship data (fallback)
const sampleInternships = [
  {
    id: 1,
    title: "Frontend Development Intern",
    company: "TechCorp Solutions",
    location: "Remote",
    duration: "3 months",
    mode: "Remote",
    salary: "₹15,000/month",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    education: "Computer Science",
    requirements: "Basic knowledge of web development, portfolio projects",
    description: "Join our frontend team to work on cutting-edge web applications using React and modern JavaScript frameworks.",
    officialLink: "https://techcorp.com/careers",
    rating: 4.8,
    applicants: 245,
    posted: "2 days ago",
    category: "Development"
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "DataFlow Analytics",
    location: "Bangalore",
    duration: "6 months",
    mode: "Hybrid",
    salary: "₹20,000/month",
    skills: ["Python", "Machine Learning", "SQL", "Statistics"],
    education: "Data Science",
    requirements: "Python programming, statistics knowledge, GitHub profile",
    description: "Work with our data science team on real-world machine learning projects and data analysis.",
    officialLink: "https://dataflow.com/internships",
    rating: 4.6,
    applicants: 189,
    posted: "1 week ago",
    category: "Data Science"
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "DesignStudio Pro",
    location: "Mumbai",
    duration: "4 months",
    mode: "On-site",
    salary: "₹12,000/month",
    skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
    education: "Design",
    requirements: "Design portfolio, Figma experience, creative thinking",
    description: "Create beautiful and functional user interfaces for our mobile and web applications.",
    officialLink: "https://designstudio.com/jobs",
    rating: 4.7,
    applicants: 156,
    posted: "3 days ago",
    category: "Design"
  },
  {
    id: 4,
    title: "Backend Development Intern",
    company: "CloudTech Innovations",
    location: "Delhi",
    duration: "5 months",
    mode: "Hybrid",
    salary: "₹18,000/month",
    skills: ["Node.js", "Python", "MongoDB", "AWS"],
    education: "Computer Science",
    requirements: "Backend development experience, database knowledge, API design",
    description: "Build scalable backend systems and APIs for our cloud-based applications.",
    officialLink: "https://cloudtech.com/careers",
    rating: 4.9,
    applicants: 312,
    posted: "5 days ago",
    category: "Development"
  },
  {
    id: 5,
    title: "Digital Marketing Intern",
    company: "GrowthHackers Inc",
    location: "Remote",
    duration: "3 months",
    mode: "Remote",
    salary: "₹10,000/month",
    skills: ["Social Media", "SEO", "Google Analytics", "Content Creation"],
    education: "Marketing",
    requirements: "Social media experience, analytical skills, creative writing",
    description: "Drive our digital marketing campaigns and help grow our online presence.",
    officialLink: "https://growthhackers.com/internships",
    rating: 4.4,
    applicants: 98,
    posted: "1 day ago",
    category: "Marketing"
  },
  {
    id: 6,
    title: "Mobile App Development Intern",
    company: "AppCraft Studios",
    location: "Pune",
    duration: "4 months",
    mode: "On-site",
    salary: "₹16,000/month",
    skills: ["React Native", "Flutter", "iOS", "Android"],
    education: "Computer Science",
    requirements: "Mobile development experience, app store knowledge, cross-platform development",
    description: "Develop innovative mobile applications for iOS and Android platforms.",
    officialLink: "https://appcraft.com/jobs",
    rating: 4.5,
    applicants: 203,
    posted: "4 days ago",
    category: "Development"
  }
];

export default function InternshipsPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [searchSkills, setSearchSkills] = React.useState("");
  const [searchEducation, setSearchEducation] = React.useState("");
  const [filteredInternships, setFilteredInternships] = React.useState(sampleInternships);
  const [selectedInternship, setSelectedInternship] = React.useState<any>(null);
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchSummary, setSearchSummary] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [showApplyDialog, setShowApplyDialog] = React.useState(false);
  const [coverLetter, setCoverLetter] = React.useState("");
  const [isApplying, setIsApplying] = React.useState(false);
  const [filters, setFilters] = React.useState({
    duration: "all",
    mode: "all",
    salaryRange: "all",
    category: "all"
  });

  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleSearch = async () => {
    if (!searchSkills.trim() && !searchEducation.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter your skills or education background to search for internships.",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    try {
      const response = await fetch('/api/internships/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skills: searchSkills,
          education: searchEducation,
          filters: filters,
          userProfile: {
            experience: "Entry Level", // This could come from user profile
            location: "India", // This could come from user profile
            availability: "Immediate"
          }
        }),
      });

      const result = await response.json();
      console.log("Search API response:", result);

      if (result.success) {
        console.log("Setting internships:", result.data.internships);
        setFilteredInternships(result.data.internships);
        setSearchSummary(result.data.searchSummary);
        setSuggestions(result.data.suggestions);
        
        toast({
          title: "AI Search Complete",
          description: `Found ${result.data.internships.length} personalized internship matches!`,
        });
      } else {
        throw new Error(result.error || 'Search failed');
      }
    } catch (error) {
      console.error('Search error:', error);
      
      // Fallback to sample data
      setFilteredInternships(sampleInternships);
      setSearchSummary("Using sample data due to search error.");
      setSuggestions([]);
      
      toast({
        title: "Search Error",
        description: "Using sample internships. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleApplyInternship = async (internship: any) => {
    setSelectedInternship(internship);
    setShowApplyDialog(true);
  };

  const submitApplication = async () => {
    if (!selectedInternship || !user) return;

    setIsApplying(true);
    
    try {
      const response = await fetch('/api/internships/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          internshipId: selectedInternship.id,
          userId: user?.email || "unknown",
          userEmail: user.email,
          userName: user.displayName || "User",
          userSkills: searchSkills.split(',').map(s => s.trim()).filter(s => s),
          userEducation: searchEducation,
          coverLetter: coverLetter,
          applicationDate: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Application Submitted!",
          description: `Your application to ${selectedInternship.company} has been submitted successfully.`,
        });
        
        setShowApplyDialog(false);
        setCoverLetter("");
        setSelectedInternship(null);
      } else {
        throw new Error(result.error || 'Application failed');
      }
    } catch (error) {
      console.error('Application error:', error);
      toast({
        title: "Application Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsApplying(false);
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
        <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-1">Micro Internships</h1>
            <p className="text-muted-foreground">Discover relevant internships based on your skills and education.</p>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Find Your Perfect Internship
              </CardTitle>
              <CardDescription>
                Enter your skills and education to find matching internship opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    placeholder="e.g., React, JavaScript, Python"
                    value={searchSkills}
                    onChange={(e) => setSearchSkills(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Education Background</Label>
                  <Input
                    id="education"
                    placeholder="e.g., Computer Science, Data Science"
                    value={searchEducation}
                    onChange={(e) => setSearchEducation(e.target.value)}
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="font-medium">Filters</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select value={filters.duration} onValueChange={(value) => setFilters(prev => ({...prev, duration: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Durations</SelectItem>
                        <SelectItem value="short">Short (≤3 months)</SelectItem>
                        <SelectItem value="medium">Medium (3-6 months)</SelectItem>
                        <SelectItem value="long">Long (&gt;6 months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Mode</Label>
                    <Select value={filters.mode} onValueChange={(value) => setFilters(prev => ({...prev, mode: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Modes</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="on-site">On-site</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({...prev, category: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="data science">Data Science</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Salary Range</Label>
                    <Select value={filters.salaryRange} onValueChange={(value) => setFilters(prev => ({...prev, salaryRange: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Salary" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ranges</SelectItem>
                        <SelectItem value="low">₹10k-15k</SelectItem>
                        <SelectItem value="medium">₹15k-20k</SelectItem>
                        <SelectItem value="high">₹20k+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button onClick={handleSearch} className="w-full md:w-auto" disabled={isSearching}>
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching with AI...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search Internships
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Search Summary */}
          {searchSummary && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI Search Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{searchSummary}</p>
                {suggestions.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Suggestions to improve your profile:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Results Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Available Internships</h2>
              <Badge variant="secondary">{filteredInternships.length} results</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInternships.map((internship) => (
                <Card key={internship.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{internship.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {internship.company}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{internship.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{internship.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{internship.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{internship.salary}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{internship.applicants} applicants</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{internship.rating}/5</span>
                        <span className="text-xs text-muted-foreground">({internship.posted})</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {internship.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {internship.skills.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{internship.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex-1">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{internship.title}</DialogTitle>
                            <DialogDescription>
                              {internship.company} • {internship.location}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  <span className="font-medium">Duration</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{internship.duration}</p>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span className="font-medium">Mode</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{internship.mode}</p>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-4 w-4" />
                                  <span className="font-medium">Salary</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{internship.salary}</p>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <GraduationCap className="h-4 w-4" />
                                  <span className="font-medium">Education</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{internship.education}</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Code className="h-4 w-4" />
                                <span className="font-medium">Required Skills</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {internship.skills.map((skill) => (
                                  <Badge key={skill} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                <span className="font-medium">Requirements</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{internship.requirements}</p>
                            </div>

                            <div className="space-y-2">
                              <span className="font-medium">Description</span>
                              <p className="text-sm text-muted-foreground">{internship.description}</p>
                            </div>

                            <div className="flex gap-2 pt-4">
                              <Button 
                                onClick={() => handleApplyInternship(internship)}
                                className="flex-1"
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Apply Now
                              </Button>
                              <Button variant="outline" asChild>
                                <a href={internship.officialLink} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Official Website
                                </a>
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        onClick={() => handleApplyInternship(internship)}
                        className="flex-1"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredInternships.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No internships found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters to find more opportunities.
                  </p>
                  <Button onClick={() => {
                    setSearchSkills("");
                    setSearchEducation("");
                    setFilters({ duration: "all", mode: "all", salaryRange: "all", category: "all" });
                    setFilteredInternships(sampleInternships);
                  }}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Application Dialog */}
          <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Apply for {selectedInternship?.title}</DialogTitle>
                <DialogDescription>
                  {selectedInternship?.company} • {selectedInternship?.location}
                </DialogDescription>
              </DialogHeader>
              
              {selectedInternship && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">Duration</span>
                      </div>
                      <p className="text-muted-foreground">{selectedInternship.duration}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">Mode</span>
                      </div>
                      <p className="text-muted-foreground">{selectedInternship.mode}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-medium">Salary</span>
                      </div>
                      <p className="text-muted-foreground">{selectedInternship.salary}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        <span className="font-medium">Rating</span>
                      </div>
                      <p className="text-muted-foreground">{selectedInternship.rating}/5</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cover-letter">Cover Letter (Optional)</Label>
                    <Textarea
                      id="cover-letter"
                      placeholder="Tell the company why you're interested in this internship and what you can bring to the role..."
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Your Application Details:</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Name:</strong> {user?.displayName || "User"}</p>
                      <p><strong>Email:</strong> {user?.email}</p>
                      <p><strong>Skills:</strong> {searchSkills || "Not specified"}</p>
                      <p><strong>Education:</strong> {searchEducation || "Not specified"}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-2">
                    <Button 
                      onClick={submitApplication} 
                      disabled={isApplying}
                      className="flex-1"
                    >
                      {isApplying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Submit Application
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowApplyDialog(false)}
                      disabled={isApplying}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
