"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Loader2, CheckCircle, AlertCircle, Eye, X } from "lucide-react";

export interface ResumeParsedData {
	name?: string;
	email?: string;
	phone?: string;
	skills?: string[];
	education?: string[];
	experience?: string[];
	rawText: string;
}

export function ResumeDropzone({ onParsed, onError }: { onParsed: (data: ResumeParsedData) => void; onError?: (message: string) => void }) {
	const [dragOver, setDragOver] = React.useState(false);
	const [uploading, setUploading] = React.useState(false);
	const [fileName, setFileName] = React.useState<string | null>(null);
	const [status, setStatus] = React.useState<string | null>(null);
	const [parsedData, setParsedData] = React.useState<ResumeParsedData | null>(null);
	const [showPreview, setShowPreview] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const handleFiles = async (files: FileList | null) => {
		if (!files || !files.length) return;
		const file = files[0];
		
		// Validate file type
		const validTypes = ['.pdf', '.docx', '.txt'];
		const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
		if (!validTypes.includes(fileExtension)) {
			const errorMsg = `Unsupported file type. Please upload a PDF, DOCX, or TXT file.`;
			setError(errorMsg);
			onError?.(errorMsg);
			return;
		}
		
		// Validate file size (10MB limit)
		if (file.size > 10 * 1024 * 1024) {
			const errorMsg = `File too large. Please upload a file smaller than 10MB.`;
			setError(errorMsg);
			onError?.(errorMsg);
			return;
		}
		
		setFileName(file.name);
		setUploading(true);
		setStatus("Processing your resume...");
		setError(null);
		setParsedData(null);
		
		try {
			const form = new FormData();
			form.append("file", file);
			const res = await fetch("/api/resume/parse", { method: "POST", body: form });
			
			if (!res.ok) {
				const errorData = await res.json().catch(() => ({}));
				throw new Error(errorData.error || `Upload failed with status ${res.status}`);
			}
			
			const data = await res.json();
			setParsedData(data);
			setStatus("Resume parsed successfully!");
			setShowPreview(true);
		} catch (e: any) {
			console.error("Resume parsing error:", e);
			const errorMsg = e?.message || "Failed to parse resume. Please try again.";
			setError(errorMsg);
			setStatus("Failed to parse resume");
			onError?.(errorMsg);
		} finally {
			setUploading(false);
		}
	};

	const handleApplyParsedData = () => {
		if (parsedData) {
			onParsed(parsedData);
			setShowPreview(false);
		}
	};

	const handleReset = () => {
		setFileName(null);
		setStatus(null);
		setError(null);
		setParsedData(null);
		setShowPreview(false);
	};

	return (
		<div className="space-y-4">
			{/* Main Upload Card */}
			<Card className={`border-dashed transition-all ${dragOver ? "border-primary bg-primary/5" : "border-slate-200"} ${error ? "border-red-300 bg-red-50/50" : ""}`}>
				<CardContent className="p-6">
					<label
						onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
						onDragLeave={() => setDragOver(false)}
						onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
						className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg p-8 text-center transition-all ${
							uploading ? "cursor-not-allowed opacity-50" : "hover:bg-accent/50"
						}`}
					>
						{uploading ? (
							<div className="flex flex-col items-center gap-3">
								<Loader2 className="h-10 w-10 animate-spin text-primary" />
								<div className="text-sm font-medium text-primary">Processing...</div>
							</div>
						) : error ? (
							<div className="flex flex-col items-center gap-3">
								<AlertCircle className="h-10 w-10 text-red-500" />
								<div className="text-sm font-medium text-red-700">Upload Error</div>
							</div>
						) : (
							<div className="flex flex-col items-center gap-3">
								<Upload className="h-10 w-10 text-primary" />
								<div className="space-y-1">
									<div className="text-lg font-semibold">Drop your resume here</div>
									<div className="text-sm text-muted-foreground">PDF, DOCX, or TXT up to 10MB</div>
								</div>
							</div>
						)}
						<input 
							type="file" 
							accept=".pdf,.docx,.txt" 
							className="hidden" 
							onChange={(e) => handleFiles(e.target.files)}
							disabled={uploading}
						/>
					</label>
					
					{/* File Status */}
					{fileName && (
						<div className="mt-4 flex items-center justify-between rounded-lg border bg-slate-50 p-3">
							<div className="flex items-center gap-3">
								<FileText className="h-5 w-5 text-slate-600" />
								<div>
									<div className="text-sm font-medium">{fileName}</div>
									{status && (
										<div className={`text-xs flex items-center gap-1 ${
											error ? "text-red-600" : "text-green-600"
										}`}>
											{error ? <AlertCircle className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
											{status}
										</div>
									)}
								</div>
							</div>
							{!uploading && (
								<Button variant="ghost" size="sm" onClick={handleReset}>
									<X className="h-4 w-4" />
								</Button>
							)}
						</div>
					)}
					
					{/* Error Message */}
					{error && (
						<div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
							<div className="flex items-center gap-2 text-sm text-red-700">
								<AlertCircle className="h-4 w-4" />
								{error}
							</div>
						</div>
					)}
					
					{/* Action Buttons */}
					<div className="mt-4 flex justify-center gap-3">
						<Button 
							type="button" 
							variant="outline" 
							onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()} 
							disabled={uploading}
						>
							{uploading ? "Processing..." : "Choose File"}
						</Button>
						{parsedData && !showPreview && (
							<Button onClick={() => setShowPreview(true)} variant="secondary">
								<Eye className="h-4 w-4 mr-2" />
								Preview Data
							</Button>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Parsed Data Preview */}
			{showPreview && parsedData && (
				<Card className="border-green-200 bg-green-50/50">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-green-800">
							<CheckCircle className="h-5 w-5" />
							Extracted Information
						</CardTitle>
						<CardDescription>
							Review the extracted data before applying it to your profile.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* Basic Info */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{parsedData.name && (
								<div className="space-y-1">
									<label className="text-xs font-medium text-slate-600">Name</label>
									<div className="text-sm font-medium">{parsedData.name}</div>
								</div>
							)}
							{parsedData.email && (
								<div className="space-y-1">
									<label className="text-xs font-medium text-slate-600">Email</label>
									<div className="text-sm font-medium">{parsedData.email}</div>
								</div>
							)}
							{parsedData.phone && (
								<div className="space-y-1">
									<label className="text-xs font-medium text-slate-600">Phone</label>
									<div className="text-sm font-medium">{parsedData.phone}</div>
								</div>
							)}
						</div>

						{/* Skills */}
						{parsedData.skills && parsedData.skills.length > 0 && (
							<div className="space-y-2">
								<label className="text-xs font-medium text-slate-600">Skills</label>
								<div className="flex flex-wrap gap-2">
									{parsedData.skills.slice(0, 10).map((skill, index) => (
										<Badge key={index} variant="secondary" className="text-xs">
											{skill}
										</Badge>
									))}
									{parsedData.skills.length > 10 && (
										<Badge variant="outline" className="text-xs">
											+{parsedData.skills.length - 10} more
										</Badge>
									)}
								</div>
							</div>
						)}

						{/* Education */}
						{parsedData.education && parsedData.education.length > 0 && (
							<div className="space-y-2">
								<label className="text-xs font-medium text-slate-600">Education</label>
								<div className="space-y-1">
									{parsedData.education.slice(0, 3).map((edu, index) => (
										<div key={index} className="text-sm bg-white rounded p-2 border">
											{edu}
										</div>
									))}
									{parsedData.education.length > 3 && (
										<div className="text-xs text-slate-500">
											+{parsedData.education.length - 3} more entries
										</div>
									)}
								</div>
							</div>
						)}

						{/* Experience */}
						{parsedData.experience && parsedData.experience.length > 0 && (
							<div className="space-y-2">
								<label className="text-xs font-medium text-slate-600">Experience</label>
								<div className="space-y-1">
									{parsedData.experience.slice(0, 3).map((exp, index) => (
										<div key={index} className="text-sm bg-white rounded p-2 border">
											{exp}
										</div>
									))}
									{parsedData.experience.length > 3 && (
										<div className="text-xs text-slate-500">
											+{parsedData.experience.length - 3} more entries
										</div>
									)}
								</div>
							</div>
						)}

						{/* Action Buttons */}
						<div className="flex justify-end gap-3 pt-4 border-t">
							<Button variant="outline" onClick={() => setShowPreview(false)}>
								Cancel
							</Button>
							<Button onClick={handleApplyParsedData} className="bg-green-600 hover:bg-green-700">
								<CheckCircle className="h-4 w-4 mr-2" />
								Apply to Profile
							</Button>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
} 