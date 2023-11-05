import { coin } from "@/assets";

interface CoinsProps {
  amount: number;
}

const Coins = ({ amount }: CoinsProps) => {
  return (
    <div className="absolute right-32 top-[-16px] m-4">
      <div className="flex items-center space-x-1 p-2">
        <img width={42} height={42} src={coin} alt="Coin icon" />
        <span className="text-lg font-semibold text-white">{amount}</span>
      </div>
    </div>
  );
};

export default Coins;
