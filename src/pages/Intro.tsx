import logo from '@/assets/images/witch.png';
import { Page } from '@/App.tsx';

import Dialog from '@/components/Dialog.tsx';

type IntroProps = Page;

const Intro = ({ nextPage, messages }: IntroProps) => {
  return (
    <div className="flex h-full items-center justify-center p-32">
      <img
        src={logo}
        alt="logo"
        className="absolute left-[1%] top-[42%] z-0 w-1/2"
      />
      <Dialog messages={messages} nextPage={nextPage} />
    </div>
  );
};

export default Intro;