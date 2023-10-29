import { PageProps } from '@/App.tsx';
import PageContainer from "@/components/PageContainer.tsx";
import { useEffect, useRef, useState } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import { castleIntro, room } from "@/assets";
import logo from "@/assets/images/witch_talk.png";
import WitchDialog from "@/components/WitchDialog.tsx";

type IntroProps = PageProps;

const Intro = (props: IntroProps) => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const { switchVideo, videoProps, setLoop, setVideoEndAction } = useVideo(videoRef);
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
        <WitchDialog imageSrc={logo} {...props} />
      )}
    </PageContainer>
  );
};

export default Intro;
