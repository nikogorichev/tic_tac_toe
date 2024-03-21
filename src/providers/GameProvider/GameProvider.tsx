import { useState } from "react";
import GameContext, { Options } from "./GameContext";
import { useLocalStorage } from "utils/hooks/useLocalStorage";
import { CounterType } from "utils/types/Counter";
import { LevelType } from "utils/types/Level";

type CardsProviderProps = {
  children: JSX.Element;
};

const GameProvider = ({ children }: CardsProviderProps) => {
  const [options, setOptions] = useState<Options>({
    firstMove: null,
    x: null,
    o: null,
    isGame: false,
  });
  const [counter, setCounter] = useLocalStorage<CounterType>("counter", {
    x: 0,
    o: 0,
    draw: 0,
  });

  const [level, setLevel] = useState<LevelType>("medium");

  return (
    <GameContext.Provider
      value={{
        options,
        setOptions,
        counter,
        setCounter,
        level,
        setLevel,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
