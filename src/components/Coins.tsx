import { coin } from "@/assets";

interface CoinsProps {
  amount: number;
}

const Coins = ({ amount }: CoinsProps) => {
  return (
    <div className="absolute right-0 top-0 m-4">
      <div className="flex items-center space-x-2 p-2">
        <img width={32} height={32} src={coin} alt="Coin icon" />
        <span className="text-lg font-semibold text-white">{amount}</span>
      </div>
    </div>
  );
};

export default Coins;
