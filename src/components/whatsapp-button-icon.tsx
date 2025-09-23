
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const WhatsAppButtonIcon = ({ className }: { className?: string }) => (
  <div className={cn("relative h-5 w-5", className)}>
    <Image
        width="150"
        height="150"
        src="https://img.icons8.com/ios-filled/150/008000/whatsapp--v1.png"
        alt="whatsapp"
        className="absolute inset-0 h-full w-full transition-opacity group-hover:opacity-0"
    />
    <Image
        width="150"
        height="150"
        src="https://img.icons8.com/ios-filled/150/FFFFFF/whatsapp--v1.png"
        alt="whatsapp"
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity group-hover:opacity-100"
    />
  </div>
);
