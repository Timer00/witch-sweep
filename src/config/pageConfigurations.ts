import type React from "react";
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
import StoryChapterPicker from "@/pages/StoryChapterPicker.tsx";
import StoryReader from "@/pages/StoryReader.tsx";
import { coinsForMinutes, coinLabel } from "@/utils/coinReward.ts";

export interface PageConfigurationDependencies {
  nextPage: nextPage;
  setPage: setPage;
  addCoins: (amount: number) => void;
  openStore: () => void;
  openInfo: () => void;
  openLegal: () => void;
  setIsInHomeView: (isInHomeView: boolean) => void;
  resetGameMenuRef?: React.MutableRefObject<(() => void) | null>;
}

function createPageConfigurations({
  nextPage,
  setPage,
  addCoins,
  openStore,
  openInfo,
  openLegal,
  setIsInHomeView,
  resetGameMenuRef,
  playerName,
  helpType,
  timerMinutes,
  setPlayerName,
  setHelpType,
  setTimerMinutes,
  storyChapter,
  setStoryChapter,
}: PageConfigurationDependencies & {
  playerName: string;
  helpType: HelpTypeInterface;
  timerMinutes: number;
  setPlayerName: (name: string) => void;
  setHelpType: (type: HelpTypeInterface) => void;
  setTimerMinutes: (minutes: number) => void;
  storyChapter: number;
  setStoryChapter: (chapter: number) => void;
}) {
  // The witch's promise must match the real reward: one coin per started
  // 10 minutes. She holds one coin in the picture for a 1-coin reward,
  // several coins for anything more.
  const rewardCount = coinsForMinutes(timerMinutes);
  const rewardWitch = rewardCount <= 1 ? Witch.coin : Witch.coins;
  const rewardLabel = coinLabel(rewardCount);

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
          setIsInHomeView,
          resetToMenuRef: resetGameMenuRef,
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
          extraOptions: [
            {
              label: "Geschichte lesen: \"Eine verhexte Woche\"",
              onSelect: () => setPage(10),
            },
          ],
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
                witch: rewardWitch,
                text: `Wenn du fertig wirst, **bevor die Zeit ausläuft**, dann kriegst du **${rewardLabel}** von mir! Sollte der Timer aber auslaufen, dann habe ich gewonnen!`,
              },
            ],
            [HelpTypeInterface.homework]: [
              {
                witch: Witch.hello,
                text: "Alles klar! Ich habe aber eine **Herausforderung** für dich: Ich wette, ich kann viel länger an meinen Hausaufgaben sitzen als du.",
              },
              {
                witch: rewardWitch,
                text: `Wenn du so lange durchhältst, bis der Timer vorbei ist, dann bekommst du **${rewardLabel}** von mir. Solltest du aber aufgeben, bevor die Zeit rum ist, dann habe ich gewonnen!`,
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
              { witch: rewardWitch, text: `` },
            ],
            [HelpTypeInterface.homework]: [
              { witch: rewardWitch, text: `` },
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
      // Page 10: Story chapter picker
      {
        page: StoryChapterPicker,
        props: {
          onSelectChapter: (index: number) => {
            setStoryChapter(index);
            setPage(11);
          },
          onBack: () => setPage(1),
          onContinue: (chapterIndex: number) => {
            setStoryChapter(chapterIndex);
            setPage(11);
          },
        },
      },
      // Page 11: Story reader
      {
        page: StoryReader,
        props: {
          chapterIndex: storyChapter,
          onBackToContents: () => setPage(10),
          onGoToChapter: (index: number) => {
            setStoryChapter(index);
          },
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
  openLegal: () => void,
  setIsInHomeView: (isInHomeView: boolean) => void,
  resetGameMenuRef?: React.MutableRefObject<(() => void) | null>
) {
  const [playerName, setPlayerName] = useState<string>("");
  const [helpType, setHelpType] = useState<HelpTypeInterface>(
    HelpTypeInterface.cleaning
  );
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [storyChapter, setStoryChapter] = useState(0);
  const pageConfigurationsRef = useRef<ReturnType<
    typeof createPageConfigurations
  > | null>(null);

  const nextPage = useCallback(() => {
    setPage((currentPage) => {
      const pageCount = pageConfigurationsRef.current?.pages.length ?? 11;
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
      setIsInHomeView,
      resetGameMenuRef,
      playerName,
      helpType,
      timerMinutes,
      setPlayerName,
      setHelpType,
      setTimerMinutes,
      storyChapter,
      setStoryChapter,
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
    setIsInHomeView,
    resetGameMenuRef,
    playerName,
    helpType,
    timerMinutes,
    setPlayerName,
    setHelpType,
    setTimerMinutes,
    storyChapter,
    setStoryChapter,
  ]);

  return {
    pageConfigurations,
    playerName,
    helpType,
    timerMinutes,
  };
}
