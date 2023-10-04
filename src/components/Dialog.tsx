// DialogBox.js

import Message from '@/components/Message.tsx';
import { useEffect, useState } from 'react';
import DialogBox from '@/components/DialogBox.tsx';
import { PageProps } from '@/App.tsx';
import Button from '@/components/Button.tsx'; //highlight-line

interface DialogProps extends PageProps {
  hideNextButton?: boolean;
  buttonText?: string;
}

const Dialog = ({
  messages,
  nextPage,
  hideNextButton = false,
  buttonText = '',
}: DialogProps) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showButton, setShowbutton] = useState(false);
  const [hideNextButtonHook, setHideNextButtonHook] = useState(false);

  useEffect(() => {
    if (buttonText.length !== 0 && hideNextButton) {
      setShowbutton(true);
    }
    if (hideNextButton) {
      setHideNextButtonHook(true);
    }
  }, []);

  useEffect(() => {
    if (currentMessage > messages.length - 2 && buttonText.length !== 0) {
      setShowbutton(true);
      setHideNextButtonHook(true);
    }
  }, [currentMessage]);

  const handleClick = () => {
    if (currentMessage < messages.length - 1) {
      setCurrentMessage(currentMessage + 1);
    } else {
      buttonText.length === 0 ? nextPage() : '';
    }
  };

  return (
    <DialogBox>
      {/*TODO: Replace with name from configuration*/}
      <div className="mb-4 mr-auto text-3xl font-bold">{'Anabella Declutter'}</div>
      <Message message={messages[currentMessage]} key={currentMessage} />
      <div
        onClick={handleClick}
        className={`${
          hideNextButtonHook ? 'hidden' : ''
        } mt-4 cursor-pointer text-right text-lg font-extrabold`}
      >
        {'>>'}
      </div>
      {showButton ? (
        <Button
          className="m-10 border-black font-mono text-black"
          onClick={nextPage}
        >
          {buttonText}
        </Button>
      ) : (
        ''
      )}
    </DialogBox>
  );
};
export default Dialog;
