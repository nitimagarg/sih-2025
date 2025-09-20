import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Book, Target } from "lucide-react";
import type { Pathway } from "@/lib/types";

interface ProgressTrackerProps {
  pathways: Pathway[] | null;
}


export function ProgressTracker({ pathways }: ProgressTrackerProps) {
  const allItems = pathways?.flatMap(pathway => [
    ...(pathway.courses || []),
    ...(pathway.microCredentials || []),
    ...(pathway.certifications || []),
    ...(pathway.onTheJobTraining || [])
  ]) || [];

  const completedItems = allItems.filter(item => item.completed);
  const nextUpItem = allItems.find(item => !item.completed);
  
  const totalCourses = allItems.length;
  const progressValue = totalCourses > 0 ? (completedItems.length / totalCourses) * 100 : 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>Keep up the great work!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {totalCourses > 0 ? (
          <>
            <div>
              <div className="flex justify-between mb-1 text-sm font-medium">
                <span>Overall Completion</span>
                <span className="text-muted-foreground">{Math.round(progressValue)}%</span>
              </div>
              <Progress value={progressValue} aria-label={`${Math.round(progressValue)}% complete`} />
              <p className="text-xs text-muted-foreground mt-1">{completedItems.length} of {totalCourses} modules completed.</p>
            </div>
            
            {completedItems.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Completed Modules</h4>
                <ul className="space-y-3 max-h-40 overflow-y-auto">
                  {completedItems.map((course, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="flex-grow">{course.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {nextUpItem && (
               <div>
                 <h4 className="font-semibold mb-3">Next Up</h4>
                 <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                      <Book className="h-5 w-5 text-primary shrink-0" />
                      <span className="font-medium text-sm">{nextUpItem.name}</span>
                 </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-8">
            <Target className="w-10 h-10 mb-4" />
            <p className="font-semibold">No pathways generated yet.</p>
            <p className="text-sm">Fill out your profile to start your journey!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
