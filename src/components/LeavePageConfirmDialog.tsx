import Button from "@/components/Button.tsx";

interface LeavePageConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LeavePageConfirmDialog = ({
  onConfirm,
  onCancel,
}: LeavePageConfirmDialogProps) => {
  return (
    <div className="z-50 absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="relative rounded-lg border-4 border-black bg-amber-50 p-8 text-center text-black shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Seite verlassen ?</h2>
        <p className="mb-6 text-sm">
          (Der Timer wird abgebrochen, der Fortschritt wird nicht gespeichert)
        </p>
        <div className="flex justify-center gap-4">
          <Button
            onClick={onConfirm}
            className="border-black text-black"
            small
          >
            Ja, verlassen
          </Button>
          <Button
            onClick={onCancel}
            className="border-black text-black"
            small
          >
            Nein, bleiben
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeavePageConfirmDialog;

