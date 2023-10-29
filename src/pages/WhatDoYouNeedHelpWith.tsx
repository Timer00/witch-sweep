import { HelpType, PageProps } from '@/App.tsx';
import Button from '@/components/Button.tsx';
import PageContainer from "@/components/PageContainer.tsx";
import { castleLoop } from "@/assets";
import { useEffect, useRef } from "react";
import { useVideo } from "@/hooks/useVideo.ts";

interface WhatDoYouNeedHelpWithProps extends Omit<PageProps, 'messages'> {
  options: HelpType[];
  question: string;
  setHelpType: (type: HelpType) => void;
}

const WhatDoYouNeedHelpWith = ({ nextPage, options, question, setHelpType }: WhatDoYouNeedHelpWithProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { switchVideo, videoProps, setLoop } = useVideo(videoRef);

  const handleSelectOption = (text) => {
    setHelpType(text);
    nextPage();
  }

  useEffect(() => {
    setLoop(true);
    switchVideo(castleLoop);
  }, [videoRef]);

  return (
    <PageContainer>
      <video
        className="absolute inset-0 w-full h-full object-contain" ref={videoRef} {...videoProps}>
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 lg:pt-36">
        <div className="text-white flex flex-col">
          <div className="gameTitle flex items-center justify-center">
            <p id={'gameTitle'}
               className="bg-gradient-to-r from-yellow-300 to-yellow-700 bg-clip-text p-8 font-black text-transparent selection:bg-transparent md:text-4xl lg:text-6xl">
              {question}
            </p>
          </div>
          <div className="mt-28 flex gap-12 items-center justify-center">
            {options.map(text => <Button onClick={() => handleSelectOption(text)}>{text}</Button>)}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default WhatDoYouNeedHelpWith;
