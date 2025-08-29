import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white"
  >
    <path
      d="M19.33 4.67A10 10 0 1 0 4.67 19.33 10 10 0 0 0 19.33 4.67ZM12 20.5A8.5 8.5 0 1 1 20.5 12 8.51 8.51 0 0 1 12 20.5Z"
    />
    <path
      d="M15.46 14.31c-.13-.23-.46-.38-.97-.66-.51-.28-3-1.48-3.47-1.64s-.8-.26-1.14.26-.13.82-.13 1.48c0 .66.18 1.1-.05 1.4s-.46.33-1 .28a6.39 6.39 0 0 1-2.9-1.72 6.88 6.88 0 0 1-2-2.37c-.24-.41-.02-.63.22-.84.21-.18.46-.46.69-.69s.31-.38.46-.63c.15-.26.08-.49-.04-.66s-1.14-2.73-1.56-3.72c-.41-1-.83-.86-1.14-.86-.28 0-.61-.05-.92-.05s-.8.13-1.23.61c-.43.48-1.64 1.6-1.64 3.9s1.68 4.53 1.91 4.84c.23.31 3.29 5.25 8.1 7.15.69.28 1.25.45 1.68.58.64.19 1.23.16 1.69-.08.5-.28 1.54-1.28 1.76-2.43.22-1.15.22-2.13.15-2.43s-.26-.31-.54-.46Z"
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
