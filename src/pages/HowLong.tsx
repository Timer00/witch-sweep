import logo from "@/assets/images/witch_talk.png";
import { type PageProps, type setTimerMinutes } from "@/App.tsx";
import PageContainer from "@/components/PageContainer.tsx";
import Button, { softButtonStyle } from "@/components/Button.tsx";
import TimeClockPicker, {
  MIN_MINUTES,
} from "@/components/TimeClockPicker.tsx";
import { useEffect, useRef, useState } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import { room } from "@/assets";
import Video from "@/components/Video.tsx";

interface HowLongProps extends PageProps {
  setTimerMinutes: setTimerMinutes;
}

const HowLong = ({ setTimerMinutes, nextPage }: HowLongProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { loading, switchVideo, videoProps, setLoop } = useVideo(videoRef);
  const [minutes, setMinutes] = useState(MIN_MINUTES);

  useEffect(() => {
    setLoop(false);
    switchVideo(room);
  }, []);

  const handleConfirm = () => {
    setTimerMinutes(minutes);
    nextPage();
  };

  return (
    <PageContainer>
      <Video videoRef={videoRef} videoProps={videoProps} loading={loading} />
      <img
        src={logo}
        alt="logo"
        className="z-2 absolute left-[-2%] top-[1%] w-1/2"
      />
      <div className="z-2 relative flex h-full w-full items-center justify-end pr-[6%] lg:pr-[10%]">
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <TimeClockPicker minutes={minutes} onChange={setMinutes} />
          <Button
            onClick={handleConfirm}
            className={`${softButtonStyle} font-dyslexic px-8 py-2 text-lg md:text-xl lg:text-2xl`}
          >
            Weiter
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default HowLong;
