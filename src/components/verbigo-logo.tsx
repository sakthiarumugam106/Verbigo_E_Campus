
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

export function VerbigoLogo({ className, ...props }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Verbigo Logo"
      width={64}
      height={59}
      className={cn(className)}
      {...props}
    />
  );
}
