import { Sparkles, Stars, WandSparkles } from "lucide-react";
import { coin, witchHello } from "@/assets";
import type {
  ContractData,
  ContractReward,
} from "@/utils/contractValidation";

interface ContractPreviewProps {
  parentName: ContractData["parentName"];
  childName: ContractData["childName"];
  rewards: ContractReward[];
  /** When provided, reward rows become clickable to set spend amount */
  coins?: number;
  onRewardClick?: (amount: number) => void;
}

const ContractPreview = ({
  parentName,
  childName,
  rewards,
  coins,
  onRewardClick,
}: ContractPreviewProps) => {
  const ROWS = 7;
  const filledRows = rewards.slice(0, ROWS);
  const emptyRowCount = Math.max(0, ROWS - filledRows.length);
  const isInteractive = coins !== undefined && onRewardClick !== undefined;

  return (
    <article
      data-print-contract
      className="relative max-w-2xl rounded-lg border-2 border-black bg-amber-50/95 p-6 shadow-none"
    >
      {/* Title / decor zone */}
      <header className="mb-4 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-black/50" aria-hidden />
          <Stars className="h-5 w-5 text-black/60" aria-hidden />
          <h1 className="font-gothic text-3xl font-bold text-black">
            Vertrag
          </h1>
          <WandSparkles className="h-5 w-5 text-black/50" aria-hidden />
          <Stars className="h-5 w-5 text-black/60" aria-hidden />
        </div>
        <p className="text-base text-black/90">
          Diese Dinge kann ich gegen Münzen eintauschen:
        </p>
      </header>

      {/* Rewards zone */}
      <section className="mb-6">
        <ul className="space-y-2">
          {filledRows.map((reward) => {
            const affordable =
              isInteractive && coins !== undefined && reward.amount <= coins;
            const unaffordable =
              isInteractive && coins !== undefined && reward.amount > coins;

            return (
              <li
                key={reward.id}
                data-reward-row
                role={isInteractive ? "button" : undefined}
                tabIndex={isInteractive ? 0 : undefined}
                onClick={
                  isInteractive && affordable
                    ? () => onRewardClick?.(reward.amount)
                    : undefined
                }
                onKeyDown={
                  isInteractive && affordable
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onRewardClick?.(reward.amount);
                        }
                      }
                    : undefined
                }
                title={unaffordable ? "Du hast nicht genug Münzen." : undefined}
                className={`flex items-center justify-between border-b border-black/30 pb-1 print:pointer-events-none print:cursor-default ${
                  affordable
                    ? "cursor-pointer transition-colors hover:bg-amber-100/80"
                    : unaffordable
                      ? "cursor-not-allowed"
                      : ""
                }`}
              >
                <span className="flex-1 truncate pr-2">{reward.description}</span>
                <span className="flex shrink-0 items-center gap-1">
                  <span className="font-semibold">{reward.amount}</span>
                  <img
                    src={coin}
                    alt=""
                    className="h-5 w-5"
                    aria-hidden
                  />
                </span>
              </li>
            );
          })}
          {Array.from({ length: emptyRowCount }).map((_, i) => (
            <li
              key={`empty-${i}`}
              className="flex items-center justify-between border-b border-black/20 pb-1"
            >
              <span className="flex-1" />
              <span className="flex shrink-0 items-center gap-1 opacity-50">
                <img src={coin} alt="" className="h-5 w-5" aria-hidden />
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Date / signatures + witch zone */}
      <footer className="flex gap-6">
        <div className="flex flex-1 flex-col gap-4">
          <div>
            <label className="block text-sm font-medium">Datum:</label>
            <div className="mt-1 h-6 border-b border-black/40" />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Unterschrift (Elternteil):
            </label>
            <span className="block text-xs text-black/70">{parentName}</span>
            <div className="mt-1 h-6 border-b border-black/40" />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Unterschrift (Kind):
            </label>
            <span className="block text-xs text-black/70">{childName}</span>
            <div className="mt-1 h-6 border-b border-black/40" />
          </div>
        </div>
        <div className="w-48 shrink-0">
          <img
            src={witchHello}
            alt=""
            className="h-auto w-full object-contain"
            aria-hidden
          />
        </div>
      </footer>
    </article>
  );
};

export default ContractPreview;
