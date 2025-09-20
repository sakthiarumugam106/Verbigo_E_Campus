
'use client';

import { assessLevel, LevelAssessmentOutput } from '@/ai/flows/level-assessment-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { whatsapp } from '@/lib/config';
import { cn } from '@/lib/utils';
import { CheckCircle, GraduationCap, Loader2, MessageSquare, Star } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { WhatsAppButtonIcon } from './whatsapp-button-icon';

type Question = {
  question: string;
  answer: string;
};

type AssessmentState = {
  questions: Question[];
  currentQuestion: string | null;
  report: LevelAssessmentOutput['report'] | null;
}

const ASSESSMENT_STORAGE_KEY = 'verbigo-assessment-state';
const MIN_WORDS = 10;

const StarRating = ({ level }: { level: 'Beginner' | 'Intermediate' | 'Advanced' }) => {
  const rating = level === 'Beginner' ? 1 : level === 'Intermediate' ? 2 : 3;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};


export function LevelAssessment() {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    questions: [],
    currentQuestion: null,
    report: null,
  });
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [answerError, setAnswerError] = useState<string | null>(null);

  const wordCount = currentAnswer.trim() === '' ? 0 : currentAnswer.trim().split(/\s+/).length;

  useEffect(() => {
    setIsClient(true);
    try {
      const storedState = localStorage.getItem(ASSESSMENT_STORAGE_KEY);
      if (storedState) {
        setAssessmentState(JSON.parse(storedState));
      }
    } catch (error) {
      console.error("Could not load assessment state from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(assessmentState));
      } catch (error) {
        console.error("Could not save assessment state to localStorage", error);
      }
    }
  }, [assessmentState, isClient]);

  const { questions, currentQuestion, report } = assessmentState;

  const getNextQuestion = (history: Question[]) => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await assessLevel({ previousQuestions: history });
        if (result.isFinal && result.report) {
          setAssessmentState({ questions: history, report: result.report, currentQuestion: null });
        } else if (result.nextQuestion) {
          setAssessmentState({ questions: history, report: null, currentQuestion: result.nextQuestion });
        } else {
            setError('Could not generate the next step. Please try again.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred. Please try starting over.');
      }
    });
  };

  const handleStart = () => {
    const initialState = { questions: [], report: null, currentQuestion: null };
    setAssessmentState(initialState);
    setCurrentAnswer('');
    setAnswerError(null);
    getNextQuestion(initialState.questions);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAnswer(e.target.value);
    if (answerError) {
      setAnswerError(null);
    }
  };

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAnswer.trim() || !currentQuestion) return;

    if (wordCount < MIN_WORDS) {
      setAnswerError(`Please provide a more detailed answer (at least ${MIN_WORDS} words).`);
      return;
    }
    setAnswerError(null);

    const newHistory = [...questions, { question: currentQuestion, answer: currentAnswer }];
    setCurrentAnswer('');
    getNextQuestion(newHistory);
  };
  
  const handleDiscussWithTutor = () => {
    if (!report) return;
    
    const whatsappUrl = whatsapp.getReportDiscussionUrl(report);
    window.open(whatsappUrl, '_blank');

    toast({
        title: 'Redirecting to WhatsApp!',
        description: 'Your report has been prepared. Please send it to connect with a tutor.',
    });
  };

  const progress = report ? 100 : Math.min(questions.length / 3 * 100, 100);

  if (report) {
    return (
        <Card className="border-green-500/50">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-green-600 flex items-center justify-center gap-2">
                    <CheckCircle /> Assessment Complete!
                </CardTitle>
                <CardDescription>Here is your proficiency report.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center bg-primary/5 p-6 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">YOUR LEVEL</p>
                    <p className="text-4xl font-bold text-primary dark:text-primary-foreground">{report.level}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                        <div className="bg-accent h-2.5 rounded-full" style={{ width: `${report.score}%` }}></div>
                    </div>
                     <p className="text-sm font-semibold text-accent-foreground mt-2">{report.score}% Proficiency</p>
                </div>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-primary dark:text-primary-foreground">Summary</h3>
                        <p className="text-muted-foreground">{report.summary}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary dark:text-primary-foreground">Skill Breakdown</h3>
                        <ul className="space-y-2 mt-2">
                            {report.skillBreakdown.map((skill, index) => (
                                <li key={index} className="flex justify-between items-center bg-secondary/50 p-3 rounded-md">
                                    <span className="font-medium text-secondary-foreground">{skill.skill}</span>
                                    <StarRating level={skill.level} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col sm:flex-row gap-4 pt-6">
                <Button onClick={handleStart} variant="outline" className="w-full sm:w-auto">Start Over</Button>
                <Button onClick={handleDiscussWithTutor} className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                    <WhatsAppButtonIcon className="h-5 w-5"/> Discuss with Tutor
                </Button>
            </CardFooter>
        </Card>
    );
  }

  if (isPending && !currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
        <Loader2 className="h-10 w-10 text-primary dark:text-primary-foreground animate-spin" />
        <p className="text-muted-foreground">Preparing your assessment...</p>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center">
        <Button onClick={handleStart} size="lg">
          <GraduationCap className="mr-2 h-5 w-5" /> Start Assessment
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <div className="space-y-2">
            <Label>Question {questions.length + 1} of 3</Label>
            <Progress value={progress} className="w-full" />
        </div>
      <form onSubmit={handleAnswerSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="answer" className="text-lg font-medium flex items-start gap-3">
             <MessageSquare className="h-5 w-5 text-primary dark:text-primary-foreground mt-1 flex-shrink-0" />
            <span>{currentQuestion}</span>
          </Label>
          <Input
            id="answer"
            name="answer"
            value={currentAnswer}
            onChange={handleAnswerChange}
            placeholder="Type your answer here..."
            required
            disabled={isPending}
            autoComplete="off"
          />
           <div className="text-xs text-right text-muted-foreground pr-1">
            <span className={cn(wordCount < MIN_WORDS ? "text-destructive" : "text-green-600")}>
                {wordCount} / {MIN_WORDS} words
            </span>
           </div>
        </div>
         {answerError && <p className="text-destructive text-sm">{answerError}</p>}
         {error && <p className="text-destructive text-sm">{error}</p>}
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending || !currentAnswer.trim() || wordCount < MIN_WORDS}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Evaluating...
              </>
            ) : (
              'Next Question'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
