
'use client';

import Image from 'next/image';

export function VerbigoTutorLogo({ width = 48, height = 48 }: { width?: number; height?: number; }) {
  return (
    <Image
      src="https://img.icons8.com/flat-round/64/bot.png"
      alt="Verbigo Tutor"
      width={width}
      height={height}
      className="object-contain"
    />
  );
}
