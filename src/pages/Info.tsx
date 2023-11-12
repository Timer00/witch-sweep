import { useState } from "react";
import FullScreen from "@/components/FullScreen.tsx";
import { InfoIcon } from "@/assets/icons/InfoIcon.tsx";

export const InfoButton = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="z-2 absolute left-32 top-[-16px] m-4">
    <div className="flex items-center space-x-1 p-2 text-white underline underline-offset-8">
      <span className="text-lg font-semibold text-white"><InfoIcon/></span>
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
      "Ihr Kind mit ADHS soll durch soziales Feedback, Wettbewerb und Belohnung dazu motiviert werden, sich alltäglichen Herausforderungen zu stellen, speziell dem Hausaufgaben machen und dem Aufräumen. Beide Aufgaben verwenden Timer mit unterschiedlichen Funktionen. Beim Aufräumen muss das Kind schneller sein als die Hexe. Beim Hausaufgaben machen jedoch sollte das Kind länger durchhalten als die Hexe. Je nach Erfolg und Zeit wird das Kind mit einer oder zwei Münzen belohnt.",
  },
  {
    question: "WAS SIND DIE MÜNZEN?",
    answer:
      "Die Münzen dienen primär als kurzfristige Belohnungen für Ihr Kind. Sie helfen, ein positives Gefühl mit der Aufgabenerfüllung zu verbinden. Auf lange Sicht sollen die Münzen aber auch zu größeren Belohnungen führen. Ihre Mitarbeit ist hierbei gefragt, da die Münzen eine Art Punktesammlung darstellen, die Sie in fassbare Belohnungen umsetzen sollten.",
  },
  {
    question: "WIE BELOHNE ICH MEIN KIND?",
    answer:
      "Erstellen Sie gemeinsam mit Ihrem Kind einen Vertrag, in dem Sie festlegen, welche Belohnungen es für eine bestimmte Anzahl gesammelter Münzen gibt. Kurzfristige Belohnungen könnten für 1-3 Münzen ein Sticker oder eine Kleinigkeit sein. Für eine größere Menge an Münzen könnten Belohnungen wie ein Kinobesuch, ein neues Paar Schuhe oder zusätzliche Spielzeit vereinbart werden. Stellen Sie sicher, dass die Belohnungen nicht nur materieller Natur sind. Achten Sie bei der Belohnung mit Süßigkeiten auf Moderation, um ungesunde Gewohnheiten zu vermeiden.",
  },
  {
    question: "WANN SOLLTE ICH MEIN KIND BELOHNEN?",
    answer:
      "Es ist wichtig, Belohnungen zeitnah nach Erreichen eines Ziels auszuhändigen. Bei jüngeren oder besonders beeinträchtigten Kindern sollte der Tausch der Münzen gegen Belohnungen fast unmittelbar erfolgen. Ältere Kinder können eventuell ein bis zwei Tage auf ihre Belohnung warten. Dennoch ist für Kinder mit ADHS die schnelle positive Rückmeldung besonders wertvoll und wichtig für die Verstärkende Wirkung der Belohnung.",
  },
  {
    question: "WAS GIBT ES NOCH ZU BEACHTEN?",
    answer:
      "Es ist wichtig, dass Ihr Kind das Belohnungssystem versteht und dass es ansprechend ist. Bieten Sie verschiedene Belohnungsoptionen an, um das Interesse zu erhalten. Prüfen Sie die Belohnungen auf Praktikabilität, damit keine falschen Versprechen entstehen! Konsequenz ist der Schlüssel: Belohnen Sie stets, selbst wenn Sie müde oder gestresst sind. Achten Sie immer auf eine gute Beziehung zu Ihrem Kind; die Bindung zwischen Ihnen beiden ist essenziell.",
  },
];

interface InfoProps {
  onClose: () => void;
}

const Info = ({ onClose }: InfoProps) => {
  return (
    <FullScreen onClose={onClose}>
      <div className=" px-8 w-full h-full overflow-y-scroll">
        <h1 className="mb-4 text-2xl font-bold center">
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
