import { type nextPage } from "@/App.tsx";
import PageContainer from "@/components/PageContainer.tsx";
import { castleLoop, logo } from "@/assets";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menuItems = [
    { label: "Start", action: nextPage },
    { label: "Laden", action: openStore },
    { label: "Info", action: openInfo },
    { label: "Impressum", action: openLegal },
  ];

  return (
    <PageContainer>
      <Video videoRef={videoRef} videoProps={videoProps} loading={loading} />
      <div className="z-2 relative lg:pt-36">
        <div className="flex flex-col text-white">
          <div className="gameTitle flex items-center justify-center">
            <img
              id={"gameTitle"}
              className="w-2/4 p-6"
              src={logo}
              alt="Hocus Focus"
            />
          </div>
          <div className="flex flex-col items-center gap-6">
            <ul className="flex flex-col items-center gap-6">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={item.action}
                    className="cursor-pointer text-2xl text-gray-300 transition-all duration-200 hover:scale-110 hover:animate-shake hover:text-white"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default GameMenu;
