import { useState } from "react";
import FullScreen from "@/components/FullScreen.tsx";
import { InfoIcon } from "@/assets/icons/InfoIcon.tsx";

interface InfoButtonProps {
  pageIndex: number;
  onClick: () => void;
}

export const InfoButton = ({ pageIndex, onClick }: InfoButtonProps) => (
  <button onClick={onClick} className="z-2 absolute left-32 top-[-16px] m-4">
    <div className="flex items-center space-x-1 p-2 text-white underline underline-offset-[5px]">
      {pageIndex === 0 && (
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

// Collapse.js - Component for individual collapsible item
const Collapse = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="my-2">
      <button
        className="w-full rounded-md bg-amber-100 px-4 py-2 text-left shadow-md"
        onClick={handleToggle}
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

const faqs = [
  {
    question: "WOZU NUTZE ICH „HOCUSFOCUS“?",
    answer:
      "Ihr Kind mit ADHS soll durch soziales Feedback, Wettbewerb und Belohnung dazu motiviert werden, alltägliche Herausforderungen zu bewältigen, insbesondere das Erledigen der Hausaufgaben und das Aufräumen. Für beide Aufgaben gibt es Timer mit unterschiedlichen Funktionen. Während das Kind beim Aufräumen schneller als die Hexe sein muss, soll es beim Hausaufgaben machen länger durchhalten als die Hexe. Abhängig von Erfolg und Zeit erhält das Kind eine oder zwei Münzen als Belohnung.",
  },
  {
    question: "WAS SIND DIE MÜNZEN?",
    answer:
      "Die Münzen sind kurzfristige Belohnungen für Ihr Kind, die es motivieren sollen, seine Aufgaben zu erledigen. So verknüpft es die Erfüllung von Aufgaben mit einem positiven Gefühl. Die Münzen sollten langfristig aber zu größeren Belohnungen führen. Hierfür ist Ihre Mitarbeit gefragt, da die Münzen gleichzeitig als Punktesystem dienen, das in fassbare Belohnungen umgesetzt werden sollte.",
  },
  {
    question: "WIE BELOHNE ICH MEIN KIND?",
    answer:
      "Erstellen Sie gemeinsam mit Ihrem Kind einen Vertrag, in dem Sie festlegen, welche Belohnungen es für eine bestimmte Anzahl gesammelter Münzen gibt. Kurzfristige Belohnungen könnten für 1-3 Münzen ein Sticker oder eine Kleinigkeit sein. Für eine größere Anzahl an Münzen könnten Belohnungen wie ein Kinobesuch, ein neues Paar Schuhe oder zusätzliche Spielzeit vereinbart werden. Stellen Sie sicher, dass die Belohnungen nicht nur materieller Natur sind. Achten Sie vor allem bei der Belohnung mit Süßigkeiten auf Moderation, um ungesunde Gewohnheiten zu vermeiden.",
  },
  {
    question: "WANN SOLLTE ICH MEIN KIND BELOHNEN?",
    answer:
      "Es ist wichtig, Belohnungen zeitnah nach Erreichen eines Ziels auszuhändigen. Bei jüngeren oder besonders beeinträchtigten Kindern sollte der Tausch der Münzen gegen Belohnungen fast unmittelbar erfolgen. Ältere Kinder können eventuell ein bis zwei Tage auf ihre Belohnung warten. Dennoch ist für Kinder mit ADHS die schnelle, positive Rückmeldung besonders wertvoll und wichtig für die verstärkende Wirkung der Belohnung.",
  },
  {
    question: "WAS GIBT ES NOCH ZU BEACHTEN?",
    answer:
      "Es ist wichtig, dass Ihr Kind das Belohnungssystem versteht und dass es ansprechend ist. Bieten Sie verschiedene Belohnungsoptionen an, um das Interesse aufrechtzuerhalten. Prüfen Sie die Belohnungen immer auf Praktikabilität, damit keine falschen Versprechen entstehen! Konsequenz ist der Schlüssel: Belohnen Sie stets, selbst wenn Sie müde oder gestresst sind und achten Sie stets auf eine gute Beziehung zu Ihrem Kind; die Bindung zwischen Ihnen beiden ist unerlässlich.",
  },
];

interface InfoProps {
  onClose: () => void;
}

const Info = ({ onClose }: InfoProps) => {
  return (
    <FullScreen onClose={onClose}>
      <div className=" h-full w-full overflow-y-scroll px-8 text-black">
        <h1 className="center mb-4 text-2xl font-bold">
          WICHTIGE INFORMATIONEN FÜR ERZIEHUNGSBERECHTIGE
        </h1>
        {faqs.map((faq, index) => (
          <Collapse key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </FullScreen>
  );
};

export default Info;
