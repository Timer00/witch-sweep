import logo from '@/assets/images/witch_talk.png';
import { Page } from '@/App.tsx';
import Dialog from '@/components/Dialog.tsx';

interface AreYouReadyProps extends Page {
  goButton: string;
  messages: string[];
}

const AreYouReady = ({ nextPage, messages, goButton }: AreYouReadyProps) => {
  return (
    <div className="flex h-full items-center justify-center p-32">
      <img
        src={logo}
        alt="logo"
        className="absolute left-[1%] top-[42%] z-0 w-1/2"
      />
      <Dialog
        messages={messages}
        nextPage={nextPage}
        hideNextButton
        buttonText={goButton}
      />
    </div>
  );
};

export default AreYouReady;
