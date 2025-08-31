
'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const WhatsAppIcon = ({ className }: { className?: string }) => (
    <Image
        width="375"
        height="375"
        src="https://img.icons8.com/3d-fluency/375/whatsapp.png"
        alt="whatsapp"
        className={cn("h-full w-full", className)}
    />
);

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const footer = document.getElementById('page-footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the footer is intersecting with the viewport, hide the button.
        // Otherwise, show it.
        setIsVisible(!entry.isIntersecting);
      },
      {
        // A threshold of 0 means the callback will run as soon as one pixel of the footer is visible.
        threshold: 0,
        // We set a rootMargin to trigger a bit before the footer is actually in view
        rootMargin: "0px 0px 50px 0px"
      }
    );

    observer.observe(footer);

    return () => {
      observer.unobserve(footer);
    };
  }, []);

  const phoneNumber = '7708071872'; // Replace with a real number
  const message = "Hello Verbigo, I am interested in your courses and would like to know more. Please let me know the next steps.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 h-16 w-16 z-50 transition-all duration-300",
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0',
        "hover:scale-110"
      )}
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="h-full w-full drop-shadow-lg" />
    </Link>
  );
}
