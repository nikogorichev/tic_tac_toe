import { useState } from "react";
import GameContext, { Options } from "./GameContext";
import { useLocalStorage } from "utils/hooks/useLocalStorage";
import { CounterType } from "utils/types/Counter";

type CardsProviderProps = {
  children: JSX.Element;
};

const GameProvider = ({ children }: CardsProviderProps) => {
  const [options, setOptions] = useState<Options>({
    mark: null,
    firstMove: null,
    x: null,
    o: null
  });
  const [counter, setCounter] = useLocalStorage<CounterType>("counter", {
    x: 0,
    o: 0,
    draw: 0,
  });

  return (
    <GameContext.Provider
      value={{
        options,
        setOptions,
        counter,
        setCounter,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
