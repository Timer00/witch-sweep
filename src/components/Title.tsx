import { type ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

const Title = ({ children }: TitleProps) => (
  <p id={"gameTitle"} className="font-dyslexic text-white/95 md:text-3xl lg:text-5xl">
    {children}
  </p>
);

export default Title;
