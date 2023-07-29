import logo from '@/assets/images/witch.png';
import { Page } from '@/App.tsx';
import Dialog from '@/components/Dialog.tsx';

interface YouWonProps extends Page {
  restartButton: string;
}

const YouWon = ({ nextPage, messages, restartButton }: YouWonProps) => {
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
        buttonText={restartButton}
      />
    </div>
  );
};

export default YouWon;
