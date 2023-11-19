// DialogBox.js

import Message from "@/components/Message.tsx";
import { useEffect, useRef, useState } from "react";
import DialogBox from "@/components/DialogBox.tsx";
import { type PageProps, Witch } from "@/App.tsx";
import Button from "@/components/Button.tsx";
import { witch1Coin, witch2Coin, witchHello, witchSad, witchTalk } from "@/assets"; //highlight-line

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
  const [currentMessageNumber, setCurrentMessageNumber] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [hideNextButtonState, setHideNextButtonHook] = useState(false);

  const witches = useRef({
    [Witch.hello]: witchHello,
    [Witch.talk]: witchTalk,
    [Witch.sad]: witchSad,
    [Witch.coin]: witch1Coin,
    [Witch.coins]: witch2Coin,
  })

  useEffect(() => {
    if (buttonText.length !== 0 && hideNextButton) {
      setShowButton(true);
    }
    if (hideNextButton) {
      setHideNextButtonHook(true);
    }
  }, []);

  useEffect(() => {
    if (currentMessageNumber > messages.length - 2 && buttonText.length !== 0) {
      setShowButton(true);
      setHideNextButtonHook(true);
    }
  }, [currentMessageNumber]);

  const handleClick = () => {
    if (currentMessageNumber < messages.length - 1) {
      setCurrentMessageNumber(currentMessageNumber + 1);
    } else {
      buttonText.length === 0 ? nextPage() : "";
    }
  };

  const currentMessage = messages[currentMessageNumber];
  console.log({ messages,currentMessageNumber, currentMessage });

  return (
    <>
      <div className="h-1/5 w-1/12">
        <img
          src={witches.current[currentMessage.witch]}
          alt="logo"
          className="absolute left-[-10%] top-[10%] w-1/2"
        />
      </div>
      <DialogBox>
        {/*TODO: Replace with name from configuration*/}
        <div className="mb-4 text-center text-xl font-bold lg:text-3xl">
          {"Anabella Declutter"}
        </div>
        <div className={`flex gap-3 lg:flex-col ${showButton ? "flex-col" : ""}`}>
          <Message message={currentMessage.text} key={currentMessageNumber} />
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
              className="m-5 lg:border-black lg:text-black"
              onClick={nextPage}
            >
              {buttonText}
            </Button>
          ) : (
            ""
          )}
        </div>
      </DialogBox>
    </>

  );
};
export default Dialog;
