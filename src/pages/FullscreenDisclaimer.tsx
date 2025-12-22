import { useState, useEffect } from "react";
import FullScreen from "@/components/FullScreen.tsx";

const FullscreenDisclaimer = () => {
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia("(orientation: portrait)").matches
  );

  useEffect(() => {
    const handleOrientationChange = (e: MediaQueryListEvent) => {
      setIsPortrait(e.matches);
    };

    const mediaQueryList = window.matchMedia("(orientation: portrait)");
    mediaQueryList.addListener(handleOrientationChange);

    return () => {
      mediaQueryList.removeListener(handleOrientationChange);
    };
  }, []);

  const goFullScreen = async () => {
    console.log("Go fullscreen");
    await document.documentElement.requestFullscreen();
  };

  const handleBannerClick = () => {
    void goFullScreen();
  };

  // Show disclaimer only if not in full-screen and in portrait mode
  if (!isPortrait) {
    return null;
  }

  return (
    <FullScreen onClose={() => "void"} hideCloseButton>
      <div
        className="flex h-full w-full flex-col items-center justify-center bg-gray-800 p-4 text-amber-50"
        onClick={handleBannerClick}
      >
        <div>Diese Seite funktioniert nur im Querformat.</div>
        <h2 className="mt-2 border border-amber-50 p-2 text-xl font-bold">
          Bitte drehen Sie ihr Gerät, um die Seite zu nutzen!
        </h2>
      </div>
    </FullScreen>
  );
};

export default FullscreenDisclaimer;
