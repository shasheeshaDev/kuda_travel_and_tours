import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Kuda design: 1.5px border, rounded-lg, py-[14px] px-4, 15px text
        "flex w-full min-w-0 rounded-lg border-[1.5px] border-brand-border bg-white",
        "px-4 py-[14px] text-[15px] text-brand-secondary font-plusJakartaSans",
        "placeholder:text-brand-muted",
        "transition-colors duration-200 outline-none",
        "focus-visible:border-brand-primary focus-visible:ring-0",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
