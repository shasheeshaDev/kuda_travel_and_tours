import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Kuda design: matches Input styles with resize
        "flex w-full min-h-[80px] rounded-lg border-[1.5px] border-brand-border bg-white",
        "px-4 py-[14px] text-[15px] text-brand-secondary font-plusJakartaSans",
        "placeholder:text-brand-muted resize-y",
        "transition-colors duration-200 outline-none",
        "focus-visible:border-brand-primary focus-visible:ring-0",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
