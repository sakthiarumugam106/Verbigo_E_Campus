
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const WhatsAppButtonIcon = ({ className }: { className?: string }) => (
    <Image
        width="150"
        height="150"
        src="https://img.icons8.com/ios-filled/150/008000/whatsapp--v1.png"
        alt="whatsapp"
        className={cn("h-full w-full", className)}
    />
);
