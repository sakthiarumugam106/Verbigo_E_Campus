
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-full w-full", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#25D366"/>
      <path d="M17.2 14.15C16.95 14.025 15.525 13.35 15.3 13.225C15.075 13.15 14.925 13.15 14.775 13.425C14.625 13.7 14.025 14.425 13.875 14.625C13.725 14.825 13.575 14.825 13.35 14.7C13.125 14.575 12.15 14.25 11.025 13.2C10.125 12.375 9.525 11.4 9.3 10.95C9.075 10.5 9.225 10.425 9.45 10.2C9.6 10.05 9.825 9.75 10.05 9.45C10.2 9.3 10.275 9.15 10.35 9C10.425 8.85 10.35 8.7 10.275 8.55C10.2 8.4 9.525 6.975 9.3 6.525C9.075 6.075 8.85 6.15 8.7 6.15H8.475C8.25 6.15 7.95 6.225 7.65 6.525C7.35 6.825 6.675 7.425 6.675 8.7C6.675 9.975 7.65 11.25 7.8 11.4C7.95 11.625 9.6 14.175 12.15 15.3C14.7 16.425 14.7 15.975 15.225 15.9C15.75 15.825 16.95 15.15 17.175 14.475C17.4 13.8 17.4 13.275 17.325 13.125C17.25 12.975 17.1 12.9 16.875 12.825C16.65 12.75 15.6 13.225 15.375 13.35C15.15 13.425 14.925 13.65 14.85 13.725C14.775 13.8 14.475 14.1 14.325 14.25C14.175 14.4 14.025 14.4 13.875 14.25C13.725 14.1 13.2 13.575 13.05 13.35C12.9 13.125 12.75 12.975 12.9 12.825C13.05 12.675 13.425 12.45 13.65 12.375C13.875 12.3 14.175 12.15 14.4 12.075C14.625 12 17.2 10.35 17.2 14.15Z" fill="white"/>
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
