import { type PageProps } from "@/App.tsx";
import Button from "@/components/Button.tsx";
import PageContainer from "@/components/PageContainer.tsx";
import { castleLoop, logo } from "@/assets";
import { useEffect, useRef, useState } from "react";
import { useVideo } from "@/hooks/useVideo.ts";
import Video from "@/components/Video.tsx";

export interface HomeProps extends Omit<PageProps, "messages"> {
  startButton: string;
  setPlayerName: (name: string) => void;
  openInfo: () => void;
}

const Home = ({
  nextPage,
  startButton,
  setPlayerName,
  openInfo,
}: HomeProps) => {
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const { loading, switchVideo, videoProps, setLoop } = useVideo(videoRef);

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

  useEffect(() => {
    setLoop(true);
    switchVideo(castleLoop);
  }, [videoRef]);

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
              <label
                htmlFor="info-checkbox"
                className="cursor-pointer text-white"
              >
                Ich habe{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    openInfo();
                  }}
                  className="underline"
                >
                  "Wie nutze ich HocusFocus ?"
                </button>{" "}
                gelesen
              </label>
            </div>
            <div className="group relative inline-block">
              <div
                className={
                  username.length < 3 || !hasReadInfo
                    ? "cursor-not-allowed"
                    : ""
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
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;
