import { useState } from "react";
import { Pencil } from "lucide-react";
import useCoins from "@/hooks/useCoins.ts";
import FullScreen from "@/components/FullScreen.tsx";
import ContractPreview from "@/components/contract/ContractPreview.tsx";
import ContractDefinition from "@/pages/ContractDefinition.tsx";
import { loadContract } from "@/utils/contractStorage.ts";

interface SpendCoinsProps {
  onClose: () => void;
  onOpenInfo?: () => void;
}

const SpendCoins = ({ onClose, onOpenInfo }: SpendCoinsProps) => {
  const { coins, spendCoins } = useCoins();
  const [spendAmount, setSpendAmount] = useState(1);
  const [showContractDefinition, setShowContractDefinition] = useState(false);

  const contract = loadContract();

  const handleSpendClick = () => {
    spendCoins(spendAmount);
  };

  const openContractDefinition = () => setShowContractDefinition(true);
  const closeContractDefinition = () => setShowContractDefinition(false);

  if (showContractDefinition) {
    return (
      <ContractDefinition
        onClose={closeContractDefinition}
        onOpenInfo={onOpenInfo ?? (() => {})}
      />
    );
  }

  return (
    <FullScreen onClose={onClose}>
      <div className="flex h-full gap-6 overflow-auto p-4 text-black">
        <aside className="flex w-48 shrink-0 flex-col">
          <div className="mb-4 text-center text-lg">
            Deine Münzen: {coins}
          </div>
          <button
            className="mb-4 w-full rounded bg-amber-400 px-6 py-3 text-white hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200"
            onClick={handleSpendClick}
          >
            Ausgeben
          </button>
          <input
            type="range"
            min="1"
            max={coins}
            value={spendAmount}
            onChange={(e) => setSpendAmount(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg accent-black dark:bg-amber-200"
          />
          <div className="mt-2 text-center">Menge: {spendAmount}</div>
        </aside>
        <main className="flex flex-1 items-start justify-center overflow-auto">
          {contract ? (
            <ContractPreview
              parentName={contract.parentName}
              childName={contract.childName}
              rewards={contract.rewards}
            />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4">
              <p className="text-center text-black/70">
                Noch kein Vertrag vorhanden.
              </p>
              <button
                type="button"
                onClick={openContractDefinition}
                className="rounded border-2 border-black bg-amber-100 px-6 py-3 font-medium hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-200"
              >
                Vertrag erstellen
              </button>
            </div>
          )}
        </main>
        {contract && (
          <aside className="flex w-24 shrink-0 flex-col items-center justify-start pt-8">
            <button
              type="button"
              onClick={openContractDefinition}
              className="flex flex-col items-center gap-1 rounded border-2 border-black px-3 py-2 font-medium hover:bg-black/5"
              aria-label="Vertrag bearbeiten"
            >
              <Pencil className="h-6 w-6" />
              <span className="text-sm">Bearbeiten</span>
            </button>
          </aside>
        )}
      </div>
    </FullScreen>
  );
};

export default SpendCoins;
