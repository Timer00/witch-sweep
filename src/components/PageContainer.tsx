import { ReactNode } from "react";

const PageContainer  = ({ children }: { children: ReactNode}) => <div className="relative flex items-center justify-center min-h-screen">{children}</div>

export default PageContainer;
