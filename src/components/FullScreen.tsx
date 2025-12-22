import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface FullScreenProps {
  children: ReactNode;
  onClose: () => void;
  hideCloseButton?: boolean;
}

interface CloseButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

const CloseButton = ({ onClick, text, className }: CloseButtonProps) => (
  <button onClick={onClick} className={twMerge("z-3 m-4", className)}>
    <div className="flex items-center space-x-1 border-4 border-black px-4 active:bg-black active:text-white">
      <span className="text-lg font-semibold">{text}</span>
    </div>
  </button>
);

const FullScreen = ({
  children,
  onClose,
  hideCloseButton = false,
}: FullScreenProps) => {
  return (
    <div className="z-2 absolute left-0 top-0 flex h-full w-full flex-col justify-start overflow-auto bg-amber-50 p-4 text-black">
      {!hideCloseButton && (
        <CloseButton
          onClick={onClose}
          text="X"
          className="absolute right-0 top-0"
        />
      )}
      {children}
    </div>
  );
};

export default FullScreen;
