import { cn } from "@/lib/utils";
import * as React from "react";

export function VerbigoLogo({ className, ...props }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 55 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <path
        d="M27.5 0L0 13.75L6.875 17.1875L27.5 5.5L48.125 17.1875L55 13.75L27.5 0Z"
        fill="#3A55A4"
      />
      <path
        d="M13.75 22L0 29.1667L27.5 41.25L55 29.1667V41.25L27.5 55L0 41.25V32.0833L13.75 24.9167V32.0833L27.5 38.3333L41.25 32.0833V24.9167L27.5 32.0833L13.75 24.9167V22Z"
        fill="#3A55A4"
      />
    </svg>
  );
}
