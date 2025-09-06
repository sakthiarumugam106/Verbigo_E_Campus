
'use client';

import Image from 'next/image';

export function VerbigoTutorLogo({ width = 48, height = 48 }: { width?: number; height?: number; }) {
  return (
    <Image
      src="https://img.icons8.com/external-flat-juicy-fish/100/external-ai-contact-us-flat-flat-juicy-fish-2.png"
      alt="Verbigo Tutor"
      width={width}
      height={height}
      className="object-contain"
    />
  );
}
