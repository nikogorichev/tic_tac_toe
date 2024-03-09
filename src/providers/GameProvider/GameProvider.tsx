import { useState } from "react";
import GameContext, { Options } from "./GameContext";

type CardsProviderProps = {
  children: JSX.Element;
};

const GameProvider = ({ children }: CardsProviderProps) => {
  const [options, setOptions] = useState<Options>({ mark: null, game: null });

  return (
    <GameContext.Provider
      value={{
        options,
        setOptions,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
