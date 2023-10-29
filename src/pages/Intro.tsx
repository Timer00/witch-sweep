import { PageProps } from '@/App.tsx';
import Dialog from '@/components/Dialog.tsx';
import PageContainer from "@/components/PageContainer.tsx";
import { useEffect, useRef, useState } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import { castleIntro, castleLoop, room } from "@/assets";

type IntroProps = PageProps;

const Intro = ({ nextPage, messages }: IntroProps) => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const { play, switchVideo, videoProps, setLoop, setVideoEndAction } = useVideo(videoRef);
  const [showUI, setShowUI] = useState(false);

  const handleVideo = async () => {
    setLoop(false);
    switchVideo(castleIntro);
    setVideoEndAction(() => () =>{
      switchVideo(room);
      setShowUI(true);
    });
  }

  useEffect(() => {
    handleVideo()
  }, []);


  return (
    <PageContainer>
      <video
        className="absolute inset-0 w-full h-full object-contain" ref={videoRef} {...videoProps}>
        Your browser does not support the video tag.
      </video>
      {showUI && (
        <div className="w-[100vw] h-[100vh] z-10 flex flex-col justify-end items-center p-12">
          <Dialog messages={messages} nextPage={nextPage} />
        </div>
      )}
    </PageContainer>
  );
};

export default Intro;
