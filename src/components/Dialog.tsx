// DialogBox.js

import Message from "@/components/Message.tsx";
import { ChevronsRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DialogBox from "@/components/DialogBox.tsx";
import { type PageProps, Witch } from "@/App.tsx";
import Button from "@/components/Button.tsx";
import {
  witch1Coin,
  witch2Coin,
  witchHello,
  witchSad,
  witchTalk,
} from "@/assets"; //highlight-line

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
  });

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
        <div className="mb-2 border-b border-[#5a3a22]/20 pb-1 text-center text-base font-bold text-[#5a3a22] md:mb-3 md:text-xl lg:text-2xl">
          {"Anabella Declutter"}
        </div>
        <div
          className={`flex gap-3 lg:flex-col ${showButton ? "flex-col" : ""}`}
        >
          <Message message={currentMessage.text} key={currentMessageNumber} />
          <button
            type="button"
            onClick={handleClick}
            aria-label="Weiter"
            className={`${
              hideNextButtonState ? "hidden" : ""
            } flex cursor-pointer items-end justify-end self-end text-[#5a3a22] transition-opacity hover:opacity-70 lg:mt-2 lg:self-auto`}
          >
            <ChevronsRight className="h-5 w-5 animate-pulse md:h-6 md:w-6 lg:h-7 lg:w-7" />
          </button>
          {showButton ? (
            <Button
              className="m-2 self-center rounded-xl border-2 border-[#5a3a22]/60 bg-[#d9c08c]/50 px-5 py-2 text-base font-bold text-[#3a2417] hover:bg-[#d9c08c]/80 md:text-xl lg:text-2xl"
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
