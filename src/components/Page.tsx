import React, { useEffect, useRef, useState } from "react";
import { room } from "@/assets";
import { useVideo } from "@/hooks/useVideo.ts";
import { type PageProps } from "@/App.tsx";

type PageComponent = React.ComponentType<PageProps>;

interface PageComponentProps {
  PageComponent: PageComponent;
  video: string[];
  settings?: {
    loop?: boolean;
    showOnEnd?: boolean;
  };
}

const Page = ({
  PageComponent,
  video = [room],
  settings = {},
}: PageComponentProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoToPlay, setVideoToPlay] = useState(0);
  const { play, switchVideo, videoProps, setLoop, setActionOnVideoEnd } =
    useVideo(videoRef);
  const [showPage, setShowPage] = useState(!settings?.showOnEnd);

  useEffect(() => {
    setLoop(settings.loop ?? true);
    switchVideo(video[videoToPlay]);
    play();
  }, [video, settings, videoRef]);

  useEffect(() => {
    if (settings.showOnEnd) {
      setActionOnVideoEnd(onNextPage);
    }
  }, [settings, onNextPage]);

  return (
    <>
      <PageComponent />
    </>
  );
};

export default Page;
