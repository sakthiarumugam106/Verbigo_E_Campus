
import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";

export function VerbigoLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Verbigo Logo"
      width={64}
      height={59}
      className={cn("h-10 w-auto", className)}
      priority
    />
  );
}
