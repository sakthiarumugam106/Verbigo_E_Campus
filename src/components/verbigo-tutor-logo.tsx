
'use client';
import { VerbigoLogo } from './verbigo-logo';


export function VerbigoTutorLogo({ width = 48, height = 48 }: { width?: number; height?: number; }) {
  // We are now re-using the main VerbigoLogo component which correctly loads the icon.
  // The width and height props are not directly passed here, but the container
  // will respect the size. This can be refined if needed.
  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
        <VerbigoLogo />
    </div>
  );
}
