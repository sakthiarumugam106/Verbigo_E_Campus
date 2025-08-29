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
      <path d="M128 24.5l96 55.5v110.5l-96 55.5-96-55.5V80l96-55.5zM48 184.8l80 46.2 80-46.2V86.2l-80-46.2-80 46.2v98.6z" />
      <path d="M85.4 128.5l42.6-24.6 42.6 24.6-42.6 24.6-42.6-24.6z" />
      <path d="M128 142.1l34.4-19.8-11.8-6.8-34.4 19.8 11.8 6.8z" />
      <path d="M50 100l78-45 78 45v90l-78 45-78-45V100zm148 84.8V86.2l-70-40.4-70 40.4v98.6l70 40.4 70-40.4z" />
      <path d="M128 54.5l-74 42.8v85.4l74 42.8 74-42.8v-85.4l-74-42.8zm0 162.9l-66-38.1v-74.6l66-38.1 66 38.1v74.6l-66 38.1z" />
      <polygon points="128 80 50 125 128 170 206 125 128 80" />
      <polygon points="128 92 194 129 128 166 62 129 128 92" />
      <polygon points="128 104 182 133 128 162 74 133 128 104" />
      <path d="M128 20L32 75v106l96 55 96-55V75L128 20zm0 12l88 50.9v94.2l-88 50.9-88-50.9V82.9L128 32z" />
      <path d="M128 116.5l-48 27.7v-55l48-27.7 48 27.7v55l-48-27.7z" />
      <path d="M128 126.5l-36 20.8v-41.6l36-20.8 36 20.8v41.6l-36-20.8z" />
    </svg>
  );
}
