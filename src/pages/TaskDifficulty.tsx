import logo from "@/assets/images/witch_talk.png";
import { type PageProps } from "@/App.tsx";
import PageContainer from "@/components/PageContainer.tsx";
import Button, { softButtonStyle } from "@/components/Button.tsx";
import DifficultySlider, {
  MIN_POINTS,
} from "@/components/DifficultySlider.tsx";
import { useEffect, useRef, useState } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import { room } from "@/assets";
import Video from "@/components/Video.tsx";

interface TaskDifficultyProps extends PageProps {
  setTaskCoins: (coins: number) => void;
}

const TaskDifficulty = ({ setTaskCoins, nextPage }: TaskDifficultyProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { loading, switchVideo, videoProps, setLoop } = useVideo(videoRef);
  const [points, setPoints] = useState(MIN_POINTS);

  useEffect(() => {
    setLoop(false);
    switchVideo(room);
  }, []);

  const handleConfirm = () => {
    setTaskCoins(points);
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
      <div className="z-2 relative flex h-full w-full items-center justify-end">
        <div className="flex w-1/2 flex-col items-center gap-3 lg:gap-6">
          <DifficultySlider points={points} onChange={setPoints} />
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

export default TaskDifficulty;
