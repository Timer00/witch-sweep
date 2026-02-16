import { Home } from "lucide-react";
import { useState } from "react";
import LeavePageConfirmDialog from "@/components/LeavePageConfirmDialog.tsx";

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
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Show button only when:
  // - On page 0 (GameMenu) AND in home view, OR
  // - On any other page (not the menu)
  const shouldShow = pageIndex === 0 ? isInHomeView : true;

  // Task has started when page >= 6 (TimerScreen and beyond)
  const hasTaskStarted = pageIndex >= 6;

  const handleClick = () => {
    if (hasTaskStarted) {
      setShowConfirmDialog(true);
    } else {
      onClick();
    }
  };

  const handleConfirm = () => {
    setShowConfirmDialog(false);
    onClick();
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  if (!shouldShow) return null;

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="Zurück zum Hauptmenü"
        className="z-2 absolute left-0 top-0"
      >
        <div className="flex items-center space-x-2 p-2 text-white underline underline-offset-[5px] transition-opacity hover:opacity-80">
          <Home size={22} />
          <span className="text-md hidden font-semibold sm:inline">Menü</span>
        </div>
      </button>
      {showConfirmDialog && (
        <LeavePageConfirmDialog
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default MainMenuButton;
