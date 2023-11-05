import { useState, useEffect } from "react";

function useCoins() {
  const [coins, setCoins] = useState<number>(() => {
    const coinsInLocalStorage = localStorage.getItem("coins");
    if (coinsInLocalStorage) {
      return parseInt(coinsInLocalStorage, 10);
    } else {
      return 0;
    }
  });

  // Save coins to localStorage when the `coins` state changes
  useEffect(() => {
    localStorage.setItem("coins", coins.toString());
  }, [coins]);

  // Method to add coins
  const addCoins = (amount: number) => {
    setCoins((prevCoins) => {
      const newCoins = prevCoins + amount;
      localStorage.setItem("coins", newCoins.toString());
      return newCoins;
    });
  };

  // Method to spend coins
  const spendCoins = (amount) => {
    setCoins((prevCoins) => {
      const newCoins = prevCoins - amount;
      if (newCoins < 0) {
        alert("You don't have enough coins!");
        return prevCoins;
      }
      localStorage.setItem("coins", newCoins.toString());
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
