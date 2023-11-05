import { type PageProps } from '@/App.tsx';
import Button from '@/components/Button.tsx';
import PageContainer from "@/components/PageContainer.tsx";
import { castleLoop } from "@/assets";
import { useEffect, useRef, useState } from "react";
import { useVideo } from "@/hooks/useVideo.ts";

interface HomeProps extends Omit<PageProps, 'messages'> {
  gameTitle: string;
  startButton: string;
  setPlayerName: (name: string) => void;
}

const Home = ({ nextPage, gameTitle, startButton, setPlayerName }: HomeProps) => {
  const [username, setUsername] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const { switchVideo, videoProps, setLoop } = useVideo(videoRef);

  const handleStart = () => {
    setPlayerName(username);
    nextPage();
  }

  useEffect(() => {
    setLoop(true);
    switchVideo(castleLoop as string);
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
              {gameTitle}
            </p>
          </div>
          <div className="p-12">
            <label className="text-2xl font-bold">Deine name</label><br />
            <input onChange={({ target: { value } }) => setUsername(value)}
                   className="mt-4 text-xl text-center bg-transparent border" placeholder="_ _ _ _ _ _ _ _ _ _ _" />
          </div>
          <div className="lg:mt-28">
            <Button disabled={username.length < 3} onClick={handleStart}>{startButton}</Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;
