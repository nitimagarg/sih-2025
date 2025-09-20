import { NextRequest, NextResponse } from "next/server";
import { searchInternships } from "@/ai/flows/search-internships";
import { z } from "zod";

const SearchRequestSchema = z.object({
  skills: z.string(),
  education: z.string(),
  filters: z.object({
    duration: z.string(),
    mode: z.string(),
    category: z.string(),
    salaryRange: z.string()
  }),
  userProfile: z.object({
    experience: z.string().optional(),
    location: z.string().optional(),
    availability: z.string().optional()
  }).optional()
});

// Fallback sample data when AI is not available
const generateFallbackInternships = (input: any) => {
  const baseInternships = [
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
      category: "Development",
      matchScore: 85,
      whyRecommended: "Your React and JavaScript skills align perfectly with this role, and the remote work setup matches your preferences."
    },
    {
      id: 7,
      title: "Full Stack Development Intern",
      company: "WebCraft Studios",
      location: "Bangalore",
      duration: "4 months",
      mode: "Hybrid",
      salary: "₹18,000/month",
      skills: ["React", "JavaScript", "Node.js", "MongoDB"],
      education: "Computer Science",
      requirements: "React and JavaScript experience, basic backend knowledge",
      description: "Work on full-stack web applications using React frontend and Node.js backend technologies.",
      officialLink: "https://webcraft.com/internships",
      rating: 4.6,
      applicants: 189,
      posted: "1 day ago",
      category: "Development",
      matchScore: 88,
      whyRecommended: "Perfect match for your React and JavaScript skills with opportunity to learn backend development."
    },
    {
      id: 8,
      title: "JavaScript Developer Intern",
      company: "CodeFlow Technologies",
      location: "Mumbai",
      duration: "3 months",
      mode: "On-site",
      salary: "₹16,000/month",
      skills: ["JavaScript", "React", "Vue.js", "TypeScript"],
      education: "Computer Science",
      requirements: "Strong JavaScript fundamentals, React experience preferred",
      description: "Develop interactive web applications using modern JavaScript frameworks and libraries.",
      officialLink: "https://codeflow.com/careers",
      rating: 4.7,
      applicants: 156,
      posted: "3 days ago",
      category: "Development",
      matchScore: 90,
      whyRecommended: "Excellent opportunity to deepen your JavaScript and React expertise with real-world projects."
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
      category: "Data Science",
      matchScore: 78,
      whyRecommended: "Your Python skills and data science education make you a strong candidate for this position."
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
      category: "Design",
      matchScore: 72,
      whyRecommended: "This role offers great experience in modern design tools and user-centered design principles."
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
      category: "Development",
      matchScore: 82,
      whyRecommended: "Your technical background and interest in backend development align well with this opportunity."
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
      category: "Marketing",
      matchScore: 68,
      whyRecommended: "This role provides hands-on experience in digital marketing strategies and analytics."
    }
  ];

  // Filter based on user input (more lenient filtering)
  let filtered = baseInternships;

  if (input.skills && input.skills.trim()) {
    const skillsArray = input.skills.toLowerCase().split(',').map((s: string) => s.trim()).filter(s => s);
    if (skillsArray.length > 0) {
      // Prioritize internships with exact skill matches
      filtered = filtered.filter(internship => 
        skillsArray.some(skill => 
          internship.skills.some(internshipSkill => 
            internshipSkill.toLowerCase().includes(skill) || 
            skill.includes(internshipSkill.toLowerCase())
          )
        )
      );
      
      // Sort by number of matching skills (most relevant first)
      filtered.sort((a, b) => {
        const aMatches = skillsArray.filter(skill => 
          a.skills.some(internshipSkill => 
            internshipSkill.toLowerCase().includes(skill) || 
            skill.includes(internshipSkill.toLowerCase())
          )
        ).length;
        const bMatches = skillsArray.filter(skill => 
          b.skills.some(internshipSkill => 
            internshipSkill.toLowerCase().includes(skill) || 
            skill.includes(internshipSkill.toLowerCase())
          )
        ).length;
        return bMatches - aMatches;
      });
    }
  }

  if (input.education && input.education.trim()) {
    filtered = filtered.filter(internship => 
      internship.education.toLowerCase().includes(input.education.toLowerCase())
    );
  }

  // If no matches found, return all internships
  if (filtered.length === 0) {
    filtered = baseInternships;
  }

  // Apply additional filters
  if (input.filters.duration !== "all") {
    filtered = filtered.filter(internship => {
      const duration = parseInt(internship.duration);
      switch (input.filters.duration) {
        case "short": return duration <= 3;
        case "medium": return duration > 3 && duration <= 6;
        case "long": return duration > 6;
        default: return true;
      }
    });
  }

  if (input.filters.mode !== "all") {
    filtered = filtered.filter(internship => 
      internship.mode.toLowerCase() === input.filters.mode.toLowerCase()
    );
  }

  if (input.filters.category !== "all") {
    filtered = filtered.filter(internship => 
      internship.category.toLowerCase() === input.filters.category.toLowerCase()
    );
  }

  return {
    internships: filtered,
    searchSummary: `Found ${filtered.length} internship opportunities${input.skills ? ` matching your skills in ${input.skills}` : ''}${input.education ? ` and education in ${input.education}` : ''}. These positions offer great learning opportunities and hands-on experience in your field of interest.`,
    suggestions: [
      "Consider building a portfolio showcasing your projects",
      "Practice coding challenges to improve technical skills",
      "Network with professionals in your desired field",
      "Take online courses to fill any skill gaps"
    ]
  };
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = SearchRequestSchema.parse(body);
    
    // Try to use AI first, fallback to sample data if it fails
    let result;
    try {
      console.log("Attempting AI search with data:", validatedData);
      result = await searchInternships(validatedData);
      console.log("AI search successful, found internships:", result.internships.length);
    } catch (aiError) {
      console.error("AI search failed, using fallback:", aiError);
      result = generateFallbackInternships(validatedData);
      console.log("Using fallback data, found internships:", result.internships.length);
    }
    
    return NextResponse.json({
      success: true,
      data: result
    });
    
  } catch (error) {
    console.error("Error searching internships:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid search parameters",
          details: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to search internships. Please try again." 
      },
      { status: 500 }
    );
  }
}
