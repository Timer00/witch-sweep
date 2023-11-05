// DialogBox.js

import Message from "@/components/Message.tsx";
import { useEffect, useState } from "react";
import DialogBox from "@/components/DialogBox.tsx";
import { type PageProps } from "@/App.tsx";
import Button from "@/components/Button.tsx"; //highlight-line

export interface DialogProps extends PageProps {
  hideNextButton?: boolean;
  buttonText?: string;
}

const Dialog = ({
  messages,
  nextPage,
  hideNextButton = false,
  buttonText = "",
}: DialogProps) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showButton, setShowbutton] = useState(false);
  const [hideNextButtonState, setHideNextButtonHook] = useState(false);

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
      buttonText.length === 0 ? nextPage() : "";
    }
  };

  return (
    <DialogBox>
      {/*TODO: Replace with name from configuration*/}
      <div className="mb-4 text-center text-xl font-bold lg:text-3xl">
        {"Anabella Declutter"}
      </div>
      <div className={`flex gap-3 lg:flex-col ${showButton ? "flex-col" : ""}`}>
        <Message message={messages[currentMessage]} key={currentMessage} />
        <div
          onClick={handleClick}
          className={`${
            hideNextButtonState ? "hidden" : ""
          } cursor-pointer text-right text-lg font-extrabold lg:mt-4`}
        >
          {">>"}
        </div>
        {showButton ? (
          <Button
            className="m-10 font-mono lg:border-black lg:text-black"
            onClick={nextPage}
          >
            {buttonText}
          </Button>
        ) : (
          ""
        )}
      </div>
    </DialogBox>
  );
};
export default Dialog;
