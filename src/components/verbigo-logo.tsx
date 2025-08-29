import { cn } from "@/lib/utils";
import * as React from "react";

export function VerbigoLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("fill-current", className)}
      {...props}
    >
      <path d="M50,95 C25,95 25,65 50,65 C75,65 75,95 50,95 Z" />
      <path d="M10,60 L50,40 L90,60 L50,80 Z" />
      <path d="M10,45 L50,25 L90,45 L50,65 Z" />
      <path d="M10,30 L50,10 L90,30 L50,50 Z" />
    </svg>
  );
}
