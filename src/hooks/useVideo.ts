import { useState, useEffect, type RefObject } from "react";

export const useVideo = (videoEl: RefObject<HTMLVideoElement>) => {
  const [loading, setLoading] = useState(true); // New state to track loading
  const [playing, setPlaying] = useState(false);
  const [source, setSource] = useState<string | undefined>(undefined);
  const [loop, setLoop] = useState(false);
  const [videoEndAction, setVideoEndAction] = useState<()=>void>(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => () => {}
  );

  const toggle = () => setPlaying(!playing);

  const pause = () => videoEl.current?.pause();

  const play = () => videoEl.current?.play();

  const switchVideo = (newVideoFile: string) => {
    setLoading(true);
    setSource(newVideoFile);
    console.log("Load video: ", newVideoFile);
    videoEl.current?.load();
  };

  useEffect(() => {
    const { current } = videoEl;

    if (!current) return;

    const handleCanPlay = () => {
      setLoading(false); // Set loading to false when video can play
    };
    current.addEventListener("canplay", handleCanPlay);

    const handleVideoEnd = () => {
      videoEndAction();
      setPlaying(false);
      current?.removeEventListener("ended", handleVideoEnd);
    };
    current?.addEventListener("ended", handleVideoEnd);

    return () => {
      current.removeEventListener("canplay", handleCanPlay);
      current?.removeEventListener("ended", handleVideoEnd);
    };
  }, [playing, videoEndAction, videoEl]);

  return {
    loading,
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
      playsInline: true,
      preload: "auto",
    },
  };
};
