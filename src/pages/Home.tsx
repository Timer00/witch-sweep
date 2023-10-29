import logo from '@/assets/images/witch_talk.png';
import { PageProps } from '@/App.tsx';
import Button from '@/components/Button.tsx';
import PageContainer from "@/components/PageContainer.tsx";
import { castleLoop } from "@/assets";
import { useEffect, useRef, useState } from "react";
import { useVideo } from "@/hooks/useVideo.ts";

interface HomeProps extends Omit<PageProps, 'messages'> {
  gameTitle: string;
  startButton: string;
}

const Home = ({ nextPage, gameTitle, startButton }: HomeProps) => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const { switchVideo, videoProps, setLoop } = useVideo(videoRef);

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
      <div className="relative z-10">
        <div className="parent text-white">
          <div className="gameTitle flex items-center justify-center">
            <p id={'gameTitle'}
               className="bg-gradient-to-r from-yellow-300 to-yellow-700 bg-clip-text p-8 font-black text-transparent selection:bg-transparent md:text-4xl lg:text-6xl">
              {gameTitle}
            </p>
          </div>
          <div className="startButton">
            <p className="">
              <Button onClick={nextPage}>{startButton}</Button>
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;
