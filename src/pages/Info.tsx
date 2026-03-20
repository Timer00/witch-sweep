import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import FullScreen from "@/components/FullScreen.tsx";
import { InfoIcon } from "@/assets/icons/InfoIcon.tsx";

const FAQ_HASH_PREFIX = "faq-";
const FAQ_SLUGS = [
  "wozu-hocusfocus",
  "muenzen",
  "belohnen",
  "wann-belohnen",
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
  answer: string | ReactNode;
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
    <div className="my-2" id={id}>
      <button
        className="w-full rounded-md bg-amber-100 px-4 py-2 text-left shadow-md"
        onClick={onToggle}
      >
        {question}
      </button>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } rounded-md bg-amber-100 px-4 py-2`}
      >
        {answer}
      </div>
    </div>
  );
};

interface FaqItem {
  question: string;
  /** Plain string or JSX (e.g. with <a href="..."> links) */
  answer: string | ReactNode;
  slug: string;
}

const getFaqs = (onNavigateToContract?: () => void): FaqItem[] => [
  {
    slug: "wozu-hocusfocus",
    question: "WOZU NUTZE ICH „HOCUSFOCUS“?",
    answer:
      "Ihr Kind mit ADHS soll durch soziales Feedback, Wettbewerb und Belohnung dazu motiviert werden, alltägliche Herausforderungen zu bewältigen, insbesondere das Erledigen der Hausaufgaben und das Aufräumen. Für beide Aufgaben gibt es Timer mit unterschiedlichen Funktionen. Während das Kind beim Aufräumen schneller als die Hexe sein muss, soll es beim Hausaufgaben machen länger durchhalten als die Hexe. Abhängig von Erfolg und Zeit erhält das Kind eine oder zwei Münzen als Belohnung.",
  },
  {
    slug: "muenzen",
    question: "WAS SIND DIE MÜNZEN?",
    answer:
      "Die Münzen sind kurzfristige Belohnungen für Ihr Kind, die es motivieren sollen, seine Aufgaben zu erledigen. So verknüpft es die Erfüllung von Aufgaben mit einem positiven Gefühl. Die Münzen sollten langfristig aber zu größeren Belohnungen führen. Hierfür ist Ihre Mitarbeit gefragt, da die Münzen gleichzeitig als Punktesystem dienen, das in fassbare Belohnungen umgesetzt werden sollte.",
  },
  {
    slug: "belohnen",
    question: "WIE BELOHNE ICH MEIN KIND?",
    answer: onNavigateToContract ? (
      <>
        Erstellen Sie gemeinsam mit Ihrem Kind einen{" "}
        <button
          type="button"
          onClick={onNavigateToContract}
          className="cursor-pointer font-semibold underline underline-offset-2 hover:no-underline"
        >
          Vertrag
        </button>
        , in dem Sie festlegen, welche Belohnungen es für eine bestimmte Anzahl
        gesammelter Münzen gibt. Kurzfristige Belohnungen könnten für 1-3 Münzen
        ein Sticker oder eine Kleinigkeit sein. Für eine größere Anzahl an
        Münzen könnten Belohnungen wie ein Kinobesuch, ein neues Paar Schuhe
        oder zusätzliche Spielzeit vereinbart werden. Stellen Sie sicher, dass
        die Belohnungen nicht nur materieller Natur sind. Achten Sie vor allem
        bei der Belohnung mit Süßigkeiten auf Moderation, um ungesunde
        Gewohnheiten zu vermeiden.
      </>
    ) : (
      "Erstellen Sie gemeinsam mit Ihrem Kind einen Vertrag, in dem Sie festlegen, welche Belohnungen es für eine bestimmte Anzahl gesammelter Münzen gibt. Kurzfristige Belohnungen könnten für 1-3 Münzen ein Sticker oder eine Kleinigkeit sein. Für eine größere Anzahl an Münzen könnten Belohnungen wie ein Kinobesuch, ein neues Paar Schuhe oder zusätzliche Spielzeit vereinbart werden. Stellen Sie sicher, dass die Belohnungen nicht nur materieller Natur sind. Achten Sie vor allem bei der Belohnung mit Süßigkeiten auf Moderation, um ungesunde Gewohnheiten zu vermeiden."
    ),
  },
  {
    slug: "wann-belohnen",
    question: "WANN SOLLTE ICH MEIN KIND BELOHNEN?",
    answer:
      "Es ist wichtig, Belohnungen zeitnah nach Erreichen eines Ziels auszuhändigen. Bei jüngeren oder besonders beeinträchtigten Kindern sollte der Tausch der Münzen gegen Belohnungen fast unmittelbar erfolgen. Ältere Kinder können eventuell ein bis zwei Tage auf ihre Belohnung warten. Dennoch ist für Kinder mit ADHS die schnelle, positive Rückmeldung besonders wertvoll und wichtig für die verstärkende Wirkung der Belohnung.",
  },
  {
    slug: "zu-beachten",
    question: "WAS GIBT ES NOCH ZU BEACHTEN?",
    answer:
      "Es ist wichtig, dass Ihr Kind das Belohnungssystem versteht und dass es ansprechend ist. Bieten Sie verschiedene Belohnungsoptionen an, um das Interesse aufrechtzuerhalten. Prüfen Sie die Belohnungen immer auf Praktikabilität, damit keine falschen Versprechen entstehen! Konsequenz ist der Schlüssel: Belohnen Sie stets, selbst wenn Sie müde oder gestresst sind und achten Sie stets auf eine gute Beziehung zu Ihrem Kind; die Bindung zwischen Ihnen beiden ist unerlässlich.",
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
      <div className=" h-full w-full overflow-y-scroll px-8 text-black">
        <h1 className="center mb-4 text-2xl font-bold">
          WICHTIGE INFORMATIONEN FÜR ERZIEHUNGSBERECHTIGE
        </h1>
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
    </FullScreen>
  );
};

export default Info;
