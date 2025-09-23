
import { LevelAssessment } from '@/components/level-assessment';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Languages } from 'lucide-react';

export default function KnowYourLevelPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background p-4 py-12">
      <Card className="w-full max-w-3xl z-10">
        <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Languages className="h-8 w-8 text-primary dark:text-primary-foreground" />
                </div>
            </div>
          <CardTitle className="text-3xl font-bold text-primary dark:text-primary-foreground">Know Your English Level</CardTitle>
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
