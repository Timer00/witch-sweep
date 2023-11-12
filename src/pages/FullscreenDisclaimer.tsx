import { useState, useEffect } from 'react';
import FullScreen from "@/components/FullScreen.tsx";

const FullscreenDisclaimer = () => {
  const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);

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
    console.log('Go fullscreen');
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
    <FullScreen onClose={() => 'void'} hideCloseButton>
      <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-800 text-amber-50" onClick={handleBannerClick}>
        <div>This website only runs in landscape mode.</div>
        <h2 className="font-bold text-xl border border-amber-50 p-2 mt-2">Please rotate your device to show the app.</h2>
      </div>
    </FullScreen>
  );
};

export default FullscreenDisclaimer;
