import { type PageProps } from "@/App.tsx";
import PageContainer from "@/components/PageContainer.tsx";
import { useEffect, useRef, useState } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import { castleIntro, room } from "@/assets";
import logo from "@/assets/images/witch_talk.png";
import WitchDialog from "@/components/WitchDialog.tsx";
import Video from "@/components/Video.tsx";

type IntroProps = PageProps;

const Intro = (props: IntroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { loading, switchVideo, videoProps, setLoop, setVideoEndAction } =
    useVideo(videoRef);
  const [showUI, setShowUI] = useState(false);

  const handleVideo = () => {
    setLoop(false);
    switchVideo(castleIntro);
    setVideoEndAction(() => () => {
      switchVideo(room);
      setShowUI(true);
    });
  };

  useEffect(() => {
    handleVideo();
  }, []);

  return (
    <PageContainer>
      <Video videoRef={videoRef} videoProps={videoProps} loading={loading} />
      {showUI && <WitchDialog imageSrc={logo} {...props} />}
    </PageContainer>
  );
};

export default Intro;
