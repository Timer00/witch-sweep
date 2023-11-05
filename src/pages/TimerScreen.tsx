import { type PageProps } from "@/App.tsx";
import Timer from "@/components/Timer.tsx";
import Button from "@/components/Button.tsx";
import PageContainer from "@/components/PageContainer.tsx";
import { useEffect, useRef } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import { cleaning } from "@/assets";

export interface TimerScreenProps extends Omit<PageProps, "messages"> {
  timerMinutes: number;
  doneButton: string;
  timerHeader: string;
  onTimeOver: (time: number) => void;
  onClickButton: (time: number) => void;
}

const TimerScreen = ({
  timerMinutes,
  doneButton,
  // timerHeader,
  onTimeOver,
  onClickButton,
}: TimerScreenProps) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60 * timerMinutes); // 10 minutes timer

  const videoRef = useRef<HTMLVideoElement>(null);
  const { switchVideo, videoProps, setLoop } = useVideo(videoRef);

  const handleVideo = () => {
    setLoop(true);
    switchVideo(cleaning);
  };

  useEffect(() => {
    handleVideo();
  }, []);

  return (
    <PageContainer>
      <video
        className="absolute inset-0 h-full w-full object-contain"
        ref={videoRef}
        {...videoProps}
      >
        Your browser does not support the video tag.
      </video>
      <div className="z-0 flex h-screen flex-col justify-between p-5 text-amber-50">
        {/*<h1 className="text-3xl font-bold">{timerHeader}</h1>*/}
        <Timer
          className="text-4xl underline underline-offset-8"
          expiryTimestamp={time}
          onExpire={() => onTimeOver(timerMinutes)}
          autoStart={true}
        />
        <Button
          className="m-3 border-amber-50 font-mono"
          onClick={() => onClickButton(timerMinutes)}
        >
          {doneButton}
        </Button>
      </div>
    </PageContainer>
  );
};

export default TimerScreen;
