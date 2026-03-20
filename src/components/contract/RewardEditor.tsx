import { cn } from "@/utils/utils";
import { Check, X } from "lucide-react";

export interface RewardDraft {
  description: string;
  amount: number;
}

interface RewardEditorProps {
  draft: RewardDraft;
  onDraftChange: (draft: RewardDraft) => void;
  onConfirm: () => void;
  onCancel: () => void;
  autoFocus?: boolean;
  className?: string;
}

const RewardEditor = ({
  draft,
  onDraftChange,
  onConfirm,
  onCancel,
  autoFocus = false,
  className,
}: RewardEditorProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onConfirm();
    }
  };

  return (
    <div
      className={cn(
        "min-h-11 flex h-11 items-center gap-2 rounded bg-white pr-3",
        className
      )}
    >
      <input
        type="text"
        value={draft.description}
        onChange={(e) =>
          onDraftChange({ ...draft, description: e.target.value })
        }
        onKeyDown={handleKeyDown}
        placeholder="Belohnung…"
        className="my-1 h-full min-w-0 flex-1 pl-[11px] pr-2"
        maxLength={100}
        autoFocus={autoFocus}
      />
      <input
        type="number"
        min={1}
        value={draft.amount}
        onChange={(e) =>
          onDraftChange({
            ...draft,
            amount: Math.max(1, parseInt(e.target.value, 10) || 1),
          })
        }
        onKeyDown={handleKeyDown}
        className="h-8 w-14 rounded border border-black/30 pl-[14px] pr-0 text-center"
      />
      <div className="flex shrink-0 gap-1">
        <button
          type="button"
          onClick={onConfirm}
          className="rounded p-1 hover:bg-black/10"
          aria-label="Bestätigen"
        >
          <Check className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded p-1 hover:bg-black/10"
          aria-label="Abbrechen"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default RewardEditor;
