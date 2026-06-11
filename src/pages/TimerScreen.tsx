import { HelpTypeInterface, type PageProps } from "@/App.tsx";
import Timer from "@/components/Timer.tsx";
import Button, { softButtonStyle } from "@/components/Button.tsx";
import PageContainer from "@/components/PageContainer.tsx";
import { useEffect, useRef } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import { cleaning, homework } from "@/assets";
import Video from "@/components/Video.tsx";

export interface TimerScreenProps extends Omit<PageProps, "messages"> {
  helpType: HelpTypeInterface;
  timerMinutes: number;
  doneButton: string;
  timerHeader: string;
  onTimeOver: (time: number) => void;
  onClickButton: (time: number) => void;
  /** Optional subdued second button, e.g. "Aufgeben" while cleaning */
  secondaryButton?: string;
  onClickSecondaryButton?: (time: number) => void;
}

const TimerScreen = ({
  timerMinutes,
  doneButton,
  // timerHeader,
  onTimeOver,
  onClickButton,
  helpType,
  secondaryButton,
  onClickSecondaryButton,
}: TimerScreenProps) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60 * timerMinutes); // 10 minutes timer
  const videoRef = useRef<HTMLVideoElement>(null);
  const { loading, switchVideo, videoProps, setLoop } = useVideo(videoRef);

  const handleVideo = () => {
    setLoop(true);
    switchVideo(
      {
        [HelpTypeInterface.cleaning]: cleaning,
        [HelpTypeInterface.homework]: homework,
      }[helpType]
    );
  };

  useEffect(() => {
    handleVideo();
  }, []);

  return (
    <PageContainer>
      <Video videoRef={videoRef} videoProps={videoProps} loading={loading} />
      <div className="z-2 relative flex h-full flex-col items-center justify-between p-6 text-amber-50">
        <div className="rounded-2xl border-2 border-amber-50/40 bg-black/35 px-10 py-2 backdrop-blur-sm">
          <Timer
            className="font-dyslexic text-4xl md:text-5xl"
            expiryTimestamp={time}
            onExpire={() => onTimeOver(timerMinutes)}
            autoStart={true}
          />
        </div>
        <div className="flex flex-col items-center gap-2 lg:gap-3">
          <Button
            className={
              helpType === HelpTypeInterface.homework
                ? `${softButtonStyle} border-amber-50/30 bg-white/5 text-base text-white/70 md:text-lg lg:text-xl`
                : softButtonStyle
            }
            onClick={() => onClickButton(timerMinutes)}
          >
            {doneButton}
          </Button>
          {secondaryButton && onClickSecondaryButton && (
            <Button
              className={`${softButtonStyle} border-amber-50/30 bg-white/5 px-4 py-1.5 text-sm text-white/60 md:text-base lg:text-lg`}
              onClick={() => onClickSecondaryButton(timerMinutes)}
            >
              {secondaryButton}
            </Button>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default TimerScreen;
