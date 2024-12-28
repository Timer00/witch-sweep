import { LegalIcon } from "@/assets/icons/LegalIcon";
import FullScreen from "@/components/FullScreen";
import Markdown from "react-markdown";

interface LegalInfoButtonProps {
  pageIndex: number;
  onClick: () => void;
}

export const LegalInfoButton = ({ pageIndex, onClick }: LegalInfoButtonProps) => (
  <button onClick={onClick} className="z-2 absolute left-4 top-[-16px] m-4">
    <div className="flex items-center space-x-1 p-2 text-white underline underline-offset-[5px]">
      { pageIndex === 0 &&
          <span className="text-xs font-semibold text-white">
            {"Impressum & Datenschutz "}
          </span>
      }
      <span className="text-lg font-semibold text-white"><LegalIcon/></span>
    </div>
  </button>
);

const legalInfo = [
  {
    title: "IMPRESSUM",
    content: (
      <div className="prose prose-headings:font-bold prose-headings:mb-2 prose-p:mb-4">
        <p className="font-bold mb-2">HocusFocus</p>
        <p>
          Muriel Antoun<br/>
          Bleichstraße 48<br/>
          17489 Greifswald<br/>
          muriel.antoun@stud.uni-greifswald.de<br/>
          +49 176 55598461
        </p>
        <p className="mt-4">
          Erstellt im Rahmen einer Masterarbeit an der Universität Greifswald.
        </p>
      </div>
    ),
  },
  {
    title: "DATENSCHUTZERKLÄRUNG",
    content: (
      <div className="prose prose-headings:font-bold prose-headings:mb-2 prose-p:mb-4">
        <p><strong className="font-bold">Verantwortlicher</strong><br/>
        Muriel Antoun<br/>
        muriel.antoun@stud.uni-greifswald.de</p>

        <p><strong className="font-bold">Erhobene Daten</strong><br/>
        Diese Website speichert keine personenbezogenen Daten auf Servern. Der Benutzername wird lokal im Browser des Nutzers in der Local Storage gespeichert. Es erfolgt keine Übertragung dieser Daten an unsere Server.</p>

        <p><strong className="font-bold">Rechte der Nutzer</strong><br/>
        Benutzer haben das Recht, gespeicherte Daten im Browser selbstständig zu löschen. Da keine Daten an uns übermittelt werden, können wir keine darüber hinausgehenden Rechte wie Löschung oder Berichtigung von Daten auf unseren Systemen anbieten.</p>

        <p><strong className="font-bold">Keine Verwendung von Cookies oder Tracking</strong><br/>
        Unsere Website verwendet keine Cookies, Tracking-Tools oder Analysetools.</p>

        <p><strong className="font-bold">Rechtsgrundlage der Datenverarbeitung</strong><br/>
        Die lokale Speicherung des Benutzernamens erfolgt ausschließlich zur Nutzung der Website und basiert auf der Zustimmung des Nutzers durch die aktive Eingabe.</p>

        <p><strong className="font-bold">Hosting durch Vercel</strong><br/>
        Diese Website wird von Vercel gehostet. Möglicherweise werden durch Vercel Daten wie IP-Adressen oder Zugriffsprotokolle gespeichert. Details dazu entnehmen Sie bitte der Datenschutzerklärung von Vercel.</p>
      </div>
    ),
  },
];

interface LegalInfoProps {
  onClose: () => void;
}

const LegalInfo = ({ onClose }: LegalInfoProps) => {
  return (
    <FullScreen onClose={onClose}>
      <div className="px-8 w-full h-full overflow-y-scroll">
        <h1 className="mb-4 text-2xl font-bold center">
          RECHTLICHE INFORMATIONEN
        </h1>
        {legalInfo.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-bold mb-2">{section.title}</h2>
            <div className="bg-amber-100 p-4 rounded-md">
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </FullScreen>
  );
};

export default LegalInfo;
