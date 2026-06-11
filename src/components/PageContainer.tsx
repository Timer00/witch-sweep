import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const PageContainer = ({ children, className, style }: PageContainerProps) => {
  const mergedClassName = twMerge(
    "relative flex items-center justify-center h-full overflow-hidden",
    className
  );
  return <div className={mergedClassName} style={style}>{children}</div>;
};

export default PageContainer;
