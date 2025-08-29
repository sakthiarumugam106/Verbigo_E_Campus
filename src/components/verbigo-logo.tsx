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
      <path d="M50 10 L10 30 L10 70 L50 90 L90 70 L90 30 Z M 50 20 L80 35 L50 50 L20 35 Z" />
    </svg>
  );
}
