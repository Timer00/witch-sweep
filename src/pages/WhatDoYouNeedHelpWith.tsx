import { type HelpType, type PageProps } from "@/App.tsx";
import Button from "@/components/Button.tsx";
import PageContainer from "@/components/PageContainer.tsx";
import { castleLoop } from "@/assets";
import { useEffect, useRef } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import Title from "@/components/Title.tsx";

interface WhatDoYouNeedHelpWithProps extends Omit<PageProps, "messages"> {
  options: HelpType[];
  question: string;
  setHelpType: (type: HelpType) => void;
}

const WhatDoYouNeedHelpWith = ({
  nextPage,
  options,
  question,
  setHelpType,
}: WhatDoYouNeedHelpWithProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { switchVideo, videoProps, setLoop } = useVideo(videoRef);

  const handleSelectOption = (text: HelpType) => {
    setHelpType(text);
    nextPage();
  };

  useEffect(() => {
    setLoop(true);
    switchVideo(castleLoop);
  }, [videoRef]);

  return (
    <PageContainer>
      <video
        className="absolute inset-0 h-full w-full object-contain"
        ref={videoRef}
        {...videoProps}
      >
        Your browser does not support the video tag.
      </video>
      <div className="relative z-2 lg:pt-36">
        <div className="flex flex-col text-white">
          <div className="gameTitle flex items-center justify-center">
            <Title>{question}</Title>
          </div>
          <div className="font-dyslexic mt-28 flex items-center justify-center gap-12 font-medium">
            {options.map((text) => (
              <Button onClick={() => handleSelectOption(text)}>{text}</Button>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default WhatDoYouNeedHelpWith;
