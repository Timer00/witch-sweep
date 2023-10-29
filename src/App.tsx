import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Home from '@/pages/Home.tsx';
import Intro from '@/pages/Intro.tsx';
import HowLong from '@/pages/HowLong.tsx';
import TimerScreen from '@/pages/TimerScreen.tsx';
import AreYouReady from '@/pages/AreYouReady.tsx';
import WitchWon from '@/pages/WitchWon.tsx';
import YouWon from '@/pages/YouWon.tsx';
import { castleIntro, castleLoop, room } from "@/assets";

export interface PageProps {
  messages: string[];
  nextPage: nextPage;
}

export type setPage = React.Dispatch<React.SetStateAction<number>>;
export type setTimerMinutes = React.Dispatch<React.SetStateAction<number>>;
export type nextPage = () => void;

const App = () => {
  const [page, setPage] = useState<number>(0);
  const [timerMinutes, setTimerMinutes] = useState(0);

  function nextPage() {
    if (page < pageConfigurations.pages.length - 1) {
      setPage(page + 1);
    } else {
      setPage(0);
    }
  }

  // Need a system that conditionally shows the page only when the next video is finished.

  const pageConfigurations = {
    "witchName": "Anabella Declutter",
    "pages": [
      {
        "page": Home,
        props: {
          nextPage,
          "startButton": "Start!",
          "gameTitle": "Hexen Schloss",
        }
      },
      {
        "page": Intro,
        props: {
          nextPage,
          "messages": [
            "Meine Zaubersprüche machen immer so einen Dreck! ... Oh, hi!",
            "Du willst also aufräumen?! Ich wette ich kriege mein Hexenschloss viel schneller geputzt!",
            "Sag mir doch erstmal wie viel Zeit du glaubst fürs Aufräumen zu brauchen..."
          ]
        }
      },
      {
        video: [room],
        settings: {
          loop: true,
          showOnEnd: false
        },
        "page": HowLong,
        props: {
          nextPage,
          setTimerMinutes,
          "description": "The amount of time for the timer is chosen here."
        }
      },
      {
        "page": Intro,
        settings: {
          loop: true,
          showOnEnd: false
        },
        video: [room],
        props: {
          nextPage,
          "description": "Time mechanic explanation.",
          "messages": [
            "Aha... hier ist der Deal: wenn du es schaffst fertig zu sein, bevor die Zeit rum ist dann bekommst du eine Münze...",
            "aber sollte die Zeit rum rein, und ich bin schneller ... hehehe ... dann kriege ich die Münze!"
          ]
        }
      },
      {
        "page": AreYouReady,
        settings: {
          loop: true,
          showOnEnd: false
        },
        video: [room],
        props: {
          nextPage,
          "description": "Page asking if player is ready.",
          "messages": ["Bist du bereit?"],
          "goButton": "Los geht's!"
        }
      },
      {
        "page": TimerScreen,
        settings: {
          loop: true,
          showOnEnd: false
        },
        video: [room],
        props: {
          nextPage,
          setPage,
          timerMinutes,
          "description": "Page that shows the timer.",
          "doneButton": "Ich bin fertig!",
          "timerHeader": ""
        }
      },
      {
        "page": YouWon,
        settings: {
          loop: true,
          showOnEnd: false
        },
        video: [room],
        props: {
          nextPage: () => setPage(0),
          "restartButton": "Revanche!",
          "messages": [
            "Sehr sehr gut gemacht! Ich kann nicht glauben dass du mich geschlagen hast... hier! Nimm die Münze! Du hast sie verdient!",
            "Na? Traust du dich mich nochmal herauszufordern?"
          ]
        }
      },
      {
        "page": WitchWon,
        settings: {
          loop: true,
          showOnEnd: false
        },
        video: [room],
        props: {
          nextPage: () => setPage(0),
          "restartButton": "Revanche!",
          "messages": [
            "Oh nein, die Zeit ist um... hehehehe... gewonnen! Jetzt werde ich reich!",
            "Na? Traust du dich mich nochmal herauszufordern?"
          ]
        }
      }
    ]
  }
  const currentConfiguration= pageConfigurations.pages[page];
  const PageToShow = currentConfiguration.page;

  console.log(page);

  return (
    <div className="h-full w-full text-center bg-black">
      <PageToShow {...currentConfiguration.props}/>
    </div>
  );
}

export default App;
