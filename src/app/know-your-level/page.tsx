
import { LevelAssessment } from '@/components/level-assessment';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Languages } from 'lucide-react';

export default function KnowYourLevelPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center bg-primary/10 p-4 py-12 overflow-hidden">
       <div 
        className="absolute inset-0 bg-repeat" 
        style={{ 
          backgroundImage: "url('/subtle-pattern.svg')",
          opacity: 0.05,
        }}
      />
      <Card className="w-full max-w-3xl shadow-2xl z-10 bg-background/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Languages className="h-8 w-8 text-primary" />
                </div>
            </div>
          <CardTitle className="text-3xl font-bold text-primary">Know Your English Level</CardTitle>
          <CardDescription className="text-lg">
            Answer 3 quick questions, and our AI will assess your proficiency.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <LevelAssessment />
        </CardContent>
      </Card>
    </div>
  );
}
