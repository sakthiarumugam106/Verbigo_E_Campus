
import Image from 'next/image';
import logo from '../logo.png';
import chatbotIcon from '../chatbot.png';

export function VerbigoLogo() {
  // Note: The original logo from logo.png is kept here for reference,
  // but the component is now using the chatbotIcon.
  // This can be cleaned up later if the original logo is no longer needed.
  return (
    <Image
      src={chatbotIcon}
      alt="Verbigo Logo"
      width="40"
      height="40"
    />
  );
}
