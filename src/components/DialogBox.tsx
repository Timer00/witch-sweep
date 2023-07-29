import { ReactNode } from 'react';

const DialogBox = ({ children }: { children: ReactNode }) => {
  return (
    <div className="font-gothic max-w-7xl rounded-xl border-8 border-double border-black bg-white p-4 text-2xl">
      {children}
    </div>
  );
};
export default DialogBox;
