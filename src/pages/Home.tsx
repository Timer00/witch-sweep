import { type PageProps } from "@/App.tsx";
import Button from "@/components/Button.tsx";
import PageContainer from "@/components/PageContainer.tsx";
import { castleLoop, logo } from "@/assets";
import { useEffect, useRef, useState } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import Video from "@/components/Video.tsx";

export interface HomeProps extends Omit<PageProps, "messages"> {
  startButton: string;
  setPlayerName: (name: string) => void;
}

const Home = ({ nextPage, startButton, setPlayerName }: HomeProps) => {
  const [username, setUsername] = useState<string>(() => {
    const localName = localStorage.getItem("username");
    if (localName) return localName;
    else return "";
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const { loading, switchVideo, videoProps, setLoop } = useVideo(videoRef);

  const handleStart = () => {
    setPlayerName(username);
    localStorage.setItem("username", username);
    nextPage();
  };

  useEffect(() => {
    setLoop(true);
    switchVideo(castleLoop);
  }, [videoRef]);

  return (
    <PageContainer>
      <Video videoRef={videoRef} videoProps={videoProps} loading={loading} />
      <div className="z-2 relative mt-[15vh] flex h-full flex-col lg:pt-24">
        <div className="flex flex-col text-white">
          <div className="gameTitle flex items-center justify-center">
            <img
              id={"gameTitle"}
              className="w-2/4 p-6"
              src={logo}
              alt="Hocus Focus"
            />
          </div>
          <div className="mt-[2.5vh] flex flex-1 flex-col items-center justify-center gap-6 p-8">
            <input
              value={username}
              onChange={({ target: { value } }) => setUsername(value)}
              className="border bg-transparent text-center text-xl"
              placeholder="Dein Name…"
            />
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
