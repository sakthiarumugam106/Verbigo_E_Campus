import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white"
  >
    <path
      d="M16.7,13.3c-0.1-0.1-0.3-0.2-0.5-0.3c-0.2-0.1-1.2-0.6-1.4-0.7c-0.2-0.1-0.3-0.1-0.5,0.1 c-0.1,0.2-0.5,0.7-0.7,0.8c-0.1,0.1-0.2,0.2-0.4,0.1c-0.2-0.1-0.8-0.3-1.5-0.9c-0.6-0.5-1-1.1-1.1-1.3c-0.1-0.2,0-0.3,0.1-0.4 c0.1-0.1,0.2-0.2,0.3-0.3c0.1-0.1,0.1-0.2,0.2-0.4c0.1-0.2,0-0.3,0-0.4c-0.1-0.1-0.5-1.3-0.7-1.8c-0.2-0.5-0.4-0.4-0.5-0.4 c-0.1,0-0.3,0-0.5,0s-0.5,0.1-0.7,0.3c-0.2,0.2-0.9,0.8-0.9,2c0,1.2,0.9,2.3,1,2.5c0.1,0.2,1.8,2.8,4.4,3.9 c0.6,0.2,1.1,0.4,1.4,0.5c0.5,0.2,1,0.1,1.3-0.1c0.4-0.2,1.2-1,1.3-1.9C17.6,14.1,17.4,13.9,16.7,13.3z M12,2C6.5,2,2,6.5,2,12 c0,1.8,0.5,3.5,1.4,5L2,22l5.3-1.4c1.4,0.8,3,1.3,4.7,1.3h0c5.5,0,10-4.5,10-10C22,6.5,17.5,2,12,2z M12,20.2 c-1.6,0-3.2-0.4-4.6-1.2l-0.3-0.2l-3.4,0.9l0.9-3.3l-0.2-0.3C4,14,3.5,12.5,3.5,11c0-4.7,3.8-8.5,8.5-8.5c4.7,0,8.5,3.8,8.5,8.5 C20.5,16.4,16.7,20.2,12,20.2z"
    />
  </svg>
);

export function WhatsAppButton() {
  const phoneNumber = '15551234567'; // Replace with a real number
  const message = "Hello Verbigo! I'm interested in learning more about your e-campus.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Button
      asChild
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-[#25D366] hover:bg-[#128C7E] text-white"
      aria-label="Chat on WhatsApp"
    >
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
      </Link>
    </Button>
  );
}
