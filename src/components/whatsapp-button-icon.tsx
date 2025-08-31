
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const WhatsAppButtonIcon = ({ className }: { className?: string }) => (
    <Image
        width="192"
        height="192"
        src="https://img.icons8.com/sf-regular/192/40C057/whatsapp.png"
        alt="whatsapp"
        className={cn("h-full w-full", className)}
    />
);
