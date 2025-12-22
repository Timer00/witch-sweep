import { type RefObject } from "react";

interface VideoProps {
  videoRef: RefObject<HTMLVideoElement>;
  videoProps: object;
  loading: boolean;
}

const Video = ({ videoRef, videoProps, loading }: VideoProps) => {
  return (
    <>
      <video
        className={`absolute inset-0 h-full w-full object-contain ${
          loading ? "invisible" : "visible"
        }`}
        ref={videoRef}
        {...videoProps}
      >
        Your browser does not support the video tag.
      </video>
      {loading && (
        <div className="absolute inset-0 h-full w-full bg-black"></div>
      )}
    </>
  );
};

export default Video;
