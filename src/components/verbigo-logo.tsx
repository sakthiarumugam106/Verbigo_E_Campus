
'use client';

import Image from 'next/image';
import logo from '../logo.png';

export function VerbigoLogo() {
  return (
    <Image
      src={logo}
      alt="Verbigo Logo"
      width="40"
      height="40"
    />
  );
}
