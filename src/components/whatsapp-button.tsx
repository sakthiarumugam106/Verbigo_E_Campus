
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const WhatsAppIcon = ({ className }: { className?: string }) => (
    <Image
        width="94"
        height="94"
        src="https://img.icons8.com/3d-fluency/94/whatsapp.png"
        alt="whatsapp"
        className={cn("h-full w-full", className)}
    />
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
