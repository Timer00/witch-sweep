import { useState } from "react";
import useCoins from "@/hooks/useCoins.ts";
import FullScreen from "@/components/FullScreen.tsx";

interface SpendCoinsProps {
  onClose: () => void;
}

const SpendCoins = ({ onClose }: SpendCoinsProps) => {
  const { coins, spendCoins } = useCoins();
  const [spendAmount, setSpendAmount] = useState(1);

  const handleSpendClick = () => {
    spendCoins(spendAmount);
  };

  return (
    <FullScreen onClose={onClose}>
      <div className="center h-full">
        <div className="center flex-col w-1/5">
          <div className="mb-4 text-lg text-center">Deine Münzen: {coins}</div>
          <button
            className="w-full mb-4 rounded bg-amber-400 px-6 py-3 text-white hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200"
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
            className="h-2 w-full accent-black cursor-pointer appearance-none rounded-lg dark:bg-amber-200"
          />
          <div className="mt-2 text-center">Menge: {spendAmount}</div>
        </div>
      </div>
    </FullScreen>
  );
};

export default SpendCoins;
