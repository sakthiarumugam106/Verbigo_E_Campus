import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

export function VerbigoLogo({ className, ...props }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt="Verbigo Logo"
      width={40}
      height={40}
      className={cn(className)}
      priority // Ensures the logo loads quickly
    />
  );
}
