import { useState, useEffect } from 'react';
import FullScreen from "@/components/FullScreen.tsx";

const FullscreenDisclaimer = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const goFullScreen = async () => {
    // Assuming FullScreen component has a method to trigger full screen
    console.log('Go fullscreen');
    await document.documentElement.requestFullscreen();
    setIsFullScreen(true);
  };

  const handleBannerClick = () => {
    void goFullScreen();
  }

  if (isFullScreen) {
    return null;
  }

  return (
    <FullScreen onClose={() => 'void'} hideCloseButton>
      <div className="w-full h-full center flex-col p-4 bg-gray-800 text-amber-50" onClick={handleBannerClick}>
        <div>This website only runs in full-screen mode.</div>
        <h2 className="font-bold text-xl border-solid border-amber-50 border-2 p-2 mt-2">Click anywhere to go full screen</h2>
      </div>
    </FullScreen>

  );
};

export default FullscreenDisclaimer;
