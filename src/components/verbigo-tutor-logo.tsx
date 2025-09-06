'use client';

export function VerbigoTutorLogo({ width = 48, height = 48 }: { width?: number; height?: number; }) {
  return (
    <img
      src="https://firebasestudio-hosting.web.app/verbigo/chatbot-icon.png"
      alt="Verbigo Tutor"
      width={width}
      height={height}
      style={{ objectFit: 'contain' }}
    />
  );
}
