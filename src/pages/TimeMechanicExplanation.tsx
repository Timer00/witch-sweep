import { PageProps } from '@/App.tsx';
import PageContainer from "@/components/PageContainer.tsx";
import { useEffect, useRef } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import { room } from "@/assets";
import logo from "@/assets/images/witch_talk.png";
import WitchDialog from "@/components/WitchDialog.tsx";

type IntroProps = PageProps;

const TimeMechanicExplanation = (props: IntroProps) => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const { switchVideo, videoProps, setLoop } = useVideo(videoRef);

  const handleVideo = async () => {
    setLoop(false);
    switchVideo(room);
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
      <WitchDialog imageSrc={logo} {...props} />
    </PageContainer>
  );
};

export default TimeMechanicExplanation;