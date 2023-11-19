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
  small,
  ...rest
}: ButtonProps) => {
  const mergedClassName = twMerge(
    "rounded border-8 border-white px-2 py-2 font-extrabold text-white transition-all hover:bg-gray-200",
    "disabled:opacity-50 disabled:hover:bg-transparent",
    `${small ? "md:text-8xl lg:text-8xl" : "md:text-4xl lg:text-6xl"}`,
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
