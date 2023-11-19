import React, { useEffect, useState } from "react";
import Home, { type HomeProps } from "@/pages/Home.tsx";
import Intro from "@/pages/Intro.tsx";
import HowLong from "@/pages/HowLong.tsx";
import TimerScreen, { type TimerScreenProps } from "@/pages/TimerScreen.tsx";
import WhatDoYouNeedHelpWith from "@/pages/WhatDoYouNeedHelpWith.tsx";
import Coins from "@/components/Coins.tsx";
import useCoins from "@/hooks/useCoins.ts";
import Info, { InfoButton } from "@/pages/Info.tsx";
import SpendCoins from "@/pages/SpendCoins.tsx";
import FullscreenDisclaimer from "@/pages/FullscreenDisclaimer.tsx";
import Generic from "@/pages/Generic.tsx";

export enum Witch {
  hello = "hello",
  sad = "sad",
  talk = "talk",
  coin = "coin1",
  coins = "coin2",
}

export type Messages = { witch: Witch; text: string }[];
export interface PageProps {
  messages: Messages;
  nextPage: nextPage;
  buttonText?: string;
  hideNextButton?: boolean;
}

export type setPage = React.Dispatch<React.SetStateAction<number>>;
export type setTimerMinutes = React.Dispatch<React.SetStateAction<number>>;
export type nextPage = () => void;

export enum HelpTypeInterface {
  cleaning = "Aufräumen",
  homework = "Hausaufgaben",
}

const App = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showCoinSpend, setShowCoinSpend] = useState(false);
  const { addCoins, coins } = useCoins();
  const [page, setPage] = useState<number>(0);
  const [, setPlayerName] = useState<string>("");
  const [helpType, setHelpType] = useState<HelpTypeInterface>(
    HelpTypeInterface.cleaning
  );
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
          options: [
            HelpTypeInterface.cleaning,
            HelpTypeInterface.homework,
          ] as HelpTypeInterface[],
        },
      },
      {
        page: Intro,
        props: {
          nextPage,
          messages: {
            [HelpTypeInterface.cleaning]: [
              { witch: Witch.hello , text: "Meine Zaubersprüche machen immer so einen Dreck! ... Oh, hi!" },
              { witch: Witch.sad , text: "Ich muss unbedingt mein Zimmer putzen, willst du mir dabei helfen? Es tut immer gut, Gesellschaft zu haben! *Ich putze, du räumst auf!*" },
              { witch: Witch.talk , text: "*Wie lange wollen wir denn gemeinsam aufräumen und putzen?*" },
            ],
            [HelpTypeInterface.homework]: [
              { witch: Witch.hello , text: "Hi! Schön dass du da bist!" },
              { witch: Witch.sad , text: "In der Schule haben wir heute ganz viele neue Zaubersprüche gelernt…" },
              { witch: Witch.talk , text: "Jetzt muss ich einen Aufsatz über meinen Lieblingsspruch schreiben. Leiste mir doch *Gesellschaft beim Hausaufgaben machen!*" },
              { witch: Witch.talk , text: "*Wie lange wollen wir zusammen Hausaufgaben machen?*" },
            ],
          }[helpType] as Messages,
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
        page: Generic,
        props: {
          nextPage,
          description: "Time mechanic explanation.",
          messages: {
            [HelpTypeInterface.cleaning]: [
              { witch: Witch.hello , text: "Super! Machen wir eine *Herausforderung* daraus: Ich wette mit dir, ich bin schneller fertig als du!" },
              { witch: timerMinutes < 20 ? Witch.coin : Witch.coins, text: `Wenn du fertig wirst, *bevor die Zeit ausläuft*, dann kriegst du *${timerMinutes < 20 ? "eine Münze" : "zwei Münzen"}* von mir! Sollte der Timer aber auslaufen, dann bin ich vor dir fertig mit dem Putzen und ich habe gewonnen!` },
            ],
            [HelpTypeInterface.homework]: [
              { witch: Witch.hello , text: "Alles klar! Ich habe aber eine *Herausforderung* für dich: Ich wette, ich kann viel länger an meinen Hausaufgaben sitzen als du." },
              { witch: timerMinutes < 20 ? Witch.coin : Witch.coins, text: `Wenn du so lange durchhältst, bis der Timer vorbei ist, dann bekommst du *${timerMinutes < 20 ? "eine Münze" : "zwei Münzen"}* von mir. Solltest du aber aufgeben, bevor die Zeit rum ist, dann habe ich gewonnen!` },
            ],
          }[helpType] as Messages,
        },
      },
      {
        page: Generic,
        props: {
          nextPage,
          description: "Page asking if player is ready.",
          messages: {
            [HelpTypeInterface.cleaning]: [
              { witch: timerMinutes < 20 ? Witch.coin : Witch.coins, text: `` },
            ],
            [HelpTypeInterface.homework]: [
              { witch: timerMinutes < 20 ? Witch.coin : Witch.coins, text: `` },
            ],
          }[helpType] as Messages,
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
              addCoins(Math.floor(time / 10));
              setPage(7);
            },
            timerHeader: "",
          } as TimerScreenProps,
          [HelpTypeInterface.homework]: {
            nextPage,
            timerMinutes,
            helpType: helpType,
            doneButton: "Aufgeben",
            timerHeader: "",
            onTimeOver: (time: number) => {
              addCoins(Math.floor(time / 10));
              setPage(7);
            },
            onClickButton: () => {
              setPage(8);
            },
          } as TimerScreenProps,
        }[helpType],
      },
      {
        page: Generic,
        props: {
          nextPage: () => setPage(9),
          messages: {
            [HelpTypeInterface.cleaning]: [
              { witch: Witch.hello , text: "Sehr gut gemacht! Ich kann nicht glauben, dass du mich geschlagen hast… hier! Nimm deinen Preis, *du hast es verdient!*" },
            ],
            [HelpTypeInterface.homework]: [
              { witch: Witch.hello , text: "Sehr gut gemacht! Ich kann nicht glauben, dass du mich geschlagen hast… hier! Nimm deinen Preis, *du hast es verdient!*" },
            ],
          }[helpType] as Messages,
        },
      },
      {
        page: Generic,
        props: {
          nextPage: () => setPage(9),
          messages: {
            [HelpTypeInterface.cleaning]: [
              { witch: Witch.sad , text: "Schade! Jetzt bin ich vor dir fertig geworden… Naja, nächstes mal kann du mich bestimmt schlagen!" },
            ],
            [HelpTypeInterface.homework]: [
              { witch: Witch.sad , text: "Schade! Jetzt bin ich vor dir fertig geworden… Naja, nächstes mal kann du mich bestimmt schlagen!" },
            ],
          }[helpType] as Messages,
        },
      },
      {
        page: Generic,
        props: {
          nextPage: () => setPage(0),
          hideNextButton: true,
          buttonText: "Zurück!",
          messages: {
            [HelpTypeInterface.cleaning]: [
              { witch: Witch.talk , text: "Danke, dass du mir Gesellschaft geleistet hast! Bis zum nächsten Mal!" },
            ],
            [HelpTypeInterface.homework]: [
              { witch: Witch.talk , text: "Danke, dass du mir Gesellschaft geleistet hast! Bis zum nächsten Mal!" },
            ],
          }[helpType] as Messages,
        },
      },
    ],
  };

  const currentConfiguration = pageConfigurations.pages[page];
  const PageToShow = currentConfiguration.page;

  console.log(page, pageConfigurations);

  useEffect(() => console.log(showInfo), [showInfo]);

  return (
    <div className="h-full w-full bg-black text-center">
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*// @ts-ignore*/}
      <PageToShow key={page} {...currentConfiguration.props} />
      <Coins
        pageIndex={page}
        amount={coins}
        onClick={() => setShowCoinSpend(true)}
      />
      <InfoButton pageIndex={page} onClick={() => setShowInfo(true)} />
      {showInfo && <Info onClose={() => setShowInfo(false)} />}
      {showCoinSpend && <SpendCoins onClose={() => setShowCoinSpend(false)} />}
      <FullscreenDisclaimer />
    </div>
  );
};

export default App;
