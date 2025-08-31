
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

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
  const phoneNumber = '7708071872'; // Replace with a real number
  const message = "Hello Verbigo, I am interested in your courses and would like to know more. Please let me know the next steps.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 h-16 w-16 z-50 transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="h-full w-full drop-shadow-lg" />
    </Link>
  );
}
