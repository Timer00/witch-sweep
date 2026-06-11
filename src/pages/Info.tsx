import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import FullScreen from "@/components/FullScreen.tsx";
import { InfoIcon } from "@/assets/icons/InfoIcon.tsx";

const FAQ_HASH_PREFIX = "faq-";
const FAQ_SLUGS = [
  "wozu-hocusfocus",
  "muenzen",
  "belohnen",
  "wann-belohnen",
  "meine-rolle",
  "aufgabe-und-zeit",
  "verlieren",
  "zu-beachten",
] as const;

interface InfoButtonProps {
  pageIndex: number;
  onClick: () => void;
}

export const InfoButton = ({ pageIndex, onClick }: InfoButtonProps) => {
  if (pageIndex === 0) {
    return null;
  }

  return (
    <button onClick={onClick} className="z-2 absolute left-32 top-[-16px] m-4">
      <div className="flex items-center space-x-1 p-2 text-white underline underline-offset-[5px]">
        {pageIndex === null && (
          <span className="text-2xs font-semibold text-white">
            {"Wie nutze ich HocusFocus? "}
          </span>
        )}
        <span className="text-lg font-semibold text-white">
          <InfoIcon />
        </span>
      </div>
    </button>
  );
};

interface CollapseProps {
  question: string;
  answer: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  id: string;
}

const Collapse = ({
  question,
  answer,
  isOpen,
  onToggle,
  id,
}: CollapseProps) => {
  return (
    <div
      id={id}
      className="overflow-hidden rounded-xl border border-amber-200 bg-white/70 shadow-sm"
    >
      <button
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-amber-950 transition-colors hover:bg-amber-100/60"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-amber-600 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div
          className={`overflow-hidden transition-[visibility] duration-300 ${
            isOpen ? "visible" : "invisible"
          }`}
          aria-hidden={!isOpen}
        >
          <div className="space-y-3 border-t border-amber-200/70 px-5 pb-5 pt-4 leading-relaxed text-amber-950/90">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

const List = ({ children }: { children: ReactNode }) => (
  <ul className="list-disc space-y-1.5 pl-5 marker:text-amber-500">
    {children}
  </ul>
);

interface FaqItem {
  question: string;
  answer: ReactNode;
  slug: string;
}

const getFaqs = (onNavigateToContract?: () => void): FaqItem[] => [
  {
    slug: "wozu-hocusfocus",
    question: "Wozu nutze ich „HocusFocus“?",
    answer: (
      <>
        <p>
          Ihr Kind tritt bei Hausaufgaben und Aufräumen spielerisch gegen die
          Hexe an:
        </p>
        <List>
          <li>
            <strong>Aufräumen:</strong> schneller fertig sein, als die Zeit
            abläuft.
          </li>
          <li>
            <strong>Hausaufgaben:</strong> bis zum Ende der Zeit durchhalten.
          </li>
        </List>
        <p>
          Gewinnt Ihr Kind, gibt es als Belohnung Münzen. Je länger die Zeit,
          desto mehr. Verliert es, passiert nichts, es entstehen keine
          Verluste.
        </p>
        <p>
          Zusätzlich kann Ihr Kind eine Geschichte lesen, die verschiedene
          ADHS-bezogene Themen beinhaltet, und somit ein wenig mehr über seine
          Diagnose lernen.
        </p>
      </>
    ),
  },
  {
    slug: "muenzen",
    question: "Was sind die Münzen?",
    answer: (
      <>
        <p>
          Die Münzen sind kurzfristige Belohnungen für Ihr Kind, die es
          motivieren sollen, seine Aufgaben zu erledigen. So verknüpft es die
          Erfüllung von Aufgaben mit einem positiven Gefühl.
        </p>
        <p>
          Die Münzen stellen aber auch ein Punktesystem dar: Ihr Kind sammelt
          sie und tauscht sie langfristig bei Ihnen gegen echte Belohnungen
          ein.
        </p>
        <p>
          Verdiente Münzen sollten nie weggenommen werden, auch nicht als
          Strafe. Sonst verliert Ihr Kind das Vertrauen in das ganze System.
        </p>
      </>
    ),
  },
  {
    slug: "belohnen",
    question: "Wie belohne ich mein Kind?",
    answer: (
      <>
        <p>
          Erstellen Sie mit Ihrem Kind einen{" "}
          {onNavigateToContract ? (
            <button
              type="button"
              onClick={onNavigateToContract}
              className="cursor-pointer font-semibold underline underline-offset-2 hover:no-underline"
            >
              Vertrag
            </button>
          ) : (
            "Vertrag"
          )}
          , welcher festlegt, welche Belohnung es für wie viele Münzen gibt.
          Lassen Sie Ihr Kind mit aussuchen. Einige Beispiele sind hier
          aufgelistet:
        </p>
        <List>
          <li>
            <strong>Wenige Münzen:</strong> Sticker, 15 Minuten
            Extra-Spielzeit
          </li>
          <li>
            <strong>Viele Münzen:</strong> Zoobesuch, Kino, die nächste
            Familienaktivität aussuchen
          </li>
          <li>
            Belohnungen sind immer etwas Zusätzliches, nichts, was Ihr Kind
            ohnehin bekommt oder braucht
          </li>
          <li>
            Achten Sie darauf, dass die Belohnung nicht immer nur materieller
            Natur ist
          </li>
          <li>
            Belohnung mit Süßigkeiten nur in Maßen, um ungesunde Gewohnheiten
            zu vermeiden
          </li>
        </List>
      </>
    ),
  },
  {
    slug: "wann-belohnen",
    question: "Wann sollte ich mein Kind belohnen?",
    answer: (
      <>
        <p>
          So bald wie möglich, denn je schneller die Belohnung folgt, desto
          stärker wirkt sie. Bei jüngeren Kindern und Kindern mit besonders
          schwerer Symptomatik: fast sofort eintauschen. Bei älteren Kindern:
          höchstens ein bis zwei Tage warten.
        </p>
        <p>
          Die schnelle, positive Rückmeldung ist besonders wertvoll und
          wichtig für die verstärkende Wirkung der Belohnung.
        </p>
      </>
    ),
  },
  {
    slug: "meine-rolle",
    question: "Welche Rolle spiele ich dabei?",
    answer: (
      <>
        <p>
          Die wichtigste! Die App kann motivieren, aber die stärkste Belohnung
          für Ihr Kind sind Sie selbst.
        </p>
        <List>
          <li>Bleiben Sie in der Nähe, wenn Ihr Kind die App benutzt</li>
          <li>Loben Sie Ihr Kind nach dem Arbeiten sofort und konkret</li>
          <li>Loben Sie die Anstrengung, nicht nur den Sieg</li>
          <li>
            Schauen Sie sich das Ergebnis gemeinsam an. Der Timer sieht nicht,
            ob die Hausaufgaben wirklich fertig sind oder die Spielsachen
            wirklich in der Kiste liegen
          </li>
        </List>
      </>
    ),
  },
  {
    slug: "aufgabe-und-zeit",
    question: "Wie wähle ich Aufgabe und Zeit?",
    answer: (
      <List>
        <li>
          Die Aufgabe wird am besten <strong>vor</strong> dem Start
          festgelegt.
        </li>
        <li>
          Gerade bei ADHS ist es wichtig, Aufgaben klein und konkret zu
          halten, z.&nbsp;B. „Legos in die Kiste“ statt „Zimmer aufräumen“.
        </li>
        <li>
          <strong>Ihr Kind sollte meistens gewinnen.</strong> Wenn nicht:
          Kürzen Sie die Zeit für die Hausaufgaben bzw. verlängern Sie diese
          fürs Aufräumen oder gestalten Sie die Aufgaben kleinschrittiger.
        </li>
      </List>
    ),
  },
  {
    slug: "verlieren",
    question: "Was mache ich, wenn mein Kind verliert?",
    answer: (
      <p>
        Ruhig bleiben, nicht schimpfen, aufbauen und die nächste Runde
        leichter machen, damit wieder ein Erfolg gelingt.
      </p>
    ),
  },
  {
    slug: "zu-beachten",
    question: "Was gibt es noch zu beachten?",
    answer: (
      <List>
        <li>
          <strong>Verlässlich bleiben:</strong> Prüfen Sie die Belohnungen auf
          Praktikabilität, damit keine falschen Versprechen entstehen! Geben
          Sie Belohnungen nicht unverdient aus und behalten Sie verdiente
          Belohnungen nicht ein, auch wenn es gerade ungelegen kommt.
        </li>
        <li>
          Belohnungen sollten gemeinsam regelmäßig ausgetauscht werden, gerade
          dann, wenn die Luft raus ist. Es ist wichtig, dass Ihr Kind das
          Belohnungssystem versteht und dass es ansprechend ist.
        </li>
        <li>
          <strong>Langsam loslassen:</strong> Läuft es gut, kann das System
          schrittweise zurückgefahren werden, aber nicht abrupt beendet
          werden.
        </li>
        <li>
          Die Bindung zwischen Ihnen und Ihrem Kind spielt die zentralste
          Rolle. Achten Sie auf eine vertraute, liebevolle, unterstützende
          Beziehung.
        </li>
        <li>
          Die App unterstützt im Alltag, ersetzt aber niemals eine Behandlung.
          Wenden Sie sich bei Sorgen an eine/n Psychiater*in, Psycholog*in
          oder Kinderärzt*in.
        </li>
      </List>
    ),
  },
];

interface InfoProps {
  onClose: () => void;
  onNavigateToContract?: () => void;
}

const Info = ({ onClose, onNavigateToContract }: InfoProps) => {
  const faqs = getFaqs(onNavigateToContract);

  const hashToIndex = useCallback((): number | null => {
    const hash = window.location.hash.slice(1);
    if (!hash.startsWith(FAQ_HASH_PREFIX)) return null;
    const slug = hash.slice(FAQ_HASH_PREFIX.length);
    const idx = FAQ_SLUGS.indexOf(slug as (typeof FAQ_SLUGS)[number]);
    return idx >= 0 ? idx : null;
  }, []);

  const [openIndex, setOpenIndex] = useState<number | null>(hashToIndex);

  useEffect(() => {
    const syncFromHash = () => setOpenIndex(hashToIndex());
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [hashToIndex]);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => {
      const next = prev === index ? null : index;
      const base = window.location.pathname + window.location.search;
      window.history.replaceState(
        null,
        "",
        next !== null ? `${base}#${FAQ_HASH_PREFIX}${FAQ_SLUGS[next]}` : base
      );
      return next;
    });
  };

  return (
    <FullScreen onClose={onClose}>
      <div className="h-full w-full overflow-y-auto px-4 text-black sm:px-8">
        <div className="mx-auto w-full max-w-2xl pb-12 pt-8">
          <h1 className="text-center text-2xl font-bold text-amber-950">
            Wichtige Informationen für Erziehungsberechtigte
          </h1>
          <p className="mb-6 mt-2 text-center text-sm text-amber-900/60">
            Tippen Sie auf eine Frage, um die Antwort zu lesen.
          </p>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <Collapse
                key={faq.slug}
                id={`${FAQ_HASH_PREFIX}${faq.slug}`}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </FullScreen>
  );
};

export default Info;
