import logo from "@/assets/images/witch_talk.png";
import { type PageProps, type setTimerMinutes } from "@/App.tsx";
import DialogBox from "@/components/DialogBox.tsx";
import PageContainer from "@/components/PageContainer.tsx";
import { useEffect, useRef } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import { room } from "@/assets";
import Video from "@/components/Video.tsx";

interface HowLongProps extends PageProps {
  setTimerMinutes: setTimerMinutes;
}

const HowLong = ({ setTimerMinutes, nextPage }: HowLongProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { loading, switchVideo, videoProps, setLoop } = useVideo(videoRef);

  const handleVideo = () => {
    setLoop(false);
    switchVideo(room);
  };

  useEffect(() => {
    handleVideo();
  }, []);

  const setHowLong = (minutes: number) => {
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
      <DialogBox>
        <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-10">
          <div
            onClick={() => setHowLong(10)}
            className="center h-[10vmax] w-[10vmax] cursor-pointer rounded bg-amber-600"
          >
            <span className="text-center">10:00</span>
          </div>
          <div
            onClick={() => setHowLong(15)}
            className="center h-[10vmax] w-[10vmax] cursor-pointer rounded bg-amber-700"
          >
            <span className="text-center">15:00</span>
          </div>
          <div
            onClick={() => setHowLong(20)}
            className="center h-[10vmax] w-[10vmax] cursor-pointer rounded bg-orange-400"
          >
            <span className="text-center">20:00</span>
          </div>
          <div
            onClick={() => setHowLong(25)}
            className="center h-[10vmax] w-[10vmax] cursor-pointer rounded bg-orange-500"
          >
            <span className="text-center">25:00</span>
          </div>
        </div>
      </DialogBox>
    </PageContainer>
  );
};

export default HowLong;
