
import Image from 'next/image';

export function VerbigoTutorLogo({ width = 48, height = 48 }: { width?: number; height?: number; }) {
  return (
    <Image
      src="/verbigo-tutor-icon.png"
      alt="Verbigo Tutor"
      width={width}
      height={height}
      className="object-contain"
    />
  );
}
