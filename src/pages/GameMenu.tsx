import { type nextPage } from "@/App.tsx";
import PageContainer from "@/components/PageContainer.tsx";
import { castleLoop } from "@/assets";
import { useEffect, useRef } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import Video from "@/components/Video.tsx";

export interface GameMenuProps {
  nextPage: nextPage;
  openStore: () => void;
  openInfo: () => void;
  openLegal: () => void;
}

const GameMenu = ({
  nextPage,
  openStore,
  openInfo,
  openLegal,
}: GameMenuProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { loading, switchVideo, videoProps, setLoop } = useVideo(videoRef);

  useEffect(() => {
    setLoop(true);
    switchVideo(castleLoop);
  }, [setLoop, switchVideo]);

  const menuItems = [
    { label: "Start", action: nextPage },
    { label: "Laden", action: openStore },
    { label: "Info", action: openInfo },
    { label: "Impressum", action: openLegal },
  ];

  return (
    <PageContainer>
      <Video videoRef={videoRef} videoProps={videoProps} loading={loading} />
      <div className="z-2 relative flex h-full items-center justify-center">
        <ul className="flex flex-col items-center gap-6">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={item.action}
                className="cursor-pointer text-2xl text-gray-300 transition-all duration-200 hover:text-white hover:scale-110 hover:animate-shake"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </PageContainer>
  );
};

export default GameMenu;

