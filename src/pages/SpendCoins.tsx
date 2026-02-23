import { useState } from "react";
import useCoins from "@/hooks/useCoins.ts";
import FullScreen from "@/components/FullScreen.tsx";
import ContractPreview from "@/components/contract/ContractPreview.tsx";
import type { ContractReward } from "@/utils/contractValidation";

interface SpendCoinsProps {
  onClose: () => void;
}

/** Static fixture for ContractPreview (Subtask 02 – look validation only) */
const CONTRACT_FIXTURE = {
  parentName: "Muriel Antoun",
  childName: "Theo Carrara",
  rewards: [
    { id: "1", description: "Bubble gum", amount: 3 },
    { id: "2", description: "Amusement park visit", amount: 20 },
    { id: "3", description: "Watch a Movie at home", amount: 2 },
  ] as ContractReward[],
};

const SpendCoins = ({ onClose }: SpendCoinsProps) => {
  const { coins, spendCoins } = useCoins();
  const [spendAmount, setSpendAmount] = useState(1);

  const handleSpendClick = () => {
    spendCoins(spendAmount);
  };

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
          <ContractPreview
            parentName={CONTRACT_FIXTURE.parentName}
            childName={CONTRACT_FIXTURE.childName}
            rewards={CONTRACT_FIXTURE.rewards}
          />
        </main>
      </div>
    </FullScreen>
  );
};

export default SpendCoins;
