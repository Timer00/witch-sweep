import { useState } from "react";
import FullScreen from "@/components/FullScreen.tsx";
import ContractDefinitionForm from "@/components/contract/ContractDefinitionForm.tsx";
import UnsavedChangesDialog from "@/components/contract/UnsavedChangesDialog.tsx";
import { loadContract, saveContract } from "@/utils/contractStorage.ts";
import type { ContractFormData } from "@/utils/contractValidation";
import { Info } from "lucide-react";

interface ContractDefinitionProps {
  onClose: () => void;
  onOpenInfo: () => void;
}

const emptyFormData: ContractFormData = {
  parentName: "",
  childName: "",
  rewards: [],
};

function toFormData(
  loaded: { parentName: string; childName: string; rewards: { id: string; description: string; amount: number }[] } | null
): ContractFormData {
  if (!loaded?.rewards?.length) return emptyFormData;
  return {
    parentName: loaded.parentName,
    childName: loaded.childName,
    rewards: loaded.rewards.map((r) => ({
      id: r.id,
      description: r.description,
      amount: r.amount,
    })),
  };
}

const ContractDefinition = ({ onClose, onOpenInfo }: ContractDefinitionProps) => {
  const [isDirty, setIsDirty] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  const existing = loadContract();
  const defaultValues = toFormData(existing);

  const handleCloseClick = () => {
    if (isDirty) {
      setShowDiscardDialog(true);
    } else {
      onClose();
    }
  };

  const handleDiscardConfirm = () => {
    setShowDiscardDialog(false);
    onClose();
  };

  const handleDiscardCancel = () => {
    setShowDiscardDialog(false);
  };

  const handleSave = (data: ContractFormData) => {
    saveContract(data);
    onClose();
  };

  return (
    <FullScreen onClose={handleCloseClick}>
      <div className="mx-auto w-[70%] max-w-2xl p-4">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onOpenInfo}
            className="rounded p-2 hover:bg-black/5"
            aria-label="Anleitung öffnen"
          >
            <Info className="h-6 w-6 text-black" />
          </button>
          <h1 className="font-gothic text-2xl font-bold">Vertrag bearbeiten</h1>
          <div className="w-10" />
        </div>

        <ContractDefinitionForm
          defaultValues={defaultValues}
          onSave={handleSave}
          onDirtyChange={setIsDirty}
        />
      </div>

      {showDiscardDialog && (
        <UnsavedChangesDialog
          onConfirm={handleDiscardConfirm}
          onCancel={handleDiscardCancel}
        />
      )}
    </FullScreen>
  );
};

export default ContractDefinition;
