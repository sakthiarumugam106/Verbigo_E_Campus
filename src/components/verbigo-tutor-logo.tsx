
'use client';
import Image from 'next/image';
import chatbotIcon from '../chatbot.png';


export function VerbigoTutorLogo({ width = 64, height = 64 }: { width?: number; height?: number; }) {
  return (
    <Image
        src={chatbotIcon}
        alt="Verbigo Tutor"
        width={width}
        height={height}
    />
  );
}
