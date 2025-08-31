
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-full w-full", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24Z" fill="#4CAF50"/>
        <path d="M36.1628 31.0567C35.832 30.8818 33.7226 29.8883 33.3918 29.7483C33.061 29.5958 32.8198 29.5958 32.5786 29.9267C32.3374 30.2575 31.3439 31.3758 31.1027 31.617C30.8614 31.8583 30.6202 31.8958 30.1794 31.7083C29.7386 31.5208 28.2144 30.9858 26.3986 29.4183C24.8914 28.1483 23.8378 26.6283 23.5222 26.0641C23.2066 25.4875 23.3814 25.3358 23.5922 25.125C23.7786 24.9375 24.0422 24.5875 24.2958 24.2958C24.5248 24.0791 24.5998 23.8625 24.7122 23.6083C24.8248 23.3541 24.7498 23.1375 24.6372 22.95C24.5248 22.7625 23.4958 20.4875 23.165 19.525C22.8344 18.5625 22.5036 18.6083 22.3286 18.6H21.9422C21.5922 18.6 21.1268 18.6958 20.7614 19.1125C20.3958 19.5291 19.2036 20.4875 19.2036 22.125C19.2036 23.7625 20.4222 25.35 20.5972 25.6041C20.7722 25.8583 23.4958 29.7483 27.2036 31.5208C31.0378 33.3541 31.0378 32.6666 31.7264 32.5833C32.4148 32.5 33.9898 31.617 34.3206 30.5625C34.6514 29.5083 34.6514 28.5875 34.5388 28.375C34.4264 28.1625 34.1852 28.0833 33.8918 27.9166C33.5986 27.75 32.4598 28.375 32.0848 28.5833C31.7348 28.7916 31.4558 29.0041 31.2586 29.0041C31.0614 29.0041 28.2144 26.6283 27.9498 26.2375C27.6852 25.8466 28.3498 25.6041 28.8498 25.4166C29.3498 25.2291 35.8498 22.6958 36.1628 31.0567Z" fill="white"/>
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
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 bg-transparent hover:bg-transparent"
      aria-label="Chat on WhatsApp"
    >
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon className="h-full w-full" />
      </Link>
    </Button>
  );
}

    