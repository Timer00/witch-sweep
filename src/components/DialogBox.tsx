import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const DialogBox = ({ children }: { children: ReactNode }) => {
  const mergedClassName = twMerge(
    "z-0 mb-5 ml-[10%] max-w-[68%] md:max-w-[60%] lg:ml-0 lg:max-w-3xl xl:max-w-4xl",
    "rounded-2xl border-2 border-[#5a3a22]/70 bg-amber-50/95 backdrop-blur-sm",
    "px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-5",
    "shadow-[0_8px_28px_rgba(0,0,0,0.45)]",
    "font-gothic text-black",
    "text-sm md:text-lg lg:text-xl xl:text-2xl"
  );
  return <div className={mergedClassName}>{children}</div>;
};
export default DialogBox;
