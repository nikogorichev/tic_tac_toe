import { createContext } from "react";
import { Game } from "utils/types/Game";
import { Mark } from "utils/types/Mark";

export type Options = {
  mark: Mark;
  game: Game;
};

type GameContextType = {
  options: Options;
  setOptions: (value: Options) => void;
};

export default createContext<GameContextType>({
  options: {
    mark: null,
    game: null,
  },
  setOptions: (value) => value,
});
