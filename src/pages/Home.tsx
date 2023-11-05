import { type PageProps } from '@/App.tsx';
import Button from '@/components/Button.tsx';
import PageContainer from "@/components/PageContainer.tsx";
import { castleLoop, logo } from "@/assets";
import { useEffect, useRef, useState } from "react";
import { useVideo } from "@/hooks/useVideo.ts";

export interface HomeProps extends Omit<PageProps, 'messages'> {
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
            <img id={'gameTitle'} className="p-8 w-2/3" src={logo} alt='Hocus Focus'/>
          </div>
          <div className="p-8">
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
