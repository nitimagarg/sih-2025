"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, ArrowRight, RefreshCw } from "lucide-react";

interface DifficultyFeedbackProps {
  onDifficultySelected: (difficulty: string) => void;
  onRegenerate: () => void;
  isRegenerating?: boolean;
}

const difficultyLevels = [
  {
    value: "beginner",
    label: "Beginner",
    description: "New to the field, need foundational knowledge",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: "🌱"
  },
  {
    value: "intermediate",
    label: "Intermediate", 
    description: "Some experience, ready for intermediate concepts",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: "🚀"
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "Experienced, ready for complex challenges",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: "⚡"
  },
  {
    value: "expert",
    label: "Expert",
    description: "Highly skilled, ready for leadership roles",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: "🏆"
  }
];

export function DifficultyFeedback({ onDifficultySelected, onRegenerate, isRegenerating = false }: DifficultyFeedbackProps) {
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>("");
  const [showFeedback, setShowFeedback] = React.useState(false);

  const handleDifficultyChange = (value: string) => {
    setSelectedDifficulty(value);
    setShowFeedback(true);
  };

  const handleRegenerate = () => {
    onDifficultySelected(selectedDifficulty);
    onRegenerate();
  };

  return (
    <Card className="border-2 border-dashed border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          Pathway Generated Successfully!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">Does this pathway match your current skill level?</p>
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 text-green-600 border-green-200 hover:bg-green-50"
              onClick={() => onRegenerate()}
            >
              <CheckCircle className="h-4 w-4" />
              Yes, it's perfect!
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 text-orange-600 border-orange-200 hover:bg-orange-50"
              onClick={() => setShowFeedback(true)}
            >
              <XCircle className="h-4 w-4" />
              No, adjust difficulty
            </Button>
          </div>
        </div>

        {showFeedback && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">What's your current skill level?</h3>
              <p className="text-sm text-muted-foreground">This helps us generate a pathway that's just right for you.</p>
            </div>

            <RadioGroup value={selectedDifficulty} onValueChange={handleDifficultyChange}>
              <div className="grid gap-3">
                {difficultyLevels.map((level) => (
                  <div key={level.value} className="flex items-center space-x-3">
                    <RadioGroupItem value={level.value} id={level.value} />
                    <Label 
                      htmlFor={level.value} 
                      className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                        selectedDifficulty === level.value 
                          ? `${level.color} border-current` 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{level.icon}</span>
                        <div>
                          <div className="font-semibold">{level.label}</div>
                          <div className="text-sm opacity-75">{level.description}</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            {selectedDifficulty && (
              <div className="flex justify-center">
                <Button 
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                  className="flex items-center gap-2"
                >
                  {isRegenerating ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                  {isRegenerating ? 'Regenerating...' : 'Generate New Pathway'}
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
