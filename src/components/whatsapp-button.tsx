
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-full w-full", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
        fill="#25D366"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.9333 18.2C22.6 18.0667 21 17.2667 20.7333 17.1333C20.4667 17.0667 20.2667 17.0667 20.0667 17.3333C19.8667 17.6 19.1333 18.4 18.9333 18.6C18.7333 18.8 18.5333 18.8667 18.2667 18.7333C18 18.6 16.8667 18.2 15.4667 17.0667C14.4 16.1333 13.6667 14.9333 13.4 14.4C13.1333 13.8667 13.2667 13.8 13.4667 13.6C13.6 13.4667 13.8 13.2 14 12.9333C14.1333 12.8 14.2 12.6 14.2667 12.4C14.3333 12.2 14.2667 12 14.2 11.8C14.1333 11.6 13.4 9.93333 13.1333 9.33333C12.8667 8.73333 12.6 8.8 12.4667 8.8H12.2C11.9333 8.8 11.6 8.86667 11.3333 9.2C11.0667 9.53333 10.3333 10.2667 10.3333 11.6C10.3333 12.9333 11.3333 14.2 11.4667 14.4C11.6 14.6 13.4667 17.5333 16.2 18.8C18.9333 20.0667 18.9333 19.6 19.4667 19.5333C20 19.4667 21.2667 18.8 21.5333 18C21.8 17.2 21.8 16.6 21.7333 16.4C21.6667 16.2 21.4667 16.1333 21.2 16C20.9333 15.8667 20.2 17.0667 19.9333 17.2667C19.6667 17.4667 19.4667 17.6 19.2667 17.6C19.0667 17.6 18.8667 17.4667 18.7333 17.2667C18.6 17.0667 18.0667 16.4 17.8667 16.1333C17.6667 15.8667 17.4667 15.7333 17.6 15.5333C17.7333 15.3333 18.2667 15.4 18.6 15.2C18.9333 15 22.9333 13.0667 22.9333 18.2Z"
        fill="white"
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
      className="fixed bottom-6 right-6 h-20 w-20 rounded-full shadow-lg z-50 bg-transparent hover:bg-transparent p-0"
      aria-label="Chat on WhatsApp"
    >
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon className="h-full w-full" />
      </Link>
    </Button>
  );
}
