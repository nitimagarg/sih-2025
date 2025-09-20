import * as React from "react";
import type { GeneratePersonalizedTrainingPathwaysOutput } from "@/ai/flows/generate-personalized-training-pathways";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Award, Briefcase, Lightbulb, Check } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import type { Pathway } from "@/lib/types";

interface PathwayDisplayProps {
  data: GeneratePersonalizedTrainingPathwaysOutput;
  pathways: Pathway[];
  onToggleComplete: (pathwayIndex: number, itemType: keyof Omit<Pathway, 'id'>, itemIndex: number) => void;
}

const iconMapping = {
  courses: <BookOpen className="h-5 w-5 text-primary" />,
  microCredentials: <Award className="h-5 w-5 text-yellow-500" />,
  certifications: <Award className="h-5 w-5 text-green-500" />,
  onTheJobTraining: <Briefcase className="h-5 w-5 text-indigo-500" />,
};

export function PathwayDisplay({ data, pathways, onToggleComplete }: PathwayDisplayProps) {
  const hasPathways = pathways && pathways.length > 0;
  const hasSkillGaps = data.skillGaps && data.skillGaps.length > 0;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Your Personalized Plan</h2>
      
      {hasSkillGaps && (
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            <CardTitle>Identified Skill Gaps</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Here are the key areas to focus on to achieve your career aspirations.
            </p>
            <div className="flex flex-wrap gap-2">
              {data.skillGaps.map((gap, index) => (
                <Badge key={index} variant="secondary" className="text-base px-3 py-1">{gap}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {hasPathways ? pathways.map((pathway, pIndex) => (
        <Card key={pathway.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl">Recommended Pathway {pIndex + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" defaultValue={['courses']} className="w-full">
              {Object.entries(pathway).map(([key, value]) => {
                if (Array.isArray(value) && value.length > 0) {
                  const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                  const itemType = key as keyof Omit<Pathway, 'id'>;

                  return (
                    <AccordionItem value={key} key={key}>
                      <AccordionTrigger className="text-lg font-medium">
                        <div className="flex items-center gap-3">
                          {iconMapping[key as keyof typeof iconMapping]}
                          {title}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-3 pl-2">
                          {value.map((item, iIndex) => (
                            <React.Fragment key={iIndex}>
                              <li className="flex items-start gap-3 group">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className={`h-6 w-6 rounded-full mt-0.5 shrink-0 ${item.completed ? 'bg-green-100 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200'}`}
                                  onClick={() => onToggleComplete(pIndex, itemType, iIndex)}
                                >
                                  <Check className={`h-4 w-4 transition-colors ${item.completed ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                </Button>
                                <div>
                                  {itemType === 'courses' && (
                                    <Button variant="ghost" size="icon" className="ml-2" onClick={() => alert(`Requesting help for: ${item.name}`)}>
                                      Having trouble?
                                    </Button>
                                  )}
                                  {Math.random() > 0.7 && <Badge variant="outline" className="ml-2 border-green-500 text-green-600">In Demand</Badge>}
                                </div>
                              </li>
                              {/* Render substeps if present */}
                              {itemType === 'courses' && item.substeps && item.substeps.length > 0 && (
                                <ul className="pl-8 mt-1 space-y-2">
                                  {item.substeps.map((sub: string, subIdx: number) => (
                                    <li key={subIdx} className="flex items-center gap-2">
                                      <span className="font-mono text-xs text-muted-foreground">{`${iIndex + 1}.${subIdx + 1}`}</span>
                                      <span className="text-sm">{sub}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </React.Fragment>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  );
                }
                return null;
              })}
            </Accordion>
          </CardContent>
        </Card>
      )) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">No specific pathways were generated. Try adjusting your profile for new recommendations.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


PathwayDisplay.Skeleton = function PathwayDisplaySkeleton() {
  return (
     <div className="space-y-8">
      <Skeleton className="h-8 w-1/2" />
       <Card>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
           <Skeleton className="h-6 w-6 rounded-full" />
           <Skeleton className="h-6 w-1/3" />
        </CardHeader>
        <CardContent>
           <Skeleton className="h-4 w-3/4 mb-4" />
           <div className="flex flex-wrap gap-2">
             <Skeleton className="h-8 w-24" />
             <Skeleton className="h-8 w-32" />
             <Skeleton className="h-8 w-28" />
           </div>
        </CardContent>
      </Card>
      <Card>
          <CardHeader>
             <Skeleton className="h-7 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-4">
             <Skeleton className="h-12 w-full" />
             <Skeleton className="h-12 w-full" />
             <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
     </div>
  );
}
