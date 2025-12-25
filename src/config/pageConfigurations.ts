import { useState, useMemo, useCallback, useRef } from "react";
import GameMenu, { type GameMenuProps } from "@/pages/GameMenu.tsx";
import Intro from "@/pages/Intro.tsx";
import HowLong from "@/pages/HowLong.tsx";
import TimerScreen, { type TimerScreenProps } from "@/pages/TimerScreen.tsx";
import WhatDoYouNeedHelpWith from "@/pages/WhatDoYouNeedHelpWith.tsx";
import Generic from "@/pages/Generic.tsx";
import {
  Witch,
  HelpTypeInterface,
  type Messages,
  type nextPage,
  type setPage,
} from "@/App.tsx";

export interface PageConfigurationDependencies {
  nextPage: nextPage;
  setPage: setPage;
  addCoins: (amount: number) => void;
  openStore: () => void;
  openInfo: () => void;
  openLegal: () => void;
}

function createPageConfigurations({
  nextPage,
  setPage,
  addCoins,
  openStore,
  openInfo,
  openLegal,
  playerName,
  helpType,
  timerMinutes,
  setPlayerName,
  setHelpType,
  setTimerMinutes,
}: PageConfigurationDependencies & {
  playerName: string;
  helpType: HelpTypeInterface;
  timerMinutes: number;
  setPlayerName: (name: string) => void;
  setHelpType: (type: HelpTypeInterface) => void;
  setTimerMinutes: (minutes: number) => void;
}) {
  return {
    witchName: "Anabella Declutter",
    pages: [
      {
        page: GameMenu,
        props: {
          nextPage,
          openStore,
          openInfo,
          openLegal,
          setPlayerName,
          startButton: "Start!",
        } as GameMenuProps,
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
              {
                witch: Witch.hello,
                text: `Meine Zaubersprüche machen immer so einen Dreck! ... Oh, hi${
                  playerName ? ` ${playerName}` : ""
                }!`,
              },
              {
                witch: Witch.sad,
                text: "Ich muss unbedingt mein Zimmer putzen, willst du mir dabei helfen? Es tut immer gut, Gesellschaft zu haben! **Lass uns zusammen aufräumen und putzen!**",
              },
              {
                witch: Witch.talk,
                text: "**Wie lange wollen wir gemeinsam aufräumen und putzen?**",
              },
            ],
            [HelpTypeInterface.homework]: [
              {
                witch: Witch.hello,
                text: `Hi${
                  playerName ? ` ${playerName}` : ""
                }! Schön dass du da bist!`,
              },
              {
                witch: Witch.sad,
                text: "In der Schule haben wir heute einige neue Zaubersprüche gelernt…",
              },
              {
                witch: Witch.talk,
                text: "Jetzt muss ich einen Aufsatz über meinen Lieblingsspruch schreiben. Leiste mir doch **Gesellschaft beim Hausaufgaben machen!**",
              },
              {
                witch: Witch.talk,
                text: "**Wie lange wollen wir zusammen Hausaufgaben machen?**",
              },
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
              {
                witch: Witch.hello,
                text: "Super! Machen wir eine **Herausforderung** daraus: Ich wette mit dir, ich bin schneller fertig als du!",
              },
              {
                witch: timerMinutes < 20 ? Witch.coin : Witch.coins,
                text: `Wenn du fertig wirst, **bevor die Zeit ausläuft**, dann kriegst du **${
                  timerMinutes < 20 ? "eine Münze" : "zwei Münzen"
                }** von mir! Sollte der Timer aber auslaufen, dann habe ich gewonnen!`,
              },
            ],
            [HelpTypeInterface.homework]: [
              {
                witch: Witch.hello,
                text: "Alles klar! Ich habe aber eine **Herausforderung** für dich: Ich wette, ich kann viel länger an meinen Hausaufgaben sitzen als du.",
              },
              {
                witch: timerMinutes < 20 ? Witch.coin : Witch.coins,
                text: `Wenn du so lange durchhältst, bis der Timer vorbei ist, dann bekommst du **${
                  timerMinutes < 20 ? "eine Münze" : "zwei Münzen"
                }** von mir. Solltest du aber aufgeben, bevor die Zeit rum ist, dann habe ich gewonnen!`,
              },
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
              {
                witch: Witch.hello,
                text: "Sehr gut gemacht! Ich kann nicht glauben, dass du mich geschlagen hast… Hier ist dein Preis, **du hast ihn verdient!**",
              },
            ],
            [HelpTypeInterface.homework]: [
              {
                witch: Witch.hello,
                text: "Sehr gut gemacht! Ich kann nicht glauben, dass du mich geschlagen hast… Hier ist dein Preis, **du hast ihn verdient!**",
              },
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
              {
                witch: Witch.sad,
                text: "Schade! Jetzt habe ich gewonnen… Naja, nächstes Mal kann du mich bestimmt schlagen!",
              },
            ],
            [HelpTypeInterface.homework]: [
              {
                witch: Witch.sad,
                text: "Schade! Jetzt habe ich gewonnen… Naja, nächstes Mal kann du mich bestimmt schlagen!",
              },
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
              {
                witch: Witch.talk,
                text: `Danke, dass du mir Gesellschaft geleistet hast! Bis zum nächsten Mal${
                  playerName ? `, ${playerName}` : ""
                }!`,
              },
            ],
            [HelpTypeInterface.homework]: [
              {
                witch: Witch.talk,
                text: `Danke, dass du mir Gesellschaft geleistet hast! Bis zum nächsten Mal${
                  playerName ? `, ${playerName}` : ""
                }!`,
              },
            ],
          }[helpType] as Messages,
        },
      },
    ],
  };
}

export function useGameState(
  setPage: setPage,
  addCoins: (amount: number) => void,
  openStore: () => void,
  openInfo: () => void,
  openLegal: () => void
) {
  const [playerName, setPlayerName] = useState<string>("");
  const [helpType, setHelpType] = useState<HelpTypeInterface>(
    HelpTypeInterface.cleaning
  );
  const [timerMinutes, setTimerMinutes] = useState(0);
  const pageConfigurationsRef = useRef<ReturnType<
    typeof createPageConfigurations
  > | null>(null);

  const nextPage = useCallback(() => {
    setPage((currentPage) => {
      const pageCount = pageConfigurationsRef.current?.pages.length ?? 10;
      if (currentPage < pageCount - 1) {
        return currentPage + 1;
      } else {
        return 0;
      }
    });
  }, [setPage]);

  const pageConfigurations = useMemo(() => {
    const config = createPageConfigurations({
      nextPage,
      setPage,
      addCoins,
      openStore,
      openInfo,
      openLegal,
      playerName,
      helpType,
      timerMinutes,
      setPlayerName,
      setHelpType,
      setTimerMinutes,
    });
    pageConfigurationsRef.current = config;
    return config;
  }, [
    nextPage,
    setPage,
    addCoins,
    openStore,
    openInfo,
    openLegal,
    playerName,
    helpType,
    timerMinutes,
    setPlayerName,
    setHelpType,
    setTimerMinutes,
  ]);

  return {
    pageConfigurations,
    playerName,
    helpType,
    timerMinutes,
  };
}
