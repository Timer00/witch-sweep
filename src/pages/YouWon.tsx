import logo from "@/assets/images/witch_talk.png";
import { type PageProps } from "@/App.tsx";
import PageContainer from "@/components/PageContainer.tsx";
import WitchDialog from "@/components/WitchDialog.tsx";
import { useEffect, useRef } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import { room } from "@/assets";

interface YouWonProps extends PageProps {
  messages: string[];
  buttonText: string;
  hideNextButton: boolean;
}

const YouWon = (props: YouWonProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { switchVideo, videoProps, setLoop } = useVideo(videoRef);

  const handleVideo = () => {
    setLoop(false);
    switchVideo(room);
  };

  useEffect(() => {
    handleVideo();
  }, []);

  return (
    <PageContainer>
      <video
        className="absolute inset-0 h-full w-full object-contain"
        ref={videoRef}
        {...videoProps}
      >
        Your browser does not support the video tag.
      </video>
      <WitchDialog imageSrc={logo} {...props} />
    </PageContainer>
  );
};

export default YouWon;
