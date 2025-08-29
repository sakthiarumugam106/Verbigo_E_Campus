import Link from 'next/link';
import { Button } from '@/components/ui/button';

const WhatsAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path d="M16.6 14.2c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.7-.8.9-.1.1-.3.1-.5.0-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.3.1-.1.0-.3-.1-.4-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.3c.1.1 1.5.7 3.5 2.5.5.4.9.7 1.2.9.5.2.9.1 1.2-.1.3-.2.8-1 .9-1.2.1-.2.1-.4 0-.5m-4.7 7.4c-4.2 0-7.6-3.4-7.6-7.6s3.4-7.6 7.6-7.6c2.1 0 4 .8 5.4 2.2s2.2 3.3 2.2 5.4c0 4.2-3.4 7.6-7.6 7.6zm0-16.7c-4.9 0-8.9 4-8.9 8.9s4 8.9 8.9 8.9c2.4 0 4.7-.9 6.4-2.6l-1.4-1.4c-1.4 1.2-3.2 2-5 2-3.9 0-7.1-3.2-7.1-7.1s3.2-7.1 7.1-7.1c1.8 0 3.6.7 4.9 1.9l1.4-1.4c-1.7-1.5-3.9-2.4-6.3-2.4z" />
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
