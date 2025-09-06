
'use client';

import { grammarCoach } from '@/ai/flows/grammar-coach-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Loader2, MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useRef, useState, useTransition } from 'react';
import { VerbigoTutorLogo } from './verbigo-tutor-logo';
import { useIsMobile } from '@/hooks/use-mobile';
import ReactMarkdown from 'react-markdown';

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
  const chatCardRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const footer = document.getElementById('page-footer');
    if (!footer) {
        setIsButtonVisible(true);
        return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsButtonVisible(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 50px 0px"
      }
    );

    observer.observe(footer);

    return () => {
      observer.unobserve(footer);
    };
  }, [isClient]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatCardRef.current && !chatCardRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        document.body.classList.add('chatbot-open');
      } else {
        document.body.classList.remove('chatbot-open');
      }
    } else {
      // Ensure class is removed on desktop
      document.body.classList.remove('chatbot-open');
    }
  }, [isOpen, isMobile]);

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

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div
        className={cn(
          "fixed bottom-0 right-0 z-50 transition-all duration-300 ease-in-out md:bottom-[11rem] md:right-6",
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        )}
      >
        <Card className="w-screen h-[80vh] md:w-[350px] md:h-[450px] shadow-2xl flex flex-col rounded-none md:rounded-xl" ref={chatCardRef}>
          <CardHeader className="relative flex flex-row items-center justify-between bg-primary text-primary-foreground p-4 overflow-hidden">
            <div 
              className="absolute inset-0 bg-repeat" 
              style={{ 
                backgroundImage: "url('/subtle-pattern.svg')",
                opacity: 0.1,
              }}
            />
            <div className="flex items-center gap-3 z-10">
               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <VerbigoTutorLogo width={32} height={32} />
               </div>
               <div className="space-y-1">
                <CardTitle className="text-lg">Malar Teacher</CardTitle>
                <CardDescription className="text-primary-foreground/80 text-xs">Your personal language assistant.</CardDescription>
               </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/80 z-10" onClick={handleToggle}>
                <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
             <ScrollArea className="h-full" ref={scrollAreaRef}>
                 <div className="p-4 space-y-4">
                    {history.map((msg, index) => (
                        <div key={index} className={cn("flex items-end gap-2", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                           {msg.role === 'model' && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                                <VerbigoTutorLogo width={24} height={24} />
                            </div>
                           )}
                            <div className={cn("max-w-[80%] rounded-xl px-4 py-2 text-sm prose prose-sm", msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                {msg.role === 'model' ? <ReactMarkdown className="text-foreground [&_p]:m-0">{msg.content.replace(/\n/g, '  \n')}</ReactMarkdown> : msg.content}
                            </div>
                        </div>
                    ))}
                    {isPending && (
                        <div className="flex items-end gap-2 justify-start">
                             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                                <VerbigoTutorLogo width={24} height={24} />
                             </div>
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

      <button
        onClick={handleToggle}
        className={cn(
            "fixed bottom-[6rem] right-6 h-16 w-16 z-40 transition-all duration-300 ease-in-out hover:scale-110 drop-shadow-lg",
            isOpen && 'opacity-0 scale-95 pointer-events-none',
            isOpening && 'scale-95',
            isButtonVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
        )}
        aria-label="Toggle AI Chatbot"
      >
        <VerbigoTutorLogo width={64} height={64} />
      </button>
    </>
  );
}
