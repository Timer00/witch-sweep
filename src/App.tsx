import React, { useEffect, useState } from "react";
import Home, { type HomeProps } from "@/pages/Home.tsx";
import Intro from "@/pages/Intro.tsx";
import HowLong from "@/pages/HowLong.tsx";
import TimerScreen, { type TimerScreenProps } from "@/pages/TimerScreen.tsx";
import AreYouReady from "@/pages/AreYouReady.tsx";
import WitchWon from "@/pages/WitchWon.tsx";
import YouWon from "@/pages/YouWon.tsx";
import WhatDoYouNeedHelpWith from "@/pages/WhatDoYouNeedHelpWith.tsx";
import TimeMechanicExplanation from "@/pages/TimeMechanicExplanation.tsx";
import Coins from "@/components/Coins.tsx";
import useCoins from "@/hooks/useCoins.tsx";
import Info, { InfoButton } from "@/pages/Info.tsx";
import SpendCoins from "@/pages/SpendCoins.tsx";
import FullscreenDisclaimer from "@/pages/FullscreenDisclaimer.tsx";

export interface PageProps {
  messages: string[];
  nextPage: nextPage;
}

export type setPage = React.Dispatch<React.SetStateAction<number>>;
export type setTimerMinutes = React.Dispatch<React.SetStateAction<number>>;
export type nextPage = () => void;

export enum HelpTypeInterface {
  cleaning = 'Aufräumen',
  homework = 'Hausaufgaben'
}

const App = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showCoinSpend, setShowCoinSpend] = useState(false);
  const { addCoins, coins } = useCoins();
  const [page, setPage] = useState<number>(0);
  const [, setPlayerName] = useState<string>("");
  const [helpType, setHelpType] = useState<HelpTypeInterface>(HelpTypeInterface.cleaning);
  const [timerMinutes, setTimerMinutes] = useState(0);

  // useEffect(() => {
  //   void screen.orientation.lock("landscape");
  // }, []);

  function nextPage() {
    if (page < pageConfigurations.pages.length - 1) {
      setPage(page + 1);
    } else {
      setPage(0);
    }
  }

  const pageConfigurations = {
    witchName: "Anabella Declutter",
    pages: [
      {
        page: Home,
        props: {
          nextPage,
          setPlayerName,
          startButton: "Start!",
        } as HomeProps,
      },
      {
        page: WhatDoYouNeedHelpWith,
        props: {
          nextPage,
          setHelpType,
          question: "Was möchtest du machen?",
          options: [HelpTypeInterface.cleaning, HelpTypeInterface.homework] as HelpTypeInterface[],
        },
      },
      {
        page: Intro,
        props: {
          nextPage,
          messages: {
            [HelpTypeInterface.cleaning]: [
              "Meine Zaubersprüche machen immer so einen Dreck! ... Oh, hi!",
              "Du willst also aufräumen?! Ich wette ich kriege mein Hexenschloss viel schneller geputzt!",
              "Sag mir doch erstmal wie viel Zeit du glaubst fürs Aufräumen zu brauchen...",
            ],
            [HelpTypeInterface.homework]: [
              "Hello hello hello, dis homewok!",
              "Home work, home wok, woke home!",
              "Home wok, wok is nice, gibs",
            ],
          }[helpType],
        },
      },
      {
        page: HowLong,
        props: {
          nextPage,
          setTimerMinutes,
          description: "The amount of time for the timer is chosen here.",
        },
      },
      {
        page: TimeMechanicExplanation,
        props: {
          nextPage,
          description: "Time mechanic explanation.",
          messages: [
            "Aha... hier ist der Deal: wenn du es schaffst fertig zu sein, bevor die Zeit rum ist dann bekommst du eine Münze...",
            "aber sollte die Zeit rum rein, und ich bin schneller ... hehehe ... dann kriege ich die Münze!",
          ],
        },
      },
      {
        page: AreYouReady,
        props: {
          nextPage,
          hideNextButton: true,
          description: "Page asking if player is ready.",
          messages: ["Bist du bereit?"],
          buttonText: "Los geht's!",
        },
      },
      {
        page: TimerScreen,
        description: "Page that shows the timer.",
        props: {
          [HelpTypeInterface.cleaning]: {
            nextPage,
            timerMinutes,
            helpType: helpType,
            doneButton: "Fertig!",
            onTimeOver: () => {
              setPage(8);
            },
            onClickButton: (time: number) => {
              addCoins(Math.ceil(time / 10));
              setPage(7);
            },
            timerHeader: "",
          } as TimerScreenProps,
          [HelpTypeInterface.homework]: {
            nextPage,
            timerMinutes,
            helpType: helpType,
            doneButton: "Give up :(",
            timerHeader: "",
            onTimeOver: (time: number) => {
              addCoins(Math.ceil(time / 10));
              setPage(7);
            },
            onClickButton: () => {
              setPage(8);
            },
          } as TimerScreenProps,
        }[helpType],
      },
      {
        page: YouWon,
        props: {
          nextPage: () => setPage(0),
          buttonText: "Revanche!",
          messages: [
            "Sehr sehr gut gemacht! Ich kann nicht glauben dass du mich geschlagen hast... hier! Nimm die Münze! Du hast sie verdient!",
            "Na? Traust du dich mich nochmal herauszufordern?",
          ],
        },
      },
      {
        page: WitchWon,
        props: {
          nextPage: () => setPage(0),
          buttonText: "Revanche!",
          messages: [
            "Oh nein, die Zeit ist um... hehehehe... gewonnen! Jetzt werde ich reich!",
            "Na? Traust du dich mich nochmal herauszufordern?",
          ],
        },
      },
    ],
  };

  const currentConfiguration = pageConfigurations.pages[page];
  const PageToShow = currentConfiguration.page;

  console.log(page);

  useEffect(() => console.log(showInfo), [showInfo]);

  return (
    <div className="h-full w-full bg-black text-center">
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*// @ts-ignore*/}
      <PageToShow {...currentConfiguration.props} />
      <Coins pageIndex={page} amount={coins} onClick={() => setShowCoinSpend(true)} />
      <InfoButton pageIndex={page} onClick={() => setShowInfo(true)} />
      {showInfo && <Info onClose={()=> setShowInfo(false)} />}
      {showCoinSpend && <SpendCoins onClose={()=> setShowCoinSpend(false)} />}
      <FullscreenDisclaimer/>
    </div>
  );
};

export default App;
