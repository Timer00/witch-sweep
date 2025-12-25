import { Home } from "lucide-react";

interface MainMenuButtonProps {
  pageIndex: number;
  isInHomeView?: boolean;
  onClick: () => void;
}

const MainMenuButton = ({
  pageIndex,
  isInHomeView = false,
  onClick,
}: MainMenuButtonProps) => {
  // Show button only when:
  // - On page 0 (GameMenu) AND in home view, OR
  // - On any other page (not the menu)
  const shouldShow = pageIndex === 0 ? isInHomeView : true;

  if (!shouldShow) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Zurück zum Hauptmenü"
      className="z-2 absolute left-0 top-0"
    >
      <div className="flex items-center space-x-2 p-2 text-white underline underline-offset-[5px] transition-opacity hover:opacity-80">
        <Home size={22} />
        <span className="text-md hidden font-semibold sm:inline">Menü</span>
      </div>
    </button>
  );
};

export default MainMenuButton;
