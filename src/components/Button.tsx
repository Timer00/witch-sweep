import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick: () => void;
  children: ReactNode;
}

const Button = ({ children, className, onClick, ...rest }: ButtonProps) => {
  const mergedClassName = twMerge(
    "rounded border-8 border-white px-2 py-2 font-extrabold text-white transition-all hover:bg-gray-200 md:text-4xl lg:text-6xl",
    "disabled:opacity-50 disabled:hover:bg-transparent",
    className
  );

  return (
    <button
      type="button"
      className={mergedClassName}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
