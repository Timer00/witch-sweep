import { CoinIcon } from "@/assets/icons/CoinIcon.tsx";

interface CoinsProps {
  amount: number
}

const Coins = ({amount}: CoinsProps) => {

  return (
    <div className="absolute top-0 right-0 m-4">
      <div className="flex items-center space-x-2 p-2 bg-yellow-300 rounded-full shadow-md">
        <CoinIcon/>
        <span className="text-lg font-semibold">{amount}</span>
      </div>
    </div>

  )
}

export default Coins;
