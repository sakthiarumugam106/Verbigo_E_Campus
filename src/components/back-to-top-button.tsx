
'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function BackToTopButton() {
  const [isScrollVisible, setIsScrollVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const toggleScrollVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsScrollVisible(true);
      } else {
        setIsScrollVisible(false);
      }
    };

    const footer = document.getElementById('page-footer');
    if (!footer) {
        window.addEventListener('scroll', toggleScrollVisibility);
        return () => window.removeEventListener('scroll', toggleScrollVisibility);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 100px 0px" // Trigger a bit before it's fully in view
      }
    );
    
    observer.observe(footer);
    window.addEventListener('scroll', toggleScrollVisibility);

    return () => {
      observer.unobserve(footer);
      window.removeEventListener('scroll', toggleScrollVisibility);
    };
  }, [isClient]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  const isButtonVisible = isScrollVisible && !isFooterVisible;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-48 right-6 z-50 h-12 w-12 rounded-full shadow-lg transition-all duration-300 md:bottom-48',
        isButtonVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      )}
      aria-label="Go to top"
    >
      <ArrowUp className="h-6 w-6" />
    </Button>
  );
}
