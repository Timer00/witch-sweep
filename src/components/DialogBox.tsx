import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const DialogBox = ({ children }: { children: ReactNode }) => {
  const mergedClassName = twMerge(
    // Width/height caps keep the box clear of the witch (left side of the
    // screen): never wider than ~2/3 of the stage, never taller than half.
    "z-0 mb-5 max-w-[64%] lg:max-w-[52%]",
    "max-h-[55%] overflow-y-auto",
    "rounded-lg border-[6px] border-double border-[#5a3a22]/70 bg-amber-50/70 backdrop-blur-md",
    "px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-5",
    "shadow-[0_8px_28px_rgba(0,0,0,0.45)]",
    "font-gothic text-black",
    "text-sm md:text-lg lg:text-xl xl:text-2xl"
  );
  return <div className={mergedClassName}>{children}</div>;
};
export default DialogBox;
