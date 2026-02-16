import { type nextPage } from "@/App.tsx";
import PageContainer from "@/components/PageContainer.tsx";
import Button from "@/components/Button.tsx";
import { castleLoop, logo } from "@/assets";
import { useEffect, useRef, useState } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import Video from "@/components/Video.tsx";

export interface GameMenuProps {
  nextPage: nextPage;
  openStore: () => void;
  openInfo: () => void;
  openLegal: () => void;
  setPlayerName: (name: string) => void;
  setIsInHomeView: (isInHomeView: boolean) => void;
  resetToMenuRef?: React.MutableRefObject<(() => void) | null>;
  startButton: string;
}

type ViewType = "menu" | "home";

interface MenuViewProps {
  onStartClick: () => void;
  openStore: () => void;
  openInfo: () => void;
  openLegal: () => void;
}

const MenuView = ({
  onStartClick,
  openStore,
  openInfo,
  openLegal,
}: MenuViewProps) => {
  const menuItems = [
    { label: "Start", action: onStartClick },
    { label: "Vertrag", action: openStore },
    { label: "Anleitung", action: openInfo },
    { label: "Impressum", action: openLegal },
  ];

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6">
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
  );
};

interface HomeViewProps {
  nextPage: nextPage;
  setPlayerName: (name: string) => void;
  startButton: string;
  openInfo: () => void;
}

const HomeView = ({
  nextPage,
  setPlayerName,
  startButton,
  openInfo,
}: HomeViewProps) => {
  const [username, setUsername] = useState<string>(() => {
    const localName = localStorage.getItem("username");
    if (localName) return localName;
    else return "";
  });
  const [hasReadInfo, setHasReadInfo] = useState<boolean>(() => {
    const saved = localStorage.getItem("hasReadInfo");
    if (saved === "true") return true;
    return false;
  });

  const handleCheckboxChange = (checked: boolean) => {
    setHasReadInfo(checked);
    localStorage.setItem("hasReadInfo", checked.toString());
  };

  const handleStart = () => {
    setPlayerName(username);
    localStorage.setItem("username", username);
    localStorage.setItem("hasReadInfo", hasReadInfo.toString());
    nextPage();
  };

  return (
    <div className="mt-[2.5vh] flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <input
        value={username}
        onChange={({ target: { value } }) => setUsername(value)}
        className="border bg-transparent text-center text-xl"
        placeholder="Dein Name…"
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="info-checkbox"
          checked={hasReadInfo}
          onChange={(e) => handleCheckboxChange(e.target.checked)}
          className="h-4 w-4 cursor-pointer"
        />
        <label htmlFor="info-checkbox" className="cursor-pointer text-white">
          Ich habe die{" "}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              openInfo();
            }}
            className="underline"
          >
            Anleitung
          </button>{" "}
          gelesen
        </label>
      </div>
      <div className="group relative inline-block">
        <div
          className={
            username.length < 3 || !hasReadInfo ? "cursor-not-allowed" : ""
          }
        >
          <Button
            disabled={username.length < 3 || !hasReadInfo}
            onClick={handleStart}
          >
            {startButton}
          </Button>
        </div>
        {(username.length < 3 || !hasReadInfo) && (
          <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-3 py-2 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
            {!hasReadInfo
              ? "Bitte bestätige, dass du die Informationen gelesen hast"
              : username.length < 3
              ? "Bitte gib einen Namen mit mindestens 3 Zeichen ein"
              : ""}
            <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
          </div>
        )}
      </div>
    </div>
  );
};

const GameMenu = ({
  nextPage,
  openStore,
  openInfo,
  openLegal,
  setPlayerName,
  setIsInHomeView,
  resetToMenuRef,
  startButton,
}: GameMenuProps) => {
  const [currentView, setCurrentView] = useState<ViewType>("menu");
  const videoRef = useRef<HTMLVideoElement>(null);
  const { loading, switchVideo, videoProps, setLoop } = useVideo(videoRef);

  useEffect(() => {
    setLoop(true);
    switchVideo(castleLoop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsInHomeView(currentView === "home");
  }, [currentView, setIsInHomeView]);

  // Expose reset function via ref
  useEffect(() => {
    if (resetToMenuRef) {
      resetToMenuRef.current = () => {
        setCurrentView("menu");
      };
    }
    // Cleanup: clear ref when component unmounts
    return () => {
      if (resetToMenuRef) {
        resetToMenuRef.current = null;
      }
    };
  }, [resetToMenuRef]);

  const handleStartMenuClick = () => {
    setCurrentView("home");
  };

  return (
    <PageContainer>
      <Video videoRef={videoRef} videoProps={videoProps} loading={loading} />
      <div className="z-2 relative mt-[15vh] flex h-full flex-col lg:pt-24">
        <div className="flex flex-col text-white">
          <div className="gameTitle flex items-center justify-center">
            <img
              id={"gameTitle"}
              className="w-2/4 p-6"
              src={logo}
              alt="Hocus Focus"
            />
          </div>
          {currentView === "menu" ? (
            <MenuView
              onStartClick={handleStartMenuClick}
              openStore={openStore}
              openInfo={openInfo}
              openLegal={openLegal}
            />
          ) : (
            <HomeView
              nextPage={nextPage}
              setPlayerName={setPlayerName}
              startButton={startButton}
              openInfo={openInfo}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default GameMenu;
