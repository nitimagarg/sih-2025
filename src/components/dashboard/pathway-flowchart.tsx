"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Award, Briefcase, Lightbulb, ArrowRight, CheckCircle, ExternalLink, TrendingUp, Star, Trophy, Clock } from "lucide-react";
import type { Pathway } from "@/lib/types";

interface PathwayFlowchartProps {
  pathways: Pathway[];
  onToggleComplete: (pathwayIndex: number, itemType: keyof Omit<Pathway, 'id'>, itemIndex: number) => void;
}

const stepIcons = {
  courses: <BookOpen className="h-5 w-5" />,
  microCredentials: <Award className="h-5 w-5" />,
  certifications: <Award className="h-5 w-5" />,
  onTheJobTraining: <Briefcase className="h-5 w-5" />,
};

const stepColors = {
  courses: "bg-blue-100 text-blue-800 border-blue-200",
  microCredentials: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  certifications: "bg-green-100 text-green-800 border-green-200",
  onTheJobTraining: "bg-purple-100 text-purple-800 border-purple-200",
};

const stepLabels = {
  courses: "Courses",
  microCredentials: "Micro-Credentials",
  certifications: "Certifications", 
  onTheJobTraining: "On-the-Job Training",
};

// Helper function to generate course/credential links
const generateCourseLink = (itemName: string, itemType: string) => {
  const baseUrls = {
    courses: {
      'react': 'https://react.dev/learn',
      'javascript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      'typescript': 'https://www.typescriptlang.org/docs/',
      'node': 'https://nodejs.org/en/docs/',
      'python': 'https://docs.python.org/3/',
      'java': 'https://docs.oracle.com/en/java/',
      'aws': 'https://aws.amazon.com/training/',
      'docker': 'https://docs.docker.com/',
      'kubernetes': 'https://kubernetes.io/docs/',
      'sql': 'https://www.w3schools.com/sql/',
      'mongodb': 'https://docs.mongodb.com/',
      'git': 'https://git-scm.com/doc',
      'html': 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      'css': 'https://developer.mozilla.org/en-US/docs/Web/CSS',
      'tailwind': 'https://tailwindcss.com/docs',
      'next': 'https://nextjs.org/docs',
      'express': 'https://expressjs.com/',
      'django': 'https://docs.djangoproject.com/',
      'flask': 'https://flask.palletsprojects.com/',
      'spring': 'https://spring.io/docs',
    },
    microCredentials: {
      'google': 'https://cloud.google.com/certification',
      'microsoft': 'https://learn.microsoft.com/en-us/certifications/',
      'aws': 'https://aws.amazon.com/certification/',
      'coursera': 'https://www.coursera.org/',
      'edx': 'https://www.edx.org/',
      'udemy': 'https://www.udemy.com/',
    },
    certifications: {
      'pmp': 'https://www.pmi.org/certifications/project-management-pmp',
      'scrum': 'https://www.scrum.org/',
      'itil': 'https://www.axelos.com/certifications/itil-service-management',
      'cisco': 'https://www.cisco.com/c/en_in/training-events/training-certifications.html',
      'comptia': 'https://www.comptia.org/certifications',
    },
    onTheJobTraining: {
      'internship': 'https://www.linkedin.com/jobs/',
      'mentorship': 'https://www.linkedin.com/learning/',
      'project': 'https://github.com/',
    }
  };

  const lowerName = itemName.toLowerCase();
  const urls = baseUrls[itemType as keyof typeof baseUrls] || {};
  
  // Find matching URL
  for (const [key, url] of Object.entries(urls)) {
    if (lowerName.includes(key)) {
      return url;
    }
  }
  
  // Default fallback URLs
  const defaultUrls = {
    courses: 'https://www.coursera.org/',
    microCredentials: 'https://www.edx.org/',
    certifications: 'https://www.pmi.org/',
    onTheJobTraining: 'https://www.linkedin.com/learning/',
  };
  
  return defaultUrls[itemType as keyof typeof defaultUrls] || 'https://www.coursera.org/';
};

// Helper function to determine if item is "In Demand"
const isInDemand = (itemName: string) => {
  const inDemandKeywords = [
    'react', 'javascript', 'typescript', 'python', 'aws', 'docker', 'kubernetes',
    'node', 'sql', 'mongodb', 'git', 'html', 'css', 'tailwind', 'next',
    'express', 'django', 'flask', 'spring', 'java', 'pmp', 'scrum', 'agile'
  ];
  
  const lowerName = itemName.toLowerCase();
  return inDemandKeywords.some(keyword => lowerName.includes(keyword));
};

export function PathwayFlowchart({ pathways, onToggleComplete }: PathwayFlowchartProps) {
  const [togglingItem, setTogglingItem] = React.useState<string | null>(null);

  if (!pathways || pathways.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">No pathways available to display.</p>
        </CardContent>
      </Card>
    );
  }

  const handleToggle = (pathwayIndex: number, itemType: keyof Omit<Pathway, 'id'>, itemIndex: number) => {
    const itemKey = `${pathwayIndex}-${itemType}-${itemIndex}`;
    setTogglingItem(itemKey);
    
    // Add a small delay to show the loading state
    setTimeout(() => {
      onToggleComplete(pathwayIndex, itemType, itemIndex);
      setTogglingItem(null);
    }, 300);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Your Learning Journey</h2>
        <p className="text-muted-foreground">Follow this visual roadmap to achieve your career goals</p>
      </div>

      {pathways.map((pathway, pathwayIndex) => {
        // Create a flat array of all steps in order
        const allSteps = [
          ...pathway.courses.map((item, index) => ({ ...item, type: 'courses' as const, originalIndex: index })),
          ...pathway.microCredentials.map((item, index) => ({ ...item, type: 'microCredentials' as const, originalIndex: index })),
          ...pathway.certifications.map((item, index) => ({ ...item, type: 'certifications' as const, originalIndex: index })),
          ...pathway.onTheJobTraining.map((item, index) => ({ ...item, type: 'onTheJobTraining' as const, originalIndex: index })),
        ];

        return (
          <Card key={pathway.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl">Pathway {pathwayIndex + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Flowchart Container */}
                <div className="space-y-4">
                  {allSteps.map((step, stepIndex) => (
                    <div key={`${step.type}-${step.originalIndex}`} className="relative">
                      {/* Connection Line */}
                      {stepIndex > 0 && (
                        <div className="absolute left-6 top-0 w-0.5 h-4 bg-gray-300 -translate-y-4" />
                      )}
                      
                      {/* Step Card */}
                      <div className="flex items-start gap-4">
                        {/* Step Number/Icon */}
                        <div className="flex-shrink-0 relative">
                          <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            step.completed 
                              ? 'bg-green-500 border-green-600 text-white shadow-lg scale-110' 
                              : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                          }`}>
                            {step.completed ? (
                              <CheckCircle className="h-6 w-6" />
                            ) : (
                              <span className="text-sm font-semibold">{stepIndex + 1}</span>
                            )}
                          </div>
                          {/* Completion ring animation */}
                          {step.completed && (
                            <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-75"></div>
                          )}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant="outline" 
                              className={`${stepColors[step.type]} text-xs`}
                            >
                              {stepIcons[step.type]}
                              <span className="ml-1">{stepLabels[step.type]}</span>
                            </Badge>
                            {isInDemand(step.name) && (
                              <Badge variant="outline" className="border-green-500 text-green-600 text-xs flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                In Demand
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className={`font-medium text-lg ${
                              step.completed ? 'line-through text-muted-foreground' : ''
                            }`}>
                              {step.name}
                            </h3>
                            <a
                              href={generateCourseLink(step.name, step.type)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 transition-colors"
                              title="Open course/credential page"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                          
                          {/* Action Button */}
                          <div className="mt-3">
                            <button
                              onClick={() => handleToggle(pathwayIndex, step.type, step.originalIndex)}
                              disabled={togglingItem === `${pathwayIndex}-${step.type}-${step.originalIndex}`}
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                                step.completed
                                  ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg border-2 border-green-600'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md border border-gray-300'
                              }`}
                            >
                              {togglingItem === `${pathwayIndex}-${step.type}-${step.originalIndex}` ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                  <span>Updating...</span>
                                </>
                              ) : step.completed ? (
                                <>
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="font-semibold">✓ Item Checked</span>
                                  <Star className="h-3 w-3 text-yellow-300" />
                                </>
                              ) : (
                                <>
                                  <div className="w-4 h-4 rounded-full border-2 border-gray-400 hover:border-gray-600 transition-colors" />
                                  <span>Mark Complete</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Arrow to next step */}
                      {stepIndex < allSteps.length - 1 && (
                        <div className="flex justify-center mt-4">
                          <ArrowRight className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Enhanced Progress Summary */}
                <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      <span className="text-lg font-semibold text-gray-800">Progress Overview</span>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary animate-pulse">
                        {Math.round((allSteps.filter(step => step.completed).length / allSteps.length) * 100)}%
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        <span className="text-green-600 font-bold">
                          {allSteps.filter(step => step.completed).length}
                        </span> / {allSteps.length} completed
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4 relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-primary to-blue-500 h-3 rounded-full transition-all duration-700 ease-out relative"
                      style={{ 
                        width: `${Math.max(0, (allSteps.filter(step => step.completed).length / allSteps.length) * 100)}%` 
                      }}
                    >
                      {/* Progress bar animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
                    </div>
                  </div>

                  {/* Progress Statistics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-4 bg-white rounded-lg border-2 border-blue-100">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">Courses</span>
                      </div>
                      <div className="text-xl font-bold text-blue-600">
                        <span className="text-green-600">
                          {allSteps.filter(step => step.type === 'courses' && step.completed).length}
                        </span> / {allSteps.filter(step => step.type === 'courses').length}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border-2 border-yellow-100">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">Credentials</span>
                      </div>
                      <div className="text-xl font-bold text-yellow-600">
                        <span className="text-green-600">
                          {allSteps.filter(step => (step.type === 'microCredentials' || step.type === 'certifications') && step.completed).length}
                        </span> / {allSteps.filter(step => step.type === 'microCredentials' || step.type === 'certifications').length}
                      </div>
                    </div>
                  </div>

                  {/* Motivational Message */}
                  <div className="text-center">
                    {allSteps.filter(step => step.completed).length === 0 && (
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">Start your learning journey!</span>
                      </div>
                    )}
                    {allSteps.filter(step => step.completed).length > 0 && allSteps.filter(step => step.completed).length < allSteps.length && (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <Star className="h-4 w-4" />
                        <span className="font-medium">Keep going! You're making great progress.</span>
                      </div>
                    )}
                    {allSteps.filter(step => step.completed).length === allSteps.length && (
                      <div className="flex items-center justify-center gap-2 text-yellow-600">
                        <Trophy className="h-4 w-4" />
                        <span className="font-bold text-lg">🎉 Congratulations! You've completed this pathway!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
