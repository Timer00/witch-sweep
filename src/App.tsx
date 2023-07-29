import React, { useState } from 'react';
import Home from '@/pages/Home.tsx';
import bg from '@/assets/images/room.png';
import Intro from '@/pages/Intro.tsx';
import HowLong from '@/pages/HowLong.tsx';
import TimerScreen from '@/pages/TimerScreen.tsx';
import AreYouReady from '@/pages/AreYouReady.tsx';
import WitchWon from '@/pages/WitchWon.tsx';
import YouWon from '@/pages/YouWon.tsx';

import content from '@/assets/content.json';
export interface Page {
  messages?: string[];
  nextPage: nextPage;
}

export type setPage = React.Dispatch<React.SetStateAction<number>>;
export type setTimerMinutes = React.Dispatch<React.SetStateAction<number>>;
export type nextPage = () => void;

const App = () => {
  const [page, setPage] = useState<number>(0);
  const [timerMinutes, setTimerMinutes] = useState(0);

  const pages = [
    <Home
      startButton={content.pages[0].startButton || "Default start button"}
      gameTitle={content.gameTitle}
      key={0}
      nextPage={nextPage}
    />,
    <Intro messages={content.pages[1].messages} key={1} nextPage={nextPage} />,
    <HowLong key={2} nextPage={nextPage} setTimerMinutes={setTimerMinutes} />,
    <Intro messages={content.pages[3].messages} key={3} nextPage={nextPage} />,
    <AreYouReady
      key={4}
      messages={content.pages[4].messages || ['default message 1','default message 2']}
      nextPage={nextPage}
      goButton={content.pages[4].goButton || "Default go button"}
    />,
    <TimerScreen
      key={5}
      nextPage={nextPage}
      setPage={setPage}
      timerMinutes={timerMinutes}
      doneButton={content.pages[5].doneButton || "Default done button"}
      timerHeader={content.pages[5].timerHeader || "Default timer header"}
    />,
    <YouWon
      messages={content.pages[6].messages}
      restartButton={content.pages[6].restartButton || "Default restart button"}
      key={6}
      nextPage={() => setPage(0)}
    />,
    <WitchWon
      messages={content.pages[7].messages}
      restartButton={content.pages[7].restartButton || "Default restart button"}
      key={7}
      nextPage={() => setPage(0)}
    />,
  ];

  function nextPage() {
    if (page < pages.length - 1) {
      setPage(page + 1);
    } else {
      setPage(0);
    }
  }

  return (
    <div className="h-full w-full text-center">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src={bg}
          alt="witches room"
        />
      </div>

      <div className="relative z-10 h-full">{pages[page]}</div>
    </div>
  );
};

export default App;
