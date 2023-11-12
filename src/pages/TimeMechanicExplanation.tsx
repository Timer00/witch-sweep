import { type PageProps } from "@/App.tsx";
import PageContainer from "@/components/PageContainer.tsx";
import { useEffect, useRef } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import { room } from "@/assets";
import logo from "@/assets/images/witch_talk.png";
import WitchDialog from "@/components/WitchDialog.tsx";
import Video from "@/components/Video.tsx";

type IntroProps = PageProps;

const TimeMechanicExplanation = (props: IntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { loading, switchVideo, videoProps, setLoop } = useVideo(videoRef);

  const handleVideo = () => {
    setLoop(false);
    switchVideo(room);
  };

  useEffect(() => {
    handleVideo();
  }, []);

  return (
    <PageContainer>
      <Video videoRef={videoRef} videoProps={videoProps} loading={loading} />
      <WitchDialog imageSrc={logo} {...props} />
    </PageContainer>
  );
};

export default TimeMechanicExplanation;
