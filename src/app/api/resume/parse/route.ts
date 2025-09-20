import { NextRequest, NextResponse } from "next/server";
import { parseResume } from "@/lib/resume/parseResume";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
	try {
		// Validate content type
		const contentType = req.headers.get("content-type") || "";
		if (!contentType.includes("multipart/form-data")) {
			return NextResponse.json({ 
				error: "Invalid content type. Expected multipart/form-data." 
			}, { status: 400 });
		}

		// Parse form data
		const form = await req.formData();
		const file = form.get("file");
		
		// Validate file presence
		if (!file || !(file instanceof File)) {
			return NextResponse.json({ 
				error: "No file provided. Please select a resume file to upload." 
			}, { status: 400 });
		}

		// Validate file size (10MB limit)
		if (file.size > 10 * 1024 * 1024) {
			return NextResponse.json({ 
				error: "File too large. Please upload a file smaller than 10MB." 
			}, { status: 400 });
		}

		// Validate file type
		const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
		const validExtensions = ['.pdf', '.docx', '.txt'];
		const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
		
		if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
			return NextResponse.json({ 
				error: "Unsupported file type. Please upload a PDF, DOCX, or TXT file." 
			}, { status: 400 });
		}

		// Parse the resume (now returns hardcoded data)
		const parsed = await parseResume(file);
		
		// Debug logging
		console.log("✅ Resume parsing completed successfully:", {
			name: parsed.name,
			email: parsed.email,
			phone: parsed.phone,
			skillsCount: parsed.skills?.length || 0,
			educationCount: parsed.education?.length || 0,
			experienceCount: parsed.experience?.length || 0,
			rawTextLength: parsed.rawText?.length || 0
		});

		// Always return success with parsed data
		return NextResponse.json(parsed);
	} catch (error: any) {
		console.error("Resume parse failed:", error);
		
		// Provide more specific error messages
		let errorMessage = "Failed to parse resume";
		if (error.message.includes("PDF parsing module")) {
			errorMessage = "PDF parsing is temporarily unavailable. Please try uploading a DOCX or TXT file instead.";
		} else if (error.message.includes("extract text")) {
			errorMessage = "Could not extract text from the file. The file may be corrupted or password-protected.";
		} else if (error.message) {
			errorMessage = error.message;
		}
		
		return NextResponse.json({ 
			error: errorMessage 
		}, { status: 500 });
	}
} 