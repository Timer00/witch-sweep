import React, { useState } from "react";
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
import useAspectRatio from "@/hooks/useAspectRatio.ts";

function isMobile () {
  let check = false;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

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
  const { width, height } = useAspectRatio(1920, 1080);

  const [showInfo, setShowInfo] = useState(false);
  const [showCoinSpend, setShowCoinSpend] = useState(false);
  const { addCoins, coins } = useCoins();
  const [page, setPage] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>("");
  const [helpType, setHelpType] = useState<HelpTypeInterface>(
    HelpTypeInterface.cleaning
  );
  const [timerMinutes, setTimerMinutes] = useState(0);

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
              { witch: Witch.hello , text: `Meine Zaubersprüche machen immer so einen Dreck! ... Oh, hi${playerName ? ` ${playerName}` : ""}!` },
              { witch: Witch.sad , text: "Ich muss unbedingt mein Zimmer putzen, willst du mir dabei helfen? Es tut immer gut, Gesellschaft zu haben! **Lass uns zusammen aufräumen und putzen!**" },
              { witch: Witch.talk , text: "**Wie lange wollen wir gemeinsam aufräumen und putzen?**" },
            ],
            [HelpTypeInterface.homework]: [
              { witch: Witch.hello , text: `Hi${playerName ? ` ${playerName}` : ""}! Schön dass du da bist!` },
              { witch: Witch.sad , text: "In der Schule haben wir heute einige neue Zaubersprüche gelernt…" },
              { witch: Witch.talk , text: "Jetzt muss ich einen Aufsatz über meinen Lieblingsspruch schreiben. Leiste mir doch **Gesellschaft beim Hausaufgaben machen!**" },
              { witch: Witch.talk , text: "**Wie lange wollen wir zusammen Hausaufgaben machen?**" },
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
              { witch: Witch.hello , text: "Super! Machen wir eine **Herausforderung** daraus: Ich wette mit dir, ich bin schneller fertig als du!" },
              { witch: timerMinutes < 20 ? Witch.coin : Witch.coins, text: `Wenn du fertig wirst, **bevor die Zeit ausläuft**, dann kriegst du **${timerMinutes < 20 ? "eine Münze" : "zwei Münzen"}** von mir! Sollte der Timer aber auslaufen, dann habe ich gewonnen!` },
            ],
            [HelpTypeInterface.homework]: [
              { witch: Witch.hello , text: "Alles klar! Ich habe aber eine **Herausforderung** für dich: Ich wette, ich kann viel länger an meinen Hausaufgaben sitzen als du." },
              { witch: timerMinutes < 20 ? Witch.coin : Witch.coins, text: `Wenn du so lange durchhältst, bis der Timer vorbei ist, dann bekommst du **${timerMinutes < 20 ? "eine Münze" : "zwei Münzen"}** von mir. Solltest du aber aufgeben, bevor die Zeit rum ist, dann habe ich gewonnen!` },
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
              { witch: Witch.hello , text: "Sehr gut gemacht! Ich kann nicht glauben, dass du mich geschlagen hast… Hier ist dein Preis, **du hast ihn verdient!**" },
            ],
            [HelpTypeInterface.homework]: [
              { witch: Witch.hello , text: "Sehr gut gemacht! Ich kann nicht glauben, dass du mich geschlagen hast… Hier ist dein Preis, **du hast ihn verdient!**" },
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
                text: `Danke, dass du mir Gesellschaft geleistet hast! Bis zum nächsten Mal${playerName ? `, ${playerName}` : ""}!`,
              },
            ],
            [HelpTypeInterface.homework]: [
              {
                witch: Witch.talk,
                text: `Danke, dass du mir Gesellschaft geleistet hast! Bis zum nächsten Mal${playerName ? `, ${playerName}` : ""}!`,
              },
            ],
          }[helpType] as Messages,
        },
      },
    ],
  };

  const currentConfiguration = pageConfigurations.pages[page];
  const PageToShow = currentConfiguration.page;

  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <div
        style={{ width, height }}
        className={`relative bg-black text-center`}
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/*// @ts-ignore*/}
        <PageToShow key={page} {...currentConfiguration.props} />
        <Coins
          pageIndex={page}
          amount={coins}
          onClick={() => setShowCoinSpend(true)}
        />
        <InfoButton pageIndex={page} onClick={() => setShowInfo(true)} />
      </div>
      {showInfo && <Info onClose={() => setShowInfo(false)} />}
      {showCoinSpend && <SpendCoins onClose={() => setShowCoinSpend(false)} />}
      {isMobile() && <FullscreenDisclaimer />}
    </div>
  );
};

export default App;
