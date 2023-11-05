import { useState, useEffect, type RefObject } from "react";

export const useVideo = (videoEl: RefObject<HTMLVideoElement>) => {
  const [playing, setPlaying] = useState(false);
  const [source, setSource] = useState<string | undefined>(undefined);
  const [loop, setLoop] = useState(false);
  const [videoEndAction, setVideoEndAction] = useState<Function>(
    () => () => {}
  );

  const toggle = () => setPlaying(!playing);

  const pause = () => videoEl.current?.pause();

  const play = () => videoEl.current?.play();

  const switchVideo = (newVideoFile: string) => {
    setSource(newVideoFile);
    console.log("Load video: ", newVideoFile);
    videoEl.current?.load();
  };

  useEffect(() => {
    // playing ? videoEl.current?.play() : videoEl.current?.pause();
  }, [playing, videoEl]);

  useEffect(() => {
    const handleVideoEnd = () => {
      videoEndAction();
      setPlaying(false);
      videoEl?.current?.removeEventListener("ended", handleVideoEnd);
    };
    videoEl?.current?.addEventListener("ended", handleVideoEnd);

    return () => {
      videoEl?.current?.removeEventListener("ended", handleVideoEnd);
    };
  }, [playing, videoEndAction]);

  return {
    playing,
    toggle,
    pause,
    play,
    switchVideo,
    setLoop,
    setVideoEndAction,
    videoProps: {
      src: source,
      loop,
      autoPlay: true,
      muted: true,
    },
  };
};
