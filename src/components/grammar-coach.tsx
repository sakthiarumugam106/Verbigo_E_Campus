
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { grammarCoach, GrammarCoachOutput } from '@/ai/flows/grammar-coach-flow';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Badge } from './ui/badge';

export function GrammarCoach() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<GrammarCoachOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setError('Please enter some text to check.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      const response = await grammarCoach({ text: inputText });
      setResult(response);
    } catch (err) {
      console.error(err);
      setError('An error occurred while checking the grammar. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-primary/20">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6">
          <Textarea
            name="text"
            placeholder="For example: She go to the store yesterday."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={5}
            className="text-base"
            disabled={isLoading}
          />
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-end border-t border-primary/10 pt-6">
          <Button type="submit" disabled={isLoading || !inputText.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Check Grammar
              </>
            )}
          </Button>
        </CardFooter>
      </form>

      {result && (
        <div className="p-6 border-t border-primary/10">
          <Alert>
            <AlertTitle className="flex items-center gap-2 font-bold text-lg text-primary">
                <Sparkles className="h-5 w-5" />
                Suggestions
            </AlertTitle>
            <AlertDescription className="mt-4 space-y-4">
                <div>
                    <Badge variant="secondary" className="mb-2">Corrected Text</Badge>
                    <p className="text-base font-medium text-foreground">{result.correctedText}</p>
                </div>
                <div>
                    <Badge variant="secondary" className="mb-2">Explanation</Badge>
                    <p className="text-base text-muted-foreground">{result.explanation}</p>
                </div>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  );
}

    