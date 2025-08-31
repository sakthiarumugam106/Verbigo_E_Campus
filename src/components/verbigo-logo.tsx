import { cn } from "@/lib/utils";
import * as React from "react";

export function VerbigoLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("fill-primary", className)}
      {...props}
    >
      <path d="M22 10l-10-5-10 5 10 5 10-5z" />
      <path d="M6 12v5l6 3 6-3v-5" />
      <path d="M6 12l6 3 6-3" />
      <path d="M6 12L2 10l10-5 10 5-4 2" />
      <path d="M2 10v5l6 3 2-1" />
    </svg>
  );
}
