interface UnsavedChangesDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const UnsavedChangesDialog = ({
  onConfirm,
  onCancel,
}: UnsavedChangesDialogProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="unsaved-dialog-title"
    >
      <div className="mx-4 max-w-sm rounded-lg border-2 border-black bg-amber-50 p-6 shadow-lg">
        <h2 id="unsaved-dialog-title" className="mb-4 text-lg font-semibold">
          Änderungen verwerfen und zurück?
        </h2>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded border-2 border-black px-4 py-2 font-medium hover:bg-black/5"
          >
            Abbrechen
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded border-2 border-black bg-black px-4 py-2 font-medium text-white hover:bg-black/90"
          >
            Verwerfen
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsavedChangesDialog;
