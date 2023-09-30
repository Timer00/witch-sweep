import { ReactNode } from "react";

const PageContainer  = ({ children }: { children: ReactNode}) => <div className="flex h-full items-center justify-center p-32">{children}</div>

export default PageContainer;
