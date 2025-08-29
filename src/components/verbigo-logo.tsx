import { cn } from "@/lib/utils";
import * as React from "react";

export function VerbigoLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className={cn("fill-current", className)}
      {...props}
    >
      <path
        d="M128 20L32 75v106l96 55 96-55V75L128 20zm0 12l88 50.9v94.2l-88 50.9-88-50.9V82.9L128 32z"
        stroke="currentColor"
        strokeWidth="8"
        fill="none"
      />
      <path
        d="M128 80L50 125l78 45 78-45-78-45z"
        stroke="currentColor"
        strokeWidth="8"
        fill="none"
      />
    </svg>
  );
}
