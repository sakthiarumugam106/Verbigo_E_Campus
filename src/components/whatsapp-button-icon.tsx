
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const WhatsAppButtonIcon = ({ className }: { className?: string }) => (
  <div className={cn("relative h-5 w-5", className)}>
    <Image
        width="50"
        height="50"
        src="/icons/whatsapp-white.png"
        alt="whatsapp"
        className="absolute inset-0 h-full w-full opacity-100 transition-opacity group-hover:opacity-0"
    />
    <Image
        width="50"
        height="50"
        src="/icons/whatsapp-green.png"
        alt="whatsapp"
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity group-hover:opacity-100"
    />
  </div>
);
