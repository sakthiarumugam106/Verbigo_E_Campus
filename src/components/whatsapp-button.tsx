
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className={className}
    fill="currentColor"
  >
    <path
      fill="#40c351"
      d="M41.6,10.1C37.2,5.7,30.9,3.5,24,3.5C12.3,3.5,3.5,12.3,3.5,24c0,4.2,1.2,8.3,3.5,11.8l-4,11.3l11.6-3.9  c3.3,2.1,7.2,3.3,11.2,3.3c11.7,0,20.5-8.8,20.5-20.5C44.5,17.1,43.2,13.2,41.6,10.1z"
    ></path>
    <path
      fill="#fff"
      d="M34,24.4c-0.4-0.2-2.3-1.1-2.6-1.3c-0.4-0.2-0.6-0.2-0.9,0.2c-0.3,0.4-1,1.3-1.2,1.5c-0.2,0.2-0.5,0.3-0.8,0.1  c-0.3-0.1-1.7-0.6-3.2-2C22.6,21,21,18.9,20.6,18.3c-0.3-0.6,0.3-0.5,0.5-0.8c0.2-0.2,0.4-0.6,0.6-0.8c0.2-0.2,0.3-0.5,0.4-0.7  c0.1-0.2,0-0.5-0.1-0.7c-0.1-0.2-0.9-2.1-1.2-2.9c-0.3-0.8-0.6-0.7-0.8-0.7c-0.2,0-0.5,0-0.7,0c-0.2,0-0.6,0.1-1,0.5  C16.9,14.6,16,15.6,16,17.2c0,1.6,1,3.2,1.1,3.4c0.1,0.2,2.3,3.7,5.6,5c3.3,1.3,3.3,0.9,3.9,0.8c0.6-0.1,2-0.8,2.3-1.6  c0.3-0.8,0.3-1.4,0.2-1.6C34.7,24.7,34.4,24.6,34,24.4z"
    ></path>
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
