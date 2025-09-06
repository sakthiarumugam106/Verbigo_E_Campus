
'use client';

import { grammarCoach } from '@/ai/flows/grammar-coach-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Loader2, MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useRef, useState, useTransition } from 'react';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [history, setHistory] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpening(true);
      setIsOpen(true);
      setTimeout(() => setIsOpening(false), 500); 
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const newHistory = [...history, { role: 'user' as const, content: input }];
    setHistory(newHistory);
    const message = input;
    setInput('');

    startTransition(async () => {
      try {
        const result = await grammarCoach({ history, message });
        setHistory((prev) => [...prev, { role: 'model', content: result.response }]);
      } catch (error) {
        console.error('AI chat error:', error);
        setHistory((prev) => [...prev, { role: 'model', content: "I'm sorry, I encountered an error. Please try again." }]);
      }
    });
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [history]);

  return (
    <>
      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-[9rem] right-6 z-50 transition-all duration-300 ease-in-out",
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        )}
      >
        <Card className="w-[380px] h-[500px] shadow-2xl flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground p-4">
            <div className="space-y-1">
              <CardTitle className="text-lg">AI Grammar Coach</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-xs">Your personal language assistant.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/80" onClick={handleToggle}>
                <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
             <ScrollArea className="h-full" ref={scrollAreaRef}>
                 <div className="p-4 space-y-4">
                    {history.map((msg, index) => (
                        <div key={index} className={cn("flex items-end gap-2", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                           {msg.role === 'model' && <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0"><MessageCircle className="h-5 w-5" /></div>}
                            <div className={cn("max-w-[80%] rounded-xl px-4 py-2 text-sm", msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isPending && (
                        <div className="flex items-end gap-2 justify-start">
                             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0"><MessageCircle className="h-5 w-5" /></div>
                             <div className="max-w-[80%] rounded-xl px-4 py-2 text-sm bg-muted flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Thinking...</span>
                             </div>
                        </div>
                    )}
                 </div>
             </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                autoComplete="off"
                disabled={isPending}
              />
              <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>

      {/* Trigger Button */}
      <div
        className={cn(
            "fixed bottom-[9rem] right-6 z-50 transition-all duration-300 ease-in-out hover:scale-105",
            isOpen && 'opacity-0 scale-95 pointer-events-none',
            isOpening && 'scale-95'
        )}
      >
        <Button onClick={handleToggle} className="h-auto w-auto rounded-full shadow-2xl p-0">
             <div className="relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-max bg-primary text-primary-foreground text-sm font-medium px-3 py-1.5 rounded-full shadow-lg">
                    Hi, I am your AI coach!
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-primary"></div>
                </div>
                <div className="bg-primary rounded-full p-4">
                     <MessageCircle className="h-8 w-8 text-primary-foreground" />
                </div>
            </div>
        </Button>
      </div>
    </>
  );
}
