import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick: () => void;
  children: ReactNode;
  small?: boolean;
}

const Button = ({
  children,
  className,
  onClick,
  small
}: ButtonProps) => {
  const mergedClassName = twMerge(
    "rounded border-8 px-2 py-2 font-extrabold  transition-all hover:bg-gray-200",
    "disabled:opacity-50 disabled:hover:bg-transparent",
    `${small ? "border-[#6f888c] text-[#6f888c] text-xs border-4" : "border-amber-50 md:text-4xl lg:text-6xl"}`,
    className
  );

  return (
    <button
      type="button"
      className={mergedClassName}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
