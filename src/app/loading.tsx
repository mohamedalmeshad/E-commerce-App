import { Spinner } from "@/components/ui/spinner";
import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-3xl z-[100]">
      <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">

        {/* Brand Logo */}
        <div className="text-4xl md:text-6xl font-black tracking-tighter">
          SHOP.<span className="text-primary italic">CO</span>
        </div>

        {/* Loading Indicator */}
        <div className="flex flex-col items-center gap-2">
          <Spinner className="size-8 md:size-10 text-primary animate-spin" />
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground animate-pulse">
            Loading Experience
          </p>
        </div>
      </div>
    </div>
  );
}
