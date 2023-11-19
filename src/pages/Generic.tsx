import { type PageProps } from "@/App.tsx";
import PageContainer from "@/components/PageContainer.tsx";
import { useEffect, useRef } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import { room } from "@/assets";
import WitchDialog from "@/components/WitchDialog.tsx";
import Video from "@/components/Video.tsx";

const Generic = (props: PageProps) => {
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
      <WitchDialog {...props} />
    </PageContainer>
  );
};

export default Generic;
