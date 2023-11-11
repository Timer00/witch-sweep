import React, { createContext, useState, useContext, useEffect } from 'react';

type Coins = number;

interface CoinsContextValue {
  coins: Coins;
  setCoins: React.Dispatch<React.SetStateAction<Coins>>;
}

const defaultCoinAmount = 0;

export const CoinsContext = createContext<CoinsContextValue | undefined>(undefined);

interface CoinsProviderProps {
  children: React.ReactNode;
}

export const CoinsProvider: React.FC<CoinsProviderProps> = ({ children }) => {
  const [coins, setCoins] = useState<Coins>(() => {
    const coinsInLocalStorage = localStorage.getItem("coins");
    if (coinsInLocalStorage) {
      return parseInt(coinsInLocalStorage, 10);
    } else {
      return defaultCoinAmount;
    }
  });

  useEffect(() => {
    localStorage.setItem('coins', coins.toString());
  }, [coins]);

  return (
    <CoinsContext.Provider value={{ coins, setCoins }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoinsContext = () => {
  const context = useContext(CoinsContext);
  if (!context) {
    throw new Error('useCoinsContext must be used within a CoinsProvider');
  }
  return context;
};
