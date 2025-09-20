import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ApplyInternshipSchema = z.object({
  internshipId: z.number(),
  userId: z.string(),
  userEmail: z.string().email(),
  userName: z.string(),
  userSkills: z.array(z.string()),
  userEducation: z.string(),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().optional(),
  applicationDate: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = ApplyInternshipSchema.parse(body);
    
    // In a real application, you would:
    // 1. Save the application to a database
    // 2. Send notification emails
    // 3. Track application status
    // 4. Integrate with company application systems
    
    // For now, we'll simulate a successful application
    const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json({
      success: true,
      applicationId,
      message: "Application submitted successfully!",
      data: {
        internshipId: validatedData.internshipId,
        userId: validatedData.userId,
        applicationDate: validatedData.applicationDate,
        status: "submitted",
        nextSteps: [
          "You will receive a confirmation email shortly",
          "The company will review your application within 3-5 business days",
          "Check your email for any follow-up requirements",
          "You can track your application status in your dashboard"
        ]
      }
    });
    
  } catch (error) {
    console.error("Error processing internship application:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid application data",
          details: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to process application. Please try again." 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  
  if (!userId) {
    return NextResponse.json(
      { success: false, error: "User ID is required" },
      { status: 400 }
    );
  }
  
  // In a real application, you would fetch applications from database
  // For now, return mock data
  const mockApplications = [
    {
      id: "APP-123456789",
      internshipId: 1,
      internshipTitle: "Frontend Development Intern",
      company: "TechCorp Solutions",
      applicationDate: new Date().toISOString(),
      status: "submitted",
      lastUpdated: new Date().toISOString()
    },
    {
      id: "APP-987654321",
      internshipId: 2,
      internshipTitle: "Data Science Intern",
      company: "DataFlow Analytics",
      applicationDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      status: "under_review",
      lastUpdated: new Date().toISOString()
    }
  ];
  
  return NextResponse.json({
    success: true,
    applications: mockApplications
  });
}
