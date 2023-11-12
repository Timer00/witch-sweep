import { type PageProps } from "@/App.tsx";
import Button from "@/components/Button.tsx";
import PageContainer from "@/components/PageContainer.tsx";
import { castleLoop, logo } from "@/assets";
import { useEffect, useRef, useState } from "react";
import { useVideo } from "@/hooks/useVideo.ts";

export interface HomeProps extends Omit<PageProps, "messages"> {
  startButton: string;
  setPlayerName: (name: string) => void;
}

const Home = ({ nextPage, startButton, setPlayerName }: HomeProps) => {
  const [username, setUsername] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const { switchVideo, videoProps, setLoop } = useVideo(videoRef);

  const handleStart = () => {
    setPlayerName(username);
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
            <img
              id={"gameTitle"}
              className="w-2/4 p-6"
              src={logo}
              alt="Hocus Focus"
            />
          </div>
          <div className="p-8">
            <input
              onChange={({ target: { value } }) => setUsername(value)}
              className="mt-4 border bg-transparent text-center text-xl"
              placeholder="John Doe..."
            />
          </div>
          <div className="lg:mt-28">
            <Button disabled={username.length < 3} onClick={handleStart}>
              {startButton}
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;
