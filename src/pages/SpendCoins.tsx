import { useState, useEffect } from "react";
import { Pencil, Printer } from "lucide-react";
import useCoins from "@/hooks/useCoins.ts";
import FullScreen from "@/components/FullScreen.tsx";
import CoinSpendForm from "@/components/CoinSpendForm.tsx";
import ContractPreview from "@/components/contract/ContractPreview.tsx";
import ContractDefinition from "@/pages/ContractDefinition.tsx";
import { loadContract } from "@/utils/contractStorage.ts";

interface SpendCoinsProps {
  onClose: () => void;
  onOpenInfo?: () => void;
}

const clampAmount = (value: number, coins: number): number => {
  if (coins <= 0) return 0;
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(coins, n));
};

const SpendCoins = ({ onClose, onOpenInfo }: SpendCoinsProps) => {
  const { coins } = useCoins();
  const [spendAmount, setSpendAmount] = useState(1);
  const [showContractDefinition, setShowContractDefinition] = useState(false);

  const contract = loadContract();

  useEffect(() => {
    setSpendAmount((prev) => clampAmount(prev, coins));
  }, [coins]);

  const setAmount = (value: number) => {
    setSpendAmount(clampAmount(value, coins));
  };

  const openContractDefinition = () => setShowContractDefinition(true);
  const closeContractDefinition = () => setShowContractDefinition(false);

  const handlePrint = () => {
    requestAnimationFrame(() => {
      window.print();
    });
  };

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
      <div className="flex h-full gap-6 overflow-auto p-4 lg:px-16 text-black">
        <CoinSpendForm
          spendAmount={spendAmount}
          onSpendAmountChange={setAmount}
        />
        <main className="flex flex-1 items-start justify-center overflow-auto">
          {contract ? (
            <ContractPreview
              parentName={contract.parentName}
              childName={contract.childName}
              rewards={contract.rewards}
              coins={coins}
              onRewardClick={setAmount}
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
          <aside className="flex w-24 shrink-0 flex-col items-center justify-start gap-4 pt-8">
            <button
              type="button"
              onClick={handlePrint}
              className="flex flex-col items-center gap-1 rounded border-2 border-black bg-amber-400 px-3 py-2 font-medium hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200"
              aria-label="Vertrag drucken"
            >
              <Printer className="h-6 w-6" />
              <span className="text-sm">Drucken</span>
            </button>
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
