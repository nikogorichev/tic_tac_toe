import { useState } from "react";
import GameContext, { Options } from "./GameContext";
import { useLocalStorage } from "utils/hooks/useLocalStorage";
import { CounterType } from "utils/types/Counter";

type CardsProviderProps = {
  children: JSX.Element;
};

const GameProvider = ({ children }: CardsProviderProps) => {
  const [options, setOptions] = useState<Options>({ mark: null, game: null });
  const [counter, setCounter] = useLocalStorage<CounterType>("counter", {
    computer: 0,
    human: 0,
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
