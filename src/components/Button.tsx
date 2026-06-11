import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

// Softer look than the default chunky button: thin translucent outline,
// frosted glass background, calmer text
export const softButtonStyle =
  "rounded-xl border-2 border-amber-50/50 bg-white/10 px-6 py-3 font-normal text-white/90 backdrop-blur-sm hover:bg-white/25 md:text-2xl lg:text-3xl";

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
  disabled,
  ...props
}: ButtonProps) => {
  const mergedClassName = twMerge(
    "rounded border-8 px-2 py-2 font-extrabold  transition-all hover:bg-gray-200",
    "disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed",
    `${
      small
        ? "border-[#6f888c] text-[#6f888c] text-xs border-4"
        : "border-amber-50 md:text-4xl lg:text-6xl"
    }`,
    className
  );

  return (
    <button
      type="button"
      className={mergedClassName}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
