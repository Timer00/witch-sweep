import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer = ({ children, className }: PageContainerProps) => {
  const mergedClassName = twMerge(
    "relative flex items-center justify-center min-h-screen",
    className
  );
  return (
    <div className={mergedClassName}>{children}</div>
  )
}

export default PageContainer;
