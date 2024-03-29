import { useState } from "react";
import GameContext, { Level, Options } from "./GameContext";
import { useLocalStorage } from "utils/hooks/useLocalStorage";
import { CounterType } from "utils/types/Counter";

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

  const [level, setLevel] = useState<Level>(Level.MEDIUM);
  const [dimension, setDimension] = useState(3);

  return (
    <GameContext.Provider
      value={{
        options,
        setOptions,
        counter,
        setCounter,
        level,
        setLevel,
        dimension,
        setDimension,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
