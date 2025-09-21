
'use client';

import { grammarCoach } from '@/ai/flows/grammar-coach-flow';
import { textToSpeech } from '@/ai/flows/text-to-speech-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Loader2, Mic, MicOff, Send, X } from 'lucide-react';
import { useEffect, useRef, useState, useTransition } from 'react';
import ReactMarkdown from 'react-markdown';
import { VerbigoTutorLogo } from './verbigo-tutor-logo';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const CHAT_STORAGE_KEY = 'verbigo-chat-history';

const initialMessage: Message = {
    role: 'model',
    content: "Hi there! 👋\n\nI'm Verbi, your friendly English teacher from Verbigo.\n\nHow can I help you improve your English today?\n\nOr perhaps you have a question about our amazing courses? 😊"
};

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [history, setHistory] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const chatCardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isClient, setIsClient] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsClient(true);
    try {
      const storedHistory = localStorage.getItem(CHAT_STORAGE_KEY);
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        if (parsedHistory.length === 0) {
          setHistory([initialMessage]);
        } else {
          setHistory(parsedHistory);
        }
      } else {
        setHistory([initialMessage]);
      }
    } catch (error) {
      console.error("Could not load chat history from localStorage", error);
      setHistory([initialMessage]);
    }
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
        // Also check if the click was on the toggle button
        const toggleButton = document.querySelector('[aria-label="Toggle AI Chatbot"]');
        if (toggleButton && toggleButton.contains(event.target as Node)) {
            return;
        }
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
      document.body.classList.remove('chatbot-open');
    }
  }, [isOpen, isMobile]);

  useEffect(() => {
    if(isClient) {
      try {
        if (history.length > 1 || (history.length === 1 && history[0].content !== initialMessage.content)) {
          localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history));
        } else {
            localStorage.removeItem(CHAT_STORAGE_KEY);
        }
      } catch (error) {
        console.error("Could not save chat history to localStorage", error);
      }
    }
  }, [history, isClient]);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio playback failed", e));
    }
  }, [audioUrl]);

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

    const userMessage: Message = { role: 'user', content: input };
    const newHistory = [...history, userMessage];
    setHistory(newHistory);
    const message = input;
    setInput('');

    startTransition(async () => {
      let aiResponseText = '';
      try {
        const result = await grammarCoach({ history: history, message });
        aiResponseText = result.response;
        const aiMessage: Message = { role: 'model', content: aiResponseText };
        setHistory(prev => [...prev, aiMessage]);
        
        try {
          const audioResult = await textToSpeech(aiResponseText);
          setAudioUrl(audioResult.audio);
        } catch (ttsError: any) {
          if (ttsError.message && ttsError.message.includes('429')) {
             console.warn("TTS rate limit exceeded. Audio generation is temporarily unavailable.");
          } else {
            console.error('AI TTS error:', ttsError);
          }
           setAudioUrl(null);
        }

      } catch (error) {
        console.error('AI chat error:', error);
        const errorMessage = "I'm sorry, I encountered an error. Please try again.";
        setHistory((prev) => [
          ...prev,
          { role: 'model', content: errorMessage },
        ]);
         try {
           const audioResult = await textToSpeech(errorMessage);
           setAudioUrl(audioResult.audio);
         } catch (ttsError) {
           console.error('Error generating audio for error message:', ttsError);
           setAudioUrl(null);
         }
      }
    });
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [history]);
  
  const handleMicClick = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioUrl(null);
    }
    setIsRecording(!isRecording); 
  }

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div
        className={cn(
          "fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out md:bottom-28 md:right-6",
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        )}
      >
        <Card 
          className="w-[calc(100vw-2rem)] mx-4 h-[70vh] max-h-[500px] md:w-[350px] md:h-[450px] shadow-2xl flex flex-col rounded-xl overflow-hidden"
          ref={chatCardRef}
        >
          <CardHeader className="relative flex flex-row items-center justify-between bg-primary text-primary-foreground p-4">
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
                <CardTitle className="text-lg">Verbi Teacher</CardTitle>
                <CardDescription className="text-primary-foreground/80 text-xs">Your personal language assistant.</CardDescription>
               </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/80 z-10" onClick={handleToggle}>
                <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="relative p-0 flex-1 overflow-hidden bg-primary/5">
            <div 
              className="absolute inset-0 bg-repeat" 
              style={{ 
                backgroundImage: "url('/subtle-pattern.svg')",
                opacity: 0.05,
              }}
            />
             <ScrollArea className="h-full" ref={scrollAreaRef}>
                 <div className="p-4 space-y-4">
                    {history.map((msg, index) => (
                        <div key={index} className={cn("flex items-end gap-2", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                           {msg.role === 'model' && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-primary-foreground shrink-0 self-start">
                                <VerbigoTutorLogo width={24} height={24} />
                            </div>
                           )}
                            <div className={cn(
                                "max-w-[80%] rounded-xl px-3 py-2 text-sm prose prose-sm shadow-md",
                                msg.role === 'user' 
                                  ? 'bg-primary text-primary-foreground rounded-br-none' 
                                  : 'bg-background text-foreground rounded-bl-none'
                            )}>
                                <ReactMarkdown className="[&_p]:m-0">{msg.content.replace(/\\n/g, '  \n')}</ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    {isPending && (
                        <div className="flex items-end gap-2 justify-start">
                             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-primary-foreground shrink-0 self-start">
                                <VerbigoTutorLogo width={24} height={24} />
                             </div>
                             <div className="max-w-[80%] rounded-xl px-4 py-2 text-sm bg-background flex items-center gap-2 shadow-md rounded-bl-none">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Thinking...</span>
                             </div>
                        </div>
                    )}
                 </div>
             </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t bg-background">
            <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                autoComplete="off"
                disabled={isPending}
              />
              <Button type="button" size="icon" variant="outline" onClick={handleMicClick} disabled={isPending}>
                {isRecording ? <MicOff className="h-4 w-4 text-destructive" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
      
      <audio ref={audioRef} src={audioUrl ?? undefined} />

      <button
        onClick={handleToggle}
        className={cn(
            "fixed bottom-28 right-6 h-16 w-16 z-40 transition-all duration-300 ease-in-out hover:scale-110 drop-shadow-lg",
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
