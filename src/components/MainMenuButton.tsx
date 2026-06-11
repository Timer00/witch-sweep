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
  const hasTaskStarted = pageIndex >= 6 && pageIndex <= 9;

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
        className="z-2 absolute left-0 top-0 m-2"
      >
        <div className="flex items-center gap-1.5 rounded-full border border-white/25 bg-black/35 px-2.5 py-1.5 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/55">
          <Home size={16} />
          <span className="hidden text-xs font-semibold sm:inline">Menü</span>
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
