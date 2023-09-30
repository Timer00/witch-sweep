import { useState, useEffect, RefObject } from 'react';

export const useVideo = (videoEl: RefObject<HTMLVideoElement>) => {
  const [playing, setPlaying] = useState(false);
  const [source, setSource] = useState<string | undefined>(undefined);
  const [loop, setLoop] = useState(false);

  const toggle = () => setPlaying(!playing);

  const pause = () => videoEl.current?.pause();

  const play = () => videoEl.current?.play();

  const switchVideo = (newVideoFile: string) => {
    setSource(newVideoFile);
    videoEl.current?.load();
    play();
  };

  useEffect(() => {
    playing ? videoEl.current?.play() : videoEl.current?.pause();
  }, [playing]);

  useEffect(() => {
    const handleVideoEnd = () => setPlaying(false);
    videoEl?.current?.addEventListener("ended", handleVideoEnd);

    return () => {
      videoEl?.current?.removeEventListener("ended", handleVideoEnd);
    };
  }, [playing]);

  return {
    playing,
    toggle,
    pause,
    play,
    switchVideo,
    setLoop,
    videoProps: {
      src: source,
      loop,
      autoPlay: true
    }
  };
};