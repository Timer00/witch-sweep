import { useCoinsContext } from "@/context/CoinsProvider.tsx";

function useCoins() {
  const { coins, setCoins } = useCoinsContext();

  const addCoins = (amount: number) => {
    setCoins((prevCoins) => prevCoins + amount);
  };

  const spendCoins = (amount: number) => {
    setCoins((prevCoins) => {
      const newCoins = prevCoins - amount;
      if (newCoins < 0) {
        alert("You don't have enough coins!");
        return prevCoins;
      }
      return newCoins;
    });
  };

  return {
    coins,
    addCoins,
    spendCoins,
  };
}

export default useCoins;
