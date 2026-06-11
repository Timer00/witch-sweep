import { coin } from "@/assets";

interface CoinsProps {
  amount: number;
  onClick: () => void;
  pageIndex: number;
}

const Coins = ({ pageIndex, amount, onClick }: CoinsProps) => {
  return (
    <div onClick={onClick} className="absolute right-0 top-0 m-2 cursor-pointer">
      <div className="flex items-center gap-1.5 rounded-full border border-white/25 bg-black/35 px-2.5 py-1.5 backdrop-blur-sm transition-colors hover:bg-black/55">
        {pageIndex === 0 && (
          <span className="text-xs font-semibold text-white/90">
            {"Klicke hier zum Ausgeben:"}
          </span>
        )}
        <img
          id="coin-counter-icon"
          width={20}
          height={20}
          src={coin}
          alt="Coin icon"
        />
        <span
          key={amount}
          className="coin-pop text-sm font-semibold text-white"
        >
          {amount}
        </span>
      </div>
    </div>
  );
};

export default Coins;
