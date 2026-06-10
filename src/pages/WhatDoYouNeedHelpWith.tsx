import { type HelpTypeInterface, type PageProps } from "@/App.tsx";
import Button from "@/components/Button.tsx";
import PageContainer from "@/components/PageContainer.tsx";
import { castleLoop } from "@/assets";
import { useEffect, useRef } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import Title from "@/components/Title.tsx";
import Video from "@/components/Video.tsx";

interface WhatDoYouNeedHelpWithProps extends Omit<PageProps, "messages"> {
  options: HelpTypeInterface[];
  question: string;
  setHelpType: (type: HelpTypeInterface) => void;
  extraOptions?: { label: string; onSelect: () => void }[];
}

// Softer look than the default chunky button: thin translucent outline,
// frosted glass background, calmer text
const softButtonStyle =
  "rounded-xl border-2 border-amber-50/50 bg-white/10 px-6 py-3 font-normal text-white/90 backdrop-blur-sm hover:bg-white/25 md:text-2xl lg:text-3xl";

const WhatDoYouNeedHelpWith = ({
  nextPage,
  options,
  question,
  setHelpType,
  extraOptions,
}: WhatDoYouNeedHelpWithProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { loading, switchVideo, videoProps, setLoop } = useVideo(videoRef);

  const handleSelectOption = (text: HelpTypeInterface) => {
    setHelpType(text);
    nextPage();
  };

  useEffect(() => {
    setLoop(true);
    switchVideo(castleLoop);
  }, [videoRef]);

  return (
    <PageContainer>
      <Video videoRef={videoRef} videoProps={videoProps} loading={loading} />
      <div className="z-2 relative lg:pt-36">
        <div className="flex flex-col text-white">
          <div className="gameTitle flex items-center justify-center">
            <Title>{question}</Title>
          </div>
          <div className="font-dyslexic mt-28 flex items-center justify-center gap-12 font-medium">
            {options.map((text, index) => (
              <Button
                key={index}
                onClick={() => handleSelectOption(text)}
                className={softButtonStyle}
              >
                {text}
              </Button>
            ))}
          </div>
          {extraOptions && (
            <div className="font-dyslexic mt-8 flex items-center justify-center gap-12 font-medium">
              {extraOptions.map((opt) => (
                <Button
                  key={opt.label}
                  onClick={opt.onSelect}
                  className={`${softButtonStyle} md:text-xl lg:text-2xl`}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default WhatDoYouNeedHelpWith;
