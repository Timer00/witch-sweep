import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { coin } from "@/assets";
import useCoins from "@/hooks/useCoins.ts";

const clampAmount = (value: number, coins: number): number => {
  if (coins <= 0) return 0;
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(coins, n));
};

interface CoinSpendFormProps {
  spendAmount: number;
  onSpendAmountChange: (value: number) => void;
}

const CoinSpendForm = ({
  spendAmount,
  onSpendAmountChange,
}: CoinSpendFormProps) => {
  const { coins, spendCoins } = useCoins();
  // Amount waiting for a yes/no in the confirmation popup, null = closed
  const [confirmAmount, setConfirmAmount] = useState<number | null>(null);

  const setAmount = (value: number) => {
    onSpendAmountChange(clampAmount(value, coins));
  };

  const handleSpendClick = () => {
    const amount = clampAmount(spendAmount, coins);
    if (amount > 0) setConfirmAmount(amount);
  };

  const handleConfirmSpend = () => {
    if (confirmAmount != null) spendCoins(confirmAmount);
    setConfirmAmount(null);
  };

  return (
    <aside className="flex w-56 shrink-0 flex-col items-center justify-center">
      {/* Coin balance – separated from spending controls */}
      <div className="mb-12 text-center">
        <div className="text-lg">Deine Münzen</div>
        <div className="mt-1 flex items-center justify-center gap-1">
          <span className="text-2xl font-semibold">{coins}</span>
          <img src={coin} alt="" className="h-6 w-6" aria-hidden />
        </div>
      </div>

      {/* Spending controls: amount selector + spend button */}
      <div className="flex items-stretch gap-4">
        <div className="flex w-14 flex-col items-center gap-1">
          <button
            type="button"
            onClick={() => setAmount(spendAmount + 1)}
            disabled={coins === 0}
            className="flex w-full items-center justify-center rounded border-2 border-black p-1 transition-transform hover:scale-110 hover:bg-black/5 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            aria-label="Menge erhöhen"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
          <input
            type="number"
            min={1}
            max={coins}
            value={spendAmount}
            onChange={(e) => setAmount(parseInt(e.target.value, 10) || 0)}
            disabled={coins === 0}
            className="w-full rounded border-2 border-black px-2 py-1 text-center text-lg [appearance:textfield] disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => setAmount(spendAmount - 1)}
            disabled={coins === 0}
            className="flex w-full items-center justify-center rounded border-2 border-black p-1 transition-transform hover:scale-110 hover:bg-black/5 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            aria-label="Menge verringern"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
        <button
          className="flex items-center justify-center self-stretch rounded bg-amber-400 px-6 text-white shadow-lg transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-amber-300 hover:shadow-xl focus:outline-none active:scale-[0.98] active:shadow-inner disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg"
          onClick={handleSpendClick}
          disabled={coins === 0}
        >
          Ausgeben
        </button>
      </div>

      {/* Confirmation popup before any coins actually leave the purse */}
      {confirmAmount != null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 print:hidden"
          onClick={() => setConfirmAmount(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Münzen ausgeben bestätigen"
            className="mx-4 flex max-w-sm flex-col items-center gap-5 rounded-xl border-2 border-black bg-amber-50 px-8 py-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-center text-lg">
              Möchtest du wirklich{" "}
              <strong>
                {confirmAmount} {confirmAmount === 1 ? "Münze" : "Münzen"}
              </strong>{" "}
              <img
                src={coin}
                alt=""
                className="inline h-5 w-5 align-text-bottom"
                aria-hidden
              />{" "}
              ausgeben?
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setConfirmAmount(null)}
                className="rounded border-2 border-black px-5 py-2 font-medium hover:bg-black/5"
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={handleConfirmSpend}
                className="rounded border-2 border-black bg-amber-400 px-5 py-2 font-medium shadow hover:bg-amber-300"
              >
                Ja, ausgeben
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default CoinSpendForm;
