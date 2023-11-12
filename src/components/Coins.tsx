import { coin } from "@/assets";

interface CoinsProps {
  amount: number;
  onClick: () => void;
  pageIndex: number;
}

const Coins = ({ pageIndex, amount, onClick }: CoinsProps) => {
  return (
    <div onClick={onClick} className="absolute right-32 top-[-16px] m-4">
      <div className="flex items-center space-x-1 p-2">
        { pageIndex === 0 &&
          <span className="w-[78px] text-xs font-semibold text-white">
            {"Click here to spend: "}
          </span>
        }
        <img width={24} height={24} src={coin} alt="Coin icon" />
        <span className="text-md font-semibold text-white">{amount}</span>
      </div>
    </div>
  );
};

export default Coins;
