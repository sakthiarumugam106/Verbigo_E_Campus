
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
    fill="none"
  >
    <path 
        fill="#4CAF50" 
        d="M41,6H7C6.4,6,6,6.4,6,7v28c0,0.6,0.4,1,1,1h34c0.6,0,1-0.4,1-1V7C42,6.4,41.6,6,41,6z"
    />
    <path 
        fill="#FFFFFF" 
        d="M34.4,33.5c-0.2-0.2-0.5-0.3-0.8-0.5c-0.3-0.1-1.8-0.9-2.1-1c-0.3-0.1-0.5-0.2-0.7,0.2c-0.2,0.3-0.8,1-1,1.2c-0.2,0.2-0.4,0.2-0.7,0.1c-0.3-0.1-1.2-0.4-2.3-1.4c-0.8-0.8-1.5-1.7-1.7-2c-0.2-0.3,0-0.5,0.1-0.6c0.1-0.1,0.3-0.3,0.4-0.4c0.1-0.1,0.2-0.3,0.3-0.5c0.1-0.2,0-0.4,0-0.5c-0.1-0.1-0.7-1.9-1-2.6c-0.3-0.7-0.5-0.6-0.7-0.6c-0.2,0-0.4,0-0.6,0c-0.2,0-0.6,0.1-0.9,0.4c-0.3,0.3-1.2,1.2-1.2,2.9c0,1.7,1.2,3.3,1.4,3.5c0.2,0.2,2.6,4.2,6.5,5.7c0.8,0.3,1.5,0.5,2.1,0.7c0.8,0.2,1.5,0.2,2.1,0.1c0.6-0.2,1.8-1.4,2.1-1.9C35,34,34.8,33.7,34.4,33.5z"
    />
     <path 
        fill="#FFFFFF" 
        d="M24,8c-8.8,0-16,7.2-16,16s7.2,16,16,16c8.8,0,16-7.2,16-16S32.8,8,24,8z M24,37.5c-7.5,0-13.5-6-13.5-13.5S16.5,10.5,24,10.5s13.5,6,13.5,13.5S31.5,37.5,24,37.5z"
    />
  </svg>
);

export function WhatsAppButton() {
  const phoneNumber = '7708071872'; // Replace with a real number
  const message = "Hello Verbigo, I am interested in your courses and would like to know more. Please let me know the next steps.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Button
      asChild
      size="icon"
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 bg-transparent hover:bg-transparent p-0"
      aria-label="Chat on WhatsApp"
    >
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon className="h-full w-full" />
      </Link>
    </Button>
  );
}
