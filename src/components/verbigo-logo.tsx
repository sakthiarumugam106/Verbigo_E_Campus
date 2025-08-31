
import { cn } from "@/lib/utils";

export function VerbigoLogo({ className }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="Verbigo Logo"
      className={cn("h-10 w-auto", className)}
    />
  );
}
