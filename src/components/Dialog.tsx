// DialogBox.js

import Message from '@/components/Message.tsx';
import { useEffect, useState } from 'react';
import DialogBox from '@/components/DialogBox.tsx';
import { nextPage } from '@/App.tsx';
import Button from '@/components/Button.tsx'; //highlight-line

import content from '@/assets/content.json';

const Dialog = ({
  messages,
  nextPage,
  hideNextButton = false,
  buttonText = '',
}: {
  messages: string[];
  nextPage: nextPage;
  hideNextButton?: boolean;
  buttonText?: string;
}) => {
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
    console.log(messages);
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
      <div className="mb-4 mr-auto text-3xl font-bold">{content.witchName}</div>
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
