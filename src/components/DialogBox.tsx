import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const DialogBox = ({ children }: { children: ReactNode }) => {
  const mergedClassName = twMerge(
    "font-gothic max-w-xl lg:max-w-5xl rounded-xl border-8 border-double border-black p-4 text-base lg:text-2xl",
    "bg-opacity-10 text-amber-50 lg:text-black lg:bg-opacity-100 bg-amber-50 z-10"
  );
  return <div className={mergedClassName}>{children}</div>;
};
export default DialogBox;
