
import { cn } from "@/lib/utils";
import * as React from "react";

export function VerbigoLogo({ className, ...props }: { className?: string }) {
  return (
    <svg
      width="64"
      height="59"
      viewBox="0 0 64 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <path
        d="M32.0019 0L1.25195 18.0682L32.0019 36.1364L62.7519 18.0682L32.0019 0Z"
        fill="#3A55A4"
      />
      <path
        d="M9.81836 22.585L1.25049 27.5222L32.0005 45.5904L62.7505 27.5222L54.1826 22.585L32.0005 34.6244L9.81836 22.585Z"
        fill="#3A55A4"
      />
      <path
        d="M9.81836 32.0454L1.25049 36.9826L32.0005 55.0508L62.7505 36.9826L54.1826 32.0454L32.0005 44.0849L9.81836 32.0454Z"
        fill="#3A55A4"
      />
      <path
        d="M54.1826 36.9826V45.2152C54.1826 45.2152 40.5689 53.0788 32.0005 53.0788C23.4321 53.0788 9.81836 45.2152 9.81836 45.2152V36.9826L32.0005 49.0221L54.1826 36.9826Z"
        fill="#3A55A4"
      />
    </svg>
  );
}
