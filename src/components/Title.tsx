import { type ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

const Title = ({ children }: TitleProps) => (
  <p id={"gameTitle"} className="font-dyslexic md:text-4xl lg:text-6xl">
    {children}
  </p>
);

export default Title;
