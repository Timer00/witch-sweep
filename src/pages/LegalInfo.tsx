import FullScreen from "@/components/FullScreen";
import { Scale } from "lucide-react";

interface LegalInfoButtonProps {
  pageIndex: number;
  onClick: () => void;
}

export const LegalInfoButton = ({
  pageIndex,
  onClick,
}: LegalInfoButtonProps) => {
  if (pageIndex !== 0) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className="z-2 absolute bottom-[-16px] left-32 m-4"
    >
      <div className="flex items-center space-x-1 p-2 text-white underline underline-offset-[5px]">
        <span className="text-[0.5rem] font-semibold text-white">
          {"Impressum & Datenschutz "}
        </span>
        <Scale size={12} />
      </div>
    </button>
  );
};

const legalInfo = [
  {
    title: "IMPRESSUM",
    content: (
      <div className="prose prose-headings:mb-2 prose-headings:font-bold prose-p:mb-4">
        <p className="mb-2 font-bold">HocusFocus</p>
        <p>
          Muriel Antoun
          <br />
          Bleichstraße 48
          <br />
          17489 Greifswald
          <br />
          muriel.antoun@stud.uni-greifswald.de
          <br />
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
      <div className="prose prose-headings:mb-2 prose-headings:font-bold prose-p:mb-4">
        <p>
          <strong className="font-bold">Verantwortlicher</strong>
          <br />
          Muriel Antoun
          <br />
          muriel.antoun@stud.uni-greifswald.de
        </p>

        <p>
          <strong className="font-bold">Erhobene Daten</strong>
          <br />
          Diese Website speichert keine personenbezogenen Daten auf Servern. Der
          Benutzername wird lokal im Browser des Nutzers in der Local Storage
          gespeichert. Es erfolgt keine Übertragung dieser Daten an unsere
          Server.
        </p>

        <p>
          <strong className="font-bold">Rechte der Nutzer</strong>
          <br />
          Benutzer haben das Recht, gespeicherte Daten im Browser selbstständig
          zu löschen. Da keine Daten an uns übermittelt werden, können wir keine
          darüber hinausgehenden Rechte wie Löschung oder Berichtigung von Daten
          auf unseren Systemen anbieten.
        </p>

        <p>
          <strong className="font-bold">
            Keine Verwendung von Cookies oder Tracking
          </strong>
          <br />
          Unsere Website verwendet keine Cookies, Tracking-Tools oder
          Analysetools.
        </p>

        <p>
          <strong className="font-bold">
            Rechtsgrundlage der Datenverarbeitung
          </strong>
          <br />
          Die lokale Speicherung des Benutzernamens erfolgt ausschließlich zur
          Nutzung der Website und basiert auf der Zustimmung des Nutzers durch
          die aktive Eingabe.
        </p>

        <p>
          <strong className="font-bold">Hosting durch Vercel</strong>
          <br />
          Diese Website wird von Vercel gehostet. Möglicherweise werden durch
          Vercel Daten wie IP-Adressen oder Zugriffsprotokolle gespeichert.
          Details dazu entnehmen Sie bitte der Datenschutzerklärung von Vercel.
        </p>
      </div>
    ),
  },
  {
    title: "CREDITS",
    content: (
      <div className="prose prose-headings:mb-2 prose-headings:font-bold prose-p:mb-4">
        <p>
          Programmierung: Theo Carrara
          <br />
          Design und Animation: Muriel Antoun
        </p>
      </div>
    ),
  },
  {
    title: "SOURCES",
    content: (
      <div className="prose prose-headings:mb-2 prose-headings:font-bold prose-p:mb-4">
        <p>
          Patati
          <br />
          Patati's ipad
          <br />
          Patati's macbook
          <br />
          Patati's iphone
          <br />
          Patati's 2 braincells
          <br />
          Patati's boyfremdo
          <br />
        </p>
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
      <div className="h-full w-full overflow-y-scroll px-8 text-black">
        <h1 className="center mb-4 text-2xl font-bold">
          RECHTLICHE INFORMATIONEN
        </h1>
        {legalInfo.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="mb-2 text-xl font-bold">{section.title}</h2>
            <div className="rounded-md bg-amber-100 p-4">{section.content}</div>
          </div>
        ))}
      </div>
    </FullScreen>
  );
};

export default LegalInfo;
