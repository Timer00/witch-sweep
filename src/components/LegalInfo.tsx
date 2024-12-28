import { LegalIcon } from "@/assets/icons/LegalIcon";
import FullScreen from "@/components/FullScreen";

interface LegalInfoButtonProps {
  pageIndex: number;
  onClick: () => void;
}

export const LegalInfoButton = ({ pageIndex, onClick }: LegalInfoButtonProps) => (
  <button onClick={onClick} className="z-2 absolute left-4 top-[-16px] m-4">
    <div className="flex items-center space-x-1 p-2 text-white underline underline-offset-[5px]">
      <span className="text-lg font-semibold text-white"><LegalIcon/></span>
    </div>
  </button>
);

const legalInfo = [
  {
    title: "IMPRESSUM",
    content: "Hier kommt der Impressum-Text hin...",
  },
  {
    title: "DATENSCHUTZ",
    content: "Hier kommt der Datenschutz-Text hin...",
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
